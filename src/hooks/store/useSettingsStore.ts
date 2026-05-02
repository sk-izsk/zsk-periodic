import { useMassUnitStore } from '@/stores/massUnitStore'

export const useMassUnit = () => useMassUnitStore((s) => s.massUnit)
export const useSetMassUnit = () => useMassUnitStore((s) => s.setMassUnit)
