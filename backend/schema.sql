-- ============================================================
-- TradeDiecast — Supabase Database Schema
-- Run this in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── PROFILES ──────────────────────────────────────────────
-- Auto-created when a user signs up via Supabase Auth trigger
create table public.profiles (
  id               uuid primary key references auth.users(id) on delete cascade,
  username         text unique not null,
  avatar_url       text,
  bio              text,
  rating           numeric(3,2) default 5.0,
  total_sales      int default 0,
  positive_feedback int default 100,
  created_at       timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.profiles (id, username)
  values (new.id, coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── LISTINGS ──────────────────────────────────────────────
create table public.listings (
  id            uuid primary key default uuid_generate_v4(),
  seller_id     uuid not null references public.profiles(id) on delete cascade,
  title         text not null,
  brand         text not null,
  scale         text,
  model         text,
  year          int,
  item_number   text,
  condition     text not null check (condition in ('Mint in box', 'Mint loose', 'Used')),
  description   text,
  price         numeric(10,2) not null check (price > 0),
  listing_type  text default 'fixed' check (listing_type in ('fixed', 'offer', 'auction')),
  shipping_cost numeric(8,2) default 0,
  handling_days int default 1,
  images        text[] default '{}',
  status        text default 'active' check (status in ('active', 'sold', 'removed')),
  sold_to       uuid references public.profiles(id),
  view_count    int default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table public.listings enable row level security;

create policy "Listings viewable by everyone"
  on public.listings for select using (true);

create policy "Sellers can create listings"
  on public.listings for insert with check (auth.uid() = seller_id);

create policy "Sellers can update own listings"
  on public.listings for update using (auth.uid() = seller_id);

create policy "Sellers can delete own listings"
  on public.listings for delete using (auth.uid() = seller_id);

-- Index for fast search
create index listings_brand_idx    on public.listings(brand);
create index listings_status_idx   on public.listings(status);
create index listings_price_idx    on public.listings(price);
create index listings_created_idx  on public.listings(created_at desc);
create index listings_search_idx   on public.listings using gin(to_tsvector('english', title));

-- ── SAVED / WATCHLIST ─────────────────────────────────────
create table public.saved_listings (
  user_id    uuid references public.profiles(id) on delete cascade,
  listing_id uuid references public.listings(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, listing_id)
);

alter table public.saved_listings enable row level security;

create policy "Users manage own saved listings"
  on public.saved_listings for all using (auth.uid() = user_id);

-- ── OFFERS ────────────────────────────────────────────────
create table public.offers (
  id         uuid primary key default uuid_generate_v4(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  buyer_id   uuid not null references public.profiles(id),
  amount     numeric(10,2) not null,
  status     text default 'pending' check (status in ('pending', 'accepted', 'declined', 'expired')),
  created_at timestamptz default now()
);

alter table public.offers enable row level security;

create policy "Buyers can create offers"
  on public.offers for insert with check (auth.uid() = buyer_id);

create policy "Buyers and sellers can view offers"
  on public.offers for select using (
    auth.uid() = buyer_id or
    auth.uid() = (select seller_id from public.listings where id = listing_id)
  );

-- ── ORDERS ────────────────────────────────────────────────
create table public.orders (
  id                uuid primary key default uuid_generate_v4(),
  listing_id        uuid references public.listings(id),
  buyer_id          uuid references public.profiles(id),
  seller_id         uuid references public.profiles(id),
  stripe_session_id text,
  amount_total      numeric(10,2),
  status            text default 'paid' check (status in ('paid', 'shipped', 'delivered', 'refunded')),
  tracking_number   text,
  created_at        timestamptz default now()
);

alter table public.orders enable row level security;

create policy "Buyers and sellers view own orders"
  on public.orders for select using (auth.uid() = buyer_id or auth.uid() = seller_id);

-- ── REVIEWS ───────────────────────────────────────────────
create table public.reviews (
  id          uuid primary key default uuid_generate_v4(),
  order_id    uuid references public.orders(id),
  reviewer_id uuid references public.profiles(id),
  seller_id   uuid references public.profiles(id),
  rating      int check (rating between 1 and 5),
  comment     text,
  created_at  timestamptz default now()
);

alter table public.reviews enable row level security;

create policy "Reviews viewable by everyone"
  on public.reviews for select using (true);

create policy "Buyers can leave reviews"
  on public.reviews for insert with check (auth.uid() = reviewer_id);

-- Update seller rating when review is added
create or replace function update_seller_rating()
returns trigger language plpgsql as $$
begin
  update public.profiles
  set rating = (select avg(rating)::numeric(3,2) from public.reviews where seller_id = new.seller_id)
  where id = new.seller_id;
  return new;
end;
$$;

create trigger on_review_created
  after insert on public.reviews
  for each row execute procedure update_seller_rating();

-- ── HELPER FUNCTIONS ──────────────────────────────────────
create or replace function increment_sales(seller_uuid uuid)
returns void language plpgsql security definer as $$
begin
  update public.profiles set total_sales = total_sales + 1 where id = seller_uuid;
end;
$$;

-- ── STORAGE BUCKET ────────────────────────────────────────
-- Run this after the tables above:
insert into storage.buckets (id, name, public) values ('listing-images', 'listing-images', true)
  on conflict do nothing;

create policy "Anyone can view listing images"
  on storage.objects for select using (bucket_id = 'listing-images');

create policy "Authenticated users can upload listing images"
  on storage.objects for insert with check (
    bucket_id = 'listing-images' and auth.role() = 'authenticated'
  );

create policy "Users can delete own images"
  on storage.objects for delete using (
    bucket_id = 'listing-images' and auth.uid()::text = (storage.foldername(name))[1]
  );
