import PricingPage from '../../src/page-components/PricingPage'
import CaptureOnMount from '../../src/components/analytics/CaptureOnMount'

export const metadata = {
  title: 'IB Extended Essay Course — Pricing',
  description: 'The full IB Extended Essay system — 14 lessons, planner, essay editor, and templates. $89 one-time, lifetime access.',
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
  offers: {
    '@type': 'Offer',
    name: 'The full course',
    description: 'The complete 14-lesson EE system — curriculum, planner, essay editor, research workspace, citation generator, templates & SOPs, and the full 32/34 essay breakdown. One-time payment, lifetime access.',
    price: '89',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: `${BASE}/pricing`,
    priceValidUntil: '2026-12-31',
  },
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
