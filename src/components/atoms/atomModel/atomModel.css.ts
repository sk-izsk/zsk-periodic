import { style, styleVariants } from '@vanilla-extract/css'

export const root = style({
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
})

export const rootSize = styleVariants({
  fill: { height: '100%', borderRadius: 0 },
  fixed: { height: 320, borderRadius: 12 },
})

export const rootTone = styleVariants({
  dark: { background: '#061015' },
  light: { background: '#eaf3f8' },
})

export const glow = style({
  position: 'absolute',
  inset: 0,
  pointerEvents: 'none',
  background:
    'radial-gradient(circle at 52% 42%, rgba(255,255,255,0.54), transparent 27rem), radial-gradient(circle at 70% 68%, rgba(135,177,204,0.24), transparent 20rem)',
  zIndex: 0,
})

export const topPill = style({
  position: 'absolute',
  top: 10,
  zIndex: 10,
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  borderRadius: 999,
  padding: '4px 13px',
  fontSize: 12,
  fontFamily: 'monospace',
  letterSpacing: '0.03em',
  pointerEvents: 'none',
})

export const configPill = style({
  left: 12,
})

export const isotopePill = style({
  padding: '4px 12px',
})

export const pillTone = styleVariants({
  light: {
    background: 'rgba(255,255,255,0.74)',
    border: '1px solid rgba(0,0,0,0.12)',
    color: '#10151d',
  },
  dark: {
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.18)',
    color: '#f9fbff',
  },
  isotopeDark: {
    background: 'rgba(34,211,238,0.16)',
    border: '1px solid rgba(34,211,238,0.35)',
    color: '#f9fbff',
  },
})

export const shellHint = style({
  position: 'absolute',
  bottom: 12,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  borderRadius: 10,
  padding: '5px 14px',
  fontSize: 12,
  pointerEvents: 'none',
  whiteSpace: 'nowrap',
})

export const shellHintTone = styleVariants({
  light: {
    background: 'rgba(255,255,255,0.65)',
    border: '1px solid rgba(0,0,0,0.1)',
    color: '#10151d',
  },
  dark: {
    background: 'rgba(0,0,0,0.45)',
    border: '1px solid rgba(255,255,255,0.18)',
    color: '#f9fbff',
  },
})

export const canvas = style({
  width: '100%',
  height: '100%',
  position: 'relative',
  zIndex: 1,
})

export const footer = style({
  textAlign: 'center',
  padding: '7px 0',
  fontSize: 11,
  color: '#888',
  fontFamily: 'monospace',
})
