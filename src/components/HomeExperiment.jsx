'use client'

import { useState, useEffect } from 'react'
import posthog from 'posthog-js'
import Hero from './Hero'
import Curriculum from './Curriculum'
import HomeOffer from './HomeOffer'
import HomeVariant from './HomeVariant'

// PostHog experiment 'homepage-simplified-cta' (2026-08). Reads the flag and
// renders the minimal Google-only variant ('test') or the current homepage
// (anything else). Defaults to control, so server render + crawlers + anyone
// whose flags haven't loaded always get the full homepage — the variant only
// swaps in client-side once PostHog resolves the flag to 'test'.
export default function HomeExperiment() {
  const [variant, setVariant] = useState('control')

  useEffect(() => {
    const read = () => setVariant(posthog.getFeatureFlag('homepage-simplified-cta') || 'control')
    read()
    const unsub = posthog.onFeatureFlags(read)
    return () => { if (typeof unsub === 'function') unsub() }
  }, [])

  if (variant === 'test') return <HomeVariant />

  return (
    <>
      <Hero />
      <Curriculum />
      <HomeOffer />
    </>
  )
}
