'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Your research question is the foundation your entire Extended Essay is built on. A strong RQ makes everything else easier — research, structure, writing, and scoring. A weak one creates problems that compound across every section.' },
  { type: 'heading', text: 'What Makes a Strong Research Question' },
  { type: 'icon-card', icon: 'Target', title: 'Specific', text: 'Answerable in 4,000 words. If it could be a PhD thesis, narrow it down.' },
  { type: 'icon-card', icon: 'Brain', title: 'Analytical', text: 'Uses "to what extent" or "how" — allows for analysis, not just description.' },
  { type: 'icon-card', icon: 'Search', title: 'Researchable', text: 'You can find data and sources. No dead-end topics.' },
  { type: 'icon-card', icon: 'PenLine', title: 'Original', text: 'Room for original analysis — not just summarising existing work.' },
  { type: 'heading', text: 'Research Question Examples by Subject' },
  { type: 'paragraph', text: 'Here are examples of strong research questions across popular IB subjects:' },
  { type: 'comparison-table', headers: ['Subject', 'Research Question Example'], rows: [
    ['Business Management', '"To what extent does ZARA\'s supply chain model constitute the primary source of its competitive dominance in the fast fashion retail market?"'],
    ['Psychology', '"To what extent can quantitative analysis of social media sentiment explain variations in voter behaviour during the 2024 US elections?"'],
    ['Economics', '"To what extent has Japan\'s quantitative easing policy been effective in combating deflation between 2013 and 2024?"'],
    ['English Literature', '"How does Kazuo Ishiguro use unreliable narration to explore the theme of self-deception in The Remains of the Day?"'],
    ['History', '"To what extent was the Marshall Plan motivated by economic self-interest rather than humanitarian concern?"'],
    ['Biology', '"What is the effect of varying concentrations of caffeine on the rate of mitosis in Allium cepa root tip cells?"'],
    ['Environmental Science', '"To what extent has deforestation in the Amazon Basin between 2010-2024 contributed to changes in regional precipitation patterns?"'],
    ['Mathematics', '"To what extent can the SIR epidemiological model accurately predict the spread of influenza in closed school populations?"'],
  ]},
  { type: 'heading', text: 'Weak vs. Strong: Before & After' },
  { type: 'before-after', before: { label: 'Too broad', text: '"How does social media affect politics?"' }, after: { label: 'Focused and analytical', text: '"To what extent can quantitative analysis of social media sentiment explain variations in voter behaviour during the 2024 US elections?"' }},
  { type: 'before-after', before: { label: 'Descriptive', text: '"What is ZARA\'s business strategy?"' }, after: { label: 'Evaluative', text: '"To what extent does ZARA\'s supply chain model constitute the primary source of its competitive dominance?"' }},
  { type: 'heading', text: 'The RQ Stress-Test' },
  { type: 'numbered-steps', items: [
    'Can it be answered in 4,000 words? If not, narrow it.',
    'Does it allow for analysis (not just description)? Check for "to what extent" or "how."',
    'Is there enough available data? Do a quick search before committing.',
    'Does it connect to your subject\'s assessment objectives?',
    'Would an examiner find this interesting? Creativity matters.',
  ]},
  { type: 'tip-box', text: 'Take your draft RQ to your supervisor immediately. They can help you focus and refine it. We often underestimate how focused a research question needs to be.' },
  { type: 'key-takeaway', items: [
    'Strong RQs are specific, analytical, researchable, and original',
    'Use "to what extent" or "how" — avoid "what" questions',
    'Test your RQ with the 5-point stress test before committing',
    'Creativity in your angle separates good from great',
  ]},
]

const RELATED = [
  { href: '/guides/ee-subjects-guide', title: 'Best Subjects for Your EE', description: 'How to choose the right subject for your strengths.' },
  { href: '/guides/extended-essay-tips', title: 'Top 20 EE Tips', description: 'Advice from A-grade students.' },
]

export default function ResearchQuestionExamples() {
  return (
    <GuidePage
      title="50+ IB Extended Essay Research Question Examples"
      description="See strong research question examples across 8 IB subjects. Learn what makes a good RQ, with before-and-after comparisons and a 5-point stress test."
      canonical="/guides/research-question-examples"
      content={CONTENT}
      relatedGuides={RELATED}
    />
  )
}
