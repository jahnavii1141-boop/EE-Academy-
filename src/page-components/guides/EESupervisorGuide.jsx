'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Your EE supervisor is not your enemy. They\'re not trying to make your essay worse or force you into a topic you don\'t care about. But students often treat the supervisor relationship as adversarial — fighting every piece of feedback, ignoring suggestions, or going weeks without contact. That\'s a mistake that costs marks.' },
  { type: 'heading', text: 'What Your Supervisor Actually Does' },
  { type: 'icon-card', icon: 'Target', title: 'Approves Your RQ', text: 'Your supervisor must approve your research question before you proceed. Their feedback on your RQ is the most valuable feedback you\'ll get — take it seriously.' },
  { type: 'icon-card', icon: 'BookOpen', title: 'Guides Your Process', text: 'They help you stay on track, avoid going off-topic, and identify when your analysis is too thin or your structure is unclear.' },
  { type: 'icon-card', icon: 'PenLine', title: 'Writes Your Predicted Grade', text: 'This is the one you need to remember. Your supervisor writes a significant part of your IB school evaluation. Pick your battles wisely.' },
  { type: 'icon-card', icon: 'CheckCircle', title: 'Signs Off on Academic Integrity', text: 'Your supervisor confirms to IB that your work is genuine. A good supervisor relationship protects you here — they know your process and can vouch for it.' },
  { type: 'heading', text: 'When to Push Back (and When Not To)' },
  { type: 'paragraph', text: 'A 32/34 EE was written on ZARA. The supervisor suggested changing "fast fashion retail market" to the broader "fashion retail market" in the RQ. Was the supervisor right? Not really — the original was more precise. But this is an example of when NOT to fight back.' },
  { type: 'before-after',
    before: { label: 'Not worth the fight', text: 'Arguing about one word in your RQ when the core direction is unchanged. Defending a minor structural choice. Pushing back on a formatting suggestion.' },
    after: { label: 'Worth defending', text: 'Your choice of analytical framework when you have a clear reason for it. A strategic decision to omit something from your analysis that falls outside your RQ\'s scope. Your core research direction when the supervisor wants to redirect you to a less interesting topic.' },
  },
  { type: 'tip-box', text: 'If your supervisor suggests a change and you disagree: implement it, note your original choice in your RPPF, and explain your reasoning. This shows intellectual maturity — you followed the process while demonstrating you had a considered view.' },
  { type: 'heading', text: 'The Three Mandatory Supervisor Meetings' },
  { type: 'step-process', steps: [
    { title: 'Meeting 1: RQ Approval', text: 'Come with 2-3 possible RQs, not just one. Show you\'ve thought about different angles. Be prepared to justify your choice. Leave with a formally approved RQ.' },
    { title: 'Meeting 2: First Draft Feedback', text: 'Submit your draft at least 3 days before the meeting — not the morning of. Come with specific questions: "Is my analysis in Section III deep enough?" "Does my conclusion directly answer the RQ?" Use their feedback to guide your revision.' },
    { title: 'Meeting 3: Final Review', text: 'Have your formatting, citations, and RPPF ready. This is your last chance to address any remaining issues before submission. Ask directly: "Is there anything you\'d flag to the examiner as a concern?"' },
  ]},
  { type: 'heading', text: 'What to Never Do With Your Supervisor' },
  { type: 'warning-box', text: 'Never: disappear for weeks without contact (this creates a bad impression they\'ll document), ask your supervisor to write sections of your essay for you (academic misconduct), ignore feedback without explanation, change your RQ significantly after it\'s been approved without informing them.' },
  { type: 'heading', text: 'Getting More Than the Minimum' },
  { type: 'paragraph', text: 'IB mandates 3 meetings. Most supervisors are willing to have more if you come prepared and use their time well. The difference between "can I have another meeting?" and "I\'ve revised based on your feedback and have three specific questions — could we meet briefly?" is significant. The second approach respects their time and almost always gets a yes.' },
  { type: 'key-takeaway', items: [
    'Your supervisor writes your predicted grade — maintain a professional, collaborative relationship',
    'Get your RQ approved in Meeting 1 before you start any research',
    'Submit drafts before meetings — not the morning of',
    'Pick your battles: defend your core argument, concede on minor stylistic points',
    'Use your RPPF to document where you disagreed with feedback and why you chose your approach',
  ]},
]

const RELATED = [
  { href: '/guides/rppf-guide', title: 'RPPF Guide', description: 'Document your supervisor interactions in your reflections.' },
  { href: '/guides/ee-planning-timeline', title: 'EE Planning Timeline', description: 'When to schedule each supervisor meeting in your 16-week plan.' },
]

const FAQ = [
  { question: 'What if my supervisor doesn\'t know much about my topic?', answer: 'This is common. Your supervisor doesn\'t need subject expertise — they\'re guiding your research process, not teaching you the content. Their feedback on structure, clarity, and argument will still be valuable even if they don\'t know the specifics of your topic.' },
  { question: 'Can I switch supervisors?', answer: 'In most schools, yes, though it\'s disruptive. If there\'s a genuine mismatch (different subject, poor communication, lack of availability), speak to your EE coordinator. Don\'t switch over a minor disagreement.' },
  { question: 'Should I tell my supervisor I\'m using AI tools?', answer: 'You should be transparent about your process. Using AI as a thinking partner (to stress-test your RQ, to get critical feedback on drafts) is different from using AI to write your essay. Most supervisors understand the distinction — and being upfront builds trust.' },
]

export default function EESupervisorGuide() {
  return (
    <GuidePage
      title="How to Work With Your IB Extended Essay Supervisor"
      description="Your supervisor writes your predicted grade. Learn how to use your three mandatory meetings effectively, when to push back on feedback (and when not to), and how to build a relationship that protects your marks."
      canonical="/guides/ee-supervisor-tips"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
