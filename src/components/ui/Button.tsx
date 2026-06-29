import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: Variant
  size?: Size
  href?: string
  external?: boolean
  disabled?: boolean
  loading?: boolean
  children: ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
  showArrow?: boolean
}

// Artisanal fabric-label style — no corporate pills, no big gradients
const baseStyle: React.CSSProperties = {
  display:        'inline-flex',
  alignItems:     'center',
  gap:            '6px',
  fontFamily:     'var(--font-body)',
  fontWeight:     400,
  letterSpacing:  '0.01em',
  textDecoration: 'none',
  cursor:         'pointer',
  borderRadius:   '3px',
  transition:     'background 0.2s, border-color 0.2s, color 0.2s',
  userSelect:     'none',
  whiteSpace:     'nowrap',
}

function getStyles(variant: Variant, size: Size, disabled: boolean): React.CSSProperties {
  const sizeMap: Record<Size, React.CSSProperties> = {
    sm: { padding: '5px 12px', fontSize: '12px' },
    md: { padding: '9px 18px', fontSize: '13px' },
    lg: { padding: '12px 24px', fontSize: '14px' },
  }

  const variantMap: Record<Variant, React.CSSProperties> = {
    primary: {
      background: 'var(--color-rust)',
      color:      'var(--color-inverse)',
      border:     '1.5px solid var(--color-rust-dark)',
    },
    secondary: {
      background: 'var(--color-paper)',
      color:      'var(--color-prose)',
      border:     '1.5px dashed var(--color-border-strong)',
    },
    ghost: {
      background:      'transparent',
      color:           'var(--color-muted)',
      border:          'none',
      textDecoration:  'underline',
      textUnderlineOffset: '4px',
      padding:         '0',
    },
  }

  return {
    ...baseStyle,
    ...sizeMap[size],
    ...variantMap[variant],
    opacity: disabled ? 0.45 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
  }
}

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  disabled = false,
  loading = false,
  children,
  onClick,
  className = '',
  type = 'button',
  showArrow = true,
}: ButtonProps) {
  const style = getStyles(variant, size, disabled)
  const ArrowIcon = (external || href?.startsWith('http')) ? ArrowUpRight : ArrowRight
  const arrowSize = size === 'lg' ? 14 : 12

  const motionProps = {
    whileHover: { scale: disabled ? 1 : 1.02 },
    whileTap:   { scale: disabled ? 1 : 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
  }

  const inner = (
    <>
      {loading
        ? <span className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
        : children
      }
      {showArrow && !loading && variant !== 'ghost' && <ArrowIcon size={arrowSize} />}
    </>
  )

  if (href && (external || href.startsWith('http'))) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
        className={className}
        aria-disabled={disabled}
        {...motionProps}
      >
        {inner}
      </motion.a>
    )
  }

  if (href) {
    return (
      <motion.span {...motionProps}>
        <Link to={href} style={style} className={className} aria-disabled={disabled}>
          {inner}
        </Link>
      </motion.span>
    )
  }

  return (
    <motion.button
      type={type}
      style={style}
      className={className}
      onClick={onClick}
      disabled={disabled || loading}
      {...motionProps}
    >
      {inner}
    </motion.button>
  )
}
