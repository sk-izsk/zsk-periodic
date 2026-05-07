import { Button } from '@/components/ui/button'
import { NAV_LINKS } from '@/data/navData'
import { useAppTranslation } from '@/i18n/localize'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'

interface NavRouteLinksProps {
  pathname: string
  orientation?: 'row' | 'col'
  onNavigate?: () => void
}

export const NavRouteLinks: React.FC<NavRouteLinksProps> = ({
  pathname,
  orientation = 'row',
  onNavigate,
}) => {
  const { t } = useAppTranslation()

  return (
    <div className={clsx('flex gap-1.5', orientation === 'col' ? 'flex-col' : 'items-center')}>
      {NAV_LINKS.map((link) => (
        <Button
          key={link.href}
          asChild
          variant={pathname === link.href ? 'primary' : 'ghost'}
          size={orientation === 'col' ? 'md' : 'sm'}
        >
          <Link
            to={link.href}
            search={true}
            onClick={onNavigate}
            className={clsx(
              orientation === 'col' ? 'justify-start px-3 py-2.5' : 'px-3',
              pathname === link.href
                ? 'text-white dark:text-slate-950'
                : 'text-muted hover:text-ink',
            )}
          >
            <link.icon size={15} />
            {t(link.key)}
          </Link>
        </Button>
      ))}
    </div>
  )
}
