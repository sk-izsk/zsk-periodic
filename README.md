# ZTable

ZTable is browser-based chemistry app built with React, Vite, and Bun. It combines interactive reference content with heavier compute features like equation balancing, molar mass parsing, worksheet export, and 3D atom visualization.

It includes:
- searchable 118-element periodic table
- element detail modal with multi-level cards
- 3D atom model with isotope-aware nucleus counts
- ion reference screen
- molar mass calculator
- equation balancer running in Web Worker
- solubility lookup
- worksheet generation and PDF export

## Live demo

- App: https://zsk-periodic.vercel.app

![ZTable sample](./sample.gif)

## Stack

- Runtime and package manager: Bun
- App/build: React 19, TypeScript, Vite
- Styling: Tailwind CSS, vanilla-extract, Framer Motion
- Routing: TanStack Router with lazy route loading
- State: Zustand with granular selector hooks and persisted preferences
- 3D: Three.js, React Three Fiber, Drei
- i18n: `zsk-react-i18n`
- PDF export: `jspdf`
- Quality: Vitest, Testing Library, oxlint, oxfmt

## Current architecture

### Heavy compute off main render path

- Equation balancing uses exact fraction math and nullspace solving.
- Balancing runs in `src/workers/equationBalancer.worker.ts`.
- Molar mass and formula parsing share `src/utils/chemistry.ts`.

### Render and bundle control

- Route screens lazy-load through TanStack Router.
- Atom modal now lazy-loads behind `ElementModalHost`, so startup path does not pull modal code until needed.
- Periodic table cells use memoization and granular Zustand subscriptions to avoid broad rerenders.
- Large feature stacks like Three.js and PDF tooling stay in separate chunks.

### Data pipeline

Raw chemistry datasets now live in JSON:
- [src/data/elements/elements.json](src/data/elements/elements.json)
- [src/data/elements/element-l3-data.json](src/data/elements/element-l3-data.json)

Typed schema lives in:
- [src/data/elements/schema.ts](src/data/elements/schema.ts)

Generated wrapper modules:
- [src/data/elements/elements.ts](src/data/elements/elements.ts)
- [src/data/elements/element-l3-data.ts](src/data/elements/element-l3-data.ts)

Validation and generation scripts:
- [scripts/validate-element-data.mjs](scripts/validate-element-data.mjs)
- [scripts/generate-element-modules.mjs](scripts/generate-element-modules.mjs)

This keeps raw data diffable and easy to audit, while preserving typed imports in app code.

### Project layout

```text
src/
  AppProviders.tsx
  components/
  data/
    elements/           # JSON source data + generated typed wrappers
    ions/
  hooks/
  i18n/
  routes/               # file-based route entries
  screens/              # lazy-loaded route screens
  stores/
  test/
  types/
  utils/
  workers/
scripts/
  validate-element-data.mjs
  generate-element-modules.mjs
```

## Routes

- `/` periodic table
- `/tools` chemistry tools
- `/ions` ion reference
- `/worksheet` worksheet generator
- `/settings` app settings

## Local development

```sh
bun install
bun run start
```

Default checks:

```sh
bun run test
bun run typecheck
bun run lint:check
bun run build
```

## Scripts

```sh
bun run start         # dev server
bun run test          # vitest run
bun run test:watch    # vitest watch mode
bun run data:check    # validate raw JSON datasets
bun run data:generate # regenerate typed element wrapper modules
bun run data:prepare  # validate + regenerate wrappers
bun run typecheck     # data prepare + TypeScript
bun run lint:check    # oxlint
bun run fmt:check     # oxfmt check
bun run build         # data prepare + production build
```

Note:
- Use `bun run test`, not plain `bun test`. Repo test suite depends on Vitest + jsdom.

## Deployment

Vercel-safe build path is already encoded in `package.json`:
- validates JSON element data
- regenerates typed wrapper modules
- runs TypeScript build
- runs Vite production build

No separate database or build-time service required.

## Notes

- App is desktop-first, though major flows have mobile handling.
- Generated router files like `src/routeTree.gen.ts` should not be edited manually.
- Generated data wrapper files should not be edited manually; regenerate them from JSON instead.

## Credit

This project is based on original `zperiod` project by zhilips:
<https://github.com/zhilips/zperiod>

## AI collaboration

AI was used as delivery multiplier, not source of truth.

- Used for refactor planning, repetitive scaffolding, review passes, and implementation acceleration.
- Chemistry logic, performance-sensitive code, data-shape decisions, and final acceptance stayed human-verified.
- Generated output was validated with tests, linting, typecheck, and production builds before adoption.
