import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'border-line bg-surface text-muted',
        active: 'border-[var(--color-accent)] bg-[var(--color-ring)] text-ink',
        success:
          'border-green-500/30 bg-green-500/10 text-[var(--color-success)] dark:bg-green-400/10',
        warning:
          'border-amber-500/30 bg-amber-500/10 text-[var(--color-warning)] dark:bg-amber-400/10',
        danger: 'border-red-500/30 bg-red-500/10 text-[var(--color-danger)] dark:bg-red-400/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>

const Badge = ({ className, variant, ...props }: BadgeProps) => (
  <span className={cn(badgeVariants({ variant, className }))} {...props} />
)

export { Badge }
