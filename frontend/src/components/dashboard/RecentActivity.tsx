'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { ActivityItem, Activity } from './ActivityItem'
import {
  MessageSquare,
  Bot,
  FileCheck,
  AlertTriangle,
  ShoppingCart,
  UserPlus,
  Zap,
  FileText,
  MessageCircle,
  CheckCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const activities: Activity[] = [
  {
    id: 1,
    type: 'new',
    icon: MessageSquare,
    description: 'João Silva iniciou uma conversa',
    timestamp: 'Há 2 minutos',
    badge: 'Novo',
  },
  {
    id: 2,
    type: 'auto',
    icon: Bot,
    description: 'IA respondeu sobre horários de atendimento',
    timestamp: 'Há 5 minutos',
    badge: 'Automático',
  },
  {
    id: 3,
    type: 'success',
    icon: FileCheck,
    description: 'catalogo-produtos.pdf adicionado à base',
    timestamp: 'Há 12 minutos',
    badge: 'Sucesso',
  },
  {
    id: 4,
    type: 'error',
    icon: AlertTriangle,
    description: 'Falha ao enviar mensagem para +55 11 98888-8888',
    timestamp: 'Há 1 hora',
    badge: 'Erro',
    link: '#',
  },
  {
    id: 5,
    type: 'purchase',
    icon: ShoppingCart,
    description: '+500k tokens adicionados ao plano',
    timestamp: 'Há 2 horas',
    badge: 'Compra',
  },
  {
    id: 6,
    type: 'new',
    icon: UserPlus,
    description: 'Maria Oliveira adicionada aos contatos',
    timestamp: 'Há 3 horas',
    badge: 'Novo',
  },
  {
    id: 7,
    type: 'auto',
    icon: MessageCircle,
    description: 'IA processou consulta sobre preços',
    timestamp: 'Há 4 horas',
    badge: 'Automático',
  },
  {
    id: 8,
    type: 'success',
    icon: CheckCircle,
    description: 'Configuração do assistente atualizada',
    timestamp: 'Há 5 horas',
    badge: 'Sucesso',
  },
  {
    id: 9,
    type: 'new',
    icon: MessageSquare,
    description: 'Carlos Mendes iniciou atendimento',
    timestamp: 'Há 6 horas',
    badge: 'Novo',
  },
  {
    id: 10,
    type: 'success',
    icon: Zap,
    description: 'Conexão WhatsApp restabelecida',
    timestamp: 'Há 8 horas',
    badge: 'Sucesso',
  },
]

type FilterType = 'all' | 'conversas' | 'erros' | 'compras'

export function RecentActivity() {
  const [filter, setFilter] = useState<FilterType>('all')

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'conversas', label: 'Conversas' },
    { id: 'erros', label: 'Erros' },
    { id: 'compras', label: 'Compras' },
  ]

  const filteredActivities = activities.filter((activity) => {
    if (filter === 'all') return true
    if (filter === 'conversas') return activity.type === 'new' || activity.type === 'auto'
    if (filter === 'erros') return activity.type === 'error'
    if (filter === 'compras') return activity.type === 'purchase'
    return true
  })

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">
          Atividades Recentes
        </h3>
        <a
          href="#"
          className="text-sm text-primary hover:text-primary-dark transition-colors"
        >
          Ver todos
        </a>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 pb-4 border-b border-border">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn(
              'px-3 py-1 rounded-lg text-sm transition-colors',
              filter === f.id
                ? 'bg-primary text-background font-medium'
                : 'bg-card text-gray-400 hover:text-white hover:bg-card-hover'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {filteredActivities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1f2937;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #374151;
        }
      `}</style>
    </Card>
  )
}
