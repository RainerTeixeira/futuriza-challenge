# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.0.0] - 2024-01-01

### Adicionado

#### Etapa 1 - Setup Inicial
- Configuração Next.js 14 com App Router
- TypeScript configurado
- Tailwind CSS + shadcn/ui
- Cliente Supabase

#### Etapa 2 - Database Schema
- Tabela `banners` com campos completos
- Índices otimizados
- Bucket de storage configurado
- Políticas de acesso

#### Etapa 3 - API Routes
- GET /api/banners?url={url}
- POST /api/banners
- GET /api/banners/{id}
- PATCH /api/banners/{id}
- DELETE /api/banners/{id}
- Cliente Supabase server-side

#### Etapa 4 - Painel Admin
- Página de listagem de banners
- Formulário de criação
- Upload de imagens
- Preview em tempo real
- Toggle ativo/inativo
- Exclusão de banners

#### Etapa 5 - Script Embutível
- Script IIFE ES5 compatível
- Carregamento assíncrono
- Botão de fechar
- localStorage para persistência
- Animações CSS
- Atributos customizáveis

#### Etapa 6 - Extras e Polish
- Autenticação com Supabase Auth
- Página de login
- Middleware de proteção
- Contador de visualizações
- Animações slide-in/fade-out
- Health check endpoint
- CI/CD com GitHub Actions
- Minificação automática

#### Etapa 7 - Documentação
- README completo
- Guia de deploy
- Checklist de submissão
- Guias de teste
- CHANGELOG

### Segurança

- Escape de HTML no script embed
- Service Role Key apenas no servidor
- Middleware de autenticação
- CORS configurado
- Validação de inputs

### Performance

- Server Components
- Carregamento assíncrono do script
- Minificação do script (~2KB)
- Otimização de imagens
- Índices no banco de dados

## [0.1.0] - 2024-01-01

### Adicionado
- Setup inicial do projeto
- Estrutura básica de pastas
