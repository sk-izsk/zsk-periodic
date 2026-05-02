import type { Element } from '@/data/elements/elements'

export interface AtomModelProps {
  element: Element
  bg?: string
  height?: number
  fill?: boolean
  paused?: boolean
  speed?: number
  topView?: boolean
  resetToken?: number
  neutronOverride?: number
  isotopeLabel?: string
}
