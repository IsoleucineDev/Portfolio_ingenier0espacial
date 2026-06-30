import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { UnderlineDoodle, StarDoodle, SparkDoodle } from '@/components/Doodles'
import WashiTape from '@/components/effects/WashiTape'
import { useLanguage } from '@/context/LanguageContext'

export interface ArchiveTrack {
  id: string
  num: number
  title: string
  category: string
  soundcloudUrl: string
  description: string
  genre: string
}

interface MusicArchiveProps {
  sectionId: string
  label: string
  heading: string
  subheading: string
  tracks: ArchiveTrack[]
  accentColor: string
  accentHex: string
  bg: string
  icon: React.ReactNode
  washiColor?: 'gold' | 'sage' | 'rose' | 'sky' | 'spring'
  bgImage?: string
  nextSectionId?: string
  nextSectionLabel?: string
}

const HS   = { fontFamily: "'Fredoka', 'Klee One', 'Yomogi', cursive" } as const
const MONO = { fontFamily: 'var(--font-mono)' } as const

const VINYL_SIZE = 252

function buildSCUrl(trackUrl: string, colorHex: string) {
  return (
    `https://w.soundcloud.com/player/?url=${encodeURIComponent(trackUrl)}` +
    `&color=%23${colorHex}&auto_play=false&hide_related=true` +
    `&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`
  )
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
} as const

const itemVariants = {
  hidden:   { opacity: 0, x: -14 },
  visible:  { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } },
} as const

// ── Vinyl disc visual ─────────────────────────────────────────────────────────
function VinylDisc({ track, accentColor }: { track: ArchiveTrack; accentColor: string }) {
  const S = VINYL_SIZE
  const cx = S / 2
  const grooveRadii = [0.48, 0.52, 0.56, 0.60, 0.64, 0.68, 0.72, 0.76, 0.80, 0.84, 0.88, 0.92, 0.96]

  return (
    <div
      className="relative mx-auto select-none"
      style={{ width: S, height: S, borderRadius: '50%' }}
    >
      {/* Disc body */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle at 38% 32%, #2e2e2e 0%, #1a1a1a 55%, #101010 100%)',
          boxShadow: `0 14px 52px rgba(0,0,0,0.65), 0 4px 18px rgba(0,0,0,0.45), inset 0 0 0 1.5px rgba(255,255,255,0.045)`,
        }}
      />

      {/* Groove rings */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={S}
        height={S}
        viewBox={`0 0 ${S} ${S}`}
        aria-hidden
      >
        {grooveRadii.map((r, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cx}
            r={r * cx}
            fill="none"
            stroke={i % 3 === 0 ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)'}
            strokeWidth={i % 3 === 0 ? 1.2 : 0.7}
          />
        ))}
      </svg>

      {/* Conic sheen */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'conic-gradient(from 105deg, rgba(255,255,255,0.05) 0deg, transparent 65deg, rgba(255,255,255,0.025) 180deg, transparent 250deg)',
        }}
        aria-hidden
      />

      {/* Center label */}
      <div
        className="absolute rounded-full flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          width: '40%',
          height: '40%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(circle at 38% 32%, ${accentColor}f0 0%, ${accentColor}cc 100%)`,
          boxShadow: `0 0 0 2.5px rgba(0,0,0,0.35), 0 4px 14px rgba(0,0,0,0.45), 0 0 0 1px ${accentColor}70`,
          padding: '6px 4px',
          gap: '2px',
        }}
      >
        <span style={{ ...MONO, fontSize: '7px', color: 'rgba(255,255,255,0.60)', letterSpacing: '0.12em', textTransform: 'uppercase', lineHeight: 1 }}>
          {String(track.num).padStart(2, '0')}
        </span>
        <span style={{ ...HS, fontSize: '8px', color: 'white', fontWeight: 700, lineHeight: 1.15, maxWidth: '88%', wordBreak: 'break-word' }}>
          {track.title.length > 14 ? track.title.slice(0, 13) + '…' : track.title}
        </span>
        <span style={{ ...MONO, fontSize: '6px', color: 'rgba(255,255,255,0.50)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '1px', lineHeight: 1 }}>
          {track.category}
        </span>
      </div>

      {/* Center spindle hole */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: '5.5%',
          height: '5.5%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#080808',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.10), 0 0 0 1px rgba(0,0,0,0.5)',
        }}
        aria-hidden
      />
    </div>
  )
}

export default function MusicArchive({
  sectionId,
  label,
  heading,
  subheading,
  tracks,
  accentColor,
  accentHex,
  bg,
  icon,
  washiColor = 'gold',
  bgImage,
  nextSectionId,
  nextSectionLabel,
}: MusicArchiveProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)
  const track = tracks[activeIdx]
  const { lang } = useLanguage()

  const prev = () => { setDirection(-1); setActiveIdx(i => (i - 1 + tracks.length) % tracks.length) }
  const next = () => { setDirection(1);  setActiveIdx(i => (i + 1) % tracks.length) }

  const t = {
    archive:  lang === 'es' ? 'Archivo'  : 'Archive',
    tracks:   lang === 'es' ? 'piezas'   : 'tracks',
    prev:     lang === 'es' ? 'Anterior' : 'Previous',
    next:     lang === 'es' ? 'Siguiente': 'Next',
    prevAria: lang === 'es' ? 'Pista anterior' : 'Previous track',
    nextAria: lang === 'es' ? 'Siguiente pista': 'Next track',
    goTo:     (n: number) => lang === 'es' ? `Ir a pista ${n}` : `Go to track ${n}`,
  }

  return (
    <section
      id={sectionId}
      className="relative"
      style={{
        background: bg,
        borderTop: `1px solid rgba(84,52,63,0.06)`,
        paddingTop: 'clamp(2.5rem, 5vw, 4rem)',
        paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
        overflowX: 'clip',
      }}
    >
      {/* Blurred background photo */}
      {bgImage && (
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }} aria-hidden>
          <img
            src={bgImage}
            alt=""
            className="w-full h-full object-cover object-center"
            style={{ filter: 'blur(5px)', transform: 'scale(1.03)', opacity: 0.32 }}
          />
        </div>
      )}

      {/* Floating ambient decorations */}
      <motion.div
        className="absolute top-12 right-10 pointer-events-none"
        style={{ color: accentColor, opacity: 0.14 }}
        animate={{ y: [-8, 8, -8], rotate: [0, 14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <StarDoodle size={42} />
      </motion.div>
      <motion.div
        className="absolute bottom-16 left-10 pointer-events-none"
        style={{ color: accentColor, opacity: 0.09 }}
        animate={{ y: [6, -6, 6], rotate: [0, -11, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        aria-hidden
      >
        <SparkDoodle size={30} />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-7"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.35, 1], delay: 0.04 }}
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px flex-1 max-w-[64px]" style={{ background: `${accentColor}50` }} />
            <span className="text-[10px] font-bold tracking-[0.26em] uppercase" style={{ ...MONO, color: accentColor }}>
              {label}
            </span>
            <div className="h-px flex-1 max-w-[64px]" style={{ background: `${accentColor}50` }} />
          </div>

          <div className="flex items-start justify-center gap-3 mb-3">
            <span className="mt-3 opacity-70">{icon}</span>
            <h2
              className="text-[#414441] leading-[0.88] text-left"
              style={{ fontFamily: "'Nerko One', 'Fredoka', cursive", fontWeight: 400, fontSize: 'clamp(2.2rem, 4.5vw, 4rem)' }}
            >
              {heading.split(' ').map((word, i) => <span key={i} className="block">{word}</span>)}
            </h2>
          </div>

          <div className="flex justify-center mt-2">
            <span style={{ color: accentColor }}><UnderlineDoodle width={200} /></span>
          </div>

          <p
            className="mt-2 max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Caveat', cursive", fontWeight: 600, fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)', color: 'rgba(84,52,63,0.62)' }}
          >
            {subheading}
          </p>
        </motion.div>

        {/* ── Body ───────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 items-start">

          {/* ── Left: Track List ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.65, ease: [0.25, 1, 0.35, 1], delay: 0.12 }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.76)',
                border: '1px solid rgba(84,52,63,0.08)',
                boxShadow: '0 1px 2px rgba(84,52,63,0.04), 0 4px 16px rgba(84,52,63,0.06)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {/* List header */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b"
                style={{ borderColor: 'rgba(84,52,63,0.07)', background: `${accentColor}07` }}
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.24em]" style={{ ...MONO, color: accentColor }}>
                  {t.archive}
                </span>
                <span className="text-[9px] font-bold" style={{ ...MONO, color: `${accentColor}80` }}>
                  {String(tracks.length).padStart(2, '0')} {t.tracks}
                </span>
              </div>

              {/* Track rows */}
              <motion.div
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                className="overflow-y-auto"
                style={{ maxHeight: '420px' }}
              >
                {tracks.map((trk, idx) => {
                  const active = idx === activeIdx
                  return (
                    <motion.button
                      key={trk.id}
                      variants={itemVariants}
                      onClick={() => { setDirection(idx > activeIdx ? 1 : -1); setActiveIdx(idx) }}
                      className="w-full text-left flex items-center gap-3 px-5 py-3 relative border-b last:border-b-0 transition-colors duration-150"
                      style={{ borderColor: 'rgba(84,52,63,0.06)', background: active ? `${accentColor}0e` : 'transparent' }}
                      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = `${accentColor}06` }}
                      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                      whileTap={{ scale: 0.99 }}
                      aria-current={active ? 'true' : undefined}
                    >
                      {active && (
                        <motion.div
                          layoutId={`track-bar-${sectionId}`}
                          className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full"
                          style={{ background: accentColor }}
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        />
                      )}

                      <span
                        className="text-[11px] tabular-nums w-6 text-center shrink-0 select-none"
                        style={{ ...MONO, fontWeight: 700, color: active ? accentColor : 'rgba(84,52,63,0.25)' }}
                      >
                        {String(trk.num).padStart(2, '0')}
                      </span>

                      <div className="w-3 h-3 shrink-0 flex items-center justify-center">
                        {active && (
                          <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{ background: accentColor }}
                            animate={{ scale: [1, 1.45, 1], opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        )}
                      </div>

                      <span
                        className="flex-1 text-sm truncate"
                        style={{ ...HS, color: active ? '#414441' : 'rgba(65,68,65,0.6)', fontWeight: active ? 700 : 450 }}
                      >
                        {trk.title}
                      </span>

                      <span
                        className="text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 hidden sm:inline-flex"
                        style={{ ...MONO, color: active ? accentColor : 'rgba(84,52,63,0.25)', border: `1px solid ${active ? accentColor + '60' : 'rgba(84,52,63,0.12)'}` }}
                      >
                        {trk.category}
                      </span>
                    </motion.button>
                  )
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* ── Right: Vinyl + Player ─────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.35, 1], delay: 0.18 }}
          >

            {/* ── Vinyl disc ──────────────────────────────────────────── */}
            <div className="relative flex justify-center py-4">
              {/* Washi tape in corner */}
              <div className="absolute top-0 right-8 pointer-events-none">
                <WashiTape color={washiColor} rotate={2.5} width={72} />
              </div>

              {/* Shadow under vinyl */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: VINYL_SIZE,
                  height: VINYL_SIZE / 5,
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.22)',
                  filter: 'blur(18px)',
                  bottom: '0px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
                aria-hidden
              />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`vinyl-${track.id}`}
                  custom={direction}
                  initial={{ x: direction * 180, rotate: direction * 30, opacity: 0, scale: 0.85 }}
                  animate={{ x: 0, rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ x: direction * -180, rotate: direction * -30, opacity: 0, scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                  style={{ position: 'relative', zIndex: 2 }}
                >
                  <VinylDisc track={track} accentColor={accentColor} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Track info (compact, no description) ─────────────── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`info-${track.id}`}
                className="text-center"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <p className="text-[10px] uppercase tracking-widest mb-1" style={{ ...MONO, color: `${accentColor}90` }}>
                  {track.genre}
                </p>
                <h3 className="font-bold" style={{ ...HS, fontSize: 'clamp(1rem, 2vw, 1.3rem)', color: '#414441' }}>
                  {track.title}
                </h3>
              </motion.div>
            </AnimatePresence>

            {/* ── SoundCloud player ────────────────────────────────── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`sc-${track.id}`}
                className="rounded-xl overflow-hidden"
                style={{ border: `1px solid ${accentColor}28`, boxShadow: `0 2px 18px rgba(84,52,63,0.07)` }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32, delay: 0.07 }}
              >
                <iframe
                  src={buildSCUrl(track.soundcloudUrl, accentHex)}
                  width="100%"
                  height="166"
                  allow="autoplay"
                  title={`${track.title} — SoundCloud`}
                  style={{ border: 'none', display: 'block' }}
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>

            {/* ── Navigation ────────────────────────────────────────── */}
            <motion.div
              className="flex items-center justify-between pt-0.5"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.35, 1], delay: 0.28 }}
            >
              <motion.button
                onClick={prev}
                whileHover={{ x: -3, scale: 1.04 }}
                whileTap={{ scale: 0.88, x: 0 }}
                transition={{ type: 'spring', stiffness: 520, damping: 26 }}
                className="flex items-center gap-1.5 font-bold px-5 py-2.5 rounded-full"
                style={{ ...HS, fontSize: '13px', color: accentColor, border: `1.5px solid ${accentColor}42`, background: `${accentColor}09` }}
                aria-label={t.prevAria}
              >
                <FontAwesomeIcon icon={faChevronLeft} style={{ width: 12, height: 12 }} />
                {t.prev}
              </motion.button>

              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[11px] tabular-nums" style={{ ...MONO, color: 'rgba(84,52,63,0.45)', letterSpacing: '0.09em' }}>
                  {String(activeIdx + 1).padStart(2, '0')} / {String(tracks.length).padStart(2, '0')}
                </span>
                <div className="flex gap-1">
                  {tracks.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setDirection(i > activeIdx ? 1 : -1); setActiveIdx(i) }}
                      className="rounded-full transition-all duration-200"
                      style={{ width: i === activeIdx ? '16px' : '5px', height: '5px', background: i === activeIdx ? accentColor : `${accentColor}30` }}
                      aria-label={t.goTo(i + 1)}
                    />
                  ))}
                </div>
              </div>

              <motion.button
                onClick={next}
                whileHover={{ x: 3, scale: 1.04 }}
                whileTap={{ scale: 0.88, x: 0 }}
                transition={{ type: 'spring', stiffness: 520, damping: 26 }}
                className="flex items-center gap-1.5 font-bold px-5 py-2.5 rounded-full"
                style={{ ...HS, fontSize: '13px', color: accentColor, border: `1.5px solid ${accentColor}42`, background: `${accentColor}09` }}
                aria-label={t.nextAria}
              >
                {t.next}
                <FontAwesomeIcon icon={faChevronRight} style={{ width: 12, height: 12 }} />
              </motion.button>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* ── Scroll-to-next arrow ──────────────────────────────────── */}
      {nextSectionId && (
        <div className="flex flex-col items-center pb-8 pt-4 relative z-10">
          <motion.button
            onClick={() =>
              document.getElementById(nextSectionId)?.scrollIntoView({ behavior: 'smooth' })
            }
            aria-label={nextSectionLabel ?? 'Ir a la siguiente sección'}
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              outline: 'none',
              padding: '8px 16px',
            }}
          >
            {nextSectionLabel && (
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: accentColor,
                opacity: 0.7,
              }}>
                {nextSectionLabel}
              </span>
            )}
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              border: `1.5px solid ${accentColor}55`,
              background: `${accentColor}0E`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <FontAwesomeIcon
                icon={faChevronRight}
                rotation={90}
                style={{ width: 13, height: 13, color: accentColor }}
              />
            </div>
          </motion.button>
        </div>
      )}
    </section>
  )
}
