import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useModalKeyboard } from '@/hooks/elementModal/useModalKeyBoard'
import { elements } from '@/data/elements/elements'

const HookHarness = ({
  selected,
  close,
  prev,
  next,
}: {
  selected: (typeof elements)[number] | null
  close: () => void
  prev: () => void
  next: () => void
}) => {
  useModalKeyboard({
    selectedElement: selected,
    close,
    navigatePrev: prev,
    navigateNext: next,
  })

  return null
}

describe('useModalKeyboard', () => {
  it('ignores keyboard shortcuts when modal is closed', () => {
    const close = vi.fn()
    const prev = vi.fn()
    const next = vi.fn()

    render(<HookHarness selected={null} close={close} prev={prev} next={next} />)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))

    expect(close).not.toHaveBeenCalled()
    expect(prev).not.toHaveBeenCalled()
    expect(next).not.toHaveBeenCalled()
  })

  it('routes Escape and arrow keys while modal is open', () => {
    const close = vi.fn()
    const prev = vi.fn()
    const next = vi.fn()

    render(<HookHarness selected={elements[0]} close={close} prev={prev} next={next} />)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))

    expect(close).toHaveBeenCalledTimes(1)
    expect(prev).toHaveBeenCalledTimes(1)
    expect(next).toHaveBeenCalledTimes(1)
  })
})
