type RoutePendingProps = {
  label?: string
}

const RoutePending = ({ label = 'Loading...' }: RoutePendingProps) => {
  return (
    <div
      className="w-full h-full min-h-[240px] flex items-center justify-center"
      style={{ color: 'var(--color-muted)' }}
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

export { RoutePending }
