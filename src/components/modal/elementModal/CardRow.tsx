import clsx from 'clsx'
import * as styles from './elementModal.css'

const CardRow = ({
  label,
  value,
  last = false,
}: {
  label: string
  value: string
  last?: boolean
}) => (
  <div className={clsx(styles.row, last && styles.rowLast)}>
    <span className={styles.rowLabel}>{label}</span>
    <span className={styles.rowValue}>{value}</span>
  </div>
)

export { CardRow }
