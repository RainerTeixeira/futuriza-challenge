# 🚀 Guia de Deploy - Magic Banner Plugin

**Versão:** 1.0.1  
**Última atualização:** 17/01/2025

## Pré-requisitos

- [ ] Conta no [GitHub](https://github.com)
- [ ] Conta no [Vercel](https://vercel.com)
- [ ] Conta no [Supabase](https://supabase.com)
- [ ] Node.js 18+ instalado
- [ ] Git instalado

## Passo 1: Preparar Supabase

### 1.1 Criar Projeto Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em "New Project"
3. Preencha:
   - Nome: `magic-banner`
   - Database Password: (anote a senha)
   - Region: Escolha mais próxima
4. Aguarde criação (~2 minutos)

### 1.2 Aplicar Schema do Banco

1. Vá em **SQL Editor**
2. Copie conteúdo de `db/schema.sql`
3. Execute
4. Copie conteúdo de `db/storage.sql`
5. Execute

### 1.3 Criar Usuário Admin

1. Vá em **Authentication > Users**
2. Clique em "Add User"
3. Email: `admin@example.com`
4. Senha: `admin123456`
5. Marque "Auto Confirm User"
6. Clique em "Create User"

### 1.4 Coletar Credenciais

1. Vá em **Settings > API**
2. Copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → `SUPABASE_SERVICE_ROLE_KEY`

## Passo 2: Preparar GitHub

### 2.1 Criar Repositório

```bash
# Inicializar git (se ainda não fez)
git init

# Adicionar remote
git remote add origin https://github.com/seu-usuario/futuriza-challenge.git

# Commit inicial
git add .
git commit -m "feat: initial commit - Magic Banner Plugin v1.0.1"

# Push
git push -u origin master
```

### 2.2 Configurar Secrets (para CI)

1. Vá em **Settings > Secrets and variables > Actions**
2. Adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## Passo 3: Deploy no Vercel

### 3.1 Conectar Repositório

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Import Git Repository
4. Selecione seu repositório `futuriza-challenge`
5. Clique em "Import"

### 3.2 Configurar Variáveis de Ambiente

Na tela de configuração, adicione:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key-aqui
NEXT_PUBLIC_APP_URL=https://futuriza-challenge.vercel.app
```

**Importante:** Use a URL final do Vercel em `NEXT_PUBLIC_APP_URL`.

### 3.3 Deploy

1. Clique em "Deploy"
2. Aguarde build (~2-3 minutos)
3. Após deploy, copie a URL gerada

### 3.4 Atualizar NEXT_PUBLIC_APP_URL (se necessário)

1. Vá em **Settings > Environment Variables**
2. Edite `NEXT_PUBLIC_APP_URL`
3. Cole a URL do Vercel
4. Salve
5. Vá em **Deployments**
6. Clique nos 3 pontos do último deploy
7. Clique em "Redeploy"

## Passo 4: Verificar Deploy

### 4.1 Testar URLs

```bash
# Health check
curl https://futuriza-challenge.vercel.app/api/health

# Deve retornar: {"ok":true,"time":"...","service":"magic-banner-api"}
```

### 4.2 Testar Admin

1. Acesse `https://futuriza-challenge.vercel.app/admin/login`
2. Faça login com:
   - Email: `admin@example.com`
   - Senha: `admin123456`
3. Crie um banner de teste

### 4.3 Testar Script Embed

Crie arquivo `test.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Teste Magic Banner</title>
</head>
<body>
  <h1>Teste de Integração</h1>
  <script src="https://futuriza-challenge.vercel.app/magic-banner.js"></script>
</body>
</html>
```

Abra no navegador e verifique se banner aparece.

## Passo 5: Configurações Opcionais

### 5.1 Domínio Customizado

1. No Vercel, vá em **Settings > Domains**
2. Adicione seu domínio
3. Configure DNS conforme instruções

### 5.2 Desabilitar Confirmação de Email (Dev)

No Supabase:
1. **Authentication > Settings**
2. **Email Auth**
3. Desmarque "Enable email confirmations"

### 5.3 Configurar CORS (já configurado)

Já está configurado em `next.config.js`:

```js
async headers() {
  return [
    {
      source: '/magic-banner.js',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
      ],
    },
  ]
}
```

## Troubleshooting

### Build falha no Vercel

**Erro:** `Module not found`

**Solução:**
```bash
# Limpar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install
git add .
git commit -m "fix: update dependencies"
git push
```

### API retorna 500

**Erro:** `Invalid Supabase credentials`

**Solução:**
- Verifique variáveis de ambiente no Vercel
- Confirme que `SUPABASE_SERVICE_ROLE_KEY` está correta
- Redeploy após corrigir

### Script não carrega

**Erro:** `CORS policy`

**Solução:**
- Verifique `next.config.js`
- Confirme que headers CORS estão configurados
- Limpe cache do navegador (Ctrl+Shift+R)

### Login não funciona

**Erro:** `Invalid login credentials`

**Solução:**
- Verifique se usuário foi criado no Supabase
- Confirme que email foi confirmado (Auto Confirm User)
- Tente resetar senha no Supabase Dashboard

### Imagens não aparecem

**Erro:** `Failed to load image`

**Solução:**
- Verifique políticas de Storage no Supabase
- Execute `db/storage.sql` novamente
- Confirme que bucket `banner-images` é público

## URLs Finais para Submissão

Após deploy completo, você terá:

✅ **Repositório GitHub:**  
`https://github.com/RainerTeixeira/futuriza-challenge`

✅ **App em Produção:**  
`https://futuriza-challenge.vercel.app`

✅ **Painel Admin:**  
`https://futuriza-challenge.vercel.app/admin/login`

✅ **API Endpoint:**  
`https://futuriza-challenge.vercel.app/api/banners`

✅ **Script Embed:**  
`https://futuriza-challenge.vercel.app/magic-banner.js`

✅ **Health Check:**  
`https://futuriza-challenge.vercel.app/api/health`

✅ **Site de Teste:**  
`https://rainerteixeira.github.io/atelie-urbano/`

## Checklist Final

- [ ] Supabase configurado
- [ ] Schema aplicado
- [ ] Usuário admin criado
- [ ] Repositório no GitHub
- [ ] Deploy no Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Health check retorna 200
- [ ] Login funciona
- [ ] Banner pode ser criado
- [ ] Script embed funciona
- [ ] CI/CD rodando
- [ ] Testes E2E passando

## 🎉 Pronto para Submissão!

Seu projeto está pronto para ser submetido no formulário Futuriza.

**Versão:** 1.0.1  
**Status:** ✅ Produção  
**Deploy:** Vercel  
**Database:** Supabase  
**CI/CD:** GitHub Actions
