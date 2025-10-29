'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { DailyMetrics } from '@/hooks/useAnalytics'

interface ResponseTimesChartProps {
  data: DailyMetrics[]
}

export function ResponseTimesChart({ data }: ResponseTimesChartProps) {
  // Show only last 7 days for better visualization
  const last7Days = data.slice(-7)

  const chartData = last7Days.map((d) => ({
    date: format(d.date, 'EEE, d/MM', { locale: ptBR }),
    tempo: parseFloat(d.avgResponseTime.toFixed(1)),
  }))

  // SLA target: 3 minutes
  const SLA_TARGET = 3.0

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-1">Tempo de Resposta</h3>
        <p className="text-sm text-gray-400">
          Tempo médio de primeira resposta • Meta: {SLA_TARGET}min
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
          <XAxis
            dataKey="date"
            stroke="#9CA3AF"
            style={{ fontSize: '11px' }}
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
            label={{
              value: 'Minutos',
              angle: -90,
              position: 'insideLeft',
              style: { fill: '#9CA3AF', fontSize: '12px' },
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#151922',
              border: '1px solid #1F2937',
              borderRadius: '8px',
              color: '#fff',
            }}
            labelStyle={{ color: '#9CA3AF' }}
            formatter={(value: number) => [`${value} minutos`, 'Tempo de Resposta']}
          />
          <Legend wrapperStyle={{ color: '#9CA3AF', fontSize: '12px' }} />
          <ReferenceLine
            y={SLA_TARGET}
            stroke="#EF4444"
            strokeDasharray="5 5"
            label={{
              value: 'Meta SLA',
              position: 'right',
              style: { fill: '#EF4444', fontSize: '11px' },
            }}
          />
          <Bar
            dataKey="tempo"
            fill="#3B82F6"
            radius={[4, 4, 0, 0]}
            name="Tempo de Resposta"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
