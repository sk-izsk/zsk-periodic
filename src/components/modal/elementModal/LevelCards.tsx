import { CATEGORY_LABELS } from '@/data/elements/elements'
import type { ElementIsotope, ElementProfile } from '@/types/elementProfile'
import clsx from 'clsx'
import { CardRow } from './CardRow'
import * as styles from './elementModal.css'
import { getMassValue, parseCommonIons, toSuperscript } from './elementModalUtils'
import { ScrollHintArea } from './ScrollHintArea'

type ModalTranslate = (key: string) => string

const isotopeStatusLabel = (value: string, t: ModalTranslate) => {
  if (value === 'Stable') {
    return t('modal.stable')
  }
  if (value === 'Radioactive/Trace') {
    return t('modal.radioactiveTrace')
  }
  return value
}

const isRadioactive = (value: string) => value.startsWith('Radioactive')

export const L1Card = ({ profile, t }: { profile: ElementProfile; t: ModalTranslate }) => {
  const ions = parseCommonIons(profile.level1.commonIons, profile.name)
  const typeLabel = profile.level1.type || CATEGORY_LABELS[profile.category] || 'Unknown'

  return (
    <div className={clsx(styles.card, styles.cardLevel.l1)}>
      <CardRow label={t('modal.type')} value={typeLabel} />
      <CardRow label={t('modal.groupPeriod')} value={profile.level1.groupPeriod} />
      <CardRow label={t('modal.phaseAtSTP')} value={profile.level1.phaseAtSTP} />
      <CardRow label={t('modal.electronBlock')} value={profile.level1.electronBlock} last />
      <div className={styles.cardBody}>
        <div className={styles.l1Box}>
          <div className={styles.sectionTitle}>{t('modal.commonIons')}</div>
          <div className={styles.ionList}>
            {ions.length === 0 ? (
              <div className={styles.emptyIon}>{t('modal.noCommonIons')}</div>
            ) : (
              ions.slice(0, 4).map((ion) => (
                <div key={`${ion.notation}-${ion.label}`} className={styles.ionRow}>
                  <span className={styles.ionNotation}>{ion.notation}</span>
                  {ion.label && <span className={styles.ionLabel}>{ion.label}</span>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export const L2Card = ({
  profile,
  massUnit,
  selectedIsotope,
  onSelectIsotope,
  t,
}: {
  profile: ElementProfile
  massUnit: string
  selectedIsotope: ElementIsotope | null
  onSelectIsotope: (isotope: ElementIsotope) => void
  t: ModalTranslate
}) => {
  const mass = getMassValue(profile, massUnit)
  const roundedMass = Math.round(parseFloat(profile.level2.mass.highSchool))
  const stats = [
    { label: t('modal.protons'), value: String(profile.level2.protons) },
    { label: t('modal.neutrons'), value: String(roundedMass - profile.level2.protons) },
    { label: t('modal.electrons'), value: String(profile.level2.electronsNeutral) },
  ]

  return (
    <div className={clsx(styles.card, styles.cardLevel.l2)}>
      <CardRow label={t('modal.avgAtomicMass')} value={mass} />
      <CardRow label={t('modal.configuration')} value={profile.electronConfiguration} />
      <CardRow label={t('modal.valenceElectrons')} value={profile.level1.valenceElectrons} />
      <div className={styles.statGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
      <ScrollHintArea>
        <div className={styles.scrollContent}>
          <div className={styles.listHeader}>{t('modal.isotopes')}</div>
          {profile.level2.isotopes.map((isotope) => {
            const selected = selectedIsotope?.name === isotope.name
            return (
              <button
                key={isotope.name}
                type="button"
                onClick={() => onSelectIsotope(isotope)}
                onPointerDown={(event) => event.stopPropagation()}
                onTouchStart={(event) => event.stopPropagation()}
                className={clsx(styles.isotopeButton, selected && styles.isotopeButtonSelected)}
              >
                <div className={styles.isotopeTop}>
                  <span className={styles.isotopeSymbol}>
                    {toSuperscript(isotope.massNumber)}
                    {profile.symbol}
                  </span>
                  <span className={styles.isotopeNeutron}>{isotope.neutron}</span>
                  <span
                    className={clsx(
                      styles.isotopeStatus,
                      isRadioactive(isotope.percent)
                        ? styles.isotopeRadioactive
                        : styles.isotopeStable,
                    )}
                  >
                    {isotopeStatusLabel(isotope.percent, t)}
                  </span>
                </div>
                {isotope.note && <span className={styles.isotopeNote}>{isotope.note}</span>}
              </button>
            )
          })}
        </div>
      </ScrollHintArea>
    </div>
  )
}

export const L3Card = ({ profile, t }: { profile: ElementProfile; t: ModalTranslate }) => {
  const physical = profile.level3.physical
  const electronic = profile.level3.electronic
  const chips = [
    ...electronic.oxidationStates.common.map((state) => ({ state, kind: 'common' as const })),
    ...electronic.oxidationStates.possible.map((state) => ({ state, kind: 'possible' as const })),
  ]
  const metrics = [
    { label: t('modal.firstIonization'), value: physical.firstIonization },
    { label: t('modal.electronAffinity'), value: physical.electronAffinity },
    { label: t('modal.electronegativity'), value: physical.electronegativity },
    { label: t('modal.density'), value: physical.density },
    { label: t('modal.meltingPoint'), value: physical.meltingPoint },
    { label: t('modal.boilingPoint'), value: physical.boilingPoint },
    { label: t('modal.atomicRadius'), value: physical.atomicRadius },
    { label: t('modal.specificHeat'), value: physical.specificHeat },
  ]

  return (
    <div className={clsx(styles.card, styles.cardLevel.l3)}>
      <CardRow label={t('modal.configuration')} value={electronic.configuration} last />
      <div className={styles.cardBody}>
        <div className={styles.l3Box}>
          <div className={styles.l3Section}>
            <div className={styles.l3Title}>{t('modal.oxidationStates')}</div>
            <div className={styles.chipWrap}>
              {chips.length === 0 ? (
                <span className={styles.l4Value}>{t('modal.notAvailable')}</span>
              ) : (
                chips.map((chip, index) => (
                  <span
                    key={`${chip.kind}-${chip.state}-${index}`}
                    className={clsx(styles.chip, styles.chipKind[chip.kind])}
                  >
                    {chip.state}
                  </span>
                ))
              )}
            </div>
          </div>
          <div className={styles.metricGrid}>
            {metrics.map((metric) => (
              <div key={metric.label} className={styles.metric}>
                <div className={styles.metricLabel}>{metric.label}</div>
                <div className={styles.metricValue}>{metric.value || t('modal.notAvailable')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const L4Card = ({ profile, t }: { profile: ElementProfile; t: ModalTranslate }) => {
  const history = profile.level4.history
  const sections = [
    { label: t('modal.uses'), value: profile.level4.uses.join(' · ') },
    { label: t('modal.hazards'), value: profile.level4.hazards.join(' · ') },
    { label: t('modal.stse'), value: profile.level4.stseContext.join(' · ') },
  ].filter((section) => section.value)

  return (
    <div className={clsx(styles.card, styles.cardLevel.l4)}>
      <CardRow label={t('modal.discoveryYear')} value={history.discoveryYear} />
      <CardRow label={t('modal.discoveredBy')} value={history.discoveredBy} />
      <CardRow label={t('modal.namedBy')} value={history.namedBy} last />
      <ScrollHintArea>
        <div className={styles.scrollContent}>
          {sections.map((section, index) => (
            <div
              key={section.label}
              className={clsx(
                styles.l4Section,
                index === sections.length - 1 && styles.l4SectionLast,
              )}
            >
              <div className={styles.l3Title}>{section.label}</div>
              <div className={styles.l4Value}>{section.value}</div>
            </div>
          ))}
        </div>
      </ScrollHintArea>
    </div>
  )
}
