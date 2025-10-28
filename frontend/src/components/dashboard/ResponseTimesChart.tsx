'use client'

import { Card } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'

const data = [
  { day: 'Seg', tempo: 2.5 },
  { day: 'Ter', tempo: 2.3 },
  { day: 'Qua', tempo: 2.8 },
  { day: 'Qui', tempo: 2.1 },
  { day: 'Sex', tempo: 2.4 },
  { day: 'Sáb', tempo: 2.2 },
  { day: 'Dom', tempo: 2.3 },
]

export function ResponseTimesChart() {
  return (
    <Card className="h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">
          Tempo de Resposta
        </h3>
        <p className="text-sm text-gray-400">Últimos 7 dias</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
            <XAxis
              dataKey="day"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
              label={{
                value: 'Segundos',
                angle: -90,
                position: 'insideLeft',
                style: { fill: '#6B7280', fontSize: '12px' },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#151922',
                border: '1px solid #1F2937',
                borderRadius: '8px',
                color: '#fff',
              }}
              labelStyle={{ color: '#00FF88' }}
              formatter={(value: number) => [`${value}s`, 'Tempo']}
            />
            {/* Linha de referência SLA (3s) */}
            <ReferenceLine
              y={3}
              stroke="#EF4444"
              strokeDasharray="3 3"
              label={{
                value: 'SLA 3s',
                position: 'right',
                fill: '#EF4444',
                fontSize: 12,
              }}
            />
            <Bar
              dataKey="tempo"
              fill="#00FF88"
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 text-xs text-gray-400">
        <span className="inline-flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          Linha vermelha: SLA de 3 segundos
        </span>
      </div>
    </Card>
  )
}
