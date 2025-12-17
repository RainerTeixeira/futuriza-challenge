# Testes do Script Embutível

## Pré-requisitos
- Servidor rodando: `npm run dev`
- Banner cadastrado no admin

## 1. Teste Básico

1. Abrir `tests/test-embed.html` no navegador
2. Verificar URL atual exibida na página
3. Criar banner no admin com essa URL
4. Recarregar página de teste

✅ Banner deve aparecer no topo da página

## 2. Teste de Fechamento

1. Clicar no botão "×" no canto superior direito
2. Banner deve desaparecer com animação
3. Recarregar a página

✅ Banner não deve aparecer novamente

## 3. Limpar localStorage

```js
// No console do navegador
localStorage.removeItem('magic-banner-closed');
```

Recarregar página

✅ Banner deve aparecer novamente

## 4. Teste com URL Customizada

Criar arquivo `test-custom-url.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Teste URL Customizada</title>
</head>
<body>
  <h1>Teste com data-url</h1>
  <script 
    src="http://localhost:3000/magic-banner.js" 
    data-url="https://lojaexemplo.com/produto/123">
  </script>
</body>
</html>
```

1. Criar banner com URL: `https://lojaexemplo.com/produto/123`
2. Abrir `test-custom-url.html`

✅ Banner deve aparecer mesmo que a URL da página seja diferente

## 5. Teste com Target Customizado

```html
<!DOCTYPE html>
<html>
<head>
  <title>Teste Target</title>
</head>
<body>
  <div id="header">Header</div>
  <div id="content">
    <h1>Conteúdo</h1>
  </div>
  <script 
    src="http://localhost:3000/magic-banner.js" 
    data-target="#header">
  </script>
</body>
</html>
```

✅ Banner deve ser injetado dentro do `#header`

## 6. Teste de Erro 404

1. Abrir página sem banner cadastrado
2. Abrir console do navegador

✅ Não deve haver erros fatais
✅ Deve aparecer warning: "Magic Banner: Failed to load banner"

## 7. Teste de Agendamento

1. Criar banner com `start_time` futuro
2. Abrir página de teste

✅ Banner não deve aparecer

3. Atualizar banner para `start_time` passado
4. Recarregar página

✅ Banner deve aparecer

## 8. Teste de Responsividade

1. Abrir página com banner
2. Redimensionar janela do navegador
3. Testar em mobile (DevTools)

✅ Banner deve se ajustar à largura
✅ Padding do body deve se ajustar

## 9. Teste de Performance

```js
// No console do navegador
performance.getEntriesByType('resource')
  .filter(r => r.name.includes('magic-banner'))
```

✅ Script deve carregar em < 100ms
✅ Não deve bloquear renderização da página

## 10. Teste de Segurança (XSS)

1. Criar banner com URL: `javascript:alert('XSS')`
2. Abrir página de teste

✅ URL deve ser escapada
✅ Não deve executar JavaScript

## 11. Minificação

```bash
# Instalar terser
npm install -g terser

# Minificar
npm run minify
```

✅ Arquivo `public/magic-banner.min.js` deve ser criado
✅ Tamanho deve ser < 2KB

## 12. Teste em Produção

1. Deploy no Vercel
2. Atualizar script para usar URL de produção:

```html
<script src="https://seu-app.vercel.app/magic-banner.js"></script>
```

✅ Script deve funcionar em produção
✅ CORS deve estar configurado corretamente

## Comandos Úteis

### Limpar cache do localStorage
```js
localStorage.clear();
```

### Ver banner fechado
```js
console.log(localStorage.getItem('magic-banner-closed'));
```

### Forçar exibição do banner
```js
localStorage.removeItem('magic-banner-closed');
location.reload();
```
