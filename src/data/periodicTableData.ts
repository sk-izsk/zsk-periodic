import {
  CATEGORY_LABELS,
  type Element,
  type ElementCategory,
  elements,
} from '@/data/elements/elements'

export const GRID: Record<number, { row: number; col: number }> = {}

elements.forEach((element) => {
  if (
    !element.group ||
    (element.n >= 58 && element.n <= 71) ||
    (element.n >= 90 && element.n <= 103)
  ) {
    return
  }
  GRID[element.n] = { row: element.period, col: element.group }
})

export const MAIN_ELEMENTS = elements.filter((element) => GRID[element.n])
export const LANTHANIDES = elements.filter((element) => element.n >= 57 && element.n <= 71)
export const ACTINIDES = elements.filter((element) => element.n >= 89 && element.n <= 103)
export const MAIN_BY_POSITION = new Map(
  MAIN_ELEMENTS.map((element) => [`${GRID[element.n].row},${GRID[element.n].col}`, element]),
)
export const CATEGORY_ENTRIES = Object.entries(CATEGORY_LABELS) as [ElementCategory, string][]

export type PeriodicGridCell =
  | { kind: 'element'; key: string; row: number; col: number; element: Element }
  | { kind: 'placeholder'; key: string; row: number; col: number; label?: string }

export const MAIN_GRID_CELLS: PeriodicGridCell[] = Array.from({ length: 7 }, (_, rowIndex) =>
  Array.from({ length: 18 }, (_, columnIndex): PeriodicGridCell => {
    const row = rowIndex + 1
    const col = columnIndex + 1
    const element = MAIN_BY_POSITION.get(`${row},${col}`)

    if (element) {
      return { kind: 'element', key: String(element.n), row, col, element }
    }

    const label =
      (row === 6 || row === 7) && col === 3 ? (row === 6 ? '57-71' : '89-103') : undefined
    return { kind: 'placeholder', key: `${row}-${col}`, row, col, label }
  }),
).flat()
