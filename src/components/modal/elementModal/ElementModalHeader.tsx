import type { ElementIsotope, ElementProfile } from '@/types/elementProfile'
import clsx from 'clsx'
import {
  header,
  headerGrid,
  headerTone,
  isotopeStack,
  isotopeStackTone,
  name,
  symbol,
} from './elementModal.css'

interface ElementModalHeaderProps {
  profile: ElementProfile
  activeIsotope: ElementIsotope | null
  darkMode: boolean
}

export const ElementModalHeader: React.FC<ElementModalHeaderProps> = ({
  profile,
  activeIsotope,
  darkMode,
}) => {
  const tone = darkMode ? 'dark' : 'light'

  return (
    <div className={clsx(header, headerTone[tone])}>
      <div className={headerGrid}>
        <div className={clsx(isotopeStack, isotopeStackTone[tone])}>
          <span>
            {activeIsotope?.massNumber ?? Math.round(parseFloat(profile.level2.mass.highSchool))}
          </span>
          <span>{profile.level2.protons}</span>
        </div>
        <div className={symbol}>{profile.symbol}</div>
        <div className={name}>{profile.name}</div>
      </div>
    </div>
  )
}
