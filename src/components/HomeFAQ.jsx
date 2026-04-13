import { Link } from 'react-router-dom'
import AnimateIn from './ui/AnimateIn'

const FAQ_ITEMS = [
  {
    question: 'Can I start for free?',
    answer: 'Yes. You can start with free modules before deciding whether to unlock full access.',
  },
  {
    question: 'Is this built for the current IB syllabus?',
    answer: 'Yes. The lessons are designed for current IB EE expectations and assessment criteria.',
  },
  {
    question: 'How quickly can I improve?',
    answer: 'It depends on your baseline and effort, but students often improve quickly when they follow a criteria-first process.',
  },
  {
    question: 'What do I get with full access?',
    answer: 'You unlock the full EE system, including the step-by-step blueprint, templates, tools, and guidance to improve your grade with much more clarity.',
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
            <Link to="/course/module-1" className="btn-primary text-sm">Start Free</Link>
            <Link to="/pricing" className="btn-outline text-sm">Get Full Access</Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
