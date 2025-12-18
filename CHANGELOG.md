# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.1] - 2025-12-17

### 📝 Documentação

- Adicionada documentação JSDoc completa ao `magic-banner.js`
- Documentadas todas as funções com @param, @returns, @description
- Adicionado cabeçalho do arquivo com exemplos de uso
- Documentadas constantes com @constant e @default
- Adicionados comentários inline para blocos de código
- Incluída lista de features no cabeçalho
- Documentadas medidas de segurança (escape HTML, XSS)
- Script agora é auto-documentado para consumo público

### 🔧 Correções

- Corrigidas URLs de produção no SUBMISSION.md
- Atualizado DEPLOY.md com instruções precisas
- Corrigidas informações de contato
- Ajustadas métricas do projeto (2.5k LOC, 7 endpoints)

## [1.0.0] - 2025-12-17

### 🎉 Release Inicial - Magic Banner Plugin

Primeira versão completa do plugin de banners dinâmicos com todas as funcionalidades core e extras implementadas.

### ✨ Adicionado

#### 🏗️ Infraestrutura
- Next.js 14 com App Router e TypeScript
- Tailwind CSS 3 + shadcn/ui
- Supabase (Database + Storage + Auth)
- ESLint, Prettier, PostCSS

#### 🗄️ Database
- Tabela `banners` com 11 campos
- 3 índices otimizados (url, active, slug)
- Trigger automático para `updated_at`
- Bucket Storage `banner-images`
- Políticas RLS e Storage

#### 🔌 API REST (7 endpoints)
- GET /api/banners?url={url} - Busca banner ativo
- POST /api/banners - Cria banner
- GET /api/banners/{id} - Busca por ID
- PATCH /api/banners/{id} - Atualiza banner
- DELETE /api/banners/{id} - Remove banner
- POST /api/upload - Upload de imagens
- GET /api/health - Health check

#### 🎨 Painel Admin
- Página de login (/admin/login)
- Dashboard de banners (/admin)
- Formulário de criação (/admin/new)
- Preview em tempo real
- Upload com drag & drop
- Agendamento (start_time/end_time)

#### 📦 Componentes
- BannerPreview.tsx - Preview em tempo real
- BannerList.tsx - Lista com grid responsivo

#### 🚀 Script Embutível
- IIFE ES5 compatível (~2KB minificado)
- Carregamento assíncrono
- Animações CSS (slide-in/fade-out)
- Persistência no localStorage
- Escape de HTML para segurança
- Atributos customizáveis (data-url, data-api, data-target)

#### 🔐 Segurança
- Supabase Auth integrado
- Middleware de proteção de rotas
- Service Role Key apenas no servidor
- Escape de HTML no script
- CORS configurado

#### 📊 Analytics
- Contador de visualizações
- Incremento automático
- Persistência no banco

#### 🧪 Testes
- Playwright E2E configurado
- 13 etapas de teste validadas
- Screenshots automáticos
- GitHub Actions (playwright.yml)

#### 🔧 Serviços
- bannerService.ts - API client
- supabaseClient.ts - Browser client
- supabaseServer.ts - Server client
- types.ts - TypeScript types

#### 📚 Documentação
- README.md completo
- CHANGELOG.md (este arquivo)
- DEPLOY.md - Guia de deploy
- SUBMISSION.md - Checklist de submissão
- public/README.md - Docs do script

#### 🎯 Site de Teste
- Ateliê Urbano (GitHub Pages)
- 7 páginas de produtos
- Script embutível integrado

#### ⚙️ CI/CD
- GitHub Actions configurado
- Lint + Build + Testes
- Deploy automático Vercel

### 🔧 Alterado
- package.json com scripts minify e preview
- next.config.js com CORS e imagens Supabase

### 🐛 Corrigido
- RLS Policies no Supabase
- Suporte a URLs file:// case-insensitive
- Cache issues com force-dynamic
- Upload de imagens com validação

### 📊 Métricas
- **Linhas de Código:** ~2.500
- **Componentes React:** 5
- **API Endpoints:** 7
- **Testes E2E:** 13 etapas
- **Tamanho do Script:** 2.1KB (minificado)
- **Performance Lighthouse:** 95+
- **Cobertura:** 100% dos requisitos

### 🎯 Funcionalidades

#### ✅ Core (100%)
- [x] CRUD completo de banners
- [x] Upload de imagens (Supabase Storage)
- [x] Agendamento (start_time/end_time)
- [x] Script embutível ES5
- [x] API REST completa

#### ✅ Extras (100%)
- [x] Autenticação (Supabase Auth)
- [x] Analytics (contador de views)
- [x] Preview em tempo real
- [x] Animações CSS
- [x] CI/CD (GitHub Actions)
- [x] Testes E2E (Playwright)
- [x] Site de teste (Ateliê Urbano)
- [x] Documentação completa

---

## [Unreleased]

### Planejado para futuras versões
- Testes unitários (Jest/Vitest)
- Internacionalização (i18n)
- Dark mode / Light mode
- Analytics avançado (gráficos)
- A/B testing de banners
- Webhooks para eventos
- Dashboard de métricas
- Exportação de relatórios

## [0.0.1] - 2025-12-16

### 🎬 Início do Projeto

Primeiro commit e setup inicial do projeto.

### ✨ Adicionado

- Setup Next.js 14 com App Router
- Configuração TypeScript
- Tailwind CSS + shadcn/ui
- Cliente Supabase
- Estrutura básica de pastas
- Configuração ESLint e Prettier
- Arquivo .env.example
- README inicial

---

[1.0.1]: https://github.com/RainerTeixeira/futuriza-challenge/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/RainerTeixeira/futuriza-challenge/compare/v0.0.1...v1.0.0
[0.0.1]: https://github.com/RainerTeixeira/futuriza-challenge/releases/tag/v0.0.1
