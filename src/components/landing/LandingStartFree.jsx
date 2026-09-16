import Link from 'next/link'
import ContinueOrStartCTA from './ContinueOrStartCTA'

// Final CTA — open the free guides, or reach for the free tools. The tool
// links point at public destinations: /dump is a no-account tool, the study
// calendar is served as a public static page (the /study-calendar route is
// auth-gated, so it 404s for signed-out visitors).
export default function LandingStartFree() {
  return (
    <section className="bg-navy-deep px-6 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream mb-4">Start free</h2>
        <p className="text-steel text-lg mb-8">Five guides, no account, no card.</p>

        <ContinueOrStartCTA className="btn-primary-light inline-flex" />

        <p className="text-[15px] leading-[1.7] text-steel/90 mt-10 max-w-xl mx-auto">
          Not ready? The tools are free too. The{' '}
          <Link href="/dump" className="text-cream underline underline-offset-2 hover:opacity-80">EE Dump</Link>{' '}
          for organising research and auto-building your MLA bibliography, the{' '}
          <Link href="/dashboard/tools" className="text-cream underline underline-offset-2 hover:opacity-80">Pathway Finder</Link>,
          and the{' '}
          <Link href="/tools/study-calendar.html" className="text-cream underline underline-offset-2 hover:opacity-80">study calendar</Link>.
        </p>
      </div>
    </section>
  )
}
