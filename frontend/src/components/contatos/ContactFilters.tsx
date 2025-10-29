'use client'

import { useState } from 'react'
import { useContacts } from '@/hooks/useContacts'
import { Button } from '@/components/ui/button'
import { TagBadge } from './TagBadge'
import { Search, Filter, X } from 'lucide-react'

export function ContactFilters() {
  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    clearFilters,
    tags,
  } = useContacts()
  const [showAdvanced, setShowAdvanced] = useState(false)

  const quickFilters = [
    { id: 'all', label: 'Todos', filter: () => clearFilters() },
    {
      id: 'today',
      label: 'Adicionados hoje',
      filter: () => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        setFilters({ dateRange: { start: today, end: new Date() } })
      },
    },
    {
      id: 'week',
      label: 'Esta semana',
      filter: () => {
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        setFilters({ dateRange: { start: weekAgo, end: new Date() } })
      },
    },
    {
      id: 'month',
      label: 'Este mês',
      filter: () => {
        const monthAgo = new Date()
        monthAgo.setMonth(monthAgo.getMonth() - 1)
        setFilters({ dateRange: { start: monthAgo, end: new Date() } })
      },
    },
    {
      id: 'inactive',
      label: 'Inativos (30+ dias)',
      filter: () => {
        setFilters({ lastInteraction: '30d' })
      },
    },
  ]

  const hasActiveFilters =
    filters.tags.length > 0 ||
    filters.status.length > 0 ||
    filters.dateRange ||
    filters.lastInteraction ||
    searchQuery

  const toggleTag = (tagId: string) => {
    const newTags = filters.tags.includes(tagId)
      ? filters.tags.filter((t) => t !== tagId)
      : [...filters.tags, tagId]
    setFilters({ tags: newTags })
  }

  const toggleStatus = (status: 'active' | 'inactive' | 'blocked') => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter((s) => s !== status)
      : [...filters.status, status]
    setFilters({ status: newStatus })
  }

  const getActiveFiltersBadges = () => {
    const badges: React.ReactNode[] = []

    if (searchQuery) {
      badges.push(
        <button
          key="search"
          onClick={() => setSearchQuery('')}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-primary/20 text-primary border border-primary/40"
        >
          Busca: "{searchQuery}"
          <X className="w-3 h-3" />
        </button>
      )
    }

    filters.tags.forEach((tagId) => {
      const tag = tags.find((t) => t.id === tagId)
      if (tag) {
        badges.push(
          <TagBadge
            key={`tag-${tagId}`}
            name={tag.name}
            color={tag.color}
            onRemove={() => toggleTag(tagId)}
            size="sm"
          />
        )
      }
    })

    filters.status.forEach((status) => {
      const labels = { active: 'Ativo', inactive: 'Inativo', blocked: 'Bloqueado' }
      badges.push(
        <button
          key={`status-${status}`}
          onClick={() => toggleStatus(status)}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-card text-gray-300 border border-border"
        >
          {labels[status]}
          <X className="w-3 h-3" />
        </button>
      )
    })

    if (filters.lastInteraction) {
      const labels: Record<string, string> = {
        '1h': 'Última hora',
        '24h': 'Últimas 24h',
        '7d': 'Últimos 7 dias',
        '30d': 'Últimos 30 dias',
        never: 'Nunca interagiu',
      }
      badges.push(
        <button
          key="interaction"
          onClick={() => setFilters({ lastInteraction: undefined })}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-card text-gray-300 border border-border"
        >
          {labels[filters.lastInteraction]}
          <X className="w-3 h-3" />
        </button>
      )
    }

    if (filters.dateRange) {
      badges.push(
        <button
          key="daterange"
          onClick={() => setFilters({ dateRange: undefined })}
          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-card text-gray-300 border border-border"
        >
          Período personalizado
          <X className="w-3 h-3" />
        </button>
      )
    }

    return badges
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, email, telefone, empresa..."
            className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={showAdvanced ? 'bg-primary/10 border-primary/40' : ''}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtros Avançados
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={filter.filter}
            className="px-3 py-1.5 text-sm rounded-lg bg-card border border-border text-gray-300 hover:text-white hover:border-primary/50 transition-colors"
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="bg-card rounded-lg border border-border p-4 space-y-4">
          {/* Tags Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    filters.tags.includes(tag.id)
                      ? 'ring-2 ring-primary'
                      : 'hover:ring-1 hover:ring-gray-500'
                  }`}
                  style={{
                    backgroundColor: `${tag.color}20`,
                    color: tag.color,
                    border: `1px solid ${tag.color}40`,
                  }}
                >
                  {tag.name} ({tag.contactsCount})
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Status</label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'active', label: 'Ativo', color: '#00FF88' },
                { id: 'inactive', label: 'Inativo', color: '#6B7280' },
                { id: 'blocked', label: 'Bloqueado', color: '#EF4444' },
              ].map((status) => (
                <button
                  key={status.id}
                  onClick={() =>
                    toggleStatus(status.id as 'active' | 'inactive' | 'blocked')
                  }
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                    filters.status.includes(status.id as any)
                      ? 'ring-2 ring-primary'
                      : 'hover:ring-1 hover:ring-gray-500'
                  }`}
                  style={{
                    backgroundColor: `${status.color}20`,
                    color: status.color,
                    border: `1px solid ${status.color}40`,
                  }}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Last Interaction Filter */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Última Interação
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: '1h', label: 'Última hora' },
                { id: '24h', label: 'Últimas 24h' },
                { id: '7d', label: 'Últimos 7 dias' },
                { id: '30d', label: 'Últimos 30 dias' },
                { id: 'never', label: 'Nunca interagiu' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFilters({ lastInteraction: option.id })}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                    filters.lastInteraction === option.id
                      ? 'bg-primary text-background border-primary'
                      : 'bg-background text-gray-300 border-border hover:text-white hover:border-primary/50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Badges */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-400">Filtros ativos:</span>
          {getActiveFiltersBadges()}
          <button
            onClick={clearFilters}
            className="text-sm text-gray-400 hover:text-white underline"
          >
            Limpar todos
          </button>
        </div>
      )}
    </div>
  )
}
