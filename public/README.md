# Magic Banner - Script Embutível

## Instalação

Adicione o script no `<head>` ou antes do `</body>` do seu site:

```html
<script src="https://SEU_APP.vercel.app/magic-banner.js"></script>
```

## Desenvolvimento Local

```html
<script src="http://localhost:3000/magic-banner.js"></script>
```

## Atributos Personalizados

### data-url
Especifica uma URL customizada para buscar o banner (padrão: URL atual da página)

```html
<script 
  src="https://SEU_APP.vercel.app/magic-banner.js" 
  data-url="https://meusite.com/categoria/produto">
</script>
```

### data-api
Define a URL base da API (útil para ambientes de staging)

```html
<script 
  src="https://SEU_APP.vercel.app/magic-banner.js" 
  data-api="https://staging.meuapp.com">
</script>
```

### data-target
Seletor CSS onde o banner será injetado (padrão: body)

```html
<script 
  src="https://SEU_APP.vercel.app/magic-banner.js" 
  data-target="#header">
</script>
```

## Funcionalidades

- ✅ **Não bloqueia o carregamento** - Carrega de forma assíncrona
- ✅ **Botão de fechar** - Usuário pode fechar o banner
- ✅ **Persistência** - Lembra que foi fechado usando localStorage
- ✅ **Responsivo** - Ajusta automaticamente o padding da página
- ✅ **Seguro** - Escape de HTML para prevenir XSS
- ✅ **Compatível** - ES5 para suporte a navegadores antigos
- ✅ **Leve** - ~3KB não minificado

## Minificação para Produção

### Usando Terser (recomendado)

```bash
npm install -g terser

terser public/magic-banner.js \
  -o public/magic-banner.min.js \
  -c -m \
  --comments false
```

### Usando UglifyJS

```bash
npm install -g uglify-js

uglifyjs public/magic-banner.js \
  -o public/magic-banner.min.js \
  -c -m
```

### Adicionar ao package.json

```json
{
  "scripts": {
    "minify": "terser public/magic-banner.js -o public/magic-banner.min.js -c -m --comments false"
  }
}
```

Então execute:
```bash
npm run minify
```

## CI/CD - GitHub Actions

Adicione ao `.github/workflows/deploy.yml`:

```yaml
- name: Minify Magic Banner
  run: |
    npm install -g terser
    terser public/magic-banner.js -o public/magic-banner.min.js -c -m --comments false
```

## Teste Local

1. Inicie o servidor: `npm run dev`
2. Abra `tests/test-embed.html` no navegador
3. Crie um banner no admin com a URL da página de teste
4. Recarregue a página de teste
5. O banner deve aparecer no topo

## Como Funciona

1. Script carrega de forma assíncrona
2. Captura a URL atual da página (ou `data-url`)
3. Faz fetch para `/api/banners?url=...`
4. Se encontrar banner ativo e dentro do período:
   - Injeta HTML no topo da página
   - Adiciona botão de fechar
   - Ajusta padding do body
5. Se usuário fechar, salva no localStorage
6. Não exibe novamente até limpar localStorage

## Troubleshooting

### Banner não aparece

- Verifique se existe banner cadastrado para a URL
- Verifique se o banner está ativo
- Verifique se está dentro do período (start_time/end_time)
- Abra o console do navegador para ver erros

### CORS Error

Configure CORS no Next.js (`next.config.js`):

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

### Banner aparece mesmo depois de fechar

Limpe o localStorage:
```js
localStorage.removeItem('magic-banner-closed');
```
