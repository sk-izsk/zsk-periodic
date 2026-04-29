type RoutePendingProps = {
  label?: string
}

export default function RoutePending({ label = 'Loading...' }: RoutePendingProps) {
  return (
    <div
      className="w-full h-full min-h-[240px] flex items-center justify-center"
      style={{ color: 'var(--color-muted)' }}
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex items-center gap-3 text-sm">
        <span
          className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"
          aria-hidden="true"
        />
        {label}
      </div>
    </div>
  )
}
