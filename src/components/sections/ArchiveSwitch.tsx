import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faFilm } from '@fortawesome/free-solid-svg-icons'
import VGMSection from './VGMSection'
import ShortFilmsSection from './ShortFilmsSection'
import { useLanguage } from '@/context/LanguageContext'

type Tab = 'vgm' | 'shortfilms'

const TABS: { id: Tab; labelEs: string; labelEn: string; icon: typeof faGamepad; accent: string }[] = [
  { id: 'vgm',        labelEs: 'VGM',          labelEn: 'VGM',         icon: faGamepad, accent: '#DF822A' },
  { id: 'shortfilms', labelEs: 'Short Films',   labelEn: 'Short Films', icon: faFilm,    accent: '#7CA36A' },
]

export default function ArchiveSwitch() {
  const [active, setActive] = useState<Tab>('vgm')
  const { lang } = useLanguage()


  return (
    <div id="videogames" style={{ position: 'relative' }}>
      {/* Hidden anchor so /#short-films hash still scrolls here */}
      <span id="short-films" style={{ position: 'absolute', top: 0 }} aria-hidden />

      {/* ── Segmented control ─────────────────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          display: 'flex',
          justifyContent: 'center',
          padding: '14px 16px',
          background: 'rgba(var(--color-canvas-rgb, 250,247,242), 0.88)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(84,52,63,0.07)',
        }}
      >
        <div
          role="tablist"
          aria-label="Seleccionar sección"
          style={{
            position: 'relative',
            display: 'flex',
            gap: 4,
            background: 'rgba(0,0,0,0.07)',
            borderRadius: 999,
            padding: 4,
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.10)',
          }}
        >
          {TABS.map(tab => {
            const isActive = tab.id === active
            const label    = lang === 'es' ? tab.labelEs : tab.labelEn
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.id)}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '9px 22px',
                  borderRadius: 999,
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  outline: 'none',
                  zIndex: 1,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: isActive ? '#fff' : 'rgba(65,68,65,0.55)',
                  transition: 'color 0.25s',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {/* Sliding pill highlight */}
                {isActive && (
                  <motion.span
                    layoutId="archive-switch-pill"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 999,
                      background: tab.accent,
                      boxShadow: `0 2px 12px ${tab.accent}55`,
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <FontAwesomeIcon
                  icon={tab.icon}
                  style={{ width: 12, height: 12, opacity: isActive ? 1 : 0.5 }}
                />
                {label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Content with crossfade ────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.38, ease: [0.25, 1, 0.35, 1] }}
        >
          {active === 'vgm'
            ? <VGMSection />
            : <ShortFilmsSection />
          }
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
