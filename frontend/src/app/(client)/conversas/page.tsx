'use client'

import { useState } from 'react'
import { useConversations } from '@/hooks/useConversations'
import { ConversationList } from '@/components/conversas/ConversationList'
import { ChatWindow } from '@/components/conversas/ChatWindow'
import { ConversationDetails } from '@/components/conversas/ConversationDetails'
import { TemplatesModal } from '@/components/conversas/TemplatesModal'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { MessageCircle, UserPlus } from 'lucide-react'

export default function ConversasPage() {
  const { getStats, transferConversation, activeConversationId } = useConversations()
  const stats = getStats()
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false)
  const [isTransferOpen, setIsTransferOpen] = useState(false)
  const [selectedTemplateContent, setSelectedTemplateContent] = useState('')

  const handleSelectTemplate = (content: string) => {
    setSelectedTemplateContent(content)
    // In a real app, this would insert the template into the message input
    // For now, we'll just log it
    console.log('Template selected:', content)
  }

  const mockAgents = [
    { id: 'agent-1', name: 'João (Você)', status: 'online', activeConversations: 3 },
    { id: 'agent-2', name: 'Maria Silva', status: 'online', activeConversations: 2 },
    { id: 'agent-3', name: 'Pedro Santos', status: 'busy', activeConversations: 5 },
    { id: 'agent-4', name: 'Ana Costa', status: 'away', activeConversations: 0 },
  ]

  const handleTransfer = (agentId: string, note: string) => {
    if (!activeConversationId) return
    transferConversation(activeConversationId, agentId, note)
    setIsTransferOpen(false)
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Conversas</h1>
            <p className="text-sm text-gray-400">
              {stats.total} conversas • {stats.unread} não lidas • {stats.pending} pendentes
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-2 bg-background rounded-lg border border-border">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-white">Online</span>
          </div>
        </div>
      </div>

      {/* Main Content - 3 Columns */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Conversations List (25%) */}
        <div className="w-1/4 min-w-[300px]">
          <ConversationList />
        </div>

        {/* Center - Chat Window (50%) */}
        <div className="flex-1">
          <ChatWindow
            onTemplateClick={() => setIsTemplatesOpen(true)}
            onTransferClick={() => setIsTransferOpen(true)}
          />
        </div>

        {/* Right Sidebar - Conversation Details (25%) */}
        <div className="w-1/4 min-w-[300px]">
          <ConversationDetails />
        </div>
      </div>

      {/* Templates Modal */}
      <TemplatesModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />

      {/* Transfer Modal */}
      <Modal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        title="Transferir Conversa"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-300 text-sm">
            Selecione um atendente para transferir esta conversa:
          </p>

          {/* Agents List */}
          <div className="space-y-2">
            {mockAgents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => handleTransfer(agent.id, '')}
                disabled={agent.id === 'agent-1'}
                className={`w-full p-3 rounded-lg border transition-colors text-left ${
                  agent.id === 'agent-1'
                    ? 'bg-card border-border opacity-50 cursor-not-allowed'
                    : 'bg-card border-border hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      agent.status === 'online' ? 'bg-green-500' :
                      agent.status === 'busy' ? 'bg-yellow-500' :
                      'bg-gray-500'
                    }`} />
                    <div>
                      <div className="font-medium text-white">{agent.name}</div>
                      <div className="text-xs text-gray-400">
                        {agent.activeConversations} conversas ativas
                      </div>
                    </div>
                  </div>
                  <UserPlus className="w-4 h-4 text-gray-400" />
                </div>
              </button>
            ))}
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <Button variant="outline" onClick={() => setIsTransferOpen(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
