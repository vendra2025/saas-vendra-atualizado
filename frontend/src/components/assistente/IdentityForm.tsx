'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAssistantConfig } from '@/hooks/useAssistantConfig'
import { Bot, User, Briefcase, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const avatarPresets = [
  { id: '1', emoji: '🤖', name: 'Robô' },
  { id: '2', emoji: '👨‍💼', name: 'Profissional' },
  { id: '3', emoji: '👩‍💻', name: 'Técnico' },
  { id: '4', emoji: '🎯', name: 'Objetvo' },
  { id: '5', emoji: '⭐', name: 'Premium' },
  { id: '6', emoji: '💬', name: 'Chat' },
]

const toneOptions = [
  {
    id: 'formal' as const,
    icon: Briefcase,
    label: 'Formal',
    description: 'Sempre use senhor/senhora',
    example: 'Bom dia, senhor. Como posso auxiliá-lo hoje?',
  },
  {
    id: 'friendly' as const,
    icon: Sparkles,
    label: 'Amigável',
    description: 'Use linguagem casual e próxima',
    example: 'Oi! Tudo bem? Como posso te ajudar?',
  },
  {
    id: 'professional' as const,
    icon: Bot,
    label: 'Profissional',
    description: 'Equilibrado entre formal e amigável',
    example: 'Olá! Como posso ajudar você hoje?',
  },
]

export function IdentityForm() {
  const { config, updateIdentity } = useAssistantConfig()
  const { identity } = config

  return (
    <div className="space-y-6">
      {/* Nome do Assistente */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          Nome do Assistente
        </h3>
        <input
          type="text"
          value={identity.name}
          onChange={(e) => updateIdentity({ name: e.target.value })}
          maxLength={50}
          placeholder="Ex: Atendente Virtual Vendra"
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-gray-400 mt-2">
          {identity.name.length}/50 caracteres
        </p>
      </Card>

      {/* Avatar */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Avatar</h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {avatarPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => updateIdentity({ avatar: preset.emoji })}
              className={cn(
                'flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all',
                identity.avatar === preset.emoji
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-gray-600'
              )}
            >
              <span className="text-4xl">{preset.emoji}</span>
              <span className="text-xs text-gray-400">{preset.name}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Tom de Voz */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Tom de Voz</h3>
        <div className="space-y-3">
          {toneOptions.map((option) => {
            const Icon = option.icon
            const isSelected = identity.tone === option.id

            return (
              <button
                key={option.id}
                onClick={() => updateIdentity({ tone: option.id })}
                className={cn(
                  'w-full text-left p-4 rounded-lg border-2 transition-all',
                  isSelected
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-gray-600'
                )}
              >
                <div className="flex items-start gap-3">
                  <Icon className={cn('w-5 h-5 mt-0.5', isSelected ? 'text-primary' : 'text-gray-400')} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-white">{option.label}</h4>
                      {isSelected && (
                        <span className="text-xs text-primary font-medium">
                          Selecionado
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      {option.description}
                    </p>
                    <p className="text-xs text-gray-500 italic">
                      Exemplo: "{option.example}"
                    </p>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </Card>

      {/* Saudação Inicial */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          Saudação Inicial
        </h3>
        <textarea
          value={identity.greeting}
          onChange={(e) => updateIdentity({ greeting: e.target.value })}
          maxLength={300}
          rows={3}
          placeholder="Ex: Olá! Sou o assistente virtual da Vendra. Como posso ajudar?"
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-400">
            {identity.greeting.length}/300 caracteres
          </p>
          <p className="text-xs text-gray-400">
            Variáveis: {'{nome_cliente}'}, {'{horario}'}, {'{dia_semana}'}
          </p>
        </div>
      </Card>

      {/* Mensagem de Despedida */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          Mensagem de Despedida
        </h3>
        <textarea
          value={identity.farewell}
          onChange={(e) => updateIdentity({ farewell: e.target.value })}
          maxLength={300}
          rows={3}
          placeholder="Ex: Foi um prazer ajudar! Se precisar, estou sempre aqui."
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
        <p className="text-xs text-gray-400 mt-2">
          {identity.farewell.length}/300 caracteres
        </p>
      </Card>
    </div>
  )
}
