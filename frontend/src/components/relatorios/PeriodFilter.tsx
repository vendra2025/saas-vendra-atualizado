'use client'

import { Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PeriodFilterProps {
  period: 'today' | '7days' | '30days' | 'custom'
  onPeriodChange: (period: 'today' | '7days' | '30days' | 'custom') => void
}

export function PeriodFilter({ period, onPeriodChange }: PeriodFilterProps) {
  const periods = [
    { id: 'today' as const, label: 'Hoje' },
    { id: '7days' as const, label: 'Últimos 7 dias' },
    { id: '30days' as const, label: 'Últimos 30 dias' },
    { id: 'custom' as const, label: 'Período personalizado', icon: Calendar },
  ]

  return (
    <div className="flex items-center gap-2">
      {periods.map((p) => (
        <Button
          key={p.id}
          variant={period === p.id ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onPeriodChange(p.id)}
          className={period === p.id ? 'glow' : ''}
        >
          {p.icon && <p.icon className="w-4 h-4 mr-2" />}
          {p.label}
        </Button>
      ))}
    </div>
  )
}
