import { style, styleVariants } from '@vanilla-extract/css'

export const resultCell = style({
  display: 'inline-block',
  width: 24,
  lineHeight: '24px',
  borderRadius: 4,
  fontSize: 10,
  fontWeight: 500,
})

export const resultCode = styleVariants({
  S: { background: '#22c55e33', color: '#22c55e' },
  I: { background: '#ef444433', color: '#ef4444' },
  Sl: { background: '#f59e0b33', color: '#f59e0b' },
  D: { background: '#8b5cf633', color: '#8b5cf6' },
})
