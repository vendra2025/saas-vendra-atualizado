'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { LogOut, User, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

export function UserMenu() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (!user) return null

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-[var(--card)] transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-black font-semibold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium">{user.name}</div>
          <div className="text-xs text-[var(--foreground)]/60">{user.email}</div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg overflow-hidden z-50">
          {/* User Info */}
          <div className="p-4 border-b border-[var(--border)]">
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-[var(--foreground)]/60">{user.email}</div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={() => {
                router.push('/configuracoes')
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-[var(--card-hover)] transition-colors"
            >
              <Settings className="w-4 h-4" />
              Configurações
            </button>

            <button
              onClick={() => {
                router.push('/configuracoes/conta')
                setIsOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-[var(--card-hover)] transition-colors"
            >
              <User className="w-4 h-4" />
              Meu Perfil
            </button>

            <div className="border-t border-[var(--border)] my-2" />

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-red-500/10 text-red-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
