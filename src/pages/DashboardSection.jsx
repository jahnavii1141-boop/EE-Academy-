import { useParams, useNavigate, Link, Navigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import {
  ArrowLeft, ArrowRight, Lock, CheckCircle,
  ChevronRight, Brain, Search, BookOpen, PenLine, Trophy, Star,
  Calendar, FileText, ExternalLink,
} from 'lucide-react'
import { DASHBOARD_SECTIONS } from '../data/dashboardData'
import { COURSE_MODULES } from '../data/courseContent'
import { useModuleProgress } from '../hooks/useModuleProgress'

// Circled unicode numbers: ①②③
const CIRCLED = ['①', '②', '③', '④', '⑤']

const ICON_MAP = { Brain, Search, BookOpen, PenLine, Trophy, Star }
const TOOL_ICON_MAP = { Calendar, FileText, ExternalLink }

// Convert heading text to a URL-safe id
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Build the sidebar table of contents from module content
function buildTOC(moduleIds) {
  return moduleIds
    .map((id) => {
      const mod = COURSE_MODULES.find((m) => m.id === id)
      if (!mod) return null
      const headings = mod.content
        .filter((block) => block.type === 'heading')
        .map((block) => ({ text: block.text, slug: slugify(block.text) }))
      return { moduleId: id, number: mod.number, title: mod.title, free: mod.free, headings }
    })
    .filter(Boolean)
}

// Determine if a step is locked
function isStepLocked(module, accessLevel, isSignedIn) {
  if (accessLevel === 'free') return false
  if (module.free) return false // always open if module itself is free
  if (accessLevel === 'half') return !isSignedIn // half: open only free modules
  // 'locked' and 'premium' — gated for everyone without payment; use isSignedIn as proxy for now
  return !isSignedIn
}

// ─── Sidebar TOC ────────────────────────────────────────────────────────────

function SidebarTOC({ toc, activeModuleId }) {
  const handleClick = (slug) => {
    const el = document.getElementById(slug)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="text-sm">
      <p className="text-[10px] font-semibold text-navy/35 uppercase tracking-widest mb-3 px-1">
        Contents
      </p>
      {toc.map((item, idx) => (
        <div key={item.moduleId} className="mb-4">
          {/* Module title */}
          <button
            onClick={() => handleClick(slugify(item.title))}
            className={`w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeModuleId === item.moduleId
                ? 'bg-navy/8 text-navy'
                : 'text-navy/60 hover:text-navy hover:bg-navy/5'
            }`}
          >
            <span className="font-mono text-[10px] text-navy/30 mr-1.5">{item.number}</span>
            {item.title}
          </button>
          {/* Sub-headings */}
          {item.headings.length > 0 && (
            <div className="ml-4 mt-0.5 space-y-0.5">
              {item.headings.slice(0, 5).map((h) => (
                <button
                  key={h.slug}
                  onClick={() => handleClick(h.slug)}
                  className="w-full text-left px-2 py-1 rounded text-[11px] text-navy/45 hover:text-navy/70 hover:bg-navy/5 transition-colors truncate"
                >
                  {h.text}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}

// ─── Step Card ───────────────────────────────────────────────────────────────

function StepCard({ module, stepNumber, isLocked, isVisited }) {
  const subHeadings = module.content
    .filter((b) => b.type === 'heading')
    .slice(0, 3)

  return (
    <div
      id={slugify(module.title)}
      className={`rounded-2xl border p-6 transition-all ${
        isLocked
          ? 'border-navy/8 bg-white/40 opacity-75'
          : isVisited
          ? 'border-navy/12 bg-white/70'
          : 'border-navy/10 bg-white/60'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {/* Step number */}
        <span className="w-8 h-8 rounded-full bg-navy text-cream font-bold text-sm flex items-center justify-center flex-shrink-0">
          {stepNumber}
        </span>
        {/* Module number badge */}
        <span className="w-8 h-8 rounded-full bg-parchment text-navy font-serif font-bold text-xs flex items-center justify-center flex-shrink-0 border border-navy/10">
          {module.number}
        </span>
        <div className="flex-1 min-w-0" />
        {isVisited && !isLocked && (
          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" strokeWidth={1.8} />
        )}
        {isLocked && (
          <Lock className="w-4 h-4 text-navy/30 flex-shrink-0" strokeWidth={1.8} />
        )}
        {module.free && !isLocked && (
          <span className="text-[10px] font-semibold text-green-700 bg-green-100 border border-green-200 px-2 py-0.5 rounded-full">
            FREE
          </span>
        )}
      </div>

      {/* Title + tagline */}
      <h3 className="font-serif text-lg font-bold text-navy mb-1 leading-snug">
        {module.title}
      </h3>
      <p className="text-sm text-navy/55 mb-4 leading-relaxed">{module.tagline}</p>

      {/* Sub-steps */}
      {subHeadings.length > 0 && (
        <div className="space-y-2 mb-5">
          {subHeadings.map((h, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 text-sm transition-colors ${
                isLocked ? 'text-navy/30' : 'text-navy/60'
              }`}
            >
              <span className="text-navy/30 font-mono text-xs flex-shrink-0 mt-0.5">
                {CIRCLED[i]}
              </span>
              <span className="leading-snug">{h.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      {!isLocked ? (
        <Link
          to={`/course/${module.id}`}
          className="inline-flex items-center gap-2 bg-navy text-cream font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-navy/85 transition-colors"
        >
          {isVisited ? 'Review Module' : 'Start Module'}
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <Link
          to="/pricing"
          className="inline-flex items-center gap-2 border border-navy/15 text-navy/40 font-semibold text-sm px-4 py-2.5 rounded-xl hover:border-navy/30 hover:text-navy/60 transition-colors"
        >
          🔒 Unlock with Full Access
        </Link>
      )}
    </div>
  )
}

// ─── Paywall banner ──────────────────────────────────────────────────────────

function SectionPaywall({ accessLevel }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-navy/4 p-6 text-center">
      <div className="text-2xl mb-3">🔒</div>
      <h4 className="font-serif text-base font-bold text-navy mb-2">
        {accessLevel === 'premium' ? 'Premium Only' : 'Full Access Required'}
      </h4>
      <p className="text-sm text-navy/55 mb-4 max-w-xs mx-auto">
        {accessLevel === 'premium'
          ? 'Upgrade to Premium to unlock the Bonus Vault, including all templates, tools and SOPs.'
          : 'Get Full Access to unlock all modules in this section and continue your EE journey.'}
      </p>
      <Link
        to="/pricing"
        className="inline-flex items-center gap-2 bg-navy text-cream font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-navy/85 transition-colors"
      >
        View Pricing
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DashboardSection() {
  const { sectionId } = useParams()
  const navigate = useNavigate()
  const { isSignedIn } = useAuth()
  const { getSectionProgress, isVisited } = useModuleProgress()

  const section = DASHBOARD_SECTIONS.find((s) => s.id === sectionId)
  if (!section) return <Navigate to="/dashboard" replace />

  const sectionModules = section.moduleIds
    .map((id) => COURSE_MODULES.find((m) => m.id === id))
    .filter(Boolean)

  const toc = buildTOC(section.moduleIds)
  const progressFraction = getSectionProgress(section.moduleIds)
  const progressPercent = Math.round(progressFraction * 100)

  const sectionIndex = DASHBOARD_SECTIONS.findIndex((s) => s.id === sectionId)
  const prevSection = DASHBOARD_SECTIONS[sectionIndex - 1]
  const nextSection = DASHBOARD_SECTIONS[sectionIndex + 1]

  const Icon = ICON_MAP[section.icon] || Brain
  const hasLockedContent = section.accessLevel === 'locked' || section.accessLevel === 'premium'

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar — sticky below Navbar (h-14 = 56px) */}
      <div className="sticky top-14 z-10 bg-cream/90 backdrop-blur-sm border-b border-navy/8 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-sm font-medium text-navy/50 hover:text-navy transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </button>
          <span className="text-navy/20">/</span>
          <span className="text-sm font-semibold text-navy truncate">{section.title}</span>
          <div className="flex-1" />
          <span className="text-xs text-navy/40 font-medium tabular-nums hidden sm:block">
            {progressPercent}% complete
          </span>
        </div>
        {/* Progress fill bar */}
        <div className="h-0.5 bg-navy/5">
          <div
            className="h-full bg-navy/30 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8 items-start">
          {/* Sidebar — sticky, hidden on mobile */}
          <aside className="hidden lg:block w-60 flex-shrink-0 sticky top-28 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <SidebarTOC toc={toc} activeModuleId={null} />
          </aside>

          {/* Content area */}
          <main className="flex-1 min-w-0">
            {/* Section header */}
            <div className={`${section.cardColor} border ${section.borderColor} rounded-2xl p-6 mb-8`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.accentColor} bg-opacity-20`}>
                  <Icon className="w-5 h-5 text-navy" strokeWidth={1.8} />
                </div>
                {section.badge && (
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${section.badgeStyle}`}>
                    {section.badge}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-2xl font-bold text-navy mb-1">{section.title}</h1>
              <p className="text-sm text-navy/60">{section.tagline}</p>
            </div>

            {/* Steps */}
            <div className="space-y-4">
              {sectionModules.map((module, index) => {
                const locked = isStepLocked(module, section.accessLevel, isSignedIn)
                const visited = isVisited(module.id)
                return (
                  <StepCard
                    key={module.id}
                    module={module}
                    stepNumber={index + 1}
                    isLocked={locked}
                    isVisited={visited}
                  />
                )
              })}

              {/* Bonus Vault interactive tools */}
              {section.interactiveTools && section.interactiveTools.length > 0 && (
                <div className="rounded-2xl border border-navy/10 bg-white/60 p-6">
                  <h3 className="font-serif text-base font-bold text-navy mb-4">
                    Interactive Tools
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {section.interactiveTools.map((tool) =>
                      tool.comingSoon ? (
                        <div
                          key={tool.label}
                          className="flex items-center gap-3 border border-navy/10 rounded-xl px-4 py-3 opacity-50 cursor-not-allowed"
                        >
                          <span className="text-sm font-semibold text-navy flex-1">{tool.label}</span>
                          <span className="text-[10px] font-semibold text-navy/40 bg-navy/8 px-2 py-0.5 rounded-full">Soon</span>
                        </div>
                      ) : (
                        <Link
                          key={tool.label}
                          to={tool.href}
                          className="flex items-center gap-3 border border-navy/10 rounded-xl px-4 py-3 hover:bg-navy/5 transition-colors group"
                        >
                          <span className="text-sm font-semibold text-navy flex-1">{tool.label}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-navy/30 group-hover:text-navy/60 transition-colors" />
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Paywall prompt */}
              {hasLockedContent && !isSignedIn && (
                <SectionPaywall accessLevel={section.accessLevel} />
              )}
            </div>

            {/* Section navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-navy/10">
              {prevSection ? (
                <button
                  onClick={() => navigate(`/dashboard/${prevSection.id}`)}
                  className="flex items-center gap-2 text-sm font-medium text-navy/50 hover:text-navy transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:block">{prevSection.title}</span>
                  <span className="sm:hidden">Previous</span>
                </button>
              ) : (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 text-sm font-medium text-navy/50 hover:text-navy transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </button>
              )}

              {nextSection ? (
                <button
                  onClick={() => navigate(`/dashboard/${nextSection.id}`)}
                  className="flex items-center gap-2 text-sm font-medium text-navy/60 hover:text-navy transition-colors"
                >
                  <span className="hidden sm:block">{nextSection.title}</span>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
