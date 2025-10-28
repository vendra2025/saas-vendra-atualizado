'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Users,
  MessageCircle,
  FileText,
  Upload,
  Bot,
  Wrench,
  BarChart3,
  Globe,
  Settings,
  Send,
  Zap,
} from 'lucide-react'

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Agenda',
    href: '/agenda',
    icon: Calendar,
  },
  {
    title: 'Mensagens',
    icon: MessageSquare,
    children: [
      { title: 'Agendar', href: '/mensagens/agendar', icon: Send },
      { title: 'Transmissão', href: '/mensagens/transmissao', icon: Zap },
      { title: 'Templates', href: '/mensagens/templates', icon: FileText },
    ],
  },
  {
    title: 'Contatos',
    href: '/contatos',
    icon: Users,
  },
  {
    title: 'Conversas',
    href: '/conversas',
    icon: MessageCircle,
    badge: '3',
  },
  {
    title: 'Formulários',
    href: '/formularios',
    icon: FileText,
  },
  {
    title: 'Arquivos',
    href: '/arquivos',
    icon: Upload,
  },
  {
    title: 'Assistente',
    icon: Bot,
    children: [
      { title: 'Configuração', href: '/assistente/configuracao', icon: Settings },
      { title: 'Base Conhecimento', href: '/assistente/conhecimento', icon: FileText },
      { title: 'Regras', href: '/assistente/regras', icon: FileText },
    ],
  },
  {
    title: 'Ferramentas',
    icon: Wrench,
    children: [
      { title: 'API Envio', href: '/ferramentas/api', icon: Zap },
      { title: 'Integrações', href: '/ferramentas/integracoes', icon: Wrench },
    ],
  },
  {
    title: 'WebChat',
    href: '/webchat',
    icon: Globe,
  },
  {
    title: 'Relatórios',
    href: '/relatorios',
    icon: BarChart3,
  },
  {
    title: 'Configurações',
    href: '/configuracoes',
    icon: Settings,
  },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href
  const isParentActive = (children?: Array<{ href: string }>) =>
    children?.some((child) => pathname === child.href)

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-[var(--card)] border-r border-[var(--border)] z-50 transition-transform duration-300 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[var(--border)]">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center font-bold text-black shadow-[var(--shadow-neon)]">
              V
            </div>
            <span className="text-xl font-bold text-gradient">Vendra</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            const hasChildren = item.children && item.children.length > 0
            const active = item.href ? isActive(item.href) : isParentActive(item.children)

            if (hasChildren) {
              return (
                <div key={index} className="space-y-1">
                  <div className="px-3 py-2 text-sm font-medium text-[var(--foreground)]/60 flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {item.title}
                  </div>
                  <div className="ml-6 space-y-1">
                    {item.children?.map((child, childIndex) => {
                      const ChildIcon = child.icon
                      return (
                        <Link
                          key={childIndex}
                          href={child.href}
                          onClick={onClose}
                          className={cn(
                            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                            isActive(child.href)
                              ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-medium'
                              : 'text-[var(--foreground)]/70 hover:bg-[var(--card-hover)] hover:text-[var(--foreground)]'
                          )}
                        >
                          <ChildIcon className="w-4 h-4" />
                          {child.title}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={index}
                href={item.href!}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors relative',
                  active
                    ? 'bg-[var(--primary)]/10 text-[var(--primary)] font-medium'
                    : 'text-[var(--foreground)]/70 hover:bg-[var(--card-hover)] hover:text-[var(--foreground)]'
                )}
              >
                <Icon className="w-4 h-4" />
                {item.title}
                {item.badge && (
                  <Badge
                    variant="default"
                    className="ml-auto bg-[var(--primary)] text-black"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Usage Stats */}
        <div className="p-4 border-t border-[var(--border)]">
          <div className="bg-[var(--background)] rounded-lg p-3 space-y-2">
            <div className="text-xs font-medium text-[var(--foreground)]/60">
              Uso do Plano
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Tokens</span>
                <span className="text-[var(--primary)]">45k / 100k</span>
              </div>
              <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)]"
                  style={{ width: '45%' }}
                />
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span>Arquivos</span>
                <span className="text-[var(--primary)]">12 / 20</span>
              </div>
              <div className="h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)]"
                  style={{ width: '60%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
