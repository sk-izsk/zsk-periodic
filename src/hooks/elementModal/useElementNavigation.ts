import type { Element } from '@/data/elements/elements'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useCallback, useEffect, useRef } from 'react'
import { elements } from '../../data/elements/elements'
import { normalizeElementSearchParam } from '../../utils/elementModalUtils'

interface UseElementNavigationProps {
  selectedElement: Element | null
  setSelectedElement: (el: Element | null) => void
}

export const useElementNavigation = ({
  selectedElement,
  setSelectedElement,
}: UseElementNavigationProps) => {
  const search = useSearch({ from: '__root__' })
  const navigate = useNavigate({ from: '/' })
  const closingRef = useRef(false)

  // URL param → store
  useEffect(() => {
    const elementSearch = normalizeElementSearchParam(search.element)
    if (!elementSearch) {
      closingRef.current = false
      return
    }
    if (closingRef.current) {
      return
    }
    const matched = elements.find(
      (el) =>
        el.sym.toLowerCase() === elementSearch.toLowerCase() || String(el.n) === elementSearch,
    )
    if (matched && matched !== selectedElement) {
      setSelectedElement(matched)
    }
  }, [search.element, selectedElement, setSelectedElement])

  // Store → URL param
  useEffect(() => {
    if (!selectedElement) {
      return
    }
    void navigate({ search: { element: selectedElement.sym }, replace: true })
  }, [navigate, selectedElement])

  const currentIndex = selectedElement ? elements.findIndex((el) => el.n === selectedElement.n) : -1
  const hasPrev = currentIndex > 0
  const hasNext = currentIndex >= 0 && currentIndex < elements.length - 1

  const close = useCallback(() => {
    closingRef.current = true
    setSelectedElement(null)
    void navigate({ to: '/', search: {}, replace: true })
  }, [navigate, setSelectedElement])

  const navigatePrev = useCallback(() => {
    if (hasPrev) {
      setSelectedElement(elements[currentIndex - 1])
    }
  }, [currentIndex, hasPrev, setSelectedElement])

  const navigateNext = useCallback(() => {
    if (hasNext) {
      setSelectedElement(elements[currentIndex + 1])
    }
  }, [currentIndex, hasNext, setSelectedElement])

  return { close, navigatePrev, navigateNext, hasPrev, hasNext }
}
