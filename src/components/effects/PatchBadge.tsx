import { type ReactNode } from 'react'

interface PatchBadgeProps {
  children: ReactNode
  color?: 'rust' | 'sage' | 'gold' | 'sky' | 'lavender'
  className?: string
  size?: 'sm' | 'md'
}

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  rust:     { bg: 'rgba(232,180,160,0.35)', border: 'var(--color-rust)',     text: 'var(--color-rust-dark)' },
  sage:     { bg: 'rgba(181,201,168,0.35)', border: 'var(--color-sage)',     text: 'var(--color-sage-dark)' },
  gold:     { bg: 'rgba(240,208,144,0.45)', border: 'var(--color-orange)',   text: '#7A5C20' },
  sky:      { bg: 'rgba(212,191,207,0.35)', border: 'var(--color-sky-dark)', text: 'var(--color-sky-dark)' },
  lavender: { bg: 'rgba(212,191,207,0.35)', border: 'var(--color-sky-dark)', text: 'var(--color-sky-dark)' },
}

export default function PatchBadge({ children, color = 'rust', className = '', size = 'md' }: PatchBadgeProps) {
  const c = colorMap[color] ?? colorMap.rust
  const padding = size === 'sm' ? '2px 8px' : '4px 12px'
  const fontSize = size === 'sm' ? '10px' : '11px'

  return (
    <span
      className={`inline-flex items-center corner-marks ${className}`}
      style={{
        padding,
        background:    c.bg,
        border:        `1.5px dashed ${c.border}`,
        borderRadius:  '2px',
        fontFamily:    'var(--font-mono)',
        fontSize,
        color:         c.text,
        letterSpacing: '0.1em',
        textTransform: 'uppercase' as const,
        position:      'relative',
      }}
    >
      {children}
    </span>
  )
}
