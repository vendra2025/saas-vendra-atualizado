'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { DailyMetrics } from '@/hooks/useAnalytics'

interface ConversationsChartProps {
  data: DailyMetrics[]
}

export function ConversationsChart({ data }: ConversationsChartProps) {
  const chartData = data.map((d) => ({
    date: format(d.date, 'd/MM', { locale: ptBR }),
    total: d.conversations,
    resolvidas: d.resolved,
  }))

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-1">Conversas por Período</h3>
        <p className="text-sm text-gray-400">Total e resolvidas ao longo do tempo</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#151922',
              border: '1px solid #1F2937',
              borderRadius: '8px',
              color: '#fff',
            }}
            labelStyle={{ color: '#9CA3AF' }}
          />
          <Legend
            wrapperStyle={{ color: '#9CA3AF', fontSize: '12px' }}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6', r: 3 }}
            name="Total"
          />
          <Line
            type="monotone"
            dataKey="resolvidas"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ fill: '#10B981', r: 3 }}
            name="Resolvidas"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
