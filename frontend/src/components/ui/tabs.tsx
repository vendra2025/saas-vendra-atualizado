'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  className?: string
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div className={cn('border-b border-border', className)}>
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative',
                'whitespace-nowrap',
                isActive
                  ? 'text-primary'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {Icon && <Icon className="w-4 h-4" />}
              {tab.label}

              {/* Active indicator */}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface TabPanelProps {
  value: string
  activeTab: string
  children: React.ReactNode
  className?: string
}

export function TabPanel({ value, activeTab, children, className }: TabPanelProps) {
  if (value !== activeTab) return null

  return <div className={cn('py-6', className)}>{children}</div>
}
