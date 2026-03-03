import { motion } from 'framer-motion'
import { StaggerContainer, staggerItem } from './ui/AnimateIn'

const OUTCOMES = [
  { text: 'Choose a focused, scoreable research question', bg: 'bg-cream' },
  { text: 'Structure your argument with academic rigour', bg: 'bg-card-2' },
  { text: 'Find and cite credible sources correctly', bg: 'bg-cream' },
  { text: 'Write a compelling introduction and conclusion', bg: 'bg-card-2' },
  { text: 'Meet IB assessment criteria at every level', bg: 'bg-cream' },
  { text: 'Produce a polished, examiner-ready final draft', bg: 'bg-card-2' },
  { text: 'Navigate the reflection and viva voce process', bg: 'bg-cream' },
  { text: 'Submit with confidence — and earn a top grade', bg: 'bg-card-2' },
]

export default function WhatYoullLearn() {
  return (
    <section id="learn" className="bg-parchment py-20 px-6 relative overflow-hidden">
      {/* Decorative feather accent */}
      <img
        src="/feather-md.png"
        alt=""
        className="absolute top-8 right-8 h-40 w-auto opacity-[0.07] pointer-events-none select-none"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="section-heading">What You'll Learn</h2>
        <p className="section-subheading">
          By the end of the programme, you'll have the skills and confidence to submit an Extended Essay you're proud of.
        </p>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OUTCOMES.map(({ text, bg }, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className={`bento-card ${bg} flex flex-col justify-between min-h-[120px] border border-navy/5`}
            >
              <p className="text-sm font-medium text-navy leading-relaxed">{text}</p>
              <span className="mt-4 w-6 h-6 rounded-full bg-navy/10 flex items-center justify-center self-end flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-navy" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
