import CourseModulePage from '../../../src/page-components/CourseModulePage'
import { COURSE_MODULES } from '../../../src/data/courseContent'
import { COURSE_CATALOG } from '../../../src/data/courseCatalog'
import { auth } from '@clerk/nextjs/server'
import { notFound } from 'next/navigation'
import { createServiceClient } from '../../../src/lib/supabase'
import { resolveCourseAccess } from '../../../src/lib/resolveCourseAccess'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { moduleId } = await params
  const module = COURSE_CATALOG.find(m => m.id === moduleId)

  if (!module) {
    return {
      title: 'Module Not Found',
      robots: { index: false, follow: false },
    }
  }

  return {
    title: `Module ${module.number}: ${module.title}`,
    description: module.tagline,
    robots: { index: false, follow: false },
  }
}

export default async function CoursePage({ params }) {
  const { moduleId } = await params
  const catalogModule = COURSE_CATALOG.find(m => m.id === moduleId)
  if (!catalogModule) notFound()

  const { userId } = await auth()
  let hasPaid = false
  let isPremium = false

  if (userId) {
    const adminIds = (process.env.ADMIN_CLERK_USER_IDS || '')
      .split(',')
      .map(id => id.trim())
      .filter(Boolean)

    if (adminIds.includes(userId)) {
      hasPaid = true
      isPremium = true
    } else {
      const supabase = createServiceClient()
      const { data } = await supabase
        .from('user_workspace')
        .select('has_paid, tier')
        .eq('clerk_user_id', userId)
        .maybeSingle()

      hasPaid = data?.has_paid === true
      isPremium = hasPaid && data?.tier === 'premium'
    }
  }

  const fullModule = COURSE_MODULES.find(m => m.id === moduleId)
  const { canAccess, module } = resolveCourseAccess(catalogModule, fullModule, hasPaid, isPremium)

  return (
    <CourseModulePage
      module={module}
      hasPaid={hasPaid}
      isSignedIn={Boolean(userId)}
      isGated={!canAccess}
    />
  )
}
