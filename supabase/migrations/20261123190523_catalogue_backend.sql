-- Fresh application schema, inspected against the empty project before applying.
begin;

create schema backend_private;
revoke all on schema backend_private from public, anon;
grant usage on schema backend_private to authenticated, service_role;

create table public.staff_members (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null check (role in ('admin', 'editor', 'sales')),
  is_active boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.staff_members enable row level security;
revoke all on public.staff_members from public, anon, authenticated;
grant select on public.staff_members to authenticated;
grant all on public.staff_members to service_role;

create function backend_private.staff_has_permission(p_permission text)
returns boolean language sql stable security definer set search_path = '' as $$
  select (select auth.uid()) is not null
    and coalesce((select auth.jwt()->>'aal') = 'aal2', false)
    and exists (
      select 1 from public.staff_members m
      where m.user_id = (select auth.uid()) and m.is_active
      and (
        (m.role = 'admin' and p_permission in ('staff:access', 'content:read', 'content:write', 'content:publish', 'enquiries:read', 'enquiries:write', 'settings:manage', 'staff:manage'))
        or (m.role = 'editor' and p_permission in ('staff:access', 'content:read', 'content:write'))
        or (m.role = 'sales' and p_permission in ('staff:access', 'enquiries:read', 'enquiries:write'))
      )
    );
$$;
revoke all on function backend_private.staff_has_permission(text) from public, anon;
grant execute on function backend_private.staff_has_permission(text) to authenticated;
create policy staff_members_read on public.staff_members for select to authenticated
  using (user_id = (select auth.uid()) or (select backend_private.staff_has_permission('staff:manage')));

create table public.brands (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (length(name) between 1 and 100),
  tagline text, description text, logo_url text, website text,
  meta_title text, meta_description text,
  is_active boolean not null default false,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (length(name) between 1 and 100),
  parent_id uuid references public.categories(id) on delete restrict,
  description text, icon text, meta_title text, meta_description text,
  is_active boolean not null default false,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check (parent_id is null or parent_id <> id)
);
create index categories_parent_idx on public.categories(parent_id);
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (length(title) between 1 and 255),
  model_number text,
  brand_id uuid not null references public.brands(id) on delete restrict,
  category_id uuid not null references public.categories(id) on delete restrict,
  description text, short_description text,
  volume_min numeric check (volume_min >= 0), volume_max numeric check (volume_max >= 0),
  volume_unit text not null default 'µL' check (volume_unit in ('µL','uL','mL')),
  channels integer not null default 1 check (channels between 0 and 384),
  is_autoclavable boolean not null default false, autoclave_type text, mechanism text,
  specifications jsonb not null default '{}' check (jsonb_typeof(specifications) = 'object'),
  accuracy_tolerances jsonb not null default '{}' check (jsonb_typeof(accuracy_tolerances) = 'object'),
  images text[] not null default '{}', datasheet_url text,
  is_featured boolean not null default false, is_active boolean not null default false,
  meta_title text, meta_description text,
  sort_order integer not null default 0 check (sort_order >= 0),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check (volume_min is null or volume_max is null or volume_max >= volume_min),
  check (cardinality(images) <= 20)
);
create index products_brand_idx on public.products(brand_id);
create index products_category_idx on public.products(category_id);
create index products_public_order_idx on public.products(sort_order, id) where is_active;
create index products_images_idx on public.products using gin(images);

create table public.blog_articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (length(title) between 1 and 255),
  content text, excerpt text, author text not null default 'Editorial team', cover_image text,
  tags text[] not null default '{}', category text,
  read_time_minutes integer check (read_time_minutes between 1 and 1440),
  is_published boolean not null default false, published_at timestamptz,
  meta_title text, meta_description text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index blog_public_date_idx on public.blog_articles(published_at desc, id) where is_published;
create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(title) between 1 and 255),
  type text not null check (type in ('brochure','manual','datasheet','certificate','other')),
  file_url text, file_size_kb integer check (file_size_kb >= 0),
  brand_id uuid references public.brands(id) on delete restrict,
  description text, is_public boolean not null default false,
  download_count integer not null default 0,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check (not is_public or file_url is not null)
);
create index resources_brand_idx on public.resources(brand_id);
create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (length(title) between 1 and 255),
  description text, body text not null default '', image_url text,
  is_active boolean not null default false,
  meta_title text, meta_description text,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique check (key in ('site','contact','seo','navigation')),
  value jsonb not null default '{}' check (jsonb_typeof(value) = 'object'),
  is_public boolean not null default false,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  enquiry_id text not null unique,
  name text not null check (length(name) between 1 and 100),
  email text not null check (length(email) between 3 and 254), phone text, company text, country text,
  message text not null check (length(message) between 1 and 10000),
  quantity text, oem_specifications text, internal_notes text,
  product_slug text, product_title text,
  enquiry_type text not null check (enquiry_type in ('product','universal','oem','contact')),
  status text not null default 'new' check (status in ('new','read','replied','closed')),
  ip_address text, idempotency_key uuid unique,
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index enquiries_status_date_idx on public.enquiries(status, created_at desc);

-- Explicit grants are separate from row policies. Generated IDs/timestamps are immutable.
do $$
declare t text; field text;
begin
  foreach t in array array['brands','categories','products','blog_articles','resources','pages'] loop
    field := case when t = 'blog_articles' then 'is_published' when t = 'resources' then 'is_public' else 'is_active' end;
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on public.%I from public, anon, authenticated', t);
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant all on public.%I to service_role', t);
    execute format('create policy public_read on public.%I for select to anon using (%I)', t, field);
    execute format('create policy staff_read on public.%I for select to authenticated using (%I or (select backend_private.staff_has_permission(''content:read'')))', t, field);
    execute format('create policy staff_insert on public.%I for insert to authenticated with check ((select backend_private.staff_has_permission(''content:write'')) and (not %I or (select backend_private.staff_has_permission(''content:publish''))))', t, field);
    execute format('create policy staff_update on public.%I for update to authenticated using ((select backend_private.staff_has_permission(''content:write'')) and (not %I or (select backend_private.staff_has_permission(''content:publish'')))) with check ((select backend_private.staff_has_permission(''content:write'')) and (not %I or (select backend_private.staff_has_permission(''content:publish''))))', t, field, field);
    execute format('create policy staff_delete on public.%I for delete to authenticated using ((select backend_private.staff_has_permission(''content:publish'')))', t);
    execute format('grant delete on public.%I to authenticated', t);
  end loop;
end $$;
grant insert (slug,name,tagline,description,logo_url,website,meta_title,meta_description,is_active,sort_order), update (slug,name,tagline,description,logo_url,website,meta_title,meta_description,is_active,sort_order) on public.brands to authenticated;
grant insert (slug,name,parent_id,description,icon,meta_title,meta_description,is_active,sort_order), update (slug,name,parent_id,description,icon,meta_title,meta_description,is_active,sort_order) on public.categories to authenticated;
grant insert (slug,title,model_number,brand_id,category_id,description,short_description,volume_min,volume_max,volume_unit,channels,is_autoclavable,autoclave_type,mechanism,specifications,accuracy_tolerances,images,datasheet_url,is_featured,is_active,meta_title,meta_description,sort_order), update (slug,title,model_number,brand_id,category_id,description,short_description,volume_min,volume_max,volume_unit,channels,is_autoclavable,autoclave_type,mechanism,specifications,accuracy_tolerances,images,datasheet_url,is_featured,is_active,meta_title,meta_description,sort_order) on public.products to authenticated;
grant insert (slug,title,content,excerpt,author,cover_image,tags,category,read_time_minutes,is_published,published_at,meta_title,meta_description), update (slug,title,content,excerpt,author,cover_image,tags,category,read_time_minutes,is_published,published_at,meta_title,meta_description) on public.blog_articles to authenticated;
grant insert (title,type,file_url,file_size_kb,brand_id,description,is_public), update (title,type,file_url,file_size_kb,brand_id,description,is_public) on public.resources to authenticated;
grant insert (slug,title,description,body,image_url,is_active,meta_title,meta_description), update (slug,title,description,body,image_url,is_active,meta_title,meta_description) on public.pages to authenticated;

alter table public.settings enable row level security;
revoke all on public.settings from public, anon, authenticated;
grant select on public.settings to anon, authenticated;
grant insert (key,value,is_public), update (key,value,is_public), delete on public.settings to authenticated;
grant all on public.settings to service_role;
create policy settings_public_read on public.settings for select to anon using (is_public);
create policy settings_staff_read on public.settings for select to authenticated using (is_public or (select backend_private.staff_has_permission('settings:manage')));
create policy settings_insert on public.settings for insert to authenticated with check ((select backend_private.staff_has_permission('settings:manage')));
create policy settings_update on public.settings for update to authenticated using ((select backend_private.staff_has_permission('settings:manage'))) with check ((select backend_private.staff_has_permission('settings:manage')));
create policy settings_delete on public.settings for delete to authenticated using ((select backend_private.staff_has_permission('settings:manage')));
alter table public.enquiries enable row level security;
revoke all on public.enquiries from public, anon, authenticated;
grant select on public.enquiries to authenticated;
grant update (status,internal_notes) on public.enquiries to authenticated;
grant all on public.enquiries to service_role;
create policy enquiries_staff_read on public.enquiries for select to authenticated using ((select backend_private.staff_has_permission('enquiries:read')));
create policy enquiries_staff_update on public.enquiries for update to authenticated using ((select backend_private.staff_has_permission('enquiries:write'))) with check ((select backend_private.staff_has_permission('enquiries:write')));

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  table_name text not null, operation text not null, record_id text,
  created_at timestamptz not null default now()
);
create index audit_events_actor_idx on public.audit_events(actor_id);
create index audit_events_created_idx on public.audit_events(created_at desc);
alter table public.audit_events enable row level security;
revoke all on public.audit_events from public, anon, authenticated;
grant select on public.audit_events to authenticated;
grant all on public.audit_events to service_role;
create policy audit_admin_read on public.audit_events for select to authenticated using ((select backend_private.staff_has_permission('staff:manage')));
create function backend_private.record_audit() returns trigger language plpgsql security definer set search_path = '' as $$
declare item jsonb;
begin
  item := case when TG_OP = 'DELETE' then to_jsonb(OLD) else to_jsonb(NEW) end;
  insert into public.audit_events(actor_id,table_name,operation,record_id)
  values (auth.uid(),TG_TABLE_NAME,TG_OP,coalesce(item->>'id',item->>'user_id',item->>'key'));
  return case when TG_OP = 'DELETE' then OLD else NEW end;
end $$;
revoke all on function backend_private.record_audit() from public, anon, authenticated, service_role;
create function backend_private.touch_updated_at() returns trigger language plpgsql set search_path = '' as $$
begin NEW.updated_at := clock_timestamp(); return NEW; end $$;
revoke all on function backend_private.touch_updated_at() from public, anon, authenticated, service_role;
do $$ declare t text; begin
  foreach t in array array['brands','categories','products','blog_articles','resources','pages','settings','enquiries','staff_members'] loop
    execute format('create trigger record_audit after insert or update or delete on public.%I for each row execute function backend_private.record_audit()',t);
    if t <> 'staff_members' then
      execute format('create trigger touch_updated_at before update on public.%I for each row execute function backend_private.touch_updated_at()',t);
    end if;
  end loop;
end $$;

create function backend_private.set_staff_member(p_user_id uuid, p_email text, p_role text, p_is_active boolean)
returns public.staff_members language plpgsql security definer set search_path = '' as $$
declare result public.staff_members;
begin
  perform pg_advisory_xact_lock(hashtextextended('micropipette_staff_members',0));
  if auth.uid() is null or not backend_private.staff_has_permission('staff:manage') then
    raise insufficient_privilege using message = 'Staff management is restricted to verified administrators';
  end if;
  if p_user_id = auth.uid() then raise check_violation using message = 'Use another administrator to change your own membership'; end if;
  if p_role is null or p_role not in ('admin','editor','sales') or p_is_active is null then raise check_violation using message = 'Invalid staff role'; end if;
  insert into public.staff_members(user_id,email,role,is_active) values (p_user_id,p_email,p_role,p_is_active)
  on conflict (user_id) do update set email=excluded.email,role=excluded.role,is_active=excluded.is_active returning * into result;
  return result;
end $$;
revoke all on function backend_private.set_staff_member(uuid,text,text,boolean) from public, anon;
grant execute on function backend_private.set_staff_member(uuid,text,text,boolean) to authenticated;
create function public.set_staff_member(p_user_id uuid, p_email text, p_role text, p_is_active boolean)
returns public.staff_members language sql security invoker set search_path = '' as $$
  select backend_private.set_staff_member(p_user_id,p_email,p_role,p_is_active);
$$;
revoke all on function public.set_staff_member(uuid,text,text,boolean) from public, anon;
grant execute on function public.set_staff_member(uuid,text,text,boolean) to authenticated;

create table backend_private.request_limits (key text primary key, window_started_at timestamptz not null, request_count integer not null);
create index request_limits_window on backend_private.request_limits(window_started_at);
alter table backend_private.request_limits enable row level security;
revoke all on backend_private.request_limits from public, anon, authenticated;
create function public.consume_request_limit(p_key text, p_limit integer, p_window_seconds integer)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_now timestamptz := clock_timestamp(); v_count integer; v_started timestamptz;
begin
  if p_key is null or length(p_key) <> 64 or p_limit is null or p_limit not between 1 and 1000 or p_window_seconds is null or p_window_seconds not between 1 and 3600 then raise exception 'Invalid rate limit parameters'; end if;
  delete from backend_private.request_limits where window_started_at < v_now - interval '1 day';
  insert into backend_private.request_limits as limits(key,window_started_at,request_count) values(p_key,v_now,1)
  on conflict(key) do update set
    request_count = case when limits.window_started_at <= v_now-make_interval(secs=>p_window_seconds) then 1 else least(limits.request_count+1,p_limit+1) end,
    window_started_at = case when limits.window_started_at <= v_now-make_interval(secs=>p_window_seconds) then v_now else limits.window_started_at end
  returning request_count,window_started_at into v_count,v_started;
  return jsonb_build_object('allowed',v_count<=p_limit,'retry_after',greatest(1,ceil(extract(epoch from(v_started+make_interval(secs=>p_window_seconds)-v_now)))::integer));
end $$;
revoke all on function public.consume_request_limit(text,integer,integer) from public, anon, authenticated;
grant execute on function public.consume_request_limit(text,integer,integer) to service_role;

create table backend_private.notification_jobs (
  id uuid primary key default gen_random_uuid(), enquiry_id uuid not null unique references public.enquiries(id) on delete cascade,
  attempts integer not null default 0, locked_until timestamptz, next_attempt_at timestamptz not null default now(),
  completed_at timestamptz, created_at timestamptz not null default now()
);
create index notification_jobs_pending_idx on backend_private.notification_jobs(next_attempt_at) where completed_at is null;
alter table backend_private.notification_jobs enable row level security;
revoke all on backend_private.notification_jobs from public, anon, authenticated;
create function backend_private.enqueue_notification() returns trigger language plpgsql security definer set search_path = '' as $$
begin insert into backend_private.notification_jobs(enquiry_id) values(NEW.id); return NEW; end $$;
revoke all on function backend_private.enqueue_notification() from public, anon, authenticated, service_role;
create trigger enqueue_notification after insert on public.enquiries for each row execute function backend_private.enqueue_notification();
create function public.claim_enquiry_notifications(p_limit integer default 10, p_receipt text default null)
returns table(job_id uuid,enquiry_id uuid) language plpgsql security definer set search_path = '' as $$
begin
  return query with pending as (
    select j.id from backend_private.notification_jobs j join public.enquiries e on e.id=j.enquiry_id
    where j.completed_at is null and j.attempts<5 and j.next_attempt_at<=now() and (j.locked_until is null or j.locked_until<now())
      and (p_receipt is null or e.enquiry_id=p_receipt)
    order by j.next_attempt_at for update of j skip locked limit greatest(1,least(coalesce(p_limit,10),20))
  ) update backend_private.notification_jobs j set attempts=j.attempts+1,locked_until=now()+interval '5 minutes'
    from pending where j.id=pending.id returning j.id,j.enquiry_id;
end $$;
create function public.finish_enquiry_notification(p_job_id uuid,p_succeeded boolean)
returns void language sql security definer set search_path = '' as $$
  update backend_private.notification_jobs set completed_at=case when p_succeeded then now() else null end,
    next_attempt_at=now()+interval '5 minutes', locked_until=null where id=p_job_id;
$$;
revoke all on function public.claim_enquiry_notifications(integer,text) from public, anon, authenticated;
revoke all on function public.finish_enquiry_notification(uuid,boolean) from public, anon, authenticated;
grant execute on function public.claim_enquiry_notifications(integer,text),public.finish_enquiry_notification(uuid,boolean) to service_role;

-- Private objects become publicly readable only when linked from published content.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values
  ('images','images',false,5242880,array['image/jpeg','image/png','image/webp']),
  ('documents','documents',false,16777216,array['application/pdf']);
create policy cms_media_insert on storage.objects for insert to authenticated with check (
  bucket_id in ('images','documents') and (storage.foldername(name))[1]=(select auth.uid())::text
  and (select backend_private.staff_has_permission('content:write'))
);
create policy cms_media_staff_read on storage.objects for select to authenticated using (
  bucket_id in ('images','documents') and (select backend_private.staff_has_permission('content:read'))
);
create policy cms_media_public_read on storage.objects for select to anon using (
  (bucket_id='images' and (
    exists(select 1 from public.products p where p.is_active and ('/api/media/images/'||name)=any(p.images))
    or exists(select 1 from public.brands b where b.is_active and b.logo_url='/api/media/images/'||name)
    or exists(select 1 from public.blog_articles a where a.is_published and a.cover_image='/api/media/images/'||name)
    or exists(select 1 from public.pages p where p.is_active and p.image_url='/api/media/images/'||name)
  )) or (bucket_id='documents' and (
    exists(select 1 from public.resources r where r.is_public and r.file_url='/api/media/documents/'||name)
    or exists(select 1 from public.products p where p.is_active and p.datasheet_url='/api/media/documents/'||name)
  ))
);

-- Existing event trigger is retained; direct API execution is unnecessary.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
commit;
