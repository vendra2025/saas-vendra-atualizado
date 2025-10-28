'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAssistantConfig } from '@/hooks/useAssistantConfig'
import { Send } from 'lucide-react'
import { useState } from 'react'

const quickTests = [
  'Olá, preciso de ajuda',
  'Qual o horário de atendimento?',
  'Quero falar com um atendente',
  'Quanto custa?',
]

export function PreviewChat() {
  const { config } = useAssistantConfig()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: config.identity.greeting },
  ])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setMessage('')

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Esta é uma simulação. A resposta real virá da IA configurada.',
        },
      ])
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <Card className="h-[500px] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
            {config.identity.avatar}
          </div>
          <div>
            <div className="font-medium text-white">{config.identity.name}</div>
            <div className="text-xs text-green-500">● Online</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-primary text-background'
                    : 'bg-card border border-border text-white'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date().toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(message)}
              placeholder="Digite uma mensagem..."
              className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button onClick={() => sendMessage(message)}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Tests */}
      <div>
        <p className="text-sm text-gray-400 mb-2">Testes rápidos:</p>
        <div className="flex flex-wrap gap-2">
          {quickTests.map((test) => (
            <button
              key={test}
              onClick={() => sendMessage(test)}
              className="text-xs px-3 py-2 bg-card border border-border rounded-lg text-gray-400 hover:text-white hover:border-primary transition-colors"
            >
              {test}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
