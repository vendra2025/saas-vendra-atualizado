'use client'

import { Contact, useContacts } from '@/hooks/useContacts'
import { TagBadge } from './TagBadge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, MessageCircle, Building, Mail, Phone, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ContactCardProps {
  contact: Contact
  view: 'grid' | 'table'
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onMessage: (id: string) => void
  onSelect?: (id: string) => void
  isSelected?: boolean
}

export function ContactCard({
  contact,
  view,
  onEdit,
  onDelete,
  onMessage,
  onSelect,
  isSelected,
}: ContactCardProps) {
  const { tags } = useContacts()
  const contactTags = tags.filter((t) => contact.tags.includes(t.id))

  const statusColors = {
    active: 'success',
    inactive: 'default',
    blocked: 'danger',
  } as const

  const statusLabels = {
    active: 'Ativo',
    inactive: 'Inativo',
    blocked: 'Bloqueado',
  }

  if (view === 'table') {
    return (
      <tr className="border-b border-border hover:bg-card-hover transition-colors">
        {onSelect && (
          <td className="p-4">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(contact.id)}
              className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary"
            />
          </td>
        )}
        <td className="p-4">
          <div className="flex items-center gap-3">
            {contact.avatar ? (
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                {contact.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="font-medium text-white">{contact.name}</div>
              <div className="text-xs text-gray-400">{contact.position || 'Sem cargo'}</div>
            </div>
          </div>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Mail className="w-4 h-4 text-gray-500" />
            {contact.email}
          </div>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Phone className="w-4 h-4 text-gray-500" />
            {contact.phone}
          </div>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Building className="w-4 h-4 text-gray-500" />
            {contact.company || '-'}
          </div>
        </td>
        <td className="p-4">
          <div className="flex flex-wrap gap-1">
            {contactTags.slice(0, 2).map((tag) => (
              <TagBadge key={tag.id} name={tag.name} color={tag.color} size="sm" />
            ))}
            {contactTags.length > 2 && (
              <span className="text-xs text-gray-400">+{contactTags.length - 2}</span>
            )}
          </div>
        </td>
        <td className="p-4">
          <div className="text-sm text-gray-400">
            {contact.lastInteraction
              ? formatDistanceToNow(contact.lastInteraction, {
                  addSuffix: true,
                  locale: ptBR,
                })
              : 'Nunca'}
          </div>
        </td>
        <td className="p-4">
          <Badge variant={statusColors[contact.status]}>{statusLabels[contact.status]}</Badge>
        </td>
        <td className="p-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onMessage(contact.id)}
              className="p-2 hover:bg-card rounded-lg transition-colors text-gray-400 hover:text-primary"
              title="Enviar mensagem"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => onEdit(contact.id)}
              className="p-2 hover:bg-card rounded-lg transition-colors text-gray-400 hover:text-white"
              title="Editar"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(contact.id)}
              className="p-2 hover:bg-card rounded-lg transition-colors text-gray-400 hover:text-red-500"
              title="Excluir"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    )
  }

  // Grid view
  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:border-primary/50 transition-all group">
      {onSelect && (
        <div className="flex justify-end mb-2">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(contact.id)}
            className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary"
          />
        </div>
      )}

      {/* Avatar and Name */}
      <div className="flex items-start gap-3 mb-3">
        {contact.avatar ? (
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl font-medium">
            {contact.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{contact.name}</h3>
          {contact.company && (
            <p className="text-sm text-gray-400 truncate flex items-center gap-1">
              <Building className="w-3 h-3" />
              {contact.company}
            </p>
          )}
          <div className="mt-1">
            <Badge variant={statusColors[contact.status]}>
              {statusLabels[contact.status]}
            </Badge>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-300 truncate">
          <Mail className="w-4 h-4 text-gray-500 shrink-0" />
          <span className="truncate">{contact.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Phone className="w-4 h-4 text-gray-500 shrink-0" />
          {contact.phone}
        </div>
      </div>

      {/* Tags */}
      {contactTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {contactTags.slice(0, 3).map((tag) => (
            <TagBadge key={tag.id} name={tag.name} color={tag.color} size="sm" />
          ))}
          {contactTags.length > 3 && (
            <span className="text-xs text-gray-400 self-center">+{contactTags.length - 3}</span>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 mb-3 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3" />
          {contact.conversationsCount} conversas
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {contact.appointmentsCount} eventos
        </div>
      </div>

      {/* Last Interaction */}
      <div className="text-xs text-gray-500 mb-3">
        Última interação:{' '}
        {contact.lastInteraction
          ? formatDistanceToNow(contact.lastInteraction, {
              addSuffix: true,
              locale: ptBR,
            })
          : 'Nunca'}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onMessage(contact.id)}
          className="flex-1"
        >
          <MessageCircle className="w-3 h-3 mr-1" />
          Mensagem
        </Button>
        <button
          onClick={() => onEdit(contact.id)}
          className="p-2 hover:bg-background rounded-lg transition-colors text-gray-400 hover:text-white"
          title="Editar"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          className="p-2 hover:bg-background rounded-lg transition-colors text-gray-400 hover:text-red-500"
          title="Excluir"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
