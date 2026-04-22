'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'The single biggest reason students underperform on the Extended Essay isn\'t a lack of intelligence or effort. It\'s the wrong mental model for what the EE actually is. Most students approach it as "a long school essay." That framing produces C-grade work. Changing that framing alone can move you from a C to an A.' },
  { type: 'heading', text: 'The Mindset Shift That Changes Everything' },
  { type: 'before-after',
    before: { label: 'How most students think about the EE', text: '"I\'m an IB student writing a 4,000-word essay for school. I need to find some sources, cover the topic, and not fail."' },
    after: { label: 'How A-grade students think about the EE', text: '"I\'m an academic researcher writing the first genuine research paper of my career. This will be read by a subject expert. My findings need to be original, my argument tight, and my evidence solid."' },
  },
  { type: 'paragraph', text: 'The second framing doesn\'t just sound better — it produces fundamentally different work. The vocabulary changes. The sourcing changes. The depth of analysis changes. The quality of the conclusion changes. And critically, this is exactly the quality IB examiners are trained to recognise and reward.' },
  { type: 'heading', text: 'What the IB Actually Wants' },
  { type: 'paragraph', text: 'The IB describes the Extended Essay as: "a formal piece of academic writing" intended to "promote academic research and writing skills" and help students "experience the excitement of intellectual exploration."' },
  { type: 'icon-card', icon: 'BookOpen', title: 'A Formal Piece of Academic Writing', text: 'Not a school essay. Not a Wikipedia article. An actual research paper — structured like one, cited like one, argued like one.' },
  { type: 'icon-card', icon: 'Search', title: 'Student-Led Academic Research', text: 'Your research question needs to feel genuinely yours. Niche, personal, and specific enough that it could only have come from you.' },
  { type: 'icon-card', icon: 'Brain', title: 'Intellectual Exploration', text: 'Examiners can tell when a student is genuinely engaged with their topic. You don\'t need to love it — but your essay needs to show that you do.' },
  { type: 'heading', text: 'The Pareto Principle Applied to Your EE' },
  { type: 'paragraph', text: '20% of your effort contributes to 80% of your results. That 20% in the EE context is: choosing a focused, analytical RQ; doing thorough structured research; and writing with an academic register throughout. Everything else — formatting, bibliography, word count — is important but it\'s the remaining 20% of your score.' },
  { type: 'paragraph', text: 'Most students invest heavily in the wrong 80%: spending hours on formatting while their argument is thin, or writing thousands of words of description when 400 words of genuine analysis would score higher.' },
  { type: 'heading', text: 'Thinking Like an Academic Means Two Things' },
  { type: 'step-process', steps: [
    { title: 'Your Formatting and Organisation Are Immaculate', text: 'An academic paper looks professional. Consistent headings, proper citations, clean structure. Not because it\'s cosmetic — but because it communicates that you take your research seriously.' },
    { title: 'Your Findings and Passion Are Genuine', text: 'The most important words in a research paper are "I found that..." Your essay should have original analysis — not just a report of what others found. What does YOUR data show? What is YOUR conclusion? What surprised YOU?' },
  ]},
  { type: 'heading', text: 'Why Your Personal Interest Matters (Even If You Don\'t Have One)' },
  { type: 'paragraph', text: 'The IB says the EE should be on "a topic of personal interest." Most students interpret this as: "I need to be passionate about something academic." That\'s not what it means.' },
  { type: 'paragraph', text: 'Your personal interest doesn\'t have to be IB-related. It can be anything that appears on your FYP: fashion, culture, pop music, politics, sport, food — literally anything. The Extended Essay lets you tie a real-world interest to an IB subject in a way that could only be yours. That\'s what makes an RQ feel genuinely original rather than generic.' },
  { type: 'tip-box', text: 'Take it from someone who wrote a 32/34 EE about ZARA\'s supply chain: the fact that I was genuinely interested in business strategy meant I didn\'t have to force engagement. The curiosity was real. Find your equivalent.' },
  { type: 'heading', text: 'The 3-Point Frame for Your Entire EE' },
  { type: 'key-takeaway', items: [
    'Write it like a research paper, not a school essay — language, structure, sourcing, everything',
    'Your findings must be original — don\'t just summarise what others found, draw your own conclusions',
    'Connect your personal interest to your subject — that\'s what makes your RQ feel genuinely yours',
  ]},
]

const RELATED = [
  { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'See how the right RQ frames the entire essay.' },
  { href: '/guides/ee-criteria-breakdown', title: 'EE Criteria Breakdown', description: 'Understand exactly what examiners are marking you on.' },
]

const FAQ = [
  { question: 'What if I genuinely don\'t care about my EE topic?', answer: 'You don\'t need to care about the topic — you need to appear to care about it in your essay. The way you do this is by choosing a topic that connects to something real in your life (even tangentially), and then approaching the research with genuine curiosity about what you\'ll find. The research process itself often creates interest in topics you started out indifferent about.' },
  { question: 'Is it really possible to get an A without being a top student?', answer: 'Yes. The EE rewards methodology and approach, not raw academic ability. A student who follows the right system, chooses a focused RQ, researches thoroughly, and writes with an academic register will consistently outscore a more naturally talented student who treats it as just another essay.' },
  { question: 'Does the subject choice matter as much as people say?', answer: 'Subject matters but not as much as approach. Some subjects (like Business Management) are considered more accessible for EE purposes because the analytical frameworks are well-defined and the research is accessible. But a well-executed EE in any subject will score well.' },
]

export default function EEMindset() {
  return (
    <GuidePage
      title="How to Think About the IB Extended Essay (The Mindset Shift)"
      description="The biggest reason students underperform on the EE isn't intelligence — it's the wrong mental model. Learn the exact mindset shift that separates C-grade from A-grade extended essays."
      canonical="/guides/ee-mindset"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
