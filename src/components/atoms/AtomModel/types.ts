import type { Element } from '@/lib/elements'

export interface AtomModelProps {
  element: Element
  bg?: string
  height?: number
  fill?: boolean
  paused?: boolean
  speed?: number
  topView?: boolean
  resetToken?: number
}
