'use client'

import { useAutomations } from '@/hooks/useAutomations'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Zap, Plus, Power, Trash2, Edit, TrendingUp } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function AutomacoesPage() {
  const { flows, toggleFlowStatus, deleteFlow, getStats } = useAutomations()
  const stats = getStats()

  const triggerLabels = {
    new_message: 'Nova Mensagem',
    keyword: 'Palavra-chave',
    schedule: 'Agendamento',
    contact_created: 'Novo Contato',
    manual: 'Manual',
  }

  const actionLabels = {
    send_message: 'Enviar Mensagem',
    add_tag: 'Adicionar Tag',
    assign_agent: 'Atribuir Atendente',
    create_task: 'Criar Tarefa',
    wait: 'Aguardar',
  }

  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Tem certeza que deseja excluir o fluxo "${name}"?`)) return
    deleteFlow(id)
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Automações</h1>
            <p className="text-gray-400">Automatize tarefas e economize tempo</p>
          </div>
        </div>
        <Button glow>
          <Plus className="w-4 h-4 mr-2" />
          Criar Fluxo
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-xs text-gray-400">Total de Fluxos</div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Power className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-500">{stats.active}</div>
              <div className="text-xs text-gray-400">Fluxos Ativos</div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-500">{stats.executions}</div>
              <div className="text-xs text-gray-400">Execuções Totais</div>
            </div>
          </div>
        </div>
      </div>

      {/* Flows List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {flows.map((flow) => (
          <div
            key={flow.id}
            className="bg-card rounded-lg border border-border p-6 hover:border-primary/50 transition-colors"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold text-white">{flow.name}</h3>
                  <Badge variant={flow.isActive ? 'success' : 'default'}>
                    {flow.isActive ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400">{flow.description}</p>
              </div>
            </div>

            {/* Trigger */}
            <div className="mb-4 p-3 bg-background rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Gatilho</div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm text-white">
                  {triggerLabels[flow.trigger.type]}
                </span>
                {flow.trigger.config.keyword && (
                  <code className="px-2 py-0.5 bg-card rounded text-xs text-primary">
                    "{flow.trigger.config.keyword}"
                  </code>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-2">
                Ações ({flow.actions.length})
              </div>
              <div className="space-y-2">
                {flow.actions.slice(0, 2).map((action, index) => (
                  <div
                    key={action.id}
                    className="flex items-center gap-2 text-sm text-gray-300"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary">
                      {index + 1}
                    </div>
                    <span>{actionLabels[action.type]}</span>
                  </div>
                ))}
                {flow.actions.length > 2 && (
                  <div className="text-xs text-gray-500">
                    +{flow.actions.length - 2} mais ação(ões)
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-4 pt-4 border-t border-border">
              <div className="text-xs text-gray-400">
                {flow.executionCount} execuções
              </div>
              <div className="text-xs text-gray-400">
                Atualizado {format(flow.updatedAt, "d 'de' MMM", { locale: ptBR })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={flow.isActive ? 'outline' : 'primary'}
                onClick={() => toggleFlowStatus(flow.id)}
                className="flex-1"
              >
                <Power className="w-3 h-3 mr-1" />
                {flow.isActive ? 'Desativar' : 'Ativar'}
              </Button>
              <Button size="sm" variant="outline">
                <Edit className="w-3 h-3" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(flow.id, flow.name)}
                className="text-red-500 border-red-500/20 hover:bg-red-500/10"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {flows.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-card mx-auto mb-4 flex items-center justify-center">
            <Zap className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">
            Nenhum fluxo criado
          </h3>
          <p className="text-gray-400 mb-4">
            Crie seu primeiro fluxo de automação para começar
          </p>
          <Button glow>
            <Plus className="w-4 h-4 mr-2" />
            Criar Primeiro Fluxo
          </Button>
        </div>
      )}
    </div>
  )
}
