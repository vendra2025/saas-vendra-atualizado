'use client'

import { useState } from 'react'
import { useConversations } from '@/hooks/useConversations'
import { useContacts } from '@/hooks/useContacts'
import { Tabs } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { TagBadge } from '@/components/contatos/TagBadge'
import { User, FileText, Activity, Mail, Phone, Plus, Pin } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function ConversationDetails() {
  const { activeConversationId, conversations, addNote, deleteNote, togglePinNote } = useConversations()
  const { contacts, tags } = useContacts()
  const [activeTab, setActiveTab] = useState('info')
  const [newNote, setNewNote] = useState('')

  const conversation = conversations.find((c) => c.id === activeConversationId)
  const contact = contacts.find((c) => c.id === conversation?.contactId)

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center bg-card border-l border-border p-6 text-center">
        <p className="text-gray-400 text-sm">
          Selecione uma conversa para ver os detalhes
        </p>
      </div>
    )
  }

  const contactTags = contact ? tags.filter((t) => contact.tags.includes(t.id)) : []

  const tabs = [
    { id: 'info', label: 'Informações', icon: User },
    { id: 'notes', label: 'Notas', icon: FileText },
    { id: 'history', label: 'Histórico', icon: Activity },
  ]

  const handleAddNote = () => {
    if (!newNote.trim()) return
    addNote(conversation.id, newNote.trim())
    setNewNote('')
  }

  return (
    <div className="h-full flex flex-col bg-card border-l border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="font-medium text-white">Detalhes da Conversa</h3>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Info Tab */}
        {activeTab === 'info' && (
          <div className="space-y-4">
            {/* Avatar */}
            <div className="flex justify-center">
              {conversation.contactAvatar ? (
                <img
                  src={conversation.contactAvatar}
                  alt={conversation.contactName}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-medium">
                  {conversation.contactName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="text-center">
              <h4 className="font-medium text-white mb-1">{conversation.contactName}</h4>
              {contact?.company && (
                <p className="text-sm text-gray-400">{contact.company}</p>
              )}
            </div>

            {/* Tags */}
            {contactTags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {contactTags.map((tag) => (
                  <TagBadge key={tag.id} name={tag.name} color={tag.color} size="sm" />
                ))}
              </div>
            )}

            {/* Contact details */}
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-300">{conversation.contactPhone}</span>
              </div>
              {contact?.email && (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-300">{contact.email}</span>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
              <div className="bg-background rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-primary">
                  {contact?.conversationsCount || 0}
                </div>
                <div className="text-xs text-gray-400">Conversas</div>
              </div>
              <div className="bg-background rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-primary">
                  {contact?.appointmentsCount || 0}
                </div>
                <div className="text-xs text-gray-400">Agendamentos</div>
              </div>
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            {/* New note */}
            <div>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Adicionar nota interna..."
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
              />
              <Button
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                className="mt-2 w-full"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar Nota
              </Button>
            </div>

            {/* Notes list */}
            <div className="space-y-3">
              {conversation.notes.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">
                  Nenhuma nota adicionada
                </p>
              ) : (
                conversation.notes
                  .sort((a, b) => {
                    if (a.isPinned && !b.isPinned) return -1
                    if (!a.isPinned && b.isPinned) return 1
                    return b.createdAt.getTime() - a.createdAt.getTime()
                  })
                  .map((note) => (
                    <div
                      key={note.id}
                      className={`p-3 rounded-lg border ${
                        note.isPinned
                          ? 'bg-primary/5 border-primary/30'
                          : 'bg-background border-border'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-white">
                              {note.authorName}
                            </span>
                            {note.isPinned && (
                              <Pin className="w-3 h-3 text-primary" />
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {format(note.createdAt, "d 'de' MMM 'às' HH:mm", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => togglePinNote(conversation.id, note.id)}
                            className="text-gray-400 hover:text-primary text-xs"
                          >
                            {note.isPinned ? 'Desafixar' : 'Fixar'}
                          </button>
                          <button
                            onClick={() => deleteNote(conversation.id, note.id)}
                            className="text-gray-400 hover:text-red-500 text-xs"
                          >
                            Excluir
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 whitespace-pre-wrap">
                        {note.content}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            <div className="text-xs text-gray-400 space-y-3">
              <div className="flex gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                <div className="flex-1">
                  <p className="text-white">Conversa iniciada</p>
                  <p className="text-gray-500">
                    {format(conversation.createdAt, "d 'de' MMM 'às' HH:mm", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </div>

              {conversation.firstResponseAt && (
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5" />
                  <div className="flex-1">
                    <p className="text-white">Primeira resposta</p>
                    <p className="text-gray-500">
                      {format(conversation.firstResponseAt, "d 'de' MMM 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>
              )}

              {conversation.resolvedAt && (
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                  <div className="flex-1">
                    <p className="text-white">Conversa resolvida</p>
                    <p className="text-gray-500">
                      {format(conversation.resolvedAt, "d 'de' MMM 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
