'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Trigger {
  type: 'new_message' | 'keyword' | 'schedule' | 'contact_created' | 'manual'
  config: {
    keyword?: string
    schedule?: string
    channels?: ('whatsapp' | 'webchat')[]
  }
}

export interface Action {
  id: string
  type: 'send_message' | 'add_tag' | 'assign_agent' | 'create_task' | 'wait'
  config: {
    message?: string
    tagId?: string
    agentId?: string
    taskTitle?: string
    waitMinutes?: number
  }
  order: number
}

export interface Flow {
  id: string
  name: string
  description: string
  isActive: boolean
  trigger: Trigger
  actions: Action[]
  createdAt: Date
  updatedAt: Date
  executionCount: number
}

interface AutomationsStore {
  flows: Flow[]
  addFlow: (flow: Omit<Flow, 'id' | 'createdAt' | 'updatedAt' | 'executionCount'>) => void
  updateFlow: (id: string, flow: Partial<Flow>) => void
  deleteFlow: (id: string) => void
  toggleFlowStatus: (id: string) => void
  getStats: () => { total: number; active: number; executions: number }
}

// Mock flows
const mockFlows: Flow[] = [
  {
    id: '1',
    name: 'Saudação Automática',
    description: 'Envia uma mensagem de boas-vindas quando recebe a primeira mensagem',
    isActive: true,
    trigger: {
      type: 'new_message',
      config: { channels: ['whatsapp', 'webchat'] },
    },
    actions: [
      {
        id: 'a1',
        type: 'send_message',
        config: {
          message: 'Olá! Bem-vindo ao nosso atendimento. Como posso ajudá-lo?',
        },
        order: 1,
      },
    ],
    createdAt: new Date(2025, 9, 15),
    updatedAt: new Date(2025, 9, 15),
    executionCount: 245,
  },
  {
    id: '2',
    name: 'Horário de Atendimento',
    description: 'Informa horário de funcionamento fora do expediente',
    isActive: true,
    trigger: {
      type: 'schedule',
      config: { schedule: '0 18-8 * * *' },
    },
    actions: [
      {
        id: 'a1',
        type: 'send_message',
        config: {
          message: 'Nosso horário de atendimento é de segunda a sexta, das 9h às 18h. Retornaremos em breve!',
        },
        order: 1,
      },
    ],
    createdAt: new Date(2025, 9, 10),
    updatedAt: new Date(2025, 9, 10),
    executionCount: 89,
  },
  {
    id: '3',
    name: 'Palavra-chave: Preço',
    description: 'Responde automaticamente quando cliente pergunta sobre preços',
    isActive: true,
    trigger: {
      type: 'keyword',
      config: { keyword: 'preço', channels: ['whatsapp', 'webchat'] },
    },
    actions: [
      {
        id: 'a1',
        type: 'send_message',
        config: {
          message: 'Nossos planos:\n\n✅ Básico: R$ 97/mês\n✅ Profissional: R$ 197/mês\n✅ Enterprise: R$ 397/mês\n\nQual melhor atende suas necessidades?',
        },
        order: 1,
      },
    ],
    createdAt: new Date(2025, 9, 20),
    updatedAt: new Date(2025, 9, 25),
    executionCount: 156,
  },
]

export const useAutomations = create<AutomationsStore>()(
  persist(
    (set, get) => ({
      flows: mockFlows,

      addFlow: (flow) => {
        const newFlow: Flow = {
          ...flow,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
          executionCount: 0,
        }
        set((state) => ({ flows: [...state.flows, newFlow] }))
      },

      updateFlow: (id, flow) => {
        set((state) => ({
          flows: state.flows.map((f) =>
            f.id === id ? { ...f, ...flow, updatedAt: new Date() } : f
          ),
        }))
      },

      deleteFlow: (id) => {
        set((state) => ({ flows: state.flows.filter((f) => f.id !== id) }))
      },

      toggleFlowStatus: (id) => {
        set((state) => ({
          flows: state.flows.map((f) =>
            f.id === id ? { ...f, isActive: !f.isActive, updatedAt: new Date() } : f
          ),
        }))
      },

      getStats: () => {
        const flows = get().flows
        return {
          total: flows.length,
          active: flows.filter((f) => f.isActive).length,
          executions: flows.reduce((sum, f) => sum + f.executionCount, 0),
        }
      },
    }),
    {
      name: 'automations-storage',
    }
  )
)
