// Dynamic sitemap — served at /sitemap.xml and takes precedence over public/sitemap.xml

import { BLOG_POSTS } from '../src/data/blogPosts'

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

export default function sitemap() {
  const staticPages = [
    { url: `${BASE}/`,           lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/pricing`,    lastModified: NOW, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/curriculum`, lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/courses`,    lastModified: NOW, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/guides`,     lastModified: NOW, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/blog`,       lastModified: NOW, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/about`,      lastModified: NOW, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`,    lastModified: NOW, changeFrequency: 'yearly',  priority: 0.5 },
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

  const blogPages = BLOG_POSTS.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.date || NOW,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticPages, ...guidePages, ...blogPages]
}
