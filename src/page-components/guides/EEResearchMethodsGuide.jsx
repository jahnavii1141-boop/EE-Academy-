'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'How you research determines the quality of everything that follows. The best EEs aren\'t written by the smartest students — they\'re written by the ones who researched most effectively. Method is what separates good from great.' },
  { type: 'heading', text: 'The Three-Level Research Funnel' },
  { type: 'step-process', steps: [
    { title: 'Level 1: Google', text: 'Definitions, context, policy documents, government data, think tanks. This is your foundation — don\'t skip it, but don\'t stop here either.' },
    { title: 'Level 2: Google Scholar', text: 'Peer-reviewed arguments, models, frameworks, academic debates. This is where depth lives and where strong essays distinguish themselves.' },
    { title: 'Level 3: PDF-Only Searches', text: 'Full research papers, original datasets, foundational studies. Most students never reach this level — that\'s where their research suffers.' },
  ]},
  { type: 'heading', text: 'The EE Dump Method' },
  { type: 'paragraph', text: 'Before you start formal research, use the EE Dump method to build your knowledge base:' },
  { type: 'numbered-steps', items: [
    'Break your RQ into 5 subtopics',
    'Google each subtopic — go through all relevant links',
    'Dump relevant information into a document with source links',
    'Repeat on Google Scholar for academic depth',
    'Look for unexpected connections between subtopics',
  ]},
  { type: 'tip-box', text: 'There is no word limit for your EE Dump. The more you dump, the more confident you\'ll be when writing. You won\'t need to keep searching during the writing phase.' },
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
  { type: 'key-takeaway', items: [
    'Research through three levels: Google → Scholar → PDF-only',
    'Use the EE Dump method before formal research',
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
      description="Master the three-level research funnel, Google Scholar search strategies, the EE Dump method, and source evaluation techniques for your IB Extended Essay."
      canonical="/guides/ee-research-methods"
      content={CONTENT}
      relatedGuides={RELATED}
    />
  )
}
