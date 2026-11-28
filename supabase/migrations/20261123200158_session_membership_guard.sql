begin;
create function backend_private.session_active()
returns boolean language sql stable security definer set search_path='' as $$
  select (select auth.uid()) is not null and exists(
    select 1 from auth.sessions s where s.user_id=(select auth.uid())
    and s.id=case when (select auth.jwt()->>'session_id') ~ '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$' then (select auth.jwt()->>'session_id')::uuid else null end
    and (s.not_after is null or s.not_after>now())
  );
$$;
revoke all on function backend_private.session_active() from public,anon;
grant execute on function backend_private.session_active() to authenticated;
alter policy staff_members_read on public.staff_members using (
  (user_id=(select auth.uid()) and (select backend_private.session_active()))
  or (select backend_private.staff_has_permission('staff:manage'))
);
commit;
