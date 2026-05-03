import { keyframes, style, styleVariants } from '@vanilla-extract/css'

const hintBounce = keyframes({
  '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
  '45%': { transform: 'translateX(-50%) translateY(5px)' },
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
