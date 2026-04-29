# Zperiod — Interactive Periodic Table

Full-stack recreation of zperiod.app built from scratch with Next.js 14, TypeScript, and Tailwind.

## Features

- **Periodic table** — all 118 elements, color-coded by category, click for full detail panel
- **3D atom models** — interactive Three.js/R3F electron shell models for every element
- **Ions** — 50+ common cations and anions with charges and molar masses
- **Tools** — equation balancer (Gaussian elimination), molar mass calculator, solubility table
- **Worksheet generator** — PDF export with adjustable difficulty, reaction types, answer key
- **Dark mode** — full dark/light theme toggle
- **Search & filter** — search by name/symbol/number, filter by element category

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Zustand** — global state (selected element, filters, theme)
- **Three.js + @react-three/fiber** — 3D atom models
- **jsPDF** — client-side PDF worksheet generation
- **Framer Motion** — micro-animations

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
zperiod/
├── app/
│   ├── page.tsx          # Periodic table
│   ├── ions/page.tsx     # Ions
│   ├── tools/page.tsx    # Chemistry tools
│   └── worksheet/page.tsx
├── components/
│   ├── Nav.tsx
│   ├── table/
│   │   ├── PeriodicTable.tsx
│   │   ├── ElementCell.tsx
│   │   └── ElementDetail.tsx
│   ├── atoms/
│   │   └── AtomModel.tsx   # Three.js 3D model
│   └── tools/
│       ├── EquationBalancer.tsx
│       ├── MolarMassCalc.tsx
│       └── SolubilityTable.tsx
└── lib/
    ├── elements.ts     # Full 118-element dataset + types
    ├── store.ts        # Zustand store
    ├── balancer.ts     # Equation balancing algorithm
    ├── molarMass.ts    # Molar mass calculator
    └── worksheet.ts    # PDF generator
```

## Extending

- Add element detail pages at `app/element/[n]/page.tsx`
- Add virtual lab at `app/tools/lab/page.tsx` using Canvas API
- Add i18n with `next-intl` (language files go in `messages/`)
- Add `app/element/[n]/page.tsx` for deep-linked element URLs

# zsk-periodic

# zsk-periodic
