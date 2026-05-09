import { describe, expect, it } from 'vitest'
import { normalizeElementSearchParam } from '@/utils/elementModalUtils'

describe('normalizeElementSearchParam', () => {
  it('keeps strings and numbers', () => {
    expect(normalizeElementSearchParam('He')).toBe('He')
    expect(normalizeElementSearchParam(8)).toBe('8')
  })

  it('unwraps arrays and rejects unsupported values', () => {
    expect(normalizeElementSearchParam(['Fe', 'O'])).toBe('Fe')
    expect(normalizeElementSearchParam(undefined)).toBeNull()
    expect(normalizeElementSearchParam({ element: 'Na' })).toBeNull()
  })
})
