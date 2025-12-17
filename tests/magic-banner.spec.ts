import { test, expect } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

test.describe.configure({ mode: 'serial' })

test.beforeEach(async ({ page, context }) => {
  await context.clearCookies()
  await context.clearPermissions()

  await page.addInitScript(() => {
    try {
      window.localStorage.clear()
      window.sessionStorage.clear()
    } catch {}
  })

  const cdp = await context.newCDPSession(page)
  await cdp.send('Network.enable')
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true })
})

const VERCEL_BASE = 'https://futuriza-challenge.vercel.app'
const GH_HOME_URL = 'https://rainerteixeira.github.io/atelie-urbano/index.html'
const GH_CONJUNTO_URL = 'https://rainerteixeira.github.io/atelie-urbano/conjunto.html'
const ADMIN_EMAIL = 'admin@example.com'
const ADMIN_PASSWORD = 'admin123456'

const SVG_UPLOAD_PATH =
  'C:\\Users\\raine\\OneDrive\\Imagens\\imagem teste banner\\banners\\home-frete-gratis-verao26.svg'

async function loginIfNeeded(page: any) {
  await page.goto(`${VERCEL_BASE}/admin`, { waitUntil: 'domcontentloaded' })

  if (page.url().includes('/admin/login')) {
    const email = page.getByPlaceholder('seu@email.com').or(page.locator('input[type="email"]'))
    const password = page.getByPlaceholder('••••••••').or(page.locator('input[type="password"]'))

    await email.waitFor({ state: 'visible', timeout: 15000 })
    await email.fill(ADMIN_EMAIL)
    await password.fill(ADMIN_PASSWORD)
    await page.getByRole('button', { name: 'Entrar' }).click()
    await page.waitForURL('**/admin', { timeout: 15000 })
  }
}

function artifactsDir(testInfo: any) {
  const dir = path.join(testInfo.project.outputDir, 'artifacts', 'magic-banner-demo')
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

async function snap(page: any, testInfo: any, name: string) {
  const dir = artifactsDir(testInfo)
  const filePath = path.join(dir, `${name}.png`)
  await page.screenshot({ path: filePath, fullPage: true })
  await testInfo.attach(name, { body: fs.readFileSync(filePath), contentType: 'image/png' })
  return filePath
}

async function findCardBySlug(page: any, slug: string) {
  const slugText = page.getByText(`Slug: ${slug}`)
  const card = slugText.locator('xpath=ancestor::div[contains(@class,"border")][1]')
  if (await card.isVisible().catch(() => false)) return card
  return null
}

async function deleteBannerBySlug(page: any, slug: string) {
  const card = await findCardBySlug(page, slug)
  if (!card) return false
  await card.getByRole('button', { name: 'Excluir' }).click()
  await page.waitForTimeout(1000)
  await page.reload({ waitUntil: 'domcontentloaded' })
  return true
}

async function createBanner(page: any, url: string, slug: string, imagePath: string) {
  await loginIfNeeded(page)
  await page.goto(`${VERCEL_BASE}/admin/new`, { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { name: 'Criar Novo Banner' })).toBeVisible({ timeout: 15000 })

  const urlInput = page
    .getByPlaceholder('https://exemplo.com/produto/123')
    .or(page.locator('input[name="url"], input#url'))
  const slugInput = page.getByPlaceholder('banner-promocional').or(page.locator('input[name="slug"], input#slug'))

  await urlInput.waitFor({ state: 'visible', timeout: 15000 })
  await urlInput.fill(url)
  await slugInput.fill(slug)
  await page.locator('input[type="file"]').setInputFiles(imagePath)

  const active = page.locator('#active')
  if (!(await active.isChecked())) {
    await active.check()
  }

  const createRespPromise = page.waitForResponse((resp: any) => {
    const rUrl = resp.url()
    return resp.request().method() === 'POST' && rUrl.includes('/api/banners')
  })

  await page.getByRole('button', { name: 'Criar Banner' }).click()

  const createResp = await createRespPromise
  expect(createResp.status(), 'POST /api/banners should succeed').toBeGreaterThanOrEqual(200)
  expect(createResp.status(), 'POST /api/banners should succeed').toBeLessThan(300)
  await page.waitForURL('**/admin', { timeout: 15000 })
  await page.reload({ waitUntil: 'domcontentloaded' })
}

test('demo flow: API -> Admin -> no banner -> create -> banner appears', async ({ page }, testInfo) => {
  test.setTimeout(120000)

  page.on('dialog', async (dialog: any) => {
    await dialog.accept()
  })

  // 1) Show API working (health endpoint)
  await page.goto(`${VERCEL_BASE}/api/health`, { waitUntil: 'domcontentloaded' })
  await expect(page.locator('body')).toContainText('"ok"')
  await snap(page, testInfo, '01-api-health')

  await page.goto(GH_HOME_URL, { waitUntil: 'domcontentloaded' })
  await snap(page, testInfo, '02-gh-home-start')

  // 2) Go to Admin and show banners list
  await loginIfNeeded(page)
  await expect(page.getByRole('heading', { name: 'Painel de Banners' })).toBeVisible({
    timeout: 15000,
  })
  await page.mouse.wheel(0, 1200)
  await snap(page, testInfo, '03-admin-list')

  const homeSlug = 'demo-home'
  const conjuntoSlug = 'demo-conjunto'

  await deleteBannerBySlug(page, homeSlug)
  await snap(page, testInfo, '04-admin-after-delete-home-if-exists')

  await createBanner(page, GH_HOME_URL, homeSlug, SVG_UPLOAD_PATH)
  await snap(page, testInfo, '05-admin-after-create-home')

  await page.goto(GH_HOME_URL, { waitUntil: 'domcontentloaded' })
  await expect(page.locator('#magic-banner-container')).toBeVisible({ timeout: 15000 })
  await snap(page, testInfo, '06-gh-home-with-banner')

  await loginIfNeeded(page)
  await expect(page.getByRole('heading', { name: 'Painel de Banners' })).toBeVisible({ timeout: 15000 })
  await snap(page, testInfo, '07-admin-before-delete-home')
  await deleteBannerBySlug(page, homeSlug)
  await snap(page, testInfo, '08-admin-after-delete-home')

  await page.goto(GH_HOME_URL, { waitUntil: 'domcontentloaded' })
  await expect(page.locator('#magic-banner-container')).toHaveCount(0, { timeout: 15000 })
  await snap(page, testInfo, '09-gh-home-without-banner-after-delete')

  await loginIfNeeded(page)
  await deleteBannerBySlug(page, conjuntoSlug)
  await createBanner(page, GH_CONJUNTO_URL, conjuntoSlug, SVG_UPLOAD_PATH)
  await snap(page, testInfo, '10-admin-after-create-conjunto')

  await page.goto(GH_CONJUNTO_URL, { waitUntil: 'domcontentloaded' })
  await expect(page.locator('#magic-banner-container')).toBeVisible({ timeout: 15000 })
  await snap(page, testInfo, '11-gh-conjunto-with-banner')

  const recreatedHomeSlug = `demo-home-${Date.now()}`
  await createBanner(page, GH_HOME_URL, recreatedHomeSlug, SVG_UPLOAD_PATH)
  await snap(page, testInfo, '12-admin-after-recreate-home')

  await page.goto(GH_HOME_URL, { waitUntil: 'domcontentloaded' })
  await expect(page.locator('#magic-banner-container')).toBeVisible({ timeout: 15000 })
  await snap(page, testInfo, '13-gh-home-with-banner-recreated')
})
