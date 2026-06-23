// Centralized API error handling.
// Logs full detail server-side (for debugging) but returns a generic message
// to the client, so database errors, schema names, and stack traces never leak.
//
// Usage:  import { serverError } from '@/lib/apiError'
//         return serverError('workspace', error)
export function serverError(tag, err) {
  console.error(`[${tag}]`, err)
  return Response.json(
    { error: 'Something went wrong. Please try again.' },
    { status: 500 },
  )
}
