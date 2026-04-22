'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'If you want to know how to get an A in the Extended Essay, focus on marks strategy, not motivation. An A is 27/34, and that target is absolutely achievable when your research question, structure, analysis depth, and reflection quality are planned from day one.' },
  { type: 'heading', text: 'What Grade A Actually Requires' },
  { type: 'comparison-table', headers: ['Target', 'Marks', 'What It Means'], rows: [
    ['A', '27-34', 'Strong performance across all five criteria'],
    ['B', '22-26', 'Good but inconsistent depth or evaluation'],
    ['C', '14-21', 'Basic structure with limited analysis'],
  ]},
  { type: 'stat-highlight', stat: '27/34', label: 'The practical score target for an A' },
  { type: 'heading', text: 'How to Get an A in the Extended Essay: 7-Step System' },
  { type: 'step-process', steps: [
    { title: '1) Pick a scoreable research question', text: 'Choose a specific, arguable RQ with clear scope. Broad topics almost always cap your grade.' },
    { title: '2) Map your essay to the criteria first', text: 'Before writing, decide which section earns marks for A, B, C, D, and E.' },
    { title: '3) Build evidence before drafting', text: 'Collect and organize strong sources first. Writing while still researching creates weak logic.' },
    { title: '4) Prioritize analysis over description', text: 'Top essays interpret evidence, compare viewpoints, and evaluate significance.' },
    { title: '5) Keep structure crystal clear', text: 'Use a logical flow: introduction, literature review, methodology, analysis, discussion, conclusion.' },
    { title: '6) Use RPPF reflections strategically', text: 'Show decision-making, pivots, and learning. Criterion E is a high-impact scoring area.' },
    { title: '7) Run a final examiner checklist', text: 'Fix citations, formatting, signposting, and argument coherence before submission.' },
  ]},
  { type: 'heading', text: 'Where Most Students Lose A Grades' },
  { type: 'warning-box', text: 'The most common score killers are broad RQs, descriptive writing, weak source evaluation, and rushed RPPF reflections.' },
  { type: 'heading', text: 'Quick A-Grade Checklist' },
  { type: 'key-takeaway', items: [
    'RQ is narrow, arguable, and researchable',
    'Each section clearly targets a specific criterion',
    'Analysis depth is stronger than summary',
    'Conclusion directly answers the RQ with evidence',
    'RPPF shows authentic reflection and growth',
    'Formatting and citations are clean and consistent',
  ]},
  { type: 'tip-box', text: 'Treat your EE like a mini-thesis: objective tone, clear methodology, and explicit evaluation. This mindset alone can move a B into A territory.' },
]

const RELATED = [
  { href: '/guides/ee-criteria-breakdown', title: 'IB Extended Essay Criteria Explained', description: 'Know exactly where the 34 marks come from.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'Use a section-by-section blueprint that earns marks.' },
]

const FAQ_ITEMS = [
  {
    question: 'What mark do I need for an A in the Extended Essay?',
    answer: 'You typically need 27 out of 34 marks (around 79%) for an A, depending on session boundaries.',
  },
  {
    question: 'How long does it take to improve from a B to an A?',
    answer: 'Many students can improve within a few focused weeks if they tighten their RQ, analysis depth, and criterion mapping.',
  },
  {
    question: 'What is the biggest reason students miss an A?',
    answer: 'The most common issue is descriptive writing without deep evaluation tied directly to the research question.',
  },
]

export default function GetAExtendedEssayGuide() {
  return (
    <GuidePage
      title="How to Get an A in the Extended Essay (Step-by-Step)"
      description="Learn exactly how to get an A in the IB Extended Essay with a 7-step system, grade target strategy, and examiner-focused checklist."
      canonical="/guides/how-to-get-an-a-in-extended-essay"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ_ITEMS}
    />
  )
}
