import { ELEMENT_L3_DATA } from '@/lib/element-l3-data';
import type { Element } from '@/lib/elements';
import type { ElementLocaleRecord } from '@/lib/i18n/types';
import { KEY_RADIOACTIVE_MASS_NUMBERS, STABLE_MASS_NUMBERS } from '@/lib/isotopes';
import type { ElementProfile } from './types';

const VALENCE_BY_GROUP: Record<number, string> = {
  1: '1',
  2: '2',
  13: '3',
  14: '4',
  15: '5',
  16: '6',
  17: '7',
  18: '8',
};

const COMMON_OXIDATION_BY_CATEGORY: Record<string, string[]> = {
  alkali: ['+1'],
  alkaline: ['+2'],
  halogen: ['-1', '+1', '+5', '+7'],
  noble: ['0'],
  nonmetal: ['-3', '-2', '-1', '+4', '+6'],
  transition: ['+2', '+3'],
  post: ['+1', '+3'],
  metalloid: ['+3', '+4'],
  lanthanide: ['+3'],
  actinide: ['+3', '+4', '+5'],
};

function formatMass(mass: number) {
  return mass.toFixed(3).replace(/\.000$/, '');
}

function formatNullable(value: number | null, unit: string) {
  if (value == null) return 'N/A';
  return `${value}${unit}`;
}

function inferBlock(config: string): string {
  // Scan all orbitals present in the config (after noble gas core) for highest angular momentum
  const norm = config.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, (c) =>
    ({ '⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9' }[c] ?? c)
  );
  if (/\df\d/.test(norm)) return 'f';
  if (/\dd\d/.test(norm)) return 'd';
  if (/\dp\d/.test(norm)) return 'p';
  return 's';
}

function inferIons(el: Element): string {
  const common = COMMON_OXIDATION_BY_CATEGORY[el.cat] ?? [];
  if (common.length === 0) return 'No common ions';
  return common.map((state) => `${el.sym}${state}`).join(', ');
}

function displayGroup(el: Element): number | null {
  if (el.group != null) return el.group;
  if (el.cat === 'lanthanide' || el.cat === 'actinide') return 3;
  return null;
}

function pickCommonIons(el: Element, locale?: ElementLocaleRecord): string {
  const localeIons = locale?.ions?.trim();
  const hasLocaleIons = Boolean(localeIons);
  const localeSuppressesIons = localeIons === 'No common ions';
  const preferInferredForFBlock = (el.cat === 'lanthanide' || el.cat === 'actinide') && localeSuppressesIons;

  if (!hasLocaleIons || preferInferredForFBlock) {
    return inferIons(el);
  }

  return localeIons as string;
}

export function toElementProfile(
  el: Element,
  locale?: ElementLocaleRecord
): ElementProfile {
  const group = displayGroup(el);
  const l3 = ELEMENT_L3_DATA[el.n];

  return {
    id: el.n,
    symbol: el.sym,
    name: locale?.name ?? el.name,
    category: el.cat,
    period: el.period,
    group,
    phaseAtSTP: el.phase,
    electronConfiguration: el.config,
    raw: el,
    level1: {
      type: el.cat,
      groupPeriod: `${group ?? '-'} / ${el.period}`,
      phaseAtSTP: el.phase,
      valenceElectrons: group ? VALENCE_BY_GROUP[group] ?? 'Variable' : 'Variable',
      electronBlock: inferBlock(el.config),
      commonIons: pickCommonIons(el, locale),
    },
    level2: {
      mass: {
        highSchool: formatMass(el.mass),
        universityConventional: formatMass(el.mass),
      },
      protons: el.n,
      electronsNeutral: el.n,
      isotopes: (() => {
        const stableMasses = STABLE_MASS_NUMBERS[el.n] ?? [];
        const hasStableMasses = stableMasses.length > 0;
        const masses = hasStableMasses
          ? stableMasses
          : (KEY_RADIOACTIVE_MASS_NUMBERS[el.n] ?? []);
        if (masses.length === 0) {
          return [{ name: `${el.sym}-${Math.round(el.mass)}`, neutron: `${Math.max(0, Math.round(el.mass) - el.n)}n`, percent: 'Radioactive' }];
        }
        return masses.map((m) => ({
          name: `${el.sym}-${m}`,
          neutron: `${m - el.n}n`,
          percent: hasStableMasses ? 'Stable' : 'Radioactive/Trace',
        }));
      })(),
    },
    level3: {
      electronic: {
        configuration: el.config,
        oxidationStates: {
          common: l3?.oxidationStates.common ?? COMMON_OXIDATION_BY_CATEGORY[el.cat] ?? [],
          possible: l3?.oxidationStates.possible ?? [],
        },
      },
      physical: {
        electronegativity: l3?.physical.electronegativity ?? (el.en != null ? String(el.en) : 'N/A'),
        firstIonization: l3?.physical.firstIonization ?? 'N/A',
        density: l3?.physical.density ?? formatNullable(el.density, ' g/cm3'),
        meltingPoint: l3?.physical.meltingPoint ?? formatNullable(el.mp, ' degC'),
        boilingPoint: l3?.physical.boilingPoint ?? formatNullable(el.bp, ' degC'),
        electronAffinity: l3?.physical.electronAffinity ?? 'N/A',
        atomicRadius: l3?.physical.atomicRadius ?? 'N/A',
        specificHeat: l3?.physical.specificHeat ?? 'N/A',
      },
    },
    level4: {
      history: {
        discoveryYear: el.discovered ? String(el.discovered) : locale?.history?.discoveryYear ?? 'Unknown',
        discoveredBy: el.discoveredBy ?? locale?.history?.discoveredBy ?? 'Unknown',
        namedBy: locale?.history?.namedBy ?? 'Unknown',
      },
      stseContext: locale?.stse ?? ['Chemistry education context'],
      uses: locale?.uses ?? ['Educational reference'],
      hazards: locale?.hazards ?? ['Refer to standard material safety data'],
    },
  };
}
