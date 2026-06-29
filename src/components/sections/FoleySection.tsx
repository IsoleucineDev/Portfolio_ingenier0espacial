import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { UnderlineDoodle } from '@/components/Doodles'
import { easeOut } from '@/lib/motionVariants'
import { useLanguage } from '@/context/LanguageContext'

const HS = { fontFamily: "'Fredoka', 'Klee One', 'Yomogi', cursive" } as const

type Tab = 'foley' | 'shortfilm'

const TABS_ES = {
  foley: {
    src: '/media/Foley_1_Ex.mp4',
    label: 'Foley & Sound Design Showreel',
    date: '2026.06.26',
    description: 'Rediseño completo de texturas de audio ambiental y efectos mecánicos.',
    badgeColor: '#54343f',
    badgeText: 'MEDIA',
  },
  shortfilm: {
    src: '/media/soundtrack_ejemplo_1.mp4',
    label: 'Cortometraje / Rescore Cinematográfico',
    date: '2026.05.29',
    description: 'Banda sonora original para proyectos independientes y maquetas de re-orquestación.',
    badgeColor: '#48613C',
    badgeText: 'SHORT FILM',
  },
} as const

const TABS_EN = {
  foley: {
    src: '/media/Foley_1_Ex.mp4',
    label: 'Foley & Sound Design Showreel',
    date: '2026.06.26',
    description: 'Complete redesign of ambient audio textures and mechanical sound effects.',
    badgeColor: '#54343f',
    badgeText: 'MEDIA',
  },
  shortfilm: {
    src: '/media/soundtrack_ejemplo_1.mp4',
    label: 'Short Film / Cinematic Rescore',
    date: '2026.05.29',
    description: 'Original soundtrack for independent projects and re-orchestration demos.',
    badgeColor: '#48613C',
    badgeText: 'SHORT FILM',
  },
} as const

export default function FoleySection() {
  const [selectedTab, setSelectedTab] = useState<Tab>('foley')
  const { lang } = useLanguage()
  const TABS = lang === 'es' ? TABS_ES : TABS_EN
  const tab = TABS[selectedTab]

  const heading    = lang === 'es' ? 'Foleys & Cortometrajes' : 'Foley & Short Films'
  const subheading = lang === 'es'
    ? 'Efectos de sonido artesanales, sincronización cinematográfica y postproducción adaptativa.'
    : 'Handcrafted sound effects, cinematic synchronization and adaptive post-production.'
  const tabFoleyLabel    = lang === 'es' ? 'Foley Showcase Reel' : 'Foley Showcase Reel'
  const tabShortFilmLabel = lang === 'es' ? 'Cortometraje / Rescore' : 'Short Film / Rescore'

  return (
    <section
      id="foley"
      aria-label="Foleys y Cortometrajes"
      className="relative px-4 bg-white"
      style={{
        paddingTop: 'clamp(5rem, 10vw, 9rem)',
        paddingBottom: 'clamp(5rem, 10vw, 9rem)',
      }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -52, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ type: 'spring', stiffness: 240, damping: 18, delay: 0.04 }}
        >
          {/* Japanese label row */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-16" style={{ background: '#7CA36A50' }} />
            <span
              className="text-[10px] font-bold tracking-[0.26em] uppercase"
              style={{ fontFamily: 'var(--font-mono)', color: '#7CA36A' }}
            >
              音響効果 — FOLEY
            </span>
            <div className="h-px w-16" style={{ background: '#7CA36A50' }} />
          </div>

          <div className="flex items-start justify-center gap-3 mb-3">
            <FontAwesomeIcon
              icon={faFilm}
              style={{ width: 32, height: 32, color: '#7CA36A', opacity: 0.7, marginTop: '0.75rem' }}
            />
            <h2
              className="text-[#414441] leading-[0.88] text-left"
              style={{
                fontFamily: "'Nerko One', 'Fredoka', cursive",
                fontWeight: 400,
                fontSize: 'clamp(2.8rem, 7.5vw, 6rem)',
              }}
            >
              {heading.split('&').map((part, i, arr) => (
                <span key={i} className="block">
                  {i < arr.length - 1 ? part.trim() + ' &' : part.trim()}
                </span>
              ))}
            </h2>
          </div>

          <div className="flex justify-center mt-4">
            <UnderlineDoodle className="text-[#7CA36A]" width={220} />
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

        {/* Tabs */}
        <motion.div
          className="flex justify-center gap-3 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={{ visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } } }}
        >
          {([
            { tab: 'foley' as Tab,      label: tabFoleyLabel,    color: '#7CA36A' },
            { tab: 'shortfilm' as Tab,  label: tabShortFilmLabel, color: '#48613C' },
          ] as const).map(({ tab, label, color }) => (
            <motion.div
              key={tab}
              variants={{
                hidden: { opacity: 0, y: 26, scale: 0.86 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
              }}
            >
              <TabButton
                active={selectedTab === tab}
                activeColor={color}
                layoutId="activeVideoTab"
                onClick={() => setSelectedTab(tab)}
              >
                {label}
              </TabButton>
            </motion.div>
          ))}
        </motion.div>

        {/* Asymmetric 3/5 + 1/5 + 1/5 grid */}
        <motion.div
          className="relative py-4"
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.16 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTab}
              initial={{ opacity: 0, filter: 'blur(6px)', y: 10 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(6px)', y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
            >
              {/* 3/5: Video */}
              <div
                className="lg:col-span-3 w-full rounded-2xl overflow-hidden shadow-xl"
                style={{ border: '2px solid rgba(84,52,63,0.1)', background: '#1a1a1a' }}
              >
                <video
                  src={tab.src}
                  controls
                  preload="metadata"
                  className="w-full block aspect-video"
                  style={{ background: '#1a1a1a' }}
                />
              </div>

              {/* 1/5: Metadata */}
              <div className="lg:col-span-1 flex flex-col justify-center text-left space-y-3 pl-2">
                <div className="flex gap-2 flex-wrap items-center">
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider text-white"
                    style={{ ...HS, background: tab.badgeColor }}
                  >
                    {tab.badgeText}
                  </span>
                  <span className="text-xs text-[#54343f]/60 font-semibold" style={HS}>
                    {tab.date}
                  </span>
                </div>
                <h3
                  className="text-xl md:text-2xl font-bold text-[#54343f] leading-snug"
                  style={HS}
                >
                  {tab.label}
                </h3>
                <p className="text-xs text-[#54343f]/70 font-medium leading-relaxed" style={HS}>
                  {tab.description}
                </p>
              </div>

              {/* 1/5: Empty air margin */}
              <div className="hidden lg:block lg:col-span-1" />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function TabButton({
  children,
  active,
  activeColor,
  layoutId,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  activeColor: string
  layoutId: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="relative px-5 py-2.5 font-bold text-sm transition-colors"
      style={{
        ...HS,
        color: active ? '#ffffff' : 'rgba(65,68,65,0.55)',
        background: 'transparent',
        border: 'none',
        borderRadius: '6px',
        zIndex: 0,
        letterSpacing: '0.02em',
      }}
    >
      {active && (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 -z-10"
          style={{ background: activeColor, borderRadius: '6px' }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        />
      )}
      {children}
    </button>
  )
}
