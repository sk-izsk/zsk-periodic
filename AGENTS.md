<claude-mem-context>
# Memory Context

# \[zperiod] recent context, 2026-04-30 10:42pm EDT

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security\_alert 🔐security\_note
Format: ID TIME TYPE TITLE
Fetch details: get\_observations(\[IDs]) | Search: mem-search skill

Stats: 44 obs (14,490t read) | 632,845t work | 98% savings

### Apr 28, 2026

1 3:40p 🔵 zperiod Project Structure — Next.js Chemistry App
2 3:41p 🔵 PeriodicTable Uses Fixed Pixel Grid — Root Cause of Non-Full-Screen Layout
3 " ✅ PeriodicTable Refactored to Full-Screen Fluid Layout
4 3:42p 🔵 Next.js Dev Server Returns 404 on Root Route After Start
5 4:24p ✅ Reverted Changes in zperiod Project
6 4:25p 🔄 PeriodicTable Layout Switched from Fluid to Fixed-Size Scrollable Grid
S3 Revert PeriodicTable layout changes in zperiod project (Apr 28 at 4:25 PM)
S2 PeriodicTable Layout Switched from Fluid to Fixed-Size Scrollable Grid (Apr 28 at 4:25 PM)

### Apr 30, 2026

7 8:40p 🔵 zperiod Project Structure Mapped
8 8:41p 🔵 AtomModel.tsx Architecture Fully Mapped
9 " 🔵 zperiod Zustand Store: Persisted Global State Shape
10 " 🔵 link:check Script Broken — oxlint Flag Unsupported
11 8:42p 🔵 Production Build Succeeds with Large Bundle Warning
12 " 🔵 Code Quality Audit: Known any, Math.random, and dangerouslySetInnerHTML Usages
13 " 🔵 i18n Locale Architecture: Lazy-Loaded with In-Memory Cache
14 8:43p 🔵 oxlint Audit: 2 Warnings, 0 Errors
15 " 🔵 README.md is Stale — Still Documents Next.js App Router Structure
16 " 🔵 ElementModal URL↔State Bidirectional Sync Architecture
17 " 🔵 Codebase Size Distribution — Largest Files Identified
18 " 🔵 toElementProfile Adapter: highSchool and universityConventional Mass Are Identical
19 " 🔵 Dark Mode and RTL Theming Applied on Document Root
20 " 🔵 Worksheet Library Lazy-Loaded; Molar Mass Parser Has Known Nested-Paren Limitation
S4 Refactor zperiod periodic table app: fix chemistry logic, split AtomModel, optimize components, prune to English/French only (Apr 30 at 8:44 PM)
21 8:52p 🔵 User owns zsk-react-i18n npm package on GitHub
22 8:53p 🔵 zsk-react-i18n npm package details confirmed for potential zperiod integration
23 " 🔵 zsk-react-i18n internal API fully inspected: factory pattern with typed DeepKeys translation
24 " ✅ zsk-react-i18n installed and driver.js/matter-js/marked removed from zperiod
25 " 🔵 zperiod package.json current dependency snapshot + @types/matter-js leftover discovered
26 " 🔵 French UI translations missing proper Unicode accents throughout
27 8:54p ✅ Language support pruned to English/French and zsk-react-i18n wired into new localize.tsx
28 " ✅ AppProviders wired to LocalizeProvider and zustand language state synced to i18next
29 " 🔄 Nav.tsx migrated from imperative t(language, key) to hook-based useAppTranslation()
30 " 🔄 SettingScreen migrated to useAppTranslation and dangerouslySetInnerHTML removed from changelog
31 8:55p ✅ 18 non-English/French locale files deleted and @types/matter-js devDependency removed
32 " 🟣 New src/utils/chemistry.ts created with robust formula parser and math utilities
33 " 🔄 src/lib/molarMass.ts rewritten to use parseChemicalFormula and add result caching
34 " 🔄 src/lib/balancer.ts deleted ahead of rewrite using shared chemistry utilities
35 8:56p 🟣 Equation balancer rewritten using bigint fraction arithmetic and RREF nullspace solving
36 " 🟣 Equation balancer moved off main thread via Web Worker and useEquationBalancer hook
37 " 🔄 EquationBalancer.tsx wired to useEquationBalancer hook with pending UI state
38 8:57p 🔵 New chemistry utilities verified correct with smoke tests for molar mass and equation balancing
39 " 🔄 ElementCell wrapped in React.memo with custom comparator to prevent unnecessary re-renders
40 " 🔄 PeriodicTable.tsx optimized with granular store subscriptions, useMemo matching, and O(1) grid lookup
41 " 🔄 IonScreen memoized groupIonsBySection and sectionOrder with empty-dep useMemo
42 8:58p 🔄 src/utils/atomModel.ts created: extracted pure logic and Three.js geometry/material cache from AtomModel.tsx
43 8:59p 🔴 buildParticleKinds fixed: Array.sort with unstable seed replaced with proper Fisher-Yates shuffle
44 " 🟣 useAtomShells hook created to memoize electron shell configuration parsing per element

Access 633k tokens of past work via get\_observations(\[IDs]) or mem-search skill. </claude-mem-context>
