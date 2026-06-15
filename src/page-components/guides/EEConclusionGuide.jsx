'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Your conclusion is the last thing an examiner reads. It should leave them satisfied that you\'ve answered your research question with evidence and insight — not feeling like you ran out of steam.' },
  { type: 'heading', text: 'What a Strong Conclusion Covers' },
  { type: 'paragraph', text: 'A complete conclusion gives a direct answer to your research question, briefly draws together your strongest evidence, acknowledges the limitations of your study honestly, and points to where future research could go next. The aim is to synthesise — not to repeat what you\'ve already said.' },
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
  { type: 'cta-box', label: 'Go deeper', text: 'Want the full conclusion framework with worked before-and-after examples for your subject? It\'s inside the writing modules.', href: '/pricing', buttonText: 'Unlock the writing modules' },
  { type: 'key-takeaway', items: [
    'Give a direct answer, draw together evidence, state limitations, point forward',
    'Synthesise, don\'t repeat your introduction',
    'Keep it under 400 words',
    'Pass the arc test: intro + conclusion should tell your full story',
  ]},
]

const RELATED = [
  { href: '/guides/extended-essay-introduction', title: 'How to Write an EE Introduction', description: 'How to open your essay with clarity and context.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'Where the conclusion fits in the overall structure.' },
]

export default function EEConclusionGuide() {
  return (
    <GuidePage
      title="How to Write an Extended Essay Conclusion"
      description="Learn what a strong IB Extended Essay conclusion covers, the common mistakes to avoid, and the arc test that checks your argument holds together."
      canonical="/guides/ee-conclusion"
      content={CONTENT}
      relatedGuides={RELATED}
    />
  )
}
