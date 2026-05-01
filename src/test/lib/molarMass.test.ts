import { describe, expect, it } from 'vitest'
import { calcMolarMass } from '@/lib/molarMass'

describe('calcMolarMass', () => {
  it('calculates a common molecular mass with element breakdown', () => {
    const result = calcMolarMass('H2O')

    expect(result.error).toBeUndefined()
    expect(result.total).toBe(18.016)
    expect(result.breakdown).toEqual([
      { element: 'H', count: 2, mass: 1.008, contribution: 2.016 },
      { element: 'O', count: 1, mass: 16, contribution: 16 },
    ])
  })

  it('handles grouped formulas', () => {
    const result = calcMolarMass('Ca(OH)2')

    expect(result.error).toBeUndefined()
    expect(result.total).toBe(74.096)
    expect(result.breakdown).toEqual([
      { element: 'Ca', count: 1, mass: 40.08, contribution: 40.08 },
      { element: 'O', count: 2, mass: 16, contribution: 32 },
      { element: 'H', count: 2, mass: 1.008, contribution: 2.016 },
    ])
  })

  it('reports unknown element symbols without throwing', () => {
    expect(calcMolarMass('Xx2')).toEqual({
      total: 0,
      breakdown: [],
      error: 'Unknown element "Xx".',
    })
  })
})
