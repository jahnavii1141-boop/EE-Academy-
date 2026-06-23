import crypto from 'crypto'

// Mask an email for logs: "student@gmail.com" -> "s***@gmail.com"
export function maskEmail(email) {
  return String(email ?? '').replace(/^(.).*(@.*)$/, '$1***$2') || '(none)'
}

// Constant-time comparison for secrets (avoids timing side-channels).
// Length is checked first; a length mismatch is not itself secret here.
export function safeEqual(a, b) {
  const ab = Buffer.from(String(a ?? ''))
  const bb = Buffer.from(String(b ?? ''))
  if (ab.length !== bb.length) return false
  return crypto.timingSafeEqual(ab, bb)
}
