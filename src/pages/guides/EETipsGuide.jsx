import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'These tips come from students who scored 30+ on their Extended Essays. They\'re the things most guides don\'t tell you — the practical, no-fluff advice that actually moves the needle.' },
  { type: 'heading', text: 'Strategy & Mindset' },
  { type: 'numbered-steps', items: [
    'Think of your EE as a research paper, not a school assignment. The quality bar is higher than most students expect.',
    'Use the Pareto principle: 20% of your effort produces 80% of your marks. Focus on the research question, structure, and criteria mapping.',
    'Start early, but don\'t rush. A well-planned EE written in 3 months beats a rushed one written in 2 weeks.',
    'Pick your battles with your supervisor. They give you your predicted grade — but you don\'t have to follow every suggestion.',
    'Read 5+ high-scoring EEs on Clastify before you start. Understand what an A looks like.',
  ]},
  { type: 'heading', text: 'Research & Writing' },
  { type: 'numbered-steps', items: [
    'Use the EE Dump method: research first, organize second, write third. Never write and research at the same time.',
    'Research through three levels: Google for context, Scholar for depth, PDF searches for foundational studies.',
    'Every paragraph should target a specific criterion. If it doesn\'t, cut it or refocus it.',
    'Don\'t describe — analyse. The difference between a B and an A is usually analysis depth.',
    'Your literature review is a critical evaluation, not a summary. Say what they found, how, and why it matters for YOUR RQ.',
  ]},
  { type: 'heading', text: 'Structure & Format' },
  { type: 'numbered-steps', items: [
    'Map your sections to criteria before writing. Introduction = A, Methodology = B, Analysis = B+C, Discussion = C.',
    'Only include tools you actually use. If you promise Porter\'s Five Forces in your methodology, it must appear in your analysis.',
    'Keep your introduction under 600 words. Get to your RQ quickly.',
    'Your analysis section should be the longest — about 35% of your total word count.',
    'Proofread. A 32/34 scorer didn\'t proofread once and still scored well — imagine the score with proofreading.',
  ]},
  { type: 'heading', text: 'RPPF & Final Steps' },
  { type: 'numbered-steps', items: [
    'The RPPF is worth 6 marks — the easiest in the IB. Follow the formula: challenge → attempt → learning → growth.',
    'Show the process, not the outcome. Examiners want to see your thinking evolve.',
    'Do a 15-minute formatting checklist before submission. Font, spacing, citations, page numbers — free marks.',
    'Clean up your bibliography. Replace any weak sources with more credible ones.',
    'Use AI as a thinking partner, never a writer. Ask it to critique, not to create.',
  ]},
  { type: 'tip-box', text: 'The students who get A\'s aren\'t the smartest. They\'re the ones who approached it strategically, researched with purpose, and didn\'t leave marks on the table from careless mistakes.' },
  { type: 'key-takeaway', items: [
    'Treat it as a research paper, not a school assignment',
    'Research first (EE Dump), structure second, write third',
    'Map every section to criteria — no purposeless writing',
    'Proofread and format check before submission — free marks',
  ]},
]

const RELATED = [
  { href: '/guides/how-to-get-an-a-in-extended-essay', title: 'How to Get an A in the Extended Essay', description: 'A practical step-by-step A-grade system.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'The section-by-section guide.' },
  { href: '/guides/rppf-guide', title: 'Complete RPPF Guide', description: 'Earn all 6 marks on your reflections.' },
]

export default function EETipsGuide() {
  return (
    <GuidePage
      title="Top 20 Extended Essay Tips from A-Grade Students"
      description="Practical, no-fluff advice from students who scored 30+ on their Extended Essays. Strategy, research, writing, and formatting tips that actually work."
      canonical="/guides/extended-essay-tips"
      content={CONTENT}
      relatedGuides={RELATED}
    />
  )
}
