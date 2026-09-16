import Script from 'next/script'

// "Book a free call" — Calendly inline widget. The widget script (loaded
// lazily, after the page is interactive) scans for .calendly-inline-widget and
// mounts the iframe into it. Calendly domains are in the staged CSP in
// next.config.js so enabling CSP later won't break this.
const CALENDLY_URL = 'https://calendly.com/jia432h/30min?background_color=d7651d'

export default function LandingBookCall() {
  return (
    <section className="bg-cream px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-4">
          Book a free call
        </h2>
        <p className="text-[1.0625rem] leading-[1.75] text-navy/90 mb-8">
          Twenty minutes with me about your EE and where you&rsquo;re stuck. No pitch, just the call.
        </p>

        <div
          className="calendly-inline-widget rounded-2xl overflow-hidden border border-navy/10"
          data-url={CALENDLY_URL}
          style={{ minWidth: 320, height: 700 }}
        />
        <Script
          src="https://assets.calendly.com/assets/external/widget.js"
          strategy="lazyOnload"
        />
      </div>
    </section>
  )
}
