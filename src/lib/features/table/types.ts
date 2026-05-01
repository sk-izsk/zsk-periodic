import type { Element, ElementCategory, Phase } from '@/lib/elements'

export type DetailLevel = 'l1' | 'l2' | 'l3' | 'l4'

export type ElementMass = {
  highSchool: string
  universityConventional: string | null
}

export type ElementIsotope = {
  name: string
  massNumber: number
  neutronCount: number
  neutron: string
  percent: string
  note?: string
}

export type ElementProfile = {
  id: number
  symbol: string
  name: string
  category: ElementCategory
  period: number
  group: number | null
  phaseAtSTP: Phase
  electronConfiguration: string
  raw: Element
  level1: {
    type: string
    groupPeriod: string
    phaseAtSTP: string
    valenceElectrons: string
    electronBlock: string
    commonIons: string
  }
  level2: {
    mass: ElementMass
    protons: number
    electronsNeutral: number
    isotopes: ElementIsotope[]
  }
  level3: {
    electronic: {
      configuration: string
      oxidationStates: {
        common: string[]
        possible: string[]
      }
    }
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
  level4: {
    history: {
      discoveryYear: string
      discoveredBy: string
      namedBy: string
    }
    stseContext: string[]
    uses: string[]
    hazards: string[]
  }
}
