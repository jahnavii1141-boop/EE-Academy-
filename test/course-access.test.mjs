import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import { resolveCourseAccess } from '../src/lib/resolveCourseAccess.js'

const paidCatalogModule = {
  id: 'module-7',
  number: '07',
  free: false,
  title: 'Paid module',
  tagline: 'Paid module tagline',
}
const paidFullModule = {
  ...paidCatalogModule,
  content: [{ type: 'paragraph', text: 'Paid lesson text' }],
}

test('unpaid users receive no paid lesson content', () => {
  const result = resolveCourseAccess(paidCatalogModule, paidFullModule, false)

  assert.equal(result.canAccess, false)
  assert.deepEqual(result.module.content, [])
})

test('paid users receive the full paid lesson', () => {
  const result = resolveCourseAccess(paidCatalogModule, paidFullModule, true)

  assert.equal(result.canAccess, true)
  assert.equal(result.module, paidFullModule)
  assert.equal(result.module.content[0].text, 'Paid lesson text')
})

test('module 3 is paid content', () => {
  const catalog = fs.readFileSync('src/data/courseCatalog.js', 'utf8')
  const moduleThree = catalog.slice(catalog.indexOf("id: 'module-3'"), catalog.indexOf("id: 'module-4'"))

  assert.match(moduleThree, /free: false/)
})

test('free lessons remain public', () => {
  const freeCatalogModule = { ...paidCatalogModule, id: 'module-1', free: true }
  const freeFullModule = { ...freeCatalogModule, content: [{ text: 'Free lesson text' }] }
  const result = resolveCourseAccess(freeCatalogModule, freeFullModule, false)

  assert.equal(result.canAccess, true)
  assert.equal(result.module, freeFullModule)
})

test('client components do not import the lesson corpus', () => {
  const clientFiles = [
    'src/page-components/CourseModulePage.jsx',
    'src/page-components/DashboardSection.jsx',
  ]

  for (const file of clientFiles) {
    assert.doesNotMatch(fs.readFileSync(file, 'utf8'), /courseContent/)
  }
})

test('course URLs are absent from sitemaps and blocked from indexing', () => {
  assert.doesNotMatch(fs.readFileSync('app/sitemap.js', 'utf8'), /\/course\//)
  assert.doesNotMatch(fs.readFileSync('public/sitemap.xml', 'utf8'), /\/course\//)
  assert.doesNotMatch(fs.readFileSync('public/robots.txt', 'utf8'), /Allow: \/course\//)
  assert.match(
    fs.readFileSync('app/course/[moduleId]/page.jsx', 'utf8'),
    /robots: \{ index: false, follow: false \}/,
  )
})
