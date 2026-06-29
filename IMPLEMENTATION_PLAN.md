# IMPLEMENTATION_PLAN.md
## Plan de Implementación — Portfolio Víctor Manuel Canchola
**Objetivo:** Pasar del prototipo Next.js al sitio de producción en Vite.

---

## Reglas del Plan

1. **Cero código hardcodeado:** Ningún string de contenido en componentes. Todo desde JSON.
2. **Mobile-first:** Cada componente se construye primero para 375px.
3. **Lighthouse desde el día 1:** Cada fase se verifica con Lighthouse antes de continuar.
4. **Accesibilidad no es opcional:** `aria-label`, roles, focus management en cada componente nuevo.
5. **TypeScript estricto:** No hay `any`. Si el tipo es desconocido, se define antes de usarlo.
6. **Sin premature abstraction:** Si solo hay un uso, no se abstrae.

---

## Paso 0 — Preparación del Repositorio

### 0.1 — Limpiar el proyecto actual
**Archivos a eliminar del repo actual (Next.js):**
- Toda la carpeta `/app`
- Toda la carpeta `/components` (los componentes se reconstruyen desde cero)
- `/data.tsx`, `/utils/`, `next.config.ts`, `next-env.d.ts`
- `postcss.config.js` (se recrea para Vite)
- `eslint.config.mjs` (se recrea)
- `tailwind.config.js` (se recrea en `.ts`)
- `package.json`, `package-lock.json` (se recrea)
- `tsconfig.json` (se recrea para Vite)
- `public/next.svg`, `public/vercel.svg` (assets de template)
- `components/constraints.txt` (archivo de Python del sistema)

**Archivos a CONSERVAR:**
- `public/avatar_profile.png` (se sube a Cloudinary, luego se elimina del repo)
- `README.md` (se actualiza)
- `.gitignore` (se actualiza)
- `PROJECT_ANALYSIS.md`, `ROADMAP.md`, `ARCHITECTURE.md`, etc. (documentación)

### 0.2 — Inicializar nuevo proyecto Vite
```bash
# En /home/isoleucine/Desktop/Ingenier0espacial/Portfolio_ingenier0espacial/
npm create vite@latest . -- --template react-ts
```

**No sobreescribir:** Los archivos `.md` de documentación.

### 0.3 — Instalar dependencias
```bash
# Core
npm install react-router-dom@6

# Animaciones
npm install framer-motion
npm install gsap          # Solo si se necesita ScrollTrigger

# Audio
npm install howler
npm install @types/howler -D

# UI
npm install lucide-react
npm install react-icons    # Para Spotify, SoundCloud, etc.
npm install react-type-animation
npm install react-helmet-async   # Meta tags

# Validación
npm install zod

# Tailwind
npm install -D tailwindcss@4 @tailwindcss/vite
# (Tailwind v4 usa @tailwindcss/vite, no postcss plugin)

# Dev tools
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D eslint-plugin-react-hooks eslint-plugin-jsx-a11y
npm install -D prettier
npm install -D vite-plugin-svgr   # SVG como componentes
```

### 0.4 — Configurar Vite
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: { '@': resolve(__dirname, './src') }
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'audio-vendor': ['howler'],
        }
      }
    }
  }
})
```

### 0.5 — Configurar TypeScript
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 0.6 — Configurar Tailwind CSS v4

Tailwind v4 usa CSS nativo para la configuración:

```css
/* src/index.css */
@import "tailwindcss";

/* Design tokens como CSS custom properties */
:root {
  /* Se sobreescriben por ThemeProvider desde theme.json */
  --color-bg-primary: #F9F4EE;
  --color-bg-secondary: #F0E8DC;
  /* ... resto de tokens */
}

@theme {
  /* Tailwind lee estas variables para generar las clases */
  --color-bg-primary: var(--color-bg-primary);
  --color-bg-secondary: var(--color-bg-secondary);
  --color-sage: var(--color-sage);
  --color-rust: var(--color-rust);
  /* ... */
  
  --font-display: var(--font-display);
  --font-body: var(--font-body);
  --font-mono: var(--font-mono);
  
  --breakpoint-xs: 375px;
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

### 0.7 — Configurar Cloudflare Pages

```
# public/_redirects
/*  /index.html  200
```

```toml
# wrangler.toml
name = "portfolio-ingenier0espacial"
compatibility_date = "2024-01-01"

[build]
command = "npm run build"
directory = "dist"
```

### 0.8 — Variables de entorno

```env
# .env.local
VITE_CLIENT_ID=ingenier0espacial
VITE_CLOUDINARY_CLOUD_NAME=tu-cloud-name
VITE_FORMSPREE_ID=
```

```env
# .env.example (committed al repo)
VITE_CLIENT_ID=ingenier0espacial
VITE_CLOUDINARY_CLOUD_NAME=
VITE_FORMSPREE_ID=
```

### 0.9 — Crear estructura de carpetas

```bash
mkdir -p src/{clients/ingenier0espacial/content,components/{ui,sections,layout,player,effects},context,hooks,lib,types,pages,router}
```

**Verificación de Fase 0:**
- [ ] `npm run dev` sin errores
- [ ] TypeScript sin errores (`npm run tsc`)
- [ ] `npm run build` exitoso
- [ ] `dist/index.html` generado

---

## Paso 1 — Sistema de Tipos y Datos

### 1.1 — Tipos TypeScript

Crear `/src/types/content.ts`, `/src/types/theme.ts`, `/src/types/cloudinary.ts` con todas las interfaces definidas en `CONTENT_SCHEMA.md`.

### 1.2 — Schemas Zod

Crear `/src/lib/schemas.ts` con schemas Zod para cada interface de contenido. Estos se usan en desarrollo para validar los JSON.

### 1.3 — Crear los archivos JSON

Crear todos los archivos JSON en `/src/clients/ingenier0espacial/` con el contenido real de Víctor según `CONTENT_SCHEMA.md`.

**Nota:** Las URLs de Cloudinary en los JSON inicialmente apuntarán a URLs temporales hasta que se suban los assets.

### 1.4 — Utilidades

Crear:
- `/src/lib/cloudinary.ts` — `cldUrl()` y `cldAudioUrl()`
- `/src/lib/theme.ts` — `applyTheme()`
- `/src/lib/seo.ts` — helpers de meta tags

### 1.5 — Contexts

Crear en orden:
1. `ThemeContext.tsx`
2. `ContentContext.tsx`
3. `AudioContext.tsx`

### 1.6 — Hooks

Crear:
- `useReducedMotion.ts`
- `useIsTouch.ts`
- `useInView.ts`
- `useScrollProgress.ts`
- `useContent.ts`
- `useAudio.ts`

**Verificación de Paso 1:**
- [ ] Todos los tipos compilando sin errores
- [ ] ContentProvider carga los JSON y los expone
- [ ] ThemeProvider aplica CSS vars en el DOM
- [ ] `useContent('hero')` retorna el tipo correcto

---

## Paso 2 — Routing y Layout Global

### 2.1 — Router

Crear `/src/router/index.tsx` con React Router v6:
- Definir rutas con `React.lazy()`
- `<Suspense>` con fallback de loading

### 2.2 — App.tsx

```
ThemeProvider
  └── ContentProvider
        └── AudioProvider
              └── HelmetProvider (react-helmet-async)
                    └── BrowserRouter
                          └── AppShell
                                └── Routes
```

### 2.3 — AppShell

Componente que monta:
- `FloatingNav`
- `AudioPlayerMini`
- `CustomCursor` (solo en no-touch)
- `NoiseOverlay` (si theme.noise === true)
- `AnimatePresence` wrapper para page transitions

### 2.4 — FloatingNav

**Este componente es crítico para la experiencia.** Especificaciones:
- Pill redondeada, fondo semitransparente con backdrop-blur
- 6 ítems: íconos + labels que aparecen en hover
- Item activo: fondo del color de acento de la ruta
- En móvil (< 640px): sin labels, íconos más pequeños
- Animación de entrada: `y: 100 → 0` con spring
- Hide/show en scroll: usa `useScrollProgress`

### 2.5 — PageTransition

Animación de transición entre páginas:
- Cortina que baja y sube (tipo "wipe")
- Color variable según la ruta de destino
- Duración: 600ms
- Framer Motion `AnimatePresence`

### 2.6 — Páginas vacías (scaffolding)

Crear cada page como placeholder para verificar el routing.

**Verificación de Paso 2:**
- [ ] Todas las rutas navegan correctamente
- [ ] FloatingNav indica la ruta activa
- [ ] PageTransition visible al navegar
- [ ] AudioPlayerMini montado (sin audio todavía)
- [ ] Lighthouse: FCP < 1.5s en build de producción

---

## Paso 3 — Componentes UI Base

Construir todos los átomos antes de los organismos. En este orden:

### 3.1 — Button
- Variantes: primary, secondary, ghost
- Tamaños: sm, md, lg
- Estados: hover, active, disabled, loading
- Soporta href (interno con Link, externo con `<a>`)

### 3.2 — CloudinaryImage
- Genera srcSet automáticamente
- blur placeholder desde Cloudinary
- priority prop para preload
- Lazy loading por defecto

### 3.3 — Tag + TagList

### 3.4 — SectionHeader
- Eyebrow + Headline + Description
- Animación de entrada con `useInView`

### 3.5 — RevealText
- Animación de texto por palabras/chars/líneas
- `prefers-reduced-motion` → fade simple

### 3.6 — OrganicBlob
- div con borderRadius morphing
- Props: color, size, animated, opacity

### 3.7 — OrganicDivider (TornEdge)
- SVG de borde irregular
- 4 variantes

### 3.8 — PlayButton
- Ícono animado entre ▶ y ⏸

**Verificación de Paso 3:**
- [ ] Cada átomo renderiza correctamente
- [ ] Estados hover/focus visibles (a11y)
- [ ] CloudinaryImage genera URLs correctas
- [ ] Sin errores TypeScript

---

## Paso 4 — Sección Hero (Home)

La sección más importante del sitio. Requiere el mayor cuidado.

### 4.1 — Estructura del Layout Hero

Grid asimétrico 7/5. En móvil: visual arriba, texto abajo.

### 4.2 — Animaciones de Entrada

Secuencia de animaciones de entrada al cargar la página:
1. `t=0`: Eyebrow fade-in
2. `t=0.2`: Headline reveal por líneas
3. `t=0.6`: TypewriterEffect comienza
4. `t=0.8`: Description fade-up
5. `t=1.0`: CTAs scale-in
6. `t=0.3`: HeroVisual imagen fade-in

### 4.3 — TypewriterEffect

Integrar `react-type-animation` con las `typewriter[]` del JSON. Cursor personalizado que usa el color sage.

### 4.4 — HeroVisual

Composición de:
- Imagen principal (CloudinaryImage con priority=true)
- 2 OrganicBlobs detrás de la imagen
- Decorative textures encima (si existen en el JSON)

### 4.5 — HeroBadge

Pill con punto pulsante verde → "Disponible para proyectos"

**Verificación de Paso 4:**
- [ ] Hero se ve bien en 375px y 1280px
- [ ] LCP < 2.0s (imagen con priority=true)
- [ ] Animaciones de entrada fluidas
- [ ] `prefers-reduced-motion` respetado

---

## Paso 5 — Secciones Home Restantes

### 5.1 — ServicesSection

Cards de servicios con hover state. En móvil: scroll horizontal.

Cada card lleva a su sección correspondiente con `Link`.

### 5.2 — FeaturedWorkSection

1-2 proyectos destacados con preview de audio. Botón de play activa `AudioContext`.

### 5.3 — HomeCTASection

CTA grande hacia `/contact` o WhatsApp directo.

**Verificación de Paso 5:**
- [ ] Home page completa y responsiva
- [ ] Lighthouse Home: ≥ 90 en todas las métricas
- [ ] Sin CLS (todas las imágenes con dimensiones)

---

## Paso 6 — Reproductor de Audio

El reproductor es una pieza central del portfolio.

### 6.1 — AudioProvider con Howler.js

- Cargar Howler lazy (solo cuando se reproduce por primera vez)
- Bind de eventos: play, pause, end, seek
- Manejo de errores de carga

### 6.2 — AudioPlayerMini

- Estado collapsed: solo ícono de play
- Estado expanded: track info + controles básicos + progress bar
- Animación: Framer Motion `layout` para el expand/collapse
- Posición: fixed bottom-right, encima del FloatingNav

### 6.3 — AudioPlayer (Full)

Para las páginas de portfolio. Incluye:
- Lista de reproducción
- Seek bar interactiva
- Control de volumen
- Visualizador de onda (imagen de Cloudinary)

### 6.4 — Integración con PlayButton

`ProjectCard` → click en PlayButton → `useAudio().actions.play(track)` → `AudioPlayerMini` se actualiza

**Verificación de Paso 6:**
- [ ] Audio reproduce correctamente desde Cloudinary
- [ ] AudioPlayerMini visible y funcional
- [ ] Skip, seek, volumen funcionan
- [ ] Sin memory leaks (cleanup de Howler en unmount)

---

## Paso 7 — Páginas de Portfolio

### 7.1 — /videogames

- PageHero con identidad visual "sky"
- ProjectGrid con filtro por tags
- Proyectos cargados desde `videogames.json`

### 7.2 — /foley

- PageHero con identidad visual "rust"
- FoleyShowcase (layout diferente a videogames — más editorial)
- Timeline o grid narrativo

### 7.3 — /projects

- PageHero con identidad visual "lavender"
- BandSection (Juliette! con Spotify embed)
- AlternativeProjectsSection

**Verificación de Paso 7:**
- [ ] Las 3 páginas se ven correctamente
- [ ] Filtros de tags funcionan
- [ ] Audio reproduce desde cada ProjectCard
- [ ] Transitions entre páginas fluidas

---

## Paso 8 — About & Contact

### 8.1 — /about

- Bio narrativa desde `about.json`
- Foto de Cloudinary
- Skills grid
- Highlights (años de experiencia, etc.)

### 8.2 — /contact

- Métodos de contacto desde `contact.json`
- Formulario con Formspree
- Validación client-side
- Estados: idle, loading, success, error
- WhatsApp CTA como método principal

**Verificación de Paso 8:**
- [ ] Formulario envía correctamente
- [ ] WhatsApp link lleva al número correcto
- [ ] About page tiene todas las secciones del JSON

---

## Paso 9 — SEO & Meta Tags

### 9.1 — react-helmet-async setup

Configurar en `App.tsx` con `HelmetProvider`.

### 9.2 — PageMeta componente

Lee `meta.json` y los meta de cada página del JSON. Aplica con `<Helmet>`.

### 9.3 — JSON-LD

Agregar en el layout la structured data de Person + MusicGroup desde `meta.json`.

### 9.4 — sitemap.xml

Script de generación de sitemap en build:
```bash
# package.json scripts
"build": "vite build && node scripts/generate-sitemap.js"
```

### 9.5 — robots.txt y favicons

---

## Paso 10 — Optimización de Performance

### 10.1 — Análisis de Bundle

```bash
npm install -D rollup-plugin-visualizer
```

Identificar y eliminar imports innecesarios.

### 10.2 — Auditoría de Imágenes

- Verificar que todas las imágenes de Cloudinary usan `f_auto,q_auto`
- Verificar que hero image tiene `priority=true`
- Verificar que todas las imágenes tienen `width` y `height` definidos (anti-CLS)

### 10.3 — Font Loading

```html
<!-- En index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

Las fonts del cliente se precargan desde ThemeProvider con `link[rel="preload"]`.

### 10.4 — Critical CSS

Vite inline el CSS crítico automáticamente. Verificar que no hay CSS bloqueante.

### 10.5 — Lighthouse Audit

Correr Lighthouse en:
- Home page
- /videogames
- /foley
- /projects
- /about
- /contact

**Target:** ≥ 95 en Performance, Accessibility, Best Practices, SEO.

**Verificación de Paso 10:**
- [ ] Lighthouse ≥ 95 en todas las páginas y métricas
- [ ] Sin warnings de accesibilidad
- [ ] Bundle principal < 100KB gzipped
- [ ] LCP < 2.0s
- [ ] CLS < 0.05

---

## Paso 11 — Subir Assets a Cloudinary

### 11.1 — Preparar assets

Recopilar:
- Foto de perfil de Víctor (alta calidad, mínimo 1200x1400px)
- Fotos de proyectos
- Fotos de la banda Juliette!
- Archivos de audio para el reproductor custom

### 11.2 — Estructura en Cloudinary

Seguir la estructura definida en `ARCHITECTURE.md` sección 6.

### 11.3 — Actualizar JSON

Actualizar los `publicId` en los JSON de contenido con los assets reales de Cloudinary.

### 11.4 — Eliminar assets del repo

Después de subir a Cloudinary, eliminar del `public/`:
- `avatar_profile.png` (ya no se sirve desde el repo)

---

## Paso 12 — Deploy en Cloudflare Pages

### 12.1 — Crear proyecto en Cloudflare Pages

1. Conectar repositorio GitHub
2. Build command: `npm run build`
3. Build output: `dist`
4. Variables de entorno: `VITE_CLIENT_ID`, `VITE_CLOUDINARY_CLOUD_NAME`

### 12.2 — Configurar dominio personalizado

Agregar dominio del cliente en Cloudflare Pages.

### 12.3 — Cache Headers

Configurar en `public/_headers` para assets estáticos.

### 12.4 — Preview Deployments

Verificar que los PRs generan preview URLs automáticamente.

---

## Paso 13 — Efectos Finales (Post-core)

Con el sitio funcional y en producción, agregar los efectos visuales que dan el carácter especial:

### 13.1 — CustomCursor

El cursor personalizado es un detalle que impacta en usuarios de escritorio.

### 13.2 — NoiseTexture

Overlay de ruido muy sutil en todo el sitio.

### 13.3 — OrganicDividers entre secciones

Reemplazar divisores rectos por los SVG de borde orgánico.

### 13.4 — Parallax en Hero

`ParallaxLayer` en los OrganicBlobs del hero para dar profundidad.

### 13.5 — Scroll-triggered reveals

Asegurar que todas las secciones tienen animaciones de entrada al hacer scroll.

---

## Checklist Final de Lanzamiento

### Performance
- [ ] Lighthouse ≥ 95 en Performance en todas las rutas
- [ ] LCP < 2.0s
- [ ] CLS < 0.05
- [ ] INP < 150ms
- [ ] Bundle principal < 100KB gzipped

### Accesibilidad
- [ ] WCAG 2.1 AA: Sin errores críticos
- [ ] Todos los controles interactivos accesibles por teclado
- [ ] Todos los íconos con aria-label
- [ ] Focus visible en todos los elementos
- [ ] `prefers-reduced-motion` respetado en todas las animaciones
- [ ] Contraste de color ≥ 4.5:1 para texto normal

### SEO
- [ ] `lang="es-MX"` en `<html>`
- [ ] Cada página tiene title y description únicos
- [ ] Open Graph configurado
- [ ] JSON-LD presente en el layout
- [ ] `sitemap.xml` generado y accesible
- [ ] `robots.txt` correcto
- [ ] Favicons configurados (favicon.ico, apple-touch-icon)

### Funcionalidad
- [ ] Formulario de contacto envía y muestra feedback
- [ ] WhatsApp link funciona con el mensaje pre-llenado
- [ ] Reproductor de audio reproduce todas las pistas
- [ ] Navegación funciona en todos los browsers modernos
- [ ] El sitio funciona sin JavaScript (contenido estático visible)

### Contenido
- [ ] Toda la información es correcta y actualizada
- [ ] Todos los links externos funcionan
- [ ] Imágenes cargadas en Cloudinary
- [ ] JSON de contenido completo y validado

### Deploy
- [ ] CI/CD configurado (GitHub → Cloudflare Pages)
- [ ] Dominio personalizado activo con HTTPS
- [ ] Preview deployments funcionando
- [ ] Variables de entorno configuradas en Cloudflare

---

## Estimaciones de Tiempo

| Paso | Estimado | Acumulado |
|------|----------|-----------|
| 0 — Preparación | 2h | 2h |
| 1 — Tipos y Datos | 3h | 5h |
| 2 — Routing & Layout | 4h | 9h |
| 3 — UI Átomos | 4h | 13h |
| 4 — Hero Section | 5h | 18h |
| 5 — Home Restante | 4h | 22h |
| 6 — Reproductor Audio | 6h | 28h |
| 7 — Páginas Portfolio | 6h | 34h |
| 8 — About & Contact | 3h | 37h |
| 9 — SEO & Meta | 2h | 39h |
| 10 — Optimización | 4h | 43h |
| 11 — Assets Cloudinary | 2h | 45h |
| 12 — Deploy | 2h | 47h |
| 13 — Efectos Finales | 3h | 50h |

**Total estimado: ~50 horas de desarrollo activo**

---

## Dependencias Bloqueantes

Antes de que el desarrollo pueda completarse, se necesita:

| Bloqueante | Responsable | Paso que desbloquea |
|-----------|-------------|---------------------|
| Cuenta de Cloudinary creada | Cliente | Paso 11 |
| Foto de perfil de alta calidad | Cliente | Paso 4 |
| Fotos de proyectos | Cliente | Paso 7 |
| Archivos de audio para reproductor | Cliente | Paso 6 |
| Dominio personalizado | Cliente | Paso 12 |
| Formspree ID (o decisión de Workers) | Dev/Cliente | Paso 8 |
| Textos finales de bio y proyectos | Cliente | Paso 1 |
