import { style, styleVariants } from '@vanilla-extract/css'

export const swatch = style({
  width: 8,
  height: 8,
  borderRadius: 2,
  display: 'inline-block',
})

export const swatchCategory = styleVariants({
  alkali: { background: '#c0392b' },
  alkaline: { background: '#d35400' },
  transition: { background: '#2980b9' },
  post: { background: '#7f8c8d' },
  metalloid: { background: '#16a085' },
  nonmetal: { background: '#27ae60' },
  halogen: { background: '#8e44ad' },
  noble: { background: '#148f77' },
  lanthanide: { background: '#d68910' },
  actinide: { background: '#cb4335' },
})

export const gridWrap = style({
  width: 'fit-content',
  margin: '0 auto',
  paddingRight: 18,
})

export const mainGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(18, 68px)',
  gridTemplateRows: 'repeat(7, 74px)',
  gap: 6,
  minWidth: 1334,
})

export const position = styleVariants(
  Object.fromEntries(
    Array.from({ length: 7 }, (_, rowIndex) =>
      Array.from({ length: 18 }, (_, colIndex) => {
        const row = rowIndex + 1
        const col = colIndex + 1
        return [`r${row}c${col}`, { gridRow: row, gridColumn: col }]
      }),
    ).flat(),
  ) as Record<string, { gridRow: number; gridColumn: number }>,
)

export const placeholder = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const placeholderLabel = style({
  fontSize: 9,
  color: 'var(--color-muted)',
})

export const seriesWrap = style({
  marginTop: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
})

export const seriesRow = style({
  display: 'flex',
  gap: 6,
  paddingLeft: 148,
})
