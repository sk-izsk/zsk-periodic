import { describe, expect, it } from 'vitest'
import { balanceEquation } from '@/utils/balancer'

describe('balanceEquation', () => {
  it('balances combustion equations', () => {
    expect(balanceEquation('C2H6 + O2 -> CO2 + H2O')).toEqual({
      balanced: '2C2H6 + 7O2 → 4CO2 + 6H2O',
      coefficients: [2, 7, 4, 6],
    })
  })

  it('balances equations containing grouped formulas', () => {
    expect(balanceEquation('Ca(OH)2 + H3PO4 -> Ca3(PO4)2 + H2O')).toEqual({
      balanced: '3Ca(OH)2 + 2H3PO4 → Ca3(PO4)2 + 6H2O',
      coefficients: [3, 2, 1, 6],
    })
  })

  it('returns validation errors for malformed equations', () => {
    expect(balanceEquation('H2 + O2')).toEqual({
      error: 'Use -> to separate reactants and products.',
    })
    expect(balanceEquation(' -> H2O')).toEqual({
      error: 'Both sides of the equation need at least one compound.',
    })
    expect(balanceEquation('H2 + -> H2O')).toEqual({
      error: 'Remove empty compounds around plus signs.',
    })
  })
})
