import { parseChemicalFormula } from '@/utils/chemistry'
import { elementsBySymbol } from './elements'

export interface MolarMassResult {
  total: number
  breakdown: { element: string; count: number; mass: number; contribution: number }[]
  error?: string
}

const resultCache = new Map<string, MolarMassResult>()

export const calcMolarMass = (formula: string): MolarMassResult => {
  const key = formula.trim()
  const cached = resultCache.get(key)
  if (cached) {
    return cached
  }

  const parsed = parseChemicalFormula(key)
  if (!parsed.ok) {
    return { total: 0, breakdown: [], error: parsed.error }
  }

  const breakdown: MolarMassResult['breakdown'] = []
  let total = 0

  for (const [symbol, count] of Object.entries(parsed.counts)) {
    const element = elementsBySymbol[symbol]
    if (!element) {
      return { total: 0, breakdown: [], error: `Unknown element "${symbol}".` }
    }

    const contribution = element.mass * count
    total += contribution
    breakdown.push({
      element: symbol,
      count,
      mass: element.mass,
      contribution,
    })
  }

  const result = {
    total: Number(total.toFixed(4)),
    breakdown,
  }

  resultCache.set(key, result)
  return result
}
