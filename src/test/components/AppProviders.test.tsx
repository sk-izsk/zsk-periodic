import { act, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { AppProviders } from '@/components/providers/AppProviders'
import { useAppStore } from '@/lib/store'

describe('AppProviders', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
    document.documentElement.lang = ''
    useAppStore.setState({ darkMode: false, language: 'en' })
  })

  afterEach(() => {
    document.documentElement.className = ''
    document.documentElement.lang = ''
  })

  it('renders children through the localization provider', () => {
    render(
      <AppProviders>
        <span>Provider child</span>
      </AppProviders>,
    )

    expect(screen.getByText('Provider child')).toBeInTheDocument()
  })

  it('syncs theme and language store values to the document root', async () => {
    render(
      <AppProviders>
        <span>Provider child</span>
      </AppProviders>,
    )

    await waitFor(() => {
      expect(document.documentElement).not.toHaveClass('dark')
      expect(document.documentElement).toHaveAttribute('lang', 'en')
    })

    act(() => {
      useAppStore.getState().toggleDarkMode()
      useAppStore.getState().setLanguage('fr')
    })

    await waitFor(() => {
      expect(document.documentElement).toHaveClass('dark')
      expect(document.documentElement).toHaveAttribute('lang', 'fr')
    })
  })
})
