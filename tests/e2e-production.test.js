/**
 * Testes E2E para Produção
 * Execute: node tests/e2e-production.test.js
 */

const BASE_URL = 'https://futuriza-challenge.vercel.app';

// Cores para output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

let passed = 0;
let failed = 0;

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function test(name, fn) {
  try {
    await fn();
    passed++;
    log(`✓ ${name}`, 'green');
  } catch (error) {
    failed++;
    log(`✗ ${name}`, 'red');
    log(`  Error: ${error.message}`, 'red');
  }
}

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok && response.status !== 404) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return { response, data: await response.json().catch(() => null) };
}

// ============================================
// TESTES
// ============================================

async function runTests() {
  log('\n🧪 Iniciando Testes E2E em Produção\n', 'blue');
  log(`Base URL: ${BASE_URL}\n`, 'yellow');

  // 1. Health Check
  await test('Health Check - API está online', async () => {
    const { response, data } = await fetchJSON(`${BASE_URL}/api/health`);
    if (response.status !== 200) throw new Error('Health check falhou');
    if (!data || (!data.ok && data.status !== 'ok' && data.status !== 'healthy')) {
      throw new Error(`Status inesperado: ${JSON.stringify(data)}`);
    }
  });

  // 2. Landing Page
  await test('Landing Page - Carrega corretamente', async () => {
    const response = await fetch(BASE_URL);
    if (response.status !== 200) throw new Error('Landing page não carregou');
    const html = await response.text();
    if (!html.includes('Magic Banner Plugin')) throw new Error('Conteúdo não encontrado');
  });

  // 3. Admin Page
  await test('Admin Page - Redireciona para login', async () => {
    const response = await fetch(`${BASE_URL}/admin`, { redirect: 'manual' });
    if (response.status !== 307 && response.status !== 200) {
      throw new Error('Admin não redirecionou corretamente');
    }
  });

  // 4. Script Embed
  await test('Script Embed - Está acessível', async () => {
    const response = await fetch(`${BASE_URL}/magic-banner.js`);
    if (response.status !== 200) throw new Error('Script não encontrado');
    const script = await response.text();
    if (!script.includes('magic-banner-container')) throw new Error('Script inválido');
  });

  // 5. API - GET Banners (sem URL)
  await test('API GET /api/banners - Retorna erro sem URL', async () => {
    const response = await fetch(`${BASE_URL}/api/banners`);
    if (response.status !== 400 && response.status !== 422) {
      throw new Error(`Deveria retornar 400 ou 422, retornou ${response.status}`);
    }
  });

  // 6. API - GET Banners (com URL inexistente)
  await test('API GET /api/banners?url=... - Retorna 404 para URL inexistente', async () => {
    const testUrl = `https://test-${Date.now()}.example.com`;
    const { response } = await fetchJSON(`${BASE_URL}/api/banners?url=${encodeURIComponent(testUrl)}`);
    if (response.status !== 404) throw new Error('Deveria retornar 404');
  });

  // 7. CORS Headers
  await test('API - Headers CORS configurados', async () => {
    const response = await fetch(`${BASE_URL}/api/health`);
    const corsHeader = response.headers.get('access-control-allow-origin');
    if (!corsHeader) throw new Error('CORS header não encontrado');
  });

  // 8. Script Embed - Content-Type correto
  await test('Script Embed - Content-Type é application/javascript', async () => {
    const response = await fetch(`${BASE_URL}/magic-banner.js`);
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('javascript')) {
      throw new Error(`Content-Type incorreto: ${contentType}`);
    }
  });

  // 9. API - Método não permitido
  await test('API POST /api/health - Retorna 405', async () => {
    const response = await fetch(`${BASE_URL}/api/health`, { method: 'POST' });
    if (response.status !== 405) throw new Error('Deveria retornar 405');
  });

  // 10. Performance - Response Time
  await test('Performance - Health check < 2s', async () => {
    const start = Date.now();
    await fetch(`${BASE_URL}/api/health`);
    const duration = Date.now() - start;
    if (duration > 2000) throw new Error(`Muito lento: ${duration}ms`);
  });

  // Resultados
  log('\n' + '='.repeat(50), 'blue');
  log(`\n📊 Resultados:`, 'blue');
  log(`   ✓ Passou: ${passed}`, 'green');
  log(`   ✗ Falhou: ${failed}`, failed > 0 ? 'red' : 'green');
  log(`   Total: ${passed + failed}`, 'yellow');
  
  const successRate = ((passed / (passed + failed)) * 100).toFixed(1);
  log(`   Taxa de sucesso: ${successRate}%\n`, successRate === '100.0' ? 'green' : 'yellow');

  if (failed === 0) {
    log('🎉 Todos os testes passaram!\n', 'green');
  } else {
    log('⚠️  Alguns testes falharam. Verifique os erros acima.\n', 'red');
    process.exit(1);
  }
}

// Executar testes
runTests().catch(error => {
  log(`\n❌ Erro fatal: ${error.message}\n`, 'red');
  process.exit(1);
});
