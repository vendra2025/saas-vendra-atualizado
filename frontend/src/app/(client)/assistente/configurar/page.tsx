'use client'

import { useState } from 'react'
import { Tabs, TabPanel } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { IdentityForm } from '@/components/assistente/IdentityForm'
import { ObjectivesForm } from '@/components/assistente/ObjectivesForm'
import { InstructionsEditor } from '@/components/assistente/InstructionsEditor'
import { ParametersPanel } from '@/components/assistente/ParametersPanel'
import { PreviewChat } from '@/components/assistente/PreviewChat'
import { useAssistantConfig } from '@/hooks/useAssistantConfig'
import {
  User,
  Target,
  FileText,
  Settings,
  Eye,
  Save,
  RotateCcw,
  CheckCircle,
} from 'lucide-react'

const tabs = [
  { id: 'identity', label: 'Identidade', icon: User },
  { id: 'objectives', label: 'Objetivos', icon: Target },
  { id: 'instructions', label: 'Instruções', icon: FileText },
  { id: 'parameters', label: 'Parâmetros', icon: Settings },
  { id: 'preview', label: 'Preview', icon: Eye },
]

export default function AssistantConfigPage() {
  const [activeTab, setActiveTab] = useState('identity')
  const { saveConfig, resetToDefault, isSaving, lastSaved } = useAssistantConfig()

  const handleSave = async () => {
    await saveConfig()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Configurar Assistente
          </h1>
          <p className="text-gray-400">
            Personalize o comportamento e a personalidade do seu assistente de IA
          </p>
        </div>
        <div className="flex items-center gap-3">
          {lastSaved && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Salvo às {lastSaved.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          )}
          {isSaving && <Badge variant="info">Salvando...</Badge>}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card rounded-lg border border-border">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="p-6">
          <TabPanel value="identity" activeTab={activeTab}>
            <IdentityForm />
          </TabPanel>

          <TabPanel value="objectives" activeTab={activeTab}>
            <ObjectivesForm />
          </TabPanel>

          <TabPanel value="instructions" activeTab={activeTab}>
            <InstructionsEditor />
          </TabPanel>

          <TabPanel value="parameters" activeTab={activeTab}>
            <ParametersPanel />
          </TabPanel>

          <TabPanel value="preview" activeTab={activeTab}>
            <PreviewChat />
          </TabPanel>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={resetToDefault}
          className="text-red-500 border-red-500/20 hover:bg-red-500/10"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Resetar para Padrão
        </Button>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setActiveTab('preview')}
          >
            <Eye className="w-4 h-4 mr-2" />
            Testar
          </Button>
          <Button onClick={handleSave} glow disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Salvando...' : 'Salvar Configuração'}
          </Button>
        </div>
      </div>
    </div>
  )
}
