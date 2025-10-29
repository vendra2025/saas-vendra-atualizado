'use client'

import { useState } from 'react'
import { useAgenda } from '@/hooks/useAgenda'
import { MonthView } from '@/components/agenda/MonthView'
import { UpcomingEvents } from '@/components/agenda/UpcomingEvents'
import { EventModal } from '@/components/agenda/EventModal'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react'
import { format, addMonths, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function AgendaPage() {
  const { selectedDate, setSelectedDate } = useAgenda()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalDefaultDate, setModalDefaultDate] = useState<Date | undefined>()

  const handlePreviousMonth = () => {
    setSelectedDate(subMonths(selectedDate, 1))
  }

  const handleNextMonth = () => {
    setSelectedDate(addMonths(selectedDate, 1))
  }

  const handleToday = () => {
    setSelectedDate(new Date())
  }

  const handleDayClick = (date: Date) => {
    setModalDefaultDate(date)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Agenda</h1>
          <p className="text-gray-400">
            Gerencie seus agendamentos e compromissos
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} glow>
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between bg-card rounded-lg border border-border p-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-card-hover rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={handleToday}
            className="px-4 py-2 text-sm font-medium text-white hover:bg-card-hover rounded-lg transition-colors"
          >
            Hoje
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-card-hover rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-semibold text-white">
            {format(selectedDate, 'MMMM yyyy', { locale: ptBR })}
          </h2>
        </div>

        <div className="w-[120px]" /> {/* Spacer for alignment */}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <MonthView onDayClick={handleDayClick} onEventClick={(id) => console.log('Event clicked:', id)} />
        </div>

        {/* Upcoming Events Sidebar */}
        <div className="lg:col-span-1">
          <UpcomingEvents
            onEventEdit={(id) => console.log('Edit event:', id)}
            onEventDelete={(id) => console.log('Delete event:', id)}
          />
        </div>
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setModalDefaultDate(undefined)
        }}
        defaultDate={modalDefaultDate}
      />
    </div>
  )
}
