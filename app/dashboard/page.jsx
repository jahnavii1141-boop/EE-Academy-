import { redirect } from 'next/navigation'

// Canonical dashboard home is /dashboard/home (the Mission Map). Every entry
// point (navbar, brand link, onboarding) now lands on the same redesigned page.
export default function DashboardPage() {
  redirect('/dashboard/home')
}
