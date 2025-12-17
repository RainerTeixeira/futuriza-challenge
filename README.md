# Magic Banner Plugin

Plugin para criação e gerenciamento de banners dinâmicos com agendamento, analytics e script embutível.

## 🚀 Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Supabase** (Database + Storage + Auth)

## ✨ Funcionalidades

- ✅ CRUD completo de banners
- ✅ Upload de imagens para Supabase Storage
- ✅ Agendamento (start_time / end_time)
- ✅ Contador de visualizações
- ✅ Preview em tempo real
- ✅ Script embutível (ES5 compatível)
- ✅ Autenticação com Supabase Auth
- ✅ Animações CSS (slide-in / fade-out)
- ✅ API REST completa
- ✅ CI/CD com GitHub Actions

## 📦 Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar Supabase

1. Criar projeto no [Supabase](https://supabase.com)
2. Copiar variáveis de ambiente:

```bash
copy .env.example .env
```

3. Preencher `.env` com suas credenciais:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Criar schema do banco

No Supabase Dashboard > SQL Editor, execute:

```sql
-- db/schema.sql
-- Copie e execute o conteúdo do arquivo
```

### 4. Configurar Storage

No Supabase Dashboard > SQL Editor, execute:

```sql
-- db/storage.sql
-- Copie e execute o conteúdo do arquivo
```

### 5. Criar usuário admin

No Supabase Dashboard > Authentication > Users:
- Clique em "Add User"
- Email: `admin@example.com`
- Senha: `admin123456`
- Confirme o email automaticamente

### 6. Executar em desenvolvimento

```bash
npm run dev
```

Acesse:
- **App**: [http://localhost:3000](http://localhost:3000)
- **Admin**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Health**: [http://localhost:3000/api/health](http://localhost:3000/api/health)

## 🎯 Uso

### Painel Admin

1. Acesse `/admin` e faça login
2. Clique em "Criar Banner"
3. Preencha:
   - URL do destino
   - Upload de imagem
   - Datas de início/fim (opcional)
   - Status ativo/inativo
4. Visualize preview em tempo real
5. Salve o banner

### Script Embutível

Adicione ao seu site:

```html
<script src="http://localhost:3000/magic-banner.js"></script>
```

**Produção:**
```html
<script src="https://seu-app.vercel.app/magic-banner.js"></script>
```

**Com opções:**
```html
<script 
  src="https://seu-app.vercel.app/magic-banner.js"
  data-url="https://meusite.com/produto/123"
  data-api="https://seu-app.vercel.app"
  data-target="body">
</script>
```

## 📡 API Endpoints

### GET /api/banners?url={url}
Busca banner ativo para URL específica

```bash
curl "http://localhost:3000/api/banners?url=https://exemplo.com"
```

### POST /api/banners
Cria novo banner

```bash
curl -X POST http://localhost:3000/api/banners \
  -H "Content-Type: application/json" \
  -d '{"url":"https://exemplo.com","active":true}'
```

### GET /api/banners/{id}
Busca banner por ID

### PATCH /api/banners/{id}
Atualiza banner

### DELETE /api/banners/{id}
Remove banner

### GET /api/health
Health check

```bash
curl http://localhost:3000/api/health
```

## 🧪 Testes

```bash
# Testes da API
# Ver: tests/api-tests.md

# Testes do Admin
# Ver: tests/admin-tests.md

# Testes do Script Embed
# Ver: tests/embed-tests.md

# Testes dos Extras
# Ver: tests/extras-tests.md
```

## 🏗️ Build e Deploy

### Build local

```bash
npm run build
npm start
```

### Minificar script

```bash
npm run minify
```

### Deploy no Vercel

1. Push para GitHub
2. Conectar repositório no Vercel
3. Adicionar variáveis de ambiente
4. Deploy automático

### CI/CD

GitHub Actions configurado em `.github/workflows/ci.yml`:
- ✅ Lint
- ✅ Build
- ✅ Minificação
- ✅ Testes

## 📁 Estrutura do Projeto

```
futuriza-challenge/
├── app/
│   ├── admin/              # Painel administrativo
│   │   ├── login/          # Página de login
│   │   ├── new/            # Criar banner
│   │   └── page.tsx        # Lista de banners
│   ├── api/
│   │   ├── banners/        # CRUD de banners
│   │   └── health/         # Health check
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── BannerPreview.tsx   # Preview do banner
├── db/
│   ├── schema.sql          # Schema do banco
│   ├── storage.sql         # Config do storage
│   └── auth-setup.sql      # Setup de auth
├── lib/
│   ├── supabaseClient.ts   # Cliente Supabase (client)
│   ├── supabaseServer.ts   # Cliente Supabase (server)
│   ├── types.ts            # Tipos TypeScript
│   └── utils.ts            # Utilitários
├── public/
│   ├── magic-banner.js     # Script embutível
│   └── README.md           # Docs do script
├── services/
│   └── bannerService.ts    # Serviço de banners
├── tests/
│   ├── api-tests.md
│   ├── admin-tests.md
│   ├── embed-tests.md
│   ├── extras-tests.md
│   └── test-embed.html
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions
└── middleware.ts           # Auth middleware
```

## 🔐 Segurança

- ✅ Autenticação com Supabase Auth
- ✅ Service Role Key apenas no servidor
- ✅ Escape de HTML no script embed
- ✅ CORS configurado
- ✅ Middleware de proteção

## 📊 Analytics

- Contador de views automático
- Visualizações incrementam a cada exibição
- Dados persistidos no Supabase

## 🎨 Customização

### Estilos do Banner

Edite `public/magic-banner.js`:
```js
container.style.cssText = 'position:fixed;top:0;...';
```

### Animações

Ajuste transições em `public/magic-banner.js`:
```js
transition:opacity 0.3s,transform 0.3s;
```

## 📝 Licença

MIT

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no GitHub.
