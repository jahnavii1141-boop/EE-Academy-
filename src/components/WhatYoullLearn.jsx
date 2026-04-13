import { motion } from 'framer-motion'
import { StaggerContainer, staggerItem } from './ui/AnimateIn'

const MotionDiv = motion.div

const OUTCOMES = [
  { text: "You don't know if your research question is actually good enough", bg: 'bg-cream' },
  { text: "You're writing, but you're not sure if your essay is analytical or just descriptive", bg: 'bg-card-2' },
  { text: "You don't fully understand what examiners are looking for", bg: 'bg-cream' },
  { text: 'You keep doing work, but still feel behind and unsure', bg: 'bg-card-2' },
  { text: 'You are scared of wasting time on the wrong structure or evidence', bg: 'bg-cream' },
  { text: 'You want a high grade, but the whole process feels messy', bg: 'bg-card-2' },
  { text: 'You need a clear system, not more random advice', bg: 'bg-cream' },
  { text: 'This is exactly what the EE System fixes', bg: 'bg-card-2' },
]

export default function WhatYoullLearn() {
  return (
    <section id="learn" className="bg-parchment py-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="section-heading">If your Extended Essay feels like this...</h2>
        <p className="section-subheading">
          Most IB students are not failing because they are lazy. They are stuck because nobody has shown them a clear process to follow.
        </p>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OUTCOMES.map(({ text, bg }, i) => (
            <MotionDiv
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
            </MotionDiv>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
