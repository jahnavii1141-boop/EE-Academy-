'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import {
  ArrowLeft, ArrowRight, Lock, CheckCircle,
  ChevronRight, Brain, Search, BookOpen, PenLine, Trophy, Star,
  Calendar, FileText, ExternalLink,
} from 'lucide-react'
import { DASHBOARD_SECTIONS } from '../data/dashboardData'
import { COURSE_CATALOG } from '../data/courseCatalog'
import { useModuleProgress } from '../hooks/useModuleProgress'

const ICON_MAP = { Brain, Search, BookOpen, PenLine, Trophy, Star }

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function buildTOC(moduleIds) {
  return moduleIds
    .map((id) => {
      const mod = COURSE_CATALOG.find((m) => m.id === id)
      if (!mod) return null
      return { moduleId: id, number: mod.number, title: mod.title, free: mod.free, headings: [] }
    })
    .filter(Boolean)
}

function isStepLocked(module, accessLevel, isSignedIn) {
  if (accessLevel === 'free') return false
  if (module.free) return false
  if (accessLevel === 'half') return !isSignedIn
  return !isSignedIn
}

function stripDashboardLabel(label) {
  return label.replace(/^Module \d+: /, '').replace(/^AI Module: /, '')
}

function SidebarTOC({ toc }) {
  const handleClick = (slug) => {
    const el = document.getElementById(slug)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav className="text-sm">
      <p className="text-[10px] font-semibold text-navy/35 uppercase tracking-widest mb-3 px-1">Contents</p>
      {toc.map((item) => (
        <div key={item.moduleId} className="mb-4">
          <button
            onClick={() => handleClick(slugify(item.title))}
            className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors text-navy/60 hover:text-navy hover:bg-navy/5"
          >
            <span className="font-mono text-[10px] text-navy/30 mr-1.5">{item.number}</span>
            {item.title}
          </button>
          {item.headings.length > 0 && (
            <div className="ml-4 mt-0.5 space-y-0.5">
              {item.headings.slice(0, 5).map((h) => (
                <button key={h.slug} onClick={() => handleClick(h.slug)} className="w-full text-left px-2 py-1 rounded text-[11px] text-navy/45 hover:text-navy/70 hover:bg-navy/5 transition-colors truncate">
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

function StepCard({ module, stepNumber, isLocked, isVisited, displayTitle }) {
  return (
    <div id={slugify(module.title)} className={`rounded-2xl border p-6 transition-all ${isVisited ? 'border-navy/12 bg-white/70' : 'border-navy/10 bg-white/60'}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full bg-navy text-cream font-bold text-sm flex items-center justify-center flex-shrink-0">{stepNumber}</span>
        <span className="w-8 h-8 rounded-full bg-parchment text-navy font-serif font-bold text-xs flex items-center justify-center flex-shrink-0 border border-navy/10">{module.number}</span>
        <div className="flex-1 min-w-0" />
        {isVisited && !isLocked && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" strokeWidth={1.8} />}
        {isLocked && <Lock className="w-4 h-4 text-navy/30 flex-shrink-0" strokeWidth={1.8} />}
        {module.free && !isLocked && <span className="text-[10px] font-semibold text-green-700 bg-green-100 border border-green-200 px-2 py-0.5 rounded-full">FREE</span>}
      </div>

      <h3 className="font-serif text-lg font-bold text-navy mb-1 leading-snug">{displayTitle || module.title}</h3>
      <p className="text-sm text-navy/55 mb-4 leading-relaxed">{module.tagline}</p>

      {!isLocked ? (
        <Link href={`/course/${module.id}`} className="inline-flex items-center gap-2 bg-navy text-cream font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-navy/85 transition-colors">
          {isVisited ? 'Review Module' : 'Start Module'}
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <Link href="/pricing" className="inline-flex items-center gap-2 border border-navy/15 text-navy/40 font-semibold text-sm px-4 py-2.5 rounded-xl hover:border-navy/30 hover:text-navy/60 transition-colors">
          🔒 Unlock with Full Access
        </Link>
      )}
    </div>
  )
}

function SectionPaywall({ accessLevel }) {
  return (
    <div className="rounded-2xl border border-navy/10 bg-navy/4 p-6 text-center">
      <div className="text-2xl mb-3">🔒</div>
      <h4 className="font-serif text-base font-bold text-navy mb-2">{accessLevel === 'premium' ? 'Premium Only' : 'Full Access Required'}</h4>
      <p className="text-sm text-navy/55 mb-4 max-w-xs mx-auto">
        {accessLevel === 'premium' ? 'Upgrade to Premium to unlock the Bonus Vault.' : 'Get Full Access to unlock all modules in this section.'}
      </p>
      <Link href="/pricing" className="inline-flex items-center gap-2 bg-navy text-cream font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-navy/85 transition-colors">
        View Plans <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

export default function DashboardSection() {
  const params = useParams()
  const sectionId = params.sectionId
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const { getSectionProgress, isVisited } = useModuleProgress()

  const section = DASHBOARD_SECTIONS.find((s) => s.id === sectionId)
  if (!section) {
    redirect('/dashboard')
    return null
  }

  const sectionModules = section.moduleIds.map((id) => COURSE_CATALOG.find((m) => m.id === id)).filter(Boolean)
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
      <div className="sticky top-14 z-10 bg-cream/90 backdrop-blur-sm border-b border-navy/8 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center gap-4">
          <button onClick={() => router.push('/dashboard')} className="flex items-center gap-1.5 text-sm font-medium text-navy/50 hover:text-navy transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </button>
          <span className="text-navy/20">/</span>
          <span className="text-sm font-semibold text-navy truncate">{section.title}</span>
          <div className="flex-1" />
          <span className="text-xs text-navy/40 font-medium tabular-nums hidden sm:block">{progressPercent}% complete</span>
        </div>
        <div className="h-0.5 bg-navy/5">
          <div className="h-full bg-navy/30 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8 items-start">
          <aside className="hidden lg:block w-60 flex-shrink-0 sticky top-28 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <SidebarTOC toc={toc} />
          </aside>

          <main className="flex-1 min-w-0">
            <div className={`${section.cardColor} border ${section.borderColor} rounded-2xl p-6 mb-8`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${section.accentColor} bg-opacity-20`}>
                  <Icon className="w-5 h-5 text-navy" strokeWidth={1.8} />
                </div>
                {section.badge && <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${section.badgeStyle}`}>{section.badge}</span>}
              </div>
              <h1 className="font-serif text-2xl font-bold text-navy mb-1">{section.title}</h1>
              <p className="text-sm text-navy/60">{section.tagline}</p>
            </div>

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
                    displayTitle={stripDashboardLabel(section.stepLabels?.[index] || '')}
                  />
                )
              })}

              {section.interactiveTools && section.interactiveTools.length > 0 && (
                <div className="rounded-2xl border border-navy/10 bg-white/60 p-6">
                  <h3 className="font-serif text-base font-bold text-navy mb-4">Interactive Tools</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {section.interactiveTools.map((tool) =>
                      tool.comingSoon ? (
                        <div key={tool.label} className="flex items-center gap-3 border border-navy/10 rounded-xl px-4 py-3 opacity-50 cursor-not-allowed">
                          <span className="text-sm font-semibold text-navy flex-1">{tool.label}</span>
                          <span className="text-[10px] font-semibold text-navy/40 bg-navy/8 px-2 py-0.5 rounded-full">Soon</span>
                        </div>
                      ) : (
                        <Link key={tool.label} href={tool.href} className="flex items-center gap-3 border border-navy/10 rounded-xl px-4 py-3 hover:bg-navy/5 transition-colors group">
                          <span className="text-sm font-semibold text-navy flex-1">{tool.label}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-navy/30 group-hover:text-navy/60 transition-colors" />
                        </Link>
                      )
                    )}
                  </div>
                </div>
              )}

              {hasLockedContent && !isSignedIn && <SectionPaywall accessLevel={section.accessLevel} />}
            </div>

            <div className="flex items-center justify-between mt-10 pt-6 border-t border-navy/10">
              {prevSection ? (
                <button onClick={() => router.push(`/dashboard/${prevSection.id}`)} className="flex items-center gap-2 text-sm font-medium text-navy/50 hover:text-navy transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:block">{prevSection.title}</span>
                  <span className="sm:hidden">Previous</span>
                </button>
              ) : (
                <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-sm font-medium text-navy/50 hover:text-navy transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </button>
              )}

              {nextSection ? (
                <button onClick={() => router.push(`/dashboard/${nextSection.id}`)} className="flex items-center gap-2 text-sm font-medium text-navy/60 hover:text-navy transition-colors">
                  <span className="hidden sm:block">{nextSection.title}</span>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : <div />}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
