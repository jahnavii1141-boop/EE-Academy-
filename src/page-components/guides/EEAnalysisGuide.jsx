'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'The #1 reason IB Extended Essays drop from an A to a B is too much description and not enough analysis. This is so common that IB examiners have a phrase for it in their markschemes: "merely descriptive." Understanding the distinction and applying it consistently is the difference between an A and a B.' },
  { type: 'heading', text: 'Description vs Analysis: The Core Distinction' },
  { type: 'before-after',
    before: { label: 'Description (states what happened)', text: '"Japan\'s central bank implemented quantitative easing in 2013. The programme involved purchasing large quantities of government bonds. Interest rates were kept close to zero throughout this period."' },
    after: { label: 'Analysis (evaluates what it means)', text: '"Japan\'s 2013 quantitative easing programme, characterised by unprecedented bond purchases and near-zero interest rates, was designed to break the deflationary expectations embedded in consumer and investor behaviour since the 1990s. However, the transmission mechanism from monetary expansion to inflation proved slower than predicted, suggesting that structural factors — including Japan\'s ageing population and corporate deleveraging preferences — constrained the programme\'s effectiveness beyond what monetary models anticipated."' },
  },
  { type: 'paragraph', text: 'The analytical paragraph doesn\'t just state what happened — it evaluates WHY it happened, what it means, and where the expected outcome diverged from reality.' },
  { type: 'heading', text: 'The Description-to-Analysis Test' },
  { type: 'paragraph', text: 'Take any paragraph from your essay and classify every sentence as D (describes a fact) or A (evaluates, interprets, or draws a conclusion). A strong paragraph has roughly a 30/70 split: 30% description to establish the facts, 70% analysis to evaluate them.' },
  { type: 'tip-box', text: 'If you can replace a sentence with "so what?" and it makes the essay sound better, that sentence needed more analysis. Every descriptive fact should be followed by its analytical consequence.' },
  { type: 'heading', text: 'Five Analytical Moves' },
  { type: 'step-process', steps: [
    { title: 'Compare and Contrast', text: 'Place two things side by side and draw conclusions from the differences. "ZARA\'s inventory turnover of 5.12 falls significantly below H&M\'s 7.8, suggesting that ZARA\'s competitive advantage derives from factors other than production speed."' },
    { title: 'Identify Cause and Effect', text: 'Don\'t just state that something happened — explain why it happened and what it caused. "The collapse of the Soviet Union in 1991 accelerated German reunification by removing the geopolitical obstacle that had sustained the division as a buffer state."' },
    { title: 'Challenge the Assumption', text: 'Find the conventional narrative and interrogate it. "While ZARA is widely characterised as successful because of its fast fashion model, the data suggests that its inventory turnover actually underperforms the industry average."' },
    { title: 'Evaluate the Evidence', text: 'Assess the quality and limitations of your sources. "This finding is based on self-reported survey data, which may overstate the correlation due to social desirability bias."' },
    { title: 'Synthesise Across Sources', text: 'Connect findings from multiple sources to reach a conclusion neither source reaches alone. "Taken together, Smith\'s quantitative findings and Jones\'s qualitative analysis suggest that social media influence on voting behaviour operates primarily through reinforcement rather than persuasion."' },
  ]},
  { type: 'heading', text: 'Turning Description Into Analysis: Examples' },
  { type: 'comparison-table', headers: ['Descriptive Version', 'Analytical Version'], rows: [
    ['"ZARA uses a fast supply chain."', '"ZARA\'s two-week design-to-shelf cycle creates artificial scarcity — a marketing strategy that drives urgency without the advertising spend its competitors require."'],
    ['"The Marshall Plan gave money to European countries."', '"The Marshall Plan\'s $13 billion in aid served a dual purpose: rebuilding European economies to create export markets for US goods while simultaneously creating a buffer of economically stable states against Soviet expansion."'],
    ['"Cortisol levels increase during stress."', '"Elevated cortisol during acute stress impairs hippocampal function, reducing the consolidation of explicit memories — which explains why trauma survivors often report fragmented rather than continuous recollections."'],
  ]},
  { type: 'heading', text: 'The Evaluative Vocabulary' },
  { type: 'paragraph', text: 'The language you use signals to examiners whether you\'re analysing or describing. Analytical verbs and phrases:' },
  { type: 'numbered-steps', items: [
    '"This suggests / implies / indicates that..."',
    '"The significance of this finding lies in..."',
    '"This challenges the assumption that..."',
    '"The disparity between X and Y reveals..."',
    '"This supports / contradicts the theory that..."',
    '"The weight of evidence suggests that..."',
    '"This outcome can be attributed to..."',
  ]},
  { type: 'key-takeaway', items: [
    '"Merely descriptive" is the most common reason IB EEs lose marks',
    'Every fact you state should be followed by what that fact means for your argument',
    'Use the 5 analytical moves: compare, cause/effect, challenge, evaluate, synthesise',
    'Aim for 30% description, 70% analysis in every body paragraph',
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
      description="'Merely descriptive' is the most common reason EEs drop from A to B. Learn the 5 analytical moves, how to test your paragraphs, and the evaluative vocabulary that signals A-grade thinking to examiners."
      canonical="/guides/ee-analysis-vs-description"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
