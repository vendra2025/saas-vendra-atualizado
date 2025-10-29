'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface ChannelsChartProps {
  channels: {
    whatsapp: { total: number; percentage: number }
    webchat: { total: number; percentage: number }
  }
}

export function ChannelsChart({ channels }: ChannelsChartProps) {
  const data = [
    {
      name: 'WhatsApp',
      value: channels.whatsapp.total,
      percentage: channels.whatsapp.percentage,
      color: '#25D366',
    },
    {
      name: 'WebChat',
      value: channels.webchat.total,
      percentage: channels.webchat.percentage,
      color: '#00B8FF',
    },
  ]

  const COLORS = ['#25D366', '#00B8FF']

  const renderCustomLabel = (entry: any) => {
    return `${entry.percentage}%`
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-1">Canais de Atendimento</h3>
        <p className="text-sm text-gray-400">Distribuição por canal</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#151922',
              border: '1px solid #1F2937',
              borderRadius: '8px',
              color: '#fff',
            }}
            formatter={(value: number, name: string, props: any) => [
              `${value.toLocaleString('pt-BR')} conversas (${props.payload.percentage}%)`,
              name,
            ]}
          />
          <Legend
            wrapperStyle={{ color: '#9CA3AF', fontSize: '12px' }}
            formatter={(value: string, entry: any) => (
              <span style={{ color: entry.color }}>
                {value}: {entry.payload.value.toLocaleString('pt-BR')} conversas
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
