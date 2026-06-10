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
  { type: 'heading', text: 'Stage 1: Refining Your Research Question' },
  { type: 'paragraph', text: 'This is where AI is most useful. Not to give you a research question — but to stress-test the one you already have.' },
  { type: 'step-process', steps: [
    { title: 'Prompt: Stress-Test Your Draft RQ', text: 'Act as an experienced IB Extended Essay examiner. Here\'s my draft RQ: "[YOUR RQ]". Is it too broad? Is it researchable in 4,000 words? Does it allow for analysis or just description? What would you expect to see in an essay answering this? Give me 3 more focused versions. Be brutally honest.' },
    { title: 'Prompt: The "So What?" Test', text: 'My EE research question is: "[YOUR RQ]". Ask me "so what?" five times — each time digging deeper into why this research matters. After five iterations, tell me whether my RQ has enough depth or if I need to rethink it.' },
    { title: 'Prompt: Finding Your Angle From Your Interests', text: 'I\'m interested in [YOUR INTEREST]. My HL subjects are [YOUR SUBJECTS]. Don\'t give me a research question. Give me 10 unexpected angles where my interest connects to one of my subjects in a way that would surprise an examiner. Think niche and specific.' },
  ]},
  { type: 'heading', text: 'Stage 2: Checking Your Structure' },
  { type: 'step-process', steps: [
    { title: 'Prompt: Structure vs Criteria Audit', text: 'Here\'s my EE structure: [PASTE YOUR SECTIONS]. The EE criteria are A: Knowledge/Understanding, B: Application/Analysis, C: Synthesis/Evaluation, D: Communication. For each section, which criterion does it address? Is any criterion uncovered? What\'s missing?' },
    { title: 'Prompt: Logical Flow Check', text: 'Here are my planned sections in order: [PASTE SECTIONS]. Does this order make logical sense? Would a reader moving from section 1 to 6 follow a clear, building argument? If not, suggest a better order and why.' },
  ]},
  { type: 'heading', text: 'Stage 3: Critiquing Your Draft' },
  { type: 'paragraph', text: 'This is where AI becomes a genuine asset. Use it to tear your draft apart before a real examiner does.' },
  { type: 'step-process', steps: [
    { title: 'Prompt: The Examiner Simulation', text: 'You are an experienced IB EE examiner known for being thorough and critical. You do not give praise unless it\'s earned. Here is a section of my essay: [PASTE SECTION]. My RQ is: [YOUR RQ]. Grade this against the EE criteria. What grade band? The three biggest weaknesses. Specific weak sentences and why. What\'s missing. Be accurate, not nice.' },
    { title: 'Prompt: Description vs Analysis Check', text: 'Read this section: [PASTE SECTION]. Highlight every sentence that is purely descriptive vs analytical. What percentage is description vs analysis? For the descriptive parts, show me how to transform each into analysis.' },
    { title: 'Prompt: Academic Tone Check', text: 'Read this section and identify any parts that sound too casual or like a high school student wrote it rather than an academic researcher. Quote the problematic phrase and give a more academic alternative — but keep it readable, not robotic.' },
  ]},
  { type: 'heading', text: 'Stage 4: RPPF Reflection' },
  { type: 'tip-box', text: 'Use AI to interview you about your process, not to write your reflection. Your RPPF must be 100% your own words describing your real experience. Examiners use the RPPF to verify your work is genuine.' },
  { type: 'paragraph', text: 'Prompt: "I\'m writing my RPPF. Here\'s what happened: my original RQ was [X], I changed it to [Y], the biggest challenge was [Z], something that surprised me was [W]. Ask me 10 deep questions about my process that would help me write a thoughtful 500-word reflection. Focus on intellectual growth, problem-solving, and what I learned about myself as a researcher."' },
  { type: 'heading', text: 'What AI Cannot Do For Your EE' },
  { type: 'warning-box', text: 'Never: ask AI to write any part of your essay, find or generate sources (it hallucinates), give you statistics or data, paraphrase your sources, or "improve" your paragraphs by rewriting them. The moment AI touches your actual writing, it\'s no longer your EE.' },
  { type: 'paragraph', text: 'Think of AI like a gym buddy. A gym buddy doesn\'t lift the weights for you — if they did, you wouldn\'t get stronger. They spot your form, tell you what\'s weak, and push your thinking. But you do the heavy lifting. That\'s what AI should be for your EE.' },
  { type: 'cta-box', label: 'Free tool', text: 'Track your sources as you research and generate your MLA bibliography automatically with the EE Dump.', href: '/dashboard/dump', buttonText: 'Try EE Dump free' },
  { type: 'key-takeaway', items: [
    'Use AI to stress-test your RQ, not to generate it',
    'Use AI to critique your draft — "be accurate, not nice" is the key phrase',
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
      description="You're going to use AI. Use it like a top student. Learn the exact prompts for stress-testing your RQ, critiquing your draft, and improving your structure — without crossing the academic integrity line."
      canonical="/guides/ee-ai-guide"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
