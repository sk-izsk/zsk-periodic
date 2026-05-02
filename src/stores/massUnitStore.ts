import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type MassUnit = 'highSchool' | 'universityConventional'

interface MassUnitStore {
  massUnit: MassUnit
  setMassUnit: (unit: MassUnit) => void
}

export const useMassUnitStore = create<MassUnitStore>()(
  persist(
    (set) => ({
      massUnit: 'highSchool',
      setMassUnit: (unit) => set({ massUnit: unit }),
    }),
    { name: 'zperiod_mass_unit_v1' },
  ),
)
