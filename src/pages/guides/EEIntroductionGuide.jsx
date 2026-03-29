import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Your introduction is the first thing an examiner reads — and first impressions matter. A strong introduction sets the tone, demonstrates knowledge, and makes the examiner want to keep reading. A weak one signals "this is just another school assignment."' },
  { type: 'heading', text: 'What Your Introduction Must Do' },
  { type: 'icon-card', icon: 'BookOpen', title: 'Set the Context', text: 'Introduce your topic area and explain why it matters in the broader academic landscape.' },
  { type: 'icon-card', icon: 'Target', title: 'Present Your RQ', text: 'Naturally lead the reader to your research question — it should feel like the obvious next question to ask.' },
  { type: 'icon-card', icon: 'Brain', title: 'Show Understanding', text: 'Demonstrate that you understand the key concepts and terminology. This is Criterion A territory.' },
  { type: 'icon-card', icon: 'PenLine', title: 'Preview Your Approach', text: 'Briefly outline the methods and structure you will use to answer your RQ.' },
  { type: 'heading', text: 'Four Types of Introduction Hooks' },
  { type: 'step-process', steps: [
    { title: 'The Storytelling Hook', text: 'Paint a scene or narrative that naturally leads to your RQ. Best for Business, Psychology, History, Economics.' },
    { title: 'The Contradiction Hook', text: '"It\'s widely assumed that X, but recent studies show..." Best for Sciences, Economics, Mathematics.' },
    { title: 'The Stakes Hook', text: 'Explain why your topic matters right now — what\'s at risk. Best for Environmental Science, Global Politics, Biology.' },
    { title: 'The Gap Hook', text: 'Show what research exists and what\'s missing. Best for Psychology, History, English Literature.' },
  ]},
  { type: 'heading', text: 'Before & After Example' },
  { type: 'before-after', before: { label: 'Weak introduction', text: '"ZARA is a global fashion brand. In this essay, I will examine ZARA\'s business strategy."' }, after: { label: 'Strong introduction', text: '"In 1940, rationing boards across wartime Europe dictated what civilians could wear. Eighty years later, a single company ships over 450 million garments per year, turning a runway trend into a store product in two weeks."' } },
  { type: 'tip-box', text: 'Your introduction should make the examiner think "this is interesting — I want to see what they found." If it reads like a summary of what your essay will cover, rewrite it.' },
  { type: 'heading', text: 'Common Mistakes to Avoid' },
  { type: 'warning-box', text: 'Don\'t start with a dictionary definition. Don\'t list every tool you\'ll use. Don\'t make it longer than 500-600 words. Don\'t save your RQ for the very last sentence without building toward it.' },
  { type: 'key-takeaway', items: [
    'Choose a hook type that matches your subject',
    'Build toward your RQ naturally — don\'t just state it',
    'Show understanding of key concepts (Criterion A)',
    'Keep it concise: 400-600 words is ideal',
  ]},
]

const RELATED = [
  { href: '/guides/ee-conclusion', title: 'How to Write an EE Conclusion', description: 'Your last impression matters just as much.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'The complete section-by-section guide.' },
]

export default function EEIntroductionGuide() {
  return (
    <GuidePage
      title="How to Write an Extended Essay Introduction"
      description="Learn the four types of introduction hooks, see before-and-after examples, and master the art of first impressions for your IB Extended Essay."
      canonical="/guides/extended-essay-introduction"
      content={CONTENT}
      relatedGuides={RELATED}
    />
  )
}
