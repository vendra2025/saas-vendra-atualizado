'use client'

import { useEffect, useRef } from 'react'
import { useConversations } from '@/hooks/useConversations'
import { Message } from './Message'
import { MessageInput } from './MessageInput'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Pin, Check, MoreVertical, Archive, UserPlus } from 'lucide-react'
import { format, isToday, isYesterday, isSameDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ChatWindowProps {
  onTemplateClick: () => void
  onTransferClick: () => void
}

export function ChatWindow({ onTemplateClick, onTransferClick }: ChatWindowProps) {
  const {
    activeConversationId,
    conversations,
    getMessages,
    togglePin,
    updateConversationStatus,
    archiveConversation,
  } = useConversations()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const conversation = conversations.find((c) => c.id === activeConversationId)
  const messages = activeConversationId ? getMessages(activeConversationId) : []

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-card mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl">💬</span>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            Nenhuma conversa selecionada
          </h3>
          <p className="text-gray-400 text-sm">
            Selecione uma conversa na lista para começar
          </p>
        </div>
      </div>
    )
  }

  const channelColors = {
    whatsapp: '#25D366',
    webchat: '#00B8FF',
  }

  const channelLabels = {
    whatsapp: 'WhatsApp',
    webchat: 'WebChat',
  }

  const statusColors = {
    pending: 'warning',
    in_progress: 'info',
    resolved: 'success',
    archived: 'default',
  } as const

  const statusLabels = {
    pending: 'Pendente',
    in_progress: 'Em Andamento',
    resolved: 'Resolvido',
    archived: 'Arquivado',
  }

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const dateKey = format(message.timestamp, 'yyyy-MM-dd')
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(message)
    return groups
  }, {} as Record<string, typeof messages>)

  const getDateLabel = (dateString: string) => {
    const date = new Date(dateString)
    if (isToday(date)) return 'Hoje'
    if (isYesterday(date)) return 'Ontem'
    return format(date, "d 'de' MMMM", { locale: ptBR })
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {conversation.contactAvatar ? (
            <img
              src={conversation.contactAvatar}
              alt={conversation.contactName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              {conversation.contactName.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Info */}
          <div>
            <h3 className="font-medium text-white">{conversation.contactName}</h3>
            <div className="flex items-center gap-2">
              <Badge
                style={{
                  backgroundColor: `${channelColors[conversation.channel]}20`,
                  color: channelColors[conversation.channel],
                  borderColor: `${channelColors[conversation.channel]}40`,
                }}
                className="text-xs"
              >
                {channelLabels[conversation.channel]}
              </Badge>
              <Badge variant={statusColors[conversation.status]} className="text-xs">
                {statusLabels[conversation.status]}
              </Badge>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => togglePin(conversation.id)}
            className={`p-2 rounded-lg transition-colors ${
              conversation.isPinned
                ? 'text-primary bg-primary/10'
                : 'text-gray-400 hover:text-white hover:bg-background'
            }`}
            title={conversation.isPinned ? 'Desafixar' : 'Fixar conversa'}
          >
            <Pin className="w-4 h-4" />
          </button>

          {conversation.status !== 'resolved' && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => updateConversationStatus(conversation.id, 'resolved')}
            >
              <Check className="w-4 h-4 mr-1" />
              Resolver
            </Button>
          )}

          <button
            onClick={onTransferClick}
            className="p-2 text-gray-400 hover:text-white hover:bg-background rounded-lg transition-colors"
            title="Transferir conversa"
          >
            <UserPlus className="w-4 h-4" />
          </button>

          <button
            onClick={() => archiveConversation(conversation.id)}
            className="p-2 text-gray-400 hover:text-white hover:bg-background rounded-lg transition-colors"
            title="Arquivar"
          >
            <Archive className="w-4 h-4" />
          </button>

          <button
            className="p-2 text-gray-400 hover:text-white hover:bg-background rounded-lg transition-colors"
            title="Mais opções"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-1"
      >
        {Object.entries(groupedMessages).map(([dateKey, dayMessages]) => (
          <div key={dateKey}>
            {/* Date separator */}
            <div className="flex justify-center my-6">
              <div className="px-3 py-1 rounded-full bg-card text-gray-400 text-xs">
                {getDateLabel(dateKey)}
              </div>
            </div>

            {/* Messages for this date */}
            {dayMessages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      {conversation.status !== 'archived' && (
        <MessageInput
          conversationId={conversation.id}
          onTemplateClick={onTemplateClick}
        />
      )}
    </div>
  )
}
