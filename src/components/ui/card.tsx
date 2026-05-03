import { cn } from '@/utils/cn'
import type * as React from 'react'

type CardProps = React.HTMLAttributes<HTMLDivElement>
type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>
type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>
type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>
type CardContentProps = React.HTMLAttributes<HTMLDivElement>

export const Card: React.FC<CardProps> = ({ className, ...props }) => (
  <div
    className={cn(
      'rounded-lg border border-line bg-surface text-ink shadow-[var(--shadow-panel)] backdrop-blur-xl',
      className,
    )}
    {...props}
  />
)

export const CardHeader: React.FC<CardHeaderProps> = ({ className, ...props }) => (
  <div className={cn('space-y-1.5 p-5 pb-3', className)} {...props} />
)

export const CardTitle: React.FC<CardTitleProps> = ({ className, ...props }) => (
  <h2 className={cn('text-lg font-semibold tracking-tight text-ink', className)} {...props} />
)

export const CardDescription: React.FC<CardDescriptionProps> = ({ className, ...props }) => (
  <p className={cn('text-sm leading-6 text-muted', className)} {...props} />
)

export const CardContent: React.FC<CardContentProps> = ({ className, ...props }) => (
  <div className={cn('p-5 pt-2', className)} {...props} />
)
