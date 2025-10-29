'use client'

import { MessageCircle, CheckCircle, Clock, Star } from 'lucide-react'
import { motion } from 'framer-motion'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: React.ReactNode
  color: string
  index: number
}

function MetricCard({ title, value, subtitle, icon, color, index }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-lg border border-border p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-sm text-gray-400 mb-1">{title}</div>
          <div className="text-3xl font-bold text-white">{value}</div>
        </div>
        <div
          className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}
        >
          {icon}
        </div>
      </div>
      <div className="text-sm text-gray-400">{subtitle}</div>
    </motion.div>
  )
}

interface MetricsOverviewProps {
  summary: {
    totalConversations: number
    resolutionRate: number
    avgResponseTime: number
    avgResolutionTime: number
  }
  satisfaction: {
    csat: number
  }
}

export function MetricsOverview({ summary, satisfaction }: MetricsOverviewProps) {
  const metrics = [
    {
      title: 'Total de Conversas',
      value: summary.totalConversations.toLocaleString('pt-BR'),
      subtitle: 'No período selecionado',
      icon: <MessageCircle className="w-6 h-6 text-blue-500" />,
      color: 'bg-blue-500/10',
    },
    {
      title: 'Taxa de Resolução',
      value: `${summary.resolutionRate.toFixed(1)}%`,
      subtitle: 'Conversas finalizadas',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      color: 'bg-green-500/10',
    },
    {
      title: 'Tempo de Resposta',
      value: `${summary.avgResponseTime.toFixed(1)}min`,
      subtitle: 'Tempo médio de primeira resposta',
      icon: <Clock className="w-6 h-6 text-yellow-500" />,
      color: 'bg-yellow-500/10',
    },
    {
      title: 'Satisfação (CSAT)',
      value: satisfaction.csat.toFixed(1),
      subtitle: 'Avaliação média dos clientes',
      icon: <Star className="w-6 h-6 text-primary" />,
      color: 'bg-primary/10',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={metric.title} {...metric} index={index} />
      ))}
    </div>
  )
}
