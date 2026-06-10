'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Formatting is the most boring part of your EE and also one of the easiest ways to pick up marks. Examiners read hundreds of essays. A properly formatted essay signals "this student is serious" before they\'ve read a single word. It\'s free marks. Don\'t leave them on the table.' },
  { type: 'heading', text: 'The Non-Negotiable Formatting Rules' },
  { type: 'icon-card', icon: 'FileText', title: 'Font: Times New Roman 12pt', text: 'No exceptions. Don\'t get creative. Times New Roman is the universal academic standard. Cambria, Calibri, Arial — leave them alone.' },
  { type: 'icon-card', icon: 'AlignLeft', title: 'Spacing: Double-Spaced Throughout', text: 'Introduction, body, conclusion — everything double-spaced. The only exceptions are block quotes (single-spaced) and bibliography entries (single-spaced within each entry, double space between).' },
  { type: 'icon-card', icon: 'Layout', title: 'Margins: 2.54cm (1 inch) All Sides', text: 'This is the default in most word processors. Check it before you submit.' },
  { type: 'icon-card', icon: 'Hash', title: 'Page Numbers: Top Right', text: 'Starting from your first page of content (not the title page). In MLA style, your last name appears before the number: "Surname 1, Surname 2."' },
  { type: 'icon-card', icon: 'AlignLeft', title: 'Alignment: Left-Aligned', text: 'Not justified. Justified text creates uneven word spacing that looks messy. Left-aligned is cleaner and is the academic standard.' },
  { type: 'icon-card', icon: 'PenLine', title: 'Paragraph Indentation: 1.27cm', text: 'First line of every new paragraph indented using Tab — not the spacebar. Small detail. Examiners notice.' },
  { type: 'heading', text: 'Title Page' },
  { type: 'paragraph', text: 'Keep it clean and professional. Think academic journal, not school poster.' },
  { type: 'comparison-table', headers: ['Must Include', 'Must NOT Include'], rows: [
    ['Title of your EE', 'Your name (anonymous marking)'],
    ['Your research question', 'Your school name'],
    ['The subject you\'re writing in', 'Borders, colours, or images'],
    ['Word count', 'Decorative elements'],
    ['Session (e.g., May 2026)', 'Your candidate number (goes elsewhere)'],
  ]},
  { type: 'heading', text: 'Bold, Italics, Underline — The Rules' },
  { type: 'step-process', steps: [
    { title: 'Bold', text: 'Use for key terms when you first introduce and define them. For example, the first time you mention "Porter\'s Five Forces" in your analysis, bold it. After that, leave it normal. If everything is bold, nothing is bold.' },
    { title: 'Italics', text: 'Use for: titles of books, journals, and major works (e.g., The People\'s Choice). Foreign words or phrases. Technical terms on first introduction.' },
    { title: 'Underline', text: 'Don\'t underline anything. Underlining is outdated in academic writing. If you need emphasis, use bold or italics.' },
  ]},
  { type: 'tip-box', text: 'The golden rule: less is more. A clean, minimally formatted essay looks more professional than one drowning in bold and italics. When in doubt, leave it plain.' },
  { type: 'heading', text: 'Headings and Subheadings' },
  { type: 'paragraph', text: 'Your headings create a visual hierarchy. Use it consistently:' },
  { type: 'numbered-steps', items: [
    'Section headings (H1): Bold, 14pt, space above and below. These are your main sections — Introduction, Literature Review, Methodology, etc.',
    'Subheadings (H2): Bold, 12pt (same as body text). Break sections into logical parts.',
    'Sub-subheadings (H3): Bold and italic, 12pt. Use these sparingly — going three levels deep should be rare.',
  ]},
  { type: 'heading', text: 'Figures, Tables, and Charts' },
  { type: 'numbered-steps', items: [
    'Label everything: Fig 1, Fig 2 for figures. Table 1, Table 2 for tables.',
    'Reference them in your text before they appear: "As shown in Figure 3..."',
    'Keep them relevant: every visual must support a specific analytical point.',
    'Source your visuals: "Figure 3: Author\'s calculations based on Inditex 2023 Annual Report."',
  ]},
  { type: 'heading', text: 'The 15-Minute Pre-Submission Checklist' },
  { type: 'cta-box', label: 'Free tool', text: 'Track your sources as you research and generate your MLA bibliography automatically with the EE Dump.', href: '/dashboard/dump', buttonText: 'Try EE Dump free' },
  { type: 'key-takeaway', items: [
    'Times New Roman, 12pt throughout',
    'Double-spaced throughout',
    '1-inch margins all sides',
    'Page numbers top right (starting from first content page)',
    'Title page: title, RQ, subject, word count, session — NO personal info',
    'Table of contents with correct page numbers',
    'Headings consistent in style and hierarchy',
    'All figures and tables labelled and referenced in text',
    'Citations consistent (all MLA or all footnotes — never mixed)',
    'Bibliography alphabetical with hanging indents',
    'Word count under 4,000 (introduction + body + conclusion only)',
  ]},
  { type: 'warning-box', text: 'Your content could be excellent but poor formatting tells the examiner you rushed. One 15-minute formatting check before submission is the easiest marks you\'ll ever protect. Don\'t skip it.' },
]

const RELATED = [
  { href: '/guides/ee-citations-mla', title: 'EE Citations and MLA Formatting', description: 'The complete guide to in-text citations and bibliography.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'How to organise your sections from Introduction to Conclusion.' },
]

const FAQ = [
  { question: 'Does the IB require a specific font?', answer: 'The IB recommends a standard academic font. Times New Roman 12pt is universally accepted and signals professionalism. Some schools may have their own requirements — check with your supervisor.' },
  { question: 'Do the title page and bibliography count toward the 4,000-word limit?', answer: 'No. The word count includes only the introduction, body, and conclusion. The title page, table of contents, bibliography, and appendices are excluded.' },
  { question: 'Should I use MLA or APA citation style?', answer: 'The IB accepts both. MLA is generally recommended for humanities and social science EEs. APA is common in sciences and psychology. Pick one and use it consistently — never mix styles.' },
]

export default function EEFormattingGuide() {
  return (
    <GuidePage
      title="IB Extended Essay Formatting Guide (Font, Spacing, Structure)"
      description="Formatting is free marks. Learn the non-negotiable IB Extended Essay formatting rules: font, spacing, margins, title page, headings, and the 15-minute pre-submission checklist."
      canonical="/guides/ee-formatting-guide"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
