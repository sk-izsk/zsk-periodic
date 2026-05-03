import clsx from 'clsx'
import { atomFallback } from './elementModal.css'
import { FallbackProps } from 'zsk-react-error'

export const AtomErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => (
  <div className={clsx(atomFallback, 'flex flex-col items-center gap-3')}>
    <p className="text-xs opacity-60">{String(error)}</p>
    <button
      onClick={resetErrorBoundary}
      className="px-3 py-1 text-xs rounded opacity-70 ring-1 ring-current hover:opacity-100"
    >
      Retry
    </button>
  </div>
)
