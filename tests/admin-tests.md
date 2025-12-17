# Testes do Painel Admin

## Pré-requisitos
- Servidor rodando: `npm run dev`
- Variáveis de ambiente configuradas
- Tabela `banners` e bucket `banners` criados no Supabase

## 1. Acessar Painel Admin

```
http://localhost:3000/admin
```

✅ Deve exibir lista de banners (vazia ou com dados)

## 2. Criar Novo Banner

1. Clicar em "Criar Banner"
2. Preencher formulário:
   - URL: `https://lojaexemplo.com/produto/123`
   - Slug: `banner-teste`
   - Upload de imagem (qualquer JPG/PNG)
   - Marcar "Ativo"
3. Clicar em "Criar Banner"

✅ Deve redirecionar para `/admin` com banner na lista

## 3. Verificar Preview em Tempo Real

1. Acessar `/admin/new`
2. Digitar URL no campo
3. Fazer upload de imagem

✅ Preview deve aparecer instantaneamente no lado direito

## 4. Verificar Upload no Supabase Storage

1. Acessar Supabase Dashboard → Storage → banners
2. Verificar que a imagem foi enviada

✅ Arquivo deve estar no bucket `banners`

## 5. Testar Toggle Ativo/Inativo

1. Na lista de banners, clicar no botão "Ativo"
2. Status deve mudar para "Inativo"

✅ Banner deve ficar inativo

## 6. Testar Exclusão

1. Clicar em "Excluir" em um banner
2. Confirmar exclusão

✅ Banner deve ser removido da lista

## 7. Verificar API após criação

```bash
curl "http://localhost:3000/api/banners?url=https://lojaexemplo.com/produto/123"
```

✅ Deve retornar o banner criado via admin

## 8. Testar Agendamento

1. Criar banner com data/hora início futura
2. Tentar buscar via API

✅ Não deve retornar até a data/hora início

## Proteção Admin (Opcional)

Se `ADMIN_TOKEN` estiver configurado no `.env`:

1. Acessar `/admin` sem cookie
2. Deve redirecionar para `/admin/login`

Para desabilitar proteção, deixe `ADMIN_TOKEN` vazio no `.env`
