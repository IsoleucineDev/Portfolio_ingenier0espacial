import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FaSpotify, FaSoundcloud, FaInstagram, FaYoutube } from 'react-icons/fa'
import { SiYoutubemusic } from 'react-icons/si'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Stitch from '@/components/effects/Stitch'
import WashiTape from '@/components/effects/WashiTape'
import ScatterDeco from '@/components/effects/ScatterDeco'
import { useContent } from '@/context/ContentContext'

const socialIconMap: Record<string, React.FC<{ size?: number }>> = {
  spotify:      FaSpotify,
  soundcloud:   FaSoundcloud,
  instagram:    FaInstagram,
  youtube:      FaYoutube,
  youtubemusic: SiYoutubemusic,
}

const ORANGE_VIVID  = '#E8620A'
const ORANGE_BRIGHT = '#FF7B2F'
const GREEN_LIGHT   = '#AFE695'
const GREEN_MID     = '#7CA36A'
const GREEN_DARK    = '#48613C'

// ── Falling stars inside orange band ─────────────────────────────────────────
const RAIN_STARS = [
  { left: '7%',  size: 6, delay: 0,   dur: 3.5 },
  { left: '15%', size: 4, delay: 1.2, dur: 2.8 },
  { left: '24%', size: 7, delay: 0.6, dur: 4.0 },
  { left: '35%', size: 4, delay: 2.1, dur: 3.2 },
  { left: '46%', size: 9, delay: 0.3, dur: 3.8 },
  { left: '54%', size: 5, delay: 1.7, dur: 2.6 },
  { left: '62%', size: 6, delay: 0.9, dur: 4.3 },
  { left: '73%', size: 4, delay: 2.4, dur: 3.0 },
  { left: '82%', size: 8, delay: 1.0, dur: 3.7 },
  { left: '91%', size: 5, delay: 0.4, dur: 2.9 },
  { left: '20%', size: 3, delay: 3.0, dur: 4.5 },
  { left: '40%', size: 5, delay: 1.8, dur: 3.4 },
  { left: '60%', size: 4, delay: 2.6, dur: 2.7 },
  { left: '78%', size: 6, delay: 0.7, dur: 4.1 },
  { left: '3%',  size: 5, delay: 1.4, dur: 3.6 },
] as const

function StarRain() {
  return (
    <div
      className="absolute top-0 left-0 right-0 pointer-events-none"
      style={{
        height: 'clamp(440px, 68vw, 700px)',
        clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)',
        overflow: 'hidden',
        zIndex: 3,
      }}
      aria-hidden
    >
      {RAIN_STARS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.left, top: -s.size - 4 }}
          animate={{ y: [0, 760] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: 'linear' }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="rgba(255,255,255,0.55)">
            <path d="M12 0l1.5 9.5L23 12l-9.5 1.5L12 23l-1.5-9.5L2 12l9.5-1.5z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

// ── Querétaro · México location bar ──────────────────────────────────────────
function LocationBar() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: `1px dashed rgba(175,230,149,0.60)`,
        borderRadius: '4px',
        padding: '7px 14px',
        background: 'rgba(175,230,149,0.07)',
        marginTop: '4px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: GREEN_LIGHT,
        }}
      >
        Querétaro · México
      </span>
      <svg width="9" height="9" viewBox="0 0 24 24" fill={GREEN_LIGHT} style={{ opacity: 0.55, flexShrink: 0 }}>
        <path d="M12 0l1.5 9.5L23 12l-9.5 1.5L12 23l-1.5-9.5L2 12l9.5-1.5z" />
      </svg>
    </div>
  )
}

// ── Space decorative elements around the photo ───────────────────────────────
function SpaceDecos() {
  return (
    <>
      {/* Saturn planet — top-left of photo */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '-22%', left: '-26%', zIndex: 3 }}
        animate={{ y: [-5, 5, -5], rotate: [0, 8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <svg width="68" height="52" viewBox="0 0 68 52">
          {/* ring back half */}
          <ellipse cx="34" cy="26" rx="32" ry="9" fill="none"
            stroke={GREEN_LIGHT} strokeWidth="2" opacity="0.45"
            strokeDasharray="2 0" transform="rotate(-18 34 26)" />
          {/* planet body */}
          <circle cx="34" cy="26" r="15" fill={GREEN_MID} opacity="0.72" />
          {/* inner highlight */}
          <circle cx="30" cy="22" r="5" fill={GREEN_LIGHT} opacity="0.28" />
          {/* ring front half */}
          <path d="M 4 20 Q 34 40 64 20" fill="none"
            stroke={GREEN_LIGHT} strokeWidth="2" opacity="0.55" />
        </svg>
      </motion.div>

      {/* Small planet — bottom-right */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ bottom: '-18%', right: '-20%', zIndex: 3 }}
        animate={{ y: [4, -4, 4], rotate: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        aria-hidden
      >
        <svg width="44" height="44" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="12" fill={GREEN_DARK} opacity="0.65" />
          <circle cx="18" cy="18" r="4" fill={GREEN_LIGHT} opacity="0.22" />
          {/* ring */}
          <ellipse cx="22" cy="22" rx="20" ry="5.5" fill="none"
            stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"
            transform="rotate(-25 22 22)" />
        </svg>
      </motion.div>

      {/* Curved orbit arc — top-right */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ top: '-8%', right: '-30%', zIndex: 3 }}
        animate={{ opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <svg width="90" height="60" viewBox="0 0 90 60">
          <path d="M 0 50 Q 45 -10 90 50" fill="none"
            stroke={GREEN_LIGHT} strokeWidth="1.8"
            strokeDasharray="5 4" opacity="0.55" />
          {/* dot on the orbit */}
          <circle cx="45" cy="10" r="3.5" fill={GREEN_LIGHT} opacity="0.75" />
        </svg>
      </motion.div>

      {/* Orbit arc — bottom-left */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ bottom: '-14%', left: '-28%', zIndex: 3 }}
        animate={{ opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        aria-hidden
      >
        <svg width="72" height="48" viewBox="0 0 72 48">
          <path d="M 0 10 Q 36 58 72 10" fill="none"
            stroke="rgba(255,255,255,0.30)" strokeWidth="1.5"
            strokeDasharray="4 3" />
        </svg>
      </motion.div>

      {/* Green 4-point stars */}
      {[
        { top: '10%',  right: '-35%', size: 18, color: GREEN_LIGHT, opacity: 0.80, dur: 5,  delay: 0   },
        { top: '75%',  left:  '-32%', size: 12, color: GREEN_MID,   opacity: 0.65, dur: 7,  delay: 1.5 },
        { top: '-12%', right: '-12%', size: 10, color: 'white',     opacity: 0.55, dur: 6,  delay: 0.8 },
        { top: '88%',  right: '-18%', size: 14, color: GREEN_LIGHT, opacity: 0.60, dur: 8,  delay: 2.2 },
        { top: '30%',  left:  '-38%', size: 8,  color: 'white',     opacity: 0.40, dur: 9,  delay: 3   },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ top: s.top, right: (s as { right?: string }).right, left: (s as { left?: string }).left, color: s.color, opacity: s.opacity, zIndex: 3 }}
          animate={{ y: [-5, 5, -5], scale: [1, 1.2, 1] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
          aria-hidden
        >
          <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l1.5 9.5L23 12l-9.5 1.5L12 23l-1.5-9.5L2 12l9.5-1.5z"/>
          </svg>
        </motion.div>
      ))}

      {/* Sparkle dots */}
      {[
        { top: '55%', right: '-40%', color: GREEN_LIGHT },
        { top: '-5%', left: '-15%',  color: 'white'     },
        { top: '95%', left: '-10%',  color: GREEN_MID   },
      ].map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ top: d.top, right: (d as {right?:string}).right, left: (d as {left?:string}).left, width: 5, height: 5, background: d.color, opacity: 0.55, zIndex: 3 }}
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
          aria-hidden
        />
      ))}
    </>
  )
}

function BearSilhouette() {
  return (
    <svg viewBox="0 0 200 210" fill="currentColor" width="100%" height="100%" aria-hidden="true">
      <circle cx="44"  cy="58" r="34" />
      <circle cx="156" cy="58" r="34" />
      <circle cx="100" cy="118" r="82" />
      <ellipse cx="100" cy="162" rx="34" ry="26" />
    </svg>
  )
}

export default function HeroSection() {
  const hero = useContent('hero')
  const { social } = useContent('navigation')

  const sequence: (string | number)[] = hero.typewriter.flatMap(s => [s, 1800])

  const displayName = hero.displayName ?? 'Víctor Manuel'
  const familyName  = hero.familyName  ?? 'Canchola Cervantes'

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const photoSrc =
    cloudName && !hero.image.publicId.startsWith('clients/ingenier0espacial/avatar/victor-profile')
      ? `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_900/${hero.image.publicId}`
      : '/avatar_profile.png'

  return (
    <section
      className="relative overflow-hidden bg-canvas"
      style={{ minHeight: '100svh' }}
      aria-label="Presentación"
    >
      {/* ── Blurred manu_4 background ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden>
        <img
          src="/media/manu_4.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
          style={{ filter: 'blur(22px) saturate(0.7)', transform: 'scale(1.08)', opacity: 0.12 }}
          fetchPriority="low"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, var(--color-canvas) 0%, rgba(253,246,240,0.85) 50%, rgba(253,246,240,0.92) 100%)' }}
        />
      </div>

      {/* ── Orange diagonal band ──────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: 'clamp(440px, 68vw, 700px)',
          background: `linear-gradient(140deg, ${ORANGE_VIVID} 0%, ${ORANGE_BRIGHT} 55%, #FFA559 100%)`,
          clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)',
          zIndex: 1,
        }}
        aria-hidden
      />

      {/* Noise grain over orange */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: 'clamp(440px, 68vw, 700px)',
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.07\'/%3E%3C/svg%3E")',
          backgroundSize: '256px 256px',
          clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)',
          zIndex: 2,
          opacity: 0.45,
        }}
        aria-hidden
      />

      {/* ── Falling star rain inside orange band ─────────────────── */}
      <StarRain />

      {/* ── MOBILE LAYOUT ─────────────────────────────────────────── */}
      <div className="md:hidden relative z-10">
        {/* Photo + space decos */}
        <div className="flex justify-center pt-14 pb-4">
          <div className="relative" style={{ width: '200px', aspectRatio: '1/1' }}>
            <SpaceDecos />

            {/* Bear behind */}
            <div
              className="absolute pointer-events-none select-none"
              style={{ inset: '-30%', color: 'rgba(255,255,255,0.13)', transform: 'rotate(-22deg)', zIndex: 0 }}
              aria-hidden
            >
              <BearSilhouette />
            </div>

            {/* Shadow */}
            <div className="absolute inset-0 rounded-full" style={{ background: 'rgba(0,0,0,0.2)', transform: 'translate(6px, 8px)', zIndex: 1 }} aria-hidden />

            {/* Photo circle */}
            <div
              className="relative rounded-full overflow-hidden"
              style={{ width: '100%', aspectRatio: '1/1', border: '3px solid rgba(255,255,255,0.6)', boxShadow: '0 12px 36px rgba(0,0,0,0.28)', zIndex: 2 }}
            >
              <img src={photoSrc} alt={hero.image.alt} className="w-full h-full object-cover object-center" fetchPriority="high" />
            </div>
          </div>
        </div>

        {/* Text content */}
        <motion.div
          className="px-5 pb-28 flex flex-col gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-col gap-1.5">
            <span
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.28em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)',
                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '3px', padding: '5px 10px', display: 'inline-block', width: 'fit-content',
              }}
            >
              {hero.eyebrow}
            </span>
            {hero.badge?.visible && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: GREEN_LIGHT, animation: 'pulse 2s infinite' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(255,255,255,0.75)' }}>{hero.badge.text}</span>
              </div>
            )}
          </div>

          <h1 style={{ lineHeight: 0.88 }}>
            {displayName.split(' ').map((word, i) => (
              <span
                key={i}
                className="block text-white"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 900,
                  fontSize: 'clamp(3.8rem, 15vw, 5.5rem)',
                  letterSpacing: '-0.02em',
                  textShadow: '0 3px 18px rgba(0,0,0,0.15)',
                }}
              >
                {word}
              </span>
            ))}
            <span
              className="block"
              style={{
                fontFamily: "'Nerko One', 'Fredoka', cursive",
                fontSize: 'clamp(1rem, 4vw, 1.4rem)',
                color: 'rgba(255,255,255,0.72)',
                letterSpacing: '0.04em',
                marginTop: '0.15em',
              }}
            >
              {familyName}
            </span>
          </h1>

          {/* Green accent */}
          <div className="flex items-center gap-2">
            <div style={{ height: '2px', width: '40px', background: `linear-gradient(to right, ${GREEN_LIGHT}, ${GREEN_MID})` }} />
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: GREEN_LIGHT }} />
          </div>

          <div className="flex items-center gap-2">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>—</span>
            <TypeAnimation
              sequence={sequence}
              wrapper="span"
              speed={55}
              repeat={Infinity}
              style={{ fontFamily: "'Caveat', cursive", fontSize: 'clamp(1.2rem, 4.5vw, 1.5rem)', fontWeight: 600, color: 'white' }}
            />
          </div>

          <p style={{ maxWidth: '32ch', lineHeight: 2.1 }}>
            <span style={{
              fontFamily:               "'Fredoka', cursive",
              fontSize:                 '0.9rem',
              color:                    '#2C2210',
              background:               'rgba(253, 246, 225, 0.93)',
              padding:                  '3px 9px',
              display:                  'inline',
              boxDecorationBreak:       'clone',
              WebkitBoxDecorationBreak: 'clone',
              borderRadius:             '2px',
            }}>
              {hero.description}
            </span>
          </p>

          <div className="flex flex-wrap gap-3 mt-1">
            {hero.ctas.map(cta => (
              <HeroCTA key={cta.label} href={cta.href} variant={cta.variant} external={cta.external}>
                {cta.label}
              </HeroCTA>
            ))}
          </div>

          <div className="flex items-center gap-5">
            {social.map(link => {
              const Icon = socialIconMap[link.platform]
              if (!Icon) return null
              return (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel}
                  style={{ color: GREEN_LIGHT, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = GREEN_MID)}
                  onMouseLeave={e => (e.currentTarget.style.color = GREEN_LIGHT)}
                >
                  <Icon size={17} />
                </a>
              )
            })}
          </div>

          <LocationBar />
        </motion.div>
      </div>

      {/* ── DESKTOP LAYOUT ────────────────────────────────────────── */}
      <div
        className="hidden md:grid relative z-10 max-w-6xl mx-auto px-6 md:px-10"
        style={{
          gridTemplateColumns: '1fr auto',
          minHeight: '100svh',
          paddingTop: 'clamp(3.5rem, 7vw, 5.5rem)',
          paddingBottom: '4rem',
          alignItems: 'center',
          gap: '2.5rem',
        }}
      >
        {/* LEFT: all text */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow + available */}
          <div className="flex flex-col gap-2">
            <span
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)',
                background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '3px', padding: '6px 12px', display: 'inline-block',
                backdropFilter: 'blur(4px)', width: 'fit-content',
              }}
            >
              {hero.eyebrow}
            </span>
            {hero.badge?.visible && (
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: GREEN_LIGHT, animation: 'pulse 2s infinite' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'rgba(255,255,255,0.78)' }}>{hero.badge.text}</span>
              </div>
            )}
          </div>

          {/* Name — bigger */}
          <div style={{ lineHeight: 0.88 }}>
            <h1>
              {displayName.split(' ').map((word, i) => (
                <span
                  key={i}
                  className="block text-white"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: 'italic',
                    fontWeight: 900,
                    fontSize: 'clamp(4.5rem, 7.5vw, 9rem)',
                    letterSpacing: '-0.028em',
                    textShadow: '0 4px 28px rgba(0,0,0,0.15)',
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
            <p
              className="mt-2"
              style={{
                fontFamily: "'Nerko One', 'Fredoka', cursive",
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                color: 'rgba(255,255,255,0.72)',
                letterSpacing: '0.05em',
              }}
            >
              {familyName}
            </p>
          </div>

          {/* Green accent */}
          <div className="flex items-center gap-2">
            <div style={{ height: '2px', width: '52px', background: `linear-gradient(to right, ${GREEN_LIGHT}, ${GREEN_MID})` }} />
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: GREEN_LIGHT }} />
          </div>

          <Stitch className="text-white/25" length={160} />

          {/* Typewriter */}
          <div className="flex items-start gap-2">
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: 'rgba(255,255,255,0.50)', marginTop: '3px' }}>—</span>
            <TypeAnimation
              sequence={sequence}
              wrapper="span"
              speed={55}
              repeat={Infinity}
              style={{ fontFamily: "'Caveat', cursive", fontSize: 'clamp(1.2rem, 2vw, 1.55rem)', fontWeight: 600, color: 'white' }}
            />
          </div>

          {/* Description */}
          <p style={{ maxWidth: '32ch', lineHeight: 2.2, marginTop: '2px' }}>
            <span style={{
              fontFamily:               "'Fredoka', cursive",
              fontSize:                 '0.9375rem',
              color:                    '#2C2210',
              background:               'rgba(253, 246, 225, 0.93)',
              padding:                  '3px 10px',
              display:                  'inline',
              boxDecorationBreak:       'clone',
              WebkitBoxDecorationBreak: 'clone',
              borderRadius:             '2px',
            }}>
              {hero.description}
            </span>
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-1">
            {hero.ctas.map(cta => (
              <HeroCTA key={cta.label} href={cta.href} variant={cta.variant} external={cta.external}>
                {cta.label}
              </HeroCTA>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-5">
            {social.map(link => {
              const Icon = socialIconMap[link.platform]
              if (!Icon) return null
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.ariaLabel}
                  style={{ color: GREEN_LIGHT, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = GREEN_MID)}
                  onMouseLeave={e => (e.currentTarget.style.color = GREEN_LIGHT)}
                >
                  <Icon size={16} />
                </a>
              )
            })}
          </div>

          <LocationBar />
        </motion.div>

        {/* RIGHT: circular photo + bear + space decos */}
        <motion.div
          className="relative self-center"
          initial={{ opacity: 0, x: 48, rotate: 3 }}
          animate={{ opacity: 1, x: 0, rotate: -1.5 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className="relative" style={{ width: 'clamp(240px, 28vw, 340px)', aspectRatio: '1/1' }}>

            {/* Space decorations */}
            <SpaceDecos />

            {/* Bear silhouette behind */}
            <div
              className="absolute pointer-events-none select-none"
              style={{ inset: '-32%', color: 'rgba(255,255,255,0.12)', transform: 'rotate(-22deg)', zIndex: 0 }}
              aria-hidden
            >
              <BearSilhouette />
            </div>

            {/* Drop shadow */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'rgba(0,0,0,0.22)', transform: 'translate(9px, 12px)', zIndex: 1 }}
              aria-hidden
            />

            {/* Circular photo */}
            <motion.div
              className="relative rounded-full overflow-hidden"
              style={{ width: '100%', aspectRatio: '1/1', border: '3.5px solid rgba(255,255,255,0.65)', boxShadow: '0 14px 48px rgba(0,0,0,0.30)', zIndex: 2 }}
              whileHover={{ scale: 1.025 }}
              transition={{ duration: 0.35 }}
            >
              <img
                src={photoSrc}
                alt={hero.image.alt}
                className="w-full h-full object-cover object-center"
                style={{ minHeight: '100%' }}
                fetchPriority="high"
              />
            </motion.div>

            {/* Washi tape */}
            <div className="absolute -top-2 right-2 z-10">
              <WashiTape color="gold" rotate={-3} width={68} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Washi tape decoration ──────────────────────────────────── */}
      <WashiTape
        text="música · sonido · arte"
        color="gold"
        rotate={-2.5}
        width={196}
        className="absolute top-8 right-1/4 hidden md:block z-20"
      />

      {/* ── Scattered deco ─────────────────────────────────────────── */}
      <ScatterDeco />

      {/* ── Scroll indicator ───────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-hidden
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-subtle)' }}>scroll</span>
        <motion.div
          className="w-px h-7"
          style={{ background: 'linear-gradient(to bottom, var(--color-border-strong), transparent)' }}
          animate={{ scaleY: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}

// ── CTA button ────────────────────────────────────────────────────────────────

interface HeroCTAProps {
  children: React.ReactNode
  href: string
  variant: 'primary' | 'secondary'
  external?: boolean
}

function HeroCTA({ children, href, variant, external }: HeroCTAProps) {
  const isPrimary = variant === 'primary'
  const isExternal = external || href.startsWith('http')

  const style: React.CSSProperties = isPrimary
    ? {
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '10px 20px', background: 'white', color: ORANGE_VIVID,
        border: '2px solid rgba(255,255,255,0.8)', borderRadius: '3px',
        fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700,
        letterSpacing: '0.02em', textDecoration: 'none',
        transition: 'background 0.2s, transform 0.15s', cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
      }
    : {
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '9px 18px', background: 'rgba(255,255,255,0.12)', color: 'white',
        border: '1.5px solid rgba(255,255,255,0.50)', borderRadius: '3px',
        fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 400,
        letterSpacing: '0.01em', textDecoration: 'none',
        transition: 'border-color 0.2s, background 0.2s, transform 0.15s', cursor: 'pointer',
        backdropFilter: 'blur(4px)',
      }

  const icon = isExternal ? <ArrowUpRight size={12} /> : <ArrowRight size={12} />

  if (isExternal) {
    return <a href={href} target="_blank" rel="noopener noreferrer" style={style}>{children}{icon}</a>
  }
  return <Link to={href} style={style}>{children}{icon}</Link>
}
