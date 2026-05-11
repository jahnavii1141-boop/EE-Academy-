import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  // /course/* is intentionally PUBLIC — Googlebot must be able to crawl it.
  // Access gating is handled inside CourseModulePage via PaywallBanner.
  '/dump(.*)',
  '/planner(.*)',
  '/study-calendar(.*)',
  '/onboarding(.*)',
  '/share(.*)',
])

// Sign-in and sign-up are public — Clerk handles them
const isAuthRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

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
