'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Your introduction is the first thing an examiner reads — and first impressions matter. A strong introduction sets the tone, demonstrates knowledge, and makes the examiner want to keep reading. A weak one signals "this is just another school assignment."' },
  { type: 'heading', text: 'What Your Introduction Must Do' },
  { type: 'icon-card', icon: 'BookOpen', title: 'Set the Context', text: 'Introduce your topic area and explain why it matters in the broader academic landscape.' },
  { type: 'icon-card', icon: 'Target', title: 'Present Your RQ', text: 'Naturally lead the reader to your research question — it should feel like the obvious next question to ask.' },
  { type: 'icon-card', icon: 'Brain', title: 'Show Understanding', text: 'Demonstrate that you understand the key concepts and terminology. This is Criterion A territory.' },
  { type: 'icon-card', icon: 'PenLine', title: 'Preview Your Approach', text: 'Briefly outline the methods and structure you will use to answer your RQ.' },
  { type: 'tip-box', text: 'Your introduction should make the examiner think "this is interesting — I want to see what they found." If it reads like a summary of what your essay will cover, rewrite it.' },
  { type: 'heading', text: 'Common Mistakes to Avoid' },
  { type: 'warning-box', text: 'Don\'t start with a dictionary definition. Don\'t list every tool you\'ll use. Don\'t make it longer than 500-600 words. Don\'t save your RQ for the very last sentence without building toward it.' },
  { type: 'cta-box', label: 'Go deeper', text: 'Want the different hook styles that work for your subject, with worked before-and-after examples? It\'s inside the writing modules.', href: '/dashboard/home', buttonText: 'Start free' },
  { type: 'key-takeaway', items: [
    'Open with context, then build toward your RQ naturally — don\'t just state it',
    'Show understanding of key concepts (Criterion A)',
    'Preview your approach without listing every tool',
    'Keep it concise: 400-600 words is ideal',
  ]},
]

const RELATED = [
  { href: '/guides/ee-conclusion', title: 'How to Write an EE Conclusion', description: 'Your last impression matters just as much.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'The complete section-by-section guide.' },
]

export default function EEIntroductionGuide() {
  return (
    <GuidePage
      title="How to Write an Extended Essay Introduction"
      description="Learn what a strong IB Extended Essay introduction must do, how to lead into your research question, and the common mistakes that weaken first impressions."
      canonical="/guides/extended-essay-introduction"
      content={CONTENT}
      relatedGuides={RELATED}
    />
  )
}
