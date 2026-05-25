# Portfolio — Amir Rojas

Mi portfolio personal. Un proyecto doble: una forma de mostrar quién soy y qué construyo, y al mismo tiempo un espacio para aprender Astro desde cero.

No es un CV. Es más un registro de cómo pienso, qué decido y por qué.

---

## Por qué Astro

Elegí Astro porque nunca lo había usado y quería entenderlo de verdad — no solo instalarlo. El resultado: zero JS por defecto, Islands Architecture para hidratar solo lo necesario, y HTML estático que carga rápido sin pelearme con el build.

Cada componente de este proyecto existe porque lo construí mientras lo aprendía.

## Stack

- **Framework**: Astro 6 — static-first, zero JS by default
- **Estilos**: CSS vanilla con design tokens (`--neon-1`, `--fg-dim`, etc.)
- **Tipografía**: Geist + JetBrains Mono + Press Start 2P
- **SEO**: Open Graph, JSON-LD Person schema, canonical URLs
- **Package manager**: pnpm

## Comandos

| Comando        | Acción                                      |
| :------------- | :------------------------------------------ |
| `pnpm dev`     | Servidor de desarrollo en `localhost:4321`  |
| `pnpm build`   | Build de producción en `./dist/`            |
| `pnpm preview` | Preview del build localmente                |

## Estructura

```
src/
├── components/
│   ├── Hero.astro                        # Sección principal con grid de fondo y CTAs
│   ├── Nav.astro                         # Navegación fija con blur + anchor scroll
│   ├── About.astro                       # Grid asimétrico + typewriter animation
│   ├── Footer.astro                      # Contact section full-screen
│   └── projects/
│       ├── PortfolioProject.astro        # Sticky scroll — 3 pasos con paneles visuales
│       └── CasaEmpenoProject.astro       # Sticky scroll — stack de cartas animado
├── assets/
│   └── screenshots/                      # hero-preview.png, toxdos-dash.png
├── layouts/
│   └── BaseLayout.astro                  # Layout base con SEO (OG, JSON-LD, canonical)
├── pages/
│   └── index.astro                       # SPA — Hero → About → Projects → Contact
└── styles/
    └── global.css                        # Tokens de diseño, scroll-behavior, base
```

## Arquitectura — SPA con anchor scroll

El portfolio es una Single Page Application con scroll lineal. No hay rutas adicionales.
La navegación del Nav usa `href="#section-id"` con `scroll-behavior: smooth` en el `html`.

```
Hero → About → PortfolioProject → CasaEmpenoProject → Footer (Contact)
```

Cada sección tiene `scroll-margin-top: 60px` para compensar el nav fijo.

## Animaciones

Las secciones de proyectos usan scroll-driven animations con `position: sticky`:

- **PortfolioProject**: 320vh de altura con panel fade. El JS calcula el progreso de scroll dentro del pin y activa los pasos (Research → Decision → Result) cambiando clases CSS.
- **CasaEmpenoProject**: mismo patrón con stack mechanic — 3 cartas absolutas que se transladan/escalan vía `data-stage` attribute.

### Supresión durante nav scroll

Al hacer click en cualquier `a[href^="#"]`, el Nav agrega la clase `is-nav-scrolling` al elemento `html`. Los componentes de proyecto responden con `:global(html.is-nav-scrolling) .pp-step { transition: none !important }`, eliminando el flicker de animaciones mientras el scroll pasa por las secciones. La clase se remueve con el evento `scrollend` (+ fallback de 400ms).

### Mobile (≤860px)

En mobile se desactiva el JS de scroll tracking (`matchMedia` guard). Los proyectos muestran un layout estático vertical:
- PortfolioProject: 3 paneles en flex column
- CasaEmpenoProject: 3 cartas (`position: relative`, `height: 280px`) apiladas
