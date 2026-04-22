'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: 'Citations are not optional in an Extended Essay — they are how you demonstrate academic integrity and the depth of your research. A strong bibliography with properly formatted citations signals to examiners that you\'ve done real research. A weak or inconsistent bibliography suggests you threw it together at the last minute.' },
  { type: 'heading', text: 'MLA vs Footnotes: Which to Use' },
  { type: 'paragraph', text: 'The IB accepts both MLA parenthetical citations and footnote-style citations (Chicago). Pick one and use it consistently throughout your entire essay. Never mix them.' },
  { type: 'comparison-table', headers: ['MLA (Parenthetical)', 'Footnotes (Chicago)'], rows: [
    ['Citation appears in brackets after the quote: (Smith 45)', 'Superscript number after sentence, full citation at bottom of page'],
    ['Common in humanities, social sciences', 'Common in Business, History, Economics'],
    ['Clean and readable in text', 'Keeps the essay text uncluttered'],
    ['Works Cited page at the end', 'Bibliography at the end'],
  ]},
  { type: 'tip-box', text: 'MLA works well for most subjects. If you\'re writing a Business Management or History EE with many sources per page, footnotes often look cleaner because they keep the body text free of bracketed citations.' },
  { type: 'heading', text: 'MLA In-Text Citations' },
  { type: 'paragraph', text: 'MLA uses the author\'s last name and page number in brackets, placed after the closing quotation mark but before the period.' },
  { type: 'before-after',
    before: { label: 'Wrong placement', text: '"Competition drives innovation." (Porter 45)' },
    after: { label: 'Correct placement', text: '"Competition drives innovation" (Porter 45).' },
  },
  { type: 'paragraph', text: 'Other common scenarios:' },
  { type: 'numbered-steps', items: [
    'No page numbers (website): use author\'s name only — (Shastri)',
    'No author: use shortened title — ("Fashion Retail Trends")',
    'Paraphrase: same format — the model suggests competition drives innovation (Porter 45)',
    'Two authors: (Smith and Jones 32)',
    'Three or more authors: (Smith et al. 45)',
  ]},
  { type: 'heading', text: 'Block Quotes' },
  { type: 'paragraph', text: 'If quoting more than 4 lines of text, use a block quote:' },
  { type: 'numbered-steps', items: [
    'Start on a new line',
    'Indent the entire quote 1.27cm from the left margin',
    'Do NOT use quotation marks (the indentation signals it\'s a quote)',
    'Single-space the block quote',
    'Place the citation after the final period: (Porter 45).',
  ]},
  { type: 'warning-box', text: 'Minimise block quotes. They eat word count and examiners want YOUR analysis, not long chunks of someone else\'s text. Paraphrase where possible and cite the source.' },
  { type: 'heading', text: 'MLA Works Cited Format' },
  { type: 'paragraph', text: 'Your Works Cited page goes at the end on a new page, alphabetically by author\'s last name, with a hanging indent (first line flush left, subsequent lines indented 1.27cm).' },
  { type: 'comparison-table', headers: ['Source Type', 'MLA Format'], rows: [
    ['Book', 'Surname, First Name. Title of Book. Publisher, Year.'],
    ['Journal Article', 'Surname, First Name. "Title of Article." Journal Name, vol. X, no. X, Year, pp. XX–XX.'],
    ['Website', 'Surname, First Name. "Title of Page." Website Name, Day Month Year, URL.'],
    ['Annual Report', 'Company Name. Title of Report. Year. URL.'],
    ['No author (website)', '"Title of Page." Website Name, Day Month Year, URL.'],
  ]},
  { type: 'heading', text: 'Academic Integrity Rules' },
  { type: 'icon-card', icon: 'AlertCircle', title: 'What Counts as Misconduct', text: 'Copying essays or sections from essay banks like Clastify, having AI write your essay or significant portions, paraphrasing so closely it\'s the same text without quotes, fabricating data or citations.' },
  { type: 'icon-card', icon: 'CheckCircle', title: 'Cite Everything', text: 'If an idea, fact, statistic, or argument came from anywhere other than your own head, cite it. Over-citing is always better than under-citing.' },
  { type: 'icon-card', icon: 'Brain', title: 'Paraphrase Properly', text: 'Paraphrasing means reading the source, understanding the idea, closing it, and rewriting in your own words. Then cite. If you can\'t put it in your own words, you don\'t understand it well enough to use it.' },
  { type: 'tip-box', text: 'Pro tip: Use a citation generator like EasyBib or Scribbr\'s MLA generator to format citations, then double-check them manually. Generators save time but aren\'t perfect. This is also why the EE Dump method (keeping URLs as you research) is so valuable — you\'ll always have your sources ready.' },
  { type: 'heading', text: 'Bibliography Source Quality' },
  { type: 'paragraph', text: 'Examiners scan your bibliography. They notice when a Prezi presentation sits next to a peer-reviewed journal article. Before submission, do a quick quality check: for every weaker source, ask "could I find the same information from a more credible source?" If yes, swap it. This takes 20 minutes and makes your bibliography look airtight.' },
  { type: 'key-takeaway', items: [
    'Pick MLA or footnotes — never mix them',
    'In-text citation goes after closing quote mark, before period',
    'Works Cited: alphabetical, hanging indent, every cited source included',
    'Minimise block quotes — paraphrase and cite instead',
    'Quality-check your bibliography before submission — swap weak sources',
  ]},
]

const RELATED = [
  { href: '/guides/ee-formatting-guide', title: 'Full EE Formatting Guide', description: 'Font, spacing, headings, and the pre-submission checklist.' },
  { href: '/guides/ee-dump-method', title: 'The EE Dump Research Method', description: 'How to track all your source URLs as you research.' },
]

const FAQ = [
  { question: 'Do I need to cite everything in my EE?', answer: 'Every fact, statistic, argument, and idea that came from a source must be cited. Common knowledge (e.g., "ZARA is a fashion brand") doesn\'t need a citation. When in doubt, cite.' },
  { question: 'What if I can\'t find the author\'s name on a website?', answer: 'Use the shortened title of the page in your in-text citation and as the first element of your Works Cited entry. Never fabricate an author name.' },
  { question: 'Can I cite my supervisor or a teacher?', answer: 'Supervisors and teachers cannot be cited as sources. Your essay must rely on independently verifiable academic and credible sources.' },
]

export default function EECitationsMLA() {
  return (
    <GuidePage
      title="IB Extended Essay Citations and MLA Formatting Guide"
      description="Learn exactly how to format in-text citations, block quotes, and your Works Cited page using MLA style for your IB Extended Essay — with rules for academic integrity."
      canonical="/guides/ee-citations-mla"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
    />
  )
}
