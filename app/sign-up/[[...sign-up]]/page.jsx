import { SignUp } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import CaptureOnMount from '@/components/analytics/CaptureOnMount'

export const metadata = {
  title: 'Create Account | The Extended Essay Academy',
  description: 'Create a free account on The Extended Essay Academy and start your IB Extended Essay with a proven 32/34 system.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://theextendedessay.com/sign-up' },
}

export const dynamic = 'force-dynamic'

export default async function SignUpPage({ params, searchParams }) {
  // Only bounce already-signed-in users from the BASE /sign-up page. Do NOT run
  // this on Clerk's OAuth callback sub-paths (/sign-up/sso-callback, /continue,
  // …) or we'd interrupt the Google sign-up mid-flow and force a re-click.
  const seg = (await params)?.['sign-up']
  if (!seg || seg.length === 0) {
    const { userId } = await auth()
    if (userId) redirect('/dashboard/home')
  }

  // ?email= can prefill the address so signup is one step.
  const sp = await searchParams
  const email = typeof sp?.email === 'string' ? sp.email : undefined

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: '#fafafa' }}>

      <CaptureOnMount event="signin_start" />

      {/* Site branding — makes clear which site this login belongs to */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/feather-nav.png" alt="The Extended Essay Academy" style={{ height: 40, width: 'auto' }} />
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 600, color: '#0a0a0a', letterSpacing: '-0.01em' }}>
            The Extended Essay Academy
          </span>
        </Link>
        <p style={{ fontSize: 13, color: '#888', textAlign: 'center', maxWidth: 300 }}>
          Create your free account and start the EE system.
        </p>
      </div>

      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/dashboard/home"
        initialValues={email ? { emailAddress: email } : undefined}
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
