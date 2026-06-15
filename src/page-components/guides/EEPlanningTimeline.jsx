'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'The Extended Essay feels overwhelming when you look at it as one 4,000-word task. It becomes manageable when you break it into a sequence of smaller steps with clear deadlines. This timeline is built backwards from your submission date — the way every top student plans.' },
  { type: 'heading', text: 'The Core Principle: Reverse-Engineer Your Deadline' },
  { type: 'paragraph', text: 'Start from your submission deadline and work backwards. Every task in this timeline has a specific window. Missing one doesn\'t just put you behind — it compresses everything that follows.' },
  { type: 'heading', text: 'The 6-Phase EE Timeline' },
  { type: 'step-process', steps: [
    { title: 'Phase 1 (Weeks 1-2): Subject and Topic Selection', text: 'Choose your EE subject and broad topic area. Browse Clastify to understand what good EEs in your subject look like. Have initial conversations with potential supervisors. Don\'t commit to a specific RQ yet — just the broad direction.' },
    { title: 'Phase 2 (Weeks 3-4): Research Question Development', text: 'Brainstorm 3-5 possible RQs. Test each one: is it answerable in 4,000 words? Does it allow for analysis? Is research available? Get your preferred RQ approved by your supervisor before moving on. Once approved, it\'s locked — no changes after Phase 3.' },
    { title: 'Phase 3 (Weeks 5-7): Research', text: 'This is the most important phase. Break your RQ into sub-questions and research each one systematically: general search first, then Google Scholar. Track every source URL in one organised document. By the end of this phase you should have enough material to write your entire essay from memory.' },
    { title: 'Phase 4 (Weeks 8-9): Structure and Outline', text: 'Use your research notes to create a detailed essay outline. Map each section to the IB criteria. Decide which analytical approaches you\'ll use and where. Write your complete section-by-section plan before you write a single sentence of the essay.' },
    { title: 'Phase 5 (Weeks 10-13): Writing', text: 'Write one section per session. Don\'t try to write the whole essay in one go. Start with your body sections (your most confident material), then introduction and conclusion. Your first draft will be rough — that\'s expected.' },
    { title: 'Phase 6 (Weeks 14-16): Revision, RPPF, and Submission', text: 'Get feedback from your supervisor on your first draft. Revise. Check formatting, citations, word count. Write your RPPF reflections. Do your final pre-submission checklist. Submit.' },
  ]},
  { type: 'heading', text: 'Weekly Task Breakdown (Core Tasks Only)' },
  { type: 'comparison-table', headers: ['Week', 'Task', 'Output'], rows: [
    ['1-2', 'Subject + topic selection, Clastify research', 'Broad topic confirmed'],
    ['3-4', 'RQ drafts, supervisor meeting, RQ approval', 'Final approved RQ'],
    ['5', 'Set up your research document, break RQ into sub-questions', 'Research plan ready'],
    ['6-7', 'Full research — general search + Scholar', 'Research complete, all URLs saved'],
    ['8', 'Structure and section outline', 'Section-by-section essay plan'],
    ['9', 'Analytical approach selection, outline review', 'Confirmed approach for each section'],
    ['10-11', 'Write body sections (3-5 sections)', 'First draft body'],
    ['12', 'Write introduction and conclusion', 'Complete first draft'],
    ['13', 'Supervisor feedback, first revision', 'Revised draft'],
    ['14', 'Formatting, citations, bibliography check', 'Clean formatted draft'],
    ['15', 'Write RPPF reflections', 'RPPF complete'],
    ['16', 'Final pre-submission checklist and submission', 'Submitted EE'],
  ]},
  { type: 'tip-box', text: 'The most important single rule in this timeline: complete your research before you start writing. Students who start writing before finishing research always end up stopping to search for sources mid-essay. That kills momentum and produces incoherent essays.' },
  { type: 'heading', text: 'Common Timeline Mistakes' },
  { type: 'warning-box', text: 'Starting to write in week 3 because you feel ready: you\'re not. Your research isn\'t done yet. Changing your RQ after week 4: too late, you\'ll lose weeks of research. Skipping the outline and going straight to writing: your essay will be poorly structured. Leaving the RPPF until the night before: it will be shallow and obvious, costing you Criterion E marks.' },
  { type: 'heading', text: 'Buffer Time Is Not Optional' },
  { type: 'paragraph', text: 'Every timeline needs buffer weeks built in. You\'re an IB student managing 6 subjects, IAs, CAS, and college applications simultaneously. Things will take longer than expected. If you hit weeks 10-11 on schedule, use any extra time to go deeper on your analysis — not to start earlier on writing.' },
  { type: 'cta-box', label: 'Free tool', text: 'Track your sources as you research and generate your MLA bibliography automatically with the EE Dump.', href: '/dashboard/dump', buttonText: 'Try EE Dump free' },
  { type: 'key-takeaway', items: [
    'Reverse-engineer from your submission deadline — know your exact end date first',
    'The research phase should be fully complete before you write a single word',
    'RQ is locked after Phase 2 — supervisor approval required before moving forward',
    'RPPF should be written as you go, not retrospectively at the last minute',
    'Build in buffer weeks — you\'re managing 6 subjects simultaneously',
  ]},
]

const RELATED = [
  { href: '/guides/ee-dump-method', title: 'The EE Dump Research Method', description: 'How to use the research phase effectively.' },
  { href: '/guides/rppf-guide', title: 'RPPF Guide', description: 'How to write your reflections throughout the process.' },
]

const FAQ = [
  { question: 'What if I\'m already behind this timeline?', answer: 'Prioritise: complete your Dump immediately if you haven\'t, get your RQ approved, then write your outline before writing any prose. The research and planning phases are the ones you cannot rush — a poorly researched essay cannot be fixed in the final weeks.' },
  { question: 'How many supervisor meetings should I have?', answer: 'IB mandates at least 3 formal supervisor meetings. Use them strategically: first meeting for RQ approval, second meeting for first draft feedback, third meeting for final review. Your supervisor\'s comments at each stage are the most valuable feedback you\'ll get.' },
  { question: 'Can I submit my EE before the official deadline?', answer: 'Yes, and it\'s often advisable. Submitting a week early gives you a buffer if any technical issues arise. It also means you\'re not making final revisions under maximum pressure alongside other deadlines.' },
]

export default function EEPlanningTimeline() {
  return (
    <GuidePage
      title="IB Extended Essay Timeline and Planning Guide"
      description="The EE feels overwhelming as one task. Break it into 6 phases across 16 weeks. This reverse-engineered timeline shows exactly what to do each week — from topic selection to final submission."
      canonical="/guides/ee-planning-timeline"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
