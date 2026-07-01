'use client'

import { motion } from 'framer-motion'
import { StaggerContainer, staggerItem } from './ui/AnimateIn'

const MotionDiv = motion.div

const OUTCOMES = [
  { text: "You don't actually know if your research question can score, and you're scared to find out three weeks in.", bg: 'bg-cream' },
  { text: "You're writing, but you can't tell if it's real analysis or just describing things.", bg: 'bg-card-2' },
  { text: "You've read the criteria. You still don't really know what an examiner wants.", bg: 'bg-cream' },
  { text: 'You keep doing work and still feel behind.', bg: 'bg-card-2' },
  { text: 'Every "EE tip" online contradicts the last one.', bg: 'bg-cream' },
  { text: 'You\'re terrified of building the whole thing on the wrong structure.', bg: 'bg-card-2' },
]

export default function WhatYoullLearn() {
  return (
    <section id="learn" className="bg-parchment py-20 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="section-heading">If this sounds like you, you&apos;re not behind, you&apos;re missing a system.</h2>
        <p className="section-subheading">
          You&apos;re not stuck because you&apos;re lazy. You&apos;re stuck because nobody has shown you exactly
          what examiners reward and exactly how to get there. So you spin:
        </p>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

        <p className="max-w-3xl mx-auto text-center text-navy/80 text-lg leading-relaxed mt-12">
          You don&apos;t need more random advice. You need one clear system where every move maps to the
          markscheme. That&apos;s the entire point of this.
        </p>
      </div>
    </section>
  )
}
