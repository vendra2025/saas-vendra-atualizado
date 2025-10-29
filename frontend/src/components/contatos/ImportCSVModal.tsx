'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { useContacts } from '@/hooks/useContacts'
import { Upload, FileText, Check, X, Download, AlertCircle } from 'lucide-react'

interface ImportCSVModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ImportCSVModal({ isOpen, onClose }: ImportCSVModalProps) {
  const { importFromCSV } = useContacts()
  const [step, setStep] = useState(1)
  const [file, setFile] = useState<File | null>(null)
  const [csvData, setCsvData] = useState<any[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [mapping, setMapping] = useState<Record<string, string>>({})
  const [validationErrors, setValidationErrors] = useState<any[]>([])
  const [importResult, setImportResult] = useState<{ success: number; errors: any[] } | null>(null)

  const requiredFields = ['name', 'email', 'phone']
  const optionalFields = ['whatsapp', 'company', 'position', 'tags']

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (!uploadedFile) return

    setFile(uploadedFile)

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      const lines = text.split('\n').filter((line) => line.trim())

      if (lines.length === 0) return

      // Parse headers
      const headerLine = lines[0].split(',').map((h) => h.trim().replace(/"/g, ''))
      setHeaders(headerLine)

      // Parse data
      const data = lines.slice(1).map((line) => {
        const values = line.split(',').map((v) => v.trim().replace(/"/g, ''))
        const row: any = {}
        headerLine.forEach((header, index) => {
          row[header] = values[index] || ''
        })
        return row
      })

      setCsvData(data)

      // Auto-detect mapping
      const autoMapping: Record<string, string> = {}
      headerLine.forEach((header) => {
        const lowerHeader = header.toLowerCase()
        if (lowerHeader.includes('nome') || lowerHeader === 'name') {
          autoMapping['name'] = header
        } else if (lowerHeader.includes('email') || lowerHeader === 'e-mail') {
          autoMapping['email'] = header
        } else if (lowerHeader.includes('telefone') || lowerHeader === 'phone' || lowerHeader.includes('tel')) {
          autoMapping['phone'] = header
        } else if (lowerHeader.includes('whatsapp')) {
          autoMapping['whatsapp'] = header
        } else if (lowerHeader.includes('empresa') || lowerHeader === 'company') {
          autoMapping['company'] = header
        } else if (lowerHeader.includes('cargo') || lowerHeader === 'position') {
          autoMapping['position'] = header
        } else if (lowerHeader.includes('tag')) {
          autoMapping['tags'] = header
        }
      })
      setMapping(autoMapping)

      setStep(2)
    }
    reader.readAsText(uploadedFile)
  }

  const handleValidate = () => {
    const errors: any[] = []

    // Check if required fields are mapped
    requiredFields.forEach((field) => {
      if (!mapping[field]) {
        errors.push({ type: 'mapping', message: `Campo obrigatório "${field}" não mapeado` })
      }
    })

    // Validate data
    csvData.forEach((row, index) => {
      requiredFields.forEach((field) => {
        if (mapping[field] && !row[mapping[field]]) {
          errors.push({
            row: index + 2, // +2 because of header and 0-index
            field,
            message: `Campo "${field}" vazio`,
          })
        }
      })

      // Validate email format
      if (mapping.email && row[mapping.email]) {
        const email = row[mapping.email]
        if (!email.includes('@')) {
          errors.push({
            row: index + 2,
            field: 'email',
            message: `Email inválido: ${email}`,
          })
        }
      }
    })

    setValidationErrors(errors)
    setStep(3)
  }

  const handleImport = () => {
    // Map CSV data to contact format
    const mappedData = csvData.map((row) => {
      const contact: any = {}
      Object.keys(mapping).forEach((field) => {
        const csvColumn = mapping[field]
        if (csvColumn && row[csvColumn]) {
          contact[field] = row[csvColumn]
        }
      })
      return contact
    })

    // Import contacts
    const result = importFromCSV(mappedData)
    setImportResult(result)
    setStep(4)
  }

  const handleDownloadTemplate = () => {
    const template = 'nome,email,telefone,whatsapp,empresa,cargo,tags\nJoão Silva,joao@example.com,+55 11 99999-9999,+55 11 99999-9999,Empresa X,CEO,"cliente,vip"\n'
    const blob = new Blob([template], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'template_contatos.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleClose = () => {
    setStep(1)
    setFile(null)
    setCsvData([])
    setHeaders([])
    setMapping({})
    setValidationErrors([])
    setImportResult(null)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Importar Contatos (CSV)" size="lg">
      {/* Step 1: Upload */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-gray-300 mb-4">
              Faça upload de um arquivo CSV com seus contatos. Os campos obrigatórios são: nome, email e telefone.
            </p>
            <Button variant="outline" onClick={handleDownloadTemplate}>
              <Download className="w-4 h-4 mr-2" />
              Baixar Template CSV
            </Button>
          </div>

          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
            <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <label className="cursor-pointer">
              <span className="text-white font-medium hover:text-primary transition-colors">
                Clique para selecionar
              </span>
              <span className="text-gray-400"> ou arraste o arquivo aqui</span>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">Apenas arquivos .csv são permitidos</p>
          </div>

          {file && (
            <div className="bg-card rounded-lg border border-border p-4 flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary" />
              <div className="flex-1">
                <p className="font-medium text-white">{file.name}</p>
                <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Mapping */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <p className="text-gray-300 mb-4">
              Mapeie as colunas do CSV para os campos do sistema. Detectamos automaticamente alguns campos.
            </p>
          </div>

          <div className="space-y-4">
            {[...requiredFields, ...optionalFields].map((field) => (
              <div key={field} className="flex items-center gap-4">
                <div className="w-40">
                  <label className="text-sm font-medium text-white">
                    {field === 'name' && 'Nome'}
                    {field === 'email' && 'Email'}
                    {field === 'phone' && 'Telefone'}
                    {field === 'whatsapp' && 'WhatsApp'}
                    {field === 'company' && 'Empresa'}
                    {field === 'position' && 'Cargo'}
                    {field === 'tags' && 'Tags'}
                    {requiredFields.includes(field) && <span className="text-red-500"> *</span>}
                  </label>
                </div>
                <select
                  value={mapping[field] || ''}
                  onChange={(e) => setMapping({ ...mapping, [field]: e.target.value })}
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">-- Não mapear --</option>
                  {headers.map((header) => (
                    <option key={header} value={header}>
                      {header}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-lg border border-border p-4">
            <h4 className="font-medium text-white mb-2">Preview (primeiras 3 linhas)</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border">
                  <tr>
                    {headers.map((header) => (
                      <th key={header} className="text-left p-2 text-gray-400">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.slice(0, 3).map((row, index) => (
                    <tr key={index} className="border-b border-border">
                      {headers.map((header) => (
                        <td key={header} className="p-2 text-gray-300">
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setStep(1)}>
              Voltar
            </Button>
            <Button onClick={handleValidate}>Próximo: Validar</Button>
          </div>
        </div>
      )}

      {/* Step 3: Validation */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Validação</h3>
            <p className="text-gray-300">
              Encontramos {validationErrors.length} erro(s) nos dados.
            </p>
          </div>

          {validationErrors.length > 0 ? (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 max-h-96 overflow-y-auto">
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-red-500 mb-1">Erros encontrados:</h4>
                  <p className="text-sm text-gray-400">
                    Corrija os erros no arquivo CSV e reimporte, ou escolha importar apenas os contatos válidos.
                  </p>
                </div>
              </div>
              <ul className="space-y-1 text-sm">
                {validationErrors.slice(0, 50).map((error, index) => (
                  <li key={index} className="text-red-400">
                    {error.type === 'mapping'
                      ? error.message
                      : `Linha ${error.row}: ${error.message}`}
                  </li>
                ))}
                {validationErrors.length > 50 && (
                  <li className="text-gray-400 italic">
                    ... e mais {validationErrors.length - 50} erro(s)
                  </li>
                )}
              </ul>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-500" />
                <div>
                  <h4 className="font-medium text-green-500">Validação bem-sucedida!</h4>
                  <p className="text-sm text-gray-400">
                    Todos os {csvData.length} contatos estão prontos para importação.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setStep(2)}>
              Voltar
            </Button>
            <Button
              onClick={handleImport}
              disabled={validationErrors.some((e) => e.type === 'mapping')}
            >
              Importar {validationErrors.length > 0 ? 'Apenas Válidos' : 'Todos'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Result */}
      {step === 4 && importResult && (
        <div className="space-y-6">
          <div className="text-center">
            {importResult.success > 0 ? (
              <>
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Importação concluída!</h3>
                <p className="text-gray-300">
                  {importResult.success} contato(s) importado(s) com sucesso.
                </p>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Falha na importação</h3>
                <p className="text-gray-300">Nenhum contato foi importado.</p>
              </>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-500">{importResult.success}</div>
              <div className="text-sm text-gray-400">Importados</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-red-500">{importResult.errors.length}</div>
              <div className="text-sm text-gray-400">Erros</div>
            </div>
          </div>

          {importResult.errors.length > 0 && (
            <div className="bg-card rounded-lg border border-border p-4 max-h-48 overflow-y-auto">
              <h4 className="font-medium text-white mb-2">Detalhes dos erros:</h4>
              <ul className="space-y-1 text-sm text-gray-400">
                {importResult.errors.map((error, index) => (
                  <li key={index}>
                    Linha {error.row}: {error.error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-3 justify-end">
            <Button onClick={handleClose} glow>
              Concluir
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
