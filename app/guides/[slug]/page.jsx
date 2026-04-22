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
}

export async function generateStaticParams() {
  return Object.keys(GUIDE_META).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const guide = GUIDE_META[params.slug]
  if (!guide) return {}
  return {
    title: `${guide.title} | The Extended Essay Academy`,
    description: guide.description,
    alternates: { canonical: `https://www.theextendedessay.com/guides/${params.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `https://www.theextendedessay.com/guides/${params.slug}`,
      images: [{ url: 'https://www.theextendedessay.com/feather-hero.png' }],
    },
  }
}

export default async function GuidePage({ params }) {
  const guide = GUIDE_META[params.slug]
  if (!guide) notFound()

  const { default: GuideComponent } = await guide.Component()
  return <GuideComponent />
}
