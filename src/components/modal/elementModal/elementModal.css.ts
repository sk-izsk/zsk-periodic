import { keyframes, style, styleVariants } from '@vanilla-extract/css'

const hintBounce = keyframes({
  '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
  '45%': { transform: 'translateX(-50%) translateY(5px)' },
})

export const backdrop = style({
  position: 'fixed',
  inset: 0,
  zIndex: 50,
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
})

export const backdropTone = styleVariants({
  dark: { background: 'rgba(2,8,12,0.68)' },
  light: {
    background:
      'linear-gradient(135deg, rgba(244,236,229,0.72), rgba(218,233,239,0.62), rgba(247,214,208,0.5))',
  },
})

export const stage = style({
  position: 'fixed',
  inset: 0,
  zIndex: 51,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  pointerEvents: 'auto',
})

export const modal = style({
  pointerEvents: 'auto',
  display: 'flex',
  width: '94vw',
  maxWidth: 1300,
  height: '84vh',
  maxHeight: 760,
  borderRadius: 26,
  overflow: 'hidden',
  position: 'relative',
})

export const modalTone = styleVariants({
  dark: {
    background: 'var(--color-elevated)',
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-panel)',
  },
  light: {
    background: '#fbfaf7',
    border: '1px solid rgba(15,23,42,0.08)',
    boxShadow: '0 34px 90px rgba(88, 65, 52, 0.22), 0 0 0 1px rgba(255,255,255,0.55) inset',
  },
})

export const leftPanel = style({
  width: '39%',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
})

export const leftPanelTone = styleVariants({
  dark: { borderRight: '1px solid var(--color-border)' },
  light: { borderRight: '1px solid #e8e4de' },
})

export const header = style({
  padding: '24px 42px 18px',
  flexShrink: 0,
})

export const headerTone = styleVariants({
  dark: {
    background: 'var(--color-surface)',
    borderBottom: '1px solid var(--color-border)',
  },
  light: {
    background: '#f8f5ef',
    borderBottom: '1px solid #e8e4de',
  },
})

export const headerGrid = style({
  display: 'grid',
  gridTemplateColumns: 'auto auto 1fr',
  alignItems: 'center',
  gap: 14,
})

export const isotopeStack = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 0,
  lineHeight: 1.15,
  fontSize: 28,
  fontWeight: 800,
})

export const isotopeStackTone = styleVariants({
  dark: { color: 'var(--color-muted)' },
  light: { color: '#52627b' },
})

export const symbol = style({
  fontSize: 72,
  fontWeight: 800,
  lineHeight: 0.88,
  color: 'var(--color-text)',
})

export const name = style({
  justifySelf: 'end',
  fontSize: 38,
  fontWeight: 800,
  color: 'var(--color-text)',
})

export const cardArea = style({
  flex: 1,
  overflow: 'hidden',
  padding: '16px 42px 20px',
  position: 'relative',
})

export const cardViewport = style({
  position: 'relative',
  height: '100%',
  overflow: 'hidden',
})

export const animatedCard = style({
  height: '100%',
  position: 'absolute',
  inset: 0,
})

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  overflow: 'hidden',
})

export const cardLevel = styleVariants({
  l1: { background: '#b5c6d8', borderRadius: 22 },
  l2: { background: '#6283c4', borderRadius: 18 },
  l3: { background: '#c8ac5c', borderRadius: 16 },
  l4: { background: '#c86a65', borderRadius: 16 },
})

export const row = style({
  padding: '11px 20px',
  borderBottom: '1px solid rgba(88,103,122,0.14)',
  display: 'grid',
  gridTemplateColumns: 'minmax(96px, 0.82fr) minmax(0, 1.18fr)',
  alignItems: 'center',
  gap: 16,
})

export const rowLast = style({ borderBottom: 'none' })

export const rowLabel = style({
  fontSize: 10,
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
  color: 'rgba(34, 48, 70, 0.56)',
  fontWeight: 700,
})

export const rowValue = style({
  fontSize: 20,
  fontWeight: 800,
  color: '#172236',
  justifySelf: 'end',
  textAlign: 'right',
  overflowWrap: 'anywhere',
})

export const cardBody = style({
  flex: 1,
  padding: '12px 14px 14px',
  minHeight: 0,
})

export const l1Box = style({
  height: '100%',
  background: 'rgba(234, 242, 250, 0.34)',
  border: '1px solid rgba(255,255,255,0.36)',
  borderRadius: 18,
  padding: '13px 12px 14px',
  display: 'flex',
  flexDirection: 'column',
})

export const sectionTitle = style({
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(40, 51, 66, 0.48)',
  textAlign: 'center',
  marginBottom: 8,
  fontWeight: 600,
})

export const ionList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
})

export const emptyIon = style({
  background: 'rgba(245,248,252,0.58)',
  border: '1px solid rgba(255,255,255,0.5)',
  borderRadius: 14,
  padding: '10px 12px',
  fontSize: 14,
  color: 'rgba(20,24,32,0.62)',
  textAlign: 'center',
})

export const ionRow = style({
  background: 'rgba(248,250,252,0.62)',
  border: '1px solid rgba(255,255,255,0.7)',
  borderRadius: 14,
  padding: '13px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const ionNotation = style({ fontWeight: 800, fontSize: 18, color: '#1d2a42' })
export const ionLabel = style({ fontSize: 15, color: 'rgba(35, 48, 70, 0.72)' })

export const statGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
})

export const stat = style({
  textAlign: 'center',
  padding: '10px 4px',
  borderRight: '1px solid rgba(255,255,255,0.1)',
})

export const statValue = style({ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.92)' })
export const statLabel = style({
  fontSize: 9,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.55)',
  marginTop: 2,
})

export const scrollArea = style({ position: 'relative', minHeight: 0, flex: 1 })
export const scrollRegion = style({
  height: '100%',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
})
export const scrollContent = style({ padding: '8px 0 42px' })
export const scrollButton = style({
  position: 'absolute',
  left: '50%',
  bottom: 12,
  width: 34,
  height: 34,
  borderRadius: '50%',
  border: '1px solid rgba(255,255,255,0.62)',
  background: 'rgba(255,255,255,0.18)',
  color: 'rgba(15,23,42,0.68)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 8px 22px rgba(15,23,42,0.12), inset 0 0 0 1px rgba(255,255,255,0.12)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  cursor: 'pointer',
  zIndex: 5,
  animation: `${hintBounce} 1.55s ease-in-out infinite`,
  transition: 'background 160ms ease, color 160ms ease, box-shadow 160ms ease',
  selectors: {
    '&:hover': {
      background: 'rgba(255,255,255,0.3)',
      color: 'rgba(15,23,42,0.86)',
      boxShadow: '0 10px 26px rgba(15,23,42,0.16), inset 0 0 0 1px rgba(255,255,255,0.18)',
    },
    '&:focus-visible': {
      outline: '2px solid rgba(103,232,249,0.75)',
      outlineOffset: 3,
    },
  },
})

export const listHeader = style({
  fontSize: 10,
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.64)',
  padding: '4px 14px 8px',
  fontWeight: 500,
})

export const isotopeButton = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '11px 14px',
  borderBottom: '1px solid rgba(255,255,255,0.07)',
  borderLeft: '3px solid transparent',
  background: 'transparent',
  gap: 4,
  width: '100%',
  cursor: 'pointer',
  textAlign: 'left',
})

export const isotopeButtonSelected = style({
  borderLeft: '3px solid #67e8f9',
  background: 'rgba(103, 232, 249, 0.18)',
})

export const isotopeTop = style({ display: 'flex', alignItems: 'center', gap: 10 })
export const isotopeSymbol = style({
  fontWeight: 800,
  fontSize: 20,
  color: '#ffe16b',
  minWidth: 64,
})
export const isotopeNeutron = style({ fontSize: 15, color: 'rgba(255,255,255,0.82)', flex: 1 })
export const isotopeStatus = style({
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
})
export const isotopeStable = style({ color: '#7affb8' })
export const isotopeRadioactive = style({ color: '#ff9a9a' })
export const isotopeNote = style({ fontSize: 12, color: 'rgba(255,255,255,0.5)', paddingLeft: 74 })

export const l3Box = style({
  height: '100%',
  background: 'rgba(0, 0, 0, 0.22)',
  border: '1px solid rgba(0, 0, 0, 0.18)',
  borderRadius: 16,
  padding: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
})

export const l3Section = style({
  border: '1px solid rgba(0,0,0,0.15)',
  borderRadius: 12,
  padding: '10px 10px 8px',
  background: 'rgba(0, 0, 0, 0.18)',
})

export const l3Title = style({
  fontSize: 10,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.82)',
  marginBottom: 8,
  fontWeight: 600,
})

export const chipWrap = style({ display: 'flex', flexWrap: 'wrap', gap: 6 })
export const chip = style({
  fontSize: 12,
  lineHeight: '18px',
  height: 22,
  minWidth: 30,
  padding: '0 9px',
  borderRadius: 999,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#eaf4ff',
  fontWeight: 600,
})
export const chipKind = styleVariants({
  common: {
    border: '1px solid rgba(69, 153, 245, 0.55)',
    background: 'rgba(34, 120, 216, 0.55)',
    fontWeight: 700,
  },
  possible: { border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(148, 168, 189, 0.2)' },
})

export const metricGrid = style({
  border: '1px solid rgba(0,0,0,0.15)',
  borderRadius: 12,
  padding: '12px 10px',
  background: 'rgba(0, 0, 0, 0.18)',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '10px 12px',
  flex: 1,
  alignContent: 'start',
})

export const metric = style({ borderLeft: '1px solid rgba(255, 255, 255, 0.45)', paddingLeft: 10 })
export const metricLabel = style({
  fontSize: 10,
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.7)',
  marginBottom: 3,
  fontWeight: 600,
})
export const metricValue = style({ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 700 })

export const l4Section = style({
  padding: '10px 14px',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
})
export const l4SectionLast = style({ borderBottom: 'none' })
export const l4Value = style({ fontSize: 12, color: 'rgba(255,255,255,0.88)' })

export const dotNav = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 7,
  padding: '10px 0',
  flexShrink: 0,
})
export const dotNavTone = styleVariants({
  dark: { borderTop: '1px solid var(--color-border)' },
  light: { borderTop: '1px solid #e8e4de' },
})
export const dotButton = style({
  width: 24,
  height: 24,
  borderRadius: '50%',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg2)',
  color: 'var(--color-muted)',
  fontSize: 14,
  lineHeight: '22px',
  textAlign: 'center',
  padding: 0,
})
export const dotButtonDisabled = style({ cursor: 'not-allowed', opacity: 0.35 })
export const dotButtonEnabled = style({ cursor: 'pointer', opacity: 0.9 })
export const dot = style({
  width: 8,
  height: 8,
  borderRadius: '50%',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  transition: 'all 0.2s',
  background: 'var(--color-muted)',
  opacity: 0.3,
})
export const dotActive = style({ opacity: 1, transform: 'scale(1.3)' })
export const dotLevel = styleVariants({
  l1: { background: '#b5c6d8' },
  l2: { background: '#6283c4' },
  l3: { background: '#c8ac5c' },
  l4: { background: '#c86a65' },
})
export const navDivider = style({
  width: 1,
  background: 'var(--color-border)',
  height: 14,
  margin: '0 3px',
  opacity: 0.6,
})
export const lockIcon = style({ opacity: 0.35 })

export const sideNav = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: 56,
  zIndex: 20,
  display: 'flex',
  alignItems: 'center',
})
export const sideNavPrev = style({ left: 0, justifyContent: 'flex-start', paddingLeft: 8 })
export const sideNavNext = style({ right: 0, justifyContent: 'flex-end', paddingRight: 8 })
export const sideButton = style({
  width: 32,
  height: 48,
  borderRadius: 8,
  border: '1px solid rgba(128,128,128,0.25)',
  background: 'rgba(0,0,0,0.45)',
  color: '#fff',
  fontSize: 20,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
})

export const atomPanel = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
})
export const atomTone = styleVariants({
  dark: { background: '#061015' },
  light: { background: '#eaf3f8' },
})
export const closeButton = style({
  position: 'absolute',
  top: 12,
  right: 12,
  zIndex: 120,
  pointerEvents: 'auto',
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  cursor: 'pointer',
  fontSize: 20,
  color: 'var(--color-text)',
  lineHeight: 1,
})
export const closeTone = styleVariants({
  dark: { background: 'var(--color-surface)', border: '1px solid var(--color-border)' },
  light: { background: 'rgba(255,255,255,0.72)', border: '1px solid rgba(15,23,42,0.08)' },
})
export const atomCanvasWrap = style({ flex: 1, overflow: 'hidden', position: 'relative' })
export const atomCanvasInner = style({ position: 'absolute', inset: 0 })
export const atomFallback = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'var(--color-bg2)',
  color: 'var(--color-muted)',
  fontSize: 12,
  fontFamily: 'monospace',
})
export const bottomControls = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 14px',
  flexShrink: 0,
})
export const bottomTone = styleVariants({
  dark: { borderTop: '1px solid var(--color-border)', background: 'var(--color-elevated)' },
  light: { borderTop: '1px solid #e8e4de', background: '#fbfaf7' },
})
export const controlGroup = style({ display: 'flex', gap: 8 })
export const controlButton = style({
  width: 32,
  height: 32,
  borderRadius: '50%',
  border: '1px solid var(--color-border)',
  background: 'var(--color-bg2)',
  color: 'var(--color-muted)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
})
export const controlActive = style({
  background: 'rgba(100,120,180,0.25)',
  color: 'var(--color-text)',
})
