import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { NAV_LINKS } from '../../data/navData'
import { useAppTranslation } from '../../i18n/localize'

interface NavRouteLinksProps {
  pathname: string
}

export const NavRouteLinks: React.FC<NavRouteLinksProps> = ({ pathname }) => {
  const { t } = useAppTranslation()
  return (
    <>
      {NAV_LINKS.map((link) => (
        <Button
          key={link.href}
          asChild
          variant={pathname === link.href ? 'primary' : 'ghost'}
          size="sm"
        >
          <Link
            to={link.href}
            search={true}
            className={clsx(
              'px-3',
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
    </>
  )
}
