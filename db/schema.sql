-- Tabela de banners
create table if not exists banners (
  id uuid default gen_random_uuid() primary key,
  slug text,
  url text not null,
  image_url text,
  image_public boolean default false,
  start_time timestamptz,
  end_time timestamptz,
  active boolean default true,
  views bigint default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Índices para otimização de queries
create index if not exists idx_banners_url on banners(url);
create index if not exists idx_banners_active on banners(active);
create index if not exists idx_banners_slug on banners(slug);

-- Trigger para atualizar updated_at automaticamente
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_banners_updated_at
  before update on banners
  for each row
  execute function update_updated_at_column();
