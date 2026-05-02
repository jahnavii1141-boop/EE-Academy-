import CourseModulePage from '../../../src/page-components/CourseModulePage'
import { COURSE_MODULES } from '../../../src/data/courseContent'

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
      canonical: `https://www.theextendedessay.com/course/${moduleId}`,
    },
  }
}

export default function CoursePage() {
  return <CourseModulePage />
}
