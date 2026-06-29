# CONTENT_SCHEMA.md
## Esquemas de Contenido — Portfolio Víctor Manuel Canchola
**Todo el contenido editable vive en JSON. Nunca en el código.**

---

## Estructura de Carpetas de Contenido

```
src/clients/ingenier0espacial/
├── theme.json
└── content/
    ├── meta.json
    ├── navigation.json
    ├── hero.json
    ├── services.json
    ├── videogames.json
    ├── foley.json
    ├── projects.json
    ├── about.json
    └── contact.json
```

---

## 1. theme.json

Tokens de diseño del cliente. Define toda la identidad visual.

```typescript
interface ThemeConfig {
  colors: Record<string, string>    // CSS custom property values
  fonts: {
    display: string   // Font family para headlines
    body: string      // Font family para body text
    mono: string      // Font family para labels
    googleFontsUrl: string  // URL de Google Fonts para preload
  }
  radius: {
    card: string
    button: string
    pill: string
  }
  noise: boolean    // Activar/desactivar texture overlay
  cursor: boolean   // Activar/desactivar cursor personalizado
}
```

```json
{
  "colors": {
    "bg-primary":    "#F9F4EE",
    "bg-secondary":  "#F0E8DC",
    "bg-dark":       "#1E1A15",
    "bg-accent":     "#EDE0CE",
    "text-primary":  "#2A2218",
    "text-secondary":"#6B5E4E",
    "text-muted":    "#A0917F",
    "text-inverse":  "#F9F4EE",
    "sage":          "#7A9E7E",
    "sage-light":    "#B5CDB7",
    "sage-dark":     "#4F7253",
    "rust":          "#C4704F",
    "rust-light":    "#E4A080",
    "rust-dark":     "#8F4A2F",
    "sky":           "#7DB0D0",
    "sky-light":     "#B0D2E8",
    "sky-dark":      "#4A88B0",
    "gold":          "#D9A84A",
    "gold-light":    "#ECC878",
    "lavender":      "#A89BC0",
    "rose":          "#D4899A",
    "border":        "#D8CCBA",
    "border-strong": "#B8A898"
  },
  "fonts": {
    "display": "'Shippori Mincho', 'Noto Serif JP', Georgia, serif",
    "body": "'Outfit', 'DM Sans', system-ui, sans-serif",
    "mono": "'Space Mono', monospace",
    "googleFontsUrl": "https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;700&family=Outfit:wght@300;400;500;600&family=Space+Mono&display=swap"
  },
  "radius": {
    "card": "16px",
    "button": "9999px",
    "pill": "9999px"
  },
  "noise": true,
  "cursor": true
}
```

---

## 2. meta.json

SEO global y por ruta.

```typescript
interface MetaConfig {
  siteName: string
  defaultTitle: string
  titleTemplate: string   // e.g. "%s | Víctor Manuel Canchola"
  defaultDescription: string
  siteUrl: string
  locale: string          // "es_MX"
  og: {
    image: string         // Cloudinary public_id
    imageWidth: number
    imageHeight: number
  }
  twitter: {
    card: "summary_large_image" | "summary"
    handle?: string
  }
  jsonLd: PersonJsonLd
}

interface PersonJsonLd {
  "@type": "Person"
  name: string
  jobTitle: string
  description: string
  url: string
  image: string
  sameAs: string[]
  knowsAbout: string[]
}
```

```json
{
  "siteName": "Víctor Manuel Canchola",
  "defaultTitle": "Víctor Manuel Canchola | Compositor y Productor Musical",
  "titleTemplate": "%s | Víctor Manuel Canchola",
  "defaultDescription": "Compositor y productor musical especializado en videojuegos, foley y proyectos alternativos. Querétaro, México.",
  "siteUrl": "https://ingenier0espacial.com",
  "locale": "es_MX",
  "og": {
    "image": "clients/ingenier0espacial/ui/og-default",
    "imageWidth": 1200,
    "imageHeight": 630
  },
  "twitter": {
    "card": "summary_large_image",
    "handle": "@ingenier0espacial"
  },
  "jsonLd": {
    "@type": "Person",
    "name": "Víctor Manuel Canchola Cervantes",
    "jobTitle": "Compositor y Productor Musical",
    "description": "Compositor y productor musical especializado en composición para videojuegos, diseño de Foley, y proyectos musicales alternativos.",
    "url": "https://ingenier0espacial.com",
    "image": "clients/ingenier0espacial/avatar/victor-profile",
    "sameAs": [
      "https://open.spotify.com/artist/4F2qB8AattAcKT4noCIqcd",
      "https://on.soundcloud.com/6HVpkskQcFtRcyre8",
      "https://www.instagram.com/ingenier0espacial/",
      "https://youtube.com/@bitscraft-o2g"
    ],
    "knowsAbout": [
      "Composición Musical",
      "Producción Musical",
      "Música para Videojuegos",
      "Diseño de Foley",
      "Diseño Sonoro",
      "Arreglos Musicales"
    ]
  }
}
```

---

## 3. navigation.json

```typescript
interface NavigationConfig {
  items: NavItem[]
  social: SocialLink[]
}

interface NavItem {
  id: string
  label: string
  path: string
  iconName: string    // Nombre de ícono de Lucide (e.g. "Home", "Gamepad2")
  accentColor?: string  // CSS var key, e.g. "sky" para videojuegos
}

interface SocialLink {
  id: string
  platform: string    // "spotify", "soundcloud", "instagram", "youtube"
  url: string
  ariaLabel: string
}
```

```json
{
  "items": [
    {
      "id": "home",
      "label": "Inicio",
      "path": "/",
      "iconName": "Home",
      "accentColor": "sage"
    },
    {
      "id": "videogames",
      "label": "Videojuegos",
      "path": "/videogames",
      "iconName": "Gamepad2",
      "accentColor": "sky"
    },
    {
      "id": "foley",
      "label": "Foley",
      "path": "/foley",
      "iconName": "Ear",
      "accentColor": "rust"
    },
    {
      "id": "projects",
      "label": "Proyectos",
      "path": "/projects",
      "iconName": "Music",
      "accentColor": "lavender"
    },
    {
      "id": "about",
      "label": "Acerca de",
      "path": "/about",
      "iconName": "User",
      "accentColor": "gold"
    },
    {
      "id": "contact",
      "label": "Contacto",
      "path": "/contact",
      "iconName": "Mail",
      "accentColor": "rust"
    }
  ],
  "social": [
    {
      "id": "spotify",
      "platform": "spotify",
      "url": "https://open.spotify.com/artist/4F2qB8AattAcKT4noCIqcd",
      "ariaLabel": "Escuchar en Spotify"
    },
    {
      "id": "soundcloud",
      "platform": "soundcloud",
      "url": "https://on.soundcloud.com/6HVpkskQcFtRcyre8",
      "ariaLabel": "Escuchar en SoundCloud"
    },
    {
      "id": "instagram",
      "platform": "instagram",
      "url": "https://www.instagram.com/ingenier0espacial/",
      "ariaLabel": "Seguir en Instagram"
    },
    {
      "id": "youtube",
      "platform": "youtube",
      "url": "https://youtube.com/@bitscraft-o2g",
      "ariaLabel": "Ver en YouTube"
    },
    {
      "id": "youtubemusic",
      "platform": "youtubemusic",
      "url": "https://music.youtube.com/playlist?list=OLAK5uy_n9LubyMvmY81MMNlxXRNRQgoQJvCrKy88",
      "ariaLabel": "Escuchar en YouTube Music"
    }
  ]
}
```

---

## 4. hero.json

```typescript
interface HeroContent {
  eyebrow: string         // Texto pequeño encima del headline
  headline: string        // Titular principal
  subheadline: string     // Subtítulo
  typewriter: string[]    // Palabras que rotan en el typewriter
  description: string     // Párrafo de presentación breve
  ctas: HeroCTA[]
  visual: {
    mainImage: CloudinaryAsset     // Foto del artista
    decorativeImages?: CloudinaryAsset[]  // Para el collage
    altText: string
  }
  badge?: {
    text: string
    emoji?: string
  }
}

interface HeroCTA {
  label: string
  href: string
  variant: "primary" | "secondary"
  external?: boolean
}

interface CloudinaryAsset {
  publicId: string
  alt: string
  width: number
  height: number
}
```

```json
{
  "eyebrow": "Compositor & Productor Musical",
  "headline": "Música que construye\nmundos",
  "subheadline": "Víctor Manuel Canchola Cervantes",
  "typewriter": [
    "Compositor para Videojuegos",
    "Diseñador de Foley",
    "Productor Musical",
    "Arreglista",
    "Diseñador Sonoro"
  ],
  "description": "Creo experiencias sonoras para videojuegos, medios audiovisuales y proyectos alternativos. Con sede en Querétaro, México.",
  "ctas": [
    {
      "label": "Ver Portfolio",
      "href": "/videogames",
      "variant": "primary"
    },
    {
      "label": "Contactar",
      "href": "/contact",
      "variant": "secondary"
    }
  ],
  "visual": {
    "mainImage": {
      "publicId": "clients/ingenier0espacial/avatar/victor-profile",
      "alt": "Víctor Manuel Canchola Cervantes, compositor y productor musical",
      "width": 600,
      "height": 700
    },
    "decorativeImages": [
      {
        "publicId": "clients/ingenier0espacial/ui/hero-texture-1",
        "alt": "",
        "width": 200,
        "height": 200
      }
    ],
    "altText": "Víctor Manuel Canchola, compositor y productor musical de Querétaro, México"
  },
  "badge": {
    "text": "Disponible para proyectos",
    "emoji": "🌱"
  }
}
```

---

## 5. services.json

```typescript
interface ServicesContent {
  eyebrow: string
  headline: string
  description: string
  items: ServiceItem[]
}

interface ServiceItem {
  id: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  href: string
  accentColor: string   // CSS var key
  image: CloudinaryAsset
  featured?: boolean
}
```

```json
{
  "eyebrow": "Especialidades",
  "headline": "¿En qué puedo ayudarte?",
  "description": "Cada proyecto es un mundo por construir. Trabajo en tres áreas donde el sonido define la experiencia.",
  "items": [
    {
      "id": "videogames",
      "title": "Composición para\nVideojuegos",
      "subtitle": "Game Audio",
      "description": "Bandas sonoras adaptativas, música interactiva y diseño de audio para crear inmersión total en tus mundos.",
      "tags": ["OST", "Adaptative Music", "FMOD", "Wwise", "Unity", "Godot"],
      "href": "/videojuegos",
      "accentColor": "sky",
      "image": {
        "publicId": "clients/ingenier0espacial/ui/service-videogames",
        "alt": "Composición musical para videojuegos",
        "width": 600,
        "height": 400
      },
      "featured": true
    },
    {
      "id": "foley",
      "title": "Foley &\nDiseño Sonoro",
      "subtitle": "Sound Design",
      "description": "Captura, diseño y edición de efectos sonoros que dan vida a cualquier pieza audiovisual.",
      "tags": ["Foley", "SFX", "Ambiences", "Post-Producción", "DAW"],
      "href": "/foley",
      "accentColor": "rust",
      "image": {
        "publicId": "clients/ingenier0espacial/ui/service-foley",
        "alt": "Diseño de Foley y efectos de sonido",
        "width": 600,
        "height": 400
      }
    },
    {
      "id": "projects",
      "title": "Proyectos\nAlternativos",
      "subtitle": "Creative Projects",
      "description": "Composición, arreglos y producción para proyectos independientes con identidad propia.",
      "tags": ["Composición", "Arreglos", "Producción", "Rock", "Alternativo"],
      "href": "/proyectos",
      "accentColor": "lavender",
      "image": {
        "publicId": "clients/ingenier0espacial/ui/service-projects",
        "alt": "Proyectos musicales alternativos",
        "width": 600,
        "height": 400
      }
    }
  ]
}
```

---

## 6. videogames.json

```typescript
interface VideoGamesContent {
  meta: PageMeta
  hero: PageHero
  projects: GameProject[]
  testimonials?: Testimonial[]
  process?: ProcessStep[]
}

interface GameProject {
  id: string
  title: string
  client?: string
  year: number
  description: string
  tags: string[]
  cover: CloudinaryAsset
  audio?: AudioTrack[]
  videoUrl?: string       // YouTube/Vimeo para demo video
  featured?: boolean
  status: "released" | "wip" | "prototype"
}

interface AudioTrack {
  id: string
  title: string
  duration: string        // "2:34"
  audioPublicId: string   // Cloudinary audio asset
  waveformPublicId?: string  // Cloudinary waveform image
  tags?: string[]
}

interface PageHero {
  eyebrow: string
  headline: string
  description: string
  image?: CloudinaryAsset
}

interface PageMeta {
  title: string
  description: string
  ogImage?: string
}
```

```json
{
  "meta": {
    "title": "Composición para Videojuegos",
    "description": "Bandas sonoras y diseño de audio para videojuegos. Música adaptativa, interactiva y emocionante.",
    "ogImage": "clients/ingenier0espacial/videogames/og-videogames"
  },
  "hero": {
    "eyebrow": "Game Audio",
    "headline": "El sonido que\ncompleta el mundo",
    "description": "Cada nivel, cada boss, cada momento de silencio: la música define la memoria que se lleva el jugador."
  },
  "projects": [
    {
      "id": "epilogo",
      "title": "Epílogo",
      "year": 2023,
      "description": "Tema principal para cortometraje de animación. Orquestal con influencias del cine independiente japonés.",
      "tags": ["Orquestal", "Animación", "Cortometraje"],
      "cover": {
        "publicId": "clients/ingenier0espacial/projects/videogames/epilogo-cover",
        "alt": "Portada del proyecto Epílogo",
        "width": 600,
        "height": 400
      },
      "audio": [
        {
          "id": "epilogo-main",
          "title": "Epílogo — Tema Principal",
          "duration": "3:45",
          "audioPublicId": "clients/ingenier0espacial/audio/epilogo",
          "tags": ["Orquestal", "Emoción"]
        }
      ],
      "status": "released",
      "featured": true
    },
    {
      "id": "sonic-track",
      "title": "Sonic Track",
      "year": 2023,
      "description": "Composición de acción para plataformer 2D. Inspirada en la velocidad y el color.",
      "tags": ["Electronic", "Acción", "Platformer"],
      "cover": {
        "publicId": "clients/ingenier0espacial/projects/videogames/sonic-track-cover",
        "alt": "Portada de Sonic Track",
        "width": 600,
        "height": 400
      },
      "audio": [
        {
          "id": "sonic-track-main",
          "title": "Sonic Track",
          "duration": "2:18",
          "audioPublicId": "clients/ingenier0espacial/audio/sonic-track",
          "tags": ["Electronic", "Fast"]
        }
      ],
      "status": "released"
    }
  ]
}
```

*(foley.json y projects.json siguen el mismo patrón — omitidos aquí por brevedad, sus TypeScript interfaces están en types/content.ts)*

---

## 7. about.json

```typescript
interface AboutContent {
  meta: PageMeta
  hero: {
    eyebrow: string
    headline: string
    image: CloudinaryAsset
  }
  bio: {
    intro: string
    paragraphs: string[]
    quote?: string
  }
  highlights: HighlightItem[]
  timeline?: TimelineEvent[]
  skills: SkillCategory[]
}

interface HighlightItem {
  value: string     // "8+" 
  label: string     // "años de experiencia"
}

interface SkillCategory {
  category: string
  items: string[]
}
```

```json
{
  "meta": {
    "title": "Acerca de Víctor Manuel",
    "description": "Compositor y productor musical originario de Querétaro, México."
  },
  "hero": {
    "eyebrow": "Sobre mí",
    "headline": "Un mundo\nconstruido en sonidos",
    "image": {
      "publicId": "clients/ingenier0espacial/avatar/victor-about",
      "alt": "Víctor Manuel Canchola en su estudio",
      "width": 600,
      "height": 800
    }
  },
  "bio": {
    "intro": "Soy Víctor Manuel Canchola Cervantes, productor musical y compositor originario de Querétaro, México.",
    "paragraphs": [
      "Me especializo en la creación y producción de música para medios audiovisuales: videojuegos, animación y cortometrajes.",
      "Soy fundador de la banda Juliette!, donde fusionamos el rock alternativo con influencias del rock japonés, el bossa nova y el sonido latino.",
      "Mi proceso de trabajo combina la precisión técnica de la producción digital con la calidez y textura del trabajo análogico."
    ],
    "quote": "El sonido no acompaña a la imagen: la termina."
  },
  "highlights": [
    { "value": "5+", "label": "años de experiencia" },
    { "value": "20+", "label": "proyectos completados" },
    { "value": "3", "label": "áreas de especialidad" }
  ],
  "skills": [
    {
      "category": "Composición",
      "items": ["Orquestal", "Electronic", "Ambient", "Rock", "Jazz/Bossa Nova"]
    },
    {
      "category": "Producción",
      "items": ["DAW (Logic Pro, Ableton)", "Mezcla", "Masterización", "Grabación"]
    },
    {
      "category": "Game Audio",
      "items": ["FMOD", "Wwise", "Unity Audio", "Diseño Adaptativo"]
    },
    {
      "category": "Post-Producción",
      "items": ["Foley", "Diseño Sonoro", "SFX", "Ambientes"]
    }
  ]
}
```

---

## 8. contact.json

```typescript
interface ContactContent {
  meta: PageMeta
  hero: {
    eyebrow: string
    headline: string
    description: string
  }
  methods: ContactMethod[]
  form: {
    enabled: boolean
    provider: "formspree" | "workers"
    endpoint: string    // Formspree ID o Workers URL
    fields: FormField[]
    successMessage: string
    errorMessage: string
  }
}

interface ContactMethod {
  id: string
  type: "whatsapp" | "email" | "social"
  label: string
  value: string       // Número, email, o URL
  href: string        // href completo
  cta: string         // "Escribir mensaje", "Enviar email"
  primary?: boolean
}

interface FormField {
  name: string
  type: "text" | "email" | "textarea" | "select"
  label: string
  placeholder: string
  required: boolean
  options?: string[]  // Para select
}
```

```json
{
  "meta": {
    "title": "Contacto",
    "description": "Hablemos sobre tu proyecto. Composición para videojuegos, foley o producción musical."
  },
  "hero": {
    "eyebrow": "Hablemos",
    "headline": "¿Tienes un\nmundo por sonorizar?",
    "description": "Cuéntame sobre tu proyecto. Respondo en menos de 24 horas."
  },
  "methods": [
    {
      "id": "whatsapp",
      "type": "whatsapp",
      "label": "WhatsApp",
      "value": "+52 443 242 3432",
      "href": "https://wa.me/5244324234?text=Hola%2C%20me%20gustar%C3%ADa%20tener%20m%C3%A1s%20informaci%C3%B3n%20de%20tu%20trabajo",
      "cta": "Escribir por WhatsApp",
      "primary": true
    },
    {
      "id": "instagram",
      "type": "social",
      "label": "Instagram",
      "value": "@ingenier0espacial",
      "href": "https://www.instagram.com/ingenier0espacial/",
      "cta": "Mensaje en Instagram"
    }
  ],
  "form": {
    "enabled": true,
    "provider": "formspree",
    "endpoint": "REEMPLAZAR_CON_FORMSPREE_ID",
    "fields": [
      {
        "name": "name",
        "type": "text",
        "label": "Nombre",
        "placeholder": "Tu nombre",
        "required": true
      },
      {
        "name": "email",
        "type": "email",
        "label": "Correo electrónico",
        "placeholder": "tu@email.com",
        "required": true
      },
      {
        "name": "projectType",
        "type": "select",
        "label": "Tipo de proyecto",
        "placeholder": "Selecciona una opción",
        "required": true,
        "options": [
          "Composición para Videojuego",
          "Foley / Diseño Sonoro",
          "Producción Musical",
          "Arreglos",
          "Otro"
        ]
      },
      {
        "name": "message",
        "type": "textarea",
        "label": "Cuéntame de tu proyecto",
        "placeholder": "¿En qué consiste tu proyecto? ¿Cuál es el plazo? ¿Tienes referencias?",
        "required": true
      }
    ],
    "successMessage": "¡Mensaje enviado! Te respondo en menos de 24 horas.",
    "errorMessage": "Hubo un error. Por favor intenta por WhatsApp."
  }
}
```

---

## 9. TypeScript — Archivo de Tipos Centralizado

```typescript
// src/types/content.ts

export interface CloudinaryAsset {
  publicId: string
  alt: string
  width: number
  height: number
}

export interface AudioTrack {
  id: string
  title: string
  duration: string
  audioPublicId: string
  waveformPublicId?: string
  tags?: string[]
}

export interface PageMeta {
  title: string
  description: string
  ogImage?: string
}

export interface NavItem {
  id: string
  label: string
  path: string
  iconName: string
  accentColor?: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
  ariaLabel: string
}

export type ContentKey =
  | 'meta'
  | 'navigation'
  | 'hero'
  | 'services'
  | 'videogames'
  | 'foley'
  | 'projects'
  | 'about'
  | 'contact'

// ContentContext tipado
export interface ContentStore {
  meta: MetaConfig
  navigation: NavigationConfig
  hero: HeroContent
  services: ServicesContent
  videogames: VideoGamesContent
  foley: FoleyContent
  projects: ProjectsContent
  about: AboutContent
  contact: ContactContent
}
```

---

## Validación de Tipos en Build

Los archivos JSON se validan automáticamente contra los tipos TypeScript usando `zod` o `ts-json-schema-generator` como parte del build. Si un JSON no cumple el schema, el build falla con un error descriptivo.

```typescript
// src/lib/contentValidator.ts
import { z } from 'zod'

export const heroSchema = z.object({
  eyebrow: z.string(),
  headline: z.string(),
  typewriter: z.array(z.string()).min(2),
  ctas: z.array(z.object({
    label: z.string(),
    href: z.string(),
    variant: z.enum(['primary', 'secondary'])
  }))
  // ...
})
```

Este paso de validación garantiza que cuando otro developer edita un JSON, un error tipográfico o un campo faltante se detecta antes de llegar a producción.
