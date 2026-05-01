-- ============================================================
--  Framez Studio – Supabase Schema
--  Run this in your Supabase SQL Editor (once)
-- ============================================================

-- ── 1. CONTACTS ─────────────────────────────────────────────
create table if not exists public.contacts (
  id          uuid      default gen_random_uuid() primary key,
  name        text      not null,
  email       text,
  message     text      not null,
  status      text      default 'new'
              check (status in ('new', 'read', 'replied')),
  created_at  timestamptz default now()
);

alter table public.contacts enable row level security;

-- Anyone can submit a contact
create policy "Public insert contacts"
  on public.contacts for insert
  with check (true);

-- Only the admin can read/update contacts
create policy "Admin reads contacts"
  on public.contacts for select
  using (auth.email() = 'admin@framezstudio.com');

create policy "Admin updates contacts"
  on public.contacts for update
  using (auth.email() = 'admin@framezstudio.com');


-- ── 2. PROFILES ─────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid      references auth.users(id) on delete cascade primary key,
  name        text,
  phone       text,
  created_at  timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users manage own profile"
  on public.profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Admin reads all profiles"
  on public.profiles for select
  using (auth.email() = 'admin@framezstudio.com');


-- ── 3. ORDERS ───────────────────────────────────────────────
create table if not exists public.orders (
  id              uuid      default gen_random_uuid() primary key,
  user_id         uuid      references auth.users(id) on delete set null,
  customer_name   text      not null,
  customer_email  text,
  customer_phone  text,
  items           jsonb     not null default '[]',
  address         text      not null,
  message         text,
  status          text      default 'pending'
                  check (status in ('pending','confirmed','in-progress','shipped','delivered','cancelled')),
  total_items     integer   default 0,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

alter table public.orders enable row level security;

-- Authenticated customers can place orders
create policy "Authenticated users insert orders"
  on public.orders for insert
  with check (true);          -- allow guest orders too (user_id may be null)

-- Customers see their own orders
create policy "Customers read own orders"
  on public.orders for select
  using (auth.uid() = user_id);

-- Admin sees and updates all
create policy "Admin reads all orders"
  on public.orders for select
  using (auth.email() = 'admin@framezstudio.com');

create policy "Admin updates all orders"
  on public.orders for update
  using (auth.email() = 'admin@framezstudio.com');


-- ── 4. AUTO-CREATE PROFILE ON SIGNUP ────────────────────────
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, name, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'phone'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
