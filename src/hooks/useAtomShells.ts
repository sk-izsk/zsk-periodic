import type { Element } from '@/data/elements/elements'
import { configToShells } from '@/utils/atomModel'
import { useMemo } from 'react'

export const useAtomShells = (element: Element): number[] =>
  useMemo(() => configToShells(element.config), [element.config])
