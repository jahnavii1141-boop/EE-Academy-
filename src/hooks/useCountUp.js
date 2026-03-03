import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

export function useCountUp(end, duration = 1.5) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const startTime = performance.now()

    function tick(now) {
      const elapsed = (now - startTime) / (duration * 1000)
      if (elapsed >= 1) {
        setValue(end)
        return
      }
      setValue(Math.floor(end * easeOutCubic(elapsed)))
      requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, end, duration])

  return { ref, value }
}
