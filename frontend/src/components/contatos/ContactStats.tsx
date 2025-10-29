'use client'

import { useContacts } from '@/hooks/useContacts'
import { Users, UserPlus, UserCheck, UserX } from 'lucide-react'

export function ContactStats() {
  const { getStats } = useContacts()
  const stats = getStats()

  const statItems = [
    {
      label: 'Total de Contatos',
      value: stats.total,
      icon: Users,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Novos este Mês',
      value: stats.newThisMonth,
      icon: UserPlus,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Ativos',
      value: stats.active,
      icon: UserCheck,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Inativos',
      value: stats.inactive,
      icon: UserX,
      color: 'text-gray-500',
      bgColor: 'bg-gray-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat) => (
        <div key={stat.label} className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
