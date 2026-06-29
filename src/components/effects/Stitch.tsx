interface StitchProps {
  className?: string
  vertical?: boolean
  length?: number
  gap?: number
}

export default function Stitch({ className = '', vertical = false, length = 200, gap = 18 }: StitchProps) {
  const dash = `${gap * 0.55} ${gap * 0.45}`

  if (vertical) {
    return (
      <svg
        viewBox={`0 0 12 ${length}`}
        width="12"
        height={length}
        aria-hidden="true"
        className={className}
        style={{ display: 'block', overflow: 'visible' }}
      >
        <line
          x1="6" y1="0" x2="6" y2={length}
          stroke="currentColor"
          strokeDasharray={dash}
          strokeLinecap="round"
          strokeWidth="1.5"
          strokeDashoffset="4"
        />
        <line
          x1="3" y1="0" x2="9" y2="0"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.4"
        />
        <line
          x1="3" y1={length} x2="9" y2={length}
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    )
  }

  return (
    <svg
      viewBox={`0 0 ${length} 12`}
      width={length}
      height="12"
      aria-hidden="true"
      className={className}
      style={{ display: 'block', maxWidth: '100%', overflow: 'visible' }}
    >
      <line
        x1="0" y1="6" x2={length} y2="6"
        stroke="currentColor"
        strokeDasharray={dash}
        strokeLinecap="round"
        strokeWidth="1.5"
        strokeDashoffset="4"
      />
      <line
        x1="0" y1="3" x2="0" y2="9"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
      <line
        x1={length} y1="3" x2={length} y2="9"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  )
}
