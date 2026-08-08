import LandingHero from '../src/components/landing/LandingHero'
import CourseInOrder from '../src/components/landing/CourseInOrder'
import WhyThisExists from '../src/components/landing/WhyThisExists'
import WhatThisIs from '../src/components/landing/WhatThisIs'
import LandingPrice from '../src/components/landing/LandingPrice'
import LandingFAQ from '../src/components/landing/LandingFAQ'

export const metadata = {
  // Keyword-first, single brand. `absolute` avoids the template appending a
  // second "| The Extended Essay Academy".
  title: { absolute: 'IB Extended Essay: Free Course, Templates & 32/34 Example' },
  description: 'Free step-by-step IB Extended Essay course — 5 free modules, 16 subject workbooks, a real 32/34 example essay, and the official IB guide. Start free.',
  alternates: { canonical: 'https://theextendedessay.com/' },
  openGraph: {
    title: 'IB Extended Essay: Free Course, Templates & a Real 32/34 Example',
    description: 'Free step-by-step IB Extended Essay course — 5 free modules, 16 subject workbooks, a real 32/34 example essay, and the official IB guide. Start free.',
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
  description: 'A self-study IB Extended Essay programme with 14 structured modules covering topic selection, research methodology, essay structure, academic writing, and IB assessment criteria. Built from a real 32/34 Extended Essay.',
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
    { '@type': 'CourseUnit', position: 1,  name: "Guide 01 — Steal the Examiner's Brain",           url: `${BASE}/course/module-1`  },
    { '@type': 'CourseUnit', position: 2,  name: 'Guide 02 — Crack the Markscheme',     url: `${BASE}/course/module-2`  },
    { '@type': 'CourseUnit', position: 3,  name: 'Guide 03 — Choose Your Ground',                          url: `${BASE}/course/module-3`  },
    { '@type': 'CourseUnit', position: 4,  name: 'Guide 04 — Pressure-Test the Question',                                  url: `${BASE}/course/module-4`  },
    { '@type': 'CourseUnit', position: 5,  name: 'Guide 05 — The EE Dump',                                         url: `${BASE}/course/module-5`  },
    { '@type': 'CourseUnit', position: 6,  name: 'Guide 06 — Find What Nobody Else Found',                                  url: `${BASE}/course/module-6`  },
    { '@type': 'CourseUnit', position: 7,  name: 'Guide 07 — Build the Skeleton',                                          url: `${BASE}/course/module-7`  },
    { '@type': 'CourseUnit', position: 8,  name: 'Guide 08 — Flip Descriptive Into Analytical',                  url: `${BASE}/course/module-8`  },
    { '@type': 'CourseUnit', position: 9,  name: 'Guide 09 — Stop Losing Marks You Already Earned',                       url: `${BASE}/course/module-9`  },
    { '@type': 'CourseUnit', position: 10, name: 'Guide 10 — First 300 Words, Last 300 Words',                          url: `${BASE}/course/module-10` },
    { '@type': 'CourseUnit', position: 11, name: 'Guide 11 — The Easiest 6 Marks of Your Life',                     url: `${BASE}/course/module-11` },
    { '@type': 'CourseUnit', position: 12, name: 'Guide 13 — Open the 32/34 Essay',          url: `${BASE}/course/module-13` },
    { '@type': 'CourseUnit', position: 13, name: 'Guide 14 — The Armoury',                                       url: `${BASE}/course/module-14` },
  ],
  offers: [
    {
      '@type': 'Offer',
      name: 'Standard — Full Course Access',
      price: '79',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${BASE}/pricing`,
      category: 'online course',
    },
    {
      '@type': 'Offer',
      name: 'Premium — Full Course + Tools',
      price: '149',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${BASE}/pricing`,
      category: 'online course',
    },
  ],
}

// ── FAQ schema — matches the visible landing FAQ ──────────────────────────────
const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: "I'm in DP1 or DP2 — is it too early or too late?", acceptedAnswer: { '@type': 'Answer', text: "Neither. DP1 is the ideal time — you pick a question you can actually finish. In DP2 the later lessons (structure, turning description into analysis, the first and last 300 words, the reflections) are built for exactly the crunch you're in. Start wherever you are; the lessons run in order but open in any order." } },
    { '@type': 'Question', name: 'Does it cover my subject?', acceptedAnswer: { '@type': 'Answer', text: 'The worked example is a Business Management essay — the real 32/34 essay you can open in the free lessons. The system itself is subject-agnostic: the criteria, the structure, and the move from description to analysis are the same in a science, a humanity, or a language. Lesson 03 is about choosing and framing for your specific subject.' } },
    { '@type': 'Question', name: 'What if my supervisor tells me something different?', acceptedAnswer: { '@type': 'Answer', text: 'Follow your supervisor on anything specific to your essay — they know your school and your examiners. This course is the reasoning most supervisors do not have time to spell out across twenty students, so you can have that conversation from a stronger position. Where they differ, they win.' } },
    { '@type': 'Question', name: 'Do you offer refunds?', acceptedAnswer: { '@type': 'Answer', text: '30-day money-back guarantee. If the course is not what you needed, email us within 30 days for a full refund.' } },
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
        {/* One lessons-first landing (2026-08): hero → course list → why it
            exists → what it is/isn't → price → FAQ. The primary action opens a
            lesson, never an auth screen. */}
        <LandingHero />
        <CourseInOrder />
        <WhyThisExists />
        <WhatThisIs />
        <LandingPrice />
        <LandingFAQ />
      </main>
    </>
  )
}
