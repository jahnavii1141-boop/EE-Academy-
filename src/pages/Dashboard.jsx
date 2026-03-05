import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import {
  Brain, Search, BookOpen, PenLine, Trophy, Star,
  Lock, ChevronRight, CheckCircle,
} from 'lucide-react'
import { DASHBOARD_SECTIONS } from '../data/dashboardData'
import { useModuleProgress } from '../hooks/useModuleProgress'

// Map icon name strings to Lucide components
const ICON_MAP = { Brain, Search, BookOpen, PenLine, Trophy, Star }

// Circled unicode numbers: ①②③④
const CIRCLED = ['①', '②', '③', '④']

// Access badge config
const ACCESS_BADGE = {
  free: { label: 'Free', className: 'bg-green-100 text-green-700 border-green-200' },
  half: { label: 'Partly Free', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  locked: { label: 'Full Access', className: 'bg-navy/10 text-navy border-navy/15' },
  premium: { label: 'Premium Only', className: 'bg-purple-100 text-purple-700 border-purple-200' },
}

function SectionCard({ section, progressFraction, onClick }) {
  const Icon = ICON_MAP[section.icon] || Brain
  const isLocked = section.accessLevel === 'locked' || section.accessLevel === 'premium'
  const badge = ACCESS_BADGE[section.accessLevel]
  const progressPercent = Math.round(progressFraction * 100)

  return (
    <div
      onClick={onClick}
      className={`${section.cardColor} border ${section.borderColor} rounded-2xl p-6 cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between min-h-[260px] relative group`}
    >
      {/* Top row: icon + badges */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.accentColor} bg-opacity-20`}>
          <Icon className="w-5 h-5 text-navy" strokeWidth={1.8} />
        </div>
        <div className="flex items-center gap-2">
          {section.badge && (
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${section.badgeStyle}`}>
              {section.badge}
            </span>
          )}
          {isLocked && (
            <Lock className="w-4 h-4 text-navy/40" strokeWidth={1.8} />
          )}
          {!isLocked && progressPercent === 100 && (
            <CheckCircle className="w-4 h-4 text-green-500" strokeWidth={1.8} />
          )}
        </div>
      </div>

      {/* Title + tagline */}
      <div className="mb-4">
        <h3 className="font-serif text-base font-bold text-navy leading-snug mb-1">
          {section.title}
        </h3>
        <p className="text-xs text-navy/60 leading-relaxed">{section.tagline}</p>
      </div>

      {/* Step preview */}
      <div className="mb-4 space-y-1.5">
        {section.stepLabels.slice(0, 3).map((label, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-navy/55">
            <span className="text-navy/35 font-mono text-[11px] flex-shrink-0">{CIRCLED[i]}</span>
            <span className="truncate">{label.replace(/^Module \d+: /, '').replace(/^AI Module: /, '')}</span>
          </div>
        ))}
        {section.stepLabels.length > 3 && (
          <div className="text-xs text-navy/40 pl-4">
            +{section.stepLabels.length - 3} more
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-medium text-navy/40 uppercase tracking-wide">
            Progress
          </span>
          <span className="text-[10px] font-semibold text-navy/50">
            {progressPercent}%
          </span>
        </div>
        <div className="h-1.5 bg-navy/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-navy/40 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Footer row */}
      <div className="flex items-center justify-between">
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${badge.className}`}>
          {badge.label}
        </span>
        <span className="flex items-center gap-0.5 text-xs font-medium text-navy/50 group-hover:text-navy transition-colors">
          {section.moduleIds.length} {section.moduleIds.length === 1 ? 'module' : 'modules'}
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useUser()
  const { getSectionProgress } = useModuleProgress()

  const firstName = user?.firstName || ''

  return (
    <div className="min-h-screen bg-cream">
      {/* Welcome header */}
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="mb-2">
          <span className="inline-flex items-center bg-parchment text-navy text-xs font-semibold px-3 py-1.5 rounded-full border border-navy/12 tracking-wide mb-4">
            ★ Premium Extended Essay Course
          </span>
        </div>
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-navy mb-2">
          {firstName ? `Welcome back, ${firstName}.` : 'Welcome.'}{' '}
          <span className="text-navy/50 font-normal">Start learning.</span>
        </h1>
        <p className="text-sm text-ink-soft max-w-lg">
          Premium Extended Essay Course · 14 modules · Built by a real 32/34 IB student.
          Work through each section in order for the best results.
        </p>
      </div>

      {/* Section grid */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {DASHBOARD_SECTIONS.map((section) => (
            <SectionCard
              key={section.id}
              section={section}
              progressFraction={getSectionProgress(section.moduleIds)}
              onClick={() => navigate(`/dashboard/${section.id}`)}
            />
          ))}
        </div>

        {/* Buy full access CTA */}
        <div className="mt-10 rounded-2xl bg-navy px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-serif text-base font-bold text-cream mb-1">
              Ready to unlock everything?
            </p>
            <p className="text-sm text-steel">
              Get lifetime access to all 14 modules, templates, tools &amp; AI prompts.
            </p>
          </div>
          <button
            onClick={() => navigate('/pricing')}
            className="flex-shrink-0 bg-cream text-navy font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-parchment transition-colors"
          >
            Buy Full Access →
          </button>
        </div>
      </div>
    </div>
  )
}
