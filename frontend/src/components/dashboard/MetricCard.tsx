'use client'

import { motion } from 'framer-motion'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useEffect, useState } from 'react'

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  change?: {
    value: number
    label: string
  }
  progress?: {
    current: number
    max: number
  }
  link?: {
    label: string
    href: string
  }
  delay?: number
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  change,
  progress,
  link,
  delay = 0,
}: MetricCardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const numericValue = typeof value === 'number' ? value : 0

  // Animação de counter para valores numéricos
  useEffect(() => {
    if (typeof value !== 'number') return

    const duration = 1000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  const isPositive = change && change.value > 0
  const isNegative = change && change.value < 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Card hover glow className="h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400 mb-1">{title}</p>
            <p className="text-3xl font-bold text-white">
              {typeof value === 'number' ? displayValue.toLocaleString('pt-BR') : value}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Variação */}
        {change && (
          <div className="flex items-center gap-2 mb-3">
            {isPositive && <TrendingUp className="w-4 h-4 text-green-500" />}
            {isNegative && <TrendingDown className="w-4 h-4 text-red-500" />}
            <span
              className={`text-sm font-medium ${
                isPositive
                  ? 'text-green-500'
                  : isNegative
                  ? 'text-red-500'
                  : 'text-gray-400'
              }`}
            >
              {change.value > 0 ? '+' : ''}
              {change.value}%
            </span>
            <span className="text-sm text-gray-400">{change.label}</span>
          </div>
        )}

        {/* Progress Bar */}
        {progress && (
          <div className="space-y-2">
            <Progress
              value={progress.current}
              max={progress.max}
              size="sm"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{progress.current.toLocaleString('pt-BR')} usados</span>
              <span>{progress.max.toLocaleString('pt-BR')} total</span>
            </div>
          </div>
        )}

        {/* Link */}
        {link && (
          <a
            href={link.href}
            className="inline-flex items-center text-sm text-primary hover:text-primary-dark transition-colors mt-3"
          >
            {link.label}
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        )}
      </Card>
    </motion.div>
  )
}
