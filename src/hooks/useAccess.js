'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'

// Returns the user's access tier from Supabase workspace
// tier: null (free) | 'basic' (standard) | 'premium'
// hasPaid: boolean
// loading: boolean
export function useAccess() {
  const { isSignedIn, isLoaded } = useAuth()
  const [state, setState] = useState({ tier: null, hasPaid: false, loading: true })

  useEffect(() => {
    if (!isLoaded) return

    if (!isSignedIn) {
      // Use a microtask to avoid synchronous setState in effect
      const t = setTimeout(() => {
        setState({ tier: null, hasPaid: false, loading: false })
      }, 0)
      return () => clearTimeout(t)
    }

    fetch('/api/workspace')
      .then(r => r.json())
      .then(({ workspace }) => {
        setState({
          tier: workspace?.tier ?? null,
          hasPaid: workspace?.has_paid ?? false,
          loading: false,
        })
      })
      .catch(() => setState({ tier: null, hasPaid: false, loading: false }))
  }, [isSignedIn, isLoaded])

  return {
    ...state,
    // Can access full course (all modules)
    hasStandard: state.hasPaid,
    // Can access tools + AI — anyone who has paid gets full access
    // (DB schema has no tier column, only has_paid)
    hasPremium: state.hasPaid,
  }
}
