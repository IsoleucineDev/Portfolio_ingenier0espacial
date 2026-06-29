interface WashiTapeProps {
  text?: string
  color?: 'gold' | 'sage' | 'sky' | 'rose' | 'spring'
  rotate?: number
  className?: string
  width?: number
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  gold:   { bg: 'rgba(240,208,144,0.70)',  text: '#7A5C20', border: 'rgba(223,130,42,0.25)' },
  sage:   { bg: 'rgba(181,201,168,0.70)',  text: '#3A6030', border: 'rgba(124,163,106,0.3)' },
  sky:    { bg: 'rgba(212,191,207,0.70)',  text: '#6A4A6A', border: 'rgba(168,136,154,0.3)' },
  rose:   { bg: 'rgba(232,180,160,0.70)',  text: '#7A3C28', border: 'rgba(201,139,106,0.3)' },
  spring: { bg: 'rgba(175,230,149,0.65)',  text: '#3A5A28', border: 'rgba(124,163,106,0.3)' },
}

export default function WashiTape({
  text,
  color = 'gold',
  rotate = -2,
  className = '',
  width = 180,
}: WashiTapeProps) {
  const c = colorMap[color] ?? colorMap.gold

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{
        transform:         `rotate(${rotate}deg)`,
        transformOrigin:   'center center',
        display:           'inline-block',
        width:             `${width}px`,
        padding:           '6px 12px',
        background:        c.bg,
        border:            `1px solid ${c.border}`,
        backdropFilter:    'blur(2px)',
      }}
    >
      {text && (
        <span
          style={{
            display:      'block',
            fontFamily:   'var(--font-hand)',
            fontSize:     '13px',
            color:        c.text,
            letterSpacing: '0.04em',
            whiteSpace:   'nowrap',
            textAlign:    'center',
            lineHeight:   '1.4',
          }}
        >
          {text}
        </span>
      )}
    </div>
  )
}
