import clsx from 'clsx'
import { useIsotopeStatusLabel } from '../../../../hooks/useIsoTopeStatusLabel'
import { useAppTranslation } from '../../../../i18n/localize'
import { ElementIsotope, ElementProfile } from '../../../../types/elementProfile'
import { getMassValue, toSuperscript } from '../../../../utils/elementModalUtils'
import { isRadioactive } from '../../../../utils/levelCardUtils'
import { CardRow } from '../CardRow'
import { ScrollHintArea } from '../ScrollHintArea'
import {
  card,
  cardLevel,
  isotopeButton,
  isotopeButtonSelected,
  isotopeNeutron,
  isotopeNote,
  isotopeRadioactive,
  isotopeStable,
  isotopeStatus,
  isotopeSymbol,
  isotopeTop,
  listHeader,
  scrollContent,
  stat as statClass,
  statGrid,
  statLabel,
  statValue,
} from './levelCard.css'

interface L2CardProps {
  profile: ElementProfile
  massUnit: string
  selectedIsotope: ElementIsotope | null
  onSelectIsotope: (isotope: ElementIsotope) => void
}

export const L2Card: React.FC<L2CardProps> = ({
  profile,
  massUnit,
  selectedIsotope,
  onSelectIsotope,
}) => {
  const { t } = useAppTranslation()
  const mass = getMassValue(profile, massUnit)
  const roundedMass = Math.round(parseFloat(profile.level2.mass.highSchool))
  const stats = [
    { label: t('modal.protons'), value: String(profile.level2.protons) },
    { label: t('modal.neutrons'), value: String(roundedMass - profile.level2.protons) },
    { label: t('modal.electrons'), value: String(profile.level2.electronsNeutral) },
  ]
  const statusLabel = useIsotopeStatusLabel(selectedIsotope?.percent ?? '')

  return (
    <div className={clsx(card, cardLevel.l2)}>
      <CardRow label={t('modal.avgAtomicMass')} value={mass} />
      <CardRow label={t('modal.configuration')} value={profile.electronConfiguration} />
      <CardRow label={t('modal.valenceElectrons')} value={profile.level1.valenceElectrons} />
      <div className={statGrid}>
        {stats.map((stat) => (
          <div key={stat.label} className={statClass}>
            <div className={statValue}>{stat.value}</div>
            <div className={statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
      <ScrollHintArea>
        <div className={scrollContent}>
          <div className={listHeader}>{t('modal.isotopes')}</div>
          {profile.level2.isotopes.map((isotope) => {
            const selected = selectedIsotope?.name === isotope.name
            return (
              <button
                key={isotope.name}
                type="button"
                onClick={() => onSelectIsotope(isotope)}
                onPointerDown={(event) => event.stopPropagation()}
                onTouchStart={(event) => event.stopPropagation()}
                className={clsx(isotopeButton, selected && isotopeButtonSelected)}
              >
                <div className={isotopeTop}>
                  <span className={isotopeSymbol}>
                    {toSuperscript(isotope.massNumber)}
                    {profile.symbol}
                  </span>
                  <span className={isotopeNeutron}>{isotope.neutron}</span>
                  <span
                    className={clsx(
                      isotopeStatus,
                      isRadioactive(isotope.percent) ? isotopeRadioactive : isotopeStable,
                    )}
                  >
                    {statusLabel}
                  </span>
                </div>
                {isotope.note && <span className={isotopeNote}>{isotope.note}</span>}
              </button>
            )
          })}
        </div>
      </ScrollHintArea>
    </div>
  )
}
