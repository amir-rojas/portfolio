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
- **Tipografía**: Geist + JetBrains Mono
- **SEO**: `@astrojs/sitemap`, Open Graph, canonical URLs
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
│   ├── Hero.astro              # Sección principal con íconos flotantes
│   ├── Nav.astro               # Navegación fija con blur
│   └── ProjectPortfolio.astro  # Sección sticky-scroll — este mismo proyecto
├── layouts/
│   └── BaseLayout.astro        # Layout base con SEO (title, OG, canonical)
├── pages/
│   └── index.astro             # Página principal
└── styles/
    └── global.css              # Tokens de diseño y estilos base
```

## Diseño

Tema oscuro con naranja como acento (`#ff6b35`). La referencia visual está en `design/` — archivos HTML/CSS del mockup original. No se importan al proyecto; son solo referencia.

---

Construido en La Paz, Bolivia.
