'use client'

import { useState } from 'react'
import { useConversations } from '@/hooks/useConversations'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Search, Zap, X } from 'lucide-react'

interface TemplatesModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (content: string) => void
}

export function TemplatesModal({ isOpen, onClose, onSelectTemplate }: TemplatesModalProps) {
  const { templates, useTemplate, activeConversationId, conversations } = useConversations()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const conversation = conversations.find((c) => c.id === activeConversationId)

  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'greeting', label: 'Saudações' },
    { id: 'farewell', label: 'Despedidas' },
    { id: 'faq', label: 'FAQ' },
    { id: 'appointment', label: 'Agendamentos' },
    { id: 'support', label: 'Suporte' },
    { id: 'sales', label: 'Vendas' },
  ]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleUseTemplate = (templateId: string) => {
    const variables: Record<string, string> = {
      nome_cliente: conversation?.contactName || 'Cliente',
      nome_atendente: 'Atendente',
      dia_semana: new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(new Date()),
      hora: new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date()),
      empresa: 'SaaS Vendra',
      link_agendamento: 'https://exemplo.com/agendar',
    }

    const content = useTemplate(templateId, variables)
    onSelectTemplate(content)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Templates de Respostas" size="lg">
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar templates..."
            className="w-full pl-10 pr-8 py-2 bg-background border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary text-background'
                  : 'bg-card text-gray-300 hover:text-white border border-border'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Templates List */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-8">
              <Zap className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">Nenhum template encontrado</p>
            </div>
          ) : (
            filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-white">{template.name}</h4>
                      {template.shortcut && (
                        <code className="px-2 py-0.5 text-xs bg-background rounded text-primary">
                          {template.shortcut}
                        </code>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">
                      {template.content}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleUseTemplate(template.id)}
                  >
                    Usar
                  </Button>
                </div>

                {/* Variables */}
                {template.variables.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-border">
                    {template.variables.map((variable) => (
                      <span
                        key={variable}
                        className="px-2 py-0.5 text-xs bg-background rounded text-gray-400"
                      >
                        {`{${variable}}`}
                      </span>
                    ))}
                  </div>
                )}

                {/* Usage count */}
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-border text-xs text-gray-500">
                  <span>Usado {template.usageCount} vezes</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  )
}
