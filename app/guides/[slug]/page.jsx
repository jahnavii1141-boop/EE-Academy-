import { notFound } from 'next/navigation'

// Guide slug → metadata
const GUIDE_META = {
  'extended-essay-introduction': {
    title: 'How to Write an Extended Essay Introduction',
    description: 'A weak EE introduction loses marks before your argument begins. The 4-part structure, hook formula, and research question framing that examiners reward.',
    Component: () => import('../../../src/page-components/guides/EEIntroductionGuide'),
  },
  'extended-essay-structure': {
    title: 'IB Extended Essay Structure: Section-by-Section Template',
    description: 'A clear EE structure is the difference between a C and an A. Section-by-section template, word count guidance, and how to map each part to the markscheme.',
    Component: () => import('../../../src/page-components/guides/EEStructureGuide'),
  },
  'research-question-examples': {
    title: 'Extended Essay Research Question Examples',
    description: '50+ Extended Essay research question examples across 8 IB subjects — with before/after comparisons and a 5-point stress test to validate your RQ.',
    Component: () => import('../../../src/page-components/guides/ResearchQuestionExamples'),
  },
  'rppf-guide': {
    title: 'IB Extended Essay RPPF: Score All 6 Criterion E Marks',
    description: 'Criterion E is 6 marks — the easiest in the IB. The three-reflection structure, the examiner formula, and sample openings that earn full marks on the RPPF.',
    Component: () => import('../../../src/page-components/guides/RPPFGuide'),
  },
  'extended-essay-tips': {
    title: 'IB Extended Essay Tips That Actually Improve Your Grade',
    description: '20 IB Extended Essay tips targeting the most common mark-loss areas — structure, analysis depth, RPPF reflections, citations, and examiner expectations.',
    Component: () => import('../../../src/page-components/guides/EETipsGuide'),
  },
  'ee-criteria-breakdown': {
    title: 'IB Extended Essay Criteria — How Each Mark Is Awarded',
    description: 'IB Extended Essay criteria A–E explained: mark allocations, what examiners actually reward, and the mistakes that cost students the most marks.',
    Component: () => import('../../../src/page-components/guides/EECriteriaGuide'),
  },
  'ee-subjects-guide': {
    title: 'Best IB Extended Essay Subjects: How to Choose the Right One',
    description: 'Choosing the wrong EE subject is the most expensive mistake you can make. Subject-by-subject breakdown of difficulty, scoring potential, and what actually works.',
    Component: () => import('../../../src/page-components/guides/EESubjectsGuide'),
  },
  'ee-word-count': {
    title: 'IB Extended Essay Word Count: Rules & Section Balance',
    description: '4,000 words — not a word over. What counts toward the limit, section balance guide, and the silent word count mistakes that quietly weaken your grade.',
    Component: () => import('../../../src/page-components/guides/EEWordCountGuide'),
  },
  'ee-conclusion': {
    title: 'How to Write an Extended Essay Conclusion',
    description: 'Most EE conclusions fail by restating the intro or adding new ideas. The 3-part closing structure that answers your RQ and ends with authority.',
    Component: () => import('../../../src/page-components/guides/EEConclusionGuide'),
  },
  'ee-research-methods': {
    title: 'IB Extended Essay Research Methods: Choose, Apply & Justify',
    description: 'Your methodology must match your research question — or examiners dock marks immediately. How to choose, apply, and justify EE research methods correctly.',
    Component: () => import('../../../src/page-components/guides/EEResearchMethodsGuide'),
  },
  'how-to-get-an-a-in-extended-essay': {
    title: 'How to Get an A in the Extended Essay (Step-by-Step)',
    description: 'Getting an A in the IB Extended Essay is a system, not luck. The 7-step approach — from RQ to RPPF — used by students who score in the top band.',
    Component: () => import('../../../src/page-components/guides/GetAExtendedEssayGuide'),
  },
  // New guides — from course content
  'ee-dump-method': {
    title: 'The EE Dump Method: How to Research Your Extended Essay',
    description: 'The EE Dump Method gives you a complete research system: build your source base first, then write with confidence. Used to score 32/34.',
    Component: () => import('../../../src/page-components/guides/EEDumpMethod'),
  },
  'how-to-use-google-scholar-ee': {
    title: 'How to Use Google Scholar for Your IB Extended Essay',
    description: 'Most students never make the Scholar Shift. Learn the step-by-step method to find peer-reviewed sources and build an A-grade bibliography.',
    Component: () => import('../../../src/page-components/guides/EEGoogleScholar'),
  },
  'ee-literature-review': {
    title: 'How to Write an Extended Essay Literature Review',
    description: 'The literature review is not a source summary. Learn what it actually does, how to structure it, and how to demonstrate Criterion A knowledge.',
    Component: () => import('../../../src/page-components/guides/EELiteratureReview'),
  },
  'ee-formatting-guide': {
    title: 'IB Extended Essay Format: Font, Margins, Headings & Spacing',
    description: 'Formatting is free marks. The non-negotiable rules: font, spacing, margins, title page, headings, and the 15-minute pre-submission checklist.',
    Component: () => import('../../../src/page-components/guides/EEFormattingGuide'),
  },
  'ee-citations-mla': {
    title: 'MLA Citations for IB Extended Essay: In-Text & Works Cited',
    description: 'MLA citations done wrong can trigger an academic integrity flag. In-text citations, block quotes, Works Cited structure, and what IB considers misconduct.',
    Component: () => import('../../../src/page-components/guides/EECitationsMLA'),
  },
  'ee-ai-guide': {
    title: 'How to Use AI for Your IB Extended Essay',
    description: 'The exact prompts for stress-testing your RQ, critiquing your draft, and improving your structure — without crossing the academic integrity line.',
    Component: () => import('../../../src/page-components/guides/EEAIGuide'),
  },
  'ee-mindset': {
    title: 'The IB Extended Essay Mindset Shift: From C to A',
    description: 'The biggest reason students underperform isn\'t intelligence — it\'s the wrong mental model. The mindset shift that separates C from A.',
    Component: () => import('../../../src/page-components/guides/EEMindset'),
  },
  'ee-business-management': {
    title: 'IB Extended Essay Business Management: Frameworks & A-Grade RQ',
    description: 'The framework stack, RQ structure, data sources, and the original finding principle behind a 32/34 Business Management EE.',
    Component: () => import('../../../src/page-components/guides/EEBusinessManagement'),
  },
  'ee-economics': {
    title: 'IB Extended Essay Economics: Frameworks & A-Grade Structure',
    description: 'Economics EEs reward rigorous theory + real data. The sub-RQ method, key frameworks, best data sources, and A-band analysis structure.',
    Component: () => import('../../../src/page-components/guides/EEEconomics'),
  },
  'ee-psychology': {
    title: 'IB Extended Essay Psychology: Analysis & Evaluation Guide',
    description: 'Psychology EEs fail when they summarise rather than evaluate. Three analysis levels, study evaluation methods, and building arguments from conflicting evidence.',
    Component: () => import('../../../src/page-components/guides/EEPsychology'),
  },
  'ee-history': {
    title: 'IB Extended Essay History Guide',
    description: 'History EEs are arguments, not summaries. How to frame your RQ, engage with historiography, combine primary and secondary sources, and reach a nuanced conclusion.',
    Component: () => import('../../../src/page-components/guides/EEHistory'),
  },
  'ee-biology': {
    title: 'IB Extended Essay Biology Guide',
    description: 'Biology EEs require primary research. The RQ formula, experiment design, statistical analysis requirements, and how to write a conclusion from your own data.',
    Component: () => import('../../../src/page-components/guides/EEBiology'),
  },
  'ee-checklist': {
    title: 'IB Extended Essay Submission Checklist — Before You Submit',
    description: 'Before you submit, run through this checklist: RQ framing, formatting, citations, word count, and the 15-minute read-through that protects your grade.',
    Component: () => import('../../../src/page-components/guides/EEChecklist'),
  },
  'ee-planning-timeline': {
    title: 'IB Extended Essay Timeline: 6-Phase, 16-Week Plan',
    description: 'The EE broken into 6 phases across 16 weeks. A reverse-engineered timeline showing exactly what to do each week — from topic selection to submission.',
    Component: () => import('../../../src/page-components/guides/EEPlanningTimeline'),
  },
  'ee-academic-writing': {
    title: 'How to Write Academically for the IB Extended Essay',
    description: 'Academic writing is analysis vs description. Sentence patterns, paragraph structure, and the register that signals A-grade thinking to an IB examiner.',
    Component: () => import('../../../src/page-components/guides/EEAcademicWriting'),
  },
  'ee-supervisor-tips': {
    title: 'How to Work With Your IB Extended Essay Supervisor',
    description: 'Your supervisor writes your predicted grade. How to use your three meetings effectively, when to push back on feedback, and how to protect your marks.',
    Component: () => import('../../../src/page-components/guides/EESupervisorGuide'),
  },
  'ee-abstract': {
    title: 'IB Extended Essay Abstract: Do You Still Need One?',
    description: 'The IB no longer requires an EE abstract — but many schools do. How to write a strong 200-word abstract and exactly how it differs from your introduction.',
    Component: () => import('../../../src/page-components/guides/EEAbstract'),
  },
  'ee-clastify-guide': {
    title: 'How to Use Clastify for Your IB Extended Essay',
    description: 'Clastify has thousands of graded EEs. How to use it to calibrate your standards — and the line between using it for inspiration vs academic misconduct.',
    Component: () => import('../../../src/page-components/guides/EEClastifyGuide'),
  },
  'ee-analysis-vs-description': {
    title: 'IB Extended Essay: Analysis vs Description — Key Differences',
    description: '"Merely descriptive" is the most common reason EEs drop from A to B. The 5 analytical moves, paragraph testing method, and evaluative vocabulary for examiners.',
    Component: () => import('../../../src/page-components/guides/EEAnalysisGuide'),
  },
}

export async function generateStaticParams() {
  return Object.keys(GUIDE_META).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const guide = GUIDE_META[slug]
  if (!guide) return {}
  return {
    title: `${guide.title} | The Extended Essay Academy`,
    description: guide.description,
    alternates: { canonical: `https://theextendedessay.com/guides/${slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://theextendedessay.com/guides/${slug}`,
      images: [{ url: 'https://theextendedessay.com/feather-hero.png' }],
    },
  }
}

export default async function GuidePage({ params }) {
  const { slug } = await params
  const guide = GUIDE_META[slug]
  if (!guide) notFound()

  const { default: GuideComponent } = await guide.Component()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    url: `https://theextendedessay.com/guides/${slug}`,
    image: 'https://theextendedessay.com/feather-hero.png',
    publisher: {
      '@type': 'Organization',
      name: 'The Extended Essay Academy',
      url: 'https://theextendedessay.com',
      logo: { '@type': 'ImageObject', url: 'https://theextendedessay.com/icon.svg' },
    },
    author: {
      '@type': 'Organization',
      name: 'The Extended Essay Academy',
      url: 'https://theextendedessay.com',
    },
    educationalLevel: 'High School',
    about: { '@type': 'Thing', name: 'IB Extended Essay' },
    isPartOf: { '@type': 'Course', name: 'The Extended Essay Academy', url: 'https://theextendedessay.com' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <GuideComponent />
    </>
  )
}
