import type { ElementIsotope, ElementProfile } from '@/types/elementProfile'
import clsx from 'clsx'
import {
  header,
  headerCompact,
  headerGrid,
  headerGridCompact,
  headerTone,
  isotopeStack,
  isotopeStackCompact,
  isotopeStackTone,
  name,
  nameCompact,
  symbol,
  symbolCompact,
} from './elementModal.css'

interface ElementModalHeaderProps {
  profile: ElementProfile
  activeIsotope: ElementIsotope | null
  darkMode: boolean
  compact?: boolean
  titleId?: string
}

export const ElementModalHeader: React.FC<ElementModalHeaderProps> = ({
  profile,
  activeIsotope,
  darkMode,
  compact = false,
  titleId,
}) => {
  const tone = darkMode ? 'dark' : 'light'

  return (
    <div className={clsx(header, compact && headerCompact, headerTone[tone])}>
      <div className={clsx(headerGrid, compact && headerGridCompact)}>
        <div className={clsx(isotopeStack, compact && isotopeStackCompact, isotopeStackTone[tone])}>
          <span>
            {activeIsotope?.massNumber ?? Math.round(parseFloat(profile.level2.mass.highSchool))}
          </span>
          <span>{profile.level2.protons}</span>
        </div>
        <div className={clsx(symbol, compact && symbolCompact)}>{profile.symbol}</div>
        <div id={titleId} className={clsx(name, compact && nameCompact)}>
          {profile.name}
        </div>
      </div>
    </div>
  )
}
