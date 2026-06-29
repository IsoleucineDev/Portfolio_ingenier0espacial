import { createContext, useContext, type ReactNode } from 'react'
import type { ContentStore, ContentKey } from '@/types/content'
import { useLanguage } from './LanguageContext'

export interface BilingualStore {
  es: ContentStore
  en: ContentStore
}

const ContentContext = createContext<BilingualStore | null>(null)

export function ContentProvider({
  content,
  children,
}: {
  content: BilingualStore
  children: ReactNode
}) {
  return (
    <ContentContext.Provider value={content}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent<K extends ContentKey>(key: K): ContentStore[K] {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used inside ContentProvider')
  const { lang } = useLanguage()
  return ctx[lang][key]
}

export function useAllContent(): ContentStore {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useAllContent must be used inside ContentProvider')
  const { lang } = useLanguage()
  return ctx[lang]
}

// ── Loader ─────────────────────────────────────────────────────────────────────
import type { ThemeConfig } from '@/types/theme'
import { CLIENT_ID } from './ThemeContext'

export async function loadContent(): Promise<{ content: BilingualStore; theme: ThemeConfig }> {
  const [
    meta, navigation, hero, portfolio, about, contact,
    navigationEn, heroEn, aboutEn, contactEn,
    theme,
  ] = await Promise.all([
    import(`../clients/${CLIENT_ID}/content/meta.json`).then(m => m.default),
    import(`../clients/${CLIENT_ID}/content/navigation.json`).then(m => m.default),
    import(`../clients/${CLIENT_ID}/content/hero.json`).then(m => m.default),
    import(`../clients/${CLIENT_ID}/content/portfolio.json`).then(m => m.default),
    import(`../clients/${CLIENT_ID}/content/about.json`).then(m => m.default),
    import(`../clients/${CLIENT_ID}/content/contact.json`).then(m => m.default),
    import(`../clients/${CLIENT_ID}/content/navigation.en.json`).then(m => m.default),
    import(`../clients/${CLIENT_ID}/content/hero.en.json`).then(m => m.default),
    import(`../clients/${CLIENT_ID}/content/about.en.json`).then(m => m.default),
    import(`../clients/${CLIENT_ID}/content/contact.en.json`).then(m => m.default),
    import(`../clients/${CLIENT_ID}/theme.json`).then(m => m.default),
  ])

  const esStore: ContentStore = { meta, navigation, hero, portfolio, about, contact }
  const enStore: ContentStore = { meta, navigation: navigationEn, hero: heroEn, portfolio, about: aboutEn, contact: contactEn }

  return {
    content: { es: esStore, en: enStore },
    theme: theme as ThemeConfig,
  }
}
