'use client'

import { useState, KeyboardEvent } from 'react'
import { useConversations } from '@/hooks/useConversations'
import { Button } from '@/components/ui/button'
import { Paperclip, Send, Zap } from 'lucide-react'

interface MessageInputProps {
  conversationId: string
  onTemplateClick: () => void
}

export function MessageInput({ conversationId, onTemplateClick }: MessageInputProps) {
  const { sendMessage } = useConversations()
  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (!message.trim()) return

    sendMessage(conversationId, message.trim())
    setMessage('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border-t border-border p-4 bg-card">
      <div className="flex items-end gap-2">
        {/* Attachment Button */}
        <button
          className="p-2 text-gray-400 hover:text-white hover:bg-background rounded-lg transition-colors"
          title="Anexar arquivo"
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Template Button */}
        <button
          onClick={onTemplateClick}
          className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
          title="Templates (Ctrl+K)"
        >
          <Zap className="w-5 h-5" />
        </button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem... (Enter para enviar, Shift+Enter para nova linha)"
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={1}
            style={{
              minHeight: '42px',
              maxHeight: '120px',
              height: 'auto',
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = 'auto'
              target.style.height = `${Math.min(target.scrollHeight, 120)}px`
            }}
          />
          {/* Character counter */}
          {message.length > 0 && (
            <span
              className={`absolute bottom-1 right-2 text-xs ${
                message.length > 4000 ? 'text-red-500' : 'text-gray-500'
              }`}
            >
              {message.length}/4096
            </span>
          )}
        </div>

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!message.trim() || message.length > 4096}
          glow
          className="shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Keyboard shortcuts hint */}
      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
        <span><kbd className="px-1 py-0.5 bg-background rounded">Enter</kbd> Enviar</span>
        <span><kbd className="px-1 py-0.5 bg-background rounded">Shift+Enter</kbd> Nova linha</span>
        <span><kbd className="px-1 py-0.5 bg-background rounded">Ctrl+K</kbd> Templates</span>
      </div>
    </div>
  )
}
