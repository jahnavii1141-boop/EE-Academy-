import { Link } from 'react-router-dom'
import DisplayCards from '../components/ui/display-cards'
import { Code2, Sparkles, ArrowRight } from 'lucide-react'

const CARD_CLASS_1 = '[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[\'\'] before:bg-blend-overlay before:bg-cream/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0'
const CARD_CLASS_2 = '[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[\'\'] before:bg-blend-overlay before:bg-cream/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0'
const CARD_CLASS_3 = '[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10'

const EE_COURSE = {
  id: 'extended-essay',
  title: 'Extended Essay Masterclass',
  subtitle: '14 Modules · 72 Lessons · Built by a 32/34 student',
  level: 'All Levels',
  duration: '24h',
  students: '4,200+',
  accent: 'bg-parchment',
  startHref: '/dashboard',
  free: true,
  cards: [
    { icon: <Code2 className="size-4 text-navy" />, title: 'Module 1', description: 'Mindset & Intro', date: 'Free', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_1 },
    { icon: <Code2 className="size-4 text-navy" />, title: 'Module 7', description: 'EE Structure', date: 'Pro', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_2 },
    { icon: <Code2 className="size-4 text-navy" />, title: 'Module 13', description: '32/34 Analysis', date: 'Pro', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_3 },
  ],
}

export default function AboutCourses() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <span className="inline-flex items-center gap-1.5 bg-parchment text-navy text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-navy/10">
          <Sparkles className="size-3" />
          Extended Essay Programme
        </span>
        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-navy leading-tight mb-4 tracking-tight">
          The Course
        </h1>
        <p className="text-base text-ink-soft max-w-xl mx-auto leading-relaxed">
          Hover the stacked cards to explore modules. Click to begin learning.
        </p>
      </div>

      {/* Single course — centred */}
      <div className="max-w-md mx-auto px-6 pb-20">
        <div className={`bento-card ${EE_COURSE.accent} flex flex-col justify-between group border border-navy/8`}>
          {/* Top: meta */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-navy/10 bg-parchment text-navy">
                {EE_COURSE.level}
              </span>
              <div className="flex gap-3 text-xs text-ink-soft">
                <span>{EE_COURSE.duration}</span>
                <span>{EE_COURSE.students} students</span>
              </div>
            </div>
            <h2 className="text-base font-bold text-navy leading-snug mb-1">{EE_COURSE.title}</h2>
            <p className="text-xs text-ink-soft">{EE_COURSE.subtitle}</p>
          </div>

          {/* Middle: DisplayCards */}
          <div className="flex justify-center my-4 overflow-hidden">
            <div className="scale-[0.72] origin-left -ml-8">
              <DisplayCards cards={EE_COURSE.cards} />
            </div>
          </div>

          {/* Bottom: CTA */}
          <Link
            to={EE_COURSE.startHref}
            className="mt-6 flex items-center justify-between bg-navy/8 hover:bg-navy/15 transition-colors rounded-xl px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-navy">Start Course</span>
              <span className="text-xs font-semibold text-green-700 bg-green-100 border border-green-200 px-2 py-0.5 rounded-full">
                Free Preview
              </span>
            </div>
            <ArrowRight className="size-4 text-ink-soft group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
