import type { ThemeConfig } from '@/types/theme'

export function applyTheme(theme: ThemeConfig): void {
  const root = document.documentElement

  Object.entries(theme.colors).forEach(([key, value]) => {
    if (value) root.style.setProperty(`--color-${key}`, value)
  })

  root.style.setProperty('--font-display', theme.fonts.display)
  root.style.setProperty('--font-body',    theme.fonts.body)
  root.style.setProperty('--font-mono',    theme.fonts.mono)

  if (theme.fonts.hand) {
    root.style.setProperty('--font-hand', theme.fonts.hand)
  }
}

export function injectFonts(googleFontsUrl: string): void {
  if (document.querySelector(`link[data-fonts="theme"]`)) return

  const preconnect1 = document.createElement('link')
  preconnect1.rel = 'preconnect'
  preconnect1.href = 'https://fonts.googleapis.com'
  document.head.appendChild(preconnect1)

  const preconnect2 = document.createElement('link')
  preconnect2.rel = 'preconnect'
  preconnect2.href = 'https://fonts.gstatic.com'
  preconnect2.crossOrigin = ''
  document.head.appendChild(preconnect2)

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = googleFontsUrl
  link.dataset.fonts = 'theme'
  document.head.appendChild(link)
}
