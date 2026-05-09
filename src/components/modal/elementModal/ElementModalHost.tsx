import { useSelectedElement } from '@/hooks/store/useTableStore'
import { normalizeElementSearchParam } from '@/utils/elementModalUtils'
import { useSearch } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'

const ElementModal = lazy(() => import('./ElementModal').then((module) => ({ default: module.ElementModal })))

export const ElementModalHost: React.FC = () => {
  const selectedElement = useSelectedElement()
  const search = useSearch({ from: '__root__' })
  const elementSearch = normalizeElementSearchParam(search.element)

  if (!selectedElement && !elementSearch) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <ElementModal />
    </Suspense>
  )
}
