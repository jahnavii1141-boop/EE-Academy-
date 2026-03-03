import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Feature108 from './components/blocks/Feature108'
import WhatYoullLearn from './components/WhatYoullLearn'
import Curriculum from './components/Curriculum'
import EvervaultCTA from './components/EvervaultCTA'
import Pricing from './components/Pricing'
import PlannerSection from './components/PlannerSection'
import DumpSection from './components/DumpSection'
import EmailGate from './components/EmailGate'
import AboutCourses from './pages/AboutCourses'
import About from './pages/About'
import PlannerPage from './pages/PlannerPage'
import DumpWorkspacePage from './pages/DumpWorkspacePage'
import CourseModulePage from './pages/CourseModulePage'
import ProtectedRoute from './components/ProtectedRoute'

function LandingPage() {
  return (
    <main>
      <Hero />
      <Feature108 />
      <WhatYoullLearn />
      <Curriculum />
      <PlannerSection />
      <DumpSection />
      <EvervaultCTA />
      <Pricing />
      <EmailGate />
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
            <Route path="/courses" element={<AboutCourses />} />
            <Route path="/planner" element={<PlannerPage />} />
            <Route path="/course/:moduleId" element={<CourseModulePage />} />
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
