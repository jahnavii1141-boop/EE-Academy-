// Vercel serverless function — email capture
// Receives { email, source } and forwards to hello@theextendedessay.com via Resend

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, source = 'unknown' } = req.body || {}

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[subscribe] RESEND_API_KEY not set')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'The Extended Essay Academy <hello@theextendedessay.com>',
        to: ['hello@theextendedessay.com'],
        subject: `New signup: ${email}`,
        html: `
          <p><strong>New email signup</strong></p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Source:</strong> ${source}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        `,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('[subscribe] Resend error:', err)
      return res.status(500).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[subscribe] Unexpected error:', err)
    return res.status(500).json({ error: 'Unexpected error' })
  }
}
