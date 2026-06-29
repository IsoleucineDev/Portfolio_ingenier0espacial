import { useState, useEffect } from 'react'

/**
 * Tracks which section id is currently most visible in the viewport.
 * Uses scroll position so tall sections (taller than viewport) are handled correctly.
 * The "active" section is the last one whose top edge is above 42% of the viewport height.
 */
export function useActiveSection(ids: readonly string[]): string {
  const [activeId, setActiveId] = useState('')
  const key = ids.join(',')

  useEffect(() => {
    const sectionIds = key ? key.split(',') : []

    const update = () => {
      if (!sectionIds.length) {
        setActiveId('')
        return
      }
      const threshold = window.scrollY + window.innerHeight * 0.42
      let found = ''
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY
          if (top <= threshold) {
            found = sectionIds[i]
            break
          }
        }
      }
      setActiveId(found)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [key])

  return activeId
}
