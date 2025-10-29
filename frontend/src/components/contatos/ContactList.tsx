'use client'

import { useState } from 'react'
import { useContacts } from '@/hooks/useContacts'
import { ContactCard } from './ContactCard'
import { Button } from '@/components/ui/button'
import { Grid, List, ChevronUp, ChevronDown, Trash2, Tag } from 'lucide-react'

interface ContactListProps {
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onMessage: (id: string) => void
  onContactClick: (id: string) => void
  onBulkAddTag?: (ids: string[]) => void
  onBulkDelete?: (ids: string[]) => void
}

export function ContactList({
  onEdit,
  onDelete,
  onMessage,
  onContactClick,
  onBulkAddTag,
  onBulkDelete,
}: ContactListProps) {
  const { view, setView, sortBy, sortOrder, toggleSortOrder, getFilteredContacts } = useContacts()
  const contacts = getFilteredContacts()
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const handleSelectAll = () => {
    if (selectedIds.length === contacts.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(contacts.map((c) => c.id))
    }
  }

  const handleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return
    if (
      !confirm(`Tem certeza que deseja excluir ${selectedIds.length} contato(s)?`)
    ) {
      return
    }
    onBulkDelete?.(selectedIds)
    setSelectedIds([])
  }

  const SortHeader = ({
    label,
    sortKey,
  }: {
    label: string
    sortKey: typeof sortBy
  }) => (
    <button
      onClick={() => toggleSortOrder()}
      className="flex items-center gap-1 hover:text-white transition-colors"
    >
      {label}
      {sortBy === sortKey && (
        <>
          {sortOrder === 'asc' ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </>
      )}
    </button>
  )

  return (
    <div className="space-y-4">
      {/* View Toggle and Bulk Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-card rounded-lg border border-border p-1">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded transition-colors ${
                view === 'grid'
                  ? 'bg-primary text-background'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Visualização em grade"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('table')}
              className={`p-2 rounded transition-colors ${
                view === 'table'
                  ? 'bg-primary text-background'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Visualização em tabela"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Results Count */}
          <span className="text-sm text-gray-400">
            {contacts.length} contato{contacts.length !== 1 ? 's' : ''}
            {selectedIds.length > 0 && ` (${selectedIds.length} selecionado${selectedIds.length !== 1 ? 's' : ''})`}
          </span>
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onBulkAddTag?.(selectedIds)}
            >
              <Tag className="w-3 h-3 mr-1" />
              Adicionar Tag
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleBulkDelete}
              className="text-red-500 border-red-500/20 hover:bg-red-500/10"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              Excluir
            </Button>
          </div>
        )}
      </div>

      {/* Empty State */}
      {contacts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-card mx-auto mb-4 flex items-center justify-center">
            <List className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Nenhum contato encontrado</h3>
          <p className="text-gray-400">Tente ajustar os filtros ou adicionar um novo contato.</p>
        </div>
      )}

      {/* Grid View */}
      {view === 'grid' && contacts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {contacts.map((contact) => (
            <div key={contact.id} onClick={() => onContactClick(contact.id)}>
              <ContactCard
                contact={contact}
                view="grid"
                onEdit={onEdit}
                onDelete={onDelete}
                onMessage={onMessage}
                onSelect={handleSelect}
                isSelected={selectedIds.includes(contact.id)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {view === 'table' && contacts.length > 0 && (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background border-b border-border">
                <tr className="text-left text-sm text-gray-400">
                  <th className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === contacts.length && contacts.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-2 focus:ring-primary"
                    />
                  </th>
                  <th className="p-4">
                    <SortHeader label="Nome" sortKey="name" />
                  </th>
                  <th className="p-4">
                    <SortHeader label="Email" sortKey="email" />
                  </th>
                  <th className="p-4">Telefone</th>
                  <th className="p-4">
                    <SortHeader label="Empresa" sortKey="company" />
                  </th>
                  <th className="p-4">Tags</th>
                  <th className="p-4">
                    <SortHeader label="Última Interação" sortKey="lastInteraction" />
                  </th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Ações</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <ContactCard
                    key={contact.id}
                    contact={contact}
                    view="table"
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onMessage={onMessage}
                    onSelect={handleSelect}
                    isSelected={selectedIds.includes(contact.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
