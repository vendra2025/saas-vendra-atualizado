'use client'

import { useAgenda } from '@/hooks/useAgenda'
import { EventCard } from './EventCard'
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, isToday, startOfWeek, endOfWeek, addDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface MonthViewProps {
  onDayClick?: (date: Date) => void
  onEventClick?: (eventId: string) => void
}

export function MonthView({ onDayClick, onEventClick }: MonthViewProps) {
  const { selectedDate, events } = useAgenda()

  const monthStart = startOfMonth(selectedDate)
  const monthEnd = endOfMonth(selectedDate)
  const calendarStart = startOfWeek(monthStart, { locale: ptBR })
  const calendarEnd = endOfWeek(monthEnd, { locale: ptBR })

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd })
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']

  const getEventsForDay = (date: Date) => {
    return events.filter((event) =>
      isSameDay(new Date(event.startDate), date)
    )
  }

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Week days header */}
      <div className="grid grid-cols-7 gap-px bg-border">
        {weekDays.map((day) => (
          <div
            key={day}
            className="bg-card p-4 text-center text-sm font-medium text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-border">
        {days.map((day, idx) => {
          const dayEvents = getEventsForDay(day)
          const isCurrentMonth = day.getMonth() === selectedDate.getMonth()
          const isCurrentDay = isToday(day)

          return (
            <button
              key={idx}
              onClick={() => onDayClick?.(day)}
              className={cn(
                'bg-card p-2 min-h-[100px] text-left transition-colors hover:bg-card-hover',
                !isCurrentMonth && 'opacity-40'
              )}
            >
              <div
                className={cn(
                  'inline-flex items-center justify-center w-7 h-7 rounded-full text-sm font-medium mb-1',
                  isCurrentDay && 'bg-primary text-background',
                  !isCurrentDay && 'text-white'
                )}
              >
                {format(day, 'd')}
              </div>

              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    compact
                    onClick={() => onEventClick?.(event.id)}
                  />
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-xs text-gray-400 pl-2">
                    +{dayEvents.length - 3} mais
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
