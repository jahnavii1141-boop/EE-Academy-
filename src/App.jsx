import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Feature108 from './components/blocks/Feature108'
import WhatYoullLearn from './components/WhatYoullLearn'
import Curriculum from './components/Curriculum'
import AboutCourses from './pages/AboutCourses'
import About from './pages/About'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import RefundPolicy from './pages/RefundPolicy'
import PlannerPage from './pages/PlannerPage'
import DumpWorkspacePage from './pages/DumpWorkspacePage'
import StudyCalendarPage from './pages/StudyCalendarPage'
import CourseModulePage from './pages/CourseModulePage'
import Dashboard from './pages/Dashboard'
import DashboardSection from './pages/DashboardSection'
import PricingPage from './pages/PricingPage'
import ProtectedRoute from './components/ProtectedRoute'

function LandingPage() {
  return (
    <main>
      <Hero />
      <Feature108 />
      <WhatYoullLearn />
    </main>
  )
}

function CurriculumPage() {
  return (
    <main className="min-h-screen bg-navy">
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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:sectionId" element={<DashboardSection />} />
            <Route path="/dump" element={
              <ProtectedRoute>
                <DumpWorkspacePage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
