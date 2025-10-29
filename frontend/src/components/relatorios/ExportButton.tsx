'use client'

import { useState, useRef, useEffect } from 'react'
import { Download, FileText, FileSpreadsheet, File } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ExportButtonProps {
  onExport: (format: 'pdf' | 'excel' | 'csv') => void
}

export function ExportButton({ onExport }: ExportButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const exportOptions = [
    {
      id: 'pdf' as const,
      label: 'Exportar como PDF',
      icon: FileText,
      description: 'Relatório visual completo',
      color: 'text-red-500',
    },
    {
      id: 'excel' as const,
      label: 'Exportar como Excel',
      icon: FileSpreadsheet,
      description: 'Dados tabulares com múltiplas abas',
      color: 'text-green-500',
    },
    {
      id: 'csv' as const,
      label: 'Exportar como CSV',
      icon: File,
      description: 'Dados brutos para análise',
      color: 'text-blue-500',
    },
  ]

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    onExport(format)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="primary"
        onClick={() => setIsOpen(!isOpen)}
        glow
      >
        <Download className="w-4 h-4 mr-2" />
        Exportar
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          {exportOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => handleExport(option.id)}
              className="w-full px-4 py-3 flex items-start gap-3 hover:bg-background transition-colors text-left"
            >
              <option.icon className={`w-5 h-5 ${option.color} mt-0.5`} />
              <div className="flex-1">
                <div className="text-white font-medium text-sm">{option.label}</div>
                <div className="text-gray-400 text-xs mt-0.5">{option.description}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
