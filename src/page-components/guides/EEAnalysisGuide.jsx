'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'The #1 reason IB Extended Essays drop from an A to a B is too much description and not enough analysis. This is so common that IB examiners have a phrase for it in their markschemes: "merely descriptive." Understanding the distinction and applying it consistently is the difference between an A and a B.' },
  { type: 'heading', text: 'Description vs Analysis: The Core Distinction' },
  { type: 'paragraph', text: 'Description states what happened. Analysis evaluates why it happened, what it means, and where the expected outcome diverged from reality. A descriptive sentence could appear in a textbook about your topic; an analytical sentence could only appear in your essay, because it makes an argument connected to your specific research question.' },
  { type: 'heading', text: 'The "So What?" Test' },
  { type: 'paragraph', text: 'Take any paragraph and classify every sentence as describing a fact or evaluating it. Establish the facts briefly, then spend most of the paragraph on what those facts mean for your argument.' },
  { type: 'tip-box', text: 'If you can follow a sentence with "so what?" and the answer makes the essay stronger, that sentence needed more analysis. Every descriptive fact should be followed by its analytical consequence.' },
  { type: 'heading', text: 'The Evaluative Vocabulary' },
  { type: 'paragraph', text: 'The language you use signals to examiners whether you\'re analysing or describing. Analytical phrases include:' },
  { type: 'numbered-steps', items: [
    '"This suggests / implies / indicates that..."',
    '"The significance of this finding lies in..."',
    '"This challenges the assumption that..."',
    '"The disparity between X and Y reveals..."',
    '"This supports / contradicts the theory that..."',
    '"The weight of evidence suggests that..."',
    '"This outcome can be attributed to..."',
  ]},
  { type: 'cta-box', label: 'Go deeper', text: 'Want the full set of analytical moves with worked before-and-after examples for your subject? It\'s inside the writing and analysis modules.', href: '/dashboard/home', buttonText: 'Start free' },
  { type: 'key-takeaway', items: [
    '"Merely descriptive" is the most common reason IB EEs lose marks',
    'Every fact you state should be followed by what that fact means for your argument',
    'Weight each body paragraph toward analysis, not description',
    'The evaluative vocabulary signals to examiners that you\'re thinking at the right level',
  ]},
]

const RELATED = [
  { href: '/guides/ee-academic-writing', title: 'Academic Writing for the EE', description: 'Paragraph structure and academic register for the EE.' },
  { href: '/guides/ee-criteria-breakdown', title: 'EE Criteria Breakdown', description: 'How Criterion B and C assess your analytical depth.' },
]

const FAQ = [
  { question: 'How do I know if a paragraph is too descriptive?', answer: 'Ask yourself: "Could this paragraph appear in a Wikipedia article about this topic?" If yes, it\'s descriptive. An analytical paragraph could only appear in your specific essay, because it makes an argument connected to your specific RQ.' },
  { question: 'Is it ever okay to have a descriptive paragraph?', answer: 'Yes — particularly in your introduction (to establish context) and in section transitions (to orient the reader). But even these should be brief. In your analysis sections, every paragraph should be primarily analytical.' },
  { question: 'Can I be analytical in a literature review?', answer: 'Yes, and strong EEs do this. Instead of just summarising what each paper found, they evaluate the papers against each other, identify where they agree and disagree, and draw conclusions about what the existing evidence does and doesn\'t tell us.' },
]

export default function EEAnalysisGuide() {
  return (
    <GuidePage
      title="Analysis vs Description in the IB Extended Essay"
      description="'Merely descriptive' is the most common reason EEs drop from A to B. Learn the core distinction, the 'so what?' test, and the evaluative vocabulary that signals A-grade thinking."
      canonical="/guides/ee-analysis-vs-description"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
