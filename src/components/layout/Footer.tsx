const MONO = { fontFamily: 'var(--font-mono)' } as const

export default function Footer() {
  return (
    <footer
      style={{
        background: '#414441',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '18px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
      }}
    >
      <span
        style={{
          ...MONO,
          fontSize: '10px',
          letterSpacing: '0.14em',
          color: 'rgba(255,255,255,0.42)',
          textTransform: 'uppercase',
        }}
      >
        © 2026 Víctor Manuel Canchola Cervantes · Todos los derechos reservados
      </span>

      <span
        style={{
          ...MONO,
          fontSize: '10px',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.38)',
          textTransform: 'uppercase',
        }}
      >
        Hecho por{' '}
        <a
          href="https://github.com/IsoleucineDev"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#AFE695',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(175,230,149,0.35)',
            paddingBottom: '1px',
            transition: 'color 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#7CA36A'
            e.currentTarget.style.borderColor = 'rgba(124,163,106,0.6)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = '#AFE695'
            e.currentTarget.style.borderColor = 'rgba(175,230,149,0.35)'
          }}
        >
          IsoleucineDev
        </a>
      </span>
    </footer>
  )
}
