import Anthropic from '@anthropic-ai/sdk'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { serverError } from '@/lib/apiError'

const FREE_LIMIT = 3

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  )
}

function buildSystemPrompt(subject, rq, supervisorName) {
  return `You are the EE Mentor — a specialist in the IB Extended Essay built into EE Academy, a course platform for IB students.

You are deeply knowledgeable about:
- The IB Extended Essay assessment criteria (A: Focus & Method, B: Knowledge & Understanding, C: Critical Thinking, D: Presentation, E: Engagement)
- Research methodology for every IB subject
- Academic writing conventions: argumentation, analysis, citation, structure
- The RPPF (Reflections on Planning and Progress Form)
- Common mistakes students make and how to fix them
- What examiners actually reward

The student you are speaking with is writing their Extended Essay in: **${subject || 'an IB subject'}**
${rq ? `Their current research question is: "${rq}"` : ''}
${supervisorName ? `Their supervisor is: ${supervisorName}` : ''}

Your role:
- Help them develop and refine their research question
- Advise on argumentation, structure, and evidence
- Give subject-specific guidance for ${subject || 'their subject'}
- Review sections of their essay when they share them
- Help them understand and apply the IB criteria
- Be honest — if their argument is weak, tell them and show them how to strengthen it

Tone: Direct, expert, warm. Like a brilliant older student who got a near-perfect EE score and genuinely wants to help. Academic but never stuffy. Short sentences when giving instructions. Longer when explaining concepts. Use examples freely.

Never make up sources or fabricate data. If you don't know something specific to their subject, say so and advise them to verify with their supervisor.

Format your responses clearly. Use short paragraphs. Use **bold** for key terms. Use bullet points when listing criteria, steps, or examples. Keep responses focused — don't pad.`
}

export async function POST(req) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error('ANTHROPIC_API_KEY is not set')
      return Response.json({ error: 'api_key_missing' }, { status: 503 })
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const { userId } = await auth()
    if (!userId) {
      return Response.json({ error: 'Not signed in' }, { status: 401 })
    }

    const supabase = getSupabase()
    const { data: workspace } = await supabase
      .from('user_workspace')
      .select('*')
      .eq('clerk_user_id', userId)
      .single()

    const isPremium = workspace?.has_paid && workspace?.tier === 'premium'
    const freeUses = workspace?.agent_free_uses ?? 0

    // Non-premium: enforce free trial limit
    if (!isPremium) {
      if (freeUses >= FREE_LIMIT) {
        return Response.json({
          error: 'trial_limit_reached',
          freeUses,
          limit: FREE_LIMIT,
        }, { status: 403 })
      }

      // Increment usage before streaming so interrupted sessions still count
      await supabase
        .from('user_workspace')
        .update({ agent_free_uses: freeUses + 1 })
        .eq('clerk_user_id', userId)
    }

    const { messages } = await req.json()
    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid messages' }, { status: 400 })
    }

    const systemPrompt = buildSystemPrompt(
      workspace.subject,
      workspace.research_question,
      workspace.supervisor_name,
    )

    const stream = await anthropic.messages.stream({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      system: systemPrompt,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text))
            }
          }
        } finally {
          controller.close()
        }
      },
    })

    // Tell the client how many free uses remain after this message
    const usesAfter = isPremium ? null : freeUses + 1
    const remaining = isPremium ? null : Math.max(0, FREE_LIMIT - usesAfter)

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Accel-Buffering': 'no',
        ...(remaining !== null && { 'X-Free-Uses-Remaining': String(remaining) }),
      },
    })
  } catch (err) {
    return serverError('ai-agent', err)
  }
}
