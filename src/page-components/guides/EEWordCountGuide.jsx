'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Formatting is the most boring part of your EE — but it\'s also the easiest way to signal professionalism. Examiners see hundreds of essays. The properly formatted ones immediately say "this student is serious" before they\'ve read a word.' },
  { type: 'heading', text: 'The Non-Negotiable Formatting Rules' },
  { type: 'icon-card', icon: 'FileText', title: 'Font', text: 'Times New Roman, 12pt. No exceptions. The universal academic standard.' },
  { type: 'icon-card', icon: 'Layout', title: 'Spacing', text: 'Double-spaced throughout. Exceptions: block quotes and bibliography entries.' },
  { type: 'icon-card', icon: 'Clipboard', title: 'Margins', text: '2.54 cm (1 inch) on all sides. Usually the default — double-check.' },
  { type: 'icon-card', icon: 'BookOpen', title: 'Alignment', text: 'Left-aligned, not justified. Justified creates uneven word spacing.' },
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
  { type: 'heading', text: 'Title Page Requirements' },
  { type: 'numbered-steps', items: [
    'Title of your EE',
    'Research question',
    'Subject',
    'Word count',
    'Session (e.g., May 2026)',
  ]},
  { type: 'warning-box', text: 'Do NOT include: your name, school name, or any identifying information. IB requires anonymous marking. No borders, colours, images, or decorative elements.' },
  { type: 'heading', text: 'The 15-Minute Formatting Checklist' },
  { type: 'numbered-steps', items: [
    'Font and spacing are correct throughout',
    'Page numbers are in place (starting from first content page)',
    'Title page has all required elements and no personal info',
    'Table of contents matches actual page numbers',
    'Headings are consistent in style and hierarchy',
    'Citations are consistent throughout',
    'Bibliography is complete and alphabetically ordered',
    'Word count is under 4,000',
    'One final spell-check and proofread',
  ]},
  { type: 'cta-box', label: 'Free tool', text: 'Track your sources as you research and generate your MLA bibliography automatically with the EE Dump.', href: '/dashboard/dump', buttonText: 'Try EE Dump free' },
  { type: 'key-takeaway', items: [
    '4,000 words is a hard limit — don\'t exceed it',
    'Times New Roman 12pt, double-spaced, left-aligned, 1-inch margins',
    'Spend 35% of words on analysis, 15% on intro + conclusion',
    'Run the 15-minute checklist before submission',
  ]},
]

const RELATED = [
  { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'Map your sections to criteria.' },
  { href: '/guides/ee-criteria-breakdown', title: 'Criteria Breakdown', description: 'Criterion D rewards proper formatting.' },
]

export default function EEWordCountGuide() {
  return (
    <GuidePage
      title="Extended Essay Word Count & Formatting Rules"
      description="Everything you need to know about EE formatting: word count limits, what's included, font requirements, title page rules, and the 15-minute checklist."
      canonical="/guides/ee-word-count"
      content={CONTENT}
      relatedGuides={RELATED}
    />
  )
}
