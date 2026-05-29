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
  const analyticalRQ = /to what extent|how does|how do|why does|what is the (effect|impact|relationship|role|significance)|in what ways|how (effectively|far)|to what degree|what factors|how has|how have|what role/i
  if (analyticalRQ.test(essay)) scoreA += 2
  else if (/what is|who was|when did|describe|outline/i.test(essay.slice(0, 300))) scoreA += 0
  else scoreA += 1

  const methodTerms = countMatches(lower, ['methodology', 'method', 'framework', 'approach', 'primary source', 'secondary source', 'qualitative', 'quantitative', 'case study', 'analysis', 'theoretical', 'examine', 'investigate', 'evaluate'])
  scoreA += Math.min(2, Math.floor(methodTerms / 2))  // lowered threshold: 2 terms = +1, 4 = +2

  if (words >= 3500 && words <= 4200) scoreA += 2
  else if (words >= 2800 && words <= 4400) scoreA += 1
  scoreA = Math.min(6, scoreA)

  // ── Criterion B — Knowledge and Understanding (0–6) ───────────────────────
  let scoreB = 0

  // Broad citation detection — catches APA, MLA, footnotes, ibid, numbered refs, verbal citations
  const citationPatterns = [
    /\([A-Z][a-zA-Z\s&]+,?\s+\d{4}[a-z]?\)/g,     // (Smith, 2024) or (Smith & Jones, 2024)
    /\[[0-9]+\]/g,                                    // [1] footnote style
    /\(p{1,2}\.\s*\d+\)/gi,                          // (p. 42) or (pp. 42-45)
    /according to|as argued by|as stated by|as noted by|as cited in|as (shown|demonstrated) by/gi,
    /ibid\.|op\.\s*cit\.|et al\./gi,                 // academic shorthand
    /\d+\s+[A-Z][a-z]+.*\(\d{4}\)/g,                // numbered bibliography entries
  ]
  let citations = 0
  for (const p of citationPatterns) { const m = essay.match(p); if (m) citations += m.length }
  // Lowered thresholds: real essays vary hugely in citation style
  if (citations >= 8) scoreB += 2
  else if (citations >= 3) scoreB += 1

  if (/works cited|bibliography|references|sources consulted|works referenced/i.test(essay)) scoreB += 1

  const academicTerms = countMatches(lower, [
    'theory', 'evidence', 'demonstrates', 'illustrates', 'reveals', 'indicates',
    'significant', 'correlation', 'hypothesis', 'literature', 'scholar', 'academic',
    'empirical', 'data', 'research', 'study', 'findings', 'argues', 'contends',
    'asserts', 'posits', 'proposes', 'analysis', 'analytical', 'examine', 'evaluate',
    'conclude', 'conclusion', 'support', 'contradict', 'consistent', 'inconsistent',
  ])
  if (academicTerms >= 14) scoreB += 2
  else if (academicTerms >= 7) scoreB += 1

  const subjectTerms = {
    'biology': ['cell', 'enzyme', 'protein', 'dna', 'rna', 'organism', 'ecosystem', 'genetics', 'metaboli', 'photosynthesis', 'respiration'],
    'chemistry': ['reaction', 'compound', 'molecule', 'bond', 'element', 'concentration', 'equilibrium', 'oxidation', 'reduction', 'titration'],
    'economics': ['market', 'supply', 'demand', 'gdp', 'inflation', 'elasticity', 'externality', 'equilibrium', 'price', 'consumer', 'producer', 'revenue'],
    'history': ['war', 'revolution', 'government', 'empire', 'treaty', 'political', 'social movement', 'historical', 'century', 'policy', 'regime'],
    'psychology': ['cognitive', 'behaviour', 'behavior', 'experiment', 'participant', 'study', 'schema', 'bias', 'emotion', 'memory', 'perception', 'social'],
    'physics': ['force', 'velocity', 'acceleration', 'energy', 'mass', 'momentum', 'wave', 'quantum', 'electric', 'magnetic', 'frequency'],
    'business management': ['profit', 'revenue', 'stakeholder', 'management', 'strategy', 'market share', 'competitive', 'brand', 'consumer', 'sales', 'cost'],
    'english a': ['imagery', 'metaphor', 'symbolism', 'narrator', 'theme', 'character', 'literary', 'prose', 'verse', 'tone', 'motif', 'allegory'],
    'mathematics': ['function', 'equation', 'derivative', 'integral', 'theorem', 'proof', 'variable', 'matrix', 'vector', 'probability'],
    'computer science': ['algorithm', 'data structure', 'complexity', 'binary', 'recursive', 'network', 'sorting', 'encryption'],
  }
  const subjectKey = Object.keys(subjectTerms).find(k => subject.toLowerCase().includes(k))
  if (subjectKey) {
    const subjectHits = countMatches(lower, subjectTerms[subjectKey])
    if (subjectHits >= 5) scoreB += 1    // lowered from 8
  } else if (academicTerms >= 7) scoreB += 1
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
    'this suggests', 'which suggests', 'which indicates', 'which demonstrates',
    'it follows', 'by extension', 'crucially', 'significantly', 'notably',
  ])
  const analyticalDensity = (analyticalWords / words) * 1000
  // Recalibrated: a strong essay at ~3800 words needs ~46 connector words for density 12
  if (analyticalDensity >= 16) scoreC += 4
  else if (analyticalDensity >= 9) scoreC += 3
  else if (analyticalDensity >= 5) scoreC += 2
  else scoreC += 1

  const evaluationWords = countMatches(lower, [
    'limitation', 'limitations', 'weakness', 'weakness', 'strength', 'assumption', 'bias',
    'reliable', 'validity', 'valid', 'accurate', 'accuracy', 'counterargument', 'counter-argument',
    'one might argue', 'critics argue', 'some scholars', 'it could be argued',
    'to some extent', 'partially', 'nuanced', 'complex', 'problematic',
    'it is worth noting', 'must be noted', 'caveat', 'however', 'qualify',
  ])
  if (evaluationWords >= 6) scoreC += 3
  else if (evaluationWords >= 3) scoreC += 2
  else if (evaluationWords >= 1) scoreC += 1

  const synthesisWords = countMatches(lower, [
    'compared to', 'in comparison', 'similar to', 'similarly', 'unlike',
    'in contrast to', 'both', 'neither', 'either', 'respectively',
    'taken together', 'overall', 'in sum', 'collectively', 'across',
    'whereas', 'while', 'at the same time', 'by contrast',
  ])
  if (synthesisWords >= 5) scoreC += 3
  else if (synthesisWords >= 3) scoreC += 2
  else if (synthesisWords >= 1) scoreC += 1

  // Counterargument bonus
  if (countMatches(lower, ['however', 'on the other hand', 'one might argue', 'critics argue', 'it could be argued', 'some argue']) >= 2) scoreC += 2
  scoreC = Math.min(12, scoreC)

  // ── Criterion D — Presentation (0–4) ─────────────────────────────────────
  let scoreD = 0
  if (words >= 3700 && words <= 4100) scoreD += 2
  else if (words >= 3000 && words <= 4400) scoreD += 1

  // Lenient heading detection — PDF extraction often merges lines
  const headingLines = essay.split('\n').filter(l => {
    const t = l.trim()
    return t.length >= 3 && t.length < 100 && /^[A-Z0-9]/.test(t) && !t.endsWith(',') && !/[.!?]$/.test(t) || /^[IVX]+\.\s|^\d+\.\s[A-Z]/.test(t)
  })
  if (headingLines.length >= 3) scoreD += 1    // lowered from 4
  if (citations >= 3) scoreD += 1              // lowered from 4
  scoreD = Math.min(4, scoreD)

  // ── Criterion E — Engagement/RPPF (0–6) ──────────────────────────────────
  // RPPF is always assessed separately — we give a fair base score
  const scoreE = 4

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

      // unpdf — serverless-native PDF text extraction, no browser API deps
      const { extractText } = await import('unpdf')
      const { text } = await extractText(new Uint8Array(buffer), { mergePages: true })
      essay_text = text
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
