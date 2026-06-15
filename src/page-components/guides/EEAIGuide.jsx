'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'You\'re going to use AI. Your teachers know it. The IB knows it. The question isn\'t whether you\'ll use it — it\'s whether you\'ll use it like a student who gets flagged for academic misconduct, or like a top student whose essay genuinely improves because of it.' },
  { type: 'before-after',
    before: { label: 'How not to use AI', text: '"Hey ChatGPT, write me an extended essay about social media and voter psychology."' },
    after: { label: 'How top students use AI', text: '"Here\'s my rough research question. What are the weaknesses in how I\'ve framed this? What would an examiner push back on?"' },
  },
  { type: 'paragraph', text: 'One gets you a mediocre essay and academic integrity risk. The other makes your thinking sharper while keeping every word yours.' },
  { type: 'heading', text: 'The Golden Rules' },
  { type: 'icon-card', icon: 'AlertCircle', title: 'Never Paste AI Output Into Your EE', text: 'Not even a sentence. AI is for thinking, not writing. The moment AI text appears in your essay, you lose your authentic voice and risk disqualification.' },
  { type: 'icon-card', icon: 'Brain', title: 'Always Start With Your Ideas First', text: 'Don\'t go to AI with a blank slate. Go with something rough and let it sharpen your thinking. AI as a first step produces generic ideas. AI as a refining step produces your ideas, improved.' },
  { type: 'icon-card', icon: 'Target', title: 'Challenge What AI Tells You', text: 'AI is confident even when it\'s wrong. If it suggests something, verify it yourself. AI analysis can overreach — applying generic frameworks without respecting the boundaries of your specific RQ.' },
  { type: 'icon-card', icon: 'PenLine', title: 'Never Ask AI for Sources', text: 'AI hallucinates citations. It will give you author names, journal titles, and DOIs that look completely real but do not exist. Every source must come from your own Google Scholar research.' },
  { type: 'heading', text: 'Where AI Helps (and Where It Doesn\'t)' },
  { type: 'paragraph', text: 'Used well, AI is a thinking partner at four stages: stress-testing a research question you\'ve already drafted, checking your structure against the assessment criteria, critiquing your own draft for descriptive writing, and interviewing you about your process before you write your RPPF. In every case you bring the material first — AI reacts to your thinking, it doesn\'t replace it.' },
  { type: 'heading', text: 'What AI Cannot Do For Your EE' },
  { type: 'warning-box', text: 'Never: ask AI to write any part of your essay, find or generate sources (it hallucinates), give you statistics or data, paraphrase your sources, or "improve" your paragraphs by rewriting them. The moment AI touches your actual writing, it\'s no longer your EE.' },
  { type: 'paragraph', text: 'Think of AI like a gym buddy. A gym buddy doesn\'t lift the weights for you — if they did, you wouldn\'t get stronger. They spot your form, tell you what\'s weak, and push your thinking. But you do the heavy lifting. That\'s what AI should be for your EE.' },
  { type: 'cta-box', label: 'Go deeper', text: 'Want the exact, examiner-tested prompts for each stage — RQ stress-tests, structure audits, draft critiques and RPPF interviews? They\'re inside the AI module.', href: '/pricing', buttonText: 'Unlock the AI module' },
  { type: 'key-takeaway', items: [
    'Use AI to stress-test your RQ, not to generate it',
    'Use AI to critique your own draft, never to write it',
    'Use AI to check your structure against the EE criteria',
    'Never paste AI output into your essay',
    'Never ask AI for sources, statistics, or data',
  ]},
]

const RELATED = [
  { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'See strong RQs across 8 subjects to guide your own.' },
  { href: '/guides/rppf-guide', title: 'RPPF Guide', description: 'How to write your three reflections for Criterion E.' },
]

const FAQ = [
  { question: 'Will my school know if I used AI to write my EE?', answer: 'Yes, increasingly. AI-generated text has distinctive patterns — it lacks specific original findings, uses overly smooth transitions, and has no genuine voice. More importantly, examiners discuss the essay with you in the viva voce. If AI wrote it, you won\'t be able to defend it.' },
  { question: 'Is it okay to use ChatGPT to help improve my sentence structure?', answer: 'Using AI to rewrite your sentences makes the writing AI\'s, not yours. It\'s better to use AI to identify which sentences are weak, then rewrite them yourself. The improvement then genuinely belongs to you.' },
  { question: 'Can I use AI to translate academic papers I can\'t understand?', answer: 'Yes — using AI to help you understand difficult academic language is completely legitimate. You\'re still doing the research and forming your own arguments. Just never use the AI\'s explanation as the basis for a direct quote in your essay.' },
]

export default function EEAIGuide() {
  return (
    <GuidePage
      title="How to Use AI for Your IB Extended Essay (Without Getting Caught)"
      description="You're going to use AI. Use it like a top student. Learn the golden rules for using AI to sharpen your thinking on the IB Extended Essay — without crossing the academic integrity line."
      canonical="/guides/ee-ai-guide"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
