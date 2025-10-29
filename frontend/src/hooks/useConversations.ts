'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types
export interface Message {
  id: string
  conversationId: string
  type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'system'
  content: string
  sender: 'client' | 'agent' | 'bot'
  senderName: string
  timestamp: Date
  status: 'sent' | 'delivered' | 'read' | 'failed'
  isEdited?: boolean
  metadata?: {
    url?: string
    filename?: string
    size?: number
    thumbnail?: string
    caption?: string
  }
}

export interface Note {
  id: string
  conversationId: string
  content: string
  authorId: string
  authorName: string
  isPinned: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Conversation {
  id: string
  contactId: string
  contactName: string
  contactAvatar?: string
  contactPhone: string
  channel: 'whatsapp' | 'webchat'
  status: 'pending' | 'in_progress' | 'resolved' | 'archived'
  isPinned: boolean
  unreadCount: number
  lastMessage?: Message
  lastMessageAt: Date
  assignedTo?: string
  tags: string[]
  createdAt: Date
  resolvedAt?: Date
  firstResponseAt?: Date
  notes: Note[]
}

export interface Template {
  id: string
  name: string
  category: 'greeting' | 'farewell' | 'faq' | 'appointment' | 'support' | 'sales' | 'custom'
  content: string
  shortcut?: string
  variables: string[]
  usageCount: number
}

interface ConversationsStore {
  conversations: Conversation[]
  messages: Record<string, Message[]>
  templates: Template[]
  activeConversationId: string | null
  searchQuery: string
  filters: {
    status: ('pending' | 'in_progress' | 'resolved' | 'archived')[]
    channels: ('whatsapp' | 'webchat')[]
    unreadOnly: boolean
  }

  // Conversation actions
  setActiveConversation: (id: string | null) => void
  updateConversationStatus: (id: string, status: Conversation['status']) => void
  togglePin: (id: string) => void
  archiveConversation: (id: string) => void
  transferConversation: (id: string, agentId: string, note?: string) => void
  markAsRead: (id: string) => void

  // Message actions
  sendMessage: (conversationId: string, content: string, type?: Message['type']) => void
  editMessage: (messageId: string, newContent: string) => void
  deleteMessage: (conversationId: string, messageId: string) => void
  getMessages: (conversationId: string) => Message[]

  // Note actions
  addNote: (conversationId: string, content: string, isPinned?: boolean) => void
  updateNote: (conversationId: string, noteId: string, content: string) => void
  deleteNote: (conversationId: string, noteId: string) => void
  togglePinNote: (conversationId: string, noteId: string) => void

  // Template actions
  addTemplate: (template: Omit<Template, 'id' | 'usageCount'>) => void
  updateTemplate: (id: string, template: Partial<Template>) => void
  deleteTemplate: (id: string) => void
  useTemplate: (id: string, variables: Record<string, string>) => string

  // Search and filter
  setSearchQuery: (query: string) => void
  setFilters: (filters: Partial<ConversationsStore['filters']>) => void
  clearFilters: () => void
  getFilteredConversations: () => Conversation[]

  // Stats
  getStats: () => {
    total: number
    unread: number
    pending: number
    inProgress: number
    averageResponseTime: number
  }
}

// Mock templates
const mockTemplates: Template[] = [
  {
    id: 't1',
    name: 'Saudação Padrão',
    category: 'greeting',
    content: 'Olá {nome_cliente}! 👋 Meu nome é {nome_atendente}. Como posso ajudá-lo hoje?',
    shortcut: '/oi',
    variables: ['nome_cliente', 'nome_atendente'],
    usageCount: 142,
  },
  {
    id: 't2',
    name: 'Horário de Atendimento',
    category: 'faq',
    content: 'Nosso horário de atendimento é de segunda a sexta, das 9h às 18h. Hoje é {dia_semana} e são {hora}. Como posso ajudá-lo?',
    shortcut: '/horario',
    variables: ['dia_semana', 'hora'],
    usageCount: 87,
  },
  {
    id: 't3',
    name: 'Agradecimento',
    category: 'farewell',
    content: 'Muito obrigado pelo contato, {nome_cliente}! Qualquer dúvida, estamos à disposição. Tenha um ótimo dia! 😊',
    shortcut: '/obrigado',
    variables: ['nome_cliente'],
    usageCount: 256,
  },
  {
    id: 't4',
    name: 'Agendar Consulta',
    category: 'appointment',
    content: 'Para agendar sua consulta, acesse: {link_agendamento}. Ou me informe sua disponibilidade e farei o agendamento para você!',
    shortcut: '/agendar',
    variables: ['link_agendamento'],
    usageCount: 78,
  },
  {
    id: 't5',
    name: 'Informação de Planos',
    category: 'sales',
    content: 'Temos 3 planos disponíveis: Básico (R$ 97/mês), Profissional (R$ 197/mês) e Enterprise (R$ 397/mês). Qual melhor atende suas necessidades?',
    variables: [],
    usageCount: 124,
  },
]

// Mock messages
const now = new Date()
const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1-1',
      conversationId: '1',
      type: 'system',
      content: 'Conversa iniciada via WhatsApp',
      sender: 'bot',
      senderName: 'Sistema',
      timestamp: new Date(now.getTime() - 3600000),
      status: 'sent',
    },
    {
      id: 'm1-2',
      conversationId: '1',
      type: 'text',
      content: 'Olá! Gostaria de saber mais sobre os planos disponíveis.',
      sender: 'client',
      senderName: 'João Silva',
      timestamp: new Date(now.getTime() - 3540000),
      status: 'read',
    },
    {
      id: 'm1-3',
      conversationId: '1',
      type: 'text',
      content: 'Olá João! Tudo bem? Temos 3 planos principais: Básico, Profissional e Enterprise. Qual seria o seu interesse?',
      sender: 'agent',
      senderName: 'Atendente',
      timestamp: new Date(now.getTime() - 3480000),
      status: 'read',
    },
    {
      id: 'm1-4',
      conversationId: '1',
      type: 'text',
      content: 'Estou interessado no plano Enterprise. Quais são os recursos incluídos?',
      sender: 'client',
      senderName: 'João Silva',
      timestamp: new Date(now.getTime() - 300000),
      status: 'read',
    },
    {
      id: 'm1-5',
      conversationId: '1',
      type: 'text',
      content: 'O plano Enterprise inclui: ✅ Atendimento ilimitado ✅ WhatsApp API ✅ Chatbot com IA ✅ Relatórios avançados ✅ Suporte prioritário 24/7',
      sender: 'agent',
      senderName: 'Atendente',
      timestamp: new Date(now.getTime() - 60000),
      status: 'delivered',
    },
  ],
  '2': [
    {
      id: 'm2-1',
      conversationId: '2',
      type: 'system',
      content: 'Conversa iniciada via WebChat',
      sender: 'bot',
      senderName: 'Sistema',
      timestamp: new Date(now.getTime() - 7200000),
      status: 'sent',
    },
    {
      id: 'm2-2',
      conversationId: '2',
      type: 'text',
      content: 'Preciso de ajuda para configurar meu assistente',
      sender: 'client',
      senderName: 'Maria Santos',
      timestamp: new Date(now.getTime() - 7140000),
      status: 'read',
    },
    {
      id: 'm2-3',
      conversationId: '2',
      type: 'text',
      content: 'Claro! Vou te ajudar. Você já acessou a seção de Configurações do Assistente?',
      sender: 'agent',
      senderName: 'Suporte',
      timestamp: new Date(now.getTime() - 7080000),
      status: 'read',
    },
  ],
}

// Mock conversations
const mockConversations: Conversation[] = [
  {
    id: '1',
    contactId: '1',
    contactName: 'João Silva',
    contactAvatar: 'https://i.pravatar.cc/150?img=1',
    contactPhone: '+55 11 99999-9999',
    channel: 'whatsapp',
    status: 'in_progress',
    isPinned: true,
    unreadCount: 2,
    lastMessageAt: new Date(now.getTime() - 60000),
    assignedTo: 'agent-1',
    tags: ['vip', 'cliente'],
    createdAt: new Date(now.getTime() - 3600000),
    firstResponseAt: new Date(now.getTime() - 3480000),
    notes: [
      {
        id: 'n1',
        conversationId: '1',
        content: 'Cliente VIP. Sempre atender com prioridade.',
        authorId: 'agent-1',
        authorName: 'Admin',
        isPinned: true,
        createdAt: new Date(now.getTime() - 3500000),
        updatedAt: new Date(now.getTime() - 3500000),
      },
    ],
  },
  {
    id: '2',
    contactId: '2',
    contactName: 'Maria Santos',
    contactAvatar: 'https://i.pravatar.cc/150?img=2',
    contactPhone: '+55 11 98888-8888',
    channel: 'webchat',
    status: 'pending',
    isPinned: false,
    unreadCount: 1,
    lastMessageAt: new Date(now.getTime() - 7080000),
    tags: ['suporte'],
    createdAt: new Date(now.getTime() - 7200000),
    notes: [],
  },
  {
    id: '3',
    contactId: '3',
    contactName: 'Pedro Oliveira',
    contactPhone: '+55 21 97777-7777',
    channel: 'whatsapp',
    status: 'resolved',
    isPinned: false,
    unreadCount: 0,
    lastMessageAt: new Date(now.getTime() - 86400000),
    assignedTo: 'agent-2',
    tags: ['lead'],
    createdAt: new Date(now.getTime() - 172800000),
    resolvedAt: new Date(now.getTime() - 86400000),
    firstResponseAt: new Date(now.getTime() - 172740000),
    notes: [],
  },
  {
    id: '4',
    contactId: '4',
    contactName: 'Ana Costa',
    contactAvatar: 'https://i.pravatar.cc/150?img=4',
    contactPhone: '+55 11 96666-6666',
    channel: 'whatsapp',
    status: 'in_progress',
    isPinned: false,
    unreadCount: 0,
    lastMessageAt: new Date(now.getTime() - 1800000),
    assignedTo: 'agent-1',
    tags: ['interessado'],
    createdAt: new Date(now.getTime() - 259200000),
    notes: [],
  },
  {
    id: '5',
    contactId: '5',
    contactName: 'Carlos Mendes',
    contactPhone: '+55 11 95555-5555',
    channel: 'webchat',
    status: 'pending',
    isPinned: true,
    unreadCount: 5,
    lastMessageAt: new Date(now.getTime() - 900000),
    tags: ['vip'],
    createdAt: new Date(now.getTime() - 3600000),
    notes: [],
  },
]

// Add last messages to conversations
mockConversations.forEach((conv) => {
  const messages = mockMessages[conv.id]
  if (messages && messages.length > 0) {
    conv.lastMessage = messages[messages.length - 1]
  }
})

export const useConversations = create<ConversationsStore>()(
  persist(
    (set, get) => ({
      conversations: mockConversations,
      messages: mockMessages,
      templates: mockTemplates,
      activeConversationId: null,
      searchQuery: '',
      filters: {
        status: [],
        channels: [],
        unreadOnly: false,
      },

      // Conversation actions
      setActiveConversation: (id) => {
        set({ activeConversationId: id })
        if (id) {
          get().markAsRead(id)
        }
      },

      updateConversationStatus: (id, status) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id
              ? {
                  ...c,
                  status,
                  resolvedAt: status === 'resolved' ? new Date() : c.resolvedAt,
                }
              : c
          ),
        }))

        // Add system message
        if (status === 'resolved' || status === 'archived') {
          const conversation = get().conversations.find((c) => c.id === id)
          if (conversation) {
            const systemMessage: Message = {
              id: `sys-${Date.now()}`,
              conversationId: id,
              type: 'system',
              content: `Conversa marcada como ${status === 'resolved' ? 'resolvida' : 'arquivada'}`,
              sender: 'bot',
              senderName: 'Sistema',
              timestamp: new Date(),
              status: 'sent',
            }
            set((state) => ({
              messages: {
                ...state.messages,
                [id]: [...(state.messages[id] || []), systemMessage],
              },
            }))
          }
        }
      },

      togglePin: (id) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, isPinned: !c.isPinned } : c
          ),
        }))
      },

      archiveConversation: (id) => {
        get().updateConversationStatus(id, 'archived')
      },

      transferConversation: (id, agentId, note) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, assignedTo: agentId } : c
          ),
        }))

        // Add system message
        const systemMessage: Message = {
          id: `sys-${Date.now()}`,
          conversationId: id,
          type: 'system',
          content: `Conversa transferida para outro atendente${note ? `: ${note}` : ''}`,
          sender: 'bot',
          senderName: 'Sistema',
          timestamp: new Date(),
          status: 'sent',
        }
        set((state) => ({
          messages: {
            ...state.messages,
            [id]: [...(state.messages[id] || []), systemMessage],
          },
        }))
      },

      markAsRead: (id) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, unreadCount: 0 } : c
          ),
          messages: {
            ...state.messages,
            [id]: (state.messages[id] || []).map((m) =>
              m.sender === 'client' ? { ...m, status: 'read' as const } : m
            ),
          },
        }))
      },

      // Message actions
      sendMessage: (conversationId, content, type = 'text') => {
        const newMessage: Message = {
          id: `msg-${Date.now()}`,
          conversationId,
          type,
          content,
          sender: 'agent',
          senderName: 'Atendente',
          timestamp: new Date(),
          status: 'sent',
        }

        set((state) => ({
          messages: {
            ...state.messages,
            [conversationId]: [...(state.messages[conversationId] || []), newMessage],
          },
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  lastMessage: newMessage,
                  lastMessageAt: new Date(),
                  firstResponseAt: c.firstResponseAt || new Date(),
                }
              : c
          ),
        }))

        // Simulate delivery after 1s
        setTimeout(() => {
          set((state) => ({
            messages: {
              ...state.messages,
              [conversationId]: (state.messages[conversationId] || []).map((m) =>
                m.id === newMessage.id ? { ...m, status: 'delivered' as const } : m
              ),
            },
          }))
        }, 1000)
      },

      editMessage: (messageId, newContent) => {
        set((state) => {
          const newMessages = { ...state.messages }
          Object.keys(newMessages).forEach((convId) => {
            newMessages[convId] = newMessages[convId].map((m) =>
              m.id === messageId ? { ...m, content: newContent, isEdited: true } : m
            )
          })
          return { messages: newMessages }
        })
      },

      deleteMessage: (conversationId, messageId) => {
        set((state) => ({
          messages: {
            ...state.messages,
            [conversationId]: (state.messages[conversationId] || []).filter(
              (m) => m.id !== messageId
            ),
          },
        }))
      },

      getMessages: (conversationId) => {
        return get().messages[conversationId] || []
      },

      // Note actions
      addNote: (conversationId, content, isPinned = false) => {
        const newNote: Note = {
          id: `note-${Date.now()}`,
          conversationId,
          content,
          authorId: 'current-user',
          authorName: 'Atendente',
          isPinned,
          createdAt: new Date(),
          updatedAt: new Date(),
        }

        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId ? { ...c, notes: [...c.notes, newNote] } : c
          ),
        }))
      },

      updateNote: (conversationId, noteId, content) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  notes: c.notes.map((n) =>
                    n.id === noteId ? { ...n, content, updatedAt: new Date() } : n
                  ),
                }
              : c
          ),
        }))
      },

      deleteNote: (conversationId, noteId) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? { ...c, notes: c.notes.filter((n) => n.id !== noteId) }
              : c
          ),
        }))
      },

      togglePinNote: (conversationId, noteId) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  notes: c.notes.map((n) =>
                    n.id === noteId ? { ...n, isPinned: !n.isPinned } : n
                  ),
                }
              : c
          ),
        }))
      },

      // Template actions
      addTemplate: (template) => {
        const newTemplate: Template = {
          ...template,
          id: `tpl-${Date.now()}`,
          usageCount: 0,
        }
        set((state) => ({
          templates: [...state.templates, newTemplate],
        }))
      },

      updateTemplate: (id, template) => {
        set((state) => ({
          templates: state.templates.map((t) => (t.id === id ? { ...t, ...template } : t)),
        }))
      },

      deleteTemplate: (id) => {
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== id),
        }))
      },

      useTemplate: (id, variables) => {
        const template = get().templates.find((t) => t.id === id)
        if (!template) return ''

        // Increment usage count
        get().updateTemplate(id, { usageCount: template.usageCount + 1 })

        // Replace variables
        let content = template.content
        Object.entries(variables).forEach(([key, value]) => {
          content = content.replace(new RegExp(`\\{${key}\\}`, 'g'), value)
        })

        return content
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
            status: [],
            channels: [],
            unreadOnly: false,
          },
        })
      },

      getFilteredConversations: () => {
        const { conversations, searchQuery, filters } = get()
        let filtered = [...conversations]

        // Search
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          filtered = filtered.filter(
            (c) =>
              c.contactName.toLowerCase().includes(query) ||
              c.contactPhone.includes(query) ||
              c.lastMessage?.content.toLowerCase().includes(query)
          )
        }

        // Filter by status
        if (filters.status.length > 0) {
          filtered = filtered.filter((c) => filters.status.includes(c.status))
        }

        // Filter by channel
        if (filters.channels.length > 0) {
          filtered = filtered.filter((c) => filters.channels.includes(c.channel))
        }

        // Filter by unread
        if (filters.unreadOnly) {
          filtered = filtered.filter((c) => c.unreadCount > 0)
        }

        // Sort: pinned first, then by last message date
        filtered.sort((a, b) => {
          if (a.isPinned && !b.isPinned) return -1
          if (!a.isPinned && b.isPinned) return 1
          if (a.unreadCount > 0 && b.unreadCount === 0) return -1
          if (a.unreadCount === 0 && b.unreadCount > 0) return 1
          return b.lastMessageAt.getTime() - a.lastMessageAt.getTime()
        })

        return filtered
      },

      // Stats
      getStats: () => {
        const conversations = get().conversations
        return {
          total: conversations.length,
          unread: conversations.filter((c) => c.unreadCount > 0).length,
          pending: conversations.filter((c) => c.status === 'pending').length,
          inProgress: conversations.filter((c) => c.status === 'in_progress').length,
          averageResponseTime: 2.5, // minutes (mock)
        }
      },
    }),
    {
      name: 'conversations-storage',
    }
  )
)
