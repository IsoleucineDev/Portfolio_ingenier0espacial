import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { MessageCircle, Instagram, Send } from 'lucide-react'
import PageTransition from '@/components/layout/PageTransition'
import { UnderlineDoodle, StarDoodle, SparkDoodle } from '@/components/Doodles'
import { useContent } from '@/context/ContentContext'
import { easeOut } from '@/lib/motionVariants'

const HS   = { fontFamily: "'Fredoka', 'Klee One', 'Yomogi', cursive" } as const
const MONO = { fontFamily: 'var(--font-mono)' } as const

type FormState = 'idle' | 'loading' | 'success' | 'error'

const methodIconMap: Record<string, React.FC<{ size?: number; strokeWidth?: number }>> = {
  whatsapp: MessageCircle,
  social:   Instagram,
  email:    Send,
}

// ── Electric guitar SVG — real paths, recolored mint ─────────────────────
function GuitarIllust() {
  return (
    <svg viewBox="0 0 496.214 496.214" aria-hidden style={{ display: 'block' }}>
      <ellipse transform="matrix(0.7071 -0.7072 0.7072 0.7071 -120.4786 236.4604)"
        fill="#7CA36A" cx="225.165" cy="263.646" rx="20.001" ry="39.202"/>
      <path fill="#48613C" d="M203.009,475.451c-35.2,35.2-104,24.8-153.6-24.8c-49.6-49.6-60-118.4-24.8-153.6s104-24.8,153.6,24.8C227.809,371.451,239.009,440.251,203.009,475.451z"/>
      <path fill="#7CA36A" d="M287.009,282.651c-20.8-9.6-41.6-12.8-60-11.2c4-28.8,0.8-60.8-10.4-86.4c-24-54.4-69.6,42.4-96.8,69.6c-8.8,8.8-20.8,12-31.2,13.6c-6.4,0-12.8,0.8-18.4,1.6c-0.8,0-1.6,0-2.4,0.8c-13.6,3.2-25.6,8.8-35.2,18.4c-35.2,35.2-24.8,104,24.8,153.6s118.4,60.8,153.6,24.8c9.6-9.6,16-21.6,18.4-35.2c0-0.8,0-1.6,0.8-1.6c0.8-5.6,1.6-12,1.6-18.4c1.6-10.4,4-22.4,12.8-31.2C272.609,353.051,341.409,306.651,287.009,282.651z"/>
      <path fill="#AFE695" d="M287.009,282.651c-20.8-9.6-41.6-12.8-60-11.2c4-28.8,0.8-60.8-10.4-86.4c-24-54.4-69.6,42.4-96.8,69.6c-8.8,8.8-20.8,12-31.2,13.6c-6.4,0-12.8,0.8-18.4,1.6c-0.8,0-1.6,0-2.4,0.8c-13.6,3.2-25.6,8.8-35.2,18.4c-15.2,15.2-22.4,36.8-20.8,60.8h266.4C303.809,325.851,323.809,299.451,287.009,282.651z"/>
      <path fill="#C5E8B3" d="M287.009,282.651c-3.2-1.6-6.4-2.4-9.6-4c-0.8,0-0.8,0-1.6-0.8c-3.2-0.8-6.4-2.4-8.8-3.2c-6.4,5.6-12.8,9.6-18.4,10.4c0.8-4.8,0.8-8.8,0.8-13.6c-4-0.8-7.2-0.8-11.2-0.8c-0.8,0-0.8,0-1.6,0c-3.2,0-7.2,0-10.4,0c0.8-3.2,0.8-6.4,0.8-10.4c0-1.6,0-2.4,0-4v-1.6c0-1.6,0-3.2,0-4.8v-1.6c0-2.4,0-4,0-6.4v-0.8c-0.8-12-3.2-23.2-6.4-33.6c-20,5.6-37.6,60.8-55.2,78.4c-7.2,8-24.8,5.6-33.6,6.4c-5.6,0-10.4,0-15.2,1.6c-0.8,0-1.6,0-1.6,0c-11.2,2.4-28.8,6.4-36.8,14.4c-29.6,30.4-29.6,76.8,12,118.4c24.8,24.8,71.2,56,106.4,60c4.8-3.2,9.6-6.4,14.4-10.4c4-4,7.2-8,9.6-12.8c3.2-5.6,5.6-12,7.2-16.8c0.8-1.6,1.6-4,1.6-5.6c0-0.8,0-1.6,0.8-1.6c0.8-5.6,1.6-12,1.6-18.4c1.6-10.4,4-22.4,12.8-31.2C272.609,353.051,341.409,306.651,287.009,282.651z"/>
      <path fill="#D4F0C0" d="M275.809,278.651c-3.2-0.8-6.4-2.4-9.6-3.2c-6.4,5.6-12.8,9.6-18.4,10.4c0.8-4.8,0.8-8.8,0.8-13.6c-4-0.8-7.2-0.8-11.2-0.8c-3.2,0-7.2,0-10.4,0c0.8-3.2,0.8-6.4,0.8-10.4c0-1.6,0-2.4,0-4v-1.6c0-1.6,0-3.2,0-4.8v-1.6c0-2.4,0-4,0-6.4v-0.8c-0.8-12-3.2-23.2-6.4-33.6c-20,5.6-37.6,60.8-55.2,78.4c-7.2,8-24.8,5.6-33.6,6.4c-5.6,0-10.4,0-15.2,1.6c-11.2,2.4-28.8,6.4-36.8,14.4c-13.6,13.6-20.8,31.2-20.8,50.4h220.8c1.6-1.6,3.2-3.2,4-4c1.6-1.6,2.4-2.4,4-4c0.8-0.8,1.6-2.4,2.4-3.2c0.8-1.6,2.4-3.2,3.2-4c0.8-1.6,1.6-2.4,2.4-4c0.8-0.8,0.8-2.4,1.6-3.2c0.8-1.6,0.8-2.4,1.6-4c0.8-2.4,0.8-4.8,0-7.2c0-0.8-0.8-1.6-1.6-3.2c-0.8-0.8-1.6-1.6-2.4-3.2c-0.8-0.8-2.4-2.4-3.2-3.2c-0.8-0.8-2.4-1.6-3.2-2.4c-1.6-0.8-3.2-1.6-5.6-3.2c-3.2-1.6-6.4-2.4-9.6-4C276.609,278.651,276.609,278.651,275.809,278.651z"/>
      <path fill="#2D3E28" d="M249.409,293.851c-8,8-20-6.4-27.2-13.6l-1.6-1.6c-8-8-21.6-20-13.6-27.2l174.4-160c8-8,20-8,27.2,0l1.6,1.6c7.2,8,7.2,20,0,27.2L249.409,293.851z"/>
      <path fill="#2D3E28" d="M259.009,284.251c-8,8-20-6.4-27.2-13.6l-1.6-1.6c-8-8-21.6-20-13.6-27.2l174.4-160c8-8,20-8,27.2,0l1.6,1.6c7.2,8,7.2,20,0,27.2L259.009,284.251z"/>
      <path fill="#2D3E28" d="M435.009,109.051c-7.2,8-20,8-27.2,0l-16-16c-8-8-8-20,0-27.2l65.6-47.2c9.6-6.4,18.4-10.4,27.2,0l1.6,1.6c18.4,19.2-9.6,21.6-16.8,29.6L435.009,109.051z"/>
      <path fill="#D4F0C0" d="M150.209,414.651c-4.8,4.8-5.6,12-10.4,7.2l-61.6-61.6c-4.8-4.8,2.4-5.6,7.2-10.4c4.8-4.8,12.8-4.8,17.6,0l47.2,47.2C155.009,401.851,155.009,409.851,150.209,414.651z"/>
      <path fill="#E8F5E0" d="M153.409,411.451c-4.8,4.8-5.6,12-10.4,7.2l-61.6-61.6c-4.8-4.8,2.4-5.6,7.2-10.4c4.8-4.8,12.8-4.8,17.6,0l47.2,47.2C158.209,398.651,158.209,406.651,153.409,411.451z"/>
      <path fill="#AFE695" d="M444.609,13.051c-2.4,1.6-6.4,1.6-8-1.6c-1.6-2.4-1.6-6.4,1.6-8l3.2-2.4c2.4-1.6,6.4-1.6,8,1.6c1.6,2.4,1.6,6.4-1.6,8L444.609,13.051z"/>
      <path fill="#AFE695" d="M425.409,25.051c-2.4,1.6-6.4,1.6-8-1.6c-1.6-2.4-1.6-6.4,1.6-8l3.2-2.4c2.4-1.6,6.4-1.6,8,1.6c1.6,2.4,1.6,6.4-1.6,8L425.409,25.051z"/>
      <path fill="#AFE695" d="M407.009,38.651c-2.4,1.6-6.4,1.6-8-1.6c-1.6-2.4-1.6-6.4,1.6-8l3.2-2.4c2.4-1.6,6.4-1.6,8,1.6c1.6,2.4,1.6,6.4-1.6,8L407.009,38.651z"/>
      <path fill="#AFE695" d="M388.609,52.251c-2.4,1.6-6.4,1.6-8-1.6c-1.6-2.4-1.6-6.4,1.6-8l2.4-2.4c2.4-1.6,6.4-1.6,8,1.6c1.6,2.4,1.6,6.4-1.6,8L388.609,52.251z"/>
      <path fill="#7CA36A" d="M410.209,109.851c-0.8,0.8-1.6,0.8-2.4,0l-16.8-16.8c-0.8-0.8-0.8-1.6,0-2.4c0.8-0.8,1.6-0.8,2.4,0l16.8,16.8C410.209,108.251,410.209,109.051,410.209,109.851z"/>
      <circle fill="#D4F0C0" cx="379.009" cy="123.451" r="2.4"/>
      <circle fill="#D4F0C0" cx="347.809" cy="154.651" r="2.4"/>
      <circle fill="#D4F0C0" cx="313.409" cy="179.451" r="2.4"/>
      <circle fill="#D4F0C0" cx="283.009" cy="219.451" r="2.4"/>
      <path fill="#2D3E28" d="M201.409,373.051c-2.4,2.4-6.4,2.4-8,0l-60-60c-2.4-2.4-2.4-6.4,0-8l16.8-16.8c2.4-2.4,6.4-2.4,8,0l60,60c2.4,2.4,2.4,6.4,0,8L201.409,373.051z"/>
      <circle fill="#E8F5E0" cx="162.209" cy="317.051" r="2.4"/>
      <circle fill="#E8F5E0" cx="171.009" cy="325.851" r="2.4"/>
      <circle fill="#E8F5E0" cx="180.609" cy="335.451" r="2.4"/>
      <circle fill="#E8F5E0" cx="189.409" cy="344.251" r="2.4"/>
    </svg>
  )
}

// ── Drum kit SVG — perspective view ───────────────────────────────────────
function DrumKitIllust() {
  const C = '#AFE695', M = '#7CA36A', D = '#48613C', DK = '#2D3E28'
  return (
    <svg viewBox="0 0 280 190" fill="none" aria-hidden style={{ display: 'block' }}>
      {/* Hi-hat stand */}
      <line x1="30" y1="34" x2="22" y2="162" stroke={D} strokeWidth="2" opacity="0.5"/>
      <line x1="22" y1="162" x2="10"  y2="180" stroke={D} strokeWidth="1.8" opacity="0.45"/>
      <line x1="22" y1="162" x2="34" y2="180" stroke={D} strokeWidth="1.8" opacity="0.45"/>
      {/* Hi-hat cymbals */}
      <ellipse cx="30" cy="40" rx="32" ry="7.5" fill={M} opacity="0.7"/>
      <ellipse cx="30" cy="40" rx="32" ry="7.5" fill="none" stroke={DK} strokeWidth="1.2" opacity="0.4"/>
      <ellipse cx="30" cy="32" rx="32" ry="7.5" fill={M} opacity="0.55"/>
      <ellipse cx="30" cy="32" rx="32" ry="7.5" fill="none" stroke={DK} strokeWidth="1.2" opacity="0.35"/>
      <ellipse cx="30" cy="32" rx="8"  ry="2" fill={DK} opacity="0.2"/>
      {/* Crash cymbal (far left, tilted) */}
      <ellipse cx="0" cy="65" rx="26" ry="5.5" fill={M} opacity="0.45" transform="rotate(-8 0 65)"/>
      {/* Ride stand */}
      <line x1="238" y1="30" x2="248" y2="118" stroke={D} strokeWidth="1.8" opacity="0.4"/>
      <line x1="248" y1="118" x2="240" y2="180" stroke={D} strokeWidth="1.5" opacity="0.38"/>
      <line x1="248" y1="118" x2="260" y2="180" stroke={D} strokeWidth="1.5" opacity="0.38"/>
      {/* Ride cymbal */}
      <ellipse cx="238" cy="30" rx="32" ry="7" fill={M} opacity="0.62"/>
      <ellipse cx="238" cy="30" rx="32" ry="7" fill="none" stroke={DK} strokeWidth="1.2" opacity="0.4"/>
      <ellipse cx="238" cy="30" rx="9"  ry="2" fill={DK} opacity="0.22"/>
      {/* Tom 1 (left mounted) */}
      <path d="M68,74 Q68,94 92,98 Q116,94 116,74" fill={M} opacity="0.28"/>
      <ellipse cx="92" cy="72" rx="26" ry="13" fill={C}/>
      <ellipse cx="92" cy="72" rx="26" ry="13" fill="none" stroke={DK} strokeWidth="2" opacity="0.5"/>
      <ellipse cx="92" cy="72" rx="18" ry="8.5" fill="none" stroke={M} strokeWidth="1.1" opacity="0.4"/>
      <ellipse cx="92" cy="72" rx="6"  ry="3" fill={M} opacity="0.3"/>
      {/* Tom 2 (right mounted) */}
      <path d="M148,68 Q148,88 174,92 Q200,88 200,68" fill={M} opacity="0.28"/>
      <ellipse cx="174" cy="66" rx="26" ry="13" fill={C}/>
      <ellipse cx="174" cy="66" rx="26" ry="13" fill="none" stroke={DK} strokeWidth="2" opacity="0.5"/>
      <ellipse cx="174" cy="66" rx="18" ry="8.5" fill="none" stroke={M} strokeWidth="1.1" opacity="0.4"/>
      <ellipse cx="174" cy="66" rx="6"  ry="3" fill={M} opacity="0.3"/>
      {/* Bass drum shell */}
      <path d="M68,148 Q68,182 133,186 Q198,182 198,148" fill={M} opacity="0.25"/>
      {/* Bass drum head */}
      <ellipse cx="133" cy="146" rx="66" ry="38" fill={C}/>
      <ellipse cx="133" cy="146" rx="66" ry="38" fill="none" stroke={DK} strokeWidth="2.5" opacity="0.5"/>
      <ellipse cx="133" cy="146" rx="52" ry="29" fill="none" stroke={M} strokeWidth="1.5" opacity="0.38"/>
      <ellipse cx="133" cy="146" rx="20" ry="11" fill={M} opacity="0.22"/>
      {/* Bass drum legs */}
      <line x1="82" y1="178" x2="74"  y2="190" stroke={D} strokeWidth="2.2" opacity="0.5"/>
      <line x1="184" y1="178" x2="192" y2="190" stroke={D} strokeWidth="2.2" opacity="0.5"/>
      {/* Snare (front left) */}
      <path d="M30,152 Q30,170 56,174 Q82,170 82,152" fill={M} opacity="0.28"/>
      <ellipse cx="56" cy="150" rx="28" ry="14" fill={M}/>
      <ellipse cx="56" cy="150" rx="28" ry="14" fill="none" stroke={DK} strokeWidth="2" opacity="0.52"/>
      <ellipse cx="56" cy="150" rx="20" ry="9.5" fill="none" stroke={DK} strokeWidth="1" opacity="0.32"/>
      {[-7,-3,1,5].map(dx => (
        <line key={dx} x1={56+dx} y1="163" x2={56+dx} y2="170" stroke={DK} strokeWidth="0.8" opacity="0.35"/>
      ))}
      <line x1="36" y1="166" x2="28" y2="180" stroke={D} strokeWidth="1.8" opacity="0.45"/>
      <line x1="76" y1="166" x2="84" y2="180" stroke={D} strokeWidth="1.8" opacity="0.45"/>
      {/* Floor tom (right) */}
      <path d="M198,140 Q198,166 226,170 Q254,166 254,140" fill={M} opacity="0.25"/>
      <ellipse cx="226" cy="138" rx="30" ry="17" fill={C}/>
      <ellipse cx="226" cy="138" rx="30" ry="17" fill="none" stroke={DK} strokeWidth="2" opacity="0.5"/>
      <ellipse cx="226" cy="138" rx="21" ry="11" fill="none" stroke={M} strokeWidth="1.1" opacity="0.38"/>
      <line x1="204" y1="164" x2="198" y2="180" stroke={D} strokeWidth="1.8" opacity="0.45"/>
      <line x1="248" y1="164" x2="254" y2="180" stroke={D} strokeWidth="1.8" opacity="0.45"/>
    </svg>
  )
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
} as const

const itemVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
} as const

export default function Contact() {
  const contact = useContent('contact')
  const meta    = useContent('meta')
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData]   = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (contact.form.endpoint === 'REPLACE_WITH_FORMSPREE_ID') {
      setFormState('error')
      return
    }
    setFormState('loading')
    try {
      const res = await fetch(`https://formspree.io/f/${contact.form.endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setFormState(res.ok ? 'success' : 'error')
    } catch {
      setFormState('error')
    }
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{`Contacto | ${meta.siteName}`}</title>
        <meta name="description" content={contact.description} />
      </Helmet>

      <div
        className="relative min-h-screen overflow-hidden"
        style={{
          background: 'var(--color-canvas)',
          paddingTop: 'clamp(5.5rem, 12vw, 9rem)',
          paddingBottom: 'clamp(3.5rem, 7vw, 6rem)',
        }}
      >
        {/* Ambient decorations */}
        <motion.div
          className="absolute top-20 right-10 pointer-events-none"
          style={{ color: '#DF822A', opacity: 0.12 }}
          animate={{ y: [-8, 8, -8], rotate: [0, 14, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <StarDoodle size={46} />
        </motion.div>
        <motion.div
          className="absolute top-32 right-24 pointer-events-none hidden md:block"
          style={{ color: '#7CA36A', opacity: 0.10 }}
          animate={{ y: [5, -5, 5], rotate: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          aria-hidden
        >
          <SparkDoodle size={30} />
        </motion.div>

        {/* ── Top-right corner: small guitar silhouette ────────────────── */}
        <motion.div
          className="absolute pointer-events-none hidden lg:block"
          style={{ top: '4rem', right: '-18px', width: 110, opacity: 0.22, rotate: '22deg', transformOrigin: 'top right', zIndex: 0 }}
          animate={{ rotate: ['22deg', '24deg', '22deg'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <GuitarIllust />
        </motion.div>

        {/* ── Top-left corner: small cymbal / ride ─────────────────────── */}
        <motion.div
          className="absolute pointer-events-none hidden md:block"
          style={{ top: '3.5rem', left: '-20px', width: 130, opacity: 0.18, zIndex: 0 }}
          animate={{ rotate: ['-6deg', '-4deg', '-6deg'] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          aria-hidden
        >
          <DrumKitIllust />
        </motion.div>

        {/* ── Bottom-left: full guitar ──────────────────────────────────── */}
        <motion.div
          className="absolute pointer-events-none hidden md:block"
          style={{ bottom: 0, left: '-8px', width: 180, opacity: 0.82, rotate: '-16deg', transformOrigin: 'bottom center', zIndex: 1 }}
          animate={{ y: [0, -10, 0], rotate: ['-16deg', '-14deg', '-16deg'] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <GuitarIllust />
        </motion.div>

        {/* ── Bottom-left: drum kit beside guitar ──────────────────────── */}
        <motion.div
          className="absolute pointer-events-none hidden lg:block"
          style={{ bottom: 0, left: '140px', width: 240, opacity: 0.72, zIndex: 1 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          aria-hidden
        >
          <DrumKitIllust />
        </motion.div>

        <div className="max-w-5xl mx-auto px-5 md:px-10 relative z-10">

          {/* ── Header ──────────────────────────────────────────────────────── */}
          <motion.div
            className="mb-16 md:mb-20"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-16" style={{ background: '#DF822A50' }} />
              <span
                className="text-[10px] font-bold tracking-[0.26em] uppercase"
                style={{ ...MONO, color: '#DF822A' }}
              >
                お問い合わせ — CONTACTO
              </span>
            </div>

            <h1 className="leading-[0.88] mb-4">
              {contact.headline.split('\n').map((line: string, i: number) => (
                <span
                  key={i}
                  className="block text-[#414441]"
                  style={i === 0 ? {
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontStyle: 'italic',
                    fontWeight: 700,
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                  } : {
                    fontFamily: "'Nerko One', 'Fredoka', cursive",
                    fontWeight: 400,
                    fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                  }}
                >
                  {line}
                </span>
              ))}
            </h1>

            <div className="flex mt-4">
              <span style={{ color: '#DF822A' }}>
                <UnderlineDoodle width={180} />
              </span>
            </div>

            <p
              className="mt-5 max-w-md leading-relaxed"
              style={{ ...HS, color: 'rgba(65,68,65,0.65)', fontSize: '0.9375rem' }}
            >
              {contact.description}
            </p>
          </motion.div>

          {/* ── Body ────────────────────────────────────────────────────────── */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">

            {/* Contact methods */}
            <motion.div
              className="flex flex-col gap-5"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mb-2"
              >
                <span
                  className="text-[10px] font-bold tracking-[0.22em] uppercase"
                  style={{ ...MONO, color: 'rgba(65,68,65,0.40)' }}
                >
                  Canales directos
                </span>
              </motion.div>

              {contact.methods.map((method: {
                id: string; type: string; label: string; value: string;
                href: string; cta: string
              }) => {
                const Icon = methodIconMap[method.type] ?? Send
                return (
                  <motion.a
                    key={method.id}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={itemVariants}
                    className="group flex items-center gap-4 p-5 rounded-2xl transition-all duration-200"
                    style={{
                      background: 'rgba(255,255,255,0.76)',
                      border: '1px solid rgba(84,52,63,0.09)',
                      boxShadow: '0 2px 14px rgba(84,52,63,0.06)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(84,52,63,0.12), 0 2px 8px rgba(84,52,63,0.07)'
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 14px rgba(84,52,63,0.06)'
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    }}
                    aria-label={method.cta}
                  >
                    {/* Icon circle */}
                    <div
                      className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'rgba(223,130,42,0.09)',
                        border: '1px solid rgba(223,130,42,0.22)',
                        color: '#DF822A',
                      }}
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm" style={{ ...HS, color: '#414441' }}>
                        {method.label}
                      </p>
                      <p className="text-xs mt-0.5 truncate" style={{ ...HS, color: 'rgba(65,68,65,0.55)' }}>
                        {method.value}
                      </p>
                    </div>

                    <span
                      className="text-xs font-bold shrink-0 transition-colors duration-150"
                      style={{ ...MONO, color: 'rgba(65,68,65,0.35)' }}
                    >
                      →
                    </span>
                  </motion.a>
                )
              })}
            </motion.div>

            {/* Form */}
            {contact.form.enabled && (
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6, ease: easeOut }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="text-[10px] font-bold tracking-[0.22em] uppercase"
                    style={{ ...MONO, color: 'rgba(65,68,65,0.40)' }}
                  >
                    O envíame un mensaje
                  </span>
                </div>

                {formState === 'success' ? (
                  <motion.div
                    className="flex flex-col items-center gap-5 py-14 text-center rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.76)',
                      border: '1px solid rgba(124,163,106,0.25)',
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(124,163,106,0.12)', border: '1.5px solid #7CA36A60' }}
                    >
                      <Send size={20} style={{ color: '#7CA36A' }} />
                    </div>
                    <p className="font-bold max-w-xs leading-snug" style={{ ...HS, color: '#414441' }}>
                      {contact.form.successMessage}
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 rounded-2xl p-6"
                    style={{
                      background: 'rgba(255,255,255,0.76)',
                      border: '1px solid rgba(84,52,63,0.08)',
                      boxShadow: '0 2px 18px rgba(84,52,63,0.06)',
                    }}
                  >
                    {contact.form.fields.map((field: {
                      name: string; type: string; label: string;
                      placeholder: string; required: boolean; options?: string[]
                    }) => (
                      <div key={field.name} className="flex flex-col gap-1.5">
                        <label
                          htmlFor={field.name}
                          className="text-sm font-bold"
                          style={{ ...HS, color: '#414441' }}
                        >
                          {field.label}
                          {field.required && (
                            <span className="ml-1" style={{ color: '#DF822A' }} aria-hidden="true">*</span>
                          )}
                        </label>

                        {field.type === 'textarea' ? (
                          <textarea
                            id={field.name}
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                            rows={4}
                            className="px-4 py-3 text-sm resize-none transition-all duration-150 focus:outline-none"
                            style={{
                              ...HS,
                              borderRadius: '10px',
                              border: '1.5px solid rgba(84,52,63,0.14)',
                              background: 'rgba(253,246,240,0.8)',
                              color: '#414441',
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = '#DF822A60'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(223,130,42,0.10)' }}
                            onBlur={e =>  { e.currentTarget.style.borderColor = 'rgba(84,52,63,0.14)'; e.currentTarget.style.boxShadow = 'none' }}
                            onChange={e => setFormData(p => ({ ...p, [field.name]: e.target.value }))}
                          />
                        ) : field.type === 'select' ? (
                          <select
                            id={field.name}
                            name={field.name}
                            required={field.required}
                            className="px-4 py-3 text-sm transition-all duration-150 focus:outline-none appearance-none"
                            style={{
                              ...HS,
                              borderRadius: '10px',
                              border: '1.5px solid rgba(84,52,63,0.14)',
                              background: 'rgba(253,246,240,0.8)',
                              color: '#414441',
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = '#DF822A60'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(223,130,42,0.10)' }}
                            onBlur={e =>  { e.currentTarget.style.borderColor = 'rgba(84,52,63,0.14)'; e.currentTarget.style.boxShadow = 'none' }}
                            onChange={e => setFormData(p => ({ ...p, [field.name]: e.target.value }))}
                          >
                            <option value="">{field.placeholder}</option>
                            {field.options?.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            id={field.name}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            required={field.required}
                            className="px-4 py-3 text-sm transition-all duration-150 focus:outline-none"
                            style={{
                              ...HS,
                              borderRadius: '10px',
                              border: '1.5px solid rgba(84,52,63,0.14)',
                              background: 'rgba(253,246,240,0.8)',
                              color: '#414441',
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = '#DF822A60'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(223,130,42,0.10)' }}
                            onBlur={e =>  { e.currentTarget.style.borderColor = 'rgba(84,52,63,0.14)'; e.currentTarget.style.boxShadow = 'none' }}
                            onChange={e => setFormData(p => ({ ...p, [field.name]: e.target.value }))}
                          />
                        )}
                      </div>
                    ))}

                    {formState === 'error' && (
                      <p className="text-sm" style={{ ...HS, color: '#DF822A' }}>
                        {contact.form.errorMessage}
                      </p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={formState === 'loading'}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.975 }}
                      transition={{ type: 'spring', stiffness: 460, damping: 24 }}
                      className="mt-2 w-full py-3.5 rounded-xl font-bold text-white transition-opacity"
                      style={{
                        ...HS,
                        background: '#DF822A',
                        fontSize: '0.9375rem',
                        opacity: formState === 'loading' ? 0.65 : 1,
                        boxShadow: '0 4px 18px rgba(223,130,42,0.32)',
                      }}
                    >
                      {formState === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            )}

          </div>
        </div>
      </div>
    </PageTransition>
  )
}
