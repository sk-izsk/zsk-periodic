import { CATEGORY_COLORS, CATEGORY_LABELS, Element } from '@/lib/elements'
import { toElementProfile } from '@/lib/features/table/adapters'
import type { DetailLevel } from '@/lib/features/table/types'
import { loadElementLocale } from '@/lib/i18n/locale-loaders'
import type { ElementLocaleRecord } from '@/lib/i18n/types'
import { useAppStore } from '@/lib/store'
import { useEffect, useMemo, useState } from 'react'

interface Props {
  element: Element
  onClose: () => void
}

const Prop = ({ label, value }: { label: string; value: string }) => {
  return (
    <div
      className="rounded-lg p-3"
      style={{ background: 'var(--color-bg)', border: '0.5px solid var(--color-border)' }}
    >
      <div style={{ fontSize: 10, color: 'var(--color-muted)', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 500 }}>{value}</div>
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

const ElementDetail = ({ element, onClose }: Props) => {
  const language = useAppStore((s) => s.language)
  const massUnit = useAppStore((s) => s.massUnit)
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
  const color = CATEGORY_COLORS[element.cat]

  const massValue =
    massUnit === 'highSchool'
      ? profile.level2.mass.highSchool
      : (profile.level2.mass.universityConventional ?? profile.level2.mass.highSchool)

  return (
    <div
      className="mt-3 rounded-xl p-4"
      style={{ background: 'var(--color-bg2)', border: '0.5px solid var(--color-border)' }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="rounded-xl flex flex-col items-center justify-center flex-shrink-0"
          style={{ background: color, width: 76, height: 76 }}
        >
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,.8)' }}>{element.n}</span>
          <span style={{ fontSize: 34, fontWeight: 500, color: '#fff', lineHeight: 1 }}>
            {element.sym}
          </span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,.75)' }}>{massValue}</span>
        </div>
        <div className="flex-1">
          <h2 style={{ fontSize: 22, fontWeight: 500 }}>{profile.name}</h2>
          <p style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 2 }}>
            Period {element.period}
            {element.group ? ` · Group ${element.group}` : ''} · {element.phase} @ STP
          </p>
          <span
            className="inline-block mt-2 rounded px-2 py-0.5 text-xs text-white"
            style={{ background: color }}
          >
            {CATEGORY_LABELS[element.cat]}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-sm px-3 py-1 rounded"
          style={{ border: '0.5px solid var(--color-border)', color: 'var(--color-muted)' }}
        >
          close
        </button>
      </div>

      <div className="flex gap-2 mb-3">
        {LEVEL_ORDER.map((item) => (
          <button
            key={item}
            onClick={() => setLevel(item)}
            className="px-3 py-1.5 rounded text-xs"
            style={{
              border: '0.5px solid var(--color-border)',
              background: level === item ? color : 'transparent',
              color: level === item ? '#fff' : 'var(--color-text)',
            }}
          >
            {LEVEL_LABELS[item]}
          </button>
        ))}
      </div>

      {level === 'l1' && (
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}
        >
          <Prop label="Type" value={profile.level1.type} />
          <Prop label="Group / Period" value={profile.level1.groupPeriod} />
          <Prop label="Phase @ STP" value={profile.level1.phaseAtSTP} />
          <Prop label="Valence e-" value={profile.level1.valenceElectrons} />
          <Prop label="Electron block" value={profile.level1.electronBlock} />
          <Prop label="Common ions" value={profile.level1.commonIons} />
        </div>
      )}

      {level === 'l2' && (
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))' }}
        >
          <Prop label="Atomic mass" value={massValue} />
          <Prop label="Protons" value={String(profile.level2.protons)} />
          <Prop label="Electrons (neutral)" value={String(profile.level2.electronsNeutral)} />
          <Prop label="Key isotope" value={profile.level2.isotopes[0]?.name ?? 'N/A'} />
          <Prop label="Neutrons" value={profile.level2.isotopes[0]?.neutron ?? 'N/A'} />
          <Prop label="Status" value={profile.level2.isotopes[0]?.percent ?? 'N/A'} />
        </div>
      )}

      {level === 'l3' && (
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}
        >
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
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))' }}
        >
          <Prop label="Discovery year" value={profile.level4.history.discoveryYear} />
          <Prop label="Discovered by" value={profile.level4.history.discoveredBy} />
          <Prop label="Named by" value={profile.level4.history.namedBy} />
          <Prop label="STSE" value={profile.level4.stseContext.join(' | ')} />
          <Prop label="Common uses" value={profile.level4.uses.join(' | ')} />
          <Prop label="Hazards" value={profile.level4.hazards.join(' | ')} />
        </div>
      )}

      <div
        className="mt-3 rounded-lg px-3 py-2 font-mono text-sm"
        style={{ background: 'var(--color-bg)', border: '0.5px solid var(--color-border)' }}
      >
        Electron configuration: {profile.electronConfiguration}
      </div>
    </div>
  )
}

export { ElementDetail }
