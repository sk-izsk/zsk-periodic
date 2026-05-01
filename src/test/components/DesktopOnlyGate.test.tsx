import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { DESKTOP_MIN_WIDTH, DesktopOnlyGate } from '@/components/DesktopOnlyGate'

const resizeTo = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  })
  window.dispatchEvent(new Event('resize'))
}

describe('DesktopOnlyGate', () => {
  afterEach(() => {
    resizeTo(DESKTOP_MIN_WIDTH)
  })

  it('shows the desktop recommendation below the supported width', () => {
    resizeTo(900)

    render(
      <DesktopOnlyGate>
        <div>Full ZTable app</div>
      </DesktopOnlyGate>,
    )

    expect(screen.getByText('Use a larger screen')).toBeInTheDocument()
    expect(screen.queryByText('Full ZTable app')).not.toBeInTheDocument()
  })

  it('renders app content at the supported width', () => {
    resizeTo(DESKTOP_MIN_WIDTH)

    render(
      <DesktopOnlyGate>
        <div>Full ZTable app</div>
      </DesktopOnlyGate>,
    )

    expect(screen.getByText('Full ZTable app')).toBeInTheDocument()
    expect(screen.queryByText('Use a larger screen')).not.toBeInTheDocument()
  })
})
