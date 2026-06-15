'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Structure is your biggest competitive advantage. A well-structured EE makes it easy for the examiner to find evidence of each criterion — and award you marks. A poorly structured one forces them to search, and they won\'t always find what they\'re looking for.' },
  { type: 'heading', text: 'The Sections of an Extended Essay' },
  { type: 'paragraph', text: 'Most strong EEs move through the same core sections: an introduction, a review of existing research, a methodology, an analysis, a discussion, and a conclusion — followed by references. The order gives the examiner a clear path through your argument.' },
  { type: 'heading', text: 'Mapping Sections to Criteria' },
  { type: 'comparison-table', headers: ['Section', 'Primary Criteria'], rows: [
    ['Introduction', 'Criterion A — Knowledge & Understanding'],
    ['Literature Review', 'Criterion A'],
    ['Methodology', 'Criterion B — Application & Analysis'],
    ['Analysis', 'Criteria B + C'],
    ['Discussion', 'Criterion C — Synthesis & Evaluation'],
    ['Conclusion', 'Criteria C + D'],
    ['Throughout', 'Criterion D — Communication'],
  ]},
  { type: 'tip-box', text: 'After building your structure, go through each section and write which criterion it targets. If a section doesn\'t clearly target any criterion, cut it or refocus it.' },
  { type: 'heading', text: 'Where the Marks Are' },
  { type: 'warning-box', text: 'The most common structural mistake: spending too many words on description and not enough on analysis. Your analysis is where most marks are won — if your literature review is longer than your analysis section, rebalance.' },
  { type: 'cta-box', label: 'Go deeper', text: 'Want the full section-by-section template with target word counts and a worked example? It\'s inside the structure module.', href: '/pricing', buttonText: 'Unlock the structure module' },
  { type: 'key-takeaway', items: [
    'Move through clear sections: Intro → Lit Review → Methodology → Analysis → Discussion → Conclusion → References',
    'Map every section to specific criteria',
    'Weight your word count toward analysis, where most marks are won',
    'No purposeless writing — every paragraph serves a criterion',
  ]},
]

const RELATED = [
  { href: '/guides/extended-essay-introduction', title: 'How to Write an EE Introduction', description: 'How to open your essay with clarity and context.' },
  { href: '/guides/ee-word-count', title: 'Word Count & Formatting Rules', description: 'The non-negotiable formatting requirements.' },
]

export default function EEStructureGuide() {
  return (
    <GuidePage
      title="IB Extended Essay Structure Template & Guide"
      description="Learn the section-by-section structure of an IB Extended Essay and how to map every section to the assessment criteria examiners mark against."
      canonical="/guides/extended-essay-structure"
      content={CONTENT}
      relatedGuides={RELATED}
    />
  )
}
