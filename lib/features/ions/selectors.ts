import type { IonRecord, IonSection } from './types';

export function sectionOrder(): IonSection[] {
  return ['basic', 'core', 'trans', 'special'];
}

export function groupIonsBySection(data: IonRecord[]): Record<IonSection, IonRecord[]> {
  return data.reduce(
    (acc, ion) => {
      acc[ion.section].push(ion);
      return acc;
    },
    {
      basic: [],
      core: [],
      trans: [],
      special: [],
    } as Record<IonSection, IonRecord[]>
  );
}
