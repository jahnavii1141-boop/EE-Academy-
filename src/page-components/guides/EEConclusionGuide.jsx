'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Your conclusion is the last thing an examiner reads. It should leave them satisfied that you\'ve answered your research question with evidence and insight — not feeling like you ran out of steam.' },
  { type: 'heading', text: 'The Conclusion Framework' },
  { type: 'formula-box', title: 'Every Great Conclusion Has Four Parts', formula: 'Direct Answer + Key Evidence + Limitations + Future Research', description: 'Follow this structure and your conclusion will be clear, complete, and mark-worthy every time.' },
  { type: 'heading', text: 'What Each Part Does' },
  { type: 'step-process', steps: [
    { title: 'Direct Answer', text: 'State your answer to the RQ clearly and definitively. Don\'t hedge or be vague. "To a significant extent..." or "The evidence suggests..." followed by your finding.' },
    { title: 'Key Evidence Summary', text: 'Briefly summarise the 2-3 strongest pieces of evidence that support your answer. Don\'t introduce new information — only reference what you\'ve already discussed.' },
    { title: 'Limitations', text: 'Acknowledge the constraints of your study honestly. Data limitations, scope restrictions, methodological boundaries. This shows maturity.' },
    { title: 'Future Research', text: 'Suggest 1-2 areas where future research could build on your findings. This shows you understand the broader academic context.' },
  ]},
  { type: 'heading', text: 'Common Mistakes' },
  { type: 'warning-box', text: 'The most common mistake is restating your introduction. Your conclusion should synthesise, not repeat. It should feel like the destination your essay has been building toward.' },
  { type: 'numbered-steps', items: [
    'Don\'t introduce new evidence or arguments',
    'Don\'t apologise for your limitations — state them professionally',
    'Don\'t end with a vague statement like "More research is needed"',
    'Don\'t exceed 400 words — keep it tight',
  ]},
  { type: 'heading', text: 'The Arc Test' },
  { type: 'tip-box', text: 'If someone read only your introduction and conclusion, they should understand the full arc of your essay. Test this: give a friend just those two sections and see if they follow your argument.' },
  { type: 'before-after', before: { label: 'Weak conclusion', text: '"In conclusion, ZARA has a good business strategy and is a successful company. More research could be done on this topic."' }, after: { label: 'Strong conclusion', text: '"The evidence suggests that ZARA\'s competitive dominance stems primarily from its supply chain model rather than its product design, with an inventory turnover ratio that reveals unexpected inefficiencies despite market leadership."' }},
  { type: 'cta-box', label: 'Free tool', text: 'Track your sources as you research and generate your MLA bibliography automatically with the EE Dump.', href: '/dashboard/dump', buttonText: 'Try EE Dump free' },
  { type: 'key-takeaway', items: [
    'Follow the framework: direct answer + evidence + limitations + future research',
    'Synthesise, don\'t repeat your introduction',
    'Keep it under 400 words',
    'Pass the arc test: intro + conclusion should tell your full story',
  ]},
]

const RELATED = [
  { href: '/guides/extended-essay-introduction', title: 'How to Write an EE Introduction', description: 'Master the four types of introduction hooks.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'Where the conclusion fits in the overall structure.' },
]

export default function EEConclusionGuide() {
  return (
    <GuidePage
      title="How to Write an Extended Essay Conclusion"
      description="Master the four-part conclusion framework: direct answer, key evidence, limitations, and future research. See before-and-after examples."
      canonical="/guides/ee-conclusion"
      content={CONTENT}
      relatedGuides={RELATED}
    />
  )
}
