import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Structure is your biggest competitive advantage. A well-structured EE makes it easy for the examiner to find evidence of each criterion — and award you marks. A poorly structured one forces them to search, and they won\'t always find what they\'re looking for.' },
  { type: 'heading', text: 'The Grade-A Structure Template' },
  { type: 'step-process', steps: [
    { title: 'Introduction (400-600 words)', text: 'Hook, context, significance, and your research question. Targets Criterion A.' },
    { title: 'Literature Review (600-800 words)', text: 'Critical evaluation of existing research. Not a summary — a conversation with the academic field.' },
    { title: 'Methodology (400-500 words)', text: 'What tools you used and WHY. Targets Criterion B.' },
    { title: 'Analysis (1200-1500 words)', text: 'Apply tools, present findings with evidence. The heart of your essay. Targets Criteria B + C.' },
    { title: 'Discussion (500-700 words)', text: 'Evaluate findings, connect to literature, assess limitations. Targets Criterion C.' },
    { title: 'Conclusion (300-400 words)', text: 'Directly answer your RQ. Summarise evidence. Suggest future research.' },
  ]},
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
  { type: 'heading', text: 'Word Count Distribution' },
  { type: 'paragraph', text: 'Your 4,000-word limit is tight. Here\'s how the strongest EEs distribute their words:' },
  { type: 'stat-highlight', stat: '35%', label: 'Analysis section — where most marks are won' },
  { type: 'stat-highlight', stat: '15%', label: 'Introduction + Conclusion combined' },
  { type: 'stat-highlight', stat: '50%', label: 'Literature Review + Methodology + Discussion' },
  { type: 'warning-box', text: 'The most common structural mistake: spending too many words on description and not enough on analysis. If your literature review is longer than your analysis section, rebalance.' },
  { type: 'key-takeaway', items: [
    'Follow the 7-section structure: Intro → Lit Review → Methodology → Analysis → Discussion → Conclusion → References',
    'Map every section to specific criteria',
    'Spend 35% of your word count on analysis',
    'No purposeless writing — every paragraph serves a criterion',
  ]},
]

const RELATED = [
  { href: '/guides/extended-essay-introduction', title: 'How to Write an EE Introduction', description: 'Master the four types of introduction hooks.' },
  { href: '/guides/ee-word-count', title: 'Word Count & Formatting Rules', description: 'The non-negotiable formatting requirements.' },
]

export default function EEStructureGuide() {
  return (
    <GuidePage
      title="IB Extended Essay Structure Template & Guide"
      description="The complete section-by-section structure template used for a 32/34 Extended Essay. Learn how to map every section to specific criteria."
      canonical="/guides/extended-essay-structure"
      content={CONTENT}
      relatedGuides={RELATED}
    />
  )
}
