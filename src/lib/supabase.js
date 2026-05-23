import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Lazy client — only instantiated when first used, not at module load time
let _supabase
export function getSupabase() {
  if (!_supabase) _supabase = createClient(supabaseUrl, supabaseAnonKey)
  return _supabase
}

// Keep named export for backwards compatibility with existing imports
export const supabase = new Proxy({}, {
  get(_, prop) {
    return getSupabase()[prop]
  }
})

// Server-side client with service role (bypasses RLS)
// Read env vars at call time (not module load time) so they're available at runtime
export function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  return createClient(url, key)
}
