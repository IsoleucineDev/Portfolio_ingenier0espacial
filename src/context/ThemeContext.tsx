import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { applyTheme, injectFonts } from '@/lib/theme'
import type { ThemeConfig } from '@/types/theme'

// ── Types ──────────────────────────────────────────────────────────────────────
interface ThemeContextValue {
  theme: ThemeConfig
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

// ── Dynamic import of theme JSON ───────────────────────────────────────────────
const CLIENT_ID = (import.meta.env.VITE_CLIENT_ID as string | undefined) ?? 'ingenier0espacial'

async function loadTheme(): Promise<ThemeConfig> {
  const mod = await import(`../clients/${CLIENT_ID}/theme.json`)
  return mod.default as ThemeConfig
}

// ── Provider ───────────────────────────────────────────────────────────────────
let resolvedTheme: ThemeConfig | null = null

export function ThemeProvider({ theme, children }: { theme: ThemeConfig; children: ReactNode }) {
  useEffect(() => {
    applyTheme(theme)
    injectFonts(theme.fonts.googleFontsUrl)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}

export { loadTheme, resolvedTheme, CLIENT_ID }
