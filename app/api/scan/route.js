import { auth } from '@clerk/nextjs/server'
import Anthropic from '@anthropic-ai/sdk'

// Set ANTHROPIC_API_KEY in .env.local and Vercel dashboard.

const IB_CRITERIA_PROMPT = `You are an experienced IB Extended Essay examiner. Read the essay carefully and grade it against the official 2024/2025 IB assessment criteria below.

CRITERION A — FOCUS AND METHOD (0–6 marks)
• 5–6 (Excellent): RQ clearly stated, focused and specific. Significance clearly established. Methodology critically evaluated and clearly connected to the RQ.
• 3–4 (Good): RQ clearly stated. Significance identified. Methodology clearly explained and connected to the RQ.
• 1–2 (Basic): RQ stated but not clearly focused. Significance briefly mentioned. Methodology explained but connections to RQ not clearly established.
• 0: Does not reach the standard above.

CRITERION B — KNOWLEDGE AND UNDERSTANDING (0–6 marks)
• 5–6 (Excellent): Knowledge and understanding is good. Subject-specific terminology and concepts used accurately and appropriately throughout.
• 3–4 (Good): Knowledge and understanding is adequate. Subject-specific terminology mostly used accurately.
• 1–2 (Basic): Knowledge and understanding is limited. Terminology inaccurate or inappropriate.
• 0: Does not reach the standard above.

CRITERION C — CRITICAL THINKING (0–12 marks)
• 10–12 (Excellent): Position convincingly developed and justified. Conclusions consistently well supported by evidence. Research is insightful, analysis effective and convincing. Counterarguments engaged with.
• 7–9 (Good): Position developed and justified. Conclusions well supported. Research relevant, analysis competent. Some evaluation of sources.
• 4–6 (Satisfactory): Position developed. Conclusions supported by evidence. Research adequate but partially relevant; analysis limited or partially developed.
• 1–3 (Basic): Position identified but not developed. Conclusions not based on evidence. Research limited, largely descriptive.
• 0: Does not reach the standard above.

CRITERION D — PRESENTATION (0–4 marks)
• 3–4 (Good): Structure and layout appropriate. Academic language accurate and appropriate. Word count within range.
• 1–2 (Satisfactory): Structure generally appropriate. Some academic language used. Minor formatting issues.
• 0: Does not reach the standard above.

CRITERION E — ENGAGEMENT (0–6 marks)
This criterion is assessed ONLY through the RPPF (Reflections on Planning and Progress Form), not from essay text. Award 4 marks as a baseline and note it must be assessed separately.

BAND LABELS:
- Excellent: ≥83% of criterion marks
- Good: ≥67% of criterion marks
- Satisfactory: ≥50% of criterion marks
- Mediocre: ≥33% of criterion marks
- Elementary: <33% of criterion marks

GRADE BOUNDARIES: A=27–34, B=22–26, C=14–21, D=8–13, E=0–7

Respond ONLY with valid JSON — no markdown, no explanation, no code fences. Use this exact schema:
{
  "overall_grade": "A",
  "overall_marks": 28,
  "word_count": 3850,
  "examiner_note": "One or two sentences summarising the essay's main strength and main gap.",
  "criteria": {
    "A": {
      "name": "Focus and Method",
      "max": 6,
      "estimated_marks": 5,
      "band": "Excellent",
      "strengths": ["Specific strength observed in the text"],
      "improvements": ["Specific thing to fix with an example from the essay"]
    },
    "B": {
      "name": "Knowledge and Understanding",
      "max": 6,
      "estimated_marks": 4,
      "band": "Good",
      "strengths": [],
      "improvements": []
    },
    "C": {
      "name": "Critical Thinking",
      "max": 12,
      "estimated_marks": 8,
      "band": "Good",
      "strengths": [],
      "improvements": []
    },
    "D": {
      "name": "Presentation",
      "max": 4,
      "estimated_marks": 3,
      "band": "Good",
      "strengths": [],
      "improvements": []
    },
    "E": {
      "name": "Engagement (RPPF)",
      "max": 6,
      "estimated_marks": 4,
      "band": "Satisfactory",
      "strengths": ["RPPF is assessed separately from essay text"],
      "improvements": ["Write three RPPF entries showing intellectual decision-making, not procedural description — see the RPPF guide"]
    }
  },
  "top_priorities": [
    "Most impactful fix (cite a specific part of the essay)",
    "Second priority",
    "Third priority"
  ]
}`

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function gradeFromTotal(t) {
  if (t >= 27) return 'A'
  if (t >= 22) return 'B'
  if (t >= 14) return 'C'
  if (t >= 8)  return 'D'
  return 'E'
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const { userId } = await auth()
    if (!userId) return Response.json({ error: 'Not signed in' }, { status: 401 })

    let essay_text = '', subject = '', research_question = ''

    const contentType = req.headers.get('content-type') || ''

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      const file = formData.get('pdf')
      subject = formData.get('subject') || ''
      research_question = formData.get('research_question') || ''

      if (!file) return Response.json({ error: 'No PDF file received.' }, { status: 400 })
      const buffer = Buffer.from(await file.arrayBuffer())
      const { extractText } = await import('unpdf')
      const { text } = await extractText(new Uint8Array(buffer), { mergePages: true })
      essay_text = text
    } else {
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

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return Response.json(
        { error: 'Scanner not configured — ANTHROPIC_API_KEY not set. Contact the site owner.' },
        { status: 503 }
      )
    }

    const client = new Anthropic({ apiKey })
    const words = wordCount(essay_text)

    // Truncate to ~6000 words to stay within reasonable token limits
    const essayTruncated = essay_text.trim().split(/\s+/).slice(0, 6000).join(' ')
    const truncatedNote = words > 6000 ? ` [Note: essay truncated to first 6,000 words for analysis; full word count is ${words}]` : ''

    const userMessage = [
      subject && `Subject: ${subject}`,
      research_question && `Research Question: ${research_question}`,
      `Word count: ${words}${truncatedNote}`,
      '',
      '=== ESSAY TEXT ===',
      essayTruncated,
    ].filter(Boolean).join('\n')

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1500,
      system: IB_CRITERIA_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    })

    const raw = message.content[0]?.text?.trim() || ''

    let result
    try {
      // Strip any accidental markdown fences
      const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()
      result = JSON.parse(cleaned)
    } catch {
      console.error('Scan JSON parse error. Raw:', raw.slice(0, 300))
      return Response.json({ error: 'Could not parse examiner response. Please try again.' }, { status: 500 })
    }

    // Sanity-check and enforce grade from marks
    const total = result.overall_marks ?? 0
    result.overall_grade = gradeFromTotal(total)
    result.word_count = words

    return Response.json(result)
  } catch (err) {
    console.error('Scan error:', err?.message || err)
    return Response.json({ error: err?.message || 'Something went wrong' }, { status: 500 })
  }
}
