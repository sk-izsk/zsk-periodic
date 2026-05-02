import { act, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { AppProviders } from '@/AppProviders'
import { useLanguageStore } from '@/stores/languageStore'
import { useThemeStore } from '@/stores/themeStore'

describe('AppProviders', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
    document.documentElement.lang = ''
    useThemeStore.setState({ darkMode: false })
    useLanguageStore.setState({ language: 'en' })
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
      useThemeStore.getState().toggleDarkMode()
      useLanguageStore.getState().setLanguage('fr')
    })

    await waitFor(() => {
      expect(document.documentElement).toHaveClass('dark')
      expect(document.documentElement).toHaveAttribute('lang', 'fr')
    })
  })
})
