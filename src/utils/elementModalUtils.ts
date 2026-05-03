import type { DetailLevel, ElementProfile } from '@/types/elementProfile'

const SUP_DIGITS: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
}

const SUPS: Record<string, string> = {
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
}

const ROMAN: Record<string, string> = {
  '+1': 'I',
  '+2': 'II',
  '+3': 'III',
  '+4': 'IV',
  '+5': 'V',
  '+6': 'VI',
  '+7': 'VII',
}

export const LEVELS: DetailLevel[] = ['l1', 'l2', 'l3', 'l4']

export const LEVEL_LABELS: Record<DetailLevel, string> = {
  l1: 'Level 1',
  l2: 'Level 2',
  l3: 'Level 3',
  l4: 'Level 4',
}

export const normalizeElementSearchParam = (value: unknown): string | null => {
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    return normalizeElementSearchParam(value[0])
  }
  if (typeof value === 'number') {
    return String(value)
  }
  return null
}

export const toSuperscript = (value: number): string =>
  String(value)
    .split('')
    .map((char) => SUP_DIGITS[char] ?? char)
    .join('')

export const formatIonSymbol = (ionStr: string): string => {
  const match = ionStr.match(/^([A-Za-z]+)([+-])(\d+)?$/)
  if (!match) {
    return ionStr
  }
  const [, symbol, sign, count] = match
  if (!count || count === '1') {
    return `${symbol}${sign === '+' ? '⁺' : '⁻'}`
  }
  return `${symbol}${SUPS[count] ?? count}${sign === '+' ? '⁺' : '⁻'}`
}

export const parseCommonIons = (
  ionStr: string,
  elementName: string,
): { notation: string; label: string }[] => {
  if (!ionStr || ionStr === 'No common ions') {
    return []
  }

  return ionStr.split(', ').map((raw) => {
    const match = raw.match(/^([A-Za-z]+)([+-]\d+)$/)
    if (!match) {
      return { notation: formatIonSymbol(raw), label: '' }
    }

    const charge = match[2]
    return {
      notation: formatIonSymbol(raw),
      label: ROMAN[charge]
        ? `${elementName}(${ROMAN[charge]})`
        : charge.startsWith('-')
          ? `${elementName}ide`
          : elementName,
    }
  })
}

export const getMassValue = (profile: ElementProfile, massUnit: string) =>
  massUnit === 'highSchool'
    ? profile.level2.mass.highSchool
    : (profile.level2.mass.universityConventional ?? profile.level2.mass.highSchool)
