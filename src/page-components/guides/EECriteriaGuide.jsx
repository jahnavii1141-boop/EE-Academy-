'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Your Extended Essay is marked across five criteria totalling 34 marks. Understanding exactly what each criterion rewards — and how to target it — is the difference between hoping for an A and engineering one.' },
  { type: 'heading', text: 'The Five Criteria at a Glance' },
  { type: 'criteria', items: [
    { label: 'Criterion A — Knowledge & Understanding', marks: '6 marks', text: 'Demonstrate genuine depth of understanding of your topic, RQ, terminology, and research methods.' },
    { label: 'Criterion B — Application & Analysis', marks: '6 marks', text: 'Apply research methods and present findings. Show tools working on your specific topic.' },
    { label: 'Criterion C — Synthesis & Evaluation', marks: '6 marks', text: 'Synthesise findings, maintain a clear argument, evaluate significance and limitations.' },
    { label: 'Criterion D — Communication', marks: '4 marks', text: 'Structure, formatting, citations, academic tone. The easiest marks — entirely within your control.' },
    { label: 'Criterion E — Engagement (RPPF)', marks: '6 marks', text: 'Show genuine engagement through your three RPPF reflections.' },
  ]},
  { type: 'heading', text: 'Grade Boundaries' },
  { type: 'comparison-table', headers: ['Grade', 'Mark Range', 'Percentage'], rows: [
    ['A', '27–34', '79–100%'],
    ['B', '22–26', '65–76%'],
    ['C', '14–21', '41–62%'],
    ['D', '7–13', '21–38%'],
    ['E', '0–6', '0–18%'],
  ]},
  { type: 'stat-highlight', stat: '27/34', label: 'You need 79% for an A — very achievable' },
  { type: 'heading', text: 'How to Target Each Criterion' },
  { type: 'step-process', steps: [
    { title: 'Criterion A: Introduction + Lit Review', text: 'Show deep understanding of your topic, not surface-level knowledge. Use specific terminology correctly.' },
    { title: 'Criterion B: Methodology + Analysis', text: 'Explain WHY you chose each tool, then APPLY it with real data and evidence.' },
    { title: 'Criterion C: Discussion + Conclusion', text: 'Evaluate findings honestly. Acknowledge limitations. Connect back to your literature review.' },
    { title: 'Criterion D: Throughout', text: 'Academic tone, proper formatting, consistent citations, logical structure. Run the 15-minute checklist.' },
    { title: 'Criterion E: RPPF', text: 'Three reflections showing challenge → attempt → learning → growth.' },
  ]},
  { type: 'tip-box', text: 'After writing each section, ask: "Which criterion am I targeting, and would an examiner see it clearly?" If the answer isn\'t obvious, rewrite until it is.' },
  { type: 'cta-box', label: 'Free tool', text: 'Track your sources as you research and generate your MLA bibliography automatically with the EE Dump.', href: '/dashboard/dump', buttonText: 'Try EE Dump free' },
  { type: 'key-takeaway', items: [
    'Total: 34 marks across 5 criteria (27+ for an A)',
    'Criterion D (4 marks) is the easiest — pure formatting and structure',
    'Criterion E (6 marks) is the easiest high-value criterion — RPPF reflections',
    'Map every section to criteria before you write',
  ]},
]

const RELATED = [
  { href: '/guides/how-to-get-an-a-in-extended-essay', title: 'How to Get an A in the Extended Essay', description: 'Turn criteria knowledge into an A-grade execution plan.' },
  { href: '/guides/rppf-guide', title: 'Complete RPPF Guide', description: 'Earn all 6 marks on Criterion E.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'Map your structure to criteria.' },
]

export default function EECriteriaGuide() {
  return (
    <GuidePage
      title="IB Extended Essay Criteria Explained"
      description="Understand all five EE assessment criteria, grade boundaries, and exactly how to target each one. From a student who scored 32/34."
      canonical="/guides/ee-criteria-breakdown"
      content={CONTENT}
      relatedGuides={RELATED}
    />
  )
}
