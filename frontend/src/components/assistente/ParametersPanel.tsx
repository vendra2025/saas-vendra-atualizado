'use client'

import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { useAssistantConfig } from '@/hooks/useAssistantConfig'
import { Brain, Zap, MessageSquare, FileText } from 'lucide-react'

const models = [
  { id: 'claude-sonnet-3.5', name: 'Claude Sonnet 3.5', recommended: true, price: '$3/1M tokens' },
  { id: 'claude-opus-3', name: 'Claude Opus 3', recommended: false, price: '$15/1M tokens' },
  { id: 'gpt-4o', name: 'GPT-4o', recommended: false, price: '$5/1M tokens' },
  { id: 'gpt-4o-mini', name: 'GPT-4o mini', recommended: false, price: '$0.15/1M tokens' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', recommended: false, price: '$3.5/1M tokens' },
]

export function ParametersPanel() {
  const { config, updateParameters } = useAssistantConfig()
  const { parameters } = config

  return (
    <div className="space-y-6">
      {/* Modelo de IA */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-white">Modelo de IA</h3>
        </div>
        <div className="space-y-2">
          {models.map((model) => (
            <button
              key={model.id}
              onClick={() => updateParameters({ model: model.id })}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                parameters.model === model.id
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{model.name}</span>
                    {model.recommended && (
                      <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">{model.price}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Temperatura */}
      <Card>
        <Slider
          label="Temperatura"
          value={parameters.temperature}
          onChange={(value) => updateParameters({ temperature: value })}
          min={0}
          max={1}
          step={0.1}
          description={
            parameters.temperature < 0.4
              ? '🧊 Mais conservador e consistente'
              : parameters.temperature > 0.7
              ? '🔥 Mais criativo e variado'
              : '⚖️ Equilibrado'
          }
        />
      </Card>

      {/* Máximo de Tokens */}
      <Card>
        <Slider
          label="Máximo de Tokens por Resposta"
          value={parameters.maxTokens}
          onChange={(value) => updateParameters({ maxTokens: value })}
          min={100}
          max={4000}
          step={100}
          description={`Tokens ≈ palavras × 1.3 | Custo estimado: ~$${((parameters.maxTokens / 1000000) * 3).toFixed(4)} por resposta`}
        />
      </Card>

      {/* Frequência de Contexto */}
      <Card>
        <h3 className="text-sm font-medium text-white mb-3">
          Frequência de Contexto
        </h3>
        <div className="space-y-2">
          {(['low', 'medium', 'high'] as const).map((freq) => (
            <label
              key={freq}
              className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors"
              style={{
                borderColor: parameters.contextFrequency === freq ? 'var(--primary)' : 'var(--border)',
                backgroundColor: parameters.contextFrequency === freq ? 'rgba(0, 255, 136, 0.1)' : 'transparent',
              }}
            >
              <input
                type="radio"
                checked={parameters.contextFrequency === freq}
                onChange={() => updateParameters({ contextFrequency: freq })}
                className="w-4 h-4"
              />
              <div>
                <div className="text-sm font-medium text-white capitalize">{freq === 'low' ? 'Baixa' : freq === 'medium' ? 'Média' : 'Alta'}</div>
                <div className="text-xs text-gray-400">
                  {freq === 'low' && 'Considera apenas a mensagem atual'}
                  {freq === 'medium' && 'Considera últimas 5 mensagens'}
                  {freq === 'high' && 'Considera toda a conversa (recomendado)'}
                </div>
              </div>
            </label>
          ))}
        </div>
      </Card>

      {/* Outras Configurações */}
      <Card>
        <h3 className="text-sm font-medium text-white mb-3">
          Outras Configurações
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={parameters.citeSources}
              onChange={(e) => updateParameters({ citeSources: e.target.checked })}
              className="w-4 h-4 rounded"
            />
            <div>
              <div className="text-sm text-white">Citar fonte ao responder</div>
              <div className="text-xs text-gray-400">
                Formato: "Segundo o documento X..."
              </div>
            </div>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={parameters.fallbackEnabled}
              onChange={(e) => updateParameters({ fallbackEnabled: e.target.checked })}
              className="w-4 h-4 rounded"
            />
            <div>
              <div className="text-sm text-white">Ativar resposta padrão quando não souber</div>
            </div>
          </label>

          {parameters.fallbackEnabled && (
            <textarea
              value={parameters.fallbackMessage}
              onChange={(e) => updateParameters({ fallbackMessage: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-white"
              placeholder="Mensagem fallback..."
            />
          )}
        </div>
      </Card>
    </div>
  )
}
