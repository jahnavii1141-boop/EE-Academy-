import fs from 'node:fs/promises'
import path from 'node:path'

const DIST_DIR = path.resolve('dist')
const INDEX_PATH = path.join(DIST_DIR, 'index.html')
const BASE_URL = 'https://theextendedessay.com'
const DEFAULT_OG_IMAGE = `${BASE_URL}/feather-hero.png`

const ROUTES = [
  {
    route: '/',
    title: 'IB Extended Essay Course — The 32/34 System | The Extended Essay Academy',
    description: 'Learn the IB Extended Essay step-by-step with a self-study programme built by a 32/34 Cambridge graduate. 14 structured modules covering research, writing, criteria, and RPPF.',
  },
  {
    route: '/pricing',
    title: 'IB Extended Essay Pricing | Full System, Tools and Bonus Vault',
    description: 'Unlock the full IB Extended Essay system, Bonus Vault tools, templates, prompts, and the 1-Day Protocol with one-time pricing.',
  },
  {
    route: '/courses',
    title: 'IB Extended Essay System Overview',
    description: 'See the full IB Extended Essay system, including the modules, Bonus Vault tools, and the step-by-step blueprint behind a 32/34 essay.',
  },
  {
    route: '/about',
    title: 'From Predicted C to Final A | About The Extended Essay Academy',
    description: 'Read the story behind The Extended Essay Academy and how a predicted C turned into a final A and 32/34 through a clearer EE system.',
  },
  {
    route: '/curriculum',
    title: 'IB Extended Essay Curriculum | 14-Module System',
    description: 'Explore the 14-module IB Extended Essay curriculum covering topic selection, research, structure, writing, citations, and final polish.',
  },
  {
    route: '/guides',
    title: 'Free IB Extended Essay Guides',
    description: 'Free IB Extended Essay guides on structure, criteria, introductions, conclusions, research questions, RPPF, and how to get an A.',
  },
  {
    route: '/guides/how-to-get-an-a-in-extended-essay',
    title: 'How to Get an A in the Extended Essay (Step-by-Step)',
    description: 'Learn how to get an A in the IB Extended Essay with a practical 7-step system, clearer marks strategy, and an examiner-focused checklist.',
  },
  {
    route: '/guides/extended-essay-introduction',
    title: 'How to Write an Extended Essay Introduction',
    description: 'Learn how to write a stronger IB Extended Essay introduction with better hooks, clearer context, and a sharper research question setup.',
  },
  {
    route: '/guides/extended-essay-structure',
    title: 'IB Extended Essay Structure Template & Guide',
    description: 'Use a section-by-section IB Extended Essay structure template and learn how to map each part of your essay to the markscheme.',
  },
  {
    route: '/guides/research-question-examples',
    title: 'Extended Essay Research Question Examples',
    description: 'Use strong Extended Essay research question examples to avoid vague topics and build a question that can actually score well.',
  },
  {
    route: '/guides/rppf-guide',
    title: 'IB Extended Essay RPPF Guide',
    description: 'Learn how to write stronger RPPF reflections and improve Criterion E with clearer thinking, better reflection, and stronger examples.',
  },
  {
    route: '/guides/extended-essay-tips',
    title: 'IB Extended Essay Tips That Actually Improve Your Grade',
    description: 'Use practical IB Extended Essay tips to improve your structure, analysis, citations, reflections, and final score.',
  },
  {
    route: '/guides/ee-criteria-breakdown',
    title: 'IB Extended Essay Criteria Explained',
    description: 'Understand the IB Extended Essay criteria clearly so you know how marks are actually awarded across all five categories.',
  },
  {
    route: '/guides/ee-subjects-guide',
    title: 'Best IB Extended Essay Subjects',
    description: 'Compare IB Extended Essay subject options, understand what makes a subject viable, and choose one that gives you the best chance of scoring well.',
  },
  {
    route: '/guides/ee-word-count',
    title: 'IB Extended Essay Word Count Guide',
    description: 'Understand the IB Extended Essay word count rules, section balance, and the mistakes that can make your final draft weaker.',
  },
  {
    route: '/guides/ee-conclusion',
    title: 'How to Write an Extended Essay Conclusion',
    description: 'Write a stronger IB Extended Essay conclusion that answers the research question directly and closes your argument with more authority.',
  },
  {
    route: '/guides/ee-research-methods',
    title: 'IB Extended Essay Research Methods Guide',
    description: 'Choose better IB Extended Essay research methods and understand how to justify them clearly in your essay.',
  },
  // All course modules — publicly indexable
  {
    route: '/course/module-1',
    title: 'IB Extended Essay Mindset & How to Think Like an Examiner | Module 1',
    description: 'Learn the mindset shift that separates A-grade EE students. Module 1 covers how IB examiners actually assess your essay and what they reward.',
  },
  {
    route: '/course/module-2',
    title: 'IB Extended Essay Criteria & Grading Explained | Module 2',
    description: 'Understand exactly how IB Extended Essay marks are awarded across all criteria. Learn how to use the assessment rubric as your writing blueprint.',
  },
  {
    route: '/course/module-3',
    title: 'Choosing Your IB EE Subject & Narrowing Your Topic | Module 3',
    description: 'A step-by-step framework for choosing the right IB Extended Essay subject and narrowing your topic to something researchable and score-worthy.',
  },
  {
    route: '/course/module-4',
    title: 'IB Extended Essay Research Question Mastery | Module 4',
    description: 'How to craft a focused, analytical research question that scores well across all IB EE criteria. Includes before/after examples and common mistakes to avoid.',
  },
  {
    route: '/course/module-5',
    title: 'The EE Dump Research System | Module 5',
    description: 'The EE Dump method — a structured research system that organises your sources, arguments, and evidence before you start writing.',
  },
  {
    route: '/course/module-6',
    title: 'IB Extended Essay Sources & Research Strategy | Module 6',
    description: 'How to find, evaluate, and use academic sources for your IB Extended Essay. Includes a research funnel framework and source quality checklist.',
  },
  {
    route: '/course/module-7',
    title: 'IB Extended Essay Structure & Essay Planning | Module 7',
    description: 'A section-by-section IB Extended Essay structure guide. Learn how to plan your essay so every part maps directly to the assessment criteria.',
  },
  {
    route: '/course/module-8',
    title: 'IB Extended Essay Writing: Analysis vs Description | Module 8',
    description: 'The most common reason IB students lose marks is writing descriptively instead of analytically. Module 8 shows you exactly how to fix this.',
  },
  {
    route: '/course/module-9',
    title: 'IB Extended Essay Citations, Formatting & Academic Style | Module 9',
    description: 'MLA citation format, block quote rules, word count compliance, and formatting standards for the IB Extended Essay.',
  },
  {
    route: '/course/module-10',
    title: 'IB Extended Essay Introduction & Hook Writing | Module 10',
    description: 'How to write an IB Extended Essay introduction that hooks the examiner and sets up your research question clearly and confidently.',
  },
  {
    route: '/course/module-11',
    title: 'IB Extended Essay RPPF Reflections Guide | Module 11',
    description: 'How to write all three RPPF reflections for Criterion E. Includes a real example of the natural thought process turned into formal reflection writing.',
  },
  {
    route: '/course/ai-module',
    title: 'How to Use AI for Your IB Extended Essay (The Right Way)',
    description: '12 copy-paste AI prompts designed specifically for the IB Extended Essay — for research, structure, analysis, and revision. Use AI strategically, not as a shortcut.',
  },
  {
    route: '/course/module-13',
    title: 'Real 32/34 IB Extended Essay — Full Examiner Analysis | Module 13',
    description: 'A full examiner-style breakdown of a real 32/34 IB Extended Essay. See exactly what earned marks, what lost them, and how to apply those lessons to your own essay.',
  },
  {
    route: '/course/module-14',
    title: 'IB Extended Essay Final Checklist & Submission | Module 14',
    description: 'The final pre-submission checklist for your IB Extended Essay. Templates, SOPs, and a step-by-step process to submit with confidence.',
  },
  {
    route: '/terms',
    title: 'Terms of Service',
    description: 'Read the Terms of Service for The Extended Essay Academy.',
  },
  {
    route: '/privacy',
    title: 'Privacy Policy',
    description: 'Read the Privacy Policy for The Extended Essay Academy.',
  },
  {
    route: '/refund',
    title: 'Refund Policy',
    description: 'Read the Refund Policy for The Extended Essay Academy.',
  },
]

function injectSeo(template, { route, title, description }) {
  const canonical = `${BASE_URL}${route === '/' ? '/' : route}`
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${DEFAULT_OG_IMAGE}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${DEFAULT_OG_IMAGE}" />`,
  ]

  let html = template
  html = html.replace(/<title>[\s\S]*?<\/title>/, tags[0])
  html = html.replace(/<meta name="description" content="[^"]*" \/>/, tags[1])
  html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, tags[2])
  html = html.replace(/<meta property="og:title" content="[^"]*" \/>/, tags[3])
  html = html.replace(/<meta property="og:description" content="[^"]*" \/>/, tags[4])
  html = html.replace(/<meta property="og:url" content="[^"]*" \/>/, tags[5])
  html = html.replace(/<meta property="og:image" content="[^"]*" \/>/, tags[6])
  html = html.replace(/<meta property="og:type" content="[^"]*" \/>/, tags[7])
  html = html.replace(/<meta name="twitter:card" content="[^"]*" \/>/, tags[8])

  if (/<meta name="twitter:title" content="[^"]*" \/>/.test(html)) {
    html = html.replace(/<meta name="twitter:title" content="[^"]*" \/>/, tags[9])
  } else {
    html = html.replace(tags[8], `${tags[8]}\n    ${tags[9]}`)
  }

  if (/<meta name="twitter:description" content="[^"]*" \/>/.test(html)) {
    html = html.replace(/<meta name="twitter:description" content="[^"]*" \/>/, tags[10])
  } else {
    html = html.replace(tags[9], `${tags[9]}\n    ${tags[10]}`)
  }

  if (/<meta name="twitter:image" content="[^"]*" \/>/.test(html)) {
    html = html.replace(/<meta name="twitter:image" content="[^"]*" \/>/, tags[11])
  } else {
    html = html.replace(tags[10], `${tags[10]}\n    ${tags[11]}`)
  }

  return html
}

const template = await fs.readFile(INDEX_PATH, 'utf8')

for (const route of ROUTES) {
  const targetDir = route.route === '/' ? DIST_DIR : path.join(DIST_DIR, route.route.replace(/^\//, ''))
  await fs.mkdir(targetDir, { recursive: true })
  await fs.writeFile(path.join(targetDir, 'index.html'), injectSeo(template, route))
}
