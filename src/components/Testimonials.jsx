import { motion } from 'framer-motion'
import AnimateIn, { StaggerContainer, staggerItem } from './ui/AnimateIn'
import { useCountUp } from '../hooks/useCountUp'

const TESTIMONIALS = [
  {
    quote: 'I went from a C to an A on my EE. The module on assessment criteria was a game-changer — I finally understood what examiners actually want.',
    name: 'Sarah K.',
    role: 'IB Diploma Student, Class of 2025',
    initials: 'SK',
    subject: 'English A EE',
    score: 'A — 32/34',
  },
  {
    quote: "My supervisor was barely available, so I relied on this course completely. The step-by-step writing modules were exactly what I needed to structure my argument.",
    name: 'Marcus R.',
    role: 'IB Student, Year 2',
    initials: 'MR',
    subject: 'History EE',
    score: 'A — 30/34',
  },
  {
    quote: "I was so stressed about the RPPF and viva voce — this course walked me through everything. I submitted feeling prepared, not panicked.",
    name: 'Priya M.',
    role: 'IB Student, Year 2',
    initials: 'PM',
    subject: 'Biology EE',
    score: 'B — 25/34',
  },
]

function StatCounter({ end, suffix, label }) {
  const { ref, value } = useCountUp(end, 1.5)
  return (
    <div ref={ref} className="bento-card bg-cream/8 text-center py-6 border border-cream/10">
      <p className="text-2xl font-serif font-bold text-cream">
        {value.toLocaleString()}{suffix}
      </p>
      <p className="text-xs text-steel mt-1">{label}</p>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-navy py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimateIn>
          <h2 className="section-heading-light">What Students Say</h2>
          <p className="section-subheading-light">
            Join thousands of IB students who've transformed their Extended Essay results.
          </p>
        </AnimateIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-4 mb-12">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bento-card bg-cream/8 flex flex-col justify-between border border-cream/10"
            >
              <div>
                {/* Subject + Score tags */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-cream bg-cream/10 px-2.5 py-1 rounded-full">
                    {t.subject}
                  </span>
                  <span className="text-xs font-bold text-cream/70">
                    {t.score}
                  </span>
                </div>

                {/* Decorative quote mark */}
                <span className="font-serif text-5xl text-cream/10 leading-none block -mb-2">"</span>

                <p className="text-sm text-cream leading-relaxed">{t.quote}</p>
              </div>

              <div className="flex items-center gap-3 mt-6">
                <div className="w-9 h-9 rounded-xl bg-cream/15 border border-cream/10 flex items-center justify-center text-cream text-xs font-bold flex-shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-cream">{t.name}</p>
                  <p className="text-xs text-steel">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Stats bar with counters */}
        <AnimateIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCounter end={4200} suffix="+" label="Students Enrolled" />
            <StatCounter end={49} suffix="/5" label="Average Rating" />
            <StatCounter end={94} suffix="%" label="Completion Rate" />
            <div className="bento-card bg-cream/8 text-center py-6 border border-cream/10">
              <p className="text-2xl font-serif font-bold text-cream">30-Day</p>
              <p className="text-xs text-steel mt-1">Money-Back Guarantee</p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
