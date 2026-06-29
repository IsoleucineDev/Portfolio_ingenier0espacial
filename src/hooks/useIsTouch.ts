import { useState, useEffect } from 'react'

export function useIsTouch(): boolean {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window
    )
  }, [])

  return isTouch
}
