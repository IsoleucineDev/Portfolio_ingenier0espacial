interface TagProps {
  label: string
  color?: 'default' | 'rust' | 'sage' | 'gold' | 'sky'
}

// Fabric-label style tag — dashed border, no heavy pill shape
export function Tag({ label, color = 'default' }: TagProps) {
  const colorMap: Record<string, React.CSSProperties> = {
    default: {
      background:   'var(--color-paper)',
      border:       '1px dashed var(--color-border)',
      color:        'var(--color-muted)',
    },
    rust: {
      background:   'rgba(232,180,160,0.3)',
      border:       '1px dashed var(--color-rust)',
      color:        'var(--color-rust-dark)',
    },
    sage: {
      background:   'rgba(181,201,168,0.3)',
      border:       '1px dashed var(--color-sage)',
      color:        'var(--color-sage-dark)',
    },
    gold: {
      background:   'rgba(240,208,144,0.35)',
      border:       '1px dashed var(--color-orange)',
      color:        '#7A5C20',
    },
    sky: {
      background:   'rgba(212,191,207,0.3)',
      border:       '1px dashed var(--color-sky-dark)',
      color:        'var(--color-sky-dark)',
    },
  }

  return (
    <span
      style={{
        display:       'inline-block',
        padding:       '2px 9px',
        borderRadius:  '2px',
        fontFamily:    'var(--font-mono)',
        fontSize:      '10px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        lineHeight:    '1.8',
        ...colorMap[color],
      }}
    >
      {label}
    </span>
  )
}

interface TagListProps {
  tags: string[]
  color?: TagProps['color']
  maxVisible?: number
  // light prop kept for backwards compat — ignored (palette is always light now)
  light?: boolean
}

export function TagList({ tags, color = 'default', maxVisible }: TagListProps) {
  const visible = maxVisible ? tags.slice(0, maxVisible) : tags
  const rest     = maxVisible ? Math.max(0, tags.length - maxVisible) : 0

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map(tag => <Tag key={tag} label={tag} color={color} />)}
      {rest > 0 && <Tag label={`+${rest}`} color={color} />}
    </div>
  )
}
