'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'The Extended Essay has a hard 4,000-word limit, and examiners stop reading when they reach it. Just as important is knowing what actually counts toward those words and what sits outside them — so you don\'t burn word count on the wrong things or get caught out near the deadline.' },
  { type: 'heading', text: 'Word Count: What Counts and What Doesn\'t' },
  { type: 'comparison-table', headers: ['Included in Word Count', 'NOT Included'], rows: [
    ['All body text', 'Title page'],
    ['In-text citations', 'Table of contents'],
    ['Headings and subheadings', 'Maps, charts, and tables'],
    ['Footnotes (if containing arguments)', 'Bibliography/Works Cited'],
    ['Block quotes', 'Appendices'],
  ]},
  { type: 'stat-highlight', stat: '4,000', label: 'Maximum word count — this is a hard limit' },
  { type: 'warning-box', text: 'Going over 4,000 words is an automatic problem. Examiners may stop reading at the 4,000-word mark. Any content after that may not be assessed.' },
  { type: 'heading', text: 'Recommended Word Distribution' },
  { type: 'comparison-table', headers: ['Section', 'Word Count', 'Percentage'], rows: [
    ['Introduction', '400–600', '10–15%'],
    ['Literature Review', '600–800', '15–20%'],
    ['Methodology', '400–500', '10–12%'],
    ['Analysis', '1200–1500', '30–38%'],
    ['Discussion', '500–700', '12–18%'],
    ['Conclusion', '300–400', '8–10%'],
  ]},
  { type: 'paragraph', text: 'These are guidelines, not rules — the balance shifts by subject. But if your analysis is under roughly a third of the essay, that is usually a sign you are describing more than you are arguing.' },
  { type: 'cta-box', text: 'Formatting — font, spacing, margins, the title page, and the pre-submission checklist — is covered in its own guide.', href: '/guides/ee-formatting-guide', buttonText: 'Read the EE Formatting Guide' },
  { type: 'cta-box', label: 'Free tool', text: 'Track your sources as you research and generate your MLA bibliography automatically with the EE Dump.', href: '/dashboard/dump', buttonText: 'Try EE Dump free' },
  { type: 'key-takeaway', items: [
    '4,000 words is a hard limit — don\'t exceed it',
    'Body text, citations, headings and footnotes count; the title page, contents, tables, bibliography and appendices don\'t',
    'Spend roughly 35% of your words on analysis, ~15% on intro + conclusion',
  ]},
]

const RELATED = [
  { href: '/guides/ee-formatting-guide', title: 'EE Formatting Guide', description: 'Font, spacing, margins, and title page rules.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'Map your sections to the criteria.' },
]

export default function EEWordCountGuide() {
  return (
    <GuidePage
      title="IB Extended Essay Word Count"
      description="The 4,000-word EE limit: what counts, what doesn't, and how to balance your sections."
      canonical="/guides/ee-word-count"
      content={CONTENT}
      relatedGuides={RELATED}
    />
  )
}
