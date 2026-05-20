import { auth } from '@clerk/nextjs/server'

// ─── Heuristic EE Analyser ───────────────────────────────────────────────────

function countMatches(text, patterns) {
  let count = 0
  for (const p of patterns) {
    const re = typeof p === 'string' ? new RegExp(`\\b${p}\\b`, 'gi') : p
    const matches = text.match(re)
    if (matches) count += matches.length
  }
  return count
}

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function analyseEssay(essay, subject = '', rq = '') {
  const lower = essay.toLowerCase()
  const words = wordCount(essay)

  // ── Criterion A — Focus and Method (0–6) ─────────────────────────────────
  let scoreA = 0
  const analyticalRQ = /to what extent|how does|how do|why does|what is the (effect|impact|relationship|role|significance)|in what ways|how (effectively|far)|to what degree/i
  if (analyticalRQ.test(essay)) scoreA += 2
  else if (/what is|who was|when did|describe|outline/i.test(essay.slice(0, 300))) scoreA += 0
  else scoreA += 1

  const methodTerms = countMatches(lower, ['methodology', 'method', 'framework', 'approach', 'primary source', 'secondary source', 'qualitative', 'quantitative', 'case study', 'analysis', 'theoretical'])
  scoreA += Math.min(2, Math.floor(methodTerms / 3))

  if (words >= 3500 && words <= 4200) scoreA += 2
  else if (words >= 3000 && words <= 4500) scoreA += 1
  scoreA = Math.min(6, scoreA)

  // ── Criterion B — Knowledge and Understanding (0–6) ───────────────────────
  let scoreB = 0
  const citationPatterns = [
    /\([A-Z][a-z]+,?\s+\d{4}\)/g,
    /\[[0-9]+\]/g,
    /\(p\.\s*\d+\)/gi,
    /according to|as argued by|as stated by|as noted by|as cited in/gi,
  ]
  let citations = 0
  for (const p of citationPatterns) { const m = essay.match(p); if (m) citations += m.length }
  if (citations >= 12) scoreB += 2
  else if (citations >= 6) scoreB += 1

  if (/works cited|bibliography|references|sources consulted/i.test(essay)) scoreB += 1

  const academicTerms = countMatches(lower, [
    'theory', 'evidence', 'demonstrates', 'illustrates', 'reveals', 'indicates',
    'significant', 'correlation', 'hypothesis', 'literature', 'scholar', 'academic',
    'empirical', 'data', 'research', 'study', 'findings', 'argues', 'contends',
    'asserts', 'posits', 'proposes',
  ])
  if (academicTerms >= 20) scoreB += 2
  else if (academicTerms >= 10) scoreB += 1

  const subjectTerms = {
    'biology': ['cell', 'enzyme', 'protein', 'dna', 'rna', 'organism', 'ecosystem', 'genetics', 'metaboli'],
    'chemistry': ['reaction', 'compound', 'molecule', 'bond', 'element', 'concentration', 'equilibrium', 'oxidation'],
    'economics': ['market', 'supply', 'demand', 'gdp', 'inflation', 'elasticity', 'externality', 'equilibrium', 'price'],
    'history': ['war', 'revolution', 'government', 'empire', 'treaty', 'political', 'social movement', 'historical'],
    'psychology': ['cognitive', 'behaviour', 'behavior', 'experiment', 'participant', 'study', 'schema', 'bias', 'emotion'],
    'physics': ['force', 'velocity', 'acceleration', 'energy', 'mass', 'momentum', 'wave', 'quantum', 'electric'],
    'business management': ['profit', 'revenue', 'stakeholder', 'management', 'strategy', 'market share', 'competitive'],
    'english a': ['imagery', 'metaphor', 'symbolism', 'narrator', 'theme', 'character', 'literary', 'prose', 'verse'],
  }
  const subjectKey = Object.keys(subjectTerms).find(k => subject.toLowerCase().includes(k))
  if (subjectKey) {
    const subjectHits = countMatches(lower, subjectTerms[subjectKey])
    if (subjectHits >= 8) scoreB += 1
  } else if (academicTerms >= 5) scoreB += 1
  scoreB = Math.min(6, scoreB)

  // ── Criterion C — Critical Thinking (0–12) ────────────────────────────────
  let scoreC = 0
  const analyticalWords = countMatches(lower, [
    'however', 'although', 'nevertheless', 'despite', 'whereas', 'while',
    'therefore', 'thus', 'consequently', 'as a result', 'hence',
    'furthermore', 'moreover', 'in addition', 'additionally',
    'in contrast', 'on the other hand', 'conversely', 'alternatively',
    'suggests', 'implies', 'indicates', 'demonstrates', 'reveals',
    'this shows', 'this means', 'this supports', 'this contradicts',
  ])
  const analyticalDensity = (analyticalWords / words) * 1000
  if (analyticalDensity >= 20) scoreC += 4
  else if (analyticalDensity >= 12) scoreC += 3
  else if (analyticalDensity >= 6) scoreC += 2
  else scoreC += 1

  const evaluationWords = countMatches(lower, [
    'limitation', 'limitations', 'weakness', 'strength', 'assumption', 'bias',
    'reliable', 'validity', 'accurate', 'counterargument', 'counter-argument',
    'one might argue', 'critics argue', 'some scholars', 'it could be argued',
    'to some extent', 'partially', 'nuanced',
  ])
  if (evaluationWords >= 8) scoreC += 3
  else if (evaluationWords >= 4) scoreC += 2
  else if (evaluationWords >= 2) scoreC += 1

  const synthesisWords = countMatches(lower, [
    'compared to', 'in comparison', 'similar to', 'similarly', 'unlike',
    'in contrast to', 'both', 'neither', 'either', 'respectively',
    'taken together', 'overall', 'in sum', 'collectively',
  ])
  if (synthesisWords >= 6) scoreC += 3
  else if (synthesisWords >= 3) scoreC += 2
  else scoreC += 1

  if (countMatches(lower, ['however', 'on the other hand', 'one might argue', 'critics argue']) >= 3) scoreC += 2
  scoreC = Math.min(12, scoreC)

  // ── Criterion D — Presentation (0–4) ─────────────────────────────────────
  let scoreD = 0
  if (words >= 3800 && words <= 4000) scoreD += 2
  else if (words >= 3500 && words <= 4200) scoreD += 1
  const headingLines = essay.split('\n').filter(l => l.trim().length > 0 && l.trim().length < 80 && /^[A-Z]/.test(l.trim()) && !l.trim().endsWith('.'))
  if (headingLines.length >= 4) scoreD += 1
  if (citations >= 4) scoreD += 1
  scoreD = Math.min(4, scoreD)

  // ── Criterion E — Engagement/RPPF (0–6) ──────────────────────────────────
  const scoreE = 3

  // ── Totals & grade ────────────────────────────────────────────────────────
  const total = scoreA + scoreB + scoreC + scoreD + scoreE
  const gradeFromTotal = t => t >= 27 ? 'A' : t >= 22 ? 'B' : t >= 14 ? 'C' : t >= 8 ? 'D' : 'E'
  const bandFromScore = (score, max) => {
    const pct = score / max
    if (pct >= 0.83) return 'Excellent'
    if (pct >= 0.67) return 'Good'
    if (pct >= 0.50) return 'Satisfactory'
    if (pct >= 0.33) return 'Mediocre'
    return 'Elementary'
  }

  const feedbackA = { strengths: [], improvements: [] }
  if (analyticalRQ.test(essay)) feedbackA.strengths.push('Research question uses analytical phrasing — sets up genuine evaluation')
  else feedbackA.improvements.push('Reframe the RQ using "to what extent", "how does", or "what is the impact of" to signal analytical intent')
  if (methodTerms >= 3) feedbackA.strengths.push('Methodology is referenced — examiner can see your approach')
  else feedbackA.improvements.push('Add a methodology section explaining why you chose your research approach and how it fits your RQ')
  if (words >= 3800 && words <= 4000) feedbackA.strengths.push(`Word count (${words.toLocaleString()}) is in the ideal IB range`)
  else if (words > 4000) feedbackA.improvements.push(`Word count (${words.toLocaleString()}) exceeds 4,000 — IB examiners stop reading at the limit`)
  else feedbackA.improvements.push(`Word count (${words.toLocaleString()}) is below 3,800 — develop your analysis sections further`)

  const feedbackB = { strengths: [], improvements: [] }
  if (citations >= 10) feedbackB.strengths.push(`Strong source engagement — ${citations} citations detected`)
  else if (citations >= 5) feedbackB.strengths.push(`${citations} citations detected — adequate sourcing`)
  else feedbackB.improvements.push('Citation count is low — every analytical claim needs a cited source. Aim for 12+ for A-band.')
  if (/works cited|bibliography|references/i.test(essay)) feedbackB.strengths.push('Bibliography section present')
  else feedbackB.improvements.push('No bibliography detected — list all sources consistently at the end')
  if (academicTerms >= 15) feedbackB.strengths.push('Academic vocabulary is strong throughout')
  else feedbackB.improvements.push('Increase subject-specific terminology — use the exact language from the IB subject guide')

  const feedbackC = { strengths: [], improvements: [] }
  if (analyticalDensity >= 12) feedbackC.strengths.push('Good density of analytical connectors — argument moves forward rather than listing')
  else feedbackC.improvements.push('Increase analytical language — each paragraph should use "however", "this suggests", "therefore", or "in contrast"')
  if (evaluationWords >= 4) feedbackC.strengths.push('Limitations and evaluation language present')
  else feedbackC.improvements.push('Evaluation language is sparse — address limitations of evidence at the point they arise, not just in the conclusion')
  if (synthesisWords >= 4) feedbackC.strengths.push('Cross-source synthesis detected')
  else feedbackC.improvements.push('Compare sources explicitly — "While X argues…, Y demonstrates…" builds the depth Criterion C rewards')
  if (countMatches(lower, ['however', 'on the other hand', 'one might argue', 'critics argue']) >= 2) feedbackC.strengths.push('Counterarguments engaged with')
  else feedbackC.improvements.push('Add at least one counterargument and explain why your position is more persuasive — key signal for A-band Criterion C')

  const feedbackD = { strengths: [], improvements: [] }
  if (words >= 3800 && words <= 4000) feedbackD.strengths.push('Word count is ideal')
  else if (words > 4000) feedbackD.improvements.push(`Cut ${(words - 4000).toLocaleString()} words — examiners stop at 4,000`)
  else feedbackD.improvements.push('Essay is shorter than the 3,800 word floor — expand your analysis sections')
  if (headingLines.length >= 4) feedbackD.strengths.push('Clear section headings aid navigability')
  else feedbackD.improvements.push('Add section headings (Introduction, Literature Review, Methodology, Analysis, Discussion, Conclusion) — free Criterion D marks')
  if (citations >= 4) feedbackD.strengths.push('In-text citations present')
  else feedbackD.improvements.push('Ensure all sources have consistent in-text citations throughout')

  const feedbackE = {
    strengths: ['RPPF is assessed separately — this criterion cannot be evaluated from essay text alone'],
    improvements: ['Write three RPPF entries showing genuine intellectual decision-making — see the RPPF guide for what examiners reward'],
  }

  const allImprovements = [
    ...feedbackC.improvements.map(i => ({ text: i, weight: 12 })),
    ...feedbackA.improvements.map(i => ({ text: i, weight: 6 })),
    ...feedbackB.improvements.map(i => ({ text: i, weight: 6 })),
    ...feedbackE.improvements.map(i => ({ text: i, weight: 6 })),
    ...feedbackD.improvements.map(i => ({ text: i, weight: 4 })),
  ]
  const topPriorities = allImprovements.slice(0, 3).map(i => i.text)

  const grade = gradeFromTotal(total)
  const notes = {
    A: 'This essay shows strong analytical engagement and clear criterion awareness. Focus on deepening your evaluation language and ensuring every paragraph explicitly connects back to the research question.',
    B: 'Solid foundations are visible, but the essay would benefit from more explicit evaluation — particularly comparing sources and addressing counterarguments. Criterion C is where this essay has the most room to grow.',
    C: 'The essay has a clear topic but reads as descriptive in places. Shift the focus from summarising what sources say to evaluating what they imply for your research question.',
    D: 'The essay needs structural and analytical work. Prioritise: a sharper RQ, a methodology section, and rewriting body paragraphs to interpret evidence rather than report it.',
    E: 'This is an early draft. Return to the fundamentals: a focused research question, organised sections, and body paragraphs that argue rather than describe.',
  }

  return {
    overall_grade: grade,
    overall_marks: total,
    word_count: words,
    criteria: {
      A: { name: 'Focus and Method',           max: 6,  estimated_marks: scoreA, band: bandFromScore(scoreA, 6),  ...feedbackA },
      B: { name: 'Knowledge and Understanding', max: 6,  estimated_marks: scoreB, band: bandFromScore(scoreB, 6),  ...feedbackB },
      C: { name: 'Critical Thinking',           max: 12, estimated_marks: scoreC, band: bandFromScore(scoreC, 12), ...feedbackC },
      D: { name: 'Presentation',               max: 4,  estimated_marks: scoreD, band: bandFromScore(scoreD, 4),  ...feedbackD },
      E: { name: 'Engagement (RPPF)',           max: 6,  estimated_marks: scoreE, band: 'Satisfactory',            ...feedbackE },
    },
    top_priorities: topPriorities,
    examiner_note: notes[grade],
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const { userId } = await auth()
    if (!userId) return Response.json({ error: 'Not signed in' }, { status: 401 })

    let essay_text = '', subject = '', research_question = ''

    const contentType = req.headers.get('content-type') || ''

    if (contentType.includes('multipart/form-data')) {
      // ── PDF upload path ──────────────────────────────────────────────────
      const formData = await req.formData()
      const file = formData.get('pdf')
      subject = formData.get('subject') || ''
      research_question = formData.get('research_question') || ''

      if (!file) return Response.json({ error: 'No PDF file received.' }, { status: 400 })

      const buffer = Buffer.from(await file.arrayBuffer())

      // Dynamic import — pdf-parse is in serverExternalPackages so Next.js
      // won't bundle it, avoiding the test-file resolution issue
      const pdfParse = (await import('pdf-parse')).default
      const parsed = await pdfParse(buffer)
      essay_text = parsed.text
    } else {
      // ── Plain JSON path ──────────────────────────────────────────────────
      const body = await req.json()
      essay_text = body.essay_text || ''
      subject = body.subject || ''
      research_question = body.research_question || ''
    }

    if (!essay_text || essay_text.trim().length < 500) {
      return Response.json(
        { error: 'Essay too short — paste at least a few paragraphs to get a meaningful scan.' },
        { status: 400 }
      )
    }

    const result = analyseEssay(essay_text, subject, research_question)
    return Response.json(result)
  } catch (err) {
    console.error('Scan error:', err?.message || err)
    return Response.json({ error: err?.message || 'Something went wrong' }, { status: 500 })
  }
}
