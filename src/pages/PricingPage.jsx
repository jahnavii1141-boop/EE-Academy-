import AnimateIn from '../components/ui/AnimateIn'
import Pricing from '../components/Pricing'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-2 text-center">
        <AnimateIn>
          <span className="inline-flex items-center bg-navy/8 text-navy text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-navy/12 tracking-wide">
            One-time payment · Lifetime access
          </span>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-navy mb-3">
            Get Full Access
          </h1>
          <p className="text-lg text-ink-soft max-w-xl mx-auto">
            Join hundreds of IB students who've levelled up their Extended Essay with this programme.
          </p>
        </AnimateIn>
      </div>
      <Pricing />
    </div>
  )
}
