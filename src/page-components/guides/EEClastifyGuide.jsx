'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Clastify is the largest database of IB Extended Essays online, with thousands of submitted essays complete with their actual grades. Used correctly, it\'s one of the most valuable research tools available to IB students. Used incorrectly, it becomes an essay mill — and that path ends with academic misconduct penalties.' },
  { type: 'heading', text: 'What Clastify Is Actually For' },
  { type: 'icon-card', icon: 'Search', title: 'Understanding Grade Standards', text: 'Read A-grade essays in your subject and understand what that level of analysis actually looks like. What depth? What sources? What structure? Seeing concrete examples is more useful than any rubric.' },
  { type: 'icon-card', icon: 'Target', title: 'RQ Calibration', text: 'Look at how top essays frame their research questions in your subject. What scope seems to work? What kinds of topics lend themselves to strong analysis? This helps you calibrate the right level of specificity for your own RQ.' },
  { type: 'icon-card', icon: 'BookOpen', title: 'Subject-Specific Conventions', text: 'Every EE subject has its own conventions. Psychology essays have a different structure from Business essays from History essays. Reading examples in your specific subject shows you what those conventions look like in practice.' },
  { type: 'icon-card', icon: 'Brain', title: 'Identifying What NOT to Do', text: 'Read C and D-grade essays too. Understanding why they fell short is just as instructive as understanding why A-grades succeeded.' },
  { type: 'heading', text: 'How to Use Clastify Efficiently' },
  { type: 'step-process', steps: [
    { title: 'Filter by Subject and Grade', text: 'Always filter by your specific subject first, then by grade (start with A). Read 2-3 A-grade essays from similar topics to yours to calibrate the standard.' },
    { title: 'Analyse Structure, Not Content', text: 'When you read an essay on Clastify, focus on: how long is each section? How are sources cited? How does the introduction lead to the RQ? How does the conclusion answer it? You\'re studying the form, not borrowing the content.' },
    { title: 'Note RQ Patterns', text: 'Pay attention to how A-grade RQs are worded. Notice the specificity, the analytical framing ("to what extent"), the scope.' },
    { title: 'Check the Examiner Comments', text: 'Some essays on Clastify include examiner feedback. This is pure gold — you\'re seeing exactly what the person who marked the essay said about it.' },
  ]},
  { type: 'heading', text: 'What Clastify Is NOT For' },
  { type: 'warning-box', text: 'Never: copy any sentence, paragraph, or argument from a Clastify essay. Never use someone else\'s Clastify essay as a source or citation. Never submit an essay that shares the same RQ and company/case study combination as one on Clastify — examiners have access to these databases too.' },
  { type: 'paragraph', text: 'The IB has access to Clastify. Your school runs essays through similarity software. The students who get caught for academic misconduct are almost always the ones who borrowed too heavily from essay banks — not those who used them as reference points for standards.' },
  { type: 'heading', text: 'The Right Mindset for Using Clastify' },
  { type: 'paragraph', text: 'Think of Clastify like looking at previous years\' exam papers. You don\'t memorise the answers from past papers and repeat them — you use them to understand what questions look like, what good answers contain, and how to prepare your own original response. That\'s exactly how to use Clastify.' },
  { type: 'tip-box', text: 'One specific technique: find an A-grade essay on a similar topic in your subject and write down 5 things it does well. Then check whether your own essay plan does those same 5 things. You\'re not copying anything — you\'re benchmarking your own approach against a proven standard.' },
  { type: 'cta-box', label: 'Free tool', text: 'Track your sources as you research and generate your MLA bibliography automatically with the EE Dump.', href: '/dashboard/dump', buttonText: 'Try EE Dump free' },
  { type: 'key-takeaway', items: [
    'Use Clastify to understand A-grade standards, not to borrow content',
    'Filter by your subject AND grade — always read A-grades in your specific subject',
    'Analyse structure and RQ framing, not subject content',
    'Never use the same RQ + case study combination as an existing Clastify essay',
    'Think of it like past exam papers: study the form, write your own original answer',
  ]},
]

const RELATED = [
  { href: '/guides/ee-subjects-guide', title: 'Best EE Subjects Guide', description: 'Choose a subject where you can find strong examples and resources.' },
  { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'Original strong RQs across 8 subjects — developed independently of essay banks.' },
]

const FAQ = [
  { question: 'Is using Clastify considered academic misconduct?', answer: 'No — reading essays on Clastify is not misconduct. Copying content from them is. The distinction is exactly the same as reading published academic papers: you can read them, understand them, cite them appropriately, but you cannot reproduce them.' },
  { question: 'What if my RQ is similar to one on Clastify?', answer: 'Similar is fine — identical is risky. If your analysis, findings, and sources are genuinely your own, the similarity in RQ framing is not a problem. But if someone searches Clastify and finds an essay with your exact RQ arguing the same thing in similar language, that\'s a problem.' },
  { question: 'Are there other essay banks like Clastify?', answer: 'Yes — ibresources.org, various Reddit posts, and school internal resources. The same rules apply to all of them: use for calibration and inspiration, never for content borrowing.' },
]

export default function EEClastifyGuide() {
  return (
    <GuidePage
      title="How to Use Clastify for Your IB Extended Essay"
      description="Clastify has thousands of graded EEs. Used correctly, it calibrates your standards and shows you what A-grade work looks like in your subject. Used incorrectly, it leads to academic misconduct. Here's the line."
      canonical="/guides/ee-clastify-guide"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
