# ZTable

Interactive periodic table and chemistry toolkit built with Vite, React, TypeScript, TanStack Router, Tailwind, Zustand, and Three.js.

## Features

- Periodic table for all 118 elements
- Element detail modal with level-based chemistry data
- Lazy-loaded 3D atom model
- Common ions reference
- Equation balancer, molar mass calculator, and solubility table
- Worksheet PDF generator
- English and French UI language support
- Dark and light theme

## Scripts

```bash
bun install
bun run start
bun run build
bun run typecheck
bun run lint:check
bun run fmt:check
```

## Structure

```text
src/
  components/
    atoms/AtomModel/     # Three.js atom renderer split into scene parts
    modal/               # element modal cards and controls
    table/               # periodic table cells and grid
    tools/               # chemistry tools
  hooks/                 # reusable React hooks
  lib/                   # app data, store, i18n setup, chemistry feature adapters
  routes/                # TanStack Router routes
  screens/               # route screens
  utils/                 # non-React utility logic
  workers/               # Web Worker entry points
```
