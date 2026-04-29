---

name: design-system-zperiod-interactive-periodic-table-118-elements-
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.

---

<!-- TYPEUI_SH_MANAGED_START -->

# Zperiod: Interactive Periodic Table (118 Elements, 3D Atom Models)

## Mission

Deliver implementation-ready design-system guidance for Zperiod: Interactive Periodic Table (118 Elements, 3D Atom Models) that can be applied consistently across dashboard web app interfaces.

## Brand

- Product/brand: Zperiod: Interactive Periodic Table (118 Elements, 3D Atom Models)
- URL: <https://zperiod.app/>
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations

- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=Inter`, `font.family.stack=Inter, -apple-system, sans-serif`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=normal`
- Typography scale: `font.size.xs=12px`, `font.size.sm=12.48px`, `font.size.md=13px`, `font.size.lg=13.12px`, `font.size.xl=13.28px`, `font.size.2xl=13.33px`, `font.size.3xl=13.6px`, `font.size.4xl=13.76px`
- Color palette: `color.text.primary=#5d522e`, `color.text.secondary=#5d2e2e`, `color.text.tertiary=#5d3a2e`, `color.text.inverse=#2f3136`, `color.border.default=#000000`, `color.surface.muted=#fff2cc`, `color.surface.raised=#ffffff`, `color.surface.strong=#fce4d6`, `color.border.strong=#5d544f`
- Spacing scale: `space.1=1.81px`, `space.2=4px`, `space.3=8px`, `space.4=10px`, `space.5=12px`, `space.6=13px`, `space.7=14px`, `space.8=16px`
- Radius/shadow/motion tokens: `radius.xs=7px`, `radius.sm=10px`, `radius.md=15px`, `radius.lg=18px`, `radius.xl=28px`, `radius.2xl=50px`, `radius.step7=999px` | `shadow.1=rgba(0, 0, 0, 0.1) 0px 0px 0px 1px inset`, `shadow.2=rgba(0, 0, 0, 0.04) 0px 0.5px 1px 0px`, `shadow.3=rgba(0, 0, 0, 0.02) 0px 4px 15px 0px`, `shadow.4=rgba(0, 0, 0, 0.1) 0px 1px 3px 0px` | `motion.duration.instant=150ms`, `motion.duration.fast=180ms`, `motion.duration.normal=200ms`, `motion.duration.slow=250ms`, `motion.duration.slower=300ms`

## Accessibility

- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone

concise, confident, implementation-focused

## Rules: Do

- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't

- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow

1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure

- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations

- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates

- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
