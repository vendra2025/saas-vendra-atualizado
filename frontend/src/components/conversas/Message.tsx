'use client'

import { Message as MessageType } from '@/hooks/useConversations'
import { Check, CheckCheck } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface MessageProps {
  message: MessageType
}

export function Message({ message }: MessageProps) {
  // System message (centered)
  if (message.type === 'system') {
    return (
      <div className="flex justify-center my-4">
        <div className="px-3 py-1 rounded-full bg-card text-gray-400 text-xs italic">
          {message.content}
        </div>
      </div>
    )
  }

  // Bot message (centered with special styling)
  if (message.sender === 'bot') {
    return (
      <div className="flex justify-center my-4">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-1 justify-center">
            <span className="text-xl">🤖</span>
            <span className="text-xs text-purple-400 font-medium">Assistente IA</span>
          </div>
          <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3">
            <p className="text-sm text-purple-200">{message.content}</p>
            <span className="text-xs text-purple-400/60 mt-1 block">
              {format(message.timestamp, 'HH:mm', { locale: ptBR })}
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Client message (left)
  if (message.sender === 'client') {
    return (
      <div className="flex items-start gap-2 mb-4">
        <div className="flex-1 max-w-[70%]">
          <div className="bg-card rounded-lg rounded-tl-none p-3">
            <p className="text-sm text-white break-words">{message.content}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500">
                {format(message.timestamp, 'HH:mm', { locale: ptBR })}
              </span>
              {message.isEdited && (
                <span className="text-xs text-gray-500 italic">editada</span>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Agent message (right)
  return (
    <div className="flex items-start justify-end gap-2 mb-4">
      <div className="flex-1 max-w-[70%] flex justify-end">
        <div className="bg-primary/20 rounded-lg rounded-tr-none p-3">
          <p className="text-sm text-white break-words">{message.content}</p>
          <div className="flex items-center gap-2 mt-1 justify-end">
            <span className="text-xs text-gray-400">
              {format(message.timestamp, 'HH:mm', { locale: ptBR })}
            </span>
            {message.isEdited && (
              <span className="text-xs text-gray-400 italic">editada</span>
            )}
            {/* Message status indicators */}
            {message.status === 'sent' && (
              <Check className="w-3 h-3 text-gray-400" />
            )}
            {message.status === 'delivered' && (
              <CheckCheck className="w-3 h-3 text-gray-400" />
            )}
            {message.status === 'read' && (
              <CheckCheck className="w-3 h-3 text-primary" />
            )}
            {message.status === 'failed' && (
              <span className="text-xs text-red-500">✗</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
