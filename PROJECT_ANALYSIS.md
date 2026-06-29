# PROJECT_ANALYSIS.md
## Auditoría Técnica — Portfolio Ingenier0 Espacial
**Fecha:** 2026-06-29  
**Auditor:** Senior Frontend Engineer / Architect

---

## 1. Resumen del Proyecto

Portfolio web de **Victor Manuel Canchola** (*ingenier0espacial*), músico profesional especializado en composición y producción para medios audiovisuales, y cofundador de la banda **Juliette!**.

El sitio está construido con **Next.js 15 App Router + React 19 + TypeScript + Tailwind CSS**. Tiene tres rutas activas: Home (presentación), Portafolio Musical (reproductor SoundCloud), y Banda (embed Spotify + descripción animada). Una cuarta ruta (`/networks`) existe pero está vacía.

**Estado actual:** Prototipo funcional con deuda técnica significativa. Varios bugs críticos impiden que la experiencia responsive y el deployment funcionen correctamente.

---

## 2. Fortalezas

| Área | Detalle |
|------|---------|
| Stack moderno | Next.js 15, React 19, TypeScript strict, Turbopack en dev |
| Animaciones | Sistema de transiciones de página y `MotionTransition` desacoplado vía `utils/motion-transitions.tsx` |
| Reproductor custom | `MusicPlayer` integra la SC Widget API con controles propios (play/pause, skip, volumen, playlist responsiva) |
| Separación de datos | `data.tsx` centraliza ítems de navbar y redes sociales (intención correcta, aunque tiene problemas de implementación) |
| Tipado | Interfaces definidas en `MusicPlayer` y componentes; `tsconfig.json` con `strict: true` |
| Palette consistente | Sistema de colores propio en Tailwind (`modGreen`, `modOrange`, `modYellow`, etc.) |
| Turbopack | Habilitado en dev para hot-reload rápido |

---

## 3. Debilidades

### 3.1 Bug Crítico — Tailwind responsive roto

En `tailwind.config.js`, la clave `screens` está directamente bajo `theme` (no bajo `theme.extend`), lo que **elimina todos los breakpoints por defecto** de Tailwind:

```js
// ❌ ACTUAL — sobreescribe sm, md, lg, xl, 2xl
theme: {
  screens: { mobile: '280px' },
  extend: { ... }
}
```

Consecuencia: todas las clases `md:flex`, `md:text-5xl`, `md:hidden`, `md:items-start`, `md:text-left`, etc. **no tienen efecto alguno**. El diseño de escritorio está completamente roto aunque el código parezca correcto.

---

### 3.2 Imagen no optimizada

`/public/avatar_profile.png` pesa **872 KB** en formato PNG. En un portfolio de músico, esta imagen es el principal elemento visual.

- Sin `next/image` con tamaños responsivos explícitos
- Sin conversión a WebP/AVIF
- Sin placeholder blur mientras carga

---

### 3.3 Deploy completamente roto

```json
"scripts": {
  "start": "node index.js",   // index.js no existe en el proyecto
  "deploy": "gh-pages -d build" // Next.js no genera carpeta /build
}
```

- Next.js exporta a `.next/` en modo server-side, o a `out/` con `output: 'export'`
- `next.config.ts` está vacío: sin `output: 'export'`, sin `basePath`, sin `trailingSlash`
- Para GitHub Pages es necesario configuración estática explícita

---

### 3.4 Import de librería de animaciones incorrecto

`transition-component.tsx` importa de `framer-motion`:

```tsx
import {motion} from 'framer-motion'
```

Pero `package.json` instala el paquete `motion` (v11), **no** `framer-motion`. En Motion v11 el import correcto es `from 'motion/react'`.

---

### 3.5 Bug en el script de SoundCloud (MusicPlayer)

El `useEffect` que inyecta el script de la SC Widget API tiene `handleNext` y `volume` en su array de dependencias:

```tsx
useEffect(() => {
  const script = document.createElement("script");
  // ...
  return () => { document.body.removeChild(script) };
}, [handleNext, volume]); // ❌ re-inyecta el script al cambiar volumen o pista
```

Cada cambio de volumen o canción destruye y recrea el script, desconectando el widget.

---

### 3.6 Elemento `<SpotifyPlayer>` con `<main>` anidado

`SpotifyPlayer` renderiza su propio `<main>` y `<TransitionPage>`, pero se usa dentro de `band/page.tsx` que ya está dentro del `<body>` con Header/Navbar. Resultado: `<main>` anidado (inválido en HTML5) y doble transición de página.

---

### 3.7 Código muerto y archivos huérfanos

| Archivo/Elemento | Problema |
|---|---|
| `components/avatar.tsx` | Componente sin importar en ninguna página activa |
| `components/containerPage.tsx` | Sin usar; tiene typo `mx-auo` en lugar de `mx-auto` |
| `components/constraints.txt` | Es un `requirements.txt` de Python del sistema operativo; no pertenece al proyecto |
| `public/rounded-text.png` | No referenciada en ningún componente |
| `public/next.svg`, `public/vercel.svg` | Assets del template por defecto de Next.js |
| `data.tsx` → `ExampleLol` | Array de prueba con "No sé xd" y campos vacíos |
| `app/networks/page.tsx` | Página vacía, ruta comentada en navbar |
| `h1` y `span` vacíos en `app/page.tsx` | `<h1></h1><span></span>` sin contenido |

---

### 3.8 Dependencias mal clasificadas

```json
// En "dependencies" (producción), deberían ser devDependencies o eliminarse:
"express": "^4.18.2",          // Para index.js que no existe
"sucrase": "^3.35.0",          // Transpilador de build
"css-loader": "^7.1.2",        // Webpack loader (Next.js no lo usa)
"postcss-loader": "^8.1.1",    // Ídem
"@next/swc-linux-x64-gnu",     // Binario de plataforma específica
"@next/swc-linux-x64-musl"     // Ídem
```

---

### 3.9 `data.tsx` acopla datos con JSX

Los iconos de redes sociales y navbar se definen como elementos React dentro del objeto de datos:

```tsx
logo: <Youtube size={30} strokeWidth={1} />,
```

Esto impide reutilizar los datos fuera de un contexto React (tests, SSG, generación de metadatos) y mezcla responsabilidades.

---

### 3.10 Problemas de accesibilidad

| Elemento | Problema |
|---|---|
| Links de redes sociales (Header) | Solo icono, sin `aria-label` |
| Links de navbar | Solo icono, sin `aria-label` |
| Botones de MusicPlayer (play, skip, cerrar) | Sin `aria-label` en botones icon-only |
| Input range de volumen | Sin `<label>` asociado ni `aria-label` |
| iframeRef | Tipado como `useRef(null)` sin `<HTMLIFrameElement>` |
| Atributos deprecados | `frameBorder="no"`, `scrolling="no"` en iframes |
| `<iframe>` sin título | Falta atributo `title` en embeds de SoundCloud y Spotify |
| Trailing space en URL Spotify embed | `src="...generator  "` (espacios al final) |

---

### 3.11 Problemas de SEO

| Problema | Detalle |
|---|---|
| `lang="en"` en sitio en español | Debería ser `lang="es"` o `lang="es-MX"` |
| Metadata mínima | Solo `title` y `description`, sin Open Graph, Twitter Cards, ni canonical |
| Sin structured data | Sin JSON-LD `Person` ni `MusicGroup` para búsquedas enriquecidas |
| Emoji en title | `"Victor Manuel Canchola 🌱 "` no es ideal para SERPs |
| Sin sitemap | No hay `sitemap.xml` ni `robots.txt` |
| Sin favicon correcto | Solo el placeholder de Next.js |
| `h1` duplicado | Header tiene `<h1>` con el nombre + Introduction tiene otro `<h1>` con el tagline |

---

### 3.12 Problemas de rendimiento

| Problema | Impacto |
|---|---|
| 80 partículas + 120 FPS limit | Alto consumo de GPU, especialmente en móvil |
| Partículas sin lazy loading | Bloquean render inicial |
| CoverParticles en fondo pero Introduction encima sin z-index claro | Posibles conflictos de stacking |
| TypeAnimation sin `aria-live` | No notifica cambios a screen readers |
| Script de SoundCloud sin caché | Se re-descarga si el componente desmonta |

---

### 3.13 Inconsistencias de naming y código

| Archivo | Problema |
|---|---|
| `utils/motion-transitions.tsx` | Extensión `.tsx` innecesaria (no hay JSX), debería ser `.ts` |
| `transtionVariantsPage` | Typo: falta la `i` en "transition" |
| `interface MotionTransition` | Mismo nombre que el componente `MotionTransition`; TypeScript puede resolver ambiguedad pero es mala práctica |
| `import './globals.css'` en `page.tsx` | Redundante; ya se importa en `layout.tsx` |
| `tailwind.config.js` | `secondary` y `modGreen` tienen el mismo valor `#8F9044` |
| `tailwind.config.js` | `gradient-cover` usa colores morado/magenta ajenos a la paleta del sitio |
| Mezcla tabs/spaces | `band/page.tsx` y `music-player.tsx` mezclan indentación |
| Playlist hardcodeada | Definida dentro del componente en `musicPortfolio/page.tsx` |
| Número de contacto hardcodeado | `const contact_number = "5432423432"` en `introduction.tsx` |

---

## 4. Riesgos

### 🔴 Críticos (rompen funcionalidad)

1. **Responsive completamente roto** por el override de `screens` en Tailwind. El sitio en escritorio no aplica ningún estilo `md:` o `lg:`.
2. **Deploy roto**: `npm run deploy` fallará sin configuración estática en Next.js.
3. **Import de `framer-motion`** puede fallar en producción si el paquete no se instala como dependencia transitoria.

### 🟠 Altos (degradan experiencia)

4. **Imagen de 872 KB** penaliza LCP y Core Web Vitals severamente.
5. **Script SoundCloud se reinicia** al cambiar volumen, interrumpiendo la reproducción.
6. **`<main>` anidado** produce markup inválido que afecta SEO y accesibilidad.

### 🟡 Medios (deuda técnica)

7. **SEO pobre** reduce visibilidad orgánica del portfolio.
8. **Accesibilidad deficiente** (botones sin labels) puede incumplir WCAG 2.1 AA.
9. **Archivos basura** (`constraints.txt`, assets de template) en el repositorio.
10. **Partículas a 120 FPS** con 80 nodos pueden causar throttling en móvil.

---

## 5. Mejoras Recomendadas

### Correctivas (bugs)

| # | Mejora | Impacto |
|---|--------|---------|
| C1 | Mover `screens` a `theme.extend` en Tailwind | Restaura todo el responsive design |
| C2 | Cambiar import `framer-motion` → `motion/react` en `transition-component.tsx` | Alinea import con paquete instalado |
| C3 | Separar script SC de la lógica de reproducción en `MusicPlayer` | Fix de bug de reinicio |
| C4 | Extraer `<TransitionPage>` y `<main>` de `SpotifyPlayer`, dejarlo como componente puro | Fix markup inválido |
| C5 | Configurar `next.config.ts` con `output: 'export'` y actualizar script de deploy | Deploy funcional |

### SEO & Metadata

| # | Mejora |
|---|--------|
| S1 | Cambiar `lang="en"` → `lang="es-MX"` en `layout.tsx` |
| S2 | Agregar metadata Open Graph + Twitter Cards en `layout.tsx` |
| S3 | Agregar JSON-LD `Person` + `MusicGroup` en el layout |
| S4 | Crear `public/robots.txt` y `app/sitemap.ts` |
| S5 | Limpiar y optimizar `<title>` (sin trailing space ni emoji) |

### Rendimiento

| # | Mejora |
|---|--------|
| P1 | Convertir `avatar_profile.png` a WebP/AVIF, max ~120 KB, con `priority` en next/image |
| P2 | Reducir partículas a 40, fpsLimit a 60, desactivar en `prefers-reduced-motion` |
| P3 | Lazy load de `CoverParticles` con `dynamic(() => import(...), { ssr: false })` |
| P4 | Eliminar assets no usados: `rounded-text.png`, `next.svg`, `vercel.svg` |

### Accesibilidad

| # | Mejora |
|---|--------|
| A1 | Agregar `aria-label` a todos los links de icono (header y navbar) |
| A2 | Agregar `aria-label` a botones de MusicPlayer |
| A3 | Agregar `<label>` o `aria-label` al input range de volumen |
| A4 | Agregar `title` a todos los `<iframe>` |
| A5 | Reemplazar `frameBorder` y `scrolling` por CSS equivalente |
| A6 | Agregar `aria-live="polite"` al contenedor del TypeAnimation |

### Arquitectura & Calidad

| # | Mejora |
|---|--------|
| Q1 | Separar íconos de `data.tsx`: exportar solo strings/URLs, instanciar los íconos en los componentes |
| Q2 | Mover la playlist de `musicPortfolio/page.tsx` y el número de contacto a `data.tsx` o a un archivo `lib/constants.ts` |
| Q3 | Eliminar todo el código muerto: `avatar.tsx`, `containerPage.tsx`, `networks/page.tsx`, `ExampleLol`, `constraints.txt`, assets de template |
| Q4 | Renombrar `transtionVariantsPage` → `transitionVariantsPage` y cambiar extensión de `.tsx` → `.ts` |
| Q5 | Renombrar `interface MotionTransition` → `MotionTransitionProps` |
| Q6 | Eliminar `import './globals.css'` de `page.tsx` |
| Q7 | Corregir colores duplicados en Tailwind y eliminar `gradient-cover` sin uso |
| Q8 | Mover `express`, `sucrase`, `css-loader`, `postcss-loader` a `devDependencies` o eliminar |
| Q9 | Crear `lib/types.ts` con interfaces compartidas (Track, NavItem, SocialNetwork) |

---

## 6. Plan de Refactorización

El plan divide el trabajo en tres fases: **Estabilización** (corregir lo que está roto), **Optimización** (mejorar calidad y rendimiento), y **Evolución** (escalar el proyecto).

### Fase 1 — Estabilización (bugs críticos y deuda acumulada)

**Objetivo:** Que el sitio funcione correctamente en todos los dispositivos y pueda desplegarse.

1. Fix Tailwind `screens` → `theme.extend.screens`
2. Fix import `motion/react` en `transition-component.tsx`
3. Fix `MusicPlayer`: separar inicialización del widget de las dependencias reactivas
4. Fix `SpotifyPlayer`: convertirlo en componente puro (sin `<main>` ni `<TransitionPage>`)
5. Fix `next.config.ts` + script de deploy para GitHub Pages
6. Eliminar archivos basura: `constraints.txt`, `ExampleLol`, `avatar.tsx`, `containerPage.tsx`, assets de template
7. Corregir typos: `mx-auo`, `transtionVariantsPage`, `interface MotionTransition`
8. Eliminar imports redundantes (`globals.css` en `page.tsx`)
9. Limpiar etiquetas vacías `<h1></h1><span></span>` en `page.tsx`
10. Fix atributos deprecados en iframes

### Fase 2 — Optimización (rendimiento, SEO, accesibilidad)

**Objetivo:** Que el sitio sea rápido, accesible y encontrable.

1. Optimizar imagen del avatar: WebP, múltiples tamaños, placeholder blur
2. Optimizar partículas: reducir a 40 nodos, 60 FPS, respetar `prefers-reduced-motion`
3. Lazy load de `CoverParticles`
4. Añadir `aria-label` a todos los controles icon-only
5. Añadir `title` a iframes, labels al input de volumen
6. Cambiar `lang="en"` → `lang="es-MX"`
7. Expandir metadata: Open Graph, Twitter Cards, title limpio
8. Agregar JSON-LD (Person + MusicGroup)
9. Crear `sitemap.ts` y `robots.txt`
10. Mover `express`, SWC binaries a devDependencies

### Fase 3 — Evolución (escalabilidad y nuevas secciones)

**Objetivo:** Que el proyecto pueda crecer sin fricciones.

1. Separar datos de JSX en `data.tsx` → `lib/data.ts` + `lib/constants.ts`
2. Crear `lib/types.ts` con tipos compartidos
3. Implementar la sección `/networks` con los datos ya existentes en `data.tsx`
4. Activar o eliminar definitivamente la ruta `/about-me`
5. Considerar CMS headless (Notion API, Contentful, Sanity) para gestionar la playlist y proyectos sin tocar código
6. Agregar `next/bundle-analyzer` para monitorear el bundle
7. Establecer un pipeline CI básico (GitHub Actions: lint + type-check en PR)

---

## 7. Orden de Implementación

```
Semana 1 — Fase 1 (Estabilización)
├── [1] Fix Tailwind screens            ← URGENTE, todo responsive está roto
├── [2] Fix import motion/react
├── [3] Fix MusicPlayer script bug
├── [4] Fix SpotifyPlayer (extraer main + TransitionPage)
├── [5] Fix deploy config (next.config + gh-pages)
├── [6] Limpieza de código muerto
└── [7] Fix typos y imports redundantes

Semana 2 — Fase 2 (Optimización)
├── [8]  Imagen avatar → WebP optimizado
├── [9]  Partículas → reducir, lazy load, prefers-reduced-motion
├── [10] Accesibilidad → aria-labels, títulos de iframe, label volumen
├── [11] lang="es-MX" + metadata completa
├── [12] Open Graph + Twitter Cards
├── [13] JSON-LD structured data
└── [14] sitemap.ts + robots.txt

Semana 3 — Fase 3 (Evolución)
├── [15] Refactor data.tsx → lib/data.ts + lib/types.ts
├── [16] Implementar /networks
├── [17] Evaluar /about-me (activar o eliminar)
├── [18] CI con GitHub Actions (lint + typecheck)
└── [19] Evaluar CMS para contenido dinámico
```

---

## Apéndice — Inventario de archivos por estado

| Archivo | Estado | Acción |
|---------|--------|--------|
| `app/layout.tsx` | Activo, mejorable | Expandir metadata, fix lang |
| `app/page.tsx` | Activo, mejorable | Limpiar etiquetas vacías, import redundante |
| `app/band/page.tsx` | Activo, mejorable | Fix `SpotifyPlayer` anidado |
| `app/musicPortfolio/page.tsx` | Activo, mejorable | Mover playlist a data layer |
| `app/networks/page.tsx` | Vacío | Implementar o eliminar |
| `components/avatar.tsx` | Huérfano | Eliminar |
| `components/containerPage.tsx` | Huérfano + typo | Eliminar |
| `components/cover-particles.tsx` | Activo, mejorable | Lazy load, reducir partículas |
| `components/header.tsx` | Activo, mejorable | Agregar aria-labels |
| `components/introduction.tsx` | Activo, mejorable | Sacar número de contacto |
| `components/music-player.tsx` | Activo, bug crítico | Fix script + accesibilidad |
| `components/navbar.tsx` | Activo, mejorable | Agregar aria-labels |
| `components/spotify-player.tsx` | Activo, bug | Extraer main + TransitionPage |
| `components/transition-component.tsx` | Activo, mejorable | Fix import, renombrar interface |
| `components/transition-pages.tsx` | Activo | OK |
| `components/constraints.txt` | Error — archivo de OS | Eliminar del repo |
| `data.tsx` | Activo, mejorable | Separar JSX de datos, mover playlist |
| `utils/motion-transitions.tsx` | Activo, mejorable | Renombrar a `.ts`, fix typo |
| `tailwind.config.js` | Bug crítico | Mover screens a extend |
| `next.config.ts` | Incompleto | Agregar output: export |
| `public/avatar_profile.png` | Activo, no optimizado | Convertir a WebP, reducir peso |
| `public/rounded-text.png` | Huérfano | Eliminar o usar |
| `public/next.svg`, `public/vercel.svg` | Template residual | Eliminar |

---

*Documento generado tras revisión de todos los archivos fuente del repositorio. No se modificó ningún archivo.*
