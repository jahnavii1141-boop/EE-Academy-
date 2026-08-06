'use client'

import Link from 'next/link'
import AnimateIn from './ui/AnimateIn'

const FAQ_ITEMS = [
  {
    question: 'Can I start for free?',
    answer: "Yes, your first missions are free and you don't need a card. Unlock the full system whenever you're ready.",
  },
  {
    question: 'Do you write the essay for me?',
    answer: "No. This is a self-study system, we teach you how to research, structure, and write it yourself. Every word stays yours. That's the whole point: examiners can tell when it isn't, and so can you.",
  },
  {
    question: 'Is it built for the current IB syllabus?',
    answer: 'Yes, everything maps to the current EE assessment criteria.',
  },
  {
    question: 'How fast can I improve?',
    answer: "Most students find their essay gets clearer within the first few modules, because you stop guessing and start matching the markscheme. How far you go depends on your effort, but you'll never again wonder what “good” actually looks like.",
  },
  {
    question: "What if I'm completely out of time?",
    answer: "Start with the 1-Day Protocol. It's built for exactly that, the highest-impact fixes when the deadline is tomorrow.",
  },
]

export default function HomeFAQ() {
  return (
    <section className="bg-cream py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimateIn>
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="section-subheading">Clear answers before you start following the system.</p>
        </AnimateIn>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <AnimateIn key={i} delay={0.05 * (i + 1)}>
              <div className="rounded-xl border border-navy/10 bg-white px-5 py-4">
                <h3 className="text-sm font-semibold text-navy mb-1.5">{item.question}</h3>
                <p className="text-sm text-ink-soft">{item.answer}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.2}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/course/module-1" className="btn-primary text-sm">Start Free</Link>
            <Link href="/pricing" className="btn-outline text-sm">Get Full Access</Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
