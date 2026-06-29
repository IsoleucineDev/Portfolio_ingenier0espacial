export interface CloudinaryAsset {
  publicId: string
  alt: string
  width: number
  height: number
}

export interface VideoItem {
  url: string
  title: string
  thumbnail?: string
  platform: 'youtube' | 'vimeo' | 'cloudinary'
}

// ─── Category Themes ──────────────────────────────────────────────────────────

export type AccentColor = 'sky' | 'rust' | 'lavender' | 'sage' | 'gold'

export interface CategoryTheme {
  accentColor: AccentColor
  bandBg: string     // CSS color for the expanded band background
  bandBgHover: string
  textColor: 'light' | 'dark'
}

// ─── Project (used in Foley + Alternative) ──────────────────────────────────

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  category?: string
  year: number
  tags: string[]
  cover: CloudinaryAsset
  video?: VideoItem
  audioUrl?: string
  images?: CloudinaryAsset[]
  tools?: string[]
  featured?: boolean
}

// ─── Playlist Category (Music for Games, Short Films) ───────────────────────

export interface SoundCloudConfig {
  playlistUrl: string
  embedUrl: string
  trackCount?: number
}

export interface ProcessStep {
  title: string
  description: string
  icon?: string
}

export interface PlaylistCategory {
  id: string
  slug: string
  title: string
  shortTitle: string
  subtitle: string
  tagline: string
  description: string
  longDescription: string
  type: 'playlist'
  soundcloud: SoundCloudConfig
  theme: CategoryTheme
  order: number
  visible: boolean
  process?: {
    title: string
    description: string
    steps: ProcessStep[]
  }
  videos?: VideoItem[]
  images?: CloudinaryAsset[]
}

// ─── Portfolio Category (Foley, Alternative) ─────────────────────────────────

export interface PortfolioCategory {
  id: string
  slug: string
  title: string
  shortTitle: string
  subtitle: string
  tagline: string
  description: string
  longDescription: string
  type: 'portfolio'
  projects: Project[]
  theme: CategoryTheme
  order: number
  visible: boolean
}

export type Category = PlaylistCategory | PortfolioCategory

export interface PortfolioContent {
  categories: Category[]
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  id: string
  label: string
  path: string
  iconName: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  ariaLabel: string
}

export interface NavigationContent {
  items: NavItem[]
  social: SocialLink[]
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export interface HeroCTA {
  label: string
  href: string
  variant: 'primary' | 'secondary'
  external?: boolean
}

export interface HeroContent {
  displayName?: string
  familyName?: string
  eyebrow: string
  headline: string
  typewriter: string[]
  description: string
  ctas: HeroCTA[]
  image: CloudinaryAsset
  badge?: {
    text: string
    visible: boolean
  }
}

// ─── About ───────────────────────────────────────────────────────────────────

export interface Highlight {
  value: string
  label: string
}

export interface SkillCategory {
  category: string
  items: string[]
}

export interface AboutContent {
  eyebrow: string
  headline: string
  image: CloudinaryAsset
  bio: {
    intro: string
    paragraphs: string[]
    quote: string
  }
  highlights: Highlight[]
  skills: SkillCategory[]
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface ContactMethod {
  id: string
  type: 'whatsapp' | 'email' | 'social'
  label: string
  value: string
  href: string
  cta: string
  primary?: boolean
}

export interface FormField {
  name: string
  type: 'text' | 'email' | 'textarea' | 'select'
  label: string
  placeholder: string
  required: boolean
  options?: string[]
}

export interface ContactContent {
  eyebrow: string
  headline: string
  description: string
  methods: ContactMethod[]
  form: {
    enabled: boolean
    provider: 'formspree' | 'workers'
    endpoint: string
    fields: FormField[]
    successMessage: string
    errorMessage: string
  }
}

// ─── Meta ────────────────────────────────────────────────────────────────────

export interface MetaContent {
  siteName: string
  defaultTitle: string
  titleTemplate: string
  defaultDescription: string
  siteUrl: string
  locale: string
  og: {
    image: string
    imageWidth: number
    imageHeight: number
  }
}

// ─── Full Content Store ───────────────────────────────────────────────────────

export interface ContentStore {
  meta: MetaContent
  navigation: NavigationContent
  hero: HeroContent
  portfolio: PortfolioContent
  about: AboutContent
  contact: ContactContent
}

export type ContentKey = keyof ContentStore
