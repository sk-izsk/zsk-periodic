import { useEffect, useState } from 'react'

const getInitialMatch = (query: string, fallback = false) => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return fallback
  }

  return window.matchMedia(query).matches
}

export const useMediaQuery = (query: string, fallback = false) => {
  const [matches, setMatches] = useState(() => getInitialMatch(query, fallback))

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return
    }

    const mediaQuery = window.matchMedia(query)
    const updateMatch = () => setMatches(mediaQuery.matches)

    updateMatch()
    mediaQuery.addEventListener('change', updateMatch)

    return () => mediaQuery.removeEventListener('change', updateMatch)
  }, [query])

  return matches
}
