// The "Examiner Pledge" design, rebuilt for our faceless brand: no invented
// person, no human-moderator claim, grade A (not A*). Navy left-border quote card.
export default function SystemPledge() {
  return (
    <section className="max-w-2xl mx-auto mt-12">
      <div
        className="rounded-2xl px-6 py-7"
        style={{
          background: '#fff',
          border: '1px solid rgba(46,50,80,0.10)',
          borderLeft: '4px solid #2E3250',
        }}
      >
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] mb-3" style={{ color: '#9BAAB8' }}>
          Our commitment
        </p>
        <p className="font-serif text-[19px] leading-snug mb-3" style={{ color: '#2E3250' }}>
          Built to the markscheme, not to vibes.
        </p>
        <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(46,50,80,0.70)' }}>
          Every mission and every tool maps to the real IB Extended Essay assessment criteria. The goal
          isn&apos;t a vague &ldquo;better essay&rdquo; &mdash; it&apos;s one engineered to score, built from the
          exact system behind a real 32/34, a final A.
        </p>
        <div className="mt-5 pt-4 flex items-center gap-3" style={{ borderTop: '1px solid rgba(46,50,80,0.10)' }}>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
            style={{ background: '#2E3250', color: '#F4F3E8' }}>
            EE
          </div>
          <div>
            <p className="text-[13px] font-semibold" style={{ color: '#2E3250' }}>The Extended Essay Academy</p>
            <p className="text-[11px]" style={{ color: '#9BAAB8' }}>Built from a real 32/34 Extended Essay</p>
          </div>
        </div>
      </div>
    </section>
  )
}
