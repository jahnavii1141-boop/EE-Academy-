import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'
import RedirectIfSignedIn from '@/components/RedirectIfSignedIn'
import CaptureOnMount from '@/components/analytics/CaptureOnMount'

export const metadata = {
  title: 'Sign In | The Extended Essay Academy',
  description: 'Sign in to your Extended Essay Academy account to access your course, dashboard, and EE tools.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://theextendedessay.com/sign-in' },
}

export default async function SignInPage({ searchParams }) {
  // Return to the lesson the user came from (validated internal path), else dashboard.
  const params = await searchParams
  const rd = typeof params?.redirect_url === 'string' ? params.redirect_url : ''
  const redirectUrl = rd.startsWith('/course/') ? rd : '/dashboard/home'
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: '#fafafa' }}>

      {/* Already signed in? Never show the form again — go where they were headed. */}
      <RedirectIfSignedIn to={redirectUrl} />
      <CaptureOnMount event="signin_start" />

      {/* Site branding — makes clear which site this login belongs to */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/feather-nav.png" alt="The Extended Essay Academy" style={{ height: 40, width: 'auto' }} />
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 600, color: '#0a0a0a', letterSpacing: '-0.01em' }}>
            The Extended Essay Academy
          </span>
        </Link>
        <p style={{ fontSize: 13, color: '#888', textAlign: 'center', maxWidth: 280 }}>
          Sign in to access your dashboard, modules, and EE tools.
        </p>
      </div>

      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        fallbackRedirectUrl={redirectUrl}
        appearance={{
          variables: {
            colorPrimary: '#0a0a0a',
            colorBackground: '#ffffff',
            colorText: '#0a0a0a',
            colorTextSecondary: '#888888',
            colorInputBackground: '#ffffff',
            colorInputText: '#0a0a0a',
            borderRadius: '12px',
          },
          elements: {
            card: 'shadow-none border border-[#e8e8e8]',
            headerTitle: 'font-semibold text-xl',
            headerSubtitle: 'text-sm text-[#888]',
          },
        }}
      />

    </div>
  )
}
