# API Tests - Banners CRUD

## Pré-requisitos
- Servidor rodando: `npm run dev`
- Variáveis de ambiente configuradas no `.env`
- Tabela `banners` criada no Supabase

## 1. Criar Banner (POST)

```bash
curl -X POST http://localhost:3000/api/banners ^
  -H "Content-Type: application/json" ^
  -d "{\"url\":\"https://lojaexemplo.com/produto/123\",\"image_url\":\"https://example.com/img.jpg\",\"start_time\":null,\"end_time\":null,\"active\":true}"
```

**Resposta esperada:** Status 201 com JSON do banner criado

## 2. Buscar Banner por URL (GET)

```bash
curl "http://localhost:3000/api/banners?url=https://lojaexemplo.com/produto/123"
```

**Resposta esperada:** Status 200 com JSON do banner ativo

## 3. Buscar Banner por ID (GET)

```bash
curl http://localhost:3000/api/banners/{id}
```

Substitua `{id}` pelo UUID retornado no POST.

**Resposta esperada:** Status 200 com JSON do banner

## 4. Atualizar Banner (PATCH)

```bash
curl -X PATCH http://localhost:3000/api/banners/{id} ^
  -H "Content-Type: application/json" ^
  -d "{\"active\":false}"
```

**Resposta esperada:** Status 200 com JSON do banner atualizado

## 5. Desativar Banner (DELETE via query)

```bash
curl -X DELETE "http://localhost:3000/api/banners?id={id}"
```

**Resposta esperada:** Status 200 com mensagem de sucesso (banner desativado)

## 6. Deletar Banner permanentemente (DELETE)

```bash
curl -X DELETE http://localhost:3000/api/banners/{id}
```

**Resposta esperada:** Status 200 com mensagem de sucesso (banner deletado)

## Testes com horário agendado

### Criar banner com data futura
```bash
curl -X POST http://localhost:3000/api/banners ^
  -H "Content-Type: application/json" ^
  -d "{\"url\":\"https://lojaexemplo.com/produto/456\",\"image_url\":\"https://example.com/img2.jpg\",\"start_time\":\"2025-12-31T00:00:00Z\",\"end_time\":null,\"active\":true}"
```

### Buscar (não deve retornar se start_time for futuro)
```bash
curl "http://localhost:3000/api/banners?url=https://lojaexemplo.com/produto/456"
```

**Resposta esperada:** Status 404 (banner não encontrado)

## Verificar no Supabase Dashboard

1. Acesse SQL Editor
2. Execute: `SELECT * FROM banners ORDER BY created_at DESC;`
3. Verifique que os registros foram criados/atualizados
4. Verifique que o campo `views` incrementa a cada GET por URL
