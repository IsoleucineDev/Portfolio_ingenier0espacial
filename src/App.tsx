import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@/context/ThemeContext'
import { ContentProvider, type BilingualStore } from '@/context/ContentContext'
import { LanguageProvider } from '@/context/LanguageContext'
import AppRouter from '@/router'
import type { ThemeConfig } from '@/types/theme'

interface AppProps {
  theme: ThemeConfig
  content: BilingualStore
}

export default function App({ theme, content }: AppProps) {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <ThemeProvider theme={theme}>
          <ContentProvider content={content}>
            <AppRouter />
          </ContentProvider>
        </ThemeProvider>
      </LanguageProvider>
    </HelmetProvider>
  )
}
