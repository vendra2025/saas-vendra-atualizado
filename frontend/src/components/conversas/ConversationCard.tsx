'use client'

import { Conversation } from '@/hooks/useConversations'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Pin } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ConversationCardProps {
  conversation: Conversation
  isActive: boolean
  onClick: () => void
}

export function ConversationCard({ conversation, isActive, onClick }: ConversationCardProps) {
  const channelColors = {
    whatsapp: '#25D366',
    webchat: '#00B8FF',
  }

  const statusColors = {
    pending: 'warning',
    in_progress: 'info',
    resolved: 'success',
    archived: 'default',
  } as const

  return (
    <div
      onClick={onClick}
      className={`p-3 border-b border-border cursor-pointer transition-all ${
        isActive
          ? 'bg-primary/10 border-l-4 border-l-primary'
          : 'hover:bg-card-hover border-l-4 border-l-transparent'
      } ${conversation.unreadCount > 0 ? 'bg-card' : ''}`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative shrink-0">
          {conversation.contactAvatar ? (
            <img
              src={conversation.contactAvatar}
              alt={conversation.contactName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              {conversation.contactName.charAt(0).toUpperCase()}
            </div>
          )}
          {/* Channel indicator */}
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ backgroundColor: channelColors[conversation.channel] }}
          >
            <MessageCircle className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 min-w-0">
              <h3
                className={`text-sm truncate ${
                  conversation.unreadCount > 0 ? 'font-bold text-white' : 'font-medium text-gray-300'
                }`}
              >
                {conversation.contactName}
              </h3>
              {conversation.isPinned && <Pin className="w-3 h-3 text-primary shrink-0" />}
            </div>
            <span className="text-xs text-gray-500 shrink-0">
              {formatDistanceToNow(conversation.lastMessageAt, {
                addSuffix: true,
                locale: ptBR,
              }).replace('cerca de ', '')}
            </span>
          </div>

          {/* Last message */}
          {conversation.lastMessage && (
            <p
              className={`text-xs truncate mb-2 ${
                conversation.unreadCount > 0 ? 'text-gray-300 font-medium' : 'text-gray-500'
              }`}
            >
              {conversation.lastMessage.sender === 'agent' && 'Você: '}
              {conversation.lastMessage.type === 'system' ? (
                <span className="italic">{conversation.lastMessage.content}</span>
              ) : (
                conversation.lastMessage.content
              )}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-2">
            <Badge variant={statusColors[conversation.status]} className="text-xs">
              {conversation.status === 'pending' && 'Pendente'}
              {conversation.status === 'in_progress' && 'Em andamento'}
              {conversation.status === 'resolved' && 'Resolvido'}
              {conversation.status === 'archived' && 'Arquivado'}
            </Badge>

            {conversation.unreadCount > 0 && (
              <div className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {conversation.unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
