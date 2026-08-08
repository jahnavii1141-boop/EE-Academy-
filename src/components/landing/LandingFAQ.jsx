// Four, max. Honest answers; the third does real work given the DMs.
const FAQS = [
  {
    q: "I'm in DP1 or DP2 — is it too early or too late?",
    a: "Neither. DP1 is the ideal time — you pick a question you can actually finish. In DP2 the later lessons (structure, turning description into analysis, the first and last 300 words, the reflections) are built for exactly the crunch you're in. Start wherever you are; the lessons run in order but open in any order.",
  },
  {
    q: 'Does it cover my subject?',
    a: 'The worked example is a Business Management essay — the real 32/34 essay you can open in the free lessons. The system itself is subject-agnostic: the criteria, the structure, and the move from description to analysis are the same in a science, a humanity, or a language. Lesson 03 is about choosing and framing for your specific subject.',
  },
  {
    q: 'What if my supervisor tells me something different?',
    a: 'Follow your supervisor on anything specific to your essay — they know your school and your examiners. This course is the reasoning most supervisors do not have time to spell out across twenty students, so you can have that conversation from a stronger position. Where they differ, they win.',
  },
  {
    q: 'Refunds?',
    a: '30-day money-back guarantee. If the course is not what you needed, email us within 30 days for a full refund.',
  },
]

export default function LandingFAQ() {
  return (
    <section className="bg-cream px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy mb-10">Questions</h2>
        <div className="space-y-8">
          {FAQS.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-navy text-[1.0625rem] mb-2">{f.q}</h3>
              <p className="text-[15px] leading-[1.7] text-navy/80">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
