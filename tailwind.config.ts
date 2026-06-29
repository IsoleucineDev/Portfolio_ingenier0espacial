import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        canvas:  'var(--color-canvas)',
        paper:   'var(--color-paper)',
        ink:     'var(--color-ink)',
        card:    'var(--color-card)',
        prose:   'var(--color-prose)',
        muted:   'var(--color-muted)',
        subtle:  'var(--color-subtle)',
        inverse: 'var(--color-inverse)',
        border:  'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        sage:    'var(--color-sage)',
        'sage-light': 'var(--color-sage-light)',
        'sage-dark':  'var(--color-sage-dark)',
        rust:    'var(--color-rust)',
        'rust-light': 'var(--color-rust-light)',
        'rust-dark':  'var(--color-rust-dark)',
        sky:     'var(--color-sky)',
        'sky-light': 'var(--color-sky-light)',
        'sky-dark':  'var(--color-sky-dark)',
        gold:    'var(--color-gold)',
        'gold-light': 'var(--color-gold-light)',
        lavender: 'var(--color-lavender)',
        rose:    'var(--color-rose)',
        spring:  'var(--color-spring)',
        orange:  'var(--color-orange)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body:    'var(--font-body)',
        mono:    'var(--font-mono)',
        hand:    'var(--font-hand)',
      },
      animation: {
        'blob-morph': 'blobMorph 10s ease-in-out infinite',
        'pulse-dot':  'pulseDot 2s ease-in-out infinite',
        'spin-slow':  'spin 12s linear infinite',
      },
      keyframes: {
        blobMorph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '33%':      { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '66%':      { borderRadius: '50% 30% 50% 50% / 30% 50% 50% 60%' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.5', transform: 'scale(0.8)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
