'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'How you research determines the quality of everything that follows. The best EEs aren\'t written by the smartest students — they\'re written by the ones who researched most effectively. Method is what separates good from great.' },
  { type: 'heading', text: 'Where to Look' },
  { type: 'paragraph', text: 'Start broad and go deeper. A general web search gives you definitions, context, government data and policy documents. Google Scholar gives you peer-reviewed arguments, models and academic debate. Full research papers and original datasets — often only found as PDFs — are where the strongest essays distinguish themselves. Most students stop too early.' },
  { type: 'heading', text: 'Google Scholar Search Strategy' },
  { type: 'icon-card', icon: 'Search', title: 'Search Narrowly', text: 'Not "Inflation India" but "monetary policy transmission India inflation." Specificity gets better results.' },
  { type: 'icon-card', icon: 'FileText', title: 'Sort by Relevance', text: 'Not by date. New doesn\'t mean good. Influential doesn\'t mean outdated.' },
  { type: 'icon-card', icon: 'Target', title: 'Open 3 Papers Max', text: 'Scan abstract, introduction, and conclusion. If it doesn\'t directly help, discard it.' },
  { type: 'icon-card', icon: 'BookOpen', title: 'Follow Citations', text: 'Good papers cite their sources. Follow references to find foundational research.' },
  { type: 'heading', text: 'Search Operators' },
  { type: 'comparison-table', headers: ['Operator', 'What It Does', 'Example'], rows: [
    ['Quotes ""', 'Exact phrase search', '"voter behaviour social media"'],
    ['filetype:pdf', 'Only PDF results', 'climate change impact filetype:pdf'],
    ['site:', 'Search specific domains', 'inflation data site:gov'],
    ['intitle:', 'Search in page titles', 'intitle:"extended essay" guide'],
  ]},
  { type: 'heading', text: 'Evaluating Sources' },
  { type: 'paragraph', text: 'For every source you include, document three things:' },
  { type: 'numbered-steps', items: [
    'The core claim (one sentence)',
    'The evidence or method used to support it',
    'Any limitation or bias to be aware of',
  ]},
  { type: 'warning-box', text: 'Red flags: blog posts with no citations, news articles used as analysis (they\'re fine for context), papers that only describe without arguing, anything without a clear methodology.' },
  { type: 'cta-box', label: 'Free tool', text: 'Track your sources as you research and generate your MLA bibliography automatically with the EE Dump.', href: '/dashboard/dump', buttonText: 'Try EE Dump free' },
  { type: 'cta-box', label: 'Go deeper', text: 'Want the full research system — the step-by-step method for building your source base before you write? It\'s inside the research module.', href: '/pricing', buttonText: 'Unlock the research module' },
  { type: 'key-takeaway', items: [
    'Start broad, then go deeper: general search → Scholar → full papers',
    'Search narrowly and sort by relevance, not date',
    'Each sub-question needs 2-3 strong sources',
    'Document core claims, evidence, and limitations for every source',
  ]},
]

const RELATED = [
  { href: '/guides/research-question-examples', title: 'RQ Examples', description: 'Strong research questions across 8 subjects.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'How to organise your research into sections.' },
]

export default function EEResearchMethodsGuide() {
  return (
    <GuidePage
      title="Extended Essay Research Methods Guide"
      description="Learn where to find strong sources, Google Scholar search strategies, search operators, and how to evaluate sources for your IB Extended Essay."
      canonical="/guides/ee-research-methods"
      content={CONTENT}
      relatedGuides={RELATED}
    />
  )
}
