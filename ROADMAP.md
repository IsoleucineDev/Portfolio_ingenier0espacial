# ROADMAP.md
## Portfolio Profesional — Víctor Manuel Canchola Cervantes
**Stack:** React + Vite + TypeScript + Tailwind CSS + Framer Motion  
**Hosting:** Cloudflare Pages (serverless)  
**Imágenes:** Cloudinary  
**Target:** Lighthouse ≥ 95

---

## Visión del Producto

Un sitio-experiencia para un compositor y productor musical que compite directamente con estudios creativos de primer nivel. No es un portfolio estático: es una **tarjeta de presentación inmersiva** que comunica el universo sonoro de Víctor a través de diseño editorial japonés, estética Studio Ghibli, y animaciones que respiran.

La arquitectura es **white-label desde el día uno**: cambiar de cliente implica únicamente modificar archivos JSON y tokens de diseño, nunca la lógica de la aplicación.

---

## Fases

### Fase 0 — Fundación (Semana 1)
**Objetivo:** Proyecto limpio, estructura definitiva, tooling configurado.

- [ ] Crear nuevo proyecto Vite + React + TypeScript
- [ ] Configurar Tailwind CSS con sistema de tokens personalizado
- [ ] Configurar ESLint + Prettier + Husky
- [ ] Configurar Framer Motion
- [ ] Definir estructura de carpetas `/src/clients/`
- [ ] Crear schema de contenido TypeScript (`/src/types/`)
- [ ] Crear sistema de carga de tema (`ThemeProvider`)
- [ ] Configurar Cloudflare Pages (`wrangler.toml`)
- [ ] Configurar Cloudinary utilities (`/src/lib/cloudinary.ts`)
- [ ] Configurar React Router v6
- [ ] Crear los archivos JSON de contenido base para Víctor
- [ ] CI básico: type-check + lint en push

**Entregable:** Proyecto corriendo en localhost con routing y tema cargado desde JSON.

---

### Fase 1 — Navegación & Layout Global (Semana 1-2)
**Objetivo:** El esqueleto experiencial del sitio.

- [ ] `FloatingNav` — navegación tipo píldora flotante, animada, con indicador de sección activa
- [ ] `PageTransition` — transición de entrada/salida entre páginas con Framer Motion
- [ ] `CustomCursor` — cursor personalizado que reacciona a elementos interactivos
- [ ] `AudioPlayerMini` — mini reproductor flotante que persiste entre páginas
- [ ] `SectionIndicator` — dots laterales que indican posición en scroll
- [ ] Font loading optimizado (Google Fonts subconjunto)
- [ ] Meta tags base + Open Graph

**Entregable:** Navegación funcionando con transiciones entre páginas.

---

### Fase 2 — Sección Hero & Home (Semana 2)
**Objetivo:** Primera impresión perfecta.

- [ ] `HeroSection` — layout editorial asimétrico con collage visual
- [ ] `HeroHeadline` — tipografía animada con reveal por caracteres
- [ ] `TypewriterEffect` — especialidades rotando (Compositor, Foley, Productor...)
- [ ] `HeroVisual` — composición de imágenes + formas orgánicas animadas con Framer Motion
- [ ] `ServicesTeaser` — 3 tarjetas de acceso rápido (Videojuegos / Foley / Proyectos)
- [ ] `FeaturedWork` — un proyecto destacado con audio preview
- [ ] `ContactCTA` — llamada a la acción con energía

**Entregable:** Home page completa y responsiva.

---

### Fase 3 — Secciones de Portfolio (Semana 3)
**Objetivo:** Las páginas que convierten visitantes en clientes.

#### /videogames
- [ ] `VideoGamesHero` — identidad visual propia para esta sección
- [ ] `ProjectGrid` — grid tipo collage con cards de proyectos
- [ ] `ProjectCard` — preview visual + audio snippet + metadata
- [ ] `AudioPlayer` — reproductor completo para demostrar el trabajo

#### /foley
- [ ] `FoleyHero` — diferente a videojuegos, más editorial
- [ ] `FoleyShowcase` — formato distinto (timeline o grid narrativo)
- [ ] `FoleyPlayer` — reproductor con visualizador de onda

#### /projects
- [ ] `ProjectsHero`
- [ ] `BandSection` — Juliette! con embed Spotify + descripción
- [ ] `AlternativeProjects` — otros proyectos

**Entregable:** Las tres páginas de portfolio navegables.

---

### Fase 4 — About & Contact (Semana 3-4)
**Objetivo:** Humanizar la marca y facilitar el contacto.

- [ ] `AboutPage` — bio narrativa, foto, timeline de carrera
- [ ] `ContactPage` — formulario + datos directos
- [ ] Integración formulario (Cloudflare Workers o Formspree)
- [ ] WhatsApp CTA directo

**Entregable:** Flujo completo de conversión.

---

### Fase 5 — Optimización & Calidad (Semana 4)
**Objetivo:** Lighthouse ≥ 95 en todas las métricas.

- [ ] Optimización de imágenes: WebP, lazy loading, blur placeholders desde Cloudinary
- [ ] Code splitting por ruta con `React.lazy` + `Suspense`
- [ ] Preload de fuentes críticas
- [ ] Bundle analysis y tree-shaking
- [ ] Accesibilidad: WCAG 2.1 AA (aria-labels, focus management, reduced-motion)
- [ ] SEO: meta tags, Open Graph, JSON-LD (Person + MusicGroup)
- [ ] `sitemap.xml` generado en build
- [ ] `robots.txt`
- [ ] Pruebas en dispositivos reales (móvil, tablet, desktop)

**Entregable:** Lighthouse ≥ 95 verificado.

---

### Fase 6 — Deploy & Lanzamiento (Semana 4-5)
**Objetivo:** Sitio en producción, estable.

- [ ] Configurar Cloudflare Pages con dominio personalizado
- [ ] Variables de entorno en Cloudflare Dashboard
- [ ] Cache headers para assets estáticos
- [ ] Preview deployments por branch
- [ ] Monitoreo básico (Cloudflare Analytics)
- [ ] Documentar proceso de actualización de contenido (cómo editar los JSON)

**Entregable:** Sitio live con dominio del cliente.

---

## Hitos

| Hito | Semana | Criterio |
|------|--------|----------|
| M0 — Fundación | 1 | `npm run dev` sin errores, routing funcionando |
| M1 — Primer Look | 2 | Home page con identidad visual definida |
| M2 — Portfolio Completo | 3 | Las 3 secciones navegables con audio |
| M3 — Calidad Verificada | 4 | Lighthouse ≥ 95 confirmado |
| M4 — Live | 5 | Dominio activo, deploy automático configurado |

---

## Deuda Técnica Planeada (no bloquea lanzamiento)

- GSAP ScrollTrigger para animaciones de scroll más complejas en hero (Post-M4)
- Modo oscuro (toggle en theme.json)
- Internacionalización EN/ES (si el cliente busca mercado internacional)
- Blog/Noticias via Notion API (Post-lanzamiento)
- Analytics de audio (qué pistas se escuchan más)

---

## Decisiones Técnicas Clave

| Decisión | Elección | Razón |
|----------|----------|-------|
| Framework | React + Vite (no Next.js) | SPA pura para Cloudflare Pages; Next.js requiere Edge Runtime o Workers extra |
| Routing | React Router v6 | SPAs en Cloudflare Pages con `_redirects` |
| Animaciones | Framer Motion principal, GSAP solo para scroll complejo | Framer Motion integra mejor con React; GSAP para timelines de scroll |
| Audio | Web Audio API + Howler.js (no SoundCloud widget) | Control total de diseño y UX; SoundCloud como fuente de datos via oEmbed |
| Imágenes | Cloudinary | CDN global, transformaciones automáticas, WebP/AVIF on-the-fly |
| Forms | Cloudflare Workers o Formspree | Serverless, sin backend propio |
| Multi-tenant | JSON + CSS custom properties | El tema vive completamente fuera del código |
