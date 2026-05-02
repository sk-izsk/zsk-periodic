import { parseChemicalFormula } from '@/utils/chemistry'
import { elementsBySymbol } from '@/data/elements/elements'

export interface MolarMassResult {
  total: number
  breakdown: { element: string; count: number; mass: number; contribution: number }[]
  error?: string
}

const MAX_RESULT_CACHE_SIZE = 200
const resultCache = new Map<string, MolarMassResult>()

const rememberResult = (key: string, result: MolarMassResult): void => {
  if (resultCache.has(key)) {
    resultCache.delete(key)
  } else if (resultCache.size >= MAX_RESULT_CACHE_SIZE) {
    const oldestKey = resultCache.keys().next().value
    if (oldestKey) {
      resultCache.delete(oldestKey)
    }
  }

  resultCache.set(key, result)
}

export const calcMolarMass = (formula: string): MolarMassResult => {
  const key = formula.trim()
  const cached = resultCache.get(key)
  if (cached) {
    rememberResult(key, cached)
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

  rememberResult(key, result)
  return result
}
