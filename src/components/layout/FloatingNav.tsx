import { useState, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHouse, faGamepad, faFilm, faHeadphones, faMusic, faUser, faEnvelope,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { useContent } from '@/context/ContentContext'
import { useLanguage } from '@/context/LanguageContext'
import { useActiveSection } from '@/hooks/useActiveSection'

const iconMap: Record<string, IconDefinition> = {
  Home:     faHouse,
  Gamepad2: faGamepad,
  Film:     faFilm,
  Ear:      faHeadphones,
  Music:    faMusic,
  User:     faUser,
  Mail:     faEnvelope,
}

const FRAME      = '#1C1612'
const KEY_WHITE  = 'linear-gradient(to bottom, #FDFAF3 0%, #EEE9DE 100%)'
const KEY_ACTIVE = 'linear-gradient(to bottom, #E6D09A 0%, #D4BC82 100%)'

const MotionLink = motion(Link)

function keyFallVariants(i: number) {
  return {
    hidden: { y: -80, opacity: 0, scaleY: 0.6 },
    visible: {
      y: 0, opacity: 1, scaleY: 1,
      transition: {
        delay: 0.85 + i * 0.07,
        type: 'spring' as const,
        stiffness: 340,
        damping: 21,
      },
    },
  }
}

export default function FloatingNav() {
  const { items } = useContent('navigation')
  const { pathname } = useLocation()
  const { lang, toggle } = useLanguage()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isHome = pathname === '/'
  const sectionIds = useMemo<readonly string[]>(
    () =>
      isHome
        ? items.filter(item => item.path.includes('#')).map(item => item.path.split('#')[1])
        : [],
    [isHome, items]
  )
  const activeSectionId = useActiveSection(sectionIds)

  function getIsActive(item: { path: string }): boolean {
    if (item.path.includes('#')) return isHome && activeSectionId === item.path.split('#')[1]
    if (item.path === '/') return isHome && activeSectionId === ''
    return pathname === item.path
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          DESKTOP: Piano keyboard (md and above)
      ══════════════════════════════════════════════════════════════ */}
      <motion.div
        className="hidden md:block fixed bottom-0 left-1/2 -translate-x-1/2 z-50"
        initial={{ y: 130, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'bottom center' }}
      >
        <div
          style={{
            background: `linear-gradient(to bottom, #3A2820 0%, ${FRAME} 60%)`,
            borderRadius: '10px 10px 0 0',
            padding: '6px 8px 0',
            boxShadow: '0 -6px 28px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.06)',
            border: '1.5px solid #4A3428',
            borderBottom: 'none',
            overflow: 'visible',
          }}
        >
          <div
            style={{
              position: 'absolute', top: 0, left: 12, right: 12, height: '2px',
              background: 'linear-gradient(to right, transparent, rgba(200,160,80,0.35), transparent)',
              borderRadius: '1px',
            }}
            aria-hidden
          />
          <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-start' }}>
            {items.map((item, i) => {
              const icon     = iconMap[item.iconName] ?? faHouse
              const isActive = getIsActive(item)
              const isHash   = item.path.includes('#')
              const variants = keyFallVariants(i)

              const keyBaseStyle: React.CSSProperties = {
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                justifyContent: 'space-between',
                padding:        '11px 0 8px',
                width:          50,
                height:         76,
                background:     isActive ? KEY_ACTIVE : KEY_WHITE,
                borderRadius:   '0 0 6px 6px',
                border:         '1.5px solid rgba(0,0,0,0.20)',
                borderTop:      'none',
                boxShadow:      isActive
                  ? 'inset 0 -1px 0 rgba(0,0,0,0.08), 0 2px 5px rgba(0,0,0,0.16)'
                  : '0 7px 16px rgba(0,0,0,0.28), inset 0 -2px 0 rgba(0,0,0,0.07)',
                transform:      isActive ? 'translateY(4px)' : undefined,
                cursor:         'pointer',
                textDecoration: 'none',
                outline:        'none',
                position:       'relative',
                flexShrink:     0,
              }

              const keyInner = (
                <>
                  <FontAwesomeIcon icon={icon} style={{ width: 14, height: 14, color: isActive ? '#7A4F1E' : '#746E67' }} />
                  {isActive && (
                    <div
                      style={{ position: 'absolute', bottom: 22, width: 4, height: 4, borderRadius: '50%', background: '#DF822A' }}
                      aria-hidden
                    />
                  )}
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: '6.5px', letterSpacing: '0.05em',
                    textTransform: 'uppercase', color: isActive ? '#7A4F1E' : '#A8A09A',
                    fontWeight: 700, lineHeight: 1,
                  }}>
                    {item.label.slice(0, 7)}
                  </span>
                </>
              )

              if (isHash) return (
                <motion.a
                  key={item.id}
                  href={item.path}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  style={keyBaseStyle}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  whileHover={!isActive ? { y: 2, boxShadow: '0 4px 8px rgba(0,0,0,0.22)' } : {}}
                  whileTap={{ y: 6, boxShadow: 'inset 0 -0px 0 rgba(0,0,0,0.12)' }}
                >
                  {keyInner}
                </motion.a>
              )

              return (
                <MotionLink
                  key={item.id}
                  to={item.path}
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                  style={keyBaseStyle}
                  variants={variants}
                  initial="hidden"
                  animate="visible"
                  whileHover={!isActive ? { y: 2, boxShadow: '0 4px 8px rgba(0,0,0,0.22)' } : {}}
                  whileTap={{ y: 6, boxShadow: 'inset 0 -0px 0 rgba(0,0,0,0.12)' }}
                >
                  {keyInner}
                </MotionLink>
              )
            })}

            {/* Black "sharp" key — language toggle */}
            <motion.button
              onClick={toggle}
              title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
              style={{
                width: 38, height: 52,
                background: 'linear-gradient(to bottom, #1e1e1e 0%, #2d2d2d 60%, #242424 100%)',
                borderRadius: '0 0 5px 5px',
                border: '1.5px solid #111', borderTop: 'none',
                boxShadow: '0 6px 12px rgba(0,0,0,0.55)',
                color: '#C8C0B0', fontFamily: 'var(--font-mono)', fontSize: '9px',
                fontWeight: 700, letterSpacing: '0.08em',
                cursor: 'pointer', outline: 'none', alignSelf: 'flex-start',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}
              variants={keyFallVariants(items.length)}
              initial="hidden"
              animate="visible"
              whileHover={{ background: 'linear-gradient(to bottom, #2a2a2a 0%, #3a3a3a 60%, #303030 100%)' }}
              whileTap={{ y: 4, boxShadow: '0 2px 6px rgba(0,0,0,0.4)' }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.14 }}
                >
                  {lang.toUpperCase()}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════
          MOBILE: FAB button + slide-up drawer (below md)
      ══════════════════════════════════════════════════════════════ */}
      <div className="md:hidden">

        {/* FAB toggle button */}
        <motion.button
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5"
          style={{
            background: `linear-gradient(to bottom, #3A2820, ${FRAME})`,
            border: '1.5px solid #4A3428',
            borderRadius: '22px',
            padding: '11px 18px',
            boxShadow: '0 4px 22px rgba(0,0,0,0.48)',
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileTap={{ scale: 0.91 }}
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileOpen ? 'x' : 'burger'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {mobileOpen ? (
                <FontAwesomeIcon icon={faXmark} style={{ width: 14, height: 14, color: '#C8C0B0' }} />
              ) : (
                <div className="flex flex-col gap-[4px]" style={{ width: 16 }}>
                  <div style={{ height: '1.5px', background: '#C8C0B0', borderRadius: 1 }} />
                  <div style={{ height: '1.5px', background: '#C8C0B0', borderRadius: 1, width: '70%' }} />
                  <div style={{ height: '1.5px', background: '#C8C0B0', borderRadius: 1 }} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: '#A8A09A', fontWeight: 700 }}>
            MENÚ
          </span>
        </motion.button>

        {/* Backdrop */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.58)', backdropFilter: 'blur(3px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Slide-up drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="drawer"
              className="fixed bottom-0 left-0 right-0 z-50"
              style={{
                background: `linear-gradient(160deg, #2E1E14 0%, ${FRAME} 100%)`,
                borderTop: '1.5px solid #4A3428',
                borderRadius: '20px 20px 0 0',
                boxShadow: '0 -8px 40px rgba(0,0,0,0.5)',
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1" aria-hidden>
                <div style={{ width: 38, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.14)' }} />
              </div>

              {/* Gold accent line */}
              <div
                style={{ height: 1, background: 'linear-gradient(to right, transparent, rgba(200,160,80,0.28), transparent)', margin: '4px 24px 10px' }}
                aria-hidden
              />

              {/* Nav rows */}
              <nav className="px-3">
                {items.map((item) => {
                  const icon     = iconMap[item.iconName] ?? faHouse
                  const isActive = getIsActive(item)
                  const isHash   = item.path.includes('#')

                  const rowStyle: React.CSSProperties = {
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '12px 16px', borderRadius: '10px', marginBottom: '2px',
                    background: isActive ? 'rgba(230,208,154,0.10)' : 'transparent',
                    color: isActive ? '#D4BC82' : 'rgba(200,192,176,0.52)',
                    textDecoration: 'none', width: '100%',
                    border: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-mono)', fontSize: '11px',
                    letterSpacing: '0.16em', textTransform: 'uppercase', textAlign: 'left',
                  }

                  const inner = (
                    <>
                      <FontAwesomeIcon icon={icon} style={{ width: 15, height: 15, flexShrink: 0 }} />
                      <span style={{ flex: 1 }}>{item.label}</span>
                      {isActive && (
                        <span
                          style={{ width: 6, height: 6, borderRadius: '50%', background: '#DF822A', display: 'inline-block', flexShrink: 0 }}
                          aria-hidden
                        />
                      )}
                    </>
                  )

                  if (isHash) return (
                    <a key={item.id} href={item.path} style={rowStyle} onClick={() => setMobileOpen(false)}>
                      {inner}
                    </a>
                  )

                  return (
                    <Link key={item.id} to={item.path} style={rowStyle} onClick={() => setMobileOpen(false)}>
                      {inner}
                    </Link>
                  )
                })}
              </nav>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '8px 24px' }} aria-hidden />

              {/* Language toggle */}
              <div className="px-6 pb-8">
                <button
                  onClick={toggle}
                  aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', gap: '10px',
                    padding: '12px 0', borderRadius: '10px',
                    background: 'rgba(200,192,176,0.07)',
                    border: '1px solid rgba(200,192,176,0.12)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.18em',
                  }}
                >
                  <span style={{ color: lang === 'es' ? '#D4BC82' : 'rgba(200,192,176,0.35)', fontWeight: lang === 'es' ? 700 : 400, transition: 'all 0.2s' }}>
                    ES
                  </span>
                  <span style={{ color: 'rgba(200,192,176,0.25)' }}>/</span>
                  <span style={{ color: lang === 'en' ? '#D4BC82' : 'rgba(200,192,176,0.35)', fontWeight: lang === 'en' ? 700 : 400, transition: 'all 0.2s' }}>
                    EN
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
