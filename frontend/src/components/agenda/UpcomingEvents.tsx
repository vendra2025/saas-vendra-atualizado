'use client'

import { useAgenda } from '@/hooks/useAgenda'
import { EventCard } from './EventCard'
import { Card } from '@/components/ui/card'

interface UpcomingEventsProps {
  onEventEdit?: (eventId: string) => void
  onEventDelete?: (eventId: string) => void
}

export function UpcomingEvents({ onEventEdit, onEventDelete }: UpcomingEventsProps) {
  const { getUpcomingEvents, deleteEvent } = useAgenda()
  const upcomingEvents = getUpcomingEvents(10)

  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-4">
        Próximos Agendamentos
      </h3>

      {upcomingEvents.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">
          Nenhum agendamento próximo
        </p>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={() => onEventEdit?.(event.id)}
              onDelete={() => {
                if (confirm('Deseja realmente excluir este evento?')) {
                  deleteEvent(event.id)
                  onEventDelete?.(event.id)
                }
              }}
            />
          ))}
        </div>
      )}
    </Card>
  )
}
