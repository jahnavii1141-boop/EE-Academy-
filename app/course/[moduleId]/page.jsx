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

export default function CoursePage() {
  return <CourseModulePage />
}
