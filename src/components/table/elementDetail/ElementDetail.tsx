import { CATEGORY_LABELS, Element } from '@/data/elements/elements'
import { useLanguage } from '@/hooks/store/useLanguageStore'
import { useMassUnit } from '@/hooks/store/useSettingsStore'
import { loadElementLocale } from '@/i18n/locale-loaders'
import type { ElementLocaleRecord } from '@/i18n/types'
import type { DetailLevel } from '@/types/elementProfile'
import { toElementProfile } from '@/utils/elementProfile'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import {
  activeLevel,
  category,
  closeButton,
  gridLarge,
  gridMedium,
  gridSmall,
  levelButton,
  meta,
  panel,
  prop,
  propLabel,
  propValue,
  tile,
  tileMass,
  tileNumber,
  tileSymbol,
  title,
} from './elementDetail.css'

interface Props {
  element: Element
  onClose: () => void
}

interface PropProps {
  label: string
  value: string
}

const Prop: React.FC<PropProps> = ({ label, value }) => {
  return (
    <div className={clsx('rounded-lg p-3', prop)}>
      <div className={propLabel}>{label}</div>
      <div className={propValue}>{value}</div>
    </div>
  )
}

const LEVEL_ORDER: DetailLevel[] = ['l1', 'l2', 'l3', 'l4']
const LEVEL_LABELS: Record<DetailLevel, string> = {
  l1: 'Level 1',
  l2: 'Level 2',
  l3: 'Level 3',
  l4: 'Level 4',
}

export const ElementDetail: React.FC<Props> = ({ element, onClose }) => {
  const language = useLanguage()
  const massUnit = useMassUnit()
  const [level, setLevel] = useState<DetailLevel>('l1')
  const [locale, setLocale] = useState<ElementLocaleRecord | undefined>()

  useEffect(() => {
    let mounted = true
    loadElementLocale(language).then((records) => {
      if (!mounted) {
        return
      }
      setLocale(records[String(element.n)])
    })
    return () => {
      mounted = false
    }
  }, [language, element.n])

  const profile = useMemo(() => toElementProfile(element, locale), [element, locale])

  const massValue =
    massUnit === 'highSchool'
      ? profile.level2.mass.highSchool
      : (profile.level2.mass.universityConventional ?? profile.level2.mass.highSchool)

  return (
    <div className={clsx('mt-3 rounded-xl p-4', panel)}>
      <div className="flex items-start gap-4 mb-4">
        <div
          className={clsx(
            'rounded-xl flex flex-col items-center justify-center flex-shrink-0',
            tile,
            category[element.cat],
          )}
        >
          <span className={tileNumber}>{element.n}</span>
          <span className={tileSymbol}>{element.sym}</span>
          <span className={tileMass}>{massValue}</span>
        </div>
        <div className="flex-1">
          <h2 className={title}>{profile.name}</h2>
          <p className={meta}>
            Period {element.period}
            {element.group ? ` · Group ${element.group}` : ''} · {element.phase} @ STP
          </p>
          <span
            className={clsx(
              'inline-block mt-2 rounded px-2 py-0.5 text-xs text-white',
              category[element.cat],
            )}
          >
            {CATEGORY_LABELS[element.cat]}
          </span>
        </div>
        <button onClick={onClose} className={clsx('text-sm px-3 py-1 rounded', closeButton)}>
          close
        </button>
      </div>

      <div className="flex gap-2 mb-3">
        {LEVEL_ORDER.map((item) => (
          <button
            key={item}
            onClick={() => setLevel(item)}
            className={clsx(
              'px-3 py-1.5 rounded text-xs',
              levelButton,
              level === item && activeLevel[element.cat],
            )}
          >
            {LEVEL_LABELS[item]}
          </button>
        ))}
      </div>

      {level === 'l1' && (
        <div className={clsx('grid gap-2', gridSmall)}>
          <Prop label="Type" value={profile.level1.type} />
          <Prop label="Group / Period" value={profile.level1.groupPeriod} />
          <Prop label="Phase @ STP" value={profile.level1.phaseAtSTP} />
          <Prop label="Valence e-" value={profile.level1.valenceElectrons} />
          <Prop label="Electron block" value={profile.level1.electronBlock} />
          <Prop label="Common ions" value={profile.level1.commonIons} />
        </div>
      )}

      {level === 'l2' && (
        <div className={clsx('grid gap-2', gridSmall)}>
          <Prop label="Atomic mass" value={massValue} />
          <Prop label="Protons" value={String(profile.level2.protons)} />
          <Prop label="Electrons (neutral)" value={String(profile.level2.electronsNeutral)} />
          <Prop label="Key isotope" value={profile.level2.isotopes[0]?.name ?? 'N/A'} />
          <Prop label="Neutrons" value={profile.level2.isotopes[0]?.neutron ?? 'N/A'} />
          <Prop label="Status" value={profile.level2.isotopes[0]?.percent ?? 'N/A'} />
        </div>
      )}

      {level === 'l3' && (
        <div className={clsx('grid gap-2', gridMedium)}>
          <Prop label="Configuration" value={profile.level3.electronic.configuration} />
          <Prop
            label="Oxidation"
            value={profile.level3.electronic.oxidationStates.common.join(', ') || 'N/A'}
          />
          <Prop label="Electronegativity" value={profile.level3.physical.electronegativity} />
          <Prop label="Density" value={profile.level3.physical.density} />
          <Prop label="Melting point" value={profile.level3.physical.meltingPoint} />
          <Prop label="Boiling point" value={profile.level3.physical.boilingPoint} />
        </div>
      )}

      {level === 'l4' && (
        <div className={clsx('grid gap-2', gridLarge)}>
          <Prop label="Discovery year" value={profile.level4.history.discoveryYear} />
          <Prop label="Discovered by" value={profile.level4.history.discoveredBy} />
          <Prop label="Named by" value={profile.level4.history.namedBy} />
          <Prop label="STSE" value={profile.level4.stseContext.join(' | ')} />
          <Prop label="Common uses" value={profile.level4.uses.join(' | ')} />
          <Prop label="Hazards" value={profile.level4.hazards.join(' | ')} />
        </div>
      )}

      <div className={clsx('mt-3 rounded-lg px-3 py-2 font-mono text-sm', prop)}>
        Electron configuration: {profile.electronConfiguration}
      </div>
    </div>
  )
}
