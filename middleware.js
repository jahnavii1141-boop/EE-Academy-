import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  // /course/* and /dashboard/* are accessible without Clerk — free email gate is in dashboard layout
  // Paid content is stripped server-side in app/course/[moduleId]/page.jsx via resolveCourseAccess
  // NOTE: /dump is intentionally PUBLIC — DumpWorkspacePage runs a no-account
  // localStorage mode (first 7 sources free, then a paywall), so a reader who
  // arrives mid-research from a guide can use the tool without signing up. The
  // /api/dump route still guards itself server-side (401 without a userId).
  '/planner(.*)',
  '/study-calendar(.*)',
  '/onboarding(.*)',
  // NOTE: /share/* is intentionally PUBLIC — supervisors view it without an account.
  // The share token provides its own access control.
])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}

