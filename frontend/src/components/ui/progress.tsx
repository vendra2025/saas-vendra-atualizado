'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'danger'
}

const variantStyles = {
  default: 'bg-primary',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  danger: 'bg-red-500',
}

const sizeStyles = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
}

export function Progress({
  value,
  max = 100,
  showLabel = false,
  size = 'md',
  variant = 'default',
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className="w-full space-y-1">
      {showLabel && (
        <div className="flex justify-between text-xs text-gray-400">
          <span>{value.toLocaleString('pt-BR')}</span>
          <span>{max.toLocaleString('pt-BR')}</span>
        </div>
      )}
      <div
        className={cn(
          'w-full overflow-hidden rounded-full bg-card border border-border',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out',
            variantStyles[variant],
            percentage >= 90 && variant === 'default' && 'animate-pulse'
          )}
          style={{
            width: `${percentage}%`,
            boxShadow: variant === 'default' ? '0 0 10px rgba(0, 255, 136, 0.5)' : undefined,
          }}
        />
      </div>
      {showLabel && (
        <div className="text-xs text-gray-400 text-right">
          {percentage.toFixed(0)}%
        </div>
      )}
    </div>
  )
}
