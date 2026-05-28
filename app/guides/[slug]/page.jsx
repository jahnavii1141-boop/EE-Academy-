import { notFound } from 'next/navigation'

// Guide slug → metadata
const GUIDE_META = {
  'extended-essay-introduction': {
    title: 'How to Write an Extended Essay Introduction',
    description: 'Learn how to write a stronger IB Extended Essay introduction with better hooks, clearer context, and a sharper research question setup.',
    Component: () => import('../../../src/page-components/guides/EEIntroductionGuide'),
  },
  'extended-essay-structure': {
    title: 'IB Extended Essay Structure Template & Guide',
    description: 'Use a section-by-section IB Extended Essay structure template and learn how to map each part of your essay to the markscheme.',
    Component: () => import('../../../src/page-components/guides/EEStructureGuide'),
  },
  'research-question-examples': {
    title: 'Extended Essay Research Question Examples',
    description: 'Use strong Extended Essay research question examples to avoid vague topics and build a question that can actually score well.',
    Component: () => import('../../../src/page-components/guides/ResearchQuestionExamples'),
  },
  'rppf-guide': {
    title: 'IB Extended Essay RPPF Guide',
    description: 'Learn how to write stronger RPPF reflections and improve Criterion E with clearer thinking, better reflection, and stronger examples.',
    Component: () => import('../../../src/page-components/guides/RPPFGuide'),
  },
  'extended-essay-tips': {
    title: 'IB Extended Essay Tips That Actually Improve Your Grade',
    description: 'Use practical IB Extended Essay tips to improve your structure, analysis, citations, reflections, and final score.',
    Component: () => import('../../../src/page-components/guides/EETipsGuide'),
  },
  'ee-criteria-breakdown': {
    title: 'IB Extended Essay Criteria Explained',
    description: 'Understand the IB Extended Essay criteria clearly so you know how marks are actually awarded across all five categories.',
    Component: () => import('../../../src/page-components/guides/EECriteriaGuide'),
  },
  'ee-subjects-guide': {
    title: 'Best IB Extended Essay Subjects',
    description: 'Compare IB Extended Essay subject options, understand what makes a subject viable, and choose one that gives you the best chance of scoring well.',
    Component: () => import('../../../src/page-components/guides/EESubjectsGuide'),
  },
  'ee-word-count': {
    title: 'IB Extended Essay Word Count Guide',
    description: 'Understand the IB Extended Essay word count rules, section balance, and the mistakes that can make your final draft weaker.',
    Component: () => import('../../../src/page-components/guides/EEWordCountGuide'),
  },
  'ee-conclusion': {
    title: 'How to Write an Extended Essay Conclusion',
    description: 'Write a stronger IB Extended Essay conclusion that answers the research question directly and closes your argument with more authority.',
    Component: () => import('../../../src/page-components/guides/EEConclusionGuide'),
  },
  'ee-research-methods': {
    title: 'IB Extended Essay Research Methods Guide',
    description: 'Choose better IB Extended Essay research methods and understand how to justify them clearly in your essay.',
    Component: () => import('../../../src/page-components/guides/EEResearchMethodsGuide'),
  },
  'how-to-get-an-a-in-extended-essay': {
    title: 'How to Get an A in the Extended Essay (Step-by-Step)',
    description: 'Learn how to get an A in the IB Extended Essay with a practical 7-step system, clearer marks strategy, and an examiner-focused checklist.',
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
    title: 'IB Extended Essay Formatting Guide',
    description: 'Formatting is free marks. The non-negotiable rules: font, spacing, margins, title page, headings, and the 15-minute pre-submission checklist.',
    Component: () => import('../../../src/page-components/guides/EEFormattingGuide'),
  },
  'ee-citations-mla': {
    title: 'IB Extended Essay Citations and MLA Formatting Guide',
    description: 'How to format in-text citations, block quotes, and your Works Cited page using MLA style — with academic integrity rules.',
    Component: () => import('../../../src/page-components/guides/EECitationsMLA'),
  },
  'ee-ai-guide': {
    title: 'How to Use AI for Your IB Extended Essay',
    description: 'The exact prompts for stress-testing your RQ, critiquing your draft, and improving your structure — without crossing the academic integrity line.',
    Component: () => import('../../../src/page-components/guides/EEAIGuide'),
  },
  'ee-mindset': {
    title: 'How to Think About the IB Extended Essay (The Mindset Shift)',
    description: 'The biggest reason students underperform isn\'t intelligence — it\'s the wrong mental model. The mindset shift that separates C from A.',
    Component: () => import('../../../src/page-components/guides/EEMindset'),
  },
  'ee-business-management': {
    title: 'IB Extended Essay Business Management Guide',
    description: 'The framework stack, RQ structure, data sources, and the original finding principle behind a 32/34 Business Management EE.',
    Component: () => import('../../../src/page-components/guides/EEBusinessManagement'),
  },
  'ee-economics': {
    title: 'IB Extended Essay Economics Guide',
    description: 'Economics EEs reward rigorous theory + real data. The sub-RQ method, key frameworks, best data sources, and A-band analysis structure.',
    Component: () => import('../../../src/page-components/guides/EEEconomics'),
  },
  'ee-psychology': {
    title: 'IB Extended Essay Psychology Guide',
    description: 'Psychology EEs succeed by evaluating research, not just reporting it. The three levels of analysis, how to evaluate studies, and how to build arguments from conflicting evidence.',
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
    title: 'IB Extended Essay Submission Checklist',
    description: 'Before you submit, run through this checklist: RQ framing, formatting, citations, word count, and the 15-minute read-through that protects your grade.',
    Component: () => import('../../../src/page-components/guides/EEChecklist'),
  },
  'ee-planning-timeline': {
    title: 'IB Extended Essay Timeline and Planning Guide',
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
    title: 'IB Extended Essay Abstract: Do You Need One?',
    description: 'The IB removed the mandatory EE abstract in 2018. Whether your school still requires one, how to write a strong 200-word abstract, and the key differences from an introduction.',
    Component: () => import('../../../src/page-components/guides/EEAbstract'),
  },
  'ee-clastify-guide': {
    title: 'How to Use Clastify for Your IB Extended Essay',
    description: 'Clastify has thousands of graded EEs. How to use it to calibrate your standards — and the line between using it for inspiration vs academic misconduct.',
    Component: () => import('../../../src/page-components/guides/EEClastifyGuide'),
  },
  'ee-analysis-vs-description': {
    title: 'Analysis vs Description in the IB Extended Essay',
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
  return <GuideComponent />
}
