import PricingPage from '../../src/page-components/PricingPage'
import CaptureOnMount from '../../src/components/analytics/CaptureOnMount'

export const metadata = {
  title: 'IB Extended Essay Course — Plans & Pricing',
  description: 'Unlock the full IB Extended Essay system — 14 lessons, planner, essay editor, and templates. Yearly access.',
  alternates: { canonical: 'https://theextendedessay.com/pricing' },
}

const BASE = 'https://theextendedessay.com'

const PRODUCT_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'The Extended Essay Academy',
  description: 'The complete IB Extended Essay self-study system — 14 lessons, planner, essay editor, research workspace, and templates. Built by a 32/34 student.',
  url: `${BASE}/pricing`,
  image: `${BASE}/feather-hero.png`,
  brand: {
    '@type': 'Organization',
    name: 'The Extended Essay Academy',
    url: BASE,
  },
  offers: [
    {
      '@type': 'Offer',
      name: 'Standard',
      description: '14-lesson EE curriculum, EE Planner, essay editor, research workspace, citation generator. Yearly access.',
      price: '79',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${BASE}/pricing`,
      priceValidUntil: '2026-12-31',
    },
    {
      '@type': 'Offer',
      name: 'Premium',
      description: 'Everything in Standard plus Polish Pass, Supervisor Reply Drafter, and all templates. Yearly access.',
      price: '149',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${BASE}/pricing`,
      priceValidUntil: '2026-12-31',
    },
  ],
}

export default function Pricing() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_JSON_LD) }} />
      <CaptureOnMount event="pricing_view" />
      <PricingPage />
    </>
  )
}
