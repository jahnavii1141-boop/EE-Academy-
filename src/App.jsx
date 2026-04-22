import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Feature108 from './components/blocks/Feature108'
import WhatYoullLearn from './components/WhatYoullLearn'
import HomeFAQ from './components/HomeFAQ'
import EvervaultCTA from './components/EvervaultCTA'
import ExitIntentPopup from './components/ExitIntentPopup'
import SEOHead from './components/SEOHead'
import ResultsStrip from './components/ResultsStrip'

// Lazy-loaded pages
const Curriculum = lazy(() => import('./components/Curriculum'))
const AboutCourses = lazy(() => import('./pages/AboutCourses'))
const About = lazy(() => import('./pages/About'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'))
const PlannerPage = lazy(() => import('./pages/PlannerPage'))
const DumpWorkspacePage = lazy(() => import('./pages/DumpWorkspacePage'))
const StudyCalendarPage = lazy(() => import('./pages/StudyCalendarPage'))
const CourseModulePage = lazy(() => import('./pages/CourseModulePage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const DashboardSection = lazy(() => import('./pages/DashboardSection'))
const PricingPage = lazy(() => import('./pages/PricingPage'))
const GuidesHub = lazy(() => import('./pages/GuidesHub'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

// SEO Guide Pages
const EEIntroductionGuide = lazy(() => import('./pages/guides/EEIntroductionGuide'))
const EEStructureGuide = lazy(() => import('./pages/guides/EEStructureGuide'))
const ResearchQuestionExamples = lazy(() => import('./pages/guides/ResearchQuestionExamples'))
const RPPFGuide = lazy(() => import('./pages/guides/RPPFGuide'))
const EETipsGuide = lazy(() => import('./pages/guides/EETipsGuide'))
const EECriteriaGuide = lazy(() => import('./pages/guides/EECriteriaGuide'))
const EESubjectsGuide = lazy(() => import('./pages/guides/EESubjectsGuide'))
const EEWordCountGuide = lazy(() => import('./pages/guides/EEWordCountGuide'))
const EEConclusionGuide = lazy(() => import('./pages/guides/EEConclusionGuide'))
const EEResearchMethodsGuide = lazy(() => import('./pages/guides/EEResearchMethodsGuide'))
const GetAExtendedEssayGuide = lazy(() => import('./pages/guides/GetAExtendedEssayGuide'))

function LoadingSpinner() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-7 h-7 rounded-full border-[3px] border-navy/15 border-t-navy/50" style={{ animation: 'spin 0.8s linear infinite' }} />
    </div>
  )
}

const COURSE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'The Extended Essay Academy',
  description: 'A self-study IB Extended Essay programme with 14 structured modules covering topic selection, research methodology, essay structure, academic writing, and exam criteria — built by a 32/34 Cambridge graduate.',
  provider: {
    '@type': 'Organization',
    name: 'The Extended Essay Academy',
    url: 'https://www.theextendedessay.com',
  },
  offers: {
    '@type': 'Offer',
    price: '89',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
  numberOfCredits: 14,
  educationalLevel: 'High School',
}

function LandingPage() {
  return (
    <main>
      <SEOHead
        title="IB Extended Essay Course — The 32/34 System | The Extended Essay Academy"
        description="Learn the IB Extended Essay step-by-step with a self-study programme built by a 32/34 Cambridge graduate. 14 structured modules covering research, writing, criteria, and RPPF."
        canonical="/"
        jsonLd={COURSE_JSON_LD}
        appendSiteName={false}
      />
      <Hero />
      <ResultsStrip />
      <Feature108 />
      <WhatYoullLearn />
      <HomeFAQ />
      <EvervaultCTA />
    </main>
  )
}

function CurriculumPage() {
  return (
    <main className="min-h-screen bg-navy">
      <SEOHead title="Curriculum" description="Explore the 14-module IB Extended Essay curriculum. From mindset to templates — everything you need for an A-grade EE." canonical="/curriculum" />
      <Curriculum />
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/refund" element={<RefundPolicy />} />
              <Route path="/courses" element={<AboutCourses />} />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/study-calendar" element={<StudyCalendarPage />} />
              <Route path="/course/:moduleId" element={<CourseModulePage />} />
              <Route path="/curriculum" element={<CurriculumPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/guides" element={<GuidesHub />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/:sectionId" element={<DashboardSection />} />
              <Route path="/dump" element={
                <ProtectedRoute>
                  <DumpWorkspacePage />
                </ProtectedRoute>
              } />

              {/* SEO Guide Pages */}
              <Route path="/guides/extended-essay-introduction" element={<EEIntroductionGuide />} />
              <Route path="/guides/extended-essay-structure" element={<EEStructureGuide />} />
              <Route path="/guides/research-question-examples" element={<ResearchQuestionExamples />} />
              <Route path="/guides/rppf-guide" element={<RPPFGuide />} />
              <Route path="/guides/extended-essay-tips" element={<EETipsGuide />} />
              <Route path="/guides/ee-criteria-breakdown" element={<EECriteriaGuide />} />
              <Route path="/guides/ee-subjects-guide" element={<EESubjectsGuide />} />
              <Route path="/guides/ee-word-count" element={<EEWordCountGuide />} />
              <Route path="/guides/ee-conclusion" element={<EEConclusionGuide />} />
              <Route path="/guides/ee-research-methods" element={<EEResearchMethodsGuide />} />
              <Route path="/guides/how-to-get-an-a-in-extended-essay" element={<GetAExtendedEssayGuide />} />

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
        <ExitIntentPopup />
      </div>
    </BrowserRouter>
  )
}
