import { useAppTranslation } from '@/i18n/localize'
import { ElementProfile } from '@/types/elementProfile'
import clsx from 'clsx'
import { CardRow } from '../CardRow'
import {
  card,
  cardBody,
  cardLevel,
  chip as chipClass,
  chipKind,
  chipWrap,
  l3Box,
  l3Section,
  l3Title,
  l4Value,
  metric as metricClass,
  metricGrid,
  metricLabel,
  metricValue,
} from './levelCard.css'

interface L3CardProps {
  profile: ElementProfile
}

export const L3Card: React.FC<L3CardProps> = ({ profile }) => {
  const { t } = useAppTranslation()
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
    <div className={clsx(card, cardLevel.l3)}>
      <CardRow label={t('modal.configuration')} value={electronic.configuration} last />
      <div className={cardBody}>
        <div className={l3Box}>
          <div className={l3Section}>
            <div className={l3Title}>{t('modal.oxidationStates')}</div>
            <div className={chipWrap}>
              {chips.length === 0 ? (
                <span className={l4Value}>{t('modal.notAvailable')}</span>
              ) : (
                chips.map((chip, index) => (
                  <span
                    key={`${chip.kind}-${chip.state}-${index}`}
                    className={clsx(chipClass, chipKind[chip.kind])}
                  >
                    {chip.state}
                  </span>
                ))
              )}
            </div>
          </div>
          <div className={metricGrid}>
            {metrics.map((metric) => (
              <div key={metric.label} className={metricClass}>
                <div className={metricLabel}>{metric.label}</div>
                <div className={metricValue}>{metric.value || t('modal.notAvailable')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
