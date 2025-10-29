'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type EventType = 'consulta' | 'reuniao' | 'demo' | 'suporte' | 'followup' | 'outro'
export type EventStatus = 'agendado' | 'confirmado' | 'realizado' | 'cancelado' | 'remarcado'

export interface Event {
  id: string
  title: string
  type: EventType
  startDate: Date
  endDate: Date
  clientId?: string
  clientName: string
  clientPhone?: string
  clientEmail?: string
  description?: string
  status: EventStatus
  color: string
  reminders: string[]
  createdAt: Date
  updatedAt: Date
}

interface AgendaStore {
  events: Event[]
  selectedDate: Date
  view: 'month' | 'week' | 'day'
  searchQuery: string
  filters: {
    types: EventType[]
    statuses: EventStatus[]
  }

  // Actions
  addEvent: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateEvent: (id: string, event: Partial<Event>) => void
  deleteEvent: (id: string) => void
  setView: (view: 'month' | 'week' | 'day') => void
  setSelectedDate: (date: Date) => void
  setSearchQuery: (query: string) => void
  setFilters: (filters: Partial<AgendaStore['filters']>) => void
  getEventsByDate: (date: Date) => Event[]
  getUpcomingEvents: (limit: number) => Event[]
  getFilteredEvents: () => Event[]
}

// Mock events
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Consulta - João Silva',
    type: 'consulta',
    startDate: new Date(2025, 9, 28, 10, 0),
    endDate: new Date(2025, 9, 28, 11, 0),
    clientName: 'João Silva',
    clientPhone: '+55 11 99999-9999',
    clientEmail: 'joao@email.com',
    description: 'Primeira consulta - dúvidas sobre produto',
    status: 'agendado',
    color: '#00FF88',
    reminders: ['1h'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Reunião - Maria Santos',
    type: 'reuniao',
    startDate: new Date(2025, 9, 28, 14, 0),
    endDate: new Date(2025, 9, 28, 15, 0),
    clientName: 'Maria Santos',
    clientPhone: '+55 11 98888-8888',
    description: 'Alinhamento de projeto',
    status: 'confirmado',
    color: '#00B8FF',
    reminders: ['1h', '1d'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: 'Demo - Carlos Mendes',
    type: 'demo',
    startDate: new Date(2025, 9, 29, 10, 0),
    endDate: new Date(2025, 9, 29, 11, 30),
    clientName: 'Carlos Mendes',
    clientPhone: '+55 11 97777-7777',
    description: 'Demonstração do produto',
    status: 'agendado',
    color: '#A855F7',
    reminders: ['1h'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: 'Suporte - Ana Paula',
    type: 'suporte',
    startDate: new Date(2025, 9, 29, 15, 0),
    endDate: new Date(2025, 9, 29, 16, 0),
    clientName: 'Ana Paula',
    clientPhone: '+55 11 96666-6666',
    description: 'Resolução de problema técnico',
    status: 'agendado',
    color: '#F59E0B',
    reminders: ['15m'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    title: 'Follow-up - Pedro Costa',
    type: 'followup',
    startDate: new Date(2025, 9, 30, 9, 0),
    endDate: new Date(2025, 9, 30, 9, 30),
    clientName: 'Pedro Costa',
    clientPhone: '+55 11 95555-5555',
    description: 'Acompanhamento pós-venda',
    status: 'agendado',
    color: '#10B981',
    reminders: ['1h'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    title: 'Reunião - Empresa XYZ',
    type: 'reuniao',
    startDate: new Date(2025, 9, 30, 14, 0),
    endDate: new Date(2025, 9, 30, 15, 30),
    clientName: 'Empresa XYZ',
    description: 'Apresentação de proposta comercial',
    status: 'agendado',
    color: '#00B8FF',
    reminders: ['1h', '1d'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    title: 'Consulta - Juliana Alves',
    type: 'consulta',
    startDate: new Date(2025, 9, 31, 11, 0),
    endDate: new Date(2025, 9, 31, 12, 0),
    clientName: 'Juliana Alves',
    clientPhone: '+55 11 94444-4444',
    description: 'Avaliação de necessidades',
    status: 'confirmado',
    color: '#00FF88',
    reminders: ['1h'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    title: 'Demo - Startup ABC',
    type: 'demo',
    startDate: new Date(2025, 10, 1, 10, 0),
    endDate: new Date(2025, 10, 1, 11, 0),
    clientName: 'Startup ABC',
    description: 'Demonstração para investidores',
    status: 'agendado',
    color: '#A855F7',
    reminders: ['1h', '1d'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '9',
    title: 'Suporte - Roberto Lima',
    type: 'suporte',
    startDate: new Date(2025, 10, 1, 16, 0),
    endDate: new Date(2025, 10, 1, 17, 0),
    clientName: 'Roberto Lima',
    clientPhone: '+55 11 93333-3333',
    description: 'Configuração de integrações',
    status: 'agendado',
    color: '#F59E0B',
    reminders: ['15m'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '10',
    title: 'Reunião - Cliente VIP',
    type: 'reuniao',
    startDate: new Date(2025, 10, 2, 15, 0),
    endDate: new Date(2025, 10, 2, 16, 30),
    clientName: 'Cliente VIP',
    description: 'Renovação de contrato',
    status: 'confirmado',
    color: '#00B8FF',
    reminders: ['1h', '1d'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const useAgenda = create<AgendaStore>()(
  persist(
    (set, get) => ({
      events: mockEvents,
      selectedDate: new Date(),
      view: 'month',
      searchQuery: '',
      filters: {
        types: [],
        statuses: [],
      },

      addEvent: (event) => {
        const newEvent: Event = {
          ...event,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        set((state) => ({ events: [...state.events, newEvent] }))
      },

      updateEvent: (id, eventUpdate) => {
        set((state) => ({
          events: state.events.map((event) =>
            event.id === id
              ? { ...event, ...eventUpdate, updatedAt: new Date() }
              : event
          ),
        }))
      },

      deleteEvent: (id) => {
        set((state) => ({
          events: state.events.filter((event) => event.id !== id),
        }))
      },

      setView: (view) => set({ view }),

      setSelectedDate: (date) => set({ selectedDate: date }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      setFilters: (filters) =>
        set((state) => ({
          filters: { ...state.filters, ...filters },
        })),

      getEventsByDate: (date) => {
        const { events } = get()
        return events.filter((event) => {
          const eventDate = new Date(event.startDate)
          return (
            eventDate.getDate() === date.getDate() &&
            eventDate.getMonth() === date.getMonth() &&
            eventDate.getFullYear() === date.getFullYear()
          )
        })
      },

      getUpcomingEvents: (limit) => {
        const { events } = get()
        const now = new Date()
        return events
          .filter((event) => new Date(event.startDate) >= now)
          .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
          .slice(0, limit)
      },

      getFilteredEvents: () => {
        const { events, searchQuery, filters } = get()

        return events.filter((event) => {
          // Search filter
          if (searchQuery) {
            const query = searchQuery.toLowerCase()
            const matchesSearch =
              event.title.toLowerCase().includes(query) ||
              event.clientName.toLowerCase().includes(query) ||
              event.description?.toLowerCase().includes(query)

            if (!matchesSearch) return false
          }

          // Type filter
          if (filters.types.length > 0 && !filters.types.includes(event.type)) {
            return false
          }

          // Status filter
          if (filters.statuses.length > 0 && !filters.statuses.includes(event.status)) {
            return false
          }

          return true
        })
      },
    }),
    {
      name: 'agenda-storage',
    }
  )
)
