import CourseModulePage from '../../../src/page-components/CourseModulePage'
import { COURSE_MODULES } from '../../../src/data/courseContent'

// Pre-render all 14 module pages at build time — eliminates cold-start 5xx
export async function generateStaticParams() {
  return COURSE_MODULES.map(m => ({ moduleId: m.id }))
}

export async function generateMetadata({ params }) {
  const { moduleId } = await params
  const module = COURSE_MODULES.find(m => m.id === moduleId)

  if (!module) {
    return { title: 'Module Not Found' }
  }

  return {
    title: `Module ${module.number}: ${module.title}`,
    description: module.tagline,
    alternates: {
      canonical: `https://theextendedessay.com/course/${moduleId}`,
    },
  }
}

export default async function CoursePage({ params }) {
  const { moduleId } = await params
  const module = COURSE_MODULES.find(m => m.id === moduleId)

  const jsonLd = module
    ? {
        '@context': 'https://schema.org',
        '@type': 'LearningResource',
        name: `Module ${module.number}: ${module.title}`,
        description: module.tagline,
        url: `https://theextendedessay.com/course/${moduleId}`,
        learningResourceType: 'Course',
        educationalLevel: 'High School',
        isPartOf: {
          '@type': 'Course',
          name: 'The Extended Essay Academy',
          url: 'https://theextendedessay.com',
          provider: {
            '@type': 'Organization',
            name: 'The Extended Essay Academy',
            url: 'https://theextendedessay.com',
          },
        },
        author: {
          '@type': 'Person',
          name: 'Gia',
          description: 'Scored 32/34 on the IB Extended Essay. Founder of The Extended Essay Academy.',
          url: 'https://theextendedessay.com',
        },
        ...(module.free
          ? { isAccessibleForFree: true }
          : {
              isAccessibleForFree: false,
              offers: {
                '@type': 'Offer',
                price: '89',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                url: 'https://theextendedessay.com/pricing',
              },
            }),
      }
    : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <CourseModulePage />
    </>
  )
}
