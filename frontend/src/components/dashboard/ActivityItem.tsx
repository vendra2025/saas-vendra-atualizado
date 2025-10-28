'use client'

import { LucideIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export interface Activity {
  id: number
  type: 'new' | 'auto' | 'success' | 'error' | 'purchase'
  icon: LucideIcon
  description: string
  timestamp: string
  badge?: string
  link?: string
}

interface ActivityItemProps {
  activity: Activity
}

const iconColors = {
  new: 'text-green-500 bg-green-500/10',
  auto: 'text-blue-500 bg-blue-500/10',
  success: 'text-green-500 bg-green-500/10',
  error: 'text-red-500 bg-red-500/10',
  purchase: 'text-primary bg-primary/10',
}

const badgeVariants = {
  new: 'default' as const,
  auto: 'info' as const,
  success: 'success' as const,
  error: 'danger' as const,
  purchase: 'info' as const,
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const Icon = activity.icon

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-card-hover transition-colors group">
      {/* Icon */}
      <div
        className={cn(
          'p-2 rounded-lg flex-shrink-0',
          iconColors[activity.type]
        )}
      >
        <Icon className="w-4 h-4" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white mb-1">{activity.description}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{activity.timestamp}</span>
          {activity.badge && (
            <Badge variant={badgeVariants[activity.type]}>
              {activity.badge}
            </Badge>
          )}
        </div>
        {activity.link && (
          <a
            href={activity.link}
            className="text-xs text-primary hover:text-primary-dark transition-colors mt-1 inline-block"
          >
            Ver detalhes →
          </a>
        )}
      </div>
    </div>
  )
}
