import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://akiwzservvontpbsfxjg.supabase.co'
const SERVICE_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFraXd6c2VydnZvbnRwYnNmeGpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjkwOTIzOSwiZXhwIjoyMDkyNDg1MjM5fQ.9zkRPmM8dFc2d9hfbOZ3NPZQqFN75jyPJTPhh-5LrKQ'

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)
const targetId = process.argv[2] || null

const { data: users, error: listErr } = await supabase
  .from('user_workspace')
  .select('clerk_user_id, subject, has_paid')

if (listErr) { console.error('❌ Could not list users:', listErr.message); process.exit(1) }

console.log('\nUsers in workspace table:')
users.forEach((u, i) => {
  console.log(`  ${i + 1}. ${u.clerk_user_id}  subject=${u.subject || '—'}  paid=${u.has_paid}`)
})

const targets = targetId ? users.filter(u => u.clerk_user_id === targetId) : users

if (targets.length === 0) {
  console.log(targetId ? `\n❌ No user found with ID: ${targetId}` : '\n❌ No users in workspace table yet.')
  process.exit(1)
}

console.log(`\nGranting premium to ${targets.length} user(s)…`)

for (const u of targets) {
  const { error } = await supabase
    .from('user_workspace')
    .update({ has_paid: true, updated_at: new Date().toISOString() })
    .eq('clerk_user_id', u.clerk_user_id)

  if (error) console.error(`  ❌ ${u.clerk_user_id}: ${error.message}`)
  else console.log(`  ✓ ${u.clerk_user_id}`)
}

console.log('\nDone. Hard-refresh theextendedessay.com/dashboard.')
