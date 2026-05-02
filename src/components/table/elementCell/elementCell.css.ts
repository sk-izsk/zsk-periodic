import { style, styleVariants } from '@vanilla-extract/css'

export const cell = style({
  width: 68,
  height: 74,
  minWidth: 68,
  borderRadius: 8,
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

export const number = style({
  fontSize: 10,
  color: 'rgba(255,255,255,.8)',
  alignSelf: 'flex-start',
  paddingLeft: 6,
  lineHeight: 1,
})

export const symbol = style({
  fontSize: 36,
  fontWeight: 650,
  color: '#fff',
  lineHeight: 1.05,
})

export const name = style({
  fontSize: 9,
  color: 'rgba(255,255,255,.85)',
  lineHeight: 1,
  overflow: 'hidden',
  maxWidth: 64,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  marginTop: 2,
})
