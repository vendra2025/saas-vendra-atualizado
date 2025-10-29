'use client'

import { useState } from 'react'
import { Contact, useContacts } from '@/hooks/useContacts'
import { useAgenda } from '@/hooks/useAgenda'
import { TagBadge } from './TagBadge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs } from '@/components/ui/tabs'
import {
  X,
  User,
  MessageCircle,
  Calendar,
  Activity,
  Edit,
  Mail,
  Phone,
  Building,
  Globe,
  Linkedin,
  MapPin,
  Cake,
  FileDown,
} from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface ContactDetailsProps {
  contactId: string | null
  onClose: () => void
  onEdit: (id: string) => void
}

export function ContactDetails({ contactId, onClose, onEdit }: ContactDetailsProps) {
  const { contacts, tags } = useContacts()
  const { events } = useAgenda()
  const [activeTab, setActiveTab] = useState('perfil')

  if (!contactId) return null

  const contact = contacts.find((c) => c.id === contactId)
  if (!contact) return null

  const contactTags = tags.filter((t) => contact.tags.includes(t.id))
  const contactEvents = events.filter((e) => e.clientId === contactId)

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

  const tabs = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'conversas', label: 'Conversas', icon: MessageCircle },
    { id: 'agendamentos', label: 'Agendamentos', icon: Calendar },
    { id: 'atividades', label: 'Atividades', icon: Activity },
  ]

  const handleExportVCard = () => {
    let vcard = 'BEGIN:VCARD\n'
    vcard += 'VERSION:3.0\n'
    vcard += `FN:${contact.name}\n`
    vcard += `EMAIL:${contact.email}\n`
    vcard += `TEL;TYPE=CELL:${contact.phone}\n`
    if (contact.company) vcard += `ORG:${contact.company}\n`
    if (contact.position) vcard += `TITLE:${contact.position}\n`
    if (contact.website) vcard += `URL:${contact.website}\n`
    vcard += 'END:VCARD\n'

    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${contact.name.replace(/\s+/g, '_')}.vcf`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Drawer */}
      <div className="relative ml-auto w-full max-w-2xl bg-background h-full overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-card border-b border-border p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              {contact.avatar ? (
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-medium">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">{contact.name}</h2>
                {contact.position && contact.company && (
                  <p className="text-gray-400">
                    {contact.position} na {contact.company}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={statusColors[contact.status]}>
                    {statusLabels[contact.status]}
                  </Badge>
                  {contactTags.map((tag) => (
                    <TagBadge key={tag.id} name={tag.name} color={tag.color} size="sm" />
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-background rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button size="sm" onClick={() => onEdit(contact.id)}>
              <Edit className="w-3 h-3 mr-1" />
              Editar
            </Button>
            <Button size="sm" variant="outline">
              <MessageCircle className="w-3 h-3 mr-1" />
              Enviar Mensagem
            </Button>
            <Button size="sm" variant="outline">
              <Calendar className="w-3 h-3 mr-1" />
              Agendar
            </Button>
            <Button size="sm" variant="outline" onClick={handleExportVCard}>
              <FileDown className="w-3 h-3 mr-1" />
              vCard
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Perfil Tab */}
          {activeTab === 'perfil' && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Informações de Contato</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <a href={`mailto:${contact.email}`} className="hover:text-primary">
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <a href={`tel:${contact.phone}`} className="hover:text-primary">
                      {contact.phone}
                    </a>
                  </div>
                  {contact.whatsapp && contact.whatsapp !== contact.phone && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <MessageCircle className="w-5 h-5 text-gray-500" />
                      <span>WhatsApp: {contact.whatsapp}</span>
                    </div>
                  )}
                  {contact.birthdate && (
                    <div className="flex items-center gap-3 text-gray-300">
                      <Cake className="w-5 h-5 text-gray-500" />
                      <span>{format(contact.birthdate, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Professional Info */}
              {(contact.company || contact.website || contact.linkedin) && (
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Informações Profissionais</h3>
                  <div className="space-y-3">
                    {contact.company && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <Building className="w-5 h-5 text-gray-500" />
                        <span>{contact.company}</span>
                      </div>
                    )}
                    {contact.website && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <Globe className="w-5 h-5 text-gray-500" />
                        <a
                          href={contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          {contact.website}
                        </a>
                      </div>
                    )}
                    {contact.linkedin && (
                      <div className="flex items-center gap-3 text-gray-300">
                        <Linkedin className="w-5 h-5 text-gray-500" />
                        <a
                          href={contact.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Address */}
              {contact.address && (
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Endereço</h3>
                  <div className="flex items-start gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p>
                        {contact.address.street}, {contact.address.number}
                        {contact.address.complement && ` - ${contact.address.complement}`}
                      </p>
                      <p>
                        {contact.address.neighborhood} - {contact.address.city}/{contact.address.state}
                      </p>
                      <p>{contact.address.zipCode}</p>
                      <p>{contact.address.country}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              {contact.notes && (
                <div>
                  <h3 className="text-lg font-medium text-white mb-3">Notas</h3>
                  <p className="text-gray-300 whitespace-pre-wrap">{contact.notes}</p>
                </div>
              )}

              {/* Stats */}
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Estatísticas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-lg border border-border p-4">
                    <div className="text-2xl font-bold text-primary">{contact.conversationsCount}</div>
                    <div className="text-sm text-gray-400">Conversas</div>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4">
                    <div className="text-2xl font-bold text-primary">{contact.appointmentsCount}</div>
                    <div className="text-sm text-gray-400">Agendamentos</div>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4">
                    <div className="text-sm text-gray-400">Criado em</div>
                    <div className="font-medium text-white">
                      {format(contact.createdAt, "d 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </div>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4">
                    <div className="text-sm text-gray-400">Última interação</div>
                    <div className="font-medium text-white">
                      {contact.lastInteraction
                        ? formatDistanceToNow(contact.lastInteraction, {
                            addSuffix: true,
                            locale: ptBR,
                          })
                        : 'Nunca'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Conversas Tab */}
          {activeTab === 'conversas' && (
            <div className="space-y-4">
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-white mb-2">Nenhuma conversa</h3>
                <p className="text-gray-400 mb-4">
                  As conversas com este contato aparecerão aqui.
                </p>
                <Button>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Iniciar Conversa
                </Button>
              </div>
            </div>
          )}

          {/* Agendamentos Tab */}
          {activeTab === 'agendamentos' && (
            <div className="space-y-4">
              {contactEvents.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-white mb-2">Nenhum agendamento</h3>
                  <p className="text-gray-400 mb-4">
                    Os agendamentos com este contato aparecerão aqui.
                  </p>
                  <Button>
                    <Calendar className="w-4 h-4 mr-2" />
                    Novo Agendamento
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {contactEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-card rounded-lg border border-border p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-white mb-1">{event.title}</h4>
                          <p className="text-sm text-gray-400">
                            {format(event.startDate, "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                          </p>
                          {event.description && (
                            <p className="text-sm text-gray-300 mt-2">{event.description}</p>
                          )}
                        </div>
                        <Badge
                          variant={
                            event.status === 'confirmado' || event.status === 'realizado'
                              ? 'success'
                              : event.status === 'cancelado'
                              ? 'danger'
                              : 'default'
                          }
                        >
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Atividades Tab */}
          {activeTab === 'atividades' && (
            <div className="space-y-4">
              <div className="relative">
                {/* Timeline */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

                <div className="space-y-6 relative">
                  {/* Activity: Contact Created */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 relative z-10">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="bg-card rounded-lg border border-border p-4">
                        <p className="text-white font-medium mb-1">Contato criado</p>
                        <p className="text-sm text-gray-400">
                          {format(contact.createdAt, "d 'de' MMMM 'de' yyyy 'às' HH:mm", {
                            locale: ptBR,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Activity: Last Update */}
                  {contact.updatedAt.getTime() !== contact.createdAt.getTime() && (
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 relative z-10">
                        <Edit className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="bg-card rounded-lg border border-border p-4">
                          <p className="text-white font-medium mb-1">Informações atualizadas</p>
                          <p className="text-sm text-gray-400">
                            {format(contact.updatedAt, "d 'de' MMMM 'de' yyyy 'às' HH:mm", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Activity: Last Interaction */}
                  {contact.lastInteraction && (
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 relative z-10">
                        <MessageCircle className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-card rounded-lg border border-border p-4">
                          <p className="text-white font-medium mb-1">Última interação</p>
                          <p className="text-sm text-gray-400">
                            {format(contact.lastInteraction, "d 'de' MMMM 'de' yyyy 'às' HH:mm", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
