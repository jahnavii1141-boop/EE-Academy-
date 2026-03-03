import { Link } from 'react-router-dom'
import DisplayCards from '../components/ui/display-cards'
import {
  Code2, BarChart3, Palette, Globe, Brain, Shield, Sparkles, ArrowRight,
} from 'lucide-react'

const CARD_CLASS_1 = '[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[\'\'] before:bg-blend-overlay before:bg-cream/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0'
const CARD_CLASS_2 = '[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[\'\'] before:bg-blend-overlay before:bg-cream/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0'
const CARD_CLASS_3 = '[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10'

const COURSES = [
  {
    id: 'extended-essay',
    title: 'Extended Essay Masterclass',
    subtitle: '14 Modules · 72 Lessons · Built by a 32/34 student',
    level: 'All Levels',
    duration: '24h',
    students: '4,200+',
    accent: 'bg-parchment',
    startHref: '/course/module-1',
    free: true,
    cards: [
      { icon: <Code2 className="size-4 text-navy" />, title: 'Module 1', description: 'Mindset & Intro', date: 'Free', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_1 },
      { icon: <Code2 className="size-4 text-navy" />, title: 'Module 7', description: 'EE Structure', date: 'Pro', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_2 },
      { icon: <Code2 className="size-4 text-navy" />, title: 'Module 13', description: '32/34 Analysis', date: 'Pro', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_3 },
    ],
  },
  {
    id: 'tok-essay',
    title: 'TOK Essay & Exhibition',
    subtitle: 'Knowledge Questions · AOKs · Linking',
    level: 'Intermediate',
    duration: '18h',
    students: '2,800+',
    accent: 'bg-card-2',
    cards: [
      { icon: <Brain className="size-4 text-navy" />, title: 'Module 1', description: 'Knowledge Questions', date: '5 lessons', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_1 },
      { icon: <Brain className="size-4 text-navy" />, title: 'Module 2', description: 'Areas of Knowledge', date: '6 lessons', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_2 },
      { icon: <Brain className="size-4 text-navy" />, title: 'Module 3', description: 'Exhibition & Objects', date: '5 lessons', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_3 },
    ],
  },
  {
    id: 'ib-writing',
    title: 'IB Academic Writing',
    subtitle: 'Essays · Reports · Citations · Tone',
    level: 'Beginner',
    duration: '16h',
    students: '3,100+',
    accent: 'bg-card-1',
    cards: [
      { icon: <Palette className="size-4 text-navy" />, title: 'Module 1', description: 'Academic Style', date: '4 lessons', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_1 },
      { icon: <Palette className="size-4 text-navy" />, title: 'Module 2', description: 'Argumentation', date: '5 lessons', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_2 },
      { icon: <Palette className="size-4 text-navy" />, title: 'Module 3', description: 'Citations & Referencing', date: '5 lessons', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_3 },
    ],
  },
  {
    id: 'research-skills',
    title: 'Research Skills for IB',
    subtitle: 'Databases · Evaluation · Note-Taking',
    level: 'Beginner',
    duration: '12h',
    students: '1,900+',
    accent: 'bg-card-3',
    cards: [
      { icon: <Globe className="size-4 text-navy" />, title: 'Module 1', description: 'Academic Databases', date: '4 lessons', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_1 },
      { icon: <Globe className="size-4 text-navy" />, title: 'Module 2', description: 'Source Evaluation', date: '4 lessons', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_2 },
      { icon: <Globe className="size-4 text-navy" />, title: 'Module 3', description: 'Note-Taking Systems', date: '4 lessons', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_3 },
    ],
  },
  {
    id: 'score-maximiser',
    title: 'Score Maximiser',
    subtitle: 'Examiner Insights · Rubrics · Models',
    level: 'Advanced',
    duration: '10h',
    students: '1,500+',
    accent: 'bg-card-4',
    cards: [
      { icon: <BarChart3 className="size-4 text-navy" />, title: 'Module 1', description: 'IB Rubric Deep Dive', date: '3 lessons', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_1 },
      { icon: <BarChart3 className="size-4 text-navy" />, title: 'Module 2', description: 'Annotated Model Essays', date: '4 lessons', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_2 },
      { icon: <BarChart3 className="size-4 text-navy" />, title: 'Module 3', description: 'Examiner Tips', date: '3 lessons', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_3 },
    ],
  },
  {
    id: 'viva-voce',
    title: 'Viva Voce & RPPF',
    subtitle: 'Reflections · Oral Defence · Submission',
    level: 'All Levels',
    duration: '8h',
    students: '1,200+',
    accent: 'bg-card-5',
    cards: [
      { icon: <Shield className="size-4 text-navy" />, title: 'Module 1', description: 'Writing the RPPF', date: '3 lessons', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_1 },
      { icon: <Shield className="size-4 text-navy" />, title: 'Module 2', description: 'Viva Preparation', date: '3 lessons', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_2 },
      { icon: <Shield className="size-4 text-navy" />, title: 'Module 3', description: 'Submission Checklist', date: '2 lessons', iconClassName: 'text-navy', titleClassName: 'text-navy', className: CARD_CLASS_3 },
    ],
  },
]

const LEVEL_COLORS = {
  'All Levels': 'bg-parchment text-navy',
  Beginner:     'bg-card-1 text-navy',
  Intermediate: 'bg-card-2 text-navy',
  Advanced:     'bg-navy text-cream',
}

export default function AboutCourses() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
        <span className="inline-flex items-center gap-1.5 bg-parchment text-navy text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-navy/10">
          <Sparkles className="size-3" />
          6 Courses Available
        </span>
        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-navy leading-tight mb-4 tracking-tight">
          All Courses
        </h1>
        <p className="text-base text-ink-soft max-w-xl mx-auto leading-relaxed">
          Hover the stacked cards to explore each module. Click a course to begin.
        </p>
      </div>

      {/* Course grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {COURSES.map((course) => (
          <div key={course.id} className={`bento-card ${course.accent} flex flex-col justify-between group border border-navy/8`}>
            {/* Top: meta */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border border-navy/10 ${LEVEL_COLORS[course.level]}`}>
                  {course.level}
                </span>
                <div className="flex gap-3 text-xs text-ink-soft">
                  <span>{course.duration}</span>
                  <span>{course.students} students</span>
                </div>
              </div>
              <h2 className="text-base font-bold text-navy leading-snug mb-1">{course.title}</h2>
              <p className="text-xs text-ink-soft">{course.subtitle}</p>
            </div>

            {/* Middle: DisplayCards */}
            <div className="flex justify-center my-4 overflow-hidden">
              <div className="scale-[0.72] origin-left -ml-8">
                <DisplayCards cards={course.cards} />
              </div>
            </div>

            {/* Bottom: CTA */}
            <Link
              to={course.startHref || `/courses/${course.id}`}
              className="mt-6 flex items-center justify-between bg-navy/8 hover:bg-navy/15 transition-colors rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-navy">Start Course</span>
                {course.free && (
                  <span className="text-xs font-semibold text-green-700 bg-green-100 border border-green-200 px-2 py-0.5 rounded-full">
                    Free Preview
                  </span>
                )}
              </div>
              <ArrowRight className="size-4 text-ink-soft group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
