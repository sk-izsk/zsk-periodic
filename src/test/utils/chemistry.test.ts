import { describe, expect, it } from 'vitest'
import { gcd, lcm, parseChemicalFormula } from '@/utils/chemistry'

describe('parseChemicalFormula', () => {
  it('counts atoms in simple formulas', () => {
    expect(parseChemicalFormula('H2O')).toEqual({
      ok: true,
      counts: { H: 2, O: 1 },
    })
  })

  it('supports nested groups, brackets, and subscript digits', () => {
    expect(parseChemicalFormula('Ca₃(PO₄)₂')).toEqual({
      ok: true,
      counts: { Ca: 3, P: 2, O: 8 },
    })

    expect(parseChemicalFormula('K4[ON(SO3)2]2')).toEqual({
      ok: true,
      counts: { K: 4, O: 14, N: 2, S: 4 },
    })
  })

  it('returns useful parse errors for invalid formulas', () => {
    expect(parseChemicalFormula('')).toEqual({ ok: false, error: 'Formula is empty.' })
    expect(parseChemicalFormula('Mg(OH')).toEqual({ ok: false, error: 'Missing ")" in formula.' })
    expect(parseChemicalFormula('2H')).toEqual({
      ok: false,
      error: 'Invalid token "2" in formula.',
    })
  })
})

describe('integer chemistry helpers', () => {
  it('calculates gcd and lcm with zero and negative inputs', () => {
    expect(gcd(-24, 18)).toBe(6)
    expect(gcd(0, 8)).toBe(8)
    expect(lcm(12, 18)).toBe(36)
    expect(lcm(0, 18)).toBe(0)
  })
})
