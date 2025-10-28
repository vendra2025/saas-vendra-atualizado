'use client'

import { MetricCard } from './MetricCard'
import {
  MessageSquare,
  Users,
  TrendingUp,
  Zap,
  FileText,
  Clock,
} from 'lucide-react'

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Conversas Ativas */}
      <MetricCard
        title="Conversas Ativas"
        value={12}
        icon={MessageSquare}
        change={{
          value: 71,
          label: 'desde ontem',
        }}
        delay={0}
      />

      {/* Total de Contatos */}
      <MetricCard
        title="Total de Contatos"
        value={487}
        icon={Users}
        change={{
          value: 5,
          label: 'esta semana',
        }}
        delay={0.1}
      />

      {/* Taxa de Resposta */}
      <MetricCard
        title="Taxa de Resposta"
        value="94%"
        icon={TrendingUp}
        change={{
          value: 2,
          label: 'vs. semana passada',
        }}
        delay={0.2}
      />

      {/* Tokens Usados */}
      <MetricCard
        title="Tokens Usados"
        value="45k"
        icon={Zap}
        progress={{
          current: 45000,
          max: 100000,
        }}
        link={{
          label: 'Comprar mais',
          href: '#comprar',
        }}
        delay={0.3}
      />

      {/* Arquivos Usados */}
      <MetricCard
        title="Arquivos Usados"
        value="12"
        icon={FileText}
        progress={{
          current: 12,
          max: 20,
        }}
        link={{
          label: 'Gerenciar',
          href: '/arquivos',
        }}
        delay={0.4}
      />

      {/* Média de Resposta */}
      <MetricCard
        title="Média de Resposta"
        value="2.3s"
        icon={Clock}
        change={{
          value: -21,
          label: 'mais rápido',
        }}
        delay={0.5}
      />
    </div>
  )
}
