# COMPONENT_TREE.md
## Árbol de Componentes — Portfolio Víctor Manuel Canchola

---

## Convenciones

```
[P] = Page Component        → src/pages/
[S] = Section Component     → src/components/sections/
[L] = Layout Component      → src/components/layout/
[U] = UI Atom/Molecule      → src/components/ui/
[E] = Effect/Visual         → src/components/effects/
[A] = Audio Component       → src/components/player/
[C] = Context Provider      → src/context/
```

---

## Árbol Raíz

```
main.tsx
└── [C] ThemeProvider
    │   Lee: clients/{CLIENT_ID}/theme.json
    │   Aplica CSS vars en <html>
    │   Preload Google Fonts
    │
    └── [C] ContentProvider
        │   Lee: clients/{CLIENT_ID}/content/*.json
        │   Valida contra schemas Zod
        │   Expone via useContent() hook
        │
        └── [C] AudioProvider
            │   Estado global: currentTrack, isPlaying, playlist
            │   Engine: Howler.js (lazy loaded)
            │
            └── BrowserRouter (React Router v6)
                │
                └── [L] AppShell
                    │   Wrapper global con AnimatePresence
                    │
                    ├── [E] NoiseOverlay         (fixed, z-index: 9999)
                    ├── [E] CustomCursor         (fixed, z-index: 9998)
                    ├── [A] AudioPlayerMini      (fixed bottom-right)
                    ├── [L] FloatingNav          (fixed bottom-center)
                    │
                    └── Routes (React Router)
                        ├── "/" → [P] HomePage
                        ├── "/videogames" → [P] VideoGamesPage
                        ├── "/foley" → [P] FoleyPage
                        ├── "/projects" → [P] ProjectsPage
                        ├── "/about" → [P] AboutPage
                        ├── "/contact" → [P] ContactPage
                        └── "*" → [P] NotFoundPage
```

---

## Componentes de Layout

### [L] AppShell
```
Props: { children: ReactNode }
Responsabilidad: AnimatePresence para page transitions, monta elementos globales fijos
```

### [L] FloatingNav
```
Props: ninguno (lee de ContentContext y usePathname)
Estado: hoveredItem, isExpanded
Comportamiento:
  - Pill flotante en bottom-center
  - Íconos de Lucide con labels que aparecen en hover
  - Item activo resaltado con color de acento de la ruta
  - En móvil: íconos más pequeños, sin labels
  - Animación de entrada: slide-up al montar
  - Esconde/muestra en scroll (hide on scroll down, show on scroll up)
Subcomponentes:
  └── FloatingNavItem
      Props: { item: NavItem, isActive: boolean, accentColor: string }
```

### [L] PageWrapper
```
Props: { children: ReactNode, bgColor?: string }
Responsabilidad: padding top/bottom para evitar solapamiento con FloatingNav y AudioPlayer
                  Framer Motion layout animation wrapper
```

---

## Efectos Globales

### [E] NoiseOverlay
```
Props: { opacity?: number } (default: 0.025)
Implementación: SVG noise como pseudo-elemento ::after en fixed
Respeta: prefers-reduced-motion (se desactiva si está activo)
```

### [E] CustomCursor
```
Props: ninguno
Estado: position {x, y}, variant (default | hover | click | text | audio)
Comportamiento:
  - Dot principal + trailing circle
  - Cambia de variante según el elemento bajo el cursor:
    * Links/botones → "hover" (círculo más grande)
    * Texto → "text" (cursor vertical)
    * Controles de audio → "audio" (ícono de play)
  - Desactivado en touch devices y prefers-reduced-motion
Implementación: Framer Motion useMousePosition + layoutId
```

---

## Páginas

### [P] HomePage
```
Layout: scroll vertical, secciones apiladas
Subcomponentes:
  ├── [S] HeroSection
  ├── [S] ServicesSection
  ├── [S] FeaturedWorkSection
  └── [S] HomeCTASection
```

### [P] VideoGamesPage
```
Meta: Lee de content/videogames.json
Subcomponentes:
  ├── [S] PageHero (variant: "videogames")
  ├── [S] ProjectGrid
  └── [S] ProcessSection (opcional)
```

### [P] FoleyPage
```
Meta: Lee de content/foley.json
Subcomponentes:
  ├── [S] PageHero (variant: "foley")
  ├── [S] FoleyShowcase
  └── [S] FoleyProcess
```

### [P] ProjectsPage
```
Meta: Lee de content/projects.json
Subcomponentes:
  ├── [S] PageHero (variant: "projects")
  ├── [S] BandSection
  └── [S] AlternativeProjectsSection
```

### [P] AboutPage
```
Meta: Lee de content/about.json
Subcomponentes:
  ├── [S] AboutHero
  ├── [S] BioSection
  ├── [S] SkillsSection
  └── [S] AboutCTA
```

### [P] ContactPage
```
Meta: Lee de content/contact.json
Subcomponentes:
  ├── [S] ContactHero
  ├── [S] ContactMethods
  └── [S] ContactForm
```

---

## Secciones — Home

### [S] HeroSection
```
Props: { content: HeroContent }
Layout: Grid 2 cols (texto 7 / visual 5) — stack en móvil
Subcomponentes:
  ├── HeroEyebrow
  │   Animación: fade-in + slide-up con delay 0
  │   Estilo: font-mono, tracking-widest, uppercase, texto pequeño
  │
  ├── HeroHeadline
  │   Animación: reveal por líneas (cada línea en overflow:hidden + translateY)
  │   Delay: stagger 0.15s por línea
  │   Font: font-display, text-display-xl
  │
  ├── TypewriterEffect
  │   Librería: react-type-animation
  │   Props: { sequences: string[] } (desde content.typewriter)
  │   Animación: cursor parpadeante personalizado
  │
  ├── HeroDescription
  │   Animación: fade-up con delay 0.6s
  │
  ├── HeroCTAs
  │   Renderiza: botones desde content.ctas
  │   Animación: scale-in con stagger
  │   Subcomponentes: [U] Button (x2)
  │
  ├── HeroBadge (si content.badge existe)
  │   Estilo: pill verde con ícono de punto animado (pulsing)
  │
  └── HeroVisual
      Layout: posición relativa, desbordamiento visible
      Subcomponentes:
        ├── HeroMainImage
        │   Implementación: [U] CloudinaryImage con priority=true
        │   Animación: fade-in al cargar (no antes)
        │
        ├── HeroBlob (x2)
        │   Implementación: [E] OrgánicBlob
        │   Animación: borderRadius morphing continuo (Framer Motion)
        │   Colores: sage y gold con opacity 0.4
        │
        └── HeroDecorativeImages (si existen)
            Posición: absoluta, corners del visual
            Animación: parallax sutil en scroll
```

### [S] ServicesSection
```
Props: { content: ServicesContent }
Layout: 3 cards en grid — scroll horizontal en móvil
Subcomponentes:
  ├── SectionHeader
  │   Subcomponentes: SectionEyebrow + SectionTitle + SectionDescription
  │   Animación: fade-up al entrar en viewport (useInView)
  │
  └── ServiceCard (x3)
      Props: { item: ServiceItem, index: number }
      Animación: stagger fade-up (0.1s por card)
      Hover: elevación + imagen zoom sutil + label de acento visible
      Subcomponentes:
        ├── ServiceCardImage ([U] CloudinaryImage)
        ├── ServiceCardTitle
        ├── ServiceCardDescription
        ├── ServiceCardTags ([U] TagList)
        └── ServiceCardArrow (ícono animado en hover)
```

### [S] FeaturedWorkSection
```
Props: ninguno (selecciona automáticamente el featured: true de videogames + foley)
Layout: 2 cols asimétricas
Subcomponentes:
  ├── SectionHeader
  ├── FeaturedTrackCard
  │   Props: { project: GameProject | FoleyProject }
  │   Subcomponentes:
  │     ├── [U] CloudinaryImage
  │     ├── [U] PlayButton → activa AudioContext
  │     └── [U] TagList
  └── FeaturedVisualAccent ([E] OrganicBlob decorativo)
```

### [S] HomeCTASection
```
Props: ninguno (usa content/contact.json para el href de WhatsApp)
Layout: centered, padding generoso
Subcomponentes:
  ├── CTAHeadline
  ├── CTADescription
  └── [U] Button (primary, grande, link a /contact)
```

---

## Secciones — VideoGames / Foley / Projects

### [S] PageHero
```
Props: { hero: PageHero, variant: 'videogames' | 'foley' | 'projects' | 'about' }
Variante determina: color de acento, imagen de fondo, orientación del layout
Layout: full-width con imagen de fondo + overlay
Subcomponentes:
  ├── PageHeroEyebrow
  ├── PageHeroHeadline (animación por palabras)
  ├── PageHeroDescription
  └── PageHeroBackground ([U] CloudinaryImage con blur y overlay)
```

### [S] ProjectGrid
```
Props: { projects: GameProject[] | FoleyProject[] }
Layout: Masonry visual — 2 cols con alturas variables
Estado: filterTag (filtra por tags)
Subcomponentes:
  ├── ProjectFilterBar
  │   Subcomponentes: [U] TagButton (x tags únicos)
  └── ProjectCard (x proyectos)
      Props: { project, isPlaying: boolean, onPlay: () => void }
      Animación: fade-up stagger al entrar en viewport
      Hover: scale + shadow + overlays de información
      Subcomponentes:
        ├── ProjectCardCover ([U] CloudinaryImage)
        ├── ProjectCardInfo (title, year, client)
        ├── ProjectCardTags ([U] TagList)
        └── ProjectCardPlayButton → despacha a AudioContext
```

### [S] BandSection
```
Props: { band: BandContent }
Layout: 2 cols — descripción / embed
Subcomponentes:
  ├── BandDescription (texto con TypeAnimation)
  ├── SpotifyEmbed (iframe optimizado)
  └── BandLinks ([U] Button para Spotify, SoundCloud, etc.)
```

---

## UI Atoms & Molecules

### [U] Button
```
Props: {
  variant: 'primary' | 'secondary' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  href?: string           // Si existe, renderiza como <a> o <Link>
  external?: boolean
  disabled?: boolean
  loading?: boolean
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  children: ReactNode
  onClick?: () => void
  className?: string
}
Notas: Si href existe, renderiza como Link (interno) o <a target="_blank"> (externo)
       Todos los estados: hover, active, focus, disabled, loading
       Loading state muestra spinner y desactiva click
```

### [U] Tag / TagList
```
Tag Props: { label: string, color?: string }
TagList Props: { tags: string[], maxVisible?: number }
Nota: Si maxVisible < tags.length, muestra "+N más" al final
```

### [U] CloudinaryImage
```
Props: {
  publicId: string
  alt: string
  width: number
  height: number
  priority?: boolean      // Preload con <link rel="preload">
  quality?: number | 'auto'
  format?: 'auto' | 'webp'
  className?: string
  objectFit?: 'cover' | 'contain'
  blur?: boolean          // Muestra blur placeholder mientras carga
}
Comportamiento:
  - Genera srcSet con múltiples tamaños (400, 800, 1200, 1600)
  - blur=true → muestra versión de 40px blur mientras carga (desde Cloudinary)
  - priority=true → agrega <link rel="preload"> en el head
  - Lazy loading por defecto (loading="lazy"), eager si priority=true
```

### [U] PlayButton
```
Props: {
  size?: 'sm' | 'md' | 'lg'
  isPlaying: boolean
  onToggle: () => void
  accentColor?: string
}
Animación: morphing entre ▶ y ⏸ con Framer Motion layoutId
```

### [U] SectionHeader
```
Props: {
  eyebrow?: string
  headline: string
  description?: string
  align?: 'left' | 'center' | 'right'
  accentColor?: string
}
Animación: fade-up stagger al entrar en viewport
```

### [U] OrganicDivider
```
Props: { variant: 1 | 2 | 3 | 4, color?: string, flip?: boolean }
Implementación: SVG path de borde irregular (4 variantes)
Uso: Entre secciones para dar efecto "papel rasgado"
```

### [U] ScrollIndicator
```
Props: ninguno
Comportamiento: Flecha/línea animada que indica scroll hacia abajo
               Se oculta al hacer scroll (useScrollProgress)
Posición: absolute bottom-8 en HeroSection
```

---

## Audio Components

### [A] AudioPlayerMini
```
Props: ninguno (lee de AudioContext)
Estado propio: isExpanded
Layout collapsed: círculo 48px con botón play
Layout expanded: pill 280px con:
  - Thumbnail del track actual
  - Título + artista
  - Botón prev / play-pause / next
  - Barra de progreso (click para seek)
Animación:
  - Entrada: slide-in desde derecha al montarse
  - Expand/collapse: width animation con Framer Motion layout
  - Mostrar/ocultar en páginas específicas (no en Contact)
```

### [A] AudioPlayer (Full)
```
Props: { playlist: AudioTrack[], accentColor?: string }
Lee/escribe: AudioContext
Subcomponentes:
  ├── AudioPlayerTrackInfo (cover + título + tags)
  ├── AudioPlayerControls (prev, play, next, volume, shuffle)
  ├── AudioPlayerProgress (seek bar con tiempo actual/total)
  ├── AudioPlayerVolume (slider + ícono mute)
  ├── AudioWaveform (visualizador Canvas — solo si el track tiene waveformPublicId)
  └── AudioPlayerPlaylist (lista colapsable de pistas)
```

### [A] AudioWaveform
```
Props: { waveformImagePublicId: string, progress: number, accentColor?: string }
Implementación: imagen de forma de onda de Cloudinary + overlay de progreso via Canvas
               (NO usa Web Audio API — demasiado costoso para el primer render)
```

---

## Effects

### [E] OrganicBlob
```
Props: {
  color: string           // CSS color o var()
  size?: number           // px
  opacity?: number
  animated?: boolean      // Activa morphing de borderRadius
  className?: string
}
Implementación: div con borderRadius animado vía Framer Motion
               prefers-reduced-motion → sin animación, forma fija
```

### [E] ParallaxLayer
```
Props: { children: ReactNode, speed?: number, className?: string }
Implementación: Framer Motion useScroll + useTransform
               NO en móvil (performance)
```

### [E] RevealText
```
Props: {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  mode?: 'words' | 'chars' | 'lines'
  delay?: number
  className?: string
}
Implementación: Divide el texto en tokens, cada uno en overflow:hidden
               Framer Motion variants con stagger
               prefers-reduced-motion → fade simple sin movimiento
```

### [E] TornEdge
```
Props: { position: 'top' | 'bottom', variant?: 1 | 2 | 3, color?: string }
Implementación: SVG clip-path o path de borde irregular
Uso: Divisor entre secciones con backgrounds diferentes
```

---

## Context Providers

### [C] ThemeProvider
```
Lee: clients/{CLIENT_ID}/theme.json
Hace:
  1. Aplica CSS custom properties en document.documentElement
  2. Inyecta <link rel="preload"> para Google Fonts
  3. Inyecta el <link rel="stylesheet"> de Google Fonts
Expone: useTheme() → { theme: ThemeConfig }
```

### [C] ContentProvider
```
Lee: Todos los JSON de clients/{CLIENT_ID}/content/
Hace:
  1. Importa dinámicamente cada JSON usando import()
  2. Valida con Zod en desarrollo (no en producción para performance)
  3. Provee via Context
Expone: useContent<T>(key: ContentKey) → T
```

### [C] AudioProvider
```
Estado: { currentTrack, isPlaying, playlist, volume, currentTime, duration }
Acciones: play(track), pause(), next(), prev(), seek(time), setVolume(n), setPlaylist(tracks)
Howler: instancia creada lazy (solo cuando se reproduce por primera vez)
Expone: useAudio() → { state, actions }
```

---

## Hooks

```typescript
// Detecta prefers-reduced-motion
useReducedMotion(): boolean

// Progreso de scroll de la página (0-1)
useScrollProgress(): MotionValue<number>

// Detecta si el elemento está en viewport
useInView(ref: RefObject, options?): boolean

// Acceso al estado del audio player
useAudio(): AudioContextValue

// Lee contenido del cliente activo
useContent<T>(key: ContentKey): T

// Detecta el pathname activo
useActiveRoute(): string

// Detecta si es touch device
useIsTouch(): boolean
```

---

## Diagram de Flujo de Datos

```
JSON Files (src/clients/*)
        │
        ▼
ContentProvider (valida + almacena en memoria)
        │
        ├──► useContent('hero') ──► HeroSection ──► HeroHeadline, etc.
        ├──► useContent('services') ──► ServicesSection ──► ServiceCard
        ├──► useContent('videogames') ──► VideoGamesPage ──► ProjectGrid
        ├──► useContent('navigation') ──► FloatingNav
        └──► useContent('contact') ──► ContactPage

Cloudinary (external CDN)
        │
        ▼ (via cldUrl() helper)
CloudinaryImage ──► optimized <img> con srcSet
        │
        └──► PreloadLink en <head> si priority=true

User action (click play)
        │
        ▼
PlayButton ──► useAudio().actions.play(track)
        │
        ▼
AudioProvider ──► Howler.play(cloudinaryAudioUrl)
        │
        ▼
AudioPlayerMini ──► muestra estado actualizado
```
