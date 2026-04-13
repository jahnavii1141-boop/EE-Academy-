import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'The Extended Essay Academy'
const DEFAULT_OG_IMAGE = 'https://theextendedessay.com/feather-hero.png'
const BASE_URL = 'https://theextendedessay.com'

export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  jsonLd,
  noindex = false,
  appendSiteName = true,
}) {
  const fullTitle = title
    ? appendSiteName ? `${title} | ${SITE_NAME}` : title
    : SITE_NAME
  const fullCanonical = canonical
    ? canonical.startsWith('http') ? canonical : `${BASE_URL}${canonical}`
    : undefined

  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}
