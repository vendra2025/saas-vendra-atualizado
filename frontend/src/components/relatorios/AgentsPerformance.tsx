'use client'

import { Star, Clock, MessageCircle, CheckCircle, ArrowRightLeft } from 'lucide-react'
import type { AgentMetrics } from '@/hooks/useAnalytics'
import { Badge } from '@/components/ui/badge'

interface AgentsPerformanceProps {
  agents: AgentMetrics[]
}

export function AgentsPerformance({ agents }: AgentsPerformanceProps) {
  // Sort agents by satisfaction descending
  const sortedAgents = [...agents].sort((a, b) => b.satisfaction - a.satisfaction)

  const getRankBadge = (index: number) => {
    if (index === 0) return <Badge variant="success">1º Lugar</Badge>
    if (index === 1) return <Badge variant="info">2º Lugar</Badge>
    if (index === 2) return <Badge variant="warning">3º Lugar</Badge>
    return null
  }

  const getSatisfactionColor = (satisfaction: number) => {
    if (satisfaction >= 4.7) return 'text-green-500'
    if (satisfaction >= 4.5) return 'text-primary'
    if (satisfaction >= 4.0) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Performance de Atendentes</h3>
        <p className="text-sm text-gray-400">Ranking por satisfação do cliente</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-border">
              <th className="pb-3 font-medium">#</th>
              <th className="pb-3 font-medium">Atendente</th>
              <th className="pb-3 font-medium text-center">Conversas</th>
              <th className="pb-3 font-medium text-center">Resolvidas</th>
              <th className="pb-3 font-medium text-center">Tempo Resposta</th>
              <th className="pb-3 font-medium text-center">Transferências</th>
              <th className="pb-3 font-medium text-center">Satisfação</th>
            </tr>
          </thead>
          <tbody>
            {sortedAgents.map((agent, index) => (
              <tr
                key={agent.id}
                className="border-b border-border last:border-0 hover:bg-background/50 transition-colors"
              >
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 font-medium">{index + 1}</span>
                    {getRankBadge(index)}
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                      {agent.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <span className="text-white font-medium">{agent.name}</span>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-white">
                    <MessageCircle className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{agent.conversations}</span>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-white font-medium">{agent.resolved}</span>
                    <span className="text-xs text-gray-400">
                      ({((agent.resolved / agent.conversations) * 100).toFixed(0)}%)
                    </span>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="text-white">{agent.avgResponseTime.toFixed(1)}min</span>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <ArrowRightLeft className="w-4 h-4 text-purple-500" />
                    <span className="text-white">{agent.transfers}</span>
                  </div>
                </td>
                <td className="py-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className={`w-4 h-4 ${getSatisfactionColor(agent.satisfaction)} fill-current`} />
                    <span className={`font-bold ${getSatisfactionColor(agent.satisfaction)}`}>
                      {agent.satisfaction.toFixed(1)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">
            {agents.reduce((sum, a) => sum + a.conversations, 0)}
          </div>
          <div className="text-xs text-gray-400">Total de Conversas</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">
            {(
              (agents.reduce((sum, a) => sum + a.resolved, 0) /
                agents.reduce((sum, a) => sum + a.conversations, 0)) *
              100
            ).toFixed(0)}
            %
          </div>
          <div className="text-xs text-gray-400">Taxa de Resolução</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {(agents.reduce((sum, a) => sum + a.satisfaction, 0) / agents.length).toFixed(1)}
          </div>
          <div className="text-xs text-gray-400">Satisfação Média</div>
        </div>
      </div>
    </div>
  )
}
