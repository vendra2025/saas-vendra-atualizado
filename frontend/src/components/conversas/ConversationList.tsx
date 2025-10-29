'use client'

import { useState } from 'react'
import { useConversations } from '@/hooks/useConversations'
import { ConversationCard } from './ConversationCard'
import { Search, X } from 'lucide-react'

export function ConversationList() {
  const {
    activeConversationId,
    setActiveConversation,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    getFilteredConversations,
    getStats,
  } = useConversations()

  const conversations = getFilteredConversations()
  const stats = getStats()
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'pending' | 'in_progress' | 'resolved'>('all')

  const handleFilterChange = (filter: typeof activeFilter) => {
    setActiveFilter(filter)

    switch (filter) {
      case 'all':
        setFilters({ status: [], unreadOnly: false })
        break
      case 'unread':
        setFilters({ status: [], unreadOnly: true })
        break
      case 'pending':
        setFilters({ status: ['pending'], unreadOnly: false })
        break
      case 'in_progress':
        setFilters({ status: ['in_progress'], unreadOnly: false })
        break
      case 'resolved':
        setFilters({ status: ['resolved'], unreadOnly: false })
        break
    }
  }

  const filterTabs = [
    { id: 'all' as const, label: 'Todas', count: stats.total },
    { id: 'unread' as const, label: 'Não Lidas', count: stats.unread },
    { id: 'pending' as const, label: 'Pendentes', count: stats.pending },
    { id: 'in_progress' as const, label: 'Em Andamento', count: stats.inProgress },
    { id: 'resolved' as const, label: 'Resolvidas', count: 0 },
  ]

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Search Bar */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar conversas..."
            className="w-full pl-10 pr-8 py-2 bg-background border border-border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
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
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-border overflow-x-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleFilterChange(tab.id)}
            className={`flex-1 min-w-fit px-3 py-2 text-xs font-medium transition-colors border-b-2 ${
              activeFilter === tab.id
                ? 'border-primary text-primary bg-primary/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-xs ${
                activeFilter === tab.id
                  ? 'bg-primary text-background'
                  : 'bg-card text-gray-400'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-8 text-center">
            <Search className="w-12 h-12 text-gray-500 mx-auto mb-3" />
            <h3 className="text-sm font-medium text-white mb-1">
              Nenhuma conversa encontrada
            </h3>
            <p className="text-xs text-gray-400">
              Tente ajustar os filtros ou buscar por outro termo
            </p>
          </div>
        ) : (
          conversations.map((conversation) => (
            <ConversationCard
              key={conversation.id}
              conversation={conversation}
              isActive={conversation.id === activeConversationId}
              onClick={() => setActiveConversation(conversation.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}
