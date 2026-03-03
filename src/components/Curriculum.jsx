import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import AnimateIn from './ui/AnimateIn'

const MODULES = [
  {
    id: 'module-1',
    free: true,
    title: 'Module 1 — Introduction, Mindset & How to Think Like an EE Examiner',
    lessons: [
      'What the EE Actually Is — and Why It Matters for Your Diploma',
      'The Pareto Principle: The 20% That Produces 80% of Your Marks',
      'Stop Thinking Like a Student, Start Writing Like a Researcher',
      'The IB\'s Own Words: What "Formal Academic Writing" Really Means',
    ],
    accent: 'border-parchment',
    dot: 'bg-parchment',
  },
  {
    id: 'module-2',
    free: true,
    title: 'Module 2 — What IB Expects: Criteria, Grading & How A\'s Are Really Given',
    lessons: [
      'Criterion A: Knowledge and Understanding (6 marks)',
      'Criterion B: Application and Analysis (6 marks)',
      'Criterion C: Synthesis and Evaluation (6 marks)',
      'Criterion D: Communication (4 marks)',
      'Criterion E: Engagement & the RPPF (6 marks)',
      'How to Map Every Section of Your Essay to the Criteria',
    ],
    accent: 'border-steel',
    dot: 'bg-steel',
  },
  {
    id: 'module-3',
    title: 'Module 3 — Choosing Your Subject & Finding Your Topic',
    lessons: [
      'The Venn Diagram: Interest, Strength & EE-Friendliness',
      'How to Use Clastify Efficiently (Without Wasting Hours)',
      'Subject-Specific Strategy: Which Subjects Score Better and Why',
      'Thinking Like an Academic From Day One',
    ],
    accent: 'border-parchment',
    dot: 'bg-parchment',
  },
  {
    id: 'module-4',
    title: 'Module 4 — Research Question Mastery',
    lessons: [
      'The John Story: How to Find Your RQ From Real Life',
      'What Makes a Strong RQ: Specificity, Scope & Framing',
      '"To What Extent" vs. "How" vs. "What" — Which to Use and When',
      'Refining Your RQ With Your Supervisor',
      'Using AI to Stress-Test Your RQ (Without Crossing the Line)',
    ],
    accent: 'border-card-4',
    dot: 'bg-card-4',
  },
  {
    id: 'module-5',
    title: 'Module 5 — The EE Dump Research System',
    lessons: [
      'What the EE Dump Is and Why It Works',
      'Breaking Your RQ Into 5 Subtopics',
      'The Dump Method: Google & Google Scholar Step-by-Step',
      'There Is No Such Thing as Too Much Information',
      'Locking In Your Final RQ After the Dump',
    ],
    accent: 'border-steel',
    dot: 'bg-steel',
  },
  {
    id: 'module-6',
    title: 'Module 6 — How to Research Like a Top Student',
    lessons: [
      'Let Your Structure Define Your Research (Not the Other Way Around)',
      'The Funnel: Level 1 (Google), Level 2 (Scholar), Level 3 (PDF-only)',
      'Building 5 Sub-Questions from Your RQ',
      'The Scholar Method: Search Narrow, Scan Fast, Follow Citations',
      'When to Stop Researching & What Makes a Source EE-Worthy',
    ],
    accent: 'border-parchment',
    dot: 'bg-parchment',
  },
  {
    id: 'module-7',
    title: 'Module 7 — Building Your EE Structure',
    lessons: [
      'The Grade-A 7-Section Structure (Used for a 32/34)',
      'Mapping Each Section to Specific Assessment Criteria',
      'No Purposeless Writing: Every Paragraph Earns Marks',
      'Why Structure Is Your Biggest Competitive Advantage',
    ],
    accent: 'border-card-4',
    dot: 'bg-card-4',
  },
  {
    id: 'module-8',
    title: 'Module 8 — Writing the EE: How to Actually Write Each Section',
    lessons: [
      'The Introduction: Storytelling That Leads to Your RQ (Criterion A)',
      'The Literature Review: Critical Evaluation, Not Summaries',
      'The Methodology: The "Why" Matters More Than the "What"',
      'The Analysis: Where Most Marks Are Won or Lost (Criteria B + C)',
      'The Discussion: Honest Evaluation of Your Findings',
      'The Conclusion: Directly Answering Your RQ',
    ],
    accent: 'border-steel',
    dot: 'bg-steel',
  },
  {
    id: 'module-9',
    title: 'Module 9 — Format, Style, Citations & Academic Integrity',
    lessons: [
      'The Non-Negotiable Formatting Rules (Font, Spacing, Margins)',
      'Title Page Requirements & What NOT to Include',
      'Headings, Bold, Italics — The Golden Rule: Less Is More',
      'MLA Citations: In-Text Placement, Block Quotes & Bibliography',
      'Academic Integrity: Exactly Where the Line Is',
      'The 15-Minute Pre-Submission Formatting Checklist',
    ],
    accent: 'border-parchment',
    dot: 'bg-parchment',
  },
  {
    id: 'module-10',
    title: 'Module 10 — Writing a Killer Introduction & Conclusion',
    lessons: [
      'Hook Type 1: The Storytelling Hook (Best for BM, Psychology, History)',
      'Hook Type 2: The Contradiction Hook (Best for Sciences, Economics)',
      'Hook Type 3: The Stakes Hook (Best for EnvSci, Global Politics)',
      'Hook Type 4: The Gap Hook (Works for Any Subject)',
      'Writing Your Conclusion: Synthesise, Don\'t Repeat',
    ],
    accent: 'border-card-4',
    dot: 'bg-card-4',
  },
  {
    id: 'module-11',
    title: 'Module 11 — RPPF Mastery: The Easiest 6 Marks of Your Life',
    lessons: [
      'What the RPPF Is and Why Most Students Get It Wrong',
      'Reflection 1 (Early Stage): Topic Choice & Initial Challenges',
      'Reflection 2 (Mid Stage): Evolution, Pivots & Research Surprises',
      'Reflection 3 (Final Stage): What You\'re Proud Of & What You\'d Change',
    ],
    accent: 'border-steel',
    dot: 'bg-steel',
  },
  {
    id: 'ai-module',
    title: 'AI Module — How to Use AI the Right Way for Your EE',
    lessons: [
      'The Golden Rules: What You Can and Cannot Use AI For',
      'AI as a Thinking Partner, Not a Writer',
      'The 12 Prompts: Stage 1 — Brainstorming & RQ Refinement',
      'The 12 Prompts: Stage 2 — Research & Structure',
      'The 12 Prompts: Stage 3 — Writing & Refinement',
      'The 12 Prompts: Stage 4 — Full Examiner Simulation & RPPF Helper',
    ],
    accent: 'border-parchment',
    dot: 'bg-parchment',
  },
  {
    id: 'module-13',
    title: 'Module 13 — Analysing My 32/34 EE: AI Analysis vs. My Real Commentary',
    lessons: [
      'The Research Question: What AI Got Right and What It Missed',
      'Structure: The Overlap Problem Between Sections IV and V',
      'The Missing Frameworks — and Why I Cut the BCG Matrix',
      'SHEIN: Knowing What to Deliberately Leave Out',
      'Proofreading: The Easiest Marks I Left Behind',
      'Bibliography: How to Do a 20-Minute Source Quality Cleanup',
    ],
    accent: 'border-card-4',
    dot: 'bg-card-4',
  },
  {
    id: 'module-14',
    title: 'Module 14 — Templates, Tools & Checklists',
    lessons: [
      'Research Question Worksheet',
      'EE Dump Template (Organised by Subtopic)',
      'Source Tracking Sheet',
      'EE Structure Template (Mapped to Criteria)',
      'Literature Review Template',
      'Weekly Planning Timeline (Reverse-Engineered from Your Deadline)',
      'RPPF Template with Guided Prompts',
      'Editing & Proofreading Checklist',
    ],
    accent: 'border-steel',
    dot: 'bg-steel',
  },
]

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-4 h-4 text-steel transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  )
}

export default function Curriculum() {
  const [openIndex, setOpenIndex] = useState(0)
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)
  const totalLessons = MODULES.reduce((sum, m) => sum + m.lessons.length, 0)

  return (
    <section id="curriculum" className="bg-navy py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <AnimateIn>
          <h2 className="section-heading-light">Course Curriculum</h2>
          <p className="section-subheading-light">
            {MODULES.length} modules · {totalLessons} lessons · Built by a real student who scored 32/34
          </p>
        </AnimateIn>

        <AnimateIn delay={0.15}>
          <div className="space-y-3">
            {MODULES.map((module, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden border-l-4 ${module.accent} transition-all duration-200 ${
                  openIndex === i ? 'bg-cream/8' : 'bg-cream/5 hover:bg-cream/7'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:opacity-90 transition-opacity"
                  onClick={() => toggle(i)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-6 h-6 rounded-full ${module.dot} border border-cream/15 flex-shrink-0`} />
                    <span className="font-semibold text-cream text-sm leading-snug">{module.title}</span>
                    {module.free && (
                      <span className="text-[10px] font-bold text-green-300 bg-green-900/40 border border-green-700/40 px-1.5 py-0.5 rounded-full flex-shrink-0">
                        FREE
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                    {!module.free && (
                      <svg className="w-3.5 h-3.5 text-steel/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                    )}
                    <span className="text-xs text-steel">{module.lessons.length} lessons</span>
                    <ChevronIcon open={openIndex === i} />
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-cream/10 px-5 py-4">
                        <ul className="space-y-2.5 mb-5">
                          {module.lessons.map((lesson, j) => (
                            <li key={j} className="flex items-center gap-3 text-sm text-steel">
                              <svg className="w-3.5 h-3.5 text-parchment/60 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                              {lesson}
                            </li>
                          ))}
                        </ul>
                        <Link
                          to={`/course/${module.id}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-cream hover:text-parchment transition-colors group"
                        >
                          {module.free ? 'Start Module' : 'Preview Module'}
                          <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
