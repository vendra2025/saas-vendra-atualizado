'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { useAgenda, EventType, EventStatus } from '@/hooks/useAgenda'

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  defaultDate?: Date
}

const eventTypes: { value: EventType; label: string; color: string }[] = [
  { value: 'consulta', label: 'Consulta', color: '#00FF88' },
  { value: 'reuniao', label: 'Reunião', color: '#00B8FF' },
  { value: 'demo', label: 'Demonstração', color: '#A855F7' },
  { value: 'suporte', label: 'Suporte', color: '#F59E0B' },
  { value: 'followup', label: 'Follow-up', color: '#10B981' },
  { value: 'outro', label: 'Outro', color: '#6B7280' },
]

export function EventModal({ isOpen, onClose, defaultDate }: EventModalProps) {
  const { addEvent } = useAgenda()
  const [formData, setFormData] = useState({
    title: '',
    type: 'consulta' as EventType,
    date: defaultDate ? defaultDate.toISOString().split('T')[0] : '',
    startTime: '10:00',
    endTime: '11:00',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    description: '',
    status: 'agendado' as EventStatus,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const selectedType = eventTypes.find(t => t.value === formData.type)!
    const [year, month, day] = formData.date.split('-').map(Number)
    const [startHour, startMin] = formData.startTime.split(':').map(Number)
    const [endHour, endMin] = formData.endTime.split(':').map(Number)

    addEvent({
      title: formData.title,
      type: formData.type,
      startDate: new Date(year, month - 1, day, startHour, startMin),
      endDate: new Date(year, month - 1, day, endHour, endMin),
      clientName: formData.clientName,
      clientPhone: formData.clientPhone || undefined,
      clientEmail: formData.clientEmail || undefined,
      description: formData.description || undefined,
      status: formData.status,
      color: selectedType.color,
      reminders: ['1h'],
    })

    onClose()
    setFormData({
      title: '',
      type: 'consulta',
      date: '',
      startTime: '10:00',
      endTime: '11:00',
      clientName: '',
      clientPhone: '',
      clientEmail: '',
      description: '',
      status: 'agendado',
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Agendamento" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Título *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ex: Consulta - João Silva"
          />
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Tipo de Evento *
          </label>
          <select
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as EventType })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Data e Horários */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Data *
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Início *
            </label>
            <input
              type="time"
              required
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Fim *
            </label>
            <input
              type="time"
              required
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Cliente */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Nome do Cliente *
          </label>
          <input
            type="text"
            required
            value={formData.clientName}
            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Nome completo"
          />
        </div>

        {/* Contatos */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Telefone
            </label>
            <input
              type="tel"
              value={formData.clientPhone}
              onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+55 11 99999-9999"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.clientEmail}
              onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
              className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="email@exemplo.com"
            />
          </div>
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Descrição
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Detalhes adicionais sobre o agendamento"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" glow className="flex-1">
            Criar Agendamento
          </Button>
        </div>
      </form>
    </Modal>
  )
}
