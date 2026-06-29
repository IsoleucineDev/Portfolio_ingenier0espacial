import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Art-directed scatter elements for the hero section
export default function ScatterDeco() {
  const reduced = useReducedMotion()

  return (
    <>
      {/* Small 4-point star — upper right of photo overlap */}
      <DecoEl
        top="18%" left="53%"
        color="var(--color-orange)"
        size={14} opacity={0.7}
        delay={1.2} reduced={reduced}
        el={<StarSVG />}
      />

      {/* Tiny circle dot cluster — right side */}
      <DecoEl
        top="35%" left="56%"
        color="var(--color-sage)"
        size={7} opacity={0.6}
        delay={1.6} reduced={reduced}
        el={<DotSVG />}
      />
      <DecoEl
        top="37%" left="58.5%"
        color="var(--color-sage)"
        size={4} opacity={0.4}
        delay={1.8} reduced={reduced}
        el={<DotSVG />}
      />

      {/* Small cross — lower left area */}
      <DecoEl
        top="72%" left="8%"
        color="var(--color-rust-light)"
        size={12} opacity={0.55}
        delay={2.0} reduced={reduced}
        el={<CrossSVG />}
      />

      {/* Tiny flower — desktop only, hidden on mobile */}
      <DecoEl
        top="60%" left="50%"
        color="var(--color-gold)"
        size={16} opacity={0.55}
        delay={1.4} reduced={reduced}
        className="hidden md:block"
        el={<FlowerSVG />}
      />

      {/* Star lower right (desktop) */}
      <DecoEl
        top="78%" left="88%"
        color="var(--color-sky-dark)"
        size={11} opacity={0.45}
        delay={2.2} reduced={reduced}
        className="hidden md:block"
        el={<StarSVG />}
      />

      {/* Three-dot diagonal (desktop) */}
      <DecoEl
        top="25%" left="92%"
        color="var(--color-rose)"
        size={5} opacity={0.5}
        delay={1.9} reduced={reduced}
        className="hidden md:block"
        el={<DotSVG />}
      />
      <DecoEl
        top="28%" left="94%"
        color="var(--color-rose)"
        size={5} opacity={0.35}
        delay={2.1} reduced={reduced}
        className="hidden md:block"
        el={<DotSVG />}
      />
    </>
  )
}

// ── Single decorative element with float animation ────────────────────────────

interface DecoElProps {
  top: string
  left: string
  color: string
  size: number
  opacity: number
  delay: number
  reduced: boolean
  el: React.ReactNode
  className?: string
}

function DecoEl({ top, left, color, size, opacity, delay, reduced, el, className = '' }: DecoElProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{ top, left, color, width: size, height: size, opacity: 0 }}
      animate={reduced ? { opacity } : {
        opacity,
        y: [0, -5, 0, 4, 0],
      }}
      transition={reduced ? { delay, duration: 0.4 } : {
        delay,
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        opacity: { delay, duration: 0.6, ease: 'easeOut', repeat: 0 },
      }}
    >
      {el}
    </motion.div>
  )
}

// ── SVG primitives ────────────────────────────────────────────────────────────

function StarSVG() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  )
}

function DotSVG() {
  return (
    <svg viewBox="0 0 8 8" width="100%" height="100%" fill="currentColor">
      <circle cx="4" cy="4" r="3.5" />
    </svg>
  )
}

function CrossSVG() {
  return (
    <svg viewBox="0 0 12 12" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="6" y1="1" x2="6" y2="11" />
      <line x1="1" y1="6" x2="11" y2="6" />
    </svg>
  )
}

function FlowerSVG() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
      <circle cx="12" cy="12" r="2.2" />
      <ellipse cx="12" cy="4.5" rx="2" ry="3.2" />
      <ellipse cx="12" cy="19.5" rx="2" ry="3.2" />
      <ellipse cx="4.5" cy="12" rx="3.2" ry="2" />
      <ellipse cx="19.5" cy="12" rx="3.2" ry="2" />
      <ellipse cx="6.8" cy="6.8" rx="1.8" ry="3" transform="rotate(-45 6.8 6.8)" />
      <ellipse cx="17.2" cy="17.2" rx="1.8" ry="3" transform="rotate(-45 17.2 17.2)" />
      <ellipse cx="17.2" cy="6.8" rx="1.8" ry="3" transform="rotate(45 17.2 6.8)" />
      <ellipse cx="6.8" cy="17.2" rx="1.8" ry="3" transform="rotate(45 6.8 17.2)" />
    </svg>
  )
}
