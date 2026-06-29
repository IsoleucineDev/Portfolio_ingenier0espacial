# ARCHITECTURE.md
## Arquitectura Técnica — Portfolio Víctor Manuel Canchola

---

## 1. Visión General

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLOUDFLARE PAGES                        │
│                         (Static SPA)                            │
│                                                                 │
│   ┌───────────────┐    ┌──────────────┐    ┌─────────────────┐ │
│   │  React + Vite │    │  React Router│    │ Framer Motion   │ │
│   │  TypeScript   │◄──►│     v6       │◄──►│    GSAP         │ │
│   │  Tailwind CSS │    │  SPA Routing │    │  Animations     │ │
│   └───────────────┘    └──────────────┘    └─────────────────┘ │
│                                                                 │
│   ┌───────────────────────────────────────────────────────────┐ │
│   │                   DATA LAYER                              │ │
│   │  /src/clients/{CLIENT_ID}/                                │ │
│   │  ├── theme.json      (tokens de diseño)                   │ │
│   │  └── content/        (todo el contenido editable)         │ │
│   └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
              │                           │
              ▼                           ▼
     ┌─────────────────┐      ┌──────────────────────┐
     │    CLOUDINARY   │      │   CLOUDFLARE WORKERS  │
     │  (Media CDN)    │      │   (Contact Form)      │
     │  Images, Audio  │      │   (Optional)          │
     └─────────────────┘      └──────────────────────┘
```

---

## 2. Stack Tecnológico

### Core

| Tecnología | Versión | Razón |
|-----------|---------|-------|
| React | 19.x | Ecosistema, hooks modernos, concurrent features |
| Vite | 6.x | Build ultra-rápido, HMR, plugin ecosystem |
| TypeScript | 5.7+ | Tipado estricto, DX superior |
| Tailwind CSS | 4.x | Utility-first con CSS Variables nativas |
| React Router | 6.x | SPA routing, layouts anidados |

### Animaciones

| Tecnología | Uso |
|-----------|-----|
| Framer Motion 12.x | Animaciones de UI, page transitions, reveals, gestures |
| GSAP 3.x | Únicamente para ScrollTrigger en secciones con narrativa de scroll compleja |

**Regla de GSAP:** Solo se importa en componentes específicos que lo necesitan (code split). No se instala globalmente. Si Framer Motion puede hacerlo, Framer Motion lo hace.

### Media & Contenido

| Servicio | Uso |
|---------|-----|
| Cloudinary | Todas las imágenes y assets de audio (CDN, transformaciones) |
| SoundCloud (oEmbed) | Embeds opcionales para tracks publicados |
| Howler.js | Reproductor de audio custom sobre archivos de Cloudinary |

### Deploy & Infra

| Servicio | Uso |
|---------|-----|
| Cloudflare Pages | Hosting estático + CDN global |
| Cloudflare Workers | Formulario de contacto (si se necesita backend) |
| GitHub | Repositorio + CI/CD con GitHub Actions |

---

## 3. Estructura de Carpetas

```
Portfolio_ingenier0espacial/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── _redirects              ← Cloudflare Pages SPA routing
│
├── src/
│   ├── clients/                ← CAPA MULTI-TENANT (nunca toca código)
│   │   └── ingenier0espacial/
│   │       ├── theme.json      ← tokens de diseño (colores, fonts, radii)
│   │       └── content/
│   │           ├── meta.json       ← SEO: title, description, OG
│   │           ├── hero.json       ← Sección hero
│   │           ├── services.json   ← Las 3 especialidades
│   │           ├── videogames.json ← Portfolio videojuegos
│   │           ├── foley.json      ← Portfolio foley
│   │           ├── projects.json   ← Proyectos alternativos + banda
│   │           ├── about.json      ← Bio y foto
│   │           ├── contact.json    ← Datos de contacto
│   │           └── navigation.json ← Items de navegación
│   │
│   ├── components/             ← Componentes reutilizables (sin lógica de cliente)
│   │   ├── ui/                 ← Átomos — Button, Tag, Badge, Icon
│   │   ├── sections/           ← Secciones de página (Hero, Services, etc.)
│   │   ├── layout/             ← Layout, FloatingNav, PageWrapper
│   │   ├── player/             ← AudioPlayer components
│   │   └── effects/            ← Blob, NoiseOverlay, TornEdge, CustomCursor
│   │
│   ├── context/
│   │   ├── ThemeContext.tsx     ← Carga theme.json y aplica CSS vars
│   │   ├── AudioContext.tsx     ← Estado global del reproductor
│   │   └── ContentContext.tsx   ← Carga y provee los JSON de contenido
│   │
│   ├── hooks/
│   │   ├── useReducedMotion.ts
│   │   ├── useScrollProgress.ts
│   │   ├── useInView.ts
│   │   ├── useAudio.ts
│   │   └── useClientContent.ts  ← Lee contenido del cliente activo
│   │
│   ├── lib/
│   │   ├── cloudinary.ts       ← Helpers para URLs de Cloudinary
│   │   ├── theme.ts            ← Aplicador de CSS custom properties
│   │   ├── seo.ts              ← Helpers para meta tags
│   │   └── analytics.ts        ← Cloudflare Web Analytics (opcional)
│   │
│   ├── types/
│   │   ├── content.ts          ← Interfaces de todos los JSON de contenido
│   │   ├── theme.ts            ← Interface de theme.json
│   │   └── cloudinary.ts       ← Types para assets de Cloudinary
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── VideoGames.tsx
│   │   ├── Foley.tsx
│   │   ├── Projects.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx
│   │
│   ├── router/
│   │   └── index.tsx           ← Definición de rutas + lazy loading
│   │
│   ├── App.tsx                 ← Root: ThemeProvider > ContentProvider > Router
│   ├── main.tsx                ← Entry point
│   └── index.css               ← Base styles, CSS custom properties defaults
│
├── .env.local                  ← VITE_CLIENT_ID, VITE_CLOUDINARY_CLOUD_NAME
├── .env.example
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.node.json
└── wrangler.toml               ← Cloudflare Pages config
```

---

## 4. Sistema Multi-Tenant

### Variable de Entorno

```env
VITE_CLIENT_ID=ingenier0espacial
VITE_CLOUDINARY_CLOUD_NAME=tu-cloud-name
```

### Flujo de Carga de Tema

```
main.tsx
  └── App.tsx
        └── ThemeProvider
              ├── Lee: /src/clients/{VITE_CLIENT_ID}/theme.json
              ├── Aplica CSS custom properties en <html>
              ├── Carga Google Fonts del theme
              └── Renderiza children
```

### Flujo de Carga de Contenido

```
ContentProvider (wraps toda la app)
  ├── Lee todos los JSON de /clients/{CLIENT_ID}/content/
  ├── Los valida contra las interfaces TypeScript
  ├── Los expone via useContent() hook
  └── Cada página/sección solo importa lo que necesita:
        const { hero } = useContent<HeroContent>('hero')
```

### Cambio de Cliente

Para lanzar el mismo sitio para un nuevo músico:

1. Crear `/src/clients/nuevo-artista/` con los mismos archivos JSON
2. Cambiar `VITE_CLIENT_ID=nuevo-artista` en Cloudflare Pages
3. Redeploy → el sitio es del nuevo artista

**Zero cambios en código.**

---

## 5. Routing

### Rutas

```typescript
const routes = [
  { path: "/",           component: Home,       title: "Inicio" },
  { path: "/videogames", component: VideoGames, title: "Videojuegos" },
  { path: "/foley",      component: Foley,      title: "Foley" },
  { path: "/projects",   component: Projects,   title: "Proyectos" },
  { path: "/about",      component: About,      title: "Acerca de" },
  { path: "/contact",    component: Contact,    title: "Contacto" },
  { path: "*",           component: NotFound,   title: "404" },
]
```

Todas las rutas usan `React.lazy()` + `<Suspense>` para code splitting automático.

### Cloudflare Pages SPA Routing

El archivo `public/_redirects` redirige todas las rutas al index:

```
/*  /index.html  200
```

### Scroll Restoration

`useScrollRestoration` hook que guarda la posición por ruta y la restaura al navegar atrás.

---

## 6. Capa de Medios — Cloudinary

### Estructura de Assets

```
cloudinary/{cloud-name}/
└── clients/
    └── ingenier0espacial/
        ├── avatar/
        │   └── victor-profile.jpg
        ├── projects/
        │   ├── videogames/
        │   │   ├── epilogo-cover.jpg
        │   │   └── ...
        │   ├── foley/
        │   │   └── ...
        │   └── band/
        │       └── juliette-band.jpg
        ├── textures/
        │   └── noise.svg
        └── ui/
            └── hero-collage.png
```

### Helper de URL

```typescript
// src/lib/cloudinary.ts

const CLOUD = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

export function cldUrl(
  publicId: string,
  opts: {
    width?: number
    height?: number
    quality?: number | 'auto'
    format?: 'auto' | 'webp' | 'avif'
    crop?: 'fill' | 'limit' | 'thumb'
    blur?: number
  } = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'limit',
    blur
  } = opts

  const transforms = [
    `q_${quality}`,
    `f_${format}`,
    crop && `c_${crop}`,
    width && `w_${width}`,
    height && `h_${height}`,
    blur && `e_blur:${blur}`
  ].filter(Boolean).join(',')

  return `https://res.cloudinary.com/${CLOUD}/image/upload/${transforms}/${publicId}`
}

// Para audio
export function cldAudioUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/${publicId}`
}
```

### Imagen Responsiva con Blur Placeholder

```typescript
// src/components/ui/CloudinaryImage.tsx
// Genera srcSet automático + placeholder blur desde Cloudinary
```

---

## 7. Reproductor de Audio

### Arquitectura del Reproductor

```
AudioContext (global state)
├── currentTrack: Track | null
├── isPlaying: boolean
├── playlist: Track[]
├── volume: number
└── methods: play(), pause(), next(), prev(), seek()

AudioPlayerMini (UI flotante, siempre visible)
├── Lee desde AudioContext
└── Muestra track actual + controles básicos

AudioPlayer (UI completa, dentro de páginas de portfolio)
├── Lee y escribe AudioContext
├── Lista de reproducción
└── Visualizador de onda (Canvas API)

Howler.js (engine de audio, invisible)
├── Carga archivos desde Cloudinary URLs
├── Decodifica y reproduce
└── Emite eventos al AudioContext
```

### Fallback SoundCloud

Si una pista no tiene archivo en Cloudinary (solo URL de SoundCloud), el reproductor muestra el iframe embed en lugar del reproductor custom. Esto es transparente para el usuario.

---

## 8. Formulario de Contacto

### Opción A — Formspree (recomendado para lanzamiento rápido)

```typescript
// POST a https://formspree.io/f/{form-id}
// Sin código de servidor
// Email a Víctor automáticamente
```

### Opción B — Cloudflare Workers (control total)

```typescript
// /functions/contact.ts (Cloudflare Pages Function)
// Validación server-side
// Rate limiting
// Integración directa a email o Discord webhook
```

La opción queda como variable de configuración en `content/contact.json`.

---

## 9. SEO & Performance

### Meta Tags

Cada ruta tiene sus propios meta tags definidos en los JSON de contenido. El componente `<PageMeta>` los aplica usando `react-helmet-async`.

```typescript
// Ejemplo: /videogames
{
  "title": "Composición para Videojuegos | Víctor Manuel Canchola",
  "description": "Compositor y productor musical especializado...",
  "og:image": "cloudinary/url-de-imagen-de-la-seccion"
}
```

### Structured Data JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Víctor Manuel Canchola Cervantes",
  "jobTitle": "Compositor y Productor Musical",
  "url": "https://ingenier0espacial.com",
  "sameAs": ["spotify-url", "soundcloud-url", "youtube-url"]
}
```

### Core Web Vitals Strategy

| Métrica | Target | Estrategia |
|---------|--------|-----------|
| LCP | < 2.0s | Hero image preloaded desde Cloudinary WebP, prioridad crítica |
| CLS | < 0.05 | Todos los elementos con dimensiones definidas antes de carga |
| INP | < 150ms | No blocking JS, animaciones en compositor (GPU) |
| FCP | < 1.2s | Critical CSS inlined, fonts preloaded |

### Code Splitting

```
Bundle principal: ~80KB (React + Router + contextos)
Por ruta:
  /            ~60KB (Hero, Services)
  /videogames  ~45KB + Howler.js ~25KB
  /foley       ~40KB
  /projects    ~35KB
  /about       ~30KB
  /contact     ~25KB
```

---

## 10. CI/CD

```yaml
# .github/workflows/ci.yml
on: [push, pull_request]

jobs:
  quality:
    steps:
      - type-check (tsc --noEmit)
      - lint (eslint)
      - build (vite build)

  lighthouse:
    # Solo en push a main
    steps:
      - Deploy preview a Cloudflare Pages
      - Correr Lighthouse CI
      - Fallar si score < 90
```

### Deploy Automático

Cloudflare Pages detecta pushes a `main` y despliega automáticamente. Cada PR genera un preview URL.

---

## 11. Variables de Entorno

```env
# .env.example

# Cliente activo — cambia el tema y contenido
VITE_CLIENT_ID=ingenier0espacial

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=

# Formulario de contacto (si se usa Formspree)
VITE_FORMSPREE_ID=

# Analytics (opcional)
VITE_CF_ANALYTICS_TOKEN=
```

---

## 12. Configuración de Cloudflare Pages

```toml
# wrangler.toml
name = "portfolio-ingenier0espacial"
compatibility_date = "2024-01-01"

[build]
command = "npm run build"
directory = "dist"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

### Headers de Cache

```
# public/_headers
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable

/*.json
  Cache-Control: public, max-age=3600
```

---

## 13. Decisiones de Diseño Técnico

### ¿Por qué Vite sobre Next.js?

Next.js en Cloudflare Pages requiere `@cloudflare/next-on-pages` con limitaciones. Vite produce un SPA estático perfectamente compatible con Cloudflare Pages sin adaptadores ni edge functions. Para un portfolio sin SSR real, Vite es la elección correcta.

### ¿Por qué React Router sobre file-based routing?

El sistema multi-tenant requiere que las rutas puedan ser configuradas desde JSON en el futuro. React Router v6 con layouts anidados da más control que un sistema file-based.

### ¿Por qué no usar un CMS?

El perfil del cliente (músico independiente) hace que un CMS sea overhead. Los JSON editables directamente en GitHub son suficientes para el volumen de contenido. Si el cliente necesita edición visual en el futuro, se puede conectar Tina CMS o Contentlayer sin cambiar la arquitectura.

### ¿Por qué Howler.js y no la Web Audio API directa?

Howler abstrae los formatos de audio, el buffering, y los eventos de una manera que es consistente en todos los browsers modernos. Agrega ~25KB pero ahorra semanas de trabajo en edge cases de audio.
