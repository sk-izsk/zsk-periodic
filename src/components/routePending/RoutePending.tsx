import { pending } from './routePending.css'

type RoutePendingProps = {
  label?: string
}

export const RoutePending: React.FC<RoutePendingProps> = ({ label = 'Loading...' }) => {
  return (
    <div
      className={`w-full h-full min-h-[240px] flex items-center justify-center ${pending}`}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-center gap-3 text-sm">
        <span
          className="inline-block w-4 h-4 border-2 border-current rounded-full border-t-transparent animate-spin"
          aria-hidden="true"
        />
        {label}
      </div>
    </div>
  )
}
