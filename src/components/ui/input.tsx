import { cn } from '@/utils/cn'
import type * as React from 'react'
import { forwardRef } from 'react'

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-9 w-full rounded-md border border-line bg-elevated px-3 text-sm text-ink outline-none transition-all placeholder:text-muted/75 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-ring)]',
        className,
      )}
      {...props}
    />
  ),
)

Input.displayName = 'Input'
