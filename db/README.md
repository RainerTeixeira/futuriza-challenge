# Database Setup

## Aplicar Schema via Supabase Dashboard

1. Acesse o [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto
3. Vá em **SQL Editor**
4. Copie e execute o conteúdo de `schema.sql`
5. Copie e execute o conteúdo de `storage.sql`

## Aplicar Schema via Supabase CLI

### Pré-requisitos
```bash
# Instalar Supabase CLI
npm install -g supabase

# Login no Supabase
supabase login
```

### Aplicar migrations
```bash
# Linkar projeto local ao projeto Supabase
supabase link --project-ref seu-project-ref

# Aplicar schema da tabela banners
supabase db push --file db/schema.sql

# Aplicar configuração do storage
supabase db push --file db/storage.sql
```

### Alternativa: Reset completo do banco
```bash
# ATENÇÃO: Isso apaga todos os dados!
supabase db reset --file db/schema.sql
```

## Criar Bucket via API (alternativa)

```bash
curl -X POST 'https://seu-projeto.supabase.co/storage/v1/bucket' \
  -H "Authorization: Bearer SEU_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "banners",
    "name": "banners",
    "public": true
  }'
```

## Verificar instalação

```sql
-- Verificar tabela criada
select * from banners limit 1;

-- Verificar bucket criado
select * from storage.buckets where id = 'banners';
```
