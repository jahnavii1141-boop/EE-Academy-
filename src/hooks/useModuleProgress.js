import { useState, useCallback } from 'react'

const STORAGE_KEY = 'ee_progress'

function getStoredProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function useModuleProgress() {
  const [progress, setProgress] = useState(getStoredProgress)

  const markVisited = useCallback((moduleId) => {
    if (!moduleId) return
    const current = getStoredProgress()
    if (current[moduleId]) return // already visited, no update needed
    const next = { ...current, [moduleId]: true }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setProgress(next)
  }, [])

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
