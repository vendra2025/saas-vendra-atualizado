'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export interface Contact {
  id: string
  // Básico
  name: string
  email: string
  phone: string
  whatsapp?: string
  avatar?: string
  birthdate?: Date
  gender?: 'male' | 'female' | 'other' | 'not_specified'

  // Profissional
  company?: string
  position?: string
  website?: string
  linkedin?: string

  // Endereço
  address?: {
    zipCode: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    country: string
  }

  // Segmentação
  tags: string[]
  status: 'active' | 'inactive' | 'blocked'

  // Notas e histórico
  notes?: string

  // Metadata
  createdAt: Date
  updatedAt: Date
  lastInteraction?: Date
  conversationsCount: number
  appointmentsCount: number
}

export interface Tag {
  id: string
  name: string
  color: string
  contactsCount: number
}

interface ContactsStore {
  contacts: Contact[]
  tags: Tag[]
  selectedContact: Contact | null
  searchQuery: string
  filters: {
    tags: string[]
    status: ('active' | 'inactive' | 'blocked')[]
    dateRange?: { start: Date; end: Date }
    lastInteraction?: string
  }
  view: 'grid' | 'table'
  sortBy: 'name' | 'email' | 'company' | 'createdAt' | 'lastInteraction'
  sortOrder: 'asc' | 'desc'

  // Contact actions
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateContact: (id: string, contact: Partial<Contact>) => void
  deleteContact: (id: string) => void
  deleteMultipleContacts: (ids: string[]) => void
  setSelectedContact: (contact: Contact | null) => void

  // Tag actions
  addTag: (tag: Omit<Tag, 'id' | 'contactsCount'>) => void
  updateTag: (id: string, tag: Partial<Tag>) => void
  deleteTag: (id: string) => void
  addTagToContacts: (contactIds: string[], tagId: string) => void
  removeTagFromContacts: (contactIds: string[], tagId: string) => void

  // Search and filter
  setSearchQuery: (query: string) => void
  setFilters: (filters: Partial<ContactsStore['filters']>) => void
  clearFilters: () => void
  getFilteredContacts: () => Contact[]

  // View and sort
  setView: (view: 'grid' | 'table') => void
  setSortBy: (sortBy: ContactsStore['sortBy']) => void
  toggleSortOrder: () => void

  // Import
  importFromCSV: (data: any[]) => { success: number; errors: any[] }

  // Export
  getContactsForExport: (format: 'csv' | 'vcard' | 'json') => any

  // Stats
  getStats: () => {
    total: number
    newThisMonth: number
    active: number
    inactive: number
  }
}

// Mock tags
const mockTags: Tag[] = [
  { id: '1', name: 'Cliente', color: '#00FF88', contactsCount: 8 },
  { id: '2', name: 'Lead', color: '#00B8FF', contactsCount: 5 },
  { id: '3', name: 'VIP', color: '#FFD700', contactsCount: 3 },
  { id: '4', name: 'Interessado', color: '#A855F7', contactsCount: 4 },
  { id: '5', name: 'Parceiro', color: '#10B981', contactsCount: 2 },
]

// Mock contacts
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    phone: '+55 11 99999-9999',
    whatsapp: '+55 11 99999-9999',
    avatar: 'https://i.pravatar.cc/150?img=1',
    birthdate: new Date(1985, 5, 15),
    gender: 'male',
    company: 'Tech Solutions',
    position: 'CEO',
    website: 'https://techsolutions.com',
    tags: ['1', '3'],
    status: 'active',
    notes: 'Cliente desde 2023. Muito satisfeito com o serviço.',
    createdAt: new Date(2023, 0, 15),
    updatedAt: new Date(2025, 9, 20),
    lastInteraction: new Date(2025, 9, 27),
    conversationsCount: 45,
    appointmentsCount: 12,
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@example.com',
    phone: '+55 11 98888-8888',
    avatar: 'https://i.pravatar.cc/150?img=2',
    birthdate: new Date(1990, 8, 22),
    gender: 'female',
    company: 'Design Studio',
    position: 'Designer',
    tags: ['1'],
    status: 'active',
    notes: 'Cliente ativo. Interesse em novos recursos.',
    createdAt: new Date(2024, 2, 10),
    updatedAt: new Date(2025, 9, 25),
    lastInteraction: new Date(2025, 9, 26),
    conversationsCount: 32,
    appointmentsCount: 8,
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    email: 'pedro@example.com',
    phone: '+55 21 97777-7777',
    company: 'E-commerce Plus',
    position: 'Marketing Manager',
    tags: ['2', '4'],
    status: 'active',
    createdAt: new Date(2025, 8, 5),
    updatedAt: new Date(2025, 9, 15),
    lastInteraction: new Date(2025, 9, 25),
    conversationsCount: 12,
    appointmentsCount: 3,
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@example.com',
    phone: '+55 11 96666-6666',
    whatsapp: '+55 11 96666-6666',
    avatar: 'https://i.pravatar.cc/150?img=4',
    company: 'Startup Inc',
    position: 'Founder',
    tags: ['2'],
    status: 'active',
    createdAt: new Date(2025, 9, 1),
    updatedAt: new Date(2025, 9, 20),
    lastInteraction: new Date(2025, 9, 24),
    conversationsCount: 8,
    appointmentsCount: 2,
  },
  {
    id: '5',
    name: 'Carlos Mendes',
    email: 'carlos@example.com',
    phone: '+55 11 95555-5555',
    company: 'Consulting Group',
    position: 'Consultant',
    tags: ['1', '3'],
    status: 'active',
    notes: 'VIP. Sempre procura por soluções personalizadas.',
    createdAt: new Date(2023, 6, 20),
    updatedAt: new Date(2025, 9, 18),
    lastInteraction: new Date(2025, 9, 23),
    conversationsCount: 56,
    appointmentsCount: 15,
  },
  {
    id: '6',
    name: 'Juliana Ferreira',
    email: 'juliana@example.com',
    phone: '+55 21 94444-4444',
    avatar: 'https://i.pravatar.cc/150?img=6',
    company: 'Media Corp',
    position: 'Content Manager',
    tags: ['2'],
    status: 'active',
    createdAt: new Date(2025, 7, 15),
    updatedAt: new Date(2025, 9, 10),
    lastInteraction: new Date(2025, 9, 22),
    conversationsCount: 15,
    appointmentsCount: 4,
  },
  {
    id: '7',
    name: 'Roberto Lima',
    email: 'roberto@example.com',
    phone: '+55 11 93333-3333',
    company: 'Finance Plus',
    position: 'CFO',
    tags: ['5'],
    status: 'active',
    createdAt: new Date(2024, 11, 5),
    updatedAt: new Date(2025, 9, 12),
    lastInteraction: new Date(2025, 9, 21),
    conversationsCount: 28,
    appointmentsCount: 7,
  },
  {
    id: '8',
    name: 'Fernanda Souza',
    email: 'fernanda@example.com',
    phone: '+55 21 92222-2222',
    avatar: 'https://i.pravatar.cc/150?img=8',
    company: 'Health Care',
    position: 'Doctor',
    tags: ['1'],
    status: 'active',
    createdAt: new Date(2024, 5, 12),
    updatedAt: new Date(2025, 9, 8),
    lastInteraction: new Date(2025, 9, 20),
    conversationsCount: 22,
    appointmentsCount: 6,
  },
  {
    id: '9',
    name: 'Lucas Almeida',
    email: 'lucas@example.com',
    phone: '+55 11 91111-1111',
    company: 'Education Hub',
    position: 'Teacher',
    tags: ['4'],
    status: 'active',
    createdAt: new Date(2025, 8, 20),
    updatedAt: new Date(2025, 9, 5),
    lastInteraction: new Date(2025, 9, 19),
    conversationsCount: 10,
    appointmentsCount: 2,
  },
  {
    id: '10',
    name: 'Patrícia Rocha',
    email: 'patricia@example.com',
    phone: '+55 21 90000-0000',
    avatar: 'https://i.pravatar.cc/150?img=10',
    company: 'Legal Solutions',
    position: 'Lawyer',
    tags: ['1', '3'],
    status: 'active',
    notes: 'Cliente VIP. Requer atenção especial.',
    createdAt: new Date(2023, 3, 8),
    updatedAt: new Date(2025, 9, 15),
    lastInteraction: new Date(2025, 9, 18),
    conversationsCount: 67,
    appointmentsCount: 20,
  },
  {
    id: '11',
    name: 'Rafael Santos',
    email: 'rafael@example.com',
    phone: '+55 11 98888-7777',
    company: 'Tech Startup',
    position: 'CTO',
    tags: ['2', '4'],
    status: 'active',
    createdAt: new Date(2025, 9, 10),
    updatedAt: new Date(2025, 9, 12),
    lastInteraction: new Date(2025, 9, 17),
    conversationsCount: 5,
    appointmentsCount: 1,
  },
  {
    id: '12',
    name: 'Camila Dias',
    email: 'camila@example.com',
    phone: '+55 21 97777-6666',
    avatar: 'https://i.pravatar.cc/150?img=12',
    company: 'Fashion Brand',
    position: 'Stylist',
    tags: ['2'],
    status: 'active',
    createdAt: new Date(2025, 8, 25),
    updatedAt: new Date(2025, 9, 5),
    lastInteraction: new Date(2025, 9, 16),
    conversationsCount: 9,
    appointmentsCount: 2,
  },
  {
    id: '13',
    name: 'Bruno Martins',
    email: 'bruno@example.com',
    phone: '+55 11 96666-5555',
    company: 'Real Estate',
    position: 'Broker',
    tags: ['5'],
    status: 'active',
    createdAt: new Date(2024, 10, 18),
    updatedAt: new Date(2025, 9, 1),
    lastInteraction: new Date(2025, 9, 15),
    conversationsCount: 19,
    appointmentsCount: 5,
  },
  {
    id: '14',
    name: 'Vanessa Silva',
    email: 'vanessa@example.com',
    phone: '+55 21 95555-4444',
    avatar: 'https://i.pravatar.cc/150?img=14',
    company: 'Food Delivery',
    position: 'Operations',
    tags: ['1'],
    status: 'active',
    createdAt: new Date(2024, 7, 22),
    updatedAt: new Date(2025, 8, 28),
    lastInteraction: new Date(2025, 9, 14),
    conversationsCount: 24,
    appointmentsCount: 6,
  },
  {
    id: '15',
    name: 'Thiago Pereira',
    email: 'thiago@example.com',
    phone: '+55 11 94444-3333',
    company: 'Sports Academy',
    position: 'Coach',
    tags: ['4'],
    status: 'inactive',
    createdAt: new Date(2024, 4, 30),
    updatedAt: new Date(2025, 7, 15),
    lastInteraction: new Date(2025, 7, 20),
    conversationsCount: 18,
    appointmentsCount: 4,
  },
  {
    id: '16',
    name: 'Gabriela Costa',
    email: 'gabriela@example.com',
    phone: '+55 21 93333-2222',
    avatar: 'https://i.pravatar.cc/150?img=16',
    company: 'Beauty Salon',
    position: 'Owner',
    tags: ['1'],
    status: 'active',
    createdAt: new Date(2024, 9, 5),
    updatedAt: new Date(2025, 9, 10),
    lastInteraction: new Date(2025, 9, 13),
    conversationsCount: 31,
    appointmentsCount: 9,
  },
  {
    id: '17',
    name: 'Felipe Oliveira',
    email: 'felipe@example.com',
    phone: '+55 11 92222-1111',
    company: 'Auto Repair',
    position: 'Mechanic',
    tags: ['2'],
    status: 'active',
    createdAt: new Date(2025, 9, 8),
    updatedAt: new Date(2025, 9, 9),
    lastInteraction: new Date(2025, 9, 12),
    conversationsCount: 3,
    appointmentsCount: 1,
  },
  {
    id: '18',
    name: 'Larissa Mendes',
    email: 'larissa@example.com',
    phone: '+55 21 91111-0000',
    avatar: 'https://i.pravatar.cc/150?img=18',
    company: 'Pet Shop',
    position: 'Veterinarian',
    tags: ['1', '5'],
    status: 'active',
    createdAt: new Date(2024, 1, 14),
    updatedAt: new Date(2025, 9, 7),
    lastInteraction: new Date(2025, 9, 11),
    conversationsCount: 41,
    appointmentsCount: 11,
  },
  {
    id: '19',
    name: 'Rodrigo Freitas',
    email: 'rodrigo@example.com',
    phone: '+55 11 90000-9999',
    company: 'Photography Studio',
    position: 'Photographer',
    tags: ['4'],
    status: 'inactive',
    createdAt: new Date(2025, 3, 20),
    updatedAt: new Date(2025, 6, 10),
    lastInteraction: new Date(2025, 6, 15),
    conversationsCount: 14,
    appointmentsCount: 3,
  },
  {
    id: '20',
    name: 'Amanda Ribeiro',
    email: 'amanda@example.com',
    phone: '+55 21 98888-9999',
    avatar: 'https://i.pravatar.cc/150?img=20',
    company: 'Travel Agency',
    position: 'Agent',
    tags: ['2'],
    status: 'active',
    createdAt: new Date(2025, 9, 15),
    updatedAt: new Date(2025, 9, 16),
    lastInteraction: new Date(2025, 9, 10),
    conversationsCount: 6,
    appointmentsCount: 1,
  },
]

export const useContacts = create<ContactsStore>()(
  persist(
    (set, get) => ({
      contacts: mockContacts,
      tags: mockTags,
      selectedContact: null,
      searchQuery: '',
      filters: {
        tags: [],
        status: [],
      },
      view: 'grid',
      sortBy: 'name',
      sortOrder: 'asc',

      // Contact actions
      addContact: (contact) => {
        const newContact: Contact = {
          ...contact,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        set((state) => ({
          contacts: [...state.contacts, newContact],
        }))

        // Update tag counts
        contact.tags.forEach((tagId) => {
          const tag = get().tags.find((t) => t.id === tagId)
          if (tag) {
            get().updateTag(tagId, { contactsCount: tag.contactsCount + 1 })
          }
        })
      },

      updateContact: (id, contact) => {
        set((state) => ({
          contacts: state.contacts.map((c) =>
            c.id === id ? { ...c, ...contact, updatedAt: new Date() } : c
          ),
        }))

        // Update selected contact if it's the one being edited
        const selected = get().selectedContact
        if (selected && selected.id === id) {
          set({ selectedContact: { ...selected, ...contact, updatedAt: new Date() } })
        }
      },

      deleteContact: (id) => {
        const contact = get().contacts.find((c) => c.id === id)
        if (contact) {
          // Update tag counts
          contact.tags.forEach((tagId) => {
            const tag = get().tags.find((t) => t.id === tagId)
            if (tag && tag.contactsCount > 0) {
              get().updateTag(tagId, { contactsCount: tag.contactsCount - 1 })
            }
          })
        }

        set((state) => ({
          contacts: state.contacts.filter((c) => c.id !== id),
          selectedContact: state.selectedContact?.id === id ? null : state.selectedContact,
        }))
      },

      deleteMultipleContacts: (ids) => {
        ids.forEach((id) => get().deleteContact(id))
      },

      setSelectedContact: (contact) => {
        set({ selectedContact: contact })
      },

      // Tag actions
      addTag: (tag) => {
        const newTag: Tag = {
          ...tag,
          id: Date.now().toString(),
          contactsCount: 0,
        }
        set((state) => ({
          tags: [...state.tags, newTag],
        }))
      },

      updateTag: (id, tag) => {
        set((state) => ({
          tags: state.tags.map((t) => (t.id === id ? { ...t, ...tag } : t)),
        }))
      },

      deleteTag: (id) => {
        // Remove tag from all contacts
        set((state) => ({
          tags: state.tags.filter((t) => t.id !== id),
          contacts: state.contacts.map((c) => ({
            ...c,
            tags: c.tags.filter((tagId) => tagId !== id),
          })),
        }))
      },

      addTagToContacts: (contactIds, tagId) => {
        set((state) => ({
          contacts: state.contacts.map((c) =>
            contactIds.includes(c.id) && !c.tags.includes(tagId)
              ? { ...c, tags: [...c.tags, tagId], updatedAt: new Date() }
              : c
          ),
        }))

        // Update tag count
        const tag = get().tags.find((t) => t.id === tagId)
        if (tag) {
          const addedCount = contactIds.filter(
            (id) => !get().contacts.find((c) => c.id === id)?.tags.includes(tagId)
          ).length
          get().updateTag(tagId, { contactsCount: tag.contactsCount + addedCount })
        }
      },

      removeTagFromContacts: (contactIds, tagId) => {
        set((state) => ({
          contacts: state.contacts.map((c) =>
            contactIds.includes(c.id)
              ? { ...c, tags: c.tags.filter((t) => t !== tagId), updatedAt: new Date() }
              : c
          ),
        }))

        // Update tag count
        const tag = get().tags.find((t) => t.id === tagId)
        if (tag) {
          const removedCount = contactIds.filter(
            (id) => get().contacts.find((c) => c.id === id)?.tags.includes(tagId)
          ).length
          get().updateTag(tagId, { contactsCount: Math.max(0, tag.contactsCount - removedCount) })
        }
      },

      // Search and filter
      setSearchQuery: (query) => {
        set({ searchQuery: query })
      },

      setFilters: (filters) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
        }))
      },

      clearFilters: () => {
        set({
          searchQuery: '',
          filters: {
            tags: [],
            status: [],
          },
        })
      },

      getFilteredContacts: () => {
        const { contacts, searchQuery, filters, sortBy, sortOrder } = get()

        let filtered = [...contacts]

        // Search
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          filtered = filtered.filter(
            (c) =>
              c.name.toLowerCase().includes(query) ||
              c.email.toLowerCase().includes(query) ||
              c.phone.includes(query) ||
              c.company?.toLowerCase().includes(query) ||
              get().tags
                .filter((t) => c.tags.includes(t.id))
                .some((t) => t.name.toLowerCase().includes(query))
          )
        }

        // Filter by tags
        if (filters.tags.length > 0) {
          filtered = filtered.filter((c) =>
            filters.tags.some((tagId) => c.tags.includes(tagId))
          )
        }

        // Filter by status
        if (filters.status.length > 0) {
          filtered = filtered.filter((c) => filters.status.includes(c.status))
        }

        // Filter by date range
        if (filters.dateRange) {
          filtered = filtered.filter(
            (c) =>
              c.createdAt >= filters.dateRange!.start &&
              c.createdAt <= filters.dateRange!.end
          )
        }

        // Filter by last interaction
        if (filters.lastInteraction) {
          const now = new Date()
          filtered = filtered.filter((c) => {
            if (!c.lastInteraction) return false
            const diff = now.getTime() - c.lastInteraction.getTime()
            const hours = diff / (1000 * 60 * 60)
            const days = hours / 24

            switch (filters.lastInteraction) {
              case '1h':
                return hours <= 1
              case '24h':
                return hours <= 24
              case '7d':
                return days <= 7
              case '30d':
                return days <= 30
              case 'never':
                return !c.lastInteraction
              default:
                return true
            }
          })
        }

        // Sort
        filtered.sort((a, b) => {
          let aValue: any
          let bValue: any

          switch (sortBy) {
            case 'name':
              aValue = a.name.toLowerCase()
              bValue = b.name.toLowerCase()
              break
            case 'email':
              aValue = a.email.toLowerCase()
              bValue = b.email.toLowerCase()
              break
            case 'company':
              aValue = a.company?.toLowerCase() || ''
              bValue = b.company?.toLowerCase() || ''
              break
            case 'createdAt':
              aValue = a.createdAt.getTime()
              bValue = b.createdAt.getTime()
              break
            case 'lastInteraction':
              aValue = a.lastInteraction?.getTime() || 0
              bValue = b.lastInteraction?.getTime() || 0
              break
            default:
              return 0
          }

          if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1
          if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1
          return 0
        })

        return filtered
      },

      // View and sort
      setView: (view) => {
        set({ view })
      },

      setSortBy: (sortBy) => {
        set({ sortBy })
      },

      toggleSortOrder: () => {
        set((state) => ({
          sortOrder: state.sortOrder === 'asc' ? 'desc' : 'asc',
        }))
      },

      // Import
      importFromCSV: (data) => {
        const errors: any[] = []
        let successCount = 0

        data.forEach((row, index) => {
          try {
            // Validate required fields
            if (!row.name || !row.email) {
              errors.push({ row: index + 1, error: 'Nome e email são obrigatórios' })
              return
            }

            // Check for duplicate email
            if (get().contacts.some((c) => c.email === row.email)) {
              errors.push({ row: index + 1, error: 'Email já existe' })
              return
            }

            // Parse tags
            const tags = row.tags
              ? row.tags.split(',').map((t: string) => {
                  const tagName = t.trim()
                  const existingTag = get().tags.find(
                    (tag) => tag.name.toLowerCase() === tagName.toLowerCase()
                  )
                  return existingTag ? existingTag.id : null
                }).filter(Boolean)
              : []

            get().addContact({
              name: row.name,
              email: row.email,
              phone: row.phone || '',
              whatsapp: row.whatsapp,
              company: row.company,
              position: row.position,
              tags,
              status: 'active',
              conversationsCount: 0,
              appointmentsCount: 0,
            })

            successCount++
          } catch (error) {
            errors.push({ row: index + 1, error: 'Erro ao processar linha' })
          }
        })

        return { success: successCount, errors }
      },

      // Export
      getContactsForExport: (format) => {
        const contacts = get().getFilteredContacts()

        if (format === 'json') {
          return contacts
        }

        if (format === 'csv') {
          return contacts.map((c) => ({
            Nome: c.name,
            Email: c.email,
            Telefone: c.phone,
            WhatsApp: c.whatsapp || '',
            Empresa: c.company || '',
            Cargo: c.position || '',
            Tags: get()
              .tags.filter((t) => c.tags.includes(t.id))
              .map((t) => t.name)
              .join(', '),
            Status: c.status,
            'Criado em': c.createdAt.toLocaleDateString('pt-BR'),
            'Última interação': c.lastInteraction?.toLocaleDateString('pt-BR') || 'Nunca',
          }))
        }

        // vCard format
        return contacts.map((c) => {
          let vcard = 'BEGIN:VCARD\n'
          vcard += 'VERSION:3.0\n'
          vcard += `FN:${c.name}\n`
          vcard += `EMAIL:${c.email}\n`
          vcard += `TEL;TYPE=CELL:${c.phone}\n`
          if (c.company) vcard += `ORG:${c.company}\n`
          if (c.position) vcard += `TITLE:${c.position}\n`
          if (c.website) vcard += `URL:${c.website}\n`
          vcard += 'END:VCARD\n'
          return vcard
        })
      },

      // Stats
      getStats: () => {
        const contacts = get().contacts
        const now = new Date()
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        return {
          total: contacts.length,
          newThisMonth: contacts.filter((c) => c.createdAt >= firstDayOfMonth).length,
          active: contacts.filter((c) => c.status === 'active').length,
          inactive: contacts.filter((c) => c.status === 'inactive').length,
        }
      },
    }),
    {
      name: 'contacts-storage',
    }
  )
)
