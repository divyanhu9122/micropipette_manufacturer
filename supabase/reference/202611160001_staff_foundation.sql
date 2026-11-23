-- Prepared locally only. Reconcile with the colleague's project before applying.
-- This migration intentionally fails on conflicting existing objects.
begin;

create table public.staff_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin', 'editor', 'sales')),
  is_active boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.staff_members enable row level security;
revoke all on table public.staff_members from public, anon, authenticated;
grant select (user_id, role, is_active) on table public.staff_members to authenticated;
grant select, insert, update, delete on table public.staff_members to service_role;

-- Membership is readable before MFA solely to support the caller's enrollment flow.
-- No browser role can assign itself staff access or alter its own role.
create policy staff_read_own_membership on public.staff_members
  for select to authenticated
  using (user_id = (select auth.uid()));

create function public.staff_has_permission(p_permission text)
returns boolean
language sql stable security definer set search_path = ''
as $$
  select coalesce((select auth.jwt()->>'aal') = 'aal2', false)
    and exists (
      select 1 from public.staff_members as member
      where member.user_id = (select auth.uid()) and member.is_active
      and (
        (member.role = 'admin' and p_permission in (
          'staff:access', 'content:read', 'content:write', 'content:publish',
          'enquiries:read', 'enquiries:write', 'settings:manage', 'staff:manage'
        ))
        or (member.role = 'editor' and p_permission in ('staff:access', 'content:read', 'content:write'))
        or (member.role = 'sales' and p_permission in ('staff:access', 'enquiries:read', 'enquiries:write'))
      )
    );
$$;

revoke all on function public.staff_has_permission(text) from public, anon;
grant execute on function public.staff_has_permission(text) to authenticated;

create schema backend_private;
revoke all on schema backend_private from public, anon, authenticated;

create table backend_private.request_limits (
  key text primary key,
  window_started_at timestamptz not null,
  request_count integer not null
);
create index request_limits_window on backend_private.request_limits (window_started_at);
alter table backend_private.request_limits enable row level security;
revoke all on table backend_private.request_limits from public, anon, authenticated;

create function public.consume_request_limit(p_key text, p_limit integer, p_window_seconds integer)
returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_count integer;
  v_started timestamptz;
begin
  if length(p_key) <> 64 or p_limit < 1 or p_limit > 1000
    or p_window_seconds < 1 or p_window_seconds > 3600 then
    raise exception 'Invalid rate limit parameters';
  end if;

  delete from backend_private.request_limits where window_started_at < v_now - interval '1 day';
  insert into backend_private.request_limits as limits (key, window_started_at, request_count)
  values (p_key, v_now, 1)
  on conflict (key) do update set
    request_count = case
      when limits.window_started_at <= v_now - make_interval(secs => p_window_seconds) then 1
      else least(limits.request_count + 1, p_limit + 1)
    end,
    window_started_at = case
      when limits.window_started_at <= v_now - make_interval(secs => p_window_seconds) then v_now
      else limits.window_started_at
    end
  returning request_count, window_started_at into v_count, v_started;

  return jsonb_build_object(
    'allowed', v_count <= p_limit,
    'retry_after', greatest(1, ceil(extract(epoch from (v_started + make_interval(secs => p_window_seconds) - v_now)))::integer)
  );
end;
$$;

revoke all on function public.consume_request_limit(text, integer, integer) from public, anon, authenticated;
grant execute on function public.consume_request_limit(text, integer, integer) to service_role;

commit;
