import { ElementProfile } from '@/types/elementProfile'
import clsx from 'clsx'
import { CATEGORY_LABELS } from '../../../../data/elements/elements'
import { useAppTranslation } from '../../../../i18n/localize'
import { parseCommonIons } from '../../../../utils/elementModalUtils'
import { CardRow } from '../CardRow'
import {
  card,
  cardBody,
  cardLevel,
  emptyIon,
  ionLabel,
  ionList,
  ionNotation,
  ionRow,
  l1Box,
  sectionTitle,
} from './levelCard.css'

interface L1CardProps {
  profile: ElementProfile
}

export const L1Card: React.FC<L1CardProps> = ({ profile }) => {
  const ions = parseCommonIons(profile.level1.commonIons, profile.name)
  const typeLabel = profile.level1.type || CATEGORY_LABELS[profile.category] || 'Unknown'
  const { t } = useAppTranslation()

  return (
    <div className={clsx(card, cardLevel.l1)}>
      <CardRow label={t('modal.type')} value={typeLabel} />
      <CardRow label={t('modal.groupPeriod')} value={profile.level1.groupPeriod} />
      <CardRow label={t('modal.phaseAtSTP')} value={profile.level1.phaseAtSTP} />
      <CardRow label={t('modal.electronBlock')} value={profile.level1.electronBlock} last />
      <div className={cardBody}>
        <div className={l1Box}>
          <div className={sectionTitle}>{t('modal.commonIons')}</div>
          <div className={ionList}>
            {ions.length === 0 ? (
              <div className={emptyIon}>{t('modal.noCommonIons')}</div>
            ) : (
              ions.slice(0, 4).map((ion) => (
                <div key={`${ion.notation}-${ion.label}`} className={ionRow}>
                  <span className={ionNotation}>{ion.notation}</span>
                  {ion.label && <span className={ionLabel}>{ion.label}</span>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
