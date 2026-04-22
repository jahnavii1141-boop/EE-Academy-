const PADDLE_SRC = 'https://cdn.paddle.com/paddle/v2/paddle.js'

let paddlePromise

function loadScript() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.Paddle) return Promise.resolve(window.Paddle)

  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${PADDLE_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Paddle), { once: true })
      existing.addEventListener('error', reject, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = PADDLE_SRC
    script.async = true
    script.onload = () => resolve(window.Paddle)
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export async function getPaddle({ environment, clientToken }) {
  if (!clientToken) return null

  if (!paddlePromise) {
    paddlePromise = loadScript().then((Paddle) => {
      if (!Paddle) return null
      if (environment && environment !== 'production') {
        Paddle.Environment.set(environment)
      }
      Paddle.Initialize({ token: clientToken })
      return Paddle
    })
  }

  return paddlePromise
}
