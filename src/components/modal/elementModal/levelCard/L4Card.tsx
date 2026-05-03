import { useAppTranslation } from '@/i18n/localize'
import { ElementProfile } from '@/types/elementProfile'
import clsx from 'clsx'
import { CardRow } from '../CardRow'
import { ScrollHintArea } from '../ScrollHintArea'
import {
  card,
  cardLevel,
  l3Title,
  l4Section,
  l4SectionLast,
  l4Value,
  scrollContent,
} from './levelCard.css'

interface L4CardProps {
  profile: ElementProfile
}

export const L4Card: React.FC<L4CardProps> = ({ profile }) => {
  const { t } = useAppTranslation()
  const history = profile.level4.history
  const sections = [
    { label: t('modal.uses'), value: profile.level4.uses.join(' · ') },
    { label: t('modal.hazards'), value: profile.level4.hazards.join(' · ') },
    { label: t('modal.stse'), value: profile.level4.stseContext.join(' · ') },
  ].filter((section) => section.value)

  return (
    <div className={clsx(card, cardLevel.l4)}>
      <CardRow label={t('modal.discoveryYear')} value={history.discoveryYear} />
      <CardRow label={t('modal.discoveredBy')} value={history.discoveredBy} />
      <CardRow label={t('modal.namedBy')} value={history.namedBy} last />
      <ScrollHintArea>
        <div className={scrollContent}>
          {sections.map((section, index) => (
            <div
              key={section.label}
              className={clsx(l4Section, index === sections.length - 1 && l4SectionLast)}
            >
              <div className={l3Title}>{section.label}</div>
              <div className={l4Value}>{section.value}</div>
            </div>
          ))}
        </div>
      </ScrollHintArea>
    </div>
  )
}
