'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { useContacts } from '@/hooks/useContacts'
import { FileText, FileJson, Download, Users, Filter } from 'lucide-react'

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const { getContactsForExport, getFilteredContacts, contacts } = useContacts()
  const [format, setFormat] = useState<'csv' | 'vcard' | 'json'>('csv')
  const [exportType, setExportType] = useState<'all' | 'filtered'>('filtered')

  const filteredContacts = getFilteredContacts()
  const exportCount = exportType === 'all' ? contacts.length : filteredContacts.length

  const handleExport = () => {
    const data = getContactsForExport(format)

    let blob: Blob
    let filename: string

    if (format === 'csv') {
      // Convert data to CSV
      const csvData = data as any[]
      const headers = Object.keys(csvData[0] || {})
      const csvContent = [
        headers.join(','),
        ...csvData.map((row) =>
          headers.map((header) => `"${row[header] || ''}"`).join(',')
        ),
      ].join('\n')

      blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      filename = `contatos_${new Date().toISOString().split('T')[0]}.csv`
    } else if (format === 'vcard') {
      // vCard format
      const vcardData = (data as string[]).join('\n')
      blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8;' })
      filename = `contatos_${new Date().toISOString().split('T')[0]}.vcf`
    } else {
      // JSON format
      const jsonData = JSON.stringify(data, null, 2)
      blob = new Blob([jsonData], { type: 'application/json;charset=utf-8;' })
      filename = `contatos_${new Date().toISOString().split('T')[0]}.json`
    }

    // Download file
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    window.URL.revokeObjectURL(url)

    onClose()
  }

  const formatOptions = [
    {
      id: 'csv',
      name: 'CSV',
      description: 'Compatível com Excel e planilhas',
      icon: FileText,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
    },
    {
      id: 'vcard',
      name: 'vCard (.vcf)',
      description: 'Importável em qualquer agenda',
      icon: Users,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      id: 'json',
      name: 'JSON',
      description: 'Para desenvolvedores e integrações',
      icon: FileJson,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Exportar Contatos" size="md">
      <div className="space-y-6">
        {/* Format Selection */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Formato de Exportação</h3>
          <div className="space-y-2">
            {formatOptions.map((option) => {
              const isSelected = format === option.id
              return (
                <button
                  key={option.id}
                  onClick={() => setFormat(option.id as any)}
                  className={`w-full flex items-start gap-4 p-4 rounded-lg border transition-all ${
                    isSelected
                      ? `${option.borderColor} ${option.bgColor} ring-2 ring-offset-2 ring-offset-background ring-${option.id === 'csv' ? 'green' : option.id === 'vcard' ? 'blue' : 'purple'}-500/50`
                      : 'border-border bg-card hover:border-gray-500'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${option.bgColor} flex items-center justify-center shrink-0`}
                  >
                    <option.icon className={`w-6 h-6 ${option.color}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-white mb-1">{option.name}</div>
                    <div className="text-sm text-gray-400">{option.description}</div>
                  </div>
                  {isSelected && (
                    <div className={`w-6 h-6 rounded-full ${option.bgColor} flex items-center justify-center`}>
                      <div className={`w-3 h-3 rounded-full ${option.color.replace('text', 'bg')}`} />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Export Type */}
        <div>
          <h3 className="text-sm font-medium text-white mb-3">Contatos a Exportar</h3>
          <div className="space-y-2">
            <button
              onClick={() => setExportType('filtered')}
              className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                exportType === 'filtered'
                  ? 'border-primary bg-primary/10 ring-2 ring-primary/50'
                  : 'border-border bg-card hover:border-gray-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium text-white">Apenas Filtrados</div>
                  <div className="text-sm text-gray-400">
                    {filteredContacts.length} contato{filteredContacts.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              {exportType === 'filtered' && (
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
              )}
            </button>

            <button
              onClick={() => setExportType('all')}
              className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                exportType === 'all'
                  ? 'border-primary bg-primary/10 ring-2 ring-primary/50'
                  : 'border-border bg-card hover:border-gray-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <div className="text-left">
                  <div className="font-medium text-white">Todos os Contatos</div>
                  <div className="text-sm text-gray-400">
                    {contacts.length} contato{contacts.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
              {exportType === 'all' && (
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-card rounded-lg border border-border p-4">
          <h4 className="font-medium text-white mb-2">Preview da Exportação</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-300">
              <span>Quantidade:</span>
              <span className="font-medium text-white">{exportCount} contatos</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Formato:</span>
              <span className="font-medium text-white">
                {formatOptions.find((f) => f.id === format)?.name}
              </span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Tamanho estimado:</span>
              <span className="font-medium text-white">
                {format === 'json'
                  ? `~${(exportCount * 0.5).toFixed(1)} KB`
                  : format === 'vcard'
                  ? `~${(exportCount * 0.3).toFixed(1)} KB`
                  : `~${(exportCount * 0.2).toFixed(1)} KB`}
              </span>
            </div>
          </div>
        </div>

        {/* Fields Included (for CSV and JSON) */}
        {(format === 'csv' || format === 'json') && (
          <div className="bg-card rounded-lg border border-border p-4">
            <h4 className="font-medium text-white mb-2">Campos Incluídos</h4>
            <div className="flex flex-wrap gap-2">
              {[
                'Nome',
                'Email',
                'Telefone',
                'WhatsApp',
                'Empresa',
                'Cargo',
                'Tags',
                'Status',
                'Criado em',
                'Última interação',
              ].map((field) => (
                <span
                  key={field}
                  className="px-2 py-1 text-xs rounded bg-primary/10 text-primary border border-primary/20"
                >
                  {field}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleExport} glow disabled={exportCount === 0}>
            <Download className="w-4 h-4 mr-2" />
            Exportar {exportCount} Contato{exportCount !== 1 ? 's' : ''}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
