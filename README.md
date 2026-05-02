# ZTable

ZTable is a frontend-heavy chemistry platform built to handle both rich visuals and computation-heavy workflows in a browser environment.

It includes a searchable 118-element periodic table, detailed element views, a 3D atom model, ion references, molar mass tools, equation balancing, solubility lookup, and worksheet generation.

## Live demo and sample

- Deployed app: https://zsk-periodic.vercel.app

![ZTable sample](./sample.gif)

## Quick impact

- Product depth: more than a static table; this is a multi-tool chemistry learning and utility app.
- Performance mindset: expensive chemistry calculations are isolated from render paths, and repeated work is cached.
- Advanced frontend scope: combines modern React architecture with 3D graphics, state management, i18n, and build-time optimization.
- Maintainability: folder structure and feature boundaries support ongoing extension and refactoring.

## Tech stack

- Runtime and tooling: Bun, Vite, TypeScript, React Compiler
- UI: React 19, Tailwind CSS, vanilla-extract, Framer Motion
- Routing: TanStack Router (lazy route loading and code splitting)
- State: Zustand + selector hooks + persisted preferences
- 3D and graphics: Three.js, React Three Fiber, Drei
- Internationalization: zsk-react-i18n
- PDF generation: jspdf (worksheet export)
- Quality: Vitest, Testing Library, oxlint, oxfmt

## Technical deep dive&#x20;

### 1) Heavy calculations without blocking UI

- Equation balancing uses exact BigInt fraction arithmetic and nullspace solving, which is robust for complex equations.
- Balancing runs in a Web Worker to keep the main thread responsive while users interact with the UI.
- Molar mass logic reuses shared formula parsing and applies result caching to reduce duplicate compute.

### 2) 3D graphics architecture that scales

- Atom rendering is decomposed into focused parts (scene, nucleus, shells, controls, and frame hooks) rather than one large component.
- Geometry and material caches are used to avoid repeated GPU object creation during interactive use.
- Animation responsibilities are hook-driven (`useFrame` in focused hooks), keeping render components cleaner and easier to test.

### 3) Render-path and bundle optimization

- Periodic table cells are memoized with a custom comparator to reduce unnecessary rerenders in dense grid layouts.
- Zustand selector hooks keep component subscriptions granular, so updates only affect consumers of changed state.
- Routes and expensive views are lazy-loaded; chunking isolates larger dependencies (3D stack, PDF tooling, i18n) for better startup behavior.

### 4) Efficient structure and separation of concerns

```text
src/
  AppProviders.tsx       # root providers + document-level theme/language sync
  components/            # reusable and feature-scoped UI pieces
  data/                  # element, ion, isotope, and chemistry datasets
  hooks/                 # behavior hooks, including graphics and worker orchestration
  hooks/atomModel/       # per-frame animation hooks for atom scene geometry
  hooks/store/           # narrow Zustand selector hooks for render efficiency
  i18n/                  # localization config, loaders, and locale resources
  routes/                # TanStack Router route entries
  screens/               # route-level screens
  stores/                # global store creation and persistence wiring
  test/                  # Vitest + Testing Library unit and component tests
  types/                 # shared TS contracts
  utils/                 # pure logic: chemistry math, parsing, adapters, helpers
  workers/               # Web Worker entry points for heavy compute
```

This structure keeps UI rendering, domain logic, and background compute concerns separate, which improves scalability and contributor onboarding.

## Scripts

```Shell
bun install
bun run start
bun run test
bun run typecheck
bun run build
bun run lint:check
bun run fmt:check
```

## Notes

- The app is desktop-first because the periodic table and atom modal need spatial room.
- Generated router files stay generated. The home route remains at `src/routes/index.tsx` per TanStack Router file conventions.

## Credit

This project is based on the original `zperiod` project by zhilips:
<https://github.com/zhilips/zperiod>

## AI collaboration and workflow

This project uses AI as a force multiplier for delivery speed, while keeping engineering judgment and final quality control human-owned.

- AI-assisted boilerplate: used for repetitive scaffolding such as component shells, route patterns, and typed utility starting points.
- AI-assisted planning: used to compare refactor options, sequence implementation steps, and evaluate architecture tradeoffs.
- AI-assisted math workflows: used to help draft and cross-check parts of mathematical chemistry logic along with original source (for example equation-balancing setup, fraction-math flow, and edge-case handling) before manual verification.
- AI-assisted review: used for quick static review passes, edge-case brainstorming, and performance-risk discovery.
- Human-owned decisions: final architecture, chemistry logic, optimization strategy, and acceptance decisions were validated manually.
- Quality gates: generated output was treated as draft material and verified through build, tests, linting, and direct code review before adoption.

This highlights not only frontend capability, but also practical AI engineering maturity: using AI to accelerate delivery without compromising correctness, performance, or maintainability.
