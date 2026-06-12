import PricingPage from '../../src/page-components/PricingPage'

export const metadata = {
  title: 'The Extended Essay Academy — Plans & Pricing',
  description: 'Unlock the full IB Extended Essay system — 14 modules, AI Grade Scan, planner, essay editor, and templates. Yearly subscription.',
  alternates: { canonical: 'https://theextendedessay.com/pricing' },
}

const BASE = 'https://theextendedessay.com'

const PRODUCT_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'The Extended Essay Academy',
  description: 'The complete IB Extended Essay self-study system — 14 modules, planner, essay editor, research workspace, AI Grade Scan, and templates. Built by a 32/34 student.',
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
      name: 'Method',
      description: '14-module EE curriculum, EE Planner, essay editor, research workspace, citation generator. Yearly subscription.',
      price: '89',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${BASE}/pricing`,
      priceValidUntil: '2026-12-31',
    },
    {
      '@type': 'Offer',
      name: 'Method+System',
      description: 'Everything in Method plus AI Grade Scan (criteria-by-criteria), Polish Pass, Supervisor Reply Drafter, and all templates. Yearly subscription.',
      price: '179',
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
      <PricingPage />
    </>
  )
}
