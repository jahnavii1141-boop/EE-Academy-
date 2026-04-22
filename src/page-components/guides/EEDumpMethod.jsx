'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Most students approach EE research the wrong way: they open a blank essay document and start writing while frantically Googling for sources. The result is a disorganised, thin essay with weak sourcing. The EE Dump Method flips this entirely — you research first, completely, and only then do you write.' },
  { type: 'heading', text: 'What Is the EE Dump?' },
  { type: 'paragraph', text: 'The EE Dump is a separate Google Doc or Word document where you dump every relevant piece of information you find during research — no filters, no word limits, no pressure. Think of it as your research brain dump. You are not writing your essay yet. You are building a resource.' },
  { type: 'tip-box', text: 'Create a folder on your laptop called PROJECT A. Inside it, create your EE Dump document. This is your research home base for the entire EE process.' },
  { type: 'heading', text: 'Step 1: Divide Your RQ Into 5 Subtopics' },
  { type: 'paragraph', text: 'Before you start Googling, break your research question into 5 distinct subtopics. These become the sections of your Dump document. For example, for the RQ "To what extent can quantitative analysis of social media sentiment explain variations in voter behavior during the 2024 US elections?"' },
  { type: 'numbered-steps', items: [
    'Quantitative analysis (methodology)',
    'Social media sentiment',
    'Engagement metrics',
    'Voter behaviour',
    'The 2024 US elections',
  ]},
  { type: 'paragraph', text: 'These don\'t need to be perfect. Just divide your RQ like you\'d divide a pizza — roughly equal parts that cover the whole thing. They\'re just for organisation, not your final essay structure.' },
  { type: 'heading', text: 'Step 2: The Dump Process' },
  { type: 'step-process', steps: [
    { title: 'Retrieve', text: 'Google each subtopic. Read every relevant result — articles, reports, news, papers. Don\'t skip anything that looks relevant.' },
    { title: 'Dump', text: 'Copy the relevant information into your Dump doc under the right subtopic heading. Always paste the source URL directly underneath the dumped content.' },
    { title: 'Repeat', text: 'Do this for Google first, then Google Scholar. There is no word limit for your Dump. More is always better at this stage.' },
  ]},
  { type: 'heading', text: 'Google vs Google Scholar: What Each Is For' },
  { type: 'comparison-table', headers: ['Google', 'Google Scholar'], rows: [
    ['Definitions and context', 'Peer-reviewed arguments and frameworks'],
    ['Policy documents', 'Academic models and debates'],
    ['Government data', 'Evidence you can evaluate, not just report'],
    ['Intro-level understanding', 'Foundational academic sources'],
    ['Think tank reports', 'PhD-level research and methodology'],
  ]},
  { type: 'warning-box', text: 'Do NOT ask AI to find sources for you. AI hallucinates citations — it will give you journal article titles and DOIs that look completely real but do not exist. Every source in your EE must be something you found and verified yourself.' },
  { type: 'heading', text: 'Why This Method Works' },
  { type: 'paragraph', text: 'After a certain point, researching the internet while writing your essay is not productive. You lose momentum, you lose your train of thought, and you spend more time looking for sources than actually writing. The Dump solves this: when you sit down to write, everything you need is already in one document. You can be 10x more knowledgeable and write with much more confidence because you\'ve already done the intellectual work.' },
  { type: 'tip-box', text: 'The Dump is also where you should finalise your research question. After completing the Dump, if you want to make any changes to your RQ — do it now. After this, it\'s one and done. No more changes. Your EE needs a clear purpose and a fixed direction.' },
  { type: 'heading', text: 'When to Stop Dumping' },
  { type: 'paragraph', text: 'You know you\'re done when each of your 5 subtopics has at least 3-4 solid sources with meaningful content. At that point, you have more than enough to write a well-evidenced 4,000-word essay.' },
  { type: 'key-takeaway', items: [
    'Create a separate Dump document — never write your essay and research at the same time',
    'Divide your RQ into 5 subtopics before you start',
    'Always paste the source URL under every piece of dumped content',
    'Use Google for context, Google Scholar for academic arguments',
    'Finalise your RQ after the Dump — then lock it in',
  ]},
]

const RELATED = [
  { href: '/guides/how-to-use-google-scholar-ee', title: 'How to Use Google Scholar for Your EE', description: 'The Scholar Shift: where top students separate from the rest.' },
  { href: '/guides/research-question-examples', title: 'Research Question Examples', description: 'See strong RQs across 8 subjects.' },
]

const FAQ = [
  { question: 'How long should my EE Dump be?', answer: 'There is no word limit. Some students have 5,000 word Dumps, some have 15,000. More research is always better at this stage. You won\'t use everything — that\'s fine.' },
  { question: 'Should I organise my Dump perfectly?', answer: 'No. The Dump is informal. It just needs to be organised enough that you can find information under the right subtopic heading. It\'s a research tool, not a marked document.' },
  { question: 'Can I change my subtopics after I start dumping?', answer: 'Yes — and you probably should. As you research, you\'ll find that some subtopics are more important than others. Adjust your divisions as your understanding of the topic deepens.' },
]

export default function EEDumpMethod() {
  return (
    <GuidePage
      title="The EE Dump Method: How to Research Your Extended Essay"
      description="Stop writing while you research. The EE Dump Method gives you a complete research system — build your source base first, then write with confidence. Used to score 32/34."
      canonical="/guides/ee-dump-method"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
