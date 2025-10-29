'use client'

import { useState } from 'react'
import { useContacts } from '@/hooks/useContacts'
import { ContactStats } from '@/components/contatos/ContactStats'
import { ContactFilters } from '@/components/contatos/ContactFilters'
import { ContactList } from '@/components/contatos/ContactList'
import { ContactModal } from '@/components/contatos/ContactModal'
import { ContactDetails } from '@/components/contatos/ContactDetails'
import { ImportCSVModal } from '@/components/contatos/ImportCSVModal'
import { ExportModal } from '@/components/contatos/ExportModal'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { TagBadge } from '@/components/contatos/TagBadge'
import { UserPlus, Upload, Download, Tag, Plus } from 'lucide-react'

export default function ContatosPage() {
  const {
    contacts,
    deleteContact,
    deleteMultipleContacts,
    setSelectedContact,
    selectedContact,
    tags,
    addTagToContacts,
    addTag,
  } = useContacts()

  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isBulkTagModalOpen, setIsBulkTagModalOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [editingContactId, setEditingContactId] = useState<string | null>(null)
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([])
  const [newTagName, setNewTagName] = useState('')
  const [newTagColor, setNewTagColor] = useState('#00FF88')

  const handleEdit = (id: string) => {
    setEditingContactId(id)
    setIsContactModalOpen(true)
    setIsDetailsOpen(false)
  }

  const handleDelete = (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este contato?')) return
    deleteContact(id)
  }

  const handleMessage = (id: string) => {
    // TODO: Integrate with messaging system
    alert(`Enviar mensagem para contato ${id}`)
  }

  const handleContactClick = (id: string) => {
    const contact = contacts.find((c) => c.id === id)
    setSelectedContact(contact || null)
    setIsDetailsOpen(true)
  }

  const handleBulkAddTag = (ids: string[]) => {
    setSelectedContactIds(ids)
    setIsBulkTagModalOpen(true)
  }

  const handleBulkDelete = (ids: string[]) => {
    deleteMultipleContacts(ids)
  }

  const handleAddTagToSelected = (tagId: string) => {
    addTagToContacts(selectedContactIds, tagId)
    setIsBulkTagModalOpen(false)
    setSelectedContactIds([])
  }

  const handleCreateAndAddTag = () => {
    if (!newTagName.trim()) return

    const newTag = {
      name: newTagName,
      color: newTagColor,
    }
    addTag(newTag)

    // Get the newly created tag (it will be the last one)
    setTimeout(() => {
      const latestTag = tags[tags.length - 1]
      if (latestTag) {
        handleAddTagToSelected(latestTag.id)
      }
    }, 100)

    setNewTagName('')
    setNewTagColor('#00FF88')
  }

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false)
    setEditingContactId(null)
  }

  const handleCloseDetails = () => {
    setIsDetailsOpen(false)
    setSelectedContact(null)
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Contatos</h1>
          <p className="text-gray-400">Gerencie todos os seus contatos em um só lugar</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setIsExportModalOpen(true)}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" onClick={() => setIsImportModalOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Importar CSV
          </Button>
          <Button onClick={() => setIsContactModalOpen(true)} glow>
            <UserPlus className="w-4 h-4 mr-2" />
            Novo Contato
          </Button>
        </div>
      </div>

      {/* Stats */}
      <ContactStats />

      {/* Filters */}
      <ContactFilters />

      {/* Contact List */}
      <ContactList
        onEdit={handleEdit}
        onDelete={handleDelete}
        onMessage={handleMessage}
        onContactClick={handleContactClick}
        onBulkAddTag={handleBulkAddTag}
        onBulkDelete={handleBulkDelete}
      />

      {/* Contact Modal (Create/Edit) */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
        contact={editingContactId ? contacts.find((c) => c.id === editingContactId) : null}
      />

      {/* Contact Details Drawer */}
      {isDetailsOpen && (
        <ContactDetails
          contactId={selectedContact?.id || null}
          onClose={handleCloseDetails}
          onEdit={handleEdit}
        />
      )}

      {/* Import CSV Modal */}
      <ImportCSVModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      {/* Export Modal */}
      <ExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />

      {/* Bulk Add Tag Modal */}
      <Modal
        isOpen={isBulkTagModalOpen}
        onClose={() => {
          setIsBulkTagModalOpen(false)
          setSelectedContactIds([])
        }}
        title="Adicionar Tag aos Contatos Selecionados"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            Selecione uma tag existente ou crie uma nova para adicionar aos{' '}
            {selectedContactIds.length} contato(s) selecionado(s).
          </p>

          {/* Existing Tags */}
          <div>
            <h3 className="text-sm font-medium text-white mb-2">Tags Existentes</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => handleAddTagToSelected(tag.id)}
                  className="transition-transform hover:scale-105"
                >
                  <TagBadge name={tag.name} color={tag.color} size="md" />
                </button>
              ))}
            </div>
          </div>

          {/* Create New Tag */}
          <div>
            <h3 className="text-sm font-medium text-white mb-2">Criar Nova Tag</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Nome da tag..."
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateAndAddTag()
                  }
                }}
              />
              <input
                type="color"
                value={newTagColor}
                onChange={(e) => setNewTagColor(e.target.value)}
                className="w-12 h-10 bg-background border border-border rounded-lg cursor-pointer"
              />
              <Button onClick={handleCreateAndAddTag} disabled={!newTagName.trim()}>
                <Plus className="w-4 h-4 mr-1" />
                Criar
              </Button>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                setIsBulkTagModalOpen(false)
                setSelectedContactIds([])
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
