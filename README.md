# Portfolio — Amir Rojas Bellido

Personal portfolio built with [Astro](https://astro.build) and pnpm.

## Stack

- **Framework**: Astro 6
- **Styles**: Vanilla CSS with design tokens
- **Fonts**: Geist + JetBrains Mono (Google Fonts)
- **Package manager**: pnpm

## Commands

Run from the project root:

| Command        | Action                                   |
| :------------- | :--------------------------------------- |
| `pnpm dev`     | Start dev server at `localhost:4321`     |
| `pnpm build`   | Build for production to `./dist/`        |
| `pnpm preview` | Preview the production build locally     |

## Project structure

```
src/
├── layouts/
│   └── BaseLayout.astro   # Base layout (title prop + slot)
├── pages/
│   └── index.astro        # Home page
└── styles/
    └── global.css         # CSS tokens and base styles
```
