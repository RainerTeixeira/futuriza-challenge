-- Criar bucket para armazenar imagens dos banners
insert into storage.buckets (id, name, public)
values ('banners', 'banners', true)
on conflict (id) do nothing;

-- Política de acesso público para leitura
create policy "Public read access"
on storage.objects for select
using ( bucket_id = 'banners' );

-- Política de upload autenticado
create policy "Authenticated users can upload"
on storage.objects for insert
with check ( bucket_id = 'banners' and auth.role() = 'authenticated' );

-- Política de atualização autenticada
create policy "Authenticated users can update"
on storage.objects for update
using ( bucket_id = 'banners' and auth.role() = 'authenticated' );

-- Política de deleção autenticada
create policy "Authenticated users can delete"
on storage.objects for delete
using ( bucket_id = 'banners' and auth.role() = 'authenticated' );
