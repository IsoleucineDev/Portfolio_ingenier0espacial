// ── Lightweight SVG doodle decorations ────────────────────────────────────────

interface DoodleProps {
  className?: string
  size?: number
  width?: number
}

export function StarDoodle({ className = '', size = 24 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2 L14.6 9.1 H22 L16.1 13.5 L18.5 20.6 L12 16.3 L5.5 20.6 L7.9 13.5 L2 9.1 H9.4 Z" />
    </svg>
  )
}

export function SparkDoodle({ className = '', size = 20 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 1 L13.3 10.7 L23 12 L13.3 13.3 L12 23 L10.7 13.3 L1 12 L10.7 10.7 Z" />
    </svg>
  )
}

export function MusicNoteDoodle({ className = '' }: DoodleProps) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M11 26a4 4 0 110-8 4 4 0 010 8zm0-12V5l14-3v13a4 4 0 110-8 4 4 0 010 8V5.8L13 8.2V26a4 4 0 11-2 0z" />
    </svg>
  )
}

export function UnderlineDoodle({ className = '', width = 200 }: DoodleProps) {
  const h = width
  const w10 = width * 0.1
  const w25 = width * 0.25
  const w4  = width * 0.4
  const w55 = width * 0.55
  const w7  = width * 0.7
  const w85 = width * 0.85
  const w9  = width * 0.9

  return (
    <svg width={width} height="14" viewBox={`0 0 ${h} 14`} className={className} fill="none" aria-hidden>
      <path
        d={`M2 9 Q${w10} 3 ${w25} 8 Q${w4} 13 ${w55} 8 Q${w7} 3 ${w85} 8 Q${w9} 11 ${width - 2} 9`}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

export function GuitarDoodle({ className = '', size = 32 }: DoodleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M6 26l-3 3c-.6.6-.6 1.4 0 2s1.4.6 2 0l3-3c1.2.8 2.8 1 4-.2l4-4c1.4-1.4 1.4-3.6 0-5s-3.6-1.4-5 0l-4 4c-1.2 1.2-1 2.8-.2 4zm9-10a2 2 0 114 0 2 2 0 01-4 0z" />
    </svg>
  )
}

export function SpeechBubble({ className = '' }: DoodleProps) {
  return (
    <svg width="60" height="44" viewBox="0 0 60 44" className={className} fill="currentColor" aria-hidden>
      <path d="M4 4 Q4 2 6 2 H54 Q58 2 58 6 V30 Q58 34 54 34 H22 L10 42 V34 H6 Q2 34 2 30 V6 Q2 2 4 4Z" />
    </svg>
  )
}

export function ArrowDoodle({ className = '' }: DoodleProps) {
  return (
    <svg width="36" height="24" viewBox="0 0 36 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 12 C7 8 16 4 24 6 L22 3 M24 6 L22 9 M24 6 L32 14" />
    </svg>
  )
}
