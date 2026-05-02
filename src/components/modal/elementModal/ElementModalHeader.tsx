import type { ElementIsotope, ElementProfile } from '@/types/elementProfile'
import clsx from 'clsx'
import * as styles from './elementModal.css'

interface ElementModalHeaderProps {
  profile: ElementProfile
  activeIsotope: ElementIsotope | null
  darkMode: boolean
}

const ElementModalHeader = ({ profile, activeIsotope, darkMode }: ElementModalHeaderProps) => {
  const tone = darkMode ? 'dark' : 'light'

  return (
    <div className={clsx(styles.header, styles.headerTone[tone])}>
      <div className={styles.headerGrid}>
        <div className={clsx(styles.isotopeStack, styles.isotopeStackTone[tone])}>
          <span>
            {activeIsotope?.massNumber ?? Math.round(parseFloat(profile.level2.mass.highSchool))}
          </span>
          <span>{profile.level2.protons}</span>
        </div>
        <div className={styles.symbol}>{profile.symbol}</div>
        <div className={styles.name}>{profile.name}</div>
      </div>
    </div>
  )
}

export { ElementModalHeader }
