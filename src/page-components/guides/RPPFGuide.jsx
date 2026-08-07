'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'The RPPF — Reflections on Planning and Progress Form — is worth 6 marks (Criterion E) and is the easiest points you\'ll ever get in the IB. Most students either overthink it or barely try. Here\'s exactly how to nail it.' },
  { type: 'stat-highlight', stat: '6', label: 'Marks available — the easiest in the entire IB' },
  { type: 'stat-highlight', stat: '3', label: 'Reflections required' },
  { type: 'stat-highlight', stat: '500', label: 'Words max per reflection' },
  { type: 'heading', text: 'What Your RPPF Should Show' },
  { type: 'paragraph', text: 'The RPPF shows that you genuinely went through the process of creating a research paper. Examiners want to see:' },
  { type: 'icon-card', icon: 'Target', title: 'Challenges', text: 'What obstacles did you encounter during research and writing?' },
  { type: 'icon-card', icon: 'Brain', title: 'Problem-Solving', text: 'What initial ideas did you have? What solutions did you try?' },
  { type: 'icon-card', icon: 'Zap', title: 'Adaptation', text: 'What didn\'t work? What did you learn? How did you adapt?' },
  { type: 'icon-card', icon: 'Award', title: 'Growth', text: 'How did you grow as a researcher through this process?' },
  { type: 'heading', text: 'The Three Reflections' },
  { type: 'step-process', steps: [
    { title: 'Reflection 1 — Early Stage', text: 'Why you chose this topic, how you arrived at your RQ, challenges in focusing, supervisor feedback and your response.' },
    { title: 'Reflection 2 — Mid Stage', text: 'How your understanding evolved, whether you adjusted your RQ, surprises during research, methodology challenges.' },
    { title: 'Reflection 3 — Final Stage', text: 'What you\'re most proud of, what you\'d do differently, how this process changed the way you think about research.' },
  ]},
  { type: 'heading', text: 'Reflect, Don\'t Describe' },
  { type: 'warning-box', text: 'Don\'t just describe what happened. Show the thinking behind your decisions. Examiners want to see intellectual engagement, not a timeline of events.' },
  { type: 'cta-box', label: 'Go deeper', text: 'Want the full reflection formula, worked sample reflections, and a fill-in template? It\'s all inside the RPPF Mastery module.', href: '/dashboard/home', buttonText: 'Start free' },
  { type: 'key-takeaway', items: [
    'The RPPF is worth 6 marks — don\'t leave them on the table',
    'Write three reflections: early, mid, and final stage',
    'Show the thinking behind your decisions, not just events',
    'Be genuine — show your real research journey, not a fabricated one',
  ]},
]

const RELATED = [
  { href: '/guides/extended-essay-tips', title: 'Top 20 EE Tips', description: 'Advice from A-grade students.' },
  { href: '/guides/ee-criteria-breakdown', title: 'Criteria Breakdown', description: 'Understand all five assessment criteria.' },
  { href: '/guides/ee-checklist', title: 'EE Submission Checklist', description: 'Make sure your RPPF is complete before you submit.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Guide', description: 'How the RPPF fits into the overall essay submission.' },
]

export default function RPPFGuide() {
  return (
    <GuidePage
      title="Complete RPPF Guide for IB Extended Essay"
      description="Master the Reflections on Planning and Progress Form. Learn the 3-reflection structure and what examiners look for across all six marks."
      canonical="/guides/rppf-guide"
      content={CONTENT}
      relatedGuides={RELATED}
    />
  )
}
