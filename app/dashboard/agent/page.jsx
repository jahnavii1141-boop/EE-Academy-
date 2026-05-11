'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import DashboardAIAgent from '@/page-components/DashboardAIAgent'

const FREE_LIMIT = 3

export default function AgentPage() {
  const { isSignedIn } = useAuth()
  const [isPremium, setIsPremium] = useState(false)
  const [freeUsesLeft, setFreeUsesLeft] = useState(FREE_LIMIT)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSignedIn) return
    fetch('/api/workspace')
      .then(r => r.json())
      .then(({ workspace }) => {
        const premium = workspace?.tier === 'premium' && workspace?.has_paid === true
        setIsPremium(premium)
        if (!premium) {
          const used = workspace?.agent_free_uses ?? 0
          setFreeUsesLeft(Math.max(0, FREE_LIMIT - used))
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [isSignedIn])

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-5 h-5 rounded-full border-2 border-black/10 border-t-black/40 animate-spin" />
      </div>
    )
  }

  return (
    <DashboardAIAgent
      isPremium={isPremium}
      freeUsesLeft={freeUsesLeft}
      setFreeUsesLeft={setFreeUsesLeft}
      freeLimit={FREE_LIMIT}
    />
  )
}
