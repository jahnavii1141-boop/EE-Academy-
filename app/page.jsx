import Hero from '../src/components/Hero'
import Feature108 from '../src/components/blocks/Feature108'
import WhatYoullLearn from '../src/components/WhatYoullLearn'
import HomeFAQ from '../src/components/HomeFAQ'
import EvervaultCTA from '../src/components/EvervaultCTA'
import ResultsStrip from '../src/components/ResultsStrip'

export const metadata = {
  title: 'IB Extended Essay Course | 32/34 System | EE Academy',
  description: 'Ace your IB Extended Essay with the proven 14-module system built by a 32/34 student. Start free today — no card needed.',
  alternates: { canonical: 'https://theextendedessay.com/' },
  openGraph: {
    title: 'IB Extended Essay Course | 32/34 System | EE Academy',
    description: 'Ace your IB Extended Essay with the proven 14-module system built by a 32/34 student. Start free today.',
    url: 'https://theextendedessay.com/',
    images: [{ url: 'https://theextendedessay.com/feather-hero.png' }],
  },
}

const COURSE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'The Extended Essay Academy',
  description: 'A self-study IB Extended Essay program with 14 structured modules covering topic selection, research methodology, essay structure, academic writing, and exam criteria.',
  provider: {
    '@type': 'Organization',
    name: 'The Extended Essay Academy',
    url: 'https://theextendedessay.com',
  },
  offers: {
    '@type': 'Offer',
    price: '89',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  numberOfCredits: 14,
  educationalLevel: 'High School',
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_JSON_LD) }}
      />
      <main>
        <Hero />
        <ResultsStrip />
        <Feature108 />
        <WhatYoullLearn />
        <HomeFAQ />
        <EvervaultCTA />
      </main>
    </>
  )
}
