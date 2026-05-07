import { style, styleVariants } from '@vanilla-extract/css'

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

export const mobileSheet = style({
  width: 'min(100%, 480px)',
  height: 'min(100dvh - 20px, 900px)',
  borderRadius: 30,
  overflow: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
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

export const leftPanelMobile = style({
  width: '100%',
  flex: 1,
  minHeight: 0,
})

export const leftPanelTone = styleVariants({
  dark: { borderRight: '1px solid var(--color-border)' },
  light: { borderRight: '1px solid #e8e4de' },
})

export const header = style({
  padding: '24px 42px 18px',
  flexShrink: 0,
})

export const headerCompact = style({
  padding: '18px 20px 14px',
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

export const headerGridCompact = style({
  gap: 10,
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

export const isotopeStackCompact = style({
  fontSize: 18,
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

export const symbolCompact = style({
  fontSize: 46,
})

export const name = style({
  justifySelf: 'end',
  fontSize: 38,
  fontWeight: 800,
  color: 'var(--color-text)',
})

export const nameCompact = style({
  fontSize: 24,
})

export const cardArea = style({
  flex: 1,
  overflow: 'hidden',
  padding: '16px 42px 20px',
  position: 'relative',
})

export const mobileCardArea = style({
  padding: '0 0 16px',
})

export const cardViewport = style({
  position: 'relative',
  height: '100%',
  overflow: 'hidden',
})

export const mobileCardViewport = style({
  flex: 1,
  minHeight: 0,
  padding: '12px 0 0',
  overflow: 'visible',
})

export const animatedCard = style({
  height: '100%',
  position: 'absolute',
  inset: 0,
})

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
  minHeight: 0,
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

export const mobileChrome = style({
  padding: '18px 16px 14px',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  position: 'relative',
})

export const mobileChromeTone = styleVariants({
  dark: {
    background: 'linear-gradient(180deg, rgba(6,16,21,0.98), rgba(10,20,26,0.92))',
    borderBottom: '1px solid var(--color-border)',
  },
  light: {
    background: 'linear-gradient(180deg, rgba(251,250,247,0.98), rgba(246,243,237,0.94))',
    borderBottom: '1px solid #e8e4de',
  },
})

export const mobileCloseButton = style({
  position: 'absolute',
  top: 16,
  right: 16,
  zIndex: 2,
})

export const mobileBody = style({
  flex: 1,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
})

export const mobileDetailsPanel = style({
  flex: 1,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
})
