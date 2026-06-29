import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { loadContent } from './context/ContentContext'

async function bootstrap() {
  const { content, theme } = await loadContent()

  const root = document.getElementById('root')
  if (!root) throw new Error('No root element found')

  createRoot(root).render(
    <StrictMode>
      <App theme={theme} content={content} />
    </StrictMode>
  )
}

bootstrap().catch(console.error)
