import GuidesHub from '../../src/page-components/GuidesHub'

export const metadata = {
  title: 'Free IB Extended Essay Guides — Structure, Criteria & More',
  description: 'Free IB Extended Essay guides on structure, criteria, introductions, conclusions, research questions, RPPF, and how to get an A.',
  alternates: { canonical: 'https://theextendedessay.com/guides' },
}

const COLLECTION_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Free IB Extended Essay Guides',
  description: 'Free IB Extended Essay guides on structure, criteria, introductions, conclusions, research questions, RPPF, and how to get an A.',
  url: 'https://theextendedessay.com/guides',
  publisher: {
    '@type': 'Organization',
    name: 'The Extended Essay Academy',
    url: 'https://theextendedessay.com',
  },
}

export default function GuidesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(COLLECTION_JSON_LD) }} />
      <GuidesHub />
    </>
  )
}
