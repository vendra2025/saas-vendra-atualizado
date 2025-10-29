'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Star } from 'lucide-react'

interface SatisfactionChartProps {
  satisfaction: {
    nps: number
    csat: number
    totalRatings: number
    distribution: Record<1 | 2 | 3 | 4 | 5, number>
  }
}

export function SatisfactionChart({ satisfaction }: SatisfactionChartProps) {
  const { nps, csat, totalRatings, distribution } = satisfaction

  const chartData = [
    { rating: '1 ⭐', count: distribution[1], color: '#EF4444' },
    { rating: '2 ⭐⭐', count: distribution[2], color: '#F97316' },
    { rating: '3 ⭐⭐⭐', count: distribution[3], color: '#F59E0B' },
    { rating: '4 ⭐⭐⭐⭐', count: distribution[4], color: '#10B981' },
    { rating: '5 ⭐⭐⭐⭐⭐', count: distribution[5], color: '#00FF88' },
  ]

  const getNPSLabel = (score: number) => {
    if (score >= 75) return 'Excelente'
    if (score >= 50) return 'Muito Bom'
    if (score >= 0) return 'Bom'
    if (score >= -50) return 'Ruim'
    return 'Crítico'
  }

  const getNPSColor = (score: number) => {
    if (score >= 75) return 'text-green-500'
    if (score >= 50) return 'text-primary'
    if (score >= 0) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Satisfação dos Clientes</h3>
        <p className="text-sm text-gray-400">Distribuição de avaliações recebidas</p>
      </div>

      {/* NPS and CSAT Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-primary fill-current" />
            <span className="text-xs text-gray-400">CSAT</span>
          </div>
          <div className="text-2xl font-bold text-white">{csat.toFixed(1)}</div>
          <div className="text-xs text-gray-400">de 5.0</div>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-400">NPS</span>
          </div>
          <div className={`text-2xl font-bold ${getNPSColor(nps)}`}>{nps}</div>
          <div className={`text-xs ${getNPSColor(nps)}`}>{getNPSLabel(nps)}</div>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="text-xs text-gray-400 mb-1">Total</div>
          <div className="text-2xl font-bold text-white">{totalRatings}</div>
          <div className="text-xs text-gray-400">avaliações</div>
        </div>
      </div>

      {/* Distribution Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
          <XAxis
            dataKey="rating"
            stroke="#9CA3AF"
            style={{ fontSize: '11px' }}
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
            formatter={(value: number) => [
              `${value} avaliações (${((value / totalRatings) * 100).toFixed(1)}%)`,
              'Total',
            ]}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Percentages */}
      <div className="mt-6 pt-6 border-t border-border space-y-2">
        {chartData.reverse().map((item) => (
          <div key={item.rating} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
              <span className="text-gray-300">{item.rating}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-400">{item.count} avaliações</span>
              <span className="text-white font-medium w-12 text-right">
                {((item.count / totalRatings) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
