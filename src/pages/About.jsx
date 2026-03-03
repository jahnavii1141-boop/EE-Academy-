import AnimateIn from '../components/ui/AnimateIn'
import { Link } from 'react-router-dom'

const TIMELINE = [
  { label: 'The problem', text: 'Like most IB students, I started my EE with no idea what I was doing. Six subjects, IAs piling up, college applications — and a 4,000-word research paper that felt impossible. My school gave me a supervisor and three meetings. That was it.' },
  { label: 'The system', text: 'So I built my own process. A research method I call the EE Dump. I reverse-engineered the IB criteria so every section targeted specific marks. I figured out which advice from my supervisor to take — and which to politely ignore.' },
  { label: 'The result', text: '32 out of 34. An A. And I didn\'t even proofread.' },
  { label: 'The realisation', text: 'After I graduated, I almost sold my essay on Clastify for $7. Then I realised — my essay isn\'t what\'s valuable. The process that created it is. A student can read my essay and learn nothing about how to write their own. But if I taught them exactly how I approached the research, structure, writing, and strategy? That\'s worth more than any single essay ever could be.' },
  { label: 'The course', text: 'So instead of selling fish for $7, I built a course that teaches you how to fish — for $67. This isn\'t a textbook written by a professor who hasn\'t been an IB student in 20 years. It\'s a system built by someone who was in your exact position recently enough to remember what actually helped and what was useless noise.' },
  { label: 'The tools', text: 'I ran my own essay through one of the most advanced AI models in the world and wrote honest commentary — including where the AI was wrong and where I\'d do things differently. I built the tools I wish I had: an interactive research workspace, a source tracker, a study calendar, and a timeline planner that works backwards from your deadline. Because PDFs collect dust. Tools get used.' },
]

export default function About() {
  return (
    <main className="bg-cream min-h-screen">

      {/* Hero */}
      <section className="bg-navy relative overflow-hidden py-24 px-6">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(221,217,196,1) 1px, transparent 1px), linear-gradient(90deg, rgba(221,217,196,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <AnimateIn>
            <div className="flex items-center gap-3 mb-6">
              <img src="/feather-nav.png" alt="" className="h-10 w-auto opacity-80" />
              <span className="text-parchment/60 text-sm font-medium tracking-wide">The Extended Essay Academy</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-cream leading-tight mb-6">
              I scored 32/34 on my<br />
              <span className="text-parchment">Extended Essay.</span>
            </h1>
            <p className="text-steel text-lg leading-relaxed max-w-2xl">
              Not because I'm a genius — because I figured out the system.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Intro */}
          <AnimateIn>
            <div className="rounded-2xl bg-parchment/60 border border-navy/10 p-8 mb-16">
              <p className="text-navy text-lg font-serif leading-relaxed italic">
                "If you're stressed about your EE, I get it. I was you. The difference is you have something I didn't — a complete system from someone who just did this and got the A."
              </p>
            </div>
          </AnimateIn>

          {/* Timeline */}
          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <AnimateIn key={i} delay={i * 0.07}>
                <div className="flex gap-8 pb-12">
                  {/* Line + dot */}
                  <div className="flex flex-col items-center flex-shrink-0 w-6">
                    <div className="w-3 h-3 rounded-full bg-navy mt-1 flex-shrink-0" />
                    {i < TIMELINE.length - 1 && (
                      <div className="w-px flex-1 bg-navy/15 mt-2" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-2">
                    <p className="text-xs font-bold text-navy/40 uppercase tracking-[0.15em] mb-2">{item.label}</p>
                    <p className="text-navy/80 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Score callout */}
          <AnimateIn>
            <div className="rounded-2xl bg-navy text-cream p-8 mb-12 flex flex-col sm:flex-row items-center gap-6">
              <div className="text-center sm:text-left flex-shrink-0">
                <p className="font-serif text-6xl font-bold text-parchment leading-none">32</p>
                <p className="text-steel text-sm mt-1">out of 34</p>
              </div>
              <div className="w-px h-16 bg-cream/10 hidden sm:block" />
              <p className="text-cream/75 leading-relaxed text-sm text-center sm:text-left">
                A grade. Built on a system — not talent. The same system now packaged into modules, tools, and commentary so you can replicate it without reinventing the wheel.
              </p>
            </div>
          </AnimateIn>

          {/* CTA */}
          <AnimateIn>
            <div className="text-center">
              <Link to="/#pricing" className="btn-primary inline-flex items-center gap-2">
                Start for Free
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <p className="text-ink-soft text-sm mt-3">Modules 1, 2 & 3 are free — no card required.</p>
            </div>
          </AnimateIn>

        </div>
      </section>
    </main>
  )
}
