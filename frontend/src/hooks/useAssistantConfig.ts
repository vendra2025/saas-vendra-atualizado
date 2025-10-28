'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AssistantConfig {
  identity: {
    name: string
    avatar: string
    tone: 'formal' | 'friendly' | 'professional' | 'custom'
    customTone?: string
    greeting: string
    farewell: string
  }
  objectives: {
    primary: string
    secondary: string[]
    shouldDo: string[]
    shouldNotDo: string[]
  }
  instructions: string
  rules: {
    schedule: {
      enabled: boolean
      hours: Record<string, { start: string; end: string; closed: boolean }>
      offlineMessage: string
    }
    transferKeywords: string[]
    messageLimit: number
    detectFrustration: boolean
    persistContext: boolean
    contextDuration: number
  }
  parameters: {
    model: string
    temperature: number
    maxTokens: number
    contextFrequency: 'low' | 'medium' | 'high'
    citeSources: boolean
    fallbackEnabled: boolean
    fallbackMessage: string
  }
}

const defaultConfig: AssistantConfig = {
  identity: {
    name: 'Assistente Virtual',
    avatar: '/avatars/default.png',
    tone: 'professional',
    greeting: 'Olá! Como posso ajudar você hoje?',
    farewell: 'Foi um prazer conversar! Até logo!',
  },
  objectives: {
    primary: 'Responder dúvidas e fornecer suporte aos clientes',
    secondary: [
      'Qualificar leads',
      'Agendar reuniões',
      'Coletar feedback',
    ],
    shouldDo: [
      'Responder rapidamente',
      'Ser empático',
      'Coletar informações',
      'Transferir quando necessário',
    ],
    shouldNotDo: [
      'Fazer promessas impossíveis',
      'Compartilhar dados sensíveis',
      'Insistir após recusa',
    ],
  },
  instructions: `Você é um assistente virtual profissional.
Sempre seja educado, claro e objetivo.
Se não souber algo, admita e ofereça alternativas.`,
  rules: {
    schedule: {
      enabled: true,
      hours: {
        monday: { start: '09:00', end: '18:00', closed: false },
        tuesday: { start: '09:00', end: '18:00', closed: false },
        wednesday: { start: '09:00', end: '18:00', closed: false },
        thursday: { start: '09:00', end: '18:00', closed: false },
        friday: { start: '09:00', end: '18:00', closed: false },
        saturday: { start: '09:00', end: '12:00', closed: false },
        sunday: { start: '00:00', end: '00:00', closed: true },
      },
      offlineMessage: 'Estamos fora do horário de atendimento. Retornaremos em breve!',
    },
    transferKeywords: ['atendente', 'humano', 'cancelar', 'reclamação'],
    messageLimit: 5,
    detectFrustration: true,
    persistContext: true,
    contextDuration: 7,
  },
  parameters: {
    model: 'claude-sonnet-3.5',
    temperature: 0.7,
    maxTokens: 500,
    contextFrequency: 'high',
    citeSources: true,
    fallbackEnabled: true,
    fallbackMessage: 'Não tenho certeza sobre isso. Deixe-me transferir para um atendente.',
  },
}

interface AssistantConfigStore {
  config: AssistantConfig
  isSaving: boolean
  lastSaved: Date | null

  // Actions
  updateIdentity: (identity: Partial<AssistantConfig['identity']>) => void
  updateObjectives: (objectives: Partial<AssistantConfig['objectives']>) => void
  updateInstructions: (instructions: string) => void
  updateRules: (rules: Partial<AssistantConfig['rules']>) => void
  updateParameters: (parameters: Partial<AssistantConfig['parameters']>) => void
  resetToDefault: () => void
  exportConfig: () => string
  importConfig: (json: string) => void
  saveConfig: () => Promise<void>
}

export const useAssistantConfig = create<AssistantConfigStore>()(
  persist(
    (set, get) => ({
      config: defaultConfig,
      isSaving: false,
      lastSaved: null,

      updateIdentity: (identity) =>
        set((state) => ({
          config: {
            ...state.config,
            identity: { ...state.config.identity, ...identity },
          },
        })),

      updateObjectives: (objectives) =>
        set((state) => ({
          config: {
            ...state.config,
            objectives: { ...state.config.objectives, ...objectives },
          },
        })),

      updateInstructions: (instructions) =>
        set((state) => ({
          config: { ...state.config, instructions },
        })),

      updateRules: (rules) =>
        set((state) => ({
          config: {
            ...state.config,
            rules: { ...state.config.rules, ...rules },
          },
        })),

      updateParameters: (parameters) =>
        set((state) => ({
          config: {
            ...state.config,
            parameters: { ...state.config.parameters, ...parameters },
          },
        })),

      resetToDefault: () =>
        set({
          config: defaultConfig,
          lastSaved: null,
        }),

      exportConfig: () => {
        const { config } = get()
        return JSON.stringify(config, null, 2)
      },

      importConfig: (json) => {
        try {
          const config = JSON.parse(json) as AssistantConfig
          set({ config, lastSaved: new Date() })
        } catch (error) {
          console.error('Failed to import config:', error)
        }
      },

      saveConfig: async () => {
        set({ isSaving: true })
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        set({ isSaving: false, lastSaved: new Date() })
        console.log('Config saved:', get().config)
      },
    }),
    {
      name: 'assistant-config',
    }
  )
)
