import Hero from '../src/components/Hero'
import Feature108 from '../src/components/blocks/Feature108'
import WhatYoullLearn from '../src/components/WhatYoullLearn'
import FeaturedGuides from '../src/components/FeaturedGuides'
import HomeFAQ from '../src/components/HomeFAQ'
import EvervaultCTA from '../src/components/EvervaultCTA'
import ResultsStrip from '../src/components/ResultsStrip'

export const metadata = {
  title: 'The Extended Essay Academy | Free IB EE Modules',
  description: 'The step-by-step system for your IB Extended Essay. 14 modules covering research, structure, writing, and criteria. Start free today.',
  alternates: { canonical: 'https://theextendedessay.com/' },
  openGraph: {
    title: 'The Extended Essay Academy | Free IB EE Modules',
    description: 'The step-by-step system for your IB Extended Essay. 14 modules covering research, structure, writing, and criteria. Start free today.',
    url: 'https://theextendedessay.com/',
    images: [{ url: 'https://theextendedessay.com/feather-hero.png' }],
  },
}

const BASE = 'https://theextendedessay.com'

// ── Course schema ─────────────────────────────────────────────────────────────
const COURSE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'The Extended Essay Academy',
  description: 'A self-study IB Extended Essay programme with 14 structured modules covering topic selection, research methodology, essay structure, academic writing, and IB assessment criteria. Built by a 32/34 student.',
  url: `${BASE}/`,
  image: `${BASE}/feather-hero.png`,
  provider: {
    '@type': 'Organization',
    name: 'The Extended Essay Academy',
    url: BASE,
    logo: `${BASE}/icon.svg`,
  },
  instructor: {
    '@type': 'Person',
    name: 'The Extended Essay Academy',
    url: BASE,
  },
  courseMode: 'online',
  inLanguage: 'en',
  isAccessibleForFree: true,        // first 5 modules are free
  educationalLevel: 'High School',
  teaches: 'IB Extended Essay — research, structure, argument, academic writing, and IB assessment criteria',
  numberOfCredits: 14,
  hasPart: [
    { '@type': 'CourseUnit', position: 1,  name: 'Introduction, Mindset & How to Think Like an EE Examiner',           url: `${BASE}/course/module-1`  },
    { '@type': 'CourseUnit', position: 2,  name: 'What IB Expects: Criteria, Grading & How A\'s Are Really Given',     url: `${BASE}/course/module-2`  },
    { '@type': 'CourseUnit', position: 3,  name: 'Choosing Your Subject & Finding Your Topic',                          url: `${BASE}/course/module-3`  },
    { '@type': 'CourseUnit', position: 4,  name: 'How to Find Your Research Question',                                  url: `${BASE}/course/module-4`  },
    { '@type': 'CourseUnit', position: 5,  name: 'The EE Dump Research System',                                         url: `${BASE}/course/module-5`  },
    { '@type': 'CourseUnit', position: 6,  name: 'How to Research Like a Top Student',                                  url: `${BASE}/course/module-6`  },
    { '@type': 'CourseUnit', position: 7,  name: 'Building Your EE Structure',                                          url: `${BASE}/course/module-7`  },
    { '@type': 'CourseUnit', position: 8,  name: 'Writing the EE: How to Actually Write Each Section',                  url: `${BASE}/course/module-8`  },
    { '@type': 'CourseUnit', position: 9,  name: 'Format, Style, Citations & Academic Integrity',                       url: `${BASE}/course/module-9`  },
    { '@type': 'CourseUnit', position: 10, name: 'Writing a Killer Introduction & Conclusion',                          url: `${BASE}/course/module-10` },
    { '@type': 'CourseUnit', position: 11, name: 'RPPF Mastery: The Easiest 6 Marks of Your Life',                     url: `${BASE}/course/module-11` },
    { '@type': 'CourseUnit', position: 12, name: 'Analysing My 32/34 EE: AI Analysis vs. My Real Commentary',          url: `${BASE}/course/module-13` },
    { '@type': 'CourseUnit', position: 13, name: 'Templates, Tools & Checklists',                                       url: `${BASE}/course/module-14` },
  ],
  offers: [
    {
      '@type': 'Offer',
      name: 'Method — Full Course Access',
      price: '89',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${BASE}/pricing`,
      category: 'online course',
    },
    {
      '@type': 'Offer',
      name: 'Method+AI — Full Course + AI Tools',
      price: '179',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${BASE}/pricing`,
      category: 'online course',
    },
  ],
}

// ── FAQ schema ────────────────────────────────────────────────────────────────
const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I start for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Modules 1–3 and 5 are completely free — no card, no login required. You can start immediately at theextendedessay.com/course/module-1.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this built for the current IB syllabus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All 14 modules are designed around the current IB Extended Essay assessment criteria and expectations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly can I improve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Students typically see measurable improvement quickly when following a criteria-first approach. The 14-module system is designed to be worked through systematically, and most students complete it within a few weeks alongside writing their essay.',
      },
    },
    {
      '@type': 'Question',
      name: 'What do I get with full access?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Full access unlocks all 14 modules, the EE Planner, essay editor with autosave, the EE Dump research workspace, the AI Grade Scan tool, templates, RPPF guidance, and the complete 32/34 essay breakdown. One-time payment, lifetime access.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the IB Extended Essay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The IB Extended Essay (EE) is a 4,000-word independent research paper required for the IB Diploma. It is assessed on criteria A–E and contributes up to 3 bonus points toward the IB Diploma score when combined with Theory of Knowledge.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does the Extended Essay take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IB recommends approximately 40 hours for the Extended Essay. Most students spread this across 4–6 months. The EE Academy\'s 14-module system helps you use those hours efficiently from topic selection to final submission.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you write essays for students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. The Extended Essay Academy is a self-study course — we teach you how to research, structure, and write your own essay. Every word stays yours. We give you the system; you do the work.',
      },
    },
  ],
}

// ── Organisation schema ───────────────────────────────────────────────────────
const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'The Extended Essay Academy',
  url: BASE,
  logo: `${BASE}/icon.svg`,
  sameAs: [],
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_JSON_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }} />
      <main>
        <Hero />
        <ResultsStrip />
        <Feature108 />
        <WhatYoullLearn />
        <FeaturedGuides />
        <HomeFAQ />
        <EvervaultCTA />
      </main>
    </>
  )
}
