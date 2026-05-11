import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export const metadata = {
  title: 'Create Account | The Extended Essay Academy',
  description: 'Create a free account on The Extended Essay Academy and start your IB Extended Essay with a proven 32/34 system.',
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: '#fafafa' }}>

      {/* Site branding — makes clear which site this login belongs to */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/feather-nav.png" alt="The Extended Essay Academy" style={{ height: 40, width: 'auto' }} />
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 600, color: '#0a0a0a', letterSpacing: '-0.01em' }}>
            The Extended Essay Academy
          </span>
        </Link>
        <p style={{ fontSize: 13, color: '#888', textAlign: 'center', maxWidth: 300 }}>
          Create your free account and start the 14-module EE system.
        </p>
      </div>

      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/onboarding"
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

      <p style={{ marginTop: 24, fontSize: 12, color: '#aaa', textAlign: 'center' }}>
        <Link href="/" style={{ color: '#888' }}>← Back to theextendedessay.com</Link>
      </p>
    </div>
  )
}
