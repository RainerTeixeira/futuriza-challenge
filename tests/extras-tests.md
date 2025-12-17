# Testes - Extras e Polish

## 1. Health Check Endpoint

```bash
curl http://localhost:3000/api/health
```

**Resposta esperada:**
```json
{
  "ok": true,
  "time": "2024-01-01T00:00:00.000Z",
  "service": "magic-banner-api"
}
```

✅ Status 200
✅ JSON com campos ok, time, service

## 2. Autenticação Supabase

### Criar usuário admin

1. Acessar Supabase Dashboard
2. Authentication > Users > Add User
3. Email: `admin@example.com`
4. Senha: `admin123456`
5. Confirmar email automaticamente

### Testar login

1. Acessar `http://localhost:3000/admin`
2. Deve redirecionar para `/admin/login`
3. Fazer login com credenciais criadas
4. Deve redirecionar para `/admin`

✅ Redirecionamento funciona
✅ Login autentica corretamente
✅ Sessão persiste após reload

### Testar logout

1. Clicar no botão "Sair" no header
2. Deve redirecionar para `/admin/login`
3. Tentar acessar `/admin` novamente
4. Deve redirecionar para login

✅ Logout funciona
✅ Sessão é destruída

## 3. Contador de Views

### Verificar incremento

1. Criar banner no admin
2. Abrir página com script embed
3. Banner aparece
4. Verificar no Supabase:

```sql
SELECT id, url, views FROM banners ORDER BY created_at DESC LIMIT 1;
```

5. Recarregar página várias vezes
6. Verificar views incrementando

✅ Views incrementa a cada exibição
✅ Contador persiste no banco

### Testar via API

```bash
# Primeira chamada
curl "http://localhost:3000/api/banners?url=https://exemplo.com"

# Segunda chamada
curl "http://localhost:3000/api/banners?url=https://exemplo.com"
```

Verificar no banco que views aumentou de 1 para 2.

## 4. Animações CSS

### Testar slide-in

1. Abrir página com script embed
2. Banner deve aparecer com animação de slide (de cima para baixo)
3. Observar transição suave

✅ Animação de entrada funciona
✅ Transição é suave (0.3s)

### Testar fade-out ao fechar

1. Clicar no botão "×"
2. Banner deve desaparecer com fade
3. Transição deve ser suave

✅ Animação de saída funciona
✅ Elemento é removido após animação

## 5. CI/CD - GitHub Actions

### Setup

1. Criar repositório no GitHub
2. Push do código
3. Adicionar secrets no GitHub:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Testar workflow

1. Fazer commit e push
2. Verificar Actions tab no GitHub
3. Workflow deve executar:
   - Install dependencies
   - Lint
   - Build
   - Minify script

✅ Workflow executa sem erros
✅ Build completa com sucesso
✅ Minificação gera arquivo .min.js

### Testar PR

1. Criar branch
2. Fazer alteração
3. Abrir Pull Request
4. Workflow deve rodar automaticamente

✅ CI roda em PRs
✅ Merge só é permitido se build passar

## 6. Minificação Automática

```bash
npm run minify
```

Verificar:
- `public/magic-banner.min.js` criado
- Tamanho reduzido (~2KB)
- Funcionalidade mantida

✅ Arquivo minificado gerado
✅ Tamanho reduzido significativamente
✅ Script funciona após minificação

## 7. Teste Integrado Completo

### Fluxo completo

1. **Login**: Acessar `/admin/login` e autenticar
2. **Criar banner**: Criar banner com imagem
3. **Verificar API**: GET `/api/banners?url=...`
4. **Embed**: Abrir página com script
5. **Views**: Verificar contador incrementando
6. **Animação**: Observar slide-in
7. **Fechar**: Clicar em fechar e ver fade-out
8. **Persistência**: Recarregar e verificar que não aparece
9. **Health**: Verificar `/api/health`
10. **Logout**: Sair do admin

✅ Todos os passos funcionam
✅ Integração completa sem erros

## Comandos Úteis

### Verificar views no banco
```sql
SELECT url, views, active FROM banners ORDER BY views DESC;
```

### Resetar views
```sql
UPDATE banners SET views = 0;
```

### Verificar sessão Supabase
```js
// No console do navegador
const { data } = await supabase.auth.getSession();
console.log(data);
```

### Limpar sessão
```js
await supabase.auth.signOut();
```
