begin;
-- Revoking a session also revokes direct Data API staff access before JWT expiry.
create or replace function backend_private.staff_has_permission(p_permission text)
returns boolean language sql stable security definer set search_path='' as $$
  select (select auth.uid()) is not null and coalesce((select auth.jwt()->>'aal')='aal2',false)
    and exists(select 1 from auth.sessions s where s.user_id=(select auth.uid())
      and s.id=case when (select auth.jwt()->>'session_id') ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$' then (select auth.jwt()->>'session_id')::uuid else null end
      and (s.not_after is null or s.not_after>now()))
    and exists(select 1 from public.staff_members m where m.user_id=(select auth.uid()) and m.is_active and (
      (m.role='admin' and p_permission in ('staff:access','content:read','content:write','content:publish','enquiries:read','enquiries:write','settings:manage','staff:manage'))
      or (m.role='editor' and p_permission in ('staff:access','content:read','content:write'))
      or (m.role='sales' and p_permission in ('staff:access','enquiries:read','enquiries:write'))
    ));
$$;

alter table public.enquiries add column attachment_path text, add column attachment_name text,
  add column attachment_mime text, add column attachment_size integer, add column attachment_sha256 text;
alter table public.enquiries add constraint enquiry_attachment_valid check (
  (attachment_path is null and attachment_name is null and attachment_mime is null and attachment_size is null and attachment_sha256 is null)
  or (attachment_path is not null and attachment_name is not null and attachment_mime is not null and attachment_mime in ('application/pdf','image/png','image/jpeg','image/webp')
    and attachment_size is not null and attachment_size between 1 and 3145728 and attachment_sha256 is not null and attachment_sha256 ~ '^[a-f0-9]{64}$')
);
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
  values('enquiry-attachments','enquiry-attachments',false,3145728,array['application/pdf','image/png','image/jpeg','image/webp']);
create policy enquiry_attachment_staff_read on storage.objects for select to authenticated using (
  bucket_id='enquiry-attachments' and (select backend_private.staff_has_permission('enquiries:read'))
  and exists(select 1 from public.enquiries e where e.attachment_path=storage.objects.name)
);

-- A daily attachment budget caps anonymous storage growth as well as per-IP limits.
create or replace function public.consume_request_limit(p_key text,p_limit integer,p_window_seconds integer)
returns jsonb language plpgsql security definer set search_path='' as $$
declare v_now timestamptz:=clock_timestamp(); v_count integer; v_started timestamptz;
begin
  if p_key is null or length(p_key)<>64 or p_limit is null or p_limit not between 1 and 1000 or p_window_seconds is null or p_window_seconds not between 1 and 86400 then raise exception 'Invalid rate limit parameters'; end if;
  delete from backend_private.request_limits where window_started_at<v_now-interval '1 day';
  insert into backend_private.request_limits as limits(key,window_started_at,request_count) values(p_key,v_now,1)
  on conflict(key) do update set request_count=case when limits.window_started_at<=v_now-make_interval(secs=>p_window_seconds) then 1 else least(limits.request_count+1,p_limit+1) end,
    window_started_at=case when limits.window_started_at<=v_now-make_interval(secs=>p_window_seconds) then v_now else limits.window_started_at end
  returning request_count,window_started_at into v_count,v_started;
  return jsonb_build_object('allowed',v_count<=p_limit,'retry_after',greatest(1,ceil(extract(epoch from(v_started+make_interval(secs=>p_window_seconds)-v_now)))::integer));
end $$;
alter table public.products add column features text[] not null default '{}', add column applications text[] not null default '{}';
grant insert(features,applications),update(features,applications) on public.products to authenticated;

create function backend_private.find_staff_auth_user(p_email text)
returns table(user_id uuid,email text) language sql stable security definer set search_path='' as $$
  select u.id,u.email::text from auth.users u where u.email=lower(trim(p_email)) limit 1;
$$;
revoke all on function backend_private.find_staff_auth_user(text) from public,anon,authenticated;
grant execute on function backend_private.find_staff_auth_user(text) to service_role;
create function public.find_staff_auth_user(p_email text)
returns table(user_id uuid,email text) language sql security invoker set search_path='' as $$
  select * from backend_private.find_staff_auth_user(p_email);
$$;
revoke all on function public.find_staff_auth_user(text) from public,anon,authenticated;
grant execute on function public.find_staff_auth_user(text) to service_role;

create function backend_private.validate_category_parent() returns trigger language plpgsql set search_path='' as $$
begin
  if NEW.parent_id is not null then
    perform pg_advisory_xact_lock(hashtextextended('micropipette_category_tree',0));
    if exists(with recursive chain as (
      select id,parent_id from public.categories where id=NEW.parent_id
      union select c.id,c.parent_id from public.categories c join chain on c.id=chain.parent_id
    ) select 1 from chain where id=NEW.id) then
      raise check_violation using message='A category cannot be its own ancestor';
    end if;
  end if;
  return NEW;
end $$;
revoke all on function backend_private.validate_category_parent() from public,anon,authenticated,service_role;
create trigger validate_category_parent before insert or update of parent_id on public.categories for each row execute function backend_private.validate_category_parent();

alter policy cms_media_public_read on storage.objects using (
  (bucket_id='images' and (
    exists(select 1 from public.products p where p.is_active and ('/api/media/images/'||storage.objects.name)=any(p.images))
    or exists(select 1 from public.brands b where b.is_active and b.logo_url='/api/media/images/'||storage.objects.name)
    or exists(select 1 from public.blog_articles a where a.is_published and a.cover_image='/api/media/images/'||storage.objects.name)
    or exists(select 1 from public.pages p where p.is_active and p.image_url='/api/media/images/'||storage.objects.name)
    or exists(select 1 from public.settings s where s.is_public and (
      s.value->>'logo'='/api/media/images/'||storage.objects.name or s.value->>'favicon'='/api/media/images/'||storage.objects.name or s.value->>'image'='/api/media/images/'||storage.objects.name
    ))
  )) or (bucket_id='documents' and (
    exists(select 1 from public.resources r where r.is_public and r.file_url='/api/media/documents/'||storage.objects.name)
    or exists(select 1 from public.products p where p.is_active and p.datasheet_url='/api/media/documents/'||storage.objects.name)
    or exists(select 1 from public.settings s where s.is_public and s.key='navigation' and s.value->>'catalogueUrl'='/api/media/documents/'||storage.objects.name)
  ))
);
commit;
