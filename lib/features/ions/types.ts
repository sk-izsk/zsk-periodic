export type IonType = 'Cation' | 'Anion'
export type IonCategory = 'Monatomic' | 'Polyatomic'
export type IonSection = 'basic' | 'core' | 'trans' | 'special'

export type IonRecord = {
  id: string
  formula: string
  name: string
  type: IonType
  category: IonCategory
  section: IonSection
  group: string
  mass: number
}
