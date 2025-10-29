'use client'

import type { BusyHour } from '@/hooks/useAnalytics'

interface BusyTimesHeatmapProps {
  data: BusyHour[]
}

export function BusyTimesHeatmap({ data }: BusyTimesHeatmapProps) {
  // Find max conversations to normalize colors
  const maxConversations = Math.max(...data.map((d) => d.conversations))

  const getIntensityColor = (conversations: number) => {
    const intensity = conversations / maxConversations
    if (intensity >= 0.8) return 'bg-primary'
    if (intensity >= 0.6) return 'bg-green-500'
    if (intensity >= 0.4) return 'bg-yellow-500'
    if (intensity >= 0.2) return 'bg-blue-500'
    return 'bg-gray-600'
  }

  const getIntensityLabel = (conversations: number) => {
    const intensity = conversations / maxConversations
    if (intensity >= 0.8) return 'Muito Alto'
    if (intensity >= 0.6) return 'Alto'
    if (intensity >= 0.4) return 'Médio'
    if (intensity >= 0.2) return 'Baixo'
    return 'Muito Baixo'
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">Horários de Pico</h3>
        <p className="text-sm text-gray-400">Volume de conversas por hora do dia</p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
        <span>Volume:</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-600" />
          <span>Muito Baixo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-500" />
          <span>Baixo</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-500" />
          <span>Médio</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500" />
          <span>Alto</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary" />
          <span>Muito Alto</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="grid grid-cols-12 gap-2">
        {data.map((hourData) => (
          <div
            key={hourData.hour}
            className="relative group"
          >
            <div
              className={`${getIntensityColor(
                hourData.conversations
              )} rounded aspect-square flex items-center justify-center text-white text-xs font-medium transition-transform hover:scale-110 cursor-pointer`}
            >
              {hourData.hour}h
            </div>
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
              <div className="bg-background border border-border rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-lg">
                <div className="text-white font-medium">{hourData.hour}:00</div>
                <div className="text-gray-400">
                  {hourData.conversations} conversas
                </div>
                <div className="text-gray-400">
                  {getIntensityLabel(hourData.conversations)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top 3 Peak Hours */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="text-sm font-medium text-white mb-3">Horários com Mais Conversas:</div>
        <div className="space-y-2">
          {[...data]
            .sort((a, b) => b.conversations - a.conversations)
            .slice(0, 3)
            .map((hourData, index) => (
              <div
                key={hourData.hour}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded ${getIntensityColor(hourData.conversations)} flex items-center justify-center text-white text-xs font-medium`}>
                    {index + 1}
                  </div>
                  <span className="text-gray-300">
                    {hourData.hour}:00 - {hourData.hour + 1}:00
                  </span>
                </div>
                <span className="text-white font-medium">
                  {hourData.conversations} conversas
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
