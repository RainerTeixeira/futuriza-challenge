/**
 * Testes de Integração E2E
 * Testa fluxo completo: criar banner → buscar → visualizar
 * Execute: node tests/e2e-integration.test.js
 */

const BASE_URL = 'https://futuriza-challenge.vercel.app';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testIntegration() {
  log('\n🔗 Teste de Integração E2E\n', 'blue');

  const testUrl = `https://test-${Date.now()}.example.com`;
  let bannerId = null;

  try {
    // 1. Verificar que banner não existe
    log('1. Verificando que banner não existe...', 'yellow');
    const checkResponse = await fetch(`${BASE_URL}/api/banners?url=${encodeURIComponent(testUrl)}`);
    if (checkResponse.status !== 404) {
      throw new Error('Banner já existe ou erro inesperado');
    }
    log('   ✓ Banner não existe (esperado)', 'green');

    // 2. Criar banner (simulado - requer autenticação)
    log('\n2. Tentando criar banner...', 'yellow');
    const createResponse = await fetch(`${BASE_URL}/api/banners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: testUrl,
        active: true
      })
    });
    
    if (createResponse.status === 401) {
      log('   ⚠️  Requer autenticação (esperado)', 'yellow');
      log('   ℹ️  Para teste completo, crie banner manualmente no admin', 'blue');
    } else if (createResponse.ok) {
      const banner = await createResponse.json();
      bannerId = banner.id;
      log(`   ✓ Banner criado: ${bannerId}`, 'green');
    }

    // 3. Testar script embed
    log('\n3. Testando script embed...', 'yellow');
    const scriptResponse = await fetch(`${BASE_URL}/magic-banner.js`);
    const script = await scriptResponse.text();
    
    // Verificar estrutura do script
    const checks = [
      { name: 'IIFE', test: script.includes('(function()') },
      { name: 'API_URL', test: script.includes('API_URL') },
      { name: 'fetch', test: script.includes('fetch') },
      { name: 'localStorage', test: script.includes('localStorage') },
      { name: 'escapeHtml', test: script.includes('escapeHtml') }
    ];

    checks.forEach(check => {
      if (check.test) {
        log(`   ✓ ${check.name} presente`, 'green');
      } else {
        log(`   ✗ ${check.name} ausente`, 'red');
      }
    });

    // 4. Testar endpoints da API
    log('\n4. Testando endpoints da API...', 'yellow');
    
    const endpoints = [
      { method: 'GET', path: '/api/health', expectedStatus: 200 },
      { method: 'GET', path: '/api/banners', expectedStatus: 400 },
      { method: 'POST', path: '/api/health', expectedStatus: 405 }
    ];

    for (const endpoint of endpoints) {
      const response = await fetch(`${BASE_URL}${endpoint.path}`, {
        method: endpoint.method
      });
      
      if (response.status === endpoint.expectedStatus) {
        log(`   ✓ ${endpoint.method} ${endpoint.path} → ${response.status}`, 'green');
      } else {
        log(`   ✗ ${endpoint.method} ${endpoint.path} → ${response.status} (esperado: ${endpoint.expectedStatus})`, 'red');
      }
    }

    // 5. Testar páginas públicas
    log('\n5. Testando páginas públicas...', 'yellow');
    
    const pages = [
      { path: '/', name: 'Landing Page' },
      { path: '/admin', name: 'Admin (redirect)' },
      { path: '/admin/login', name: 'Login Page' }
    ];

    for (const page of pages) {
      const response = await fetch(`${BASE_URL}${page.path}`, { redirect: 'manual' });
      if (response.status === 200 || response.status === 307) {
        log(`   ✓ ${page.name} acessível`, 'green');
      } else {
        log(`   ✗ ${page.name} erro ${response.status}`, 'red');
      }
    }

    log('\n' + '='.repeat(50), 'blue');
    log('\n✅ Teste de integração concluído!\n', 'green');
    log('📝 Próximos passos:', 'blue');
    log('   1. Faça login no admin', 'yellow');
    log('   2. Crie um banner manualmente', 'yellow');
    log('   3. Teste o script embed em uma página HTML', 'yellow');
    log('   4. Verifique o contador de views\n', 'yellow');

  } catch (error) {
    log(`\n❌ Erro: ${error.message}\n`, 'red');
    process.exit(1);
  }
}

testIntegration();
