'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAssistantConfig } from '@/hooks/useAssistantConfig'
import { Plus, X, Check, Ban } from 'lucide-react'
import { useState } from 'react'

const primaryExamples = [
  'Responder dúvidas sobre produtos e serviços',
  'Qualificar leads e agendar reuniões',
  'Oferecer suporte técnico básico',
  'Processar pedidos e pagamentos',
]

const shouldDoOptions = [
  'Responder rapidamente (em até 2 segundos)',
  'Ser empático e compreensivo',
  'Coletar informações importantes',
  'Sugerir produtos/serviços relevantes',
  'Transferir para humano quando necessário',
  'Confirmar informações antes de processar',
]

const shouldNotDoOptions = [
  'Fazer promessas que não pode cumprir',
  'Compartilhar dados sensíveis',
  'Tomar decisões financeiras sem autorização',
  'Insistir após recusa do cliente',
  'Usar linguagem ofensiva ou inadequada',
]

export function ObjectivesForm() {
  const { config, updateObjectives } = useAssistantConfig()
  const { objectives } = config
  const [newSecondary, setNewSecondary] = useState('')

  const addSecondary = () => {
    if (newSecondary.trim() && objectives.secondary.length < 5) {
      updateObjectives({
        secondary: [...objectives.secondary, newSecondary.trim()],
      })
      setNewSecondary('')
    }
  }

  const removeSecondary = (index: number) => {
    updateObjectives({
      secondary: objectives.secondary.filter((_, i) => i !== index),
    })
  }

  const toggleShouldDo = (option: string) => {
    if (objectives.shouldDo.includes(option)) {
      updateObjectives({
        shouldDo: objectives.shouldDo.filter((o) => o !== option),
      })
    } else {
      updateObjectives({
        shouldDo: [...objectives.shouldDo, option],
      })
    }
  }

  const toggleShouldNotDo = (option: string) => {
    if (objectives.shouldNotDo.includes(option)) {
      updateObjectives({
        shouldNotDo: objectives.shouldNotDo.filter((o) => o !== option),
      })
    } else {
      updateObjectives({
        shouldNotDo: [...objectives.shouldNotDo, option],
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Objetivo Principal */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          Objetivo Principal
        </h3>
        <textarea
          value={objectives.primary}
          onChange={(e) => updateObjectives({ primary: e.target.value })}
          maxLength={500}
          rows={3}
          placeholder="Descreva o objetivo principal do seu assistente..."
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
        <p className="text-xs text-gray-400 mt-2">
          {objectives.primary.length}/500 caracteres
        </p>

        {/* Exemplos */}
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-2">Exemplos rápidos:</p>
          <div className="flex flex-wrap gap-2">
            {primaryExamples.map((example) => (
              <button
                key={example}
                onClick={() => updateObjectives({ primary: example })}
                className="text-xs px-3 py-1.5 bg-card border border-border rounded-lg text-gray-400 hover:text-white hover:border-primary transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Objetivos Secundários */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          Objetivos Secundários
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Máximo de 5 objetivos secundários
        </p>

        {/* Lista atual */}
        <div className="space-y-2 mb-4">
          {objectives.secondary.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-background border border-border rounded-lg"
            >
              <span className="flex-1 text-sm text-white">{item}</span>
              <button
                onClick={() => removeSecondary(index)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Adicionar novo */}
        {objectives.secondary.length < 5 && (
          <div className="flex gap-2">
            <input
              type="text"
              value={newSecondary}
              onChange={(e) => setNewSecondary(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSecondary()}
              maxLength={200}
              placeholder="Digite um objetivo secundário..."
              className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button onClick={addSecondary} disabled={!newSecondary.trim()}>
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}
      </Card>

      {/* O que o assistente DEVE fazer */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Check className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold text-white">
            O que o assistente DEVE fazer
          </h3>
        </div>
        <div className="space-y-2">
          {shouldDoOptions.map((option) => (
            <label
              key={option}
              className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                checked={objectives.shouldDo.includes(option)}
                onChange={() => toggleShouldDo(option)}
                className="mt-0.5 w-4 h-4 rounded border-gray-600 text-primary focus:ring-primary"
              />
              <span className="text-sm text-white">{option}</span>
            </label>
          ))}
        </div>
      </Card>

      {/* O que o assistente NÃO DEVE fazer */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Ban className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-semibold text-white">
            O que o assistente NÃO DEVE fazer
          </h3>
        </div>
        <div className="space-y-2">
          {shouldNotDoOptions.map((option) => (
            <label
              key={option}
              className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-red-500/50 transition-colors cursor-pointer"
            >
              <input
                type="checkbox"
                checked={objectives.shouldNotDo.includes(option)}
                onChange={() => toggleShouldNotDo(option)}
                className="mt-0.5 w-4 h-4 rounded border-gray-600 text-red-500 focus:ring-red-500"
              />
              <span className="text-sm text-white">{option}</span>
            </label>
          ))}
        </div>
      </Card>
    </div>
  )
}
