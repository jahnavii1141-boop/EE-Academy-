export async function POST(request) {
  try {
    const { email, source = 'unknown' } = await request.json()

    if (!email || !email.includes('@')) {
      return Response.json({ error: 'Invalid email' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return Response.json({ error: 'Email service not configured' }, { status: 500 })
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'The Extended Essay Academy <onboarding@resend.dev>',
        to: ['hello@theextendedessay.com'],
        subject: `New signup: ${email}`,
        html: `<p><strong>Email:</strong> ${email}</p><p><strong>Source:</strong> ${source}</p>`,
      }),
    })

    if (!resendRes.ok) {
      const resendError = await resendRes.json()
      console.error('[Resend] Error:', JSON.stringify(resendError))
      return Response.json({ error: 'Email delivery failed', detail: resendError }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('[Subscribe] Error:', err)
    return Response.json({ error: 'Failed to process' }, { status: 500 })
  }
}
