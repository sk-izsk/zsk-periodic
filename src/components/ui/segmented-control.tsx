import { cn } from '@/utils/cn'

interface SegmentedControlOption<T extends string> {
  label: string
  value: T
}

interface SegmentedControlProps<T extends string> {
  value: T
  options: SegmentedControlOption<T>[]
  onValueChange: (value: T) => void
  className?: string
}

export const SegmentedControl = <T extends string>({
  value,
  options,
  onValueChange,
  className,
}: SegmentedControlProps<T>) => (
  <div
    className={cn(
      'inline-flex w-full rounded-full border border-line bg-[rgba(255,255,255,0.52)] p-1 shadow-sm backdrop-blur-xl dark:bg-[rgba(9,18,25,0.72)]',
      className,
    )}
  >
    {options.map((option) => {
      const active = option.value === value

      return (
        <button
          key={option.value}
          type="button"
          onClick={() => onValueChange(option.value)}
          className={cn(
            'flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-150',
            active
              ? 'bg-[var(--color-accent)] text-white shadow-sm dark:text-slate-950'
              : 'text-muted hover:text-ink',
          )}
        >
          {option.label}
        </button>
      )
    })}
  </div>
)
