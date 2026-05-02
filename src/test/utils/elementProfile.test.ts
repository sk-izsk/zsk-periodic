import { describe, expect, it } from 'vitest'
import { elementsBySymbol } from '@/data/elements/elements'
import { toElementProfile } from '@/utils/elementProfile'

describe('toElementProfile isotopes', () => {
  it('exposes numeric isotope data for atom model nucleus selection', () => {
    const carbon = toElementProfile(elementsBySymbol.C)

    expect(carbon.level2.isotopes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'C-12',
          massNumber: 12,
          neutronCount: 6,
          neutron: '6n',
          percent: 'Stable',
        }),
        expect.objectContaining({
          name: 'C-14',
          massNumber: 14,
          neutronCount: 8,
          neutron: '8n',
          percent: 'Radioactive',
        }),
      ]),
    )
  })
})
