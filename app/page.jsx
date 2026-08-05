import Hero from '../src/components/Hero'
import StakesStrip from '../src/components/StakesStrip'
import WhatYoullLearn from '../src/components/WhatYoullLearn'
import Feature108 from '../src/components/blocks/Feature108'
import HomeProof from '../src/components/HomeProof'
import HomeOffer from '../src/components/HomeOffer'
import HomeGuarantee from '../src/components/HomeGuarantee'
import HomeFAQ from '../src/components/HomeFAQ'
import EvervaultCTA from '../src/components/EvervaultCTA'
import EmailSignupModal from '../src/components/EmailSignupModal'

export const metadata = {
  // Keyword-first, single brand. `absolute` avoids the template appending a
  // second "| The Extended Essay Academy".
  title: { absolute: 'IB Extended Essay: Free Course, Templates & 32/34 Example' },
  description: 'Free step-by-step IB Extended Essay course — 5 free modules, 16 subject workbooks, a real 32/34 example essay, and the official IB guide. Start free, no card.',
  alternates: { canonical: 'https://theextendedessay.com/' },
  openGraph: {
    title: 'IB Extended Essay: Free Course, Templates & a Real 32/34 Example',
    description: 'Free step-by-step IB Extended Essay course — 5 free modules, 16 subject workbooks, a real 32/34 example essay, and the official IB guide. Start free, no card.',
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
    { '@type': 'CourseUnit', position: 1,  name: "Mission 01 — Steal the Examiner's Brain",           url: `${BASE}/course/module-1`  },
    { '@type': 'CourseUnit', position: 2,  name: 'Mission 02 — Crack the Markscheme',     url: `${BASE}/course/module-2`  },
    { '@type': 'CourseUnit', position: 3,  name: 'Mission 03 — Choose Your Ground',                          url: `${BASE}/course/module-3`  },
    { '@type': 'CourseUnit', position: 4,  name: 'Mission 04 — Pressure-Test the Question',                                  url: `${BASE}/course/module-4`  },
    { '@type': 'CourseUnit', position: 5,  name: 'Mission 05 — The EE Dump',                                         url: `${BASE}/course/module-5`  },
    { '@type': 'CourseUnit', position: 6,  name: 'Mission 06 — Find What Nobody Else Found',                                  url: `${BASE}/course/module-6`  },
    { '@type': 'CourseUnit', position: 7,  name: 'Mission 07 — Build the Skeleton',                                          url: `${BASE}/course/module-7`  },
    { '@type': 'CourseUnit', position: 8,  name: 'Mission 08 — Flip Descriptive Into Analytical',                  url: `${BASE}/course/module-8`  },
    { '@type': 'CourseUnit', position: 9,  name: 'Mission 09 — Stop Losing Marks You Already Earned',                       url: `${BASE}/course/module-9`  },
    { '@type': 'CourseUnit', position: 10, name: 'Mission 10 — First 300 Words, Last 300 Words',                          url: `${BASE}/course/module-10` },
    { '@type': 'CourseUnit', position: 11, name: 'Mission 11 — The Easiest 6 Marks of Your Life',                     url: `${BASE}/course/module-11` },
    { '@type': 'CourseUnit', position: 12, name: 'Mission 13 — Open the 32/34 Essay',          url: `${BASE}/course/module-13` },
    { '@type': 'CourseUnit', position: 13, name: 'Mission 14 — The Armoury',                                       url: `${BASE}/course/module-14` },
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
        text: "Yes, your first modules are free and you don't need a card. Unlock the full system whenever you're ready.",
      },
    },
    {
      '@type': 'Question',
      name: 'Do you write the essay for me?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No. This is a self-study system, we teach you how to research, structure, and write it yourself. Every word stays yours. That's the whole point: examiners can tell when it isn't, and so can you.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is it built for the current IB syllabus?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, everything maps to the current EE assessment criteria.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast can I improve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Most students find their essay gets clearer within the first few modules, because you stop guessing and start matching the markscheme. How far you go depends on your effort, but you'll never again wonder what \"good\" actually looks like.",
      },
    },
    {
      '@type': 'Question',
      name: "What if I'm completely out of time?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Start with the 1-Day Protocol. It's built for exactly that, the highest-impact fixes when the deadline is tomorrow.",
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
      <EmailSignupModal />
      <main>
        <Hero />
        <StakesStrip />
        <WhatYoullLearn />
        <div id="how-it-works">
          <Feature108 />
        </div>
        <HomeProof />
        <HomeOffer />
        <HomeGuarantee />
        <HomeFAQ />
        <EvervaultCTA />
      </main>
    </>
  )
}
