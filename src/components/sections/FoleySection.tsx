import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { UnderlineDoodle } from '@/components/Doodles'
import VideoPlayer, { type VideoItem } from '@/components/video/VideoPlayer'
import { useLanguage } from '@/context/LanguageContext'

const MONO = { fontFamily: 'var(--font-mono)' } as const

type Tab = 'foley' | 'shortfilm'

const FOLEY_VIDEOS: VideoItem[] = [
  { title: 'Foley_1_Ex', src: 'https://youtu.be/GS89yfeMNWQ' },
]

const SHORTFILM_VIDEOS: VideoItem[] = [
  { title: 'Foley_2_Ex', src: '/media/Foley_2_Ex.mp4' },
  { title: 'Foley_3_Ex', src: '/media/Foley_3_Ex.mp4' },
]

export default function FoleySection() {
  const [tab, setTab] = useState<Tab>('foley')
  const { lang } = useLanguage()

  const subheading = lang === 'es'
    ? 'Efectos de sonido artesanales, sincronización cinematográfica y postproducción adaptativa.'
    : 'Handcrafted sound effects, cinematic synchronization and adaptive post-production.'

  const tabs: { id: Tab; label: string; color: string }[] = [
    { id: 'foley',     label: 'Foley',       color: '#7CA36A' },
    { id: 'shortfilm', label: 'Short Film',   color: '#48613C' },
  ]

  const accentColor  = tab === 'foley' ? '#7CA36A' : '#48613C'
  const activeVideos = tab === 'foley' ? FOLEY_VIDEOS : SHORTFILM_VIDEOS

  return (
    <section
      id="foley"
      aria-label="Foley & Short Films"
      className="relative px-4 bg-white"
      style={{
        paddingTop: 'clamp(5rem, 10vw, 9rem)',
        paddingBottom: 'clamp(5rem, 10vw, 9rem)',
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.35, 1], delay: 0.04 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16" style={{ background: '#7CA36A50' }} />
            <span
              className="text-[10px] font-bold tracking-[0.26em] uppercase"
              style={{ ...MONO, color: '#7CA36A' }}
            >
              音響効果 — FOLEY & SHORT FILMS
            </span>
            <div className="h-px w-16" style={{ background: '#7CA36A50' }} />
          </div>

          <div className="flex items-start justify-center gap-3 mb-3">
            <FontAwesomeIcon
              icon={faFilm}
              style={{ width: 30, height: 30, color: '#7CA36A', opacity: 0.7, marginTop: '0.7rem' }}
            />
            <h2
              className="text-[#414441] leading-[0.88] text-left"
              style={{
                fontFamily: "'Nerko One', 'Fredoka', cursive",
                fontWeight: 400,
                fontSize: 'clamp(2.8rem, 7.5vw, 6rem)',
              }}
            >
              Foley &amp; Short Films
            </h2>
          </div>

          <div className="flex justify-center mt-4">
            <UnderlineDoodle className="text-[#7CA36A]" width={260} />
          </div>
          <p
            className="mt-5 max-w-xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'Caveat', cursive",
              fontWeight: 600,
              fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
              color: 'rgba(84,52,63,0.62)',
            }}
          >
            {subheading}
          </p>
        </motion.div>

        {/* ── Tab buttons ── */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.35, 1] }}
        >
          <div
            role="tablist"
            className="flex gap-1 p-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.06)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.08)' }}
          >
            {tabs.map(t => {
              const isActive = tab === t.id
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setTab(t.id)}
                  className="relative px-6 py-2.5 rounded-full font-bold text-xs transition-colors"
                  style={{
                    ...MONO,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: isActive ? '#fff' : 'rgba(65,68,65,0.5)',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    zIndex: 0,
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="foley-tab-pill"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ background: t.color, boxShadow: `0 2px 10px ${t.color}55` }}
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {t.label}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* ── Video player ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.35, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <VideoPlayer videos={activeVideos} accentColor={accentColor} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  )
}
