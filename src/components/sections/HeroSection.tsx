import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FaSpotify, FaSoundcloud, FaInstagram, FaYoutube } from 'react-icons/fa'
import { SiYoutubemusic } from 'react-icons/si'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useContent } from '@/context/ContentContext'

const socialIconMap: Record<string, React.FC<{ size?: number }>> = {
  spotify:      FaSpotify,
  soundcloud:   FaSoundcloud,
  instagram:    FaInstagram,
  youtube:      FaYoutube,
  youtubemusic: SiYoutubemusic,
}

const GREEN_LIGHT = '#AFE695'
const GREEN_MID   = '#7CA36A'
const ORANGE_VIVID = '#E8620A'
const MONO = { fontFamily: 'var(--font-mono)' } as const

// ── Querétaro · México location bar ──────────────────────────────────────────
function LocationBar() {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        border: '1px dashed rgba(175,230,149,0.55)',
        borderRadius: '4px', padding: '7px 14px',
        background: 'rgba(175,230,149,0.07)', marginTop: '2px',
      }}
    >
      <span style={{ ...MONO, fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', color: GREEN_LIGHT }}>
        Querétaro · México
      </span>
      <svg width="9" height="9" viewBox="0 0 24 24" fill={GREEN_LIGHT} style={{ opacity: 0.55, flexShrink: 0 }}>
        <path d="M12 0l1.5 9.5L23 12l-9.5 1.5L12 23l-1.5-9.5L2 12l9.5-1.5z" />
      </svg>
    </div>
  )
}

export default function HeroSection() {
  const hero   = useContent('hero')
  const { social } = useContent('navigation')

  const sequence: (string | number)[] = hero.typewriter.flatMap(s => [s, 1800])
  const displayName = hero.displayName ?? 'Víctor Manuel'
  const familyName  = hero.familyName  ?? 'Canchola Cervantes'

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '100svh' }}
      aria-label="Presentación"
    >
      {/* ── Full-bleed background photo ─────────────────────────── */}
      <img
        src="/media/manu_fondo-espectacular.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        fetchPriority="high"
        aria-hidden
        style={{ objectPosition: '60% center' }}
      />

      {/* ── Gradient overlays for readability ───────────────────── */}
      {/* Bottom-to-top: makes content area readable */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.22) 42%, rgba(0,0,0,0.74) 100%)',
        }}
        aria-hidden
      />
      {/* Left edge: extra depth behind text column */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.40) 0%, transparent 55%)' }}
        aria-hidden
      />

      {/* ── Main content ────────────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col justify-between px-6 md:px-12 py-10 md:py-14"
        style={{ minHeight: '100svh' }}
      >

        {/* ── TOP: eyebrow + huge name + accent ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-6">
            <span
              style={{
                ...MONO, fontSize: '10px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.70)',
                border: '1px solid rgba(255,255,255,0.22)', borderRadius: '3px',
                padding: '5px 11px', backdropFilter: 'blur(4px)',
                background: 'rgba(255,255,255,0.08)',
              }}
            >
              {hero.eyebrow}
            </span>
            {hero.badge?.visible && (
              <div className="flex items-center gap-2">
                <span
                  className="rounded-full"
                  style={{ width: 7, height: 7, background: GREEN_LIGHT, display: 'inline-block', animation: 'pulse 2s infinite' }}
                />
                <span style={{ ...MONO, fontSize: '10px', color: 'rgba(255,255,255,0.60)' }}>
                  {hero.badge.text}
                </span>
              </div>
            )}
          </div>

          {/* Name */}
          <h1 style={{ lineHeight: 0.86, marginBottom: '1.2rem' }}>
            {displayName.split(' ').map((word, i) => (
              <span
                key={i}
                className="block text-white"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontStyle: 'italic',
                  fontWeight: 900,
                  fontSize: 'clamp(3.8rem, 10vw, 11rem)',
                  letterSpacing: '-0.03em',
                  textShadow: '0 4px 32px rgba(0,0,0,0.5)',
                }}
              >
                {word}
              </span>
            ))}
            <span
              className="block"
              style={{
                fontFamily: "'Nerko One', 'Fredoka', cursive",
                fontSize: 'clamp(1rem, 2.2vw, 1.7rem)',
                color: 'rgba(255,255,255,0.55)',
                letterSpacing: '0.08em',
                marginTop: '0.5em',
              }}
            >
              {familyName}
            </span>
          </h1>

          {/* Green accent line */}
          <div className="flex items-center gap-2">
            <div style={{ height: '2px', width: '60px', background: `linear-gradient(to right, ${GREEN_LIGHT}, ${GREEN_MID})` }} />
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: GREEN_LIGHT }} />
          </div>
        </motion.div>

        {/* ── BOTTOM: typewriter + description + CTAs + social ───── */}
        <motion.div
          className="flex flex-col gap-4"
          style={{ maxWidth: '36rem' }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Typewriter */}
          <div className="flex items-center gap-2.5">
            <span style={{ ...MONO, fontSize: '14px', color: GREEN_LIGHT, opacity: 0.75 }}>—</span>
            <TypeAnimation
              sequence={sequence}
              wrapper="span"
              speed={55}
              repeat={Infinity}
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.92)',
              }}
            />
          </div>

          {/* Description with cream highlight */}
          <p style={{ lineHeight: 2.15, maxWidth: '32ch' }}>
            <span style={{
              fontFamily:               "'Fredoka', cursive",
              fontSize:                 '0.9375rem',
              color:                    '#2C2210',
              background:               'rgba(253,246,225,0.93)',
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
          <div className="flex flex-wrap gap-3">
            {hero.ctas.map(cta => (
              <HeroCTA key={cta.label} href={cta.href} variant={cta.variant} external={cta.external}>
                {cta.label}
              </HeroCTA>
            ))}
          </div>

          {/* Social icons */}
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
                  onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                  onMouseLeave={e => (e.currentTarget.style.color = GREEN_LIGHT)}
                >
                  <Icon size={17} />
                </a>
              )
            })}
          </div>

          {/* Location bar */}
          <LocationBar />
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        aria-hidden
      >
        <span style={{ ...MONO, fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', writingMode: 'vertical-rl' }}>
          scroll
        </span>
        <motion.div
          className="w-px"
          style={{ height: '48px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)' }}
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
  const isPrimary  = variant === 'primary'
  const isExternal = external || href.startsWith('http')

  const style: React.CSSProperties = isPrimary
    ? {
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '10px 22px', background: 'white', color: ORANGE_VIVID,
        border: '2px solid rgba(255,255,255,0.85)', borderRadius: '3px',
        fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 700,
        letterSpacing: '0.02em', textDecoration: 'none', cursor: 'pointer',
        boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
      }
    : {
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '9px 20px', background: 'rgba(255,255,255,0.10)', color: 'white',
        border: '1.5px solid rgba(255,255,255,0.45)', borderRadius: '3px',
        fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 400,
        letterSpacing: '0.01em', textDecoration: 'none', cursor: 'pointer',
        backdropFilter: 'blur(6px)',
      }

  const icon = isExternal ? <ArrowUpRight size={12} /> : <ArrowRight size={12} />
  if (isExternal) return <a href={href} target="_blank" rel="noopener noreferrer" style={style}>{children}{icon}</a>
  return <Link to={href} style={style}>{children}{icon}</Link>
}
