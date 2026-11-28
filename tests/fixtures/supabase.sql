-- Minimal Supabase system contracts for real PostgreSQL policy tests, never production.
create role anon;
create role authenticated;
create role service_role bypassrls;
revoke create on schema public from public;
create schema auth;
create schema storage;
grant usage on schema auth,storage to anon,authenticated,service_role;
create table auth.users(id uuid primary key,email text);
create table auth.sessions(id uuid primary key,user_id uuid references auth.users(id),not_after timestamptz);
create function auth.uid() returns uuid language sql stable as $$
  select (nullif(current_setting('request.jwt.claims',true),'')::jsonb->>'sub')::uuid
$$;
create function auth.jwt() returns jsonb language sql stable as $$
  select coalesce(nullif(current_setting('request.jwt.claims',true),''),'{}')::jsonb
$$;
create table storage.buckets(id text primary key,name text,public boolean,file_size_limit bigint,allowed_mime_types text[]);
create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text references storage.buckets(id),name text,owner_id text);
alter table storage.objects enable row level security;
grant select on storage.objects to anon;
grant select,insert,update,delete on storage.objects to authenticated,service_role;
create function storage.foldername(name text) returns text[] language sql immutable as $$ select string_to_array(name,'/') $$;
create function public.rls_auto_enable() returns event_trigger language plpgsql security definer as $$ begin return; end $$;
