const PADDLE_SRC = 'https://cdn.paddle.com/paddle/v2/paddle.js'

let initialized = false

function loadScript() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.Paddle) return Promise.resolve(window.Paddle)

  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${PADDLE_SRC}"]`)
    if (existing) {
      // Script tag exists but Paddle may not be ready yet
      const check = setInterval(() => {
        if (window.Paddle) {
          clearInterval(check)
          resolve(window.Paddle)
        }
      }, 50)
      setTimeout(() => {
        clearInterval(check)
        reject(new Error('Paddle script timeout'))
      }, 10000)
      return
    }

    const script = document.createElement('script')
    script.src = PADDLE_SRC
    script.async = true
    script.onload = () => resolve(window.Paddle)
    script.onerror = () => reject(new Error('Paddle script failed to load'))
    document.head.appendChild(script)
  })
}

export async function getPaddle({ environment, clientToken }) {
  if (!clientToken) {
    console.error('Paddle: no client token configured')
    return null
  }

  try {
    const Paddle = await loadScript()
    if (!Paddle) return null

    if (!initialized && !window.__paddleInitialized) {
      // Only set sandbox environment — production is default
      if (environment && environment !== 'production') {
        Paddle.Environment.set(environment)
      }
      Paddle.Initialize({ token: clientToken })
      initialized = true
      window.__paddleInitialized = true
    }

    return Paddle
  } catch (err) {
    console.error('Paddle init error:', err)
    return null
  }
}
