'use client'

import { useState, useEffect } from 'react'
import { useSignUp, useSignIn, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { X, ArrowRight, Sparkles } from 'lucide-react'

const STORAGE_KEY = 'ee_signup_shown'

export default function EmailSignupModal() {
  const { isLoaded: signUpLoaded, signUp, setActive: setSignUpActive } = useSignUp()
  const { isLoaded: signInLoaded, signIn, setActive: setSignInActive } = useSignIn()
  const { isSignedIn } = useUser()
  const router = useRouter()

  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState('email') // 'email' | 'code' | 'done'
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState('signup') // 'signup' | 'signin'

  useEffect(() => {
    if (isSignedIn) return
    if (sessionStorage.getItem(STORAGE_KEY)) return

    // Show after 5 seconds
    const timer = setTimeout(() => {
      setVisible(true)
      sessionStorage.setItem(STORAGE_KEY, '1')
    }, 5000)

    return () => clearTimeout(timer)
  }, [isSignedIn])

  const close = () => setVisible(false)

  const submitEmail = async (e) => {
    e.preventDefault()
    if (!signUpLoaded || !signInLoaded) return
    setError('')
    setLoading(true)

    try {
      // Try sign-up first
      await signUp.create({ emailAddress: email })
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setMode('signup')
      setStep('code')
    } catch (err) {
      const code = err?.errors?.[0]?.code
      if (code === 'form_identifier_exists' || code === 'session_exists') {
        // Existing user — switch to sign-in
        try {
          await signIn.create({ identifier: email })
          // Find email factor
          const emailFactor = signIn.supportedFirstFactors?.find(
            f => f.strategy === 'email_code'
          )
          if (emailFactor) {
            await signIn.prepareFirstFactor({
              strategy: 'email_code',
              emailAddressId: emailFactor.emailAddressId,
            })
            setMode('signin')
            setStep('code')
          } else {
            setError('Please use the sign-in page for your account.')
          }
        } catch {
          setError('Something went wrong. Try again.')
        }
      } else {
        setError(err?.errors?.[0]?.longMessage || 'Something went wrong. Try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const submitCode = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        const result = await signUp.attemptEmailAddressVerification({ code })
        if (result.status === 'complete') {
          await setSignUpActive({ session: result.createdSessionId })
          setStep('done')
          setTimeout(() => router.push('/onboarding'), 800)
        }
      } else {
        const result = await signIn.attemptFirstFactor({
          strategy: 'email_code',
          code,
        })
        if (result.status === 'complete') {
          await setSignInActive({ session: result.createdSessionId })
          setStep('done')
          setTimeout(() => router.push('/dashboard'), 800)
        }
      }
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || 'Incorrect code. Try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: '#fff' }}>

        {step === 'done' ? (
          <div className="px-8 py-10 text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5"
              style={{ background: '#0a0a0a' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="font-semibold text-lg mb-1" style={{ color: '#0a0a0a', letterSpacing: '-0.02em' }}>
              You're in.
            </p>
            <p className="text-sm" style={{ color: '#888' }}>Taking you to your workspace…</p>
          </div>
        ) : (
          <>
            {/* Header band */}
            <div className="px-8 pt-8 pb-6 relative">
              <button onClick={close}
                className="absolute top-5 right-5 p-1.5 rounded-lg transition-all"
                style={{ color: '#ccc' }}
                onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'}
                onMouseLeave={e => e.currentTarget.style.color = '#ccc'}>
                <X size={16} />
              </button>

              {step === 'email' && (
                <>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                      style={{ background: '#0a0a0a' }}>
                      <Sparkles size={12} color="#fff" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#aaa' }}>
                      EE Academy
                    </span>
                  </div>
                  <h2 className="font-semibold mb-2" style={{ fontSize: 22, color: '#0a0a0a', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                    Free access to your<br />EE workspace.
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
                    Modules, planner, citation tool, and EE Mentor — all in one place. Enter your email to get started.
                  </p>
                </>
              )}

              {step === 'code' && (
                <>
                  <button onClick={() => setStep('email')}
                    className="flex items-center gap-1.5 text-xs mb-5 transition-all"
                    style={{ color: '#aaa' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#0a0a0a'}
                    onMouseLeave={e => e.currentTarget.style.color = '#aaa'}>
                    ← Back
                  </button>
                  <h2 className="font-semibold mb-2" style={{ fontSize: 22, color: '#0a0a0a', letterSpacing: '-0.02em' }}>
                    Check your email.
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
                    We sent a 6-digit code to <strong style={{ color: '#555' }}>{email}</strong>. Enter it below.
                  </p>
                </>
              )}
            </div>

            {/* Form */}
            <div className="px-8 pb-8">
              {step === 'email' && (
                <form onSubmit={submitEmail} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError('') }}
                    placeholder="your@email.com"
                    autoFocus
                    required
                    className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
                    style={{ border: '1px solid #e8e8e8', color: '#0a0a0a', background: '#fafafa' }}
                    onFocus={e => e.target.style.borderColor = '#0a0a0a'}
                    onBlur={e => e.target.style.borderColor = '#e8e8e8'}
                  />
                  {error && <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>}
                  <button type="submit" disabled={loading || !email}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
                    style={{ background: '#0a0a0a', color: '#fff' }}>
                    {loading ? 'Sending…' : <>Get free access <ArrowRight size={14} /></>}
                  </button>
                  <p className="text-center text-xs" style={{ color: '#ccc' }}>
                    No payment needed. No spam. Unsubscribe anytime.
                  </p>
                </form>
              )}

              {step === 'code' && (
                <form onSubmit={submitCode} className="space-y-3">
                  <input
                    type="text"
                    value={code}
                    onChange={e => { setCode(e.target.value.replace(/\D/g, '').slice(0, 6)); setError('') }}
                    placeholder="000000"
                    autoFocus
                    inputMode="numeric"
                    maxLength={6}
                    className="w-full rounded-xl px-4 py-3.5 text-center text-xl font-mono tracking-[0.4em] focus:outline-none transition-colors"
                    style={{ border: '1px solid #e8e8e8', color: '#0a0a0a', background: '#fafafa', letterSpacing: '0.4em' }}
                    onFocus={e => e.target.style.borderColor = '#0a0a0a'}
                    onBlur={e => e.target.style.borderColor = '#e8e8e8'}
                  />
                  {error && <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>}
                  <button type="submit" disabled={loading || code.length < 6}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-40"
                    style={{ background: '#0a0a0a', color: '#fff' }}>
                    {loading ? 'Verifying…' : <>Confirm & enter workspace <ArrowRight size={14} /></>}
                  </button>
                  <button type="button" onClick={submitEmail}
                    className="w-full text-xs py-1.5 transition-all"
                    style={{ color: '#bbb' }}>
                    Didn't get it? Resend code
                  </button>
                </form>
              )}
            </div>

            {/* What you get */}
            {step === 'email' && (
              <div className="px-8 py-4 flex items-center gap-6" style={{ borderTop: '1px solid #f0f0f0', background: '#fafafa' }}>
                {['14 free modules', 'EE planner', 'Citation tool'].map(item => (
                  <div key={item} className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#16a34a' }} />
                    <span className="text-[10px] font-medium" style={{ color: '#888' }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
