'use client'

import { Event } from '@/hooks/useAgenda'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Clock, User, Pencil, Trash2 } from 'lucide-react'

interface EventCardProps {
  event: Event
  onClick?: () => void
  onEdit?: () => void
  onDelete?: () => void
  compact?: boolean
}

const statusVariants: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
  agendado: 'default',
  confirmado: 'success',
  realizado: 'info',
  cancelado: 'danger',
  remarcado: 'warning',
}

export function EventCard({ event, onClick, onEdit, onDelete, compact = false }: EventCardProps) {
  const startTime = format(new Date(event.startDate), 'HH:mm', { locale: ptBR })
  const endTime = format(new Date(event.endDate), 'HH:mm', { locale: ptBR })

  if (compact) {
    return (
      <button
        onClick={onClick}
        className="w-full text-left px-2 py-1 rounded text-xs truncate transition-colors hover:opacity-80"
        style={{ backgroundColor: event.color + '20', borderLeft: `3px solid ${event.color}` }}
      >
        <span className="font-medium text-white">{startTime}</span>{' '}
        <span className="text-gray-300">{event.title}</span>
      </button>
    )
  }

  return (
    <div
      className="p-4 rounded-lg border transition-all hover:scale-[1.02]"
      style={{
        backgroundColor: event.color + '10',
        borderColor: event.color + '40',
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-white">{event.title}</h4>
        <Badge variant={statusVariants[event.status]}>
          {event.status}
        </Badge>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{startTime} - {endTime}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          <User className="w-4 h-4" />
          <span>{event.clientName}</span>
        </div>

        {event.description && (
          <p className="text-gray-400 text-xs mt-2">{event.description}</p>
        )}
      </div>

      {(onEdit || onDelete) && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-border">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit()
              }}
              className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark transition-colors"
            >
              <Pencil className="w-3 h-3" />
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
              className="flex items-center gap-1 text-xs text-red-500 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Excluir
            </button>
          )}
        </div>
      )}
    </div>
  )
}
