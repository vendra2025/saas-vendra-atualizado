'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { useContacts, Contact } from '@/hooks/useContacts'
import { TagBadge } from './TagBadge'
import { Plus, X } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  contact?: Contact | null
}

export function ContactModal({ isOpen, onClose, contact }: ContactModalProps) {
  const { addContact, updateContact, deleteContact, tags, addTag } = useContacts()
  const [formData, setFormData] = useState({
    // Básico
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    sameAsPhone: true,
    birthdate: '',
    gender: '' as 'male' | 'female' | 'other' | 'not_specified' | '',

    // Profissional
    company: '',
    position: '',
    website: '',
    linkedin: '',

    // Endereço
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    country: 'Brasil',

    // Tags e segmentação
    selectedTags: [] as string[],
    newTagName: '',
    newTagColor: '#00FF88',

    // Notas
    notes: '',
  })

  // Load contact data when editing
  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        whatsapp: contact.whatsapp || '',
        sameAsPhone: contact.whatsapp === contact.phone,
        birthdate: contact.birthdate ? contact.birthdate.toISOString().split('T')[0] : '',
        gender: contact.gender || '',
        company: contact.company || '',
        position: contact.position || '',
        website: contact.website || '',
        linkedin: contact.linkedin || '',
        zipCode: contact.address?.zipCode || '',
        street: contact.address?.street || '',
        number: contact.address?.number || '',
        complement: contact.address?.complement || '',
        neighborhood: contact.address?.neighborhood || '',
        city: contact.address?.city || '',
        state: contact.address?.state || '',
        country: contact.address?.country || 'Brasil',
        selectedTags: contact.tags,
        newTagName: '',
        newTagColor: '#00FF88',
        notes: contact.notes || '',
      })
    } else {
      // Reset form for new contact
      setFormData({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        sameAsPhone: true,
        birthdate: '',
        gender: '',
        company: '',
        position: '',
        website: '',
        linkedin: '',
        zipCode: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        country: 'Brasil',
        selectedTags: [],
        newTagName: '',
        newTagColor: '#00FF88',
        notes: '',
      })
    }
  }, [contact, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const contactData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      whatsapp: formData.sameAsPhone ? formData.phone : formData.whatsapp || undefined,
      birthdate: formData.birthdate ? new Date(formData.birthdate) : undefined,
      gender: formData.gender || undefined,
      company: formData.company || undefined,
      position: formData.position || undefined,
      website: formData.website || undefined,
      linkedin: formData.linkedin || undefined,
      address: formData.zipCode ? {
        zipCode: formData.zipCode,
        street: formData.street,
        number: formData.number,
        complement: formData.complement || undefined,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state,
        country: formData.country,
      } : undefined,
      tags: formData.selectedTags,
      status: 'active' as const,
      notes: formData.notes || undefined,
      conversationsCount: contact?.conversationsCount || 0,
      appointmentsCount: contact?.appointmentsCount || 0,
    }

    if (contact) {
      updateContact(contact.id, contactData)
    } else {
      addContact(contactData)
    }

    onClose()
  }

  const handleAddTag = () => {
    if (!formData.newTagName.trim()) return

    const newTag = {
      name: formData.newTagName,
      color: formData.newTagColor,
    }
    addTag(newTag)
    setFormData({ ...formData, newTagName: '', newTagColor: '#00FF88' })
  }

  const toggleTag = (tagId: string) => {
    setFormData({
      ...formData,
      selectedTags: formData.selectedTags.includes(tagId)
        ? formData.selectedTags.filter((id) => id !== tagId)
        : [...formData.selectedTags, tagId],
    })
  }

  const handleDelete = () => {
    if (!contact) return
    if (!confirm('Tem certeza que deseja excluir este contato?')) return

    deleteContact(contact.id)
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={contact ? 'Editar Contato' : 'Novo Contato'}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas */}
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Informações Básicas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-2">
                Nome Completo *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="João Silva"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="joao@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Telefone *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+55 11 99999-9999"
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={formData.sameAsPhone}
                  onChange={(e) => setFormData({ ...formData, sameAsPhone: e.target.checked })}
                  className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary"
                />
                WhatsApp é o mesmo que telefone
              </label>
              {!formData.sameAsPhone && (
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full mt-2 px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="+55 11 99999-9999"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Data de Nascimento
              </label>
              <input
                type="date"
                value={formData.birthdate}
                onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Gênero
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Selecione...</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
                <option value="other">Outro</option>
                <option value="not_specified">Não informar</option>
              </select>
            </div>
          </div>
        </div>

        {/* Informações Profissionais */}
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Informações Profissionais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Empresa
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Nome da empresa"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Cargo
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="CEO, Developer, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Tags</h3>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`transition-all ${
                    formData.selectedTags.includes(tag.id) ? 'ring-2 ring-white' : ''
                  }`}
                >
                  <TagBadge name={tag.name} color={tag.color} size="md" />
                </button>
              ))}
            </div>

            {/* Add New Tag */}
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.newTagName}
                onChange={(e) => setFormData({ ...formData, newTagName: e.target.value })}
                placeholder="Nova tag..."
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="color"
                value={formData.newTagColor}
                onChange={(e) => setFormData({ ...formData, newTagColor: e.target.value })}
                className="w-12 h-10 bg-background border border-border rounded-lg cursor-pointer"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                disabled={!formData.newTagName.trim()}
              >
                <Plus className="w-4 h-4 mr-1" />
                Criar
              </Button>
            </div>
          </div>
        </div>

        {/* Notas */}
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Notas</h3>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Observações adicionais sobre o contato..."
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            {contact && (
              <Button
                type="button"
                variant="outline"
                onClick={handleDelete}
                className="text-red-500 border-red-500/20 hover:bg-red-500/10"
              >
                <X className="w-4 h-4 mr-1" />
                Excluir Contato
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" glow>
              {contact ? 'Salvar Alterações' : 'Criar Contato'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
