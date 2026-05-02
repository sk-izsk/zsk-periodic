import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { NAV_LINKS } from './navData'

interface NavRouteLinksProps {
  pathname: string
  t: (key: string) => string
}

const NavRouteLinks = ({ pathname, t }: NavRouteLinksProps) => (
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
            pathname === link.href ? 'text-white dark:text-slate-950' : 'text-muted hover:text-ink',
          )}
        >
          <link.icon size={15} />
          {t(link.key)}
        </Link>
      </Button>
    ))}
  </>
)

export { NavRouteLinks }
