'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, Bell, Search } from 'lucide-react'
import { UserMenu } from '@/components/auth/UserMenu'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

interface TopbarProps {
  onMenuClick: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname()
  const [notificationCount] = useState(3)

  // Generate breadcrumbs from pathname
  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs = paths.map((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/')
      const label = path.charAt(0).toUpperCase() + path.slice(1)
      return { label, href, isLast: index === paths.length - 1 }
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  return (
    <header className="h-16 border-b border-[var(--border)] bg-[var(--background)] sticky top-0 z-30">
      <div className="h-full px-4 flex items-center justify-between gap-4">
        {/* Left: Menu + Breadcrumbs */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-[var(--card)] rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumbs */}
          <nav className="hidden md:flex items-center gap-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="text-[var(--foreground)]/30">/</span>
                )}
                <span
                  className={
                    crumb.isLast
                      ? 'text-[var(--foreground)]'
                      : 'text-[var(--foreground)]/60'
                  }
                >
                  {crumb.label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        {/* Right: Search + Notifications + User */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground)]/50" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-64 pl-9"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-[var(--card)] rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <Badge
                variant="default"
                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs"
              >
                {notificationCount}
              </Badge>
            )}
          </button>

          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
