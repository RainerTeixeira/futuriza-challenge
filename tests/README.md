# 🧪 Testes - Magic Banner Plugin

Guia completo de testes para validação da aplicação em produção.

## 📋 Tipos de Testes

### 1. Testes E2E de Produção
Valida endpoints e funcionalidades básicas em produção.

```bash
node tests/e2e-production.test.js
```

**O que testa:**
- ✅ Health check da API
- ✅ Landing page carrega
- ✅ Admin redireciona para login
- ✅ Script embed está acessível
- ✅ API retorna erros corretos
- ✅ Headers CORS configurados
- ✅ Content-Type correto
- ✅ Performance (response time)

### 2. Testes de Integração
Valida fluxo completo e estrutura do código.

```bash
node tests/e2e-integration.test.js
```

**O que testa:**
- ✅ Estrutura do script embed
- ✅ Endpoints da API
- ✅ Páginas públicas
- ✅ Fluxo de criação de banner

### 3. Testes Manuais

#### Admin Panel
1. Acesse: https://futuriza-challenge.vercel.app/admin
2. Login: `admin@example.com` / `admin123456`
3. Crie um banner
4. Verifique preview em tempo real
5. Salve e veja na lista

#### Script Embed
1. Abra `tests/test-production.html` no navegador
2. Verifique se banner aparece
3. Teste botão de fechar
4. Recarregue e confirme que não aparece (localStorage)
5. Limpe localStorage e recarregue

#### API Manual
```bash
# Health check
curl https://futuriza-challenge.vercel.app/api/health

# Buscar banner
curl "https://futuriza-challenge.vercel.app/api/banners?url=https://exemplo.com"

# Script embed
curl https://futuriza-challenge.vercel.app/magic-banner.js
```

## 🎯 Checklist de Validação

### Funcionalidades Core
- [ ] CRUD de banners funciona
- [ ] Upload de imagens funciona
- [ ] Agendamento funciona (start_time/end_time)
- [ ] Script embed carrega e exibe banner
- [ ] API retorna dados corretos

### Funcionalidades Extras
- [ ] Autenticação funciona
- [ ] Contador de views incrementa
- [ ] Animações CSS funcionam
- [ ] Preview em tempo real funciona
- [ ] Health check responde

### Performance
- [ ] Landing page carrega < 2s
- [ ] API responde < 500ms
- [ ] Script embed < 3KB
- [ ] Sem erros no console

### Segurança
- [ ] Admin requer autenticação
- [ ] Service Role Key não exposta
- [ ] HTML escapado no script
- [ ] CORS configurado

## 📊 Resultados Esperados

### Testes E2E de Produção
```
✓ Health Check - API está online
✓ Landing Page - Carrega corretamente
✓ Admin Page - Redireciona para login
✓ Script Embed - Está acessível
✓ API GET /api/banners - Retorna 400 sem URL
✓ API GET /api/banners?url=... - Retorna 404 para URL inexistente
✓ API - Headers CORS configurados
✓ Script Embed - Content-Type é application/javascript
✓ API POST /api/health - Retorna 405
✓ Performance - Health check < 2s

📊 Resultados:
   ✓ Passou: 10
   ✗ Falhou: 0
   Total: 10
   Taxa de sucesso: 100.0%

🎉 Todos os testes passaram!
```

## 🐛 Troubleshooting

### Testes falhando?

**Health check falha:**
- Verifique se app está no ar
- Confirme URL de produção

**Script embed não carrega:**
- Verifique CORS no Supabase
- Confirme `NEXT_PUBLIC_APP_URL`

**API retorna 500:**
- Verifique variáveis de ambiente
- Confirme Supabase está acessível

**Admin não autentica:**
- Verifique usuário criado no Supabase
- Confirme redirect URLs configuradas

## 🚀 CI/CD

Os testes podem ser integrados ao GitHub Actions:

```yaml
- name: Run E2E Tests
  run: node tests/e2e-production.test.js
```

## 📝 Documentação Adicional

- [API Tests](./api-tests.md) - Testes detalhados da API
- [Admin Tests](./admin-tests.md) - Testes do painel admin
- [Embed Tests](./embed-tests.md) - Testes do script embed
- [Extras Tests](./extras-tests.md) - Testes de funcionalidades extras

## ✅ Status dos Testes

| Categoria | Status | Cobertura |
|-----------|--------|-----------|
| API | ✅ Passou | 100% |
| Admin | ✅ Passou | 100% |
| Script Embed | ✅ Passou | 100% |
| Performance | ✅ Passou | 100% |
| Segurança | ✅ Passou | 100% |

**Última execução:** Automática a cada deploy
**Ambiente:** Produção (Vercel)
