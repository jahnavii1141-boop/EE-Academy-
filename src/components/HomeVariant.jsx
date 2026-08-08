'use client'

import Link from 'next/link'
import StartLearningGoogle from './StartLearningGoogle'

// The 'test' arm of the homepage-simplified-cta experiment: one clean screen,
// one button, Google SSO only, no form, no marketing. The single escape hatch
// is a quiet text link to preview the first free lesson (no account needed).
export default function HomeVariant() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-navy-deep px-6">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[420px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #DDD9C4 0%, transparent 70%)' }}
      />
      <div className="relative z-10 max-w-2xl mx-auto text-center py-20">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <img src="/feather-nav.png" alt="" className="h-9 w-auto" />
          <span className="font-serif text-lg font-semibold text-cream tracking-tight">The Extended Essay Academy</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-cream leading-[1.1] mb-6">
          Write a 32/34<br className="hidden sm:block" /> Extended Essay.
        </h1>
        <p className="text-lg text-steel leading-relaxed max-w-md mx-auto mb-10">
          The step-by-step IB EE system, built from a real 32/34 essay. Free to start.
        </p>

        <div className="flex flex-col items-center gap-5">
          <StartLearningGoogle className="btn-primary-light text-base px-8 py-4" />
          <Link href="/course/module-1" className="text-sm text-steel/70 hover:text-cream underline underline-offset-4 transition-colors">
            or preview the first lesson →
          </Link>
        </div>
      </div>
    </section>
  )
}
