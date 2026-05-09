export type ElementCategory =
  | 'alkali'
  | 'alkaline'
  | 'transition'
  | 'post'
  | 'metalloid'
  | 'nonmetal'
  | 'halogen'
  | 'noble'
  | 'lanthanide'
  | 'actinide'

export type Phase = 'Solid' | 'Liquid' | 'Gas' | 'Unknown'

export interface Element {
  n: number
  sym: string
  name: string
  mass: number
  cat: ElementCategory
  period: number
  group: number | null
  phase: Phase
  config: string
  en: number | null
  mp: number | null
  bp: number | null
  density: number | null
  discovered?: number
  discoveredBy?: string
}

export const CATEGORY_LABELS: Record<ElementCategory, string> = {
  alkali: 'Alkali metal',
  alkaline: 'Alkaline earth',
  transition: 'Transition metal',
  post: 'Post-transition',
  metalloid: 'Metalloid',
  nonmetal: 'Nonmetal',
  halogen: 'Halogen',
  noble: 'Noble gas',
  lanthanide: 'Lanthanide',
  actinide: 'Actinide',
}

export const CATEGORY_COLORS: Record<ElementCategory, string> = {
  alkali: '#c0392b',
  alkaline: '#d35400',
  transition: '#2980b9',
  post: '#7f8c8d',
  metalloid: '#16a085',
  nonmetal: '#27ae60',
  halogen: '#8e44ad',
  noble: '#148f77',
  lanthanide: '#d68910',
  actinide: '#cb4335',
}

export type ElementL3Record = {
  oxidationStates: { common: string[]; possible: string[] }
  physical: {
    electronegativity: string
    firstIonization: string
    density: string
    meltingPoint: string
    boilingPoint: string
    electronAffinity: string
    atomicRadius: string
    specificHeat: string
  }
}
