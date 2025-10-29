'use client'

import { useAnalytics } from '@/hooks/useAnalytics'
import { MetricsOverview } from '@/components/relatorios/MetricsOverview'
import { ConversationsChart } from '@/components/relatorios/ConversationsChart'
import { ChannelsChart } from '@/components/relatorios/ChannelsChart'
import { ResponseTimesChart } from '@/components/relatorios/ResponseTimesChart'
import { BusyTimesHeatmap } from '@/components/relatorios/BusyTimesHeatmap'
import { AgentsPerformance } from '@/components/relatorios/AgentsPerformance'
import { SatisfactionChart } from '@/components/relatorios/SatisfactionChart'
import { PeriodFilter } from '@/components/relatorios/PeriodFilter'
import { ExportButton } from '@/components/relatorios/ExportButton'
import { BarChart3 } from 'lucide-react'

export default function RelatoriosPage() {
  const { period, setPeriod, getData, exportData } = useAnalytics()
  const data = getData()

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Relatórios e Analytics</h1>
            <p className="text-gray-400">Análise completa de desempenho e métricas</p>
          </div>
        </div>
        <ExportButton onExport={exportData} />
      </div>

      {/* Period Filter */}
      <div className="flex items-center justify-between">
        <PeriodFilter period={period} onPeriodChange={setPeriod} />
        <div className="text-sm text-gray-400">
          Exibindo dados de {data.dailyMetrics.length} dias
        </div>
      </div>

      {/* Metrics Overview */}
      <MetricsOverview summary={data.summary} satisfaction={data.satisfaction} />

      {/* Charts Grid - Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ConversationsChart data={data.dailyMetrics} />
        <ChannelsChart channels={data.channels} />
      </div>

      {/* Charts Grid - Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResponseTimesChart data={data.dailyMetrics} />
        <BusyTimesHeatmap data={data.busyHours} />
      </div>

      {/* Agents Performance */}
      <AgentsPerformance agents={data.agents} />

      {/* Satisfaction Chart */}
      <SatisfactionChart satisfaction={data.satisfaction} />
    </div>
  )
}
