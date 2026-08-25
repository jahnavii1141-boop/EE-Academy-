'use client'

import GuidePage from '../../components/GuidePage'

const CONTENT = [
  { type: 'paragraph', text: `Formatting is the most boring part of your EE and also one of the easiest ways to pick up marks. Examiners read hundreds of essays. A properly formatted essay signals "this student is serious" before they've read a single word. It's free marks. Don't leave them on the table.` },

  { type: 'heading', text: `The Non-Negotiable Formatting Rules` },
  { type: 'icon-card', title: `Font`, text: `Times New Roman 12pt. It reads as formal and academic. There isn't a font recommended by the IB in the new guide, since the IB recommends an MLA format. The easiest, most straightforward is Times New Roman. (My favourite is EB Garamond — reads just as formal with a little unique touch differentiating it from Times New Roman.)` },
  { type: 'icon-card', title: `Spacing`, text: `1.5 spacing throughout. Introduction, body, conclusion — everything 1.5 spaced. The only exceptions are block quotes and bibliography entries (single-spaced within each entry, double space between).` },
  { type: 'icon-card', title: `Margins`, text: `2.54cm (1 inch) all sides. This is the default in most word processors. Check it before you submit.` },
  { type: 'icon-card', title: `Page Numbers`, text: `Top right, starting from your first page of content (not the title page). In MLA style, your last name appears before the number: "Surname 1, Surname 2."` },
  { type: 'icon-card', title: `Alignment`, text: `Left-aligned is recommended, since justified text almost always leaves uneven spacing, leading to awkward sentence structures and space blocks — especially when charts and images are placed into the document.` },
  { type: 'icon-card', title: `Paragraph Indentation`, text: `1.27cm. First line of every new paragraph indented using Tab.` },
  { type: 'paragraph', text: `For example: "Once upon a time there were 5 goats in the city of Mallorca that were friends. They grew up on the same farm."` },

  { type: 'heading', text: `Title Page` },
  { type: 'paragraph', text: `Keep it clean and professional. Think academic journal, not school poster.` },
  { type: 'comparison-table', headers: [`Must Include`, `Must NOT Include`], rows: [
    [`Title of your EE`, `Your name (anonymous marking)`],
    [`Your research question`, `Your school name`],
    [`The subject you're writing in`, `Your supervisor's name`],
    [`Word count`, `Borders, colours, or images`],
    [`Session (e.g., May 2026)`, `Decorative elements`],
    [`Your candidate number / student ID`, `A cover image or logo`],
  ] },

  { type: 'heading', text: `Bold, Italics, Underline` },
  { type: 'icon-card', title: `Bold`, text: `Use for key terms when you first introduce and define them. For example, the first time you mention "Porter's Five Forces" in your analysis, bold it. After that, leave it normal. For citations — using bold can make it easier for examiners to see the work you have cited.` },
  { type: 'icon-card', title: `Italics`, text: `Use for titles of books, journals, and major works (e.g., The People's Choice). Foreign words or phrases. Technical terms on first introduction.` },
  { type: 'icon-card', title: `Underline`, text: `Underlining is outdated according to the 9th edition of the MLA format.` },
  { type: 'tip-box', text: `The golden rule: less is more. A clean, minimally formatted essay looks more professional than one drowning in bold and italics. When in doubt, leave it plain.` },
  { type: 'paragraph', text: `PS — from 2027 onwards, the importance given to formatting is lower, as it's shifted from its own separate criterion to a part of Criterion A.` },
  { type: 'paragraph', text: `Don't stress about formatting. Cleanliness and legibility are all that matter. Focus more on your content.` },

  { type: 'heading', text: `Headings and Subheadings` },
  { type: 'paragraph', text: `A recommended heading and subheading format (not compulsory):` },
  { type: 'numbered-steps', items: [
    `Section headings (H1): Bold, 14pt, space above and below. These are your main sections — Introduction, Literature Review, Methodology, etc.`,
    `Subheadings (H2): Bold, 12pt (same as body text). Break sections into logical parts.`,
    `Sub-subheadings (H3): Bold and italic, 12pt.`,
  ] },

  { type: 'heading', text: `Figures, Tables, and Charts` },
  { type: 'numbered-steps', items: [
    `Label everything: Fig 1, Fig 2 for figures. Table 1, Table 2 for tables. For example: Fig 1 — The relationship between social media marketing and elections.`,
    `Reference them in your text before they appear: "As shown in Figure 3..."`,
    `Keep them relevant: every visual must support a specific analytical point. The IB specifically states the file should be less than 10MB. While your coordinators may check this during check-ups, it's important to make sure every picture or graph serves a purpose, as they add significant storage.`,
    `Source your visuals: "Figure 3: Author's calculations based on Inditex 2023 Annual Report."`,
  ] },

  { type: 'heading', text: `Citations in Your Extended Essay` },
  { type: 'paragraph', text: `The IB recommends citations in the MLA format.` },
  { type: 'quote-highlight', text: `MLA 9th edition uses brief parenthetical in-text citations and a complete list of sources in a "Works Cited" page at the end of a paper. It is widely used in language, literature, and the humanities.` },
  { type: 'subheading', text: `But what's the point of citations?` },
  { type: 'paragraph', text: `For example: I'm researching why someone stole my pizza from the fridge.` },
  { type: 'paragraph', text: `In the past, many pizzas have been stolen from many fridges. In fact, when I searched on Google I found a guy who worked out how his pizza got stolen. He stated something like "every time a slice gets stolen, someone in your vicinity is going to be unusually happy and have a carb crash."` },
  { type: 'paragraph', text: `When I applied that to my scenario, there was one person who fit that description — my dad. But when I write my research paper I can't just say "I saw my dad be unusually happy and have a carb crash, therefore he stole my slice." I need to cite that initial research paper to prove my point, since I'm using it as the basis to make a point about my pizza.` },
  { type: 'paragraph', text: `That's essentially what citing does. It gives credit where credit's due, and it helps readers understand how you've come to a particular conclusion so they can check out that source.` },
  { type: 'paragraph', text: `Citations are born from one fundamental fact: research is built on past research, which is built on past research.` },
  { type: 'paragraph', text: `It never ends. So you must cite.` },
  { type: 'paragraph', text: `The IB suggests the cite-as-you-go technique. When you cite as you go, you don't have to rush at the last minute to get your footnotes or bibliography together.` },
  { type: 'cta-box', text: `This tool is called the EE Dump — a mixture of a method I created to organise research.`, href: `/course/module-5`, buttonText: `Read more` },
  { type: 'paragraph', text: `Now that you've done your basic research and it's perfectly organised, you can head into the bibliography section, where everything is auto-cited. No rushing at the last minute.` },
  { type: 'cta-box', text: `The tool is here:`, href: `/dump`, buttonText: `Open the EE Dump` },
  { type: 'video', youtubeId: `LAoHyV6opB0`, title: `How the EE Dump works` },

  { type: 'heading', text: `The 15-Minute Pre-Submission Checklist` },
  { type: 'list', items: [
    `Times New Roman (for MLA) or EB Garamond (personal favourite), 12pt throughout`,
    `1.5 line spacing throughout (IB recommended)`,
    `1-inch margins all sides (MLA format)`,
    `Page numbers top right (starting from first content page)`,
    `Title page: title (optional), RQ, subject, word count, session, candidate number — but no name or school`,
    `Under 10MB`,
    `Table of contents with correct page numbers`,
    `Headings consistent in style and hierarchy`,
    `All figures and tables labelled and referenced in text`,
    `Citations consistent (all MLA or all footnotes — never mixed)`,
    `Bibliography alphabetical with hanging indents`,
    `Word count under 4,000 (introduction + body + conclusion only)`,
  ] },
  { type: 'paragraph', text: `One 15-minute formatting check before submission is the easiest marks you'll ever protect.` },
  { type: 'paragraph', text: `PS — from 2027 onwards, while the importance of format is lowered, a poorly formatted EE that doesn't help the examiner read the essay can still cost you. It doesn't have to be perfect. It just has to meet the basics.` },

  { type: 'paragraph', text: `Found this useful but still unsure about organisation, the assessment criteria, or what the IB actually wants from you?` },
  { type: 'cta-box', text: `Use our IB Pathway Finder (built around the IB framework) to ask yourself the right questions —`, href: `/dashboard/tools`, buttonText: `start here` },

  { type: 'paragraph', text: `Once you've done that, let's build your schedule.` },
  // EE calendar embedded from its public static tool. (Making the lessons shown
  // inside the calendar clickable/linked to the actual lessons is a separate task
  // on /tools/study-calendar.html.)
  { type: 'embed', src: `/tools/study-calendar.html`, title: `EE calendar`, height: 680 },

  // Closing CTAs — plain-text links (no buttons, no boxes).
  { type: 'cta-box', text: `Access the #1 space for all your EE concerns —`, href: `/pricing`, buttonText: `$89` },
  { type: 'paragraph', text: `Early-bird pricing: 50 spots each month at $89. Once this month's are gone, the price goes up until the next round — so grab your spot while it's open.` },
  { type: 'cta-box', text: `Not ready yet? Sign in, set up your dashboard, and use the free tools and lessons —`, href: `/dashboard/home`, buttonText: `start free` },

  // Little clickable lesson cards — one per course lesson.
  { type: 'lesson-cards' },
]

const RELATED = [
  { href: '/guides/ee-citations-mla', title: 'EE Citations and MLA Formatting', description: 'The complete guide to in-text citations and bibliography.' },
  { href: '/guides/extended-essay-structure', title: 'EE Structure Template', description: 'How to organise your sections from Introduction to Conclusion.' },
]

const FAQ = [
  { question: 'Does the IB require a specific font?', answer: `No — the IB doesn't mandate a specific font. It recommends 12pt (as part of MLA formatting) and leaves the typeface up to you, as long as it reads formally. Times New Roman is the safe, standard choice — it's the usual MLA font — but something like EB Garamond works just as well. Whatever you pick, keep it 12pt and consistent, and check whether your school has its own requirement.` },
  { question: 'Do the title page and bibliography count toward the 4,000-word limit?', answer: 'No. The word count includes only the introduction, body, and conclusion. The title page, table of contents, bibliography, and appendices are excluded.' },
  { question: 'Should I use MLA or APA citation style?', answer: 'The IB accepts both. MLA is generally recommended for humanities and social science EEs. APA is common in sciences and psychology. Pick one and use it consistently — never mix styles.' },
]

export default function EEFormattingGuide() {
  return (
    <GuidePage
      title="IB Extended Essay Formatting Guide (Font, Spacing, Structure)"
      description="Formatting is free marks. Learn the non-negotiable IB Extended Essay formatting rules: font, spacing, margins, title page, headings, citations, and the 15-minute pre-submission checklist."
      canonical="/guides/ee-formatting-guide"
      content={CONTENT}
      relatedGuides={RELATED}
      faqItems={FAQ}
      hideDefaultCta
    />
  )
}
