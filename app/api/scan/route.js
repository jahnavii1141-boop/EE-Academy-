import Anthropic from '@anthropic-ai/sdk'
import { auth } from '@clerk/nextjs/server'
import { createServiceClient } from '../../../src/lib/supabase'

export async function POST(req) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: 'Not signed in' }, { status: 401 })
    }

    const { essay_text, subject, research_question } = await req.json()

    if (!essay_text || essay_text.trim().length < 500) {
      return Response.json(
        { error: 'Essay too short — paste at least a few paragraphs to get a meaningful scan.' },
        { status: 400 }
      )
    }

    // Confirm user has a workspace
    const supabase = createServiceClient()
    const { data: workspace } = await supabase
      .from('user_workspace')
      .select('clerk_user_id')
      .eq('clerk_user_id', userId)
      .single()

    if (!workspace) {
      return Response.json({ error: 'Workspace not found. Please set up your workspace first.' }, { status: 403 })
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json({ error: 'API key not configured' }, { status: 503 })
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const prompt = `You are an experienced IB Extended Essay examiner. Evaluate the following essay against the official IB EE assessment criteria.

Subject: ${subject || 'Not specified'}
Research Question: ${research_question || 'Not specified'}

ESSAY TEXT:
${essay_text}

Return ONLY valid JSON in exactly this format (no markdown, no extra text):
{
  "overall_grade": "A" | "B" | "C" | "D" | "E",
  "overall_marks": <number 0-34>,
  "criteria": {
    "A": { "name": "Focus and Method", "max": 6, "estimated_marks": <number>, "band": "Excellent"|"Good"|"Satisfactory"|"Mediocre"|"Elementary", "strengths": [<string>, <string>], "improvements": [<string>, <string>] },
    "B": { "name": "Knowledge and Understanding", "max": 6, "estimated_marks": <number>, "band": "...", "strengths": [...], "improvements": [...] },
    "C": { "name": "Critical Thinking", "max": 12, "estimated_marks": <number>, "band": "...", "strengths": [...], "improvements": [...] },
    "D": { "name": "Presentation", "max": 4, "estimated_marks": <number>, "band": "...", "strengths": [...], "improvements": [...] },
    "E": { "name": "Engagement (RPPF)", "max": 6, "estimated_marks": <number>, "band": "...", "strengths": [...], "improvements": [...] }
  },
  "top_priorities": [<string>, <string>, <string>],
  "examiner_note": "<1-2 sentence overall comment from examiner perspective>"
}`

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    })

    const rawText = message.content[0]?.text?.trim() ?? ''

    let result
    try {
      result = JSON.parse(rawText)
    } catch {
      // Try to extract JSON from response if there's any surrounding text
      const match = rawText.match(/\{[\s\S]*\}/)
      if (match) {
        result = JSON.parse(match[0])
      } else {
        return Response.json({ error: 'Failed to parse examiner response. Please try again.' }, { status: 500 })
      }
    }

    return Response.json(result)
  } catch (err) {
    console.error('Scan error:', err?.message || err)
    return Response.json({ error: err?.message || 'Something went wrong' }, { status: 500 })
  }
}
