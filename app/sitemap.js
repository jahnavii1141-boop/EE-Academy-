// Dynamic sitemap — served at /sitemap.xml and takes precedence over public/sitemap.xml
// Add new guides/modules here; they'll appear in Google's index automatically.

const BASE = 'https://theextendedessay.com'
const NOW = new Date().toISOString()

// All guide slugs — keep in sync with app/guides/[slug]/page.jsx GUIDE_META
const GUIDE_SLUGS = [
  // Core / high-intent
  'research-question-examples',
  'how-to-get-an-a-in-extended-essay',
  'ee-analysis-vs-description',
  'ee-criteria-breakdown',
  'extended-essay-structure',
  'extended-essay-introduction',
  'ee-conclusion',
  'rppf-guide',
  'extended-essay-tips',

  // Research & writing
  'ee-dump-method',
  'how-to-use-google-scholar-ee',
  'ee-literature-review',
  'ee-research-methods',
  'ee-academic-writing',
  'ee-ai-guide',
  'ee-mindset',

  // Formatting & logistics
  'ee-formatting-guide',
  'ee-citations-mla',
  'ee-word-count',
  'ee-checklist',
  'ee-planning-timeline',
  'ee-abstract',
  'ee-clastify-guide',

  // Subject guides
  'ee-subjects-guide',
  'ee-business-management',
  'ee-economics',
  'ee-psychology',
  'ee-history',
  'ee-biology',

  // Process
  'ee-supervisor-tips',
]

// All course module IDs — keep in sync with src/data/courseContent.js
const MODULE_IDS = [
  'module-1',
  'module-2',
  'module-3',
  'module-4',
  'module-5',
  'module-6',
  'module-7',
  'module-8',
  'module-9',
  'module-10',
  'module-11',
  'ai-module',
  'module-13',
  'module-14',
]

export default function sitemap() {
  const staticPages = [
    { url: `${BASE}/`,           lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/pricing`,    lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/curriculum`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/courses`,    lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/guides`,     lastModified: NOW, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/about`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/terms`,      lastModified: NOW, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/privacy`,    lastModified: NOW, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/refund`,     lastModified: NOW, changeFrequency: 'yearly',  priority: 0.2 },
  ]

  // High-intent guides — priority 0.9 for the top ones, 0.8 for subject-specific
  const highIntentSlugs = new Set([
    'research-question-examples',
    'how-to-get-an-a-in-extended-essay',
    'ee-analysis-vs-description',
    'ee-criteria-breakdown',
    'extended-essay-structure',
    'ee-dump-method',
  ])

  const guidePages = GUIDE_SLUGS.map(slug => ({
    url: `${BASE}/guides/${slug}`,
    lastModified: NOW,
    changeFrequency: 'monthly',
    priority: highIntentSlugs.has(slug) ? 0.9 : 0.8,
  }))

  // Free modules are fully public and indexable; paid modules still serve content (paywalled mid-page)
  const freeModules = new Set(['module-1', 'module-2', 'module-3', 'module-5'])
  const modulePages = MODULE_IDS.map(id => ({
    url: `${BASE}/course/${id}`,
    lastModified: NOW,
    changeFrequency: 'monthly',
    priority: freeModules.has(id) ? 0.8 : 0.6,
  }))

  return [...staticPages, ...guidePages, ...modulePages]
}
