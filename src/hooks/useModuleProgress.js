import { useState, useCallback, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'

const STORAGE_KEY = 'ee_progress'

function getStoredProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function useModuleProgress() {
  const { isSignedIn, userId } = useAuth()
  const [progress, setProgress] = useState(getStoredProgress)

  // Load from Supabase on sign-in
  useEffect(() => {
    if (!isSignedIn) return
    fetch('/api/progress')
      .then(r => r.json())
      .then(({ progress: remote }) => {
        if (remote) {
          const merged = { ...getStoredProgress(), ...remote }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
          setProgress(merged)
        }
      })
      .catch(() => {})
  }, [isSignedIn])

  const markVisited = useCallback((moduleId) => {
    if (!moduleId) return
    const current = getStoredProgress()
    if (current[moduleId]) return
    const next = { ...current, [moduleId]: true }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setProgress(next)
    // Persist to Supabase if signed in
    if (isSignedIn) {
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ module_id: moduleId }),
      }).catch(() => {})
    }
  }, [isSignedIn])

  const getSectionProgress = useCallback((moduleIds) => {
    if (!moduleIds || moduleIds.length === 0) return 0
    const current = getStoredProgress()
    const visitedCount = moduleIds.filter((id) => current[id]).length
    return visitedCount / moduleIds.length
  }, [progress])

  const isVisited = useCallback((moduleId) => {
    return Boolean(progress[moduleId])
  }, [progress])

  return { progress, markVisited, getSectionProgress, isVisited }
}
