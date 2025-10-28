'use client'

import { Card } from '@/components/ui/card'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { day: 'Seg', conversas: 23 },
  { day: 'Ter', conversas: 34 },
  { day: 'Qua', conversas: 28 },
  { day: 'Qui', conversas: 45 },
  { day: 'Sex', conversas: 38 },
  { day: 'Sáb', conversas: 41 },
  { day: 'Dom', conversas: 52 },
]

export function ConversationsChart() {
  return (
    <Card className="h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">
          Conversas por Dia
        </h3>
        <p className="text-sm text-gray-400">Últimos 7 dias</p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorConversas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00FF88" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
            <XAxis
              dataKey="day"
              stroke="#6B7280"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#151922',
                border: '1px solid #1F2937',
                borderRadius: '8px',
                color: '#fff',
              }}
              labelStyle={{ color: '#00FF88' }}
            />
            <Area
              type="monotone"
              dataKey="conversas"
              stroke="#00FF88"
              strokeWidth={2}
              fill="url(#colorConversas)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
