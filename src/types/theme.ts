export interface ThemeColors {
  canvas: string
  paper: string
  ink: string
  card: string
  prose: string
  muted: string
  subtle: string
  inverse: string
  border: string
  'border-strong': string
  sage: string
  'sage-light': string
  'sage-dark': string
  rust: string
  'rust-light': string
  'rust-dark': string
  sky: string
  'sky-light': string
  'sky-dark': string
  gold: string
  'gold-light': string
  lavender: string
  rose: string
  spring?: string
  orange?: string
}

export interface ThemeFonts {
  display: string
  body: string
  mono: string
  hand?: string
  googleFontsUrl: string
}

export interface ThemeConfig {
  colors: ThemeColors
  fonts: ThemeFonts
  noise: boolean
  cursor: boolean
}
