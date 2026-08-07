'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'The single biggest signal to an IB examiner that your essay is A-grade is how it sounds. Academic writing doesn\'t mean long sentences and complicated words. It means precise, analytical prose that demonstrates you\'re engaging with ideas at a research level, not a school assignment level.' },
  { type: 'heading', text: 'The Core Distinction: Description vs Analysis' },
  { type: 'paragraph', text: 'This is the most important concept in academic writing for the EE. Description states facts. Analysis finds something unexpected, backs it with specific cited data, and draws a conclusion that actually answers your research question. A descriptive paragraph could appear in any textbook; an analytical one could only appear in your essay.' },
  { type: 'heading', text: 'Sentence Patterns for Academic Analysis' },
  { type: 'step-process', steps: [
    { title: 'The Claim-Evidence-Explanation Pattern', text: 'Make a claim. Back it with cited evidence. Explain what the evidence means for your argument. "X suggests Y (Author, Year). This implies Z because..."' },
    { title: 'The Concession-Counterargument Pattern', text: 'Acknowledge the opposing view, then counter it. "While Smith (2019) argues X, Jones (2021) demonstrates that Y, suggesting..."' },
    { title: 'The Limitation Pattern', text: 'Evaluate a source or finding rather than just accepting it. "This analysis, however, relies on secondary data, which may not fully capture..."' },
    { title: 'The Synthesis Pattern', text: 'Connect multiple pieces of evidence to a single conclusion. "Taken together, the financial data and the qualitative analysis suggest..."' },
  ]},
  { type: 'heading', text: 'Academic Register: Words That Signal Analysis' },
  { type: 'comparison-table', headers: ['School Essay Language', 'Academic/Research Language'], rows: [
    ['"This shows that..."', '"This suggests / implies / indicates that..."'],
    ['"I think that..."', '"The evidence points toward..." / "This analysis demonstrates..."'],
    ['"This is important because..."', '"The significance of this finding lies in..."'],
    ['"In conclusion, X wins because..."', '"The weight of evidence suggests that..."'],
  ]},
  { type: 'heading', text: 'Write in Your Own Voice' },
  { type: 'paragraph', text: 'Academic writing must have YOUR voice — your analysis, your conclusions, your evaluation. The biggest weakness in IB EEs is over-reliance on sources: spending paragraph after paragraph summarising what researchers found, rather than using those findings as evidence for your own argument.' },
  { type: 'tip-box', text: 'A useful test: highlight every sentence in your essay. If more than 40% of highlighted sentences begin with the name of a researcher ("Smith argues...", "Jones found..."), you\'re reporting rather than analysing. The subject of most sentences should be the phenomenon you\'re studying, not the researchers.' },
  { type: 'heading', text: 'Paragraph Structure' },
  { type: 'numbered-steps', items: [
    'Topic sentence: states what this paragraph will argue (not just what it\'s about)',
    'Evidence: 1-2 specific citations that support this argument',
    'Analysis: your evaluation of what the evidence means',
    'Link back to RQ: one sentence connecting this paragraph\'s argument to your research question',
  ]},
  { type: 'heading', text: 'Words and Phrases to Avoid' },
  { type: 'warning-box', text: 'Avoid these in your EE: "In today\'s modern world...", "Since the dawn of time...", "It is widely known that...", "As we can clearly see...", "Obviously...", "Interestingly...". These are filler phrases that weaken academic writing. Remove them wherever they appear.' },
  { type: 'cta-box', label: 'Go deeper', text: 'Want worked before-and-after rewrites for your subject and the full writing system? It\'s inside the writing modules.', href: '/dashboard/home', buttonText: 'Start free' },
  { type: 'key-takeaway', items: [
    'Description states facts. Analysis evaluates what facts mean for your argument.',
    'Use claim-evidence-explanation as your paragraph template',
    'The subject of your sentences should be the phenomenon, not the researchers',
    'Academic register: "suggests", "implies", "the evidence indicates" — not "shows" or "I think"',
    'Every paragraph should end with a link back to your research question',
  ]},
]

const RELATED = [
  { href: '/guides/ee-mindset', title: 'The EE Mindset Shift', description: 'How thinking like a researcher changes your writing.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'How to organise your sections for maximum analytical impact.' },
]

const FAQ = [
  { question: 'Can I use first person ("I") in my Extended Essay?', answer: 'Occasionally, yes — particularly in the introduction (to state your approach) and in the RPPF. In the body of the essay, prefer third person and impersonal constructions. However, a single "I argue that" or "I find that" in a conclusion is acceptable and can read more directly than passive constructions.' },
  { question: 'How formal does my language need to be?', answer: 'Formal but not impenetrable. The goal is clarity and precision. A sentence that is technically "formal" but confusing serves no one. Write for an intelligent reader who doesn\'t know your specific topic — they should be able to follow your argument clearly.' },
  { question: 'Is it okay to use bullet points in my EE?', answer: 'Generally no — bullet points are not part of academic research paper conventions. Express all your analysis in prose paragraphs. The exception is a methodology section where you might list the tools you\'ll use, or a checklist-style conclusion (though this is unusual).' },
]

export default function EEAcademicWriting() {
  return (
    <GuidePage
      title="How to Write Academically for the IB Extended Essay"
      description="Academic writing isn't complicated words — it's analysis vs description. Learn the sentence patterns, paragraph structure, and register that signals A-grade thinking to an IB examiner."
      canonical="/guides/ee-academic-writing"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
