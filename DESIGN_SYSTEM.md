# DESIGN_SYSTEM.md
## Sistema de Diseño — Portfolio Víctor Manuel Canchola
**Concepto:** Patchwork Ghibli Editorial / Experiencia Sonora Japonesa

---

## 1. Filosofía Visual

El sitio no "muestra" la música: la **hace sentir**. Cada sección tiene su propia personalidad visual pero comparten un lenguaje orgánico, cálido, y artesanal inspirado en:

- **Patchwork:** composiciones de texturas, formas y colores que no son perfectas pero son intencionales
- **Studio Ghibli:** calidez, naturaleza, mundos propios con reglas propias
- **Diseño editorial japonés:** asimetría calculada, espacio en blanco poderoso, tipografía como elemento visual
- **Pop independiente:** color, energía, sin miedo
- **Ilustración:** no es foto-realismo; hay interpretación y estilo propio

La identidad visual de Víctor combina lo **orgánico** (formas fluidas, colores tierra) con lo **tecnológico** (composición para videojuegos, producción digital). Esta tensión es el corazón del sistema.

---

## 2. Paleta de Colores

### Colores Base (invariables por cliente)

Estos son los únicos colores que nunca cambian; son la "infraestructura" cromática.

```css
--color-transparent: transparent
--color-white: #FFFFFF
--color-black: #000000
```

### Paleta Principal — ingenier0espacial

Todos estos valores viven en `clients/ingenier0espacial/theme.json` y se inyectan como CSS custom properties en el `<html>`.

#### Fondos
```css
--color-bg-primary:    #F9F4EE  /* Crema cálido — lienzo principal */
--color-bg-secondary:  #F0E8DC  /* Papel viejo — secciones alternadas */
--color-bg-dark:       #1E1A15  /* Tinta oscura — contrastes dramáticos */
--color-bg-accent:     #EDE0CE  /* Pergamino — cards, modales */
```

#### Texto
```css
--color-text-primary:   #2A2218  /* Tinta cálida — nunca negro puro */
--color-text-secondary: #6B5E4E  /* Sepia — texto de apoyo */
--color-text-muted:     #A0917F  /* Polvo — metadata, etiquetas */
--color-text-inverse:   #F9F4EE  /* Sobre fondos oscuros */
```

#### Acentos Principales
```css
--color-sage:       #7A9E7E  /* Verde salvia — naturaleza, calma */
--color-sage-light: #B5CDB7  /* Verde salvia claro — hover states */
--color-sage-dark:  #4F7253  /* Verde salvia oscuro — activos */

--color-rust:       #C4704F  /* Óxido/Terracota — energía, CTA */
--color-rust-light: #E4A080  /* Terracota claro — hover */
--color-rust-dark:  #8F4A2F  /* Terracota oscuro — pressed */
```

#### Acentos Secundarios
```css
--color-sky:        #7DB0D0  /* Azul cielo — videojuegos, digital */
--color-sky-light:  #B0D2E8  /* Azul claro */
--color-sky-dark:   #4A88B0  /* Azul oscuro */

--color-gold:       #D9A84A  /* Oro apagado — premium, highlights */
--color-gold-light: #ECC878  /* Oro claro */

--color-lavender:   #A89BC0  /* Lavanda — proyectos alternativos */
--color-rose:       #D4899A  /* Rosa palo — detalle, Juliette! */
```

#### Utilidades
```css
--color-border:     #D8CCBA  /* Borde sutil */
--color-border-strong: #B8A898 /* Borde énfasis */
--color-overlay:    rgba(30, 26, 21, 0.6) /* Overlay modal */
--color-noise:      /* SVG texture inyectado via CSS */
```

### Cómo cambia por cliente

En `clients/otro-cliente/theme.json` solo se cambian los valores de las custom properties. La lógica de la aplicación nunca toca un valor hexadecimal hardcodeado.

```json
{
  "colors": {
    "bg-primary": "#F0F4FF",
    "bg-secondary": "#E8EEF8",
    "sage": "#5B8FA8",
    "rust": "#E84393"
  }
}
```

---

## 3. Tipografía

### Familias

```css
/* Serif Editorial — headlines, display */
--font-display: 'Shippori Mincho', 'Noto Serif JP', Georgia, serif;

/* Sans Moderna — body, UI */
--font-body: 'Outfit', 'DM Sans', system-ui, sans-serif;

/* Mono — etiquetas, números de pista, código */
--font-mono: 'Space Mono', 'DM Mono', monospace;
```

**Por qué Shippori Mincho:** Es una seríf japonesa con carácter editorial fuerte. Los caracteres tienen peso en los trazos que evoca artesanía. Funciona perfectamente mezclada con el contexto musical y el referente visual japonés, sin ser "anime".

**Por qué Outfit:** Variable font, muy legible, personalidad limpia y contemporánea. Contrasta bien con el serif.

### Escala Tipográfica

```css
/* Display — héroe, nombre del artista */
--text-display-xl: clamp(3.5rem, 8vw, 7rem);    /* ~112px */
--text-display-lg: clamp(2.5rem, 5vw, 4.5rem);   /* ~72px */
--text-display-md: clamp(2rem, 4vw, 3rem);        /* ~48px */

/* Headings */
--text-h1: clamp(1.75rem, 3vw, 2.5rem);          /* ~40px */
--text-h2: clamp(1.5rem, 2.5vw, 2rem);           /* ~32px */
--text-h3: clamp(1.25rem, 2vw, 1.5rem);          /* ~24px */

/* Body */
--text-body-lg: 1.125rem;                         /* 18px */
--text-body-md: 1rem;                             /* 16px */
--text-body-sm: 0.875rem;                         /* 14px */

/* Labels / Mono */
--text-label-lg: 0.875rem;                        /* 14px */
--text-label-sm: 0.75rem;                         /* 12px */
--text-caption: 0.6875rem;                        /* 11px */
```

### Pesos y Espaciado

```css
--font-weight-thin:     200;
--font-weight-regular:  400;
--font-weight-medium:   500;
--font-weight-semibold: 600;
--font-weight-bold:     700;
--font-weight-black:    900;

--tracking-tight:  -0.03em;
--tracking-normal: 0;
--tracking-wide:   0.05em;
--tracking-wider:  0.1em;
--tracking-widest: 0.2em;  /* Para etiquetas en mayúsculas */

--leading-tight:  1.1;
--leading-snug:   1.3;
--leading-normal: 1.5;
--leading-relaxed: 1.7;
--leading-loose:  2;
```

---

## 4. Espaciado

Sistema de 4px base. Los valores viven en Tailwind config como tokens.

```css
--space-1:   4px
--space-2:   8px
--space-3:   12px
--space-4:   16px
--space-5:   20px
--space-6:   24px
--space-8:   32px
--space-10:  40px
--space-12:  48px
--space-16:  64px
--space-20:  80px
--space-24:  96px
--space-32:  128px
--space-40:  160px
--space-48:  192px
```

### Espaciado de Secciones

Las secciones usan `clamp` para adaptarse fluidamente:

```css
--section-padding-y: clamp(4rem, 8vw, 8rem);
--section-padding-x: clamp(1.5rem, 5vw, 4rem);
--section-gap:       clamp(3rem, 6vw, 6rem);
```

---

## 5. Bordes y Radio

La identidad orgánica vive principalmente en el border-radius.

```css
/* Formas orgánicas — elementos de diseño, blobs */
--radius-blob: 60% 40% 30% 70% / 60% 30% 70% 40%;
--radius-pill: 9999px;

/* UI Components */
--radius-xs:  4px
--radius-sm:  8px
--radius-md:  12px
--radius-lg:  20px
--radius-xl:  32px
--radius-2xl: 48px

/* Cards especiales */
--radius-card:    16px
--radius-card-lg: 24px
```

---

## 6. Sombras

Las sombras son cálidas (ligeramente coloreadas hacia el tono terracota).

```css
--shadow-sm:  0 2px 8px rgba(42, 34, 24, 0.06);
--shadow-md:  0 4px 20px rgba(42, 34, 24, 0.10);
--shadow-lg:  0 8px 40px rgba(42, 34, 24, 0.14);
--shadow-xl:  0 16px 60px rgba(42, 34, 24, 0.18);

/* Sombra de color para cards de acento */
--shadow-sage: 0 8px 30px rgba(122, 158, 126, 0.25);
--shadow-rust: 0 8px 30px rgba(196, 112, 79, 0.25);
--shadow-sky:  0 8px 30px rgba(125, 176, 208, 0.25);
```

---

## 7. Sistema de Animación

### Principios

1. **Las animaciones tienen propósito:** revelan, no decoran
2. **Respetan `prefers-reduced-motion`:** siempre
3. **Son fluidas, no abruptas:** ease-out sobre ease-in para entradas
4. **La duración comunica peso:** elementos pequeños = más rápido; secciones completas = más lento

### Tokens de Duración

```css
--duration-instant:  100ms
--duration-fast:     200ms
--duration-normal:   350ms
--duration-slow:     500ms
--duration-slower:   800ms
--duration-slowest:  1200ms
--duration-cinematic: 2000ms
```

### Curvas de Easing

```css
/* Para la mayoría de UI */
--ease-out:     cubic-bezier(0.22, 1, 0.36, 1)        /* Snappy, natural */
--ease-in-out:  cubic-bezier(0.65, 0, 0.35, 1)        /* Suave entrada y salida */
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1)     /* Rebote sutil (spring) */
--ease-cinematic: cubic-bezier(0.25, 0.1, 0.25, 1)    /* Cinematográfico */

/* Para transiciones de página */
--ease-page:    cubic-bezier(0.76, 0, 0.24, 1)        /* Dramático */
```

### Presets Framer Motion

```typescript
// Reveal de texto — caracteres o palabras
export const textReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.05,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

// Fade up — para cards, secciones
export const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

// Scale in — para elementos de acento
export const scaleIn = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
  }
}

// Transición de página — cortina
export const pageTransition = {
  initial: { clipPath: "inset(0 0 100% 0)" },
  animate: { clipPath: "inset(0 0 0% 0)" },
  exit:    { clipPath: "inset(100% 0 0% 0)" },
  transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
}

// Stagger container
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Blob morphing — formas orgánicas en hero
export const blobMorph = {
  animate: {
    borderRadius: [
      "60% 40% 30% 70% / 60% 30% 70% 40%",
      "30% 60% 70% 40% / 50% 60% 30% 60%",
      "60% 40% 30% 70% / 60% 30% 70% 40%"
    ],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}
```

### Reducción de Movimiento

```typescript
// Hook que respeta prefers-reduced-motion
export const useReducedMotion = () => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

// Todos los presets se verifican con este hook antes de aplicarse
```

---

## 8. Texturas y Efectos

### Ruido (Noise Texture)
Un SVG de ruido generado via CSS se aplica como `pseudo-elemento` en el body y en secciones específicas. Opacidad: 2-4%. Esto da esa sensación "analógica" y artesanal.

```css
.noise-overlay::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise */
  opacity: 0.025;
  pointer-events: none;
  z-index: 9999;
}
```

### Bordes Rasgados (Torn Paper)
Los divisores entre secciones usan un SVG de borde irregular que simula papel rasgado. Diferentes variantes para cada sección.

### Blobs Decorativos
Formas orgánicas animadas con `borderRadius` morphing. Son elementos puramente decorativos que dan profundidad al layout. Usados principalmente en el hero y secciones de servicios.

### Grain en Imágenes
Las imágenes de Cloudinary incluyen un filtro CSS `mix-blend-mode: multiply` con una textura de grano encima para integrarse mejor con la paleta editorial.

---

## 9. Componentes de UI — Especificaciones

### Botones

```
Variante Primary (CTA principal):
  Background: var(--color-rust)
  Text:       var(--color-text-inverse)
  Padding:    12px 28px
  Radius:     var(--radius-pill)
  Hover:      scale(1.03) + shadow-rust
  Active:     scale(0.97)

Variante Secondary (acciones secundarias):
  Background: transparent
  Border:     2px solid var(--color-text-primary)
  Text:       var(--color-text-primary)
  Hover:      Background var(--color-text-primary) + text inverse

Variante Ghost (navegación, links):
  Background: transparent
  Text:       var(--color-text-primary)
  Underline:  animado desde centro en hover
```

### Cards de Proyecto

```
Background:  var(--color-bg-accent)
Border:      1px solid var(--color-border)
Radius:      var(--radius-card)
Shadow:      var(--shadow-md)
Overflow:    hidden
Hover:       translateY(-8px) + shadow-lg + scale sutil en imagen
Aspect:      16:9 para imagen, contenido libre debajo
```

### Tags / Etiquetas

```
Background:  var(--color-bg-secondary)
Border:      1px solid var(--color-border)
Text:        var(--font-mono), var(--text-label-sm), var(--tracking-widest)
Uppercase:   true
Padding:     4px 12px
Radius:      var(--radius-pill)
```

### FloatingNav (Navegación)

```
Position:    fixed, bottom: 32px, centered
Background:  rgba(var(--color-bg-dark), 0.85) + backdrop-blur(12px)
Border:      1px solid rgba(255,255,255,0.1)
Radius:      var(--radius-pill)
Padding:     8px 16px
Items:       icon + label (label visible en hover/active)
Active:      item tiene fondo var(--color-rust) + scale
Transition:  width animado (se expande al hover)
```

### AudioPlayerMini

```
Position:    fixed, bottom: 96px (encima de nav), right: 24px
Background:  var(--color-bg-dark) + backdrop-blur
Width:       collapsed: 48px (solo play) / expanded: 280px
Radius:      var(--radius-xl)
Animation:   slide-in desde derecha al cargar
```

---

## 10. Grid & Layout

### Contenedor Principal

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--section-padding-x);
}
```

### Grid de 12 Columnas

Usando CSS Grid nativo + Tailwind:

```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-6);
}
```

### Layouts por Sección

```
Hero:           Asimétrico — texto: 7 cols / visual: 5 cols
                En móvil: stack vertical, visual primero (visual-first)

Services:       3 cols iguales en desktop / 1 col en móvil
                Cards con altura variable (patchwork)

Portfolio Grid: Masonry visual — 2 cols asimétricas en desktop
                Cards de distintos tamaños que encajan

About:          2 cols — foto: 4 cols / texto: 8 cols

Contact:        2 cols iguales
```

---

## 11. Identidad Visual por Sección

Cada sección tiene un **color de acento dominante** que define su mood:

| Sección | Acento Dominante | Mood |
|---------|-----------------|------|
| Home / Hero | Sage + Gold | Bienvenida, calidez, artesanal |
| Videojuegos | Sky + Dark | Inmersión, digital, aventura |
| Foley | Rust + Cream | Textura, detalle, analógico |
| Proyectos Alternativos | Lavender + Rose | Creatividad, indie, libertad |
| About | Sage + Cream | Personal, auténtico |
| Contact | Rust | Acción, energía |

---

## 12. Iconografía

- **Librería:** Lucide React (ya en el proyecto, consistente y limpia)
- **Estilo:** `strokeWidth={1}` (delgado, editorial)
- **Tamaños:** 16px (inline), 20px (UI), 24px (navigation), 32px (feature)
- **Íconos custom:** Para elementos muy específicos (nota musical, ondas de audio), se crean como SVG components
- **NO usar:** Font Awesome, Material Icons (demasiado genéricos)

---

## 13. Responsive Breakpoints

```typescript
// tailwind.config.ts
screens: {
  xs:  '375px',   // iPhone SE
  sm:  '640px',   // Móvil grande / landscape
  md:  '768px',   // Tablet
  lg:  '1024px',  // Laptop
  xl:  '1280px',  // Desktop
  '2xl': '1536px' // Wide
}
```

### Mobile-First Philosophy

Todo se diseña primero para 375px y escala hacia arriba. Las animaciones pesadas (partículas, blobs complejos) se desactivan o simplifican en `xs/sm`.

---

## 14. Modo Multi-Cliente

El `ThemeProvider` lee `clients/{CLIENT_ID}/theme.json` al arrancar y aplica cada token como CSS custom property en `document.documentElement`:

```typescript
// Proceso de carga de tema
function applyTheme(theme: ThemeConfig) {
  const root = document.documentElement
  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value)
  })
  Object.entries(theme.fonts).forEach(([key, value]) => {
    root.style.setProperty(`--font-${key}`, value)
  })
  // ... etc
}
```

Los estilos de Tailwind **siempre referencian las custom properties**, nunca valores hardcodeados:

```typescript
// tailwind.config.ts
colors: {
  'bg-primary':  'var(--color-bg-primary)',
  'sage':        'var(--color-sage)',
  'rust':        'var(--color-rust)',
  // ...
}
```

Este patrón garantiza que cambiar el `theme.json` cambia visualmente todo el sitio sin tocar CSS.
