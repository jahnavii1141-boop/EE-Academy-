'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Most students never make it past Google. They find a few articles, skim them, and call it research. Top students do something different: they make what\'s called the Scholar Shift — moving from Google into Google Scholar, where peer-reviewed academic research lives. This is where examiners can immediately see the difference between a C-grade and an A-grade essay.' },
  { type: 'heading', text: 'What Google Is Actually For' },
  { type: 'paragraph', text: 'Before getting to Scholar, understand what Google is good for in EE research:' },
  { type: 'icon-card', icon: 'BookOpen', title: 'Context and Definitions', text: 'Use Google to understand your topic at a surface level. Get your bearings before going deep.' },
  { type: 'icon-card', icon: 'FileText', title: 'Policy Documents and Reports', text: 'Government websites, think tanks (IMF, World Bank, McKinsey), and news outlets give you real-world data.' },
  { type: 'icon-card', icon: 'Search', title: 'Intro-Level Understanding', text: 'Wikipedia, Investopedia, and similar sources are fine for building initial understanding — but never cite them in your essay.' },
  { type: 'warning-box', text: 'Google is NOT for: academic arguments, causal claims without peer-reviewed citations, or EE-level analysis. If you build your argument on Google alone, your essay will read like a school report, not a research paper.' },
  { type: 'heading', text: 'The Scholar Shift' },
  { type: 'paragraph', text: 'Google Scholar (scholar.google.com) gives you access to peer-reviewed papers, academic journals, PhD dissertations, and studies by researchers who have spent years studying exactly what you\'re writing about. Once you cite these, your essay immediately reaches a different level.' },
  { type: 'paragraph', text: 'Most students don\'t get to this level of depth. The people grading your paper know this — which means arriving here already puts you ahead.' },
  { type: 'heading', text: 'The Step-by-Step Scholar Method' },
  { type: 'step-process', steps: [
    { title: 'Search Narrowly', text: 'Not "inflation India" — instead: "monetary policy transmission India inflation." The more specific your search term, the more relevant your results.' },
    { title: 'Sort by Relevance First', text: 'Don\'t filter by date immediately. New does not mean good. Influential foundational papers from 10-20 years ago are often more useful than recent ones.' },
    { title: 'Open Maximum 3 Papers', text: 'Top students do NOT open 20 tabs. They scan the abstract, introduction, and conclusion. If a paper doesn\'t directly help, discard it.' },
    { title: 'Follow the Citations', text: 'The best strategy: find one good paper, then look at what IT cites. Those foundational papers are often the most authoritative sources you can use.' },
  ]},
  { type: 'heading', text: 'What Makes a Source EE-Worthy' },
  { type: 'comparison-table', headers: ['EE-Worthy', 'Red Flag'], rows: [
    ['Has a clear argument or finding', 'Blog post with no citations'],
    ['Uses data or established theory', 'News article used as analysis'],
    ['Acknowledges its own limitations', 'Paper that only describes, never evaluates'],
    ['Can be evaluated, not just summarised', 'Wikipedia or student-written sources'],
    ['Published in a journal or by an institution', 'Random website with no author'],
  ]},
  { type: 'heading', text: 'How to Note Sources (Not Like Your Dump)' },
  { type: 'paragraph', text: 'For your final source notes (separate from your Dump), record only three things per source. This makes evaluation effortless when you\'re writing:' },
  { type: 'numbered-steps', items: [
    'Core claim (1 sentence — what does this paper argue?)',
    'Evidence/method (what data or approach did they use?)',
    'Limitation or bias (what does this paper NOT account for?)',
  ]},
  { type: 'tip-box', text: 'The limitation you note becomes your critical evaluation in the essay. "While Smith (2019) argues X using Y methodology, this approach has limitations because Z." That single sentence pattern is worth marks under Criterion C.' },
  { type: 'heading', text: 'When to Stop Researching' },
  { type: 'paragraph', text: 'You stop when each of your sub-questions has 2-3 solid sources. Not 10. Not 20. Two or three strong, peer-reviewed, evaluable sources per subtopic is more than enough for a 4,000-word essay.' },
  { type: 'key-takeaway', items: [
    'Google for context, Google Scholar for academic arguments — never mix these up',
    'Search narrowly with specific terminology, not broad topic names',
    'Open 3 papers max, scan abstract + intro + conclusion, discard the rest',
    'Follow citations to find the foundational papers everyone references',
    'Note: core claim, evidence/method, limitation — nothing else',
  ]},
]

const RELATED = [
  { href: '/guides/ee-dump-method', title: 'The EE Dump Research Method', description: 'Build your complete research base before writing a word.' },
  { href: '/guides/ee-literature-review', title: 'How to Write an EE Literature Review', description: 'Turn your Scholar sources into a strong literature review.' },
]

const FAQ = [
  { question: 'Can I use Wikipedia in my EE?', answer: 'Never as a cited source. But Wikipedia is useful for getting initial context and — crucially — for finding the references at the bottom of Wikipedia articles, which are often legitimate academic sources you can then look up on Scholar.' },
  { question: 'What if I can\'t find peer-reviewed papers on my topic?', answer: 'Broaden your search terms or look at adjacent topics. If you\'re writing about a business topic, look for economics papers. If it\'s a psychology topic, look for behavioural science. Most EE topics have relevant academic literature once you use the right terminology.' },
  { question: 'How do I access papers that are behind a paywall?', answer: 'Try Google Scholar first — many papers have free PDF versions linked. If not, try Unpaywall (browser extension) or look for the paper on ResearchGate. Your school library may also have database access.' },
]

export default function EEGoogleScholar() {
  return (
    <GuidePage
      title="How to Use Google Scholar for Your Extended Essay"
      description="Most students never make the Scholar Shift. Learn the step-by-step method to find peer-reviewed sources, evaluate them like an examiner, and build an A-grade bibliography."
      canonical="/guides/how-to-use-google-scholar-ee"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
