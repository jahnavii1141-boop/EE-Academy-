'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'The IB removed the mandatory Extended Essay abstract from the May 2018 assessment onwards. If you\'re writing your EE for May 2024 or later, you do NOT need to include an abstract. However, some schools and supervisors still recommend including one, and understanding what an abstract does helps you write a stronger introduction.' },
  { type: 'heading', text: 'Does the IB Require an EE Abstract?' },
  { type: 'tip-box', text: 'The abstract was removed from the IB Extended Essay requirements from the May 2018 session onwards. Check with your supervisor whether your school still requires one — some do, some don\'t. If in doubt, ask.' },
  { type: 'heading', text: 'What an Abstract Does (If Required)' },
  { type: 'paragraph', text: 'An abstract is a 150-300 word summary of your entire essay. It appears before the introduction and tells the reader: what you investigated, how you investigated it, and what you found. It is not the same as an introduction — it is a miniature version of the whole essay.' },
  { type: 'comparison-table', headers: ['Abstract', 'Introduction'], rows: [
    ['Summarises the whole essay including conclusion', 'Sets up the research question and approach'],
    ['Written last, after the essay is complete', 'Written as part of the essay process'],
    ['150-300 words', '400-600 words'],
    ['States your conclusion upfront', 'Does not reveal the conclusion'],
    ['Not marked separately (included in word count if required)', 'Part of the main essay'],
  ]},
  { type: 'heading', text: 'How to Write an Abstract (If Your School Requires One)' },
  { type: 'step-process', steps: [
    { title: 'Research Question (1-2 sentences)', text: 'State your RQ clearly. This should be verbatim from your essay.' },
    { title: 'Methodology (1-2 sentences)', text: 'Briefly state how you approached the investigation. What frameworks, data sources, or methods did you use?' },
    { title: 'Key Findings (2-3 sentences)', text: 'What did your analysis reveal? State your main findings concisely.' },
    { title: 'Conclusion (1-2 sentences)', text: 'What is your answer to the research question? State it directly.' },
  ]},
  { type: 'before-after',
    before: { label: 'Weak abstract', text: '"This essay investigates ZARA\'s business strategy. I looked at many different aspects of the company including its supply chain, marketing, and product range. I found that ZARA is very successful and has many advantages over its competitors."' },
    after: { label: 'Strong abstract', text: '"This essay investigates the extent to which ZARA\'s product portfolio and marketing strategies contribute to its dominance in the fast fashion retail market. Using Porter\'s Five Forces, Value Chain Analysis, and original financial ratio calculations from Inditex\'s 2023 Annual Report, the essay analyses ZARA\'s competitive position relative to H&M and Gap. The analysis reveals that ZARA\'s inventory turnover rate of 5.12 falls below the fast fashion industry standard, suggesting that dominance derives primarily from product diversity and brand positioning rather than production speed. The essay concludes that both strategic elements contribute significantly, though marketing strategy constitutes the more distinctive competitive advantage."' },
  },
  { type: 'heading', text: 'Word Count Note' },
  { type: 'paragraph', text: 'If you include an abstract, it counts toward your 4,000-word limit. Keep it tight — 200-250 words is usually optimal. If removing the abstract would put you comfortably under 4,000 words, consider whether your supervisor requires it before including it.' },
  { type: 'key-takeaway', items: [
    'The abstract is NOT required by IB from May 2018 onwards — check with your supervisor',
    'If required: 150-300 words covering RQ, methodology, findings, and conclusion',
    'Write the abstract LAST, once your essay is complete',
    'State your conclusion in the abstract — it is not meant to tease or build suspense',
    'It counts toward your 4,000-word limit if included',
  ]},
]

const RELATED = [
  { href: '/guides/extended-essay-introduction', title: 'How to Write an EE Introduction', description: 'The introduction vs the abstract — what each does.' },
  { href: '/guides/ee-formatting-guide', title: 'EE Formatting Guide', description: 'Where the abstract sits in the overall document structure.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Guide', description: 'How the abstract fits into your overall essay layout.' },
  { href: '/guides/ee-checklist', title: 'EE Submission Checklist', description: 'Final checks before you submit — including the abstract.' },
]

const FAQ = [
  { question: 'Can I include an abstract even if it\'s not required?', answer: 'Yes, and some supervisors recommend it. A well-written abstract demonstrates that you have a clear, complete understanding of your own argument. Just be aware it takes word count from your essay.' },
  { question: 'Is the abstract the same as the executive summary?', answer: 'Similar concept. An executive summary (sometimes used in Business EEs) is typically slightly longer and more detailed than a standard academic abstract. The same principles apply: RQ, methodology, findings, conclusion.' },
  { question: 'Should my abstract give away my conclusion?', answer: 'Yes, absolutely. An academic abstract is not a movie trailer — it doesn\'t build suspense. It gives the reader a complete overview including your conclusion, so they know what the essay establishes before they begin reading.' },
]

export default function EEAbstract() {
  return (
    <GuidePage
      title="IB Extended Essay Abstract: Do You Need One?"
      description="The IB removed the mandatory EE abstract in 2018. Learn whether your school still requires one, how to write a strong 200-word abstract, and the key difference between an abstract and an introduction."
      canonical="/guides/ee-abstract"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
