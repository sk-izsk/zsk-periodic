import { style, styleVariants } from '@vanilla-extract/css'

export const prop = style({
  background: 'var(--color-bg)',
  border: '0.5px solid var(--color-border)',
})

export const propLabel = style({
  fontSize: 10,
  color: 'var(--color-muted)',
  marginBottom: 2,
})

export const propValue = style({
  fontSize: 14,
  fontWeight: 500,
})

export const panel = style({
  background: 'var(--color-bg2)',
  border: '0.5px solid var(--color-border)',
})

export const tile = style({
  width: 76,
  height: 76,
})

export const category = styleVariants({
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

export const tileNumber = style({
  fontSize: 11,
  color: 'rgba(255,255,255,.8)',
})

export const tileSymbol = style({
  fontSize: 34,
  fontWeight: 500,
  color: '#fff',
  lineHeight: 1,
})

export const tileMass = style({
  fontSize: 10,
  color: 'rgba(255,255,255,.75)',
})

export const title = style({
  fontSize: 22,
  fontWeight: 500,
})

export const meta = style({
  fontSize: 13,
  color: 'var(--color-muted)',
  marginTop: 2,
})

export const closeButton = style({
  border: '0.5px solid var(--color-border)',
  color: 'var(--color-muted)',
})

export const levelButton = style({
  border: '0.5px solid var(--color-border)',
  color: 'var(--color-text)',
})

export const activeLevel = styleVariants({
  alkali: { background: '#c0392b', color: '#fff' },
  alkaline: { background: '#d35400', color: '#fff' },
  transition: { background: '#2980b9', color: '#fff' },
  post: { background: '#7f8c8d', color: '#fff' },
  metalloid: { background: '#16a085', color: '#fff' },
  nonmetal: { background: '#27ae60', color: '#fff' },
  halogen: { background: '#8e44ad', color: '#fff' },
  noble: { background: '#148f77', color: '#fff' },
  lanthanide: { background: '#d68910', color: '#fff' },
  actinide: { background: '#cb4335', color: '#fff' },
})

export const gridSmall = style({
  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
})

export const gridMedium = style({
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
})

export const gridLarge = style({
  gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
})
