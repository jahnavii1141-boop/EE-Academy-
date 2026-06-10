'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'The literature review is one of the most misunderstood sections of the Extended Essay. Most students treat it as a summary of sources — what various researchers have said about their topic. That\'s not what a literature review is. A literature review demonstrates that you understand the existing academic conversation around your topic, and positions your own research question within it.' },
  { type: 'heading', text: 'What a Literature Review Actually Does' },
  { type: 'icon-card', icon: 'BookOpen', title: 'Establishes Context', text: 'Shows the examiner you know what has already been researched and what is already known about your topic area.' },
  { type: 'icon-card', icon: 'Target', title: 'Justifies Your RQ', text: 'By showing what exists, you implicitly show why your specific research question still matters — what gap or angle hasn\'t been fully explored.' },
  { type: 'icon-card', icon: 'Brain', title: 'Introduces Your Framework', text: 'The theoretical models, tools, or approaches you will use in your analysis are introduced here with academic backing.' },
  { type: 'icon-card', icon: 'PenLine', title: 'Signals Criterion A', text: 'This is where examiners see your knowledge and understanding of the subject area. Strong terminology and academic engagement here directly impacts your Criterion A score.' },
  { type: 'heading', text: 'The Common Mistake: Description vs. Engagement' },
  { type: 'before-after',
    before: { label: 'Weak: just summarising', text: '"Smith (2019) argues that social media has a significant effect on voter behaviour. Jones (2021) found that engagement metrics correlate with political alignment."' },
    after: { label: 'Strong: engaging and evaluating', text: '"While Smith (2019) establishes a correlation between social media exposure and voting intent, his methodology relies entirely on self-reported survey data — a limitation Jones (2021) addresses by introducing quantitative sentiment analysis as a more objective measure."' },
  },
  { type: 'paragraph', text: 'The difference is that the strong version shows you can evaluate sources against each other, not just report what they said. This is Criterion C territory, and it starts in your literature review.' },
  { type: 'heading', text: 'Structure for Your Literature Review' },
  { type: 'step-process', steps: [
    { title: 'Open with the Broad Landscape', text: 'In 1-2 paragraphs, describe what the academic field says about your general topic area. What is the established consensus? What are the key debates?' },
    { title: 'Introduce Your Theoretical Framework', text: 'Explain the main models, tools, or theories you will use in your analysis. For Business: Porter\'s Five Forces, financial ratios, etc. For Economics: specific economic models. Introduce them here with citations.' },
    { title: 'Identify the Gap or Angle', text: 'Show what the existing research doesn\'t fully address — and how your RQ fills that gap. This is what justifies your essay\'s existence.' },
    { title: 'Bridge to Your Methodology', text: 'End with a brief transition: "Given these existing frameworks, this essay applies X approach to analyse Y." Now your methodology section feels natural.' },
  ]},
  { type: 'heading', text: 'How Long Should It Be?' },
  { type: 'paragraph', text: 'For a 4,000-word EE, your literature review should be approximately 400-600 words. It\'s not the main event — your analysis is. The literature review sets the stage. If it\'s longer than 700 words, you\'re probably summarising sources instead of engaging with them.' },
  { type: 'tip-box', text: 'A common mistake is mixing the literature review with the actual analysis. The literature review should present existing theory and research. The application of that theory to YOUR research question happens in the body sections that follow.' },
  { type: 'heading', text: 'What to Cite' },
  { type: 'paragraph', text: 'Aim for 3-5 strong academic sources in your literature review. These should be peer-reviewed papers or established academic texts — not news articles or websites. Every source you introduce in the literature review should appear in your analysis. Don\'t introduce a framework here and then never use it.' },
  { type: 'warning-box', text: 'Don\'t promise tools you won\'t deliver. If you introduce Porter\'s Five Forces in your literature review, examiners expect to see it applied in your analysis. Only introduce frameworks you will actually use. This is one of the most common causes of lost marks.' },
  { type: 'cta-box', label: 'Free tool', text: 'Track your sources as you research and generate your MLA bibliography automatically with the EE Dump.', href: '/dashboard/dump', buttonText: 'Try EE Dump free' },
  { type: 'key-takeaway', items: [
    'A literature review engages with sources — it doesn\'t just summarise them',
    'Evaluate sources against each other: show you can see their limitations',
    'Introduce your theoretical framework here, not in the methodology',
    'Keep it to 400-600 words — it sets the stage, it\'s not the main act',
    'Only introduce frameworks you will actually apply in your analysis',
  ]},
]

const RELATED = [
  { href: '/guides/how-to-use-google-scholar-ee', title: 'How to Use Google Scholar for Your EE', description: 'Find the academic sources your literature review needs.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'How the literature review fits into your full essay structure.' },
]

const FAQ = [
  { question: 'Is a literature review required in the IB Extended Essay?', answer: 'The IB doesn\'t mandate a section specifically labelled "Literature Review" — but demonstrating knowledge of existing research is required under Criterion A. Having a dedicated literature review section makes it clear to the examiner you\'ve done this.' },
  { question: 'Can my literature review include non-academic sources?', answer: 'Primarily it should be academic sources — peer-reviewed papers, established textbooks, institutional reports. A government report or think-tank publication is acceptable. A news article or Wikipedia is not.' },
  { question: 'What\'s the difference between the literature review and the introduction?', answer: 'Your introduction establishes the topic, presents your RQ, and explains why the question matters. Your literature review goes deeper: it surveys the existing academic research and theoretical frameworks relevant to your RQ.' },
]

export default function EELiteratureReview() {
  return (
    <GuidePage
      title="How to Write an Extended Essay Literature Review"
      description="The literature review is not a source summary. Learn what it actually does, how to structure it, and how to use it to demonstrate Criterion A knowledge to your examiner."
      canonical="/guides/ee-literature-review"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
