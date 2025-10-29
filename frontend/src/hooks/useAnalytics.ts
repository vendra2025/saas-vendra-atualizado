'use client'

import { create } from 'zustand'
import { subDays, format } from 'date-fns'

export interface DailyMetrics {
  date: Date
  conversations: number
  resolved: number
  avgResponseTime: number // minutes
  avgResolutionTime: number // hours
}

export interface AgentMetrics {
  id: string
  name: string
  conversations: number
  avgResponseTime: number // minutes
  satisfaction: number // 0-5
  resolved: number
  transfers: number
}

export interface SatisfactionRating {
  id: string
  conversationId: string
  rating: number // 1-5
  comment?: string
  date: Date
}

export interface BusyHour {
  hour: number // 0-23
  conversations: number
}

export interface AnalyticsData {
  period: 'today' | '7days' | '30days' | 'custom'
  customRange?: { start: Date; end: Date }
  summary: {
    totalConversations: number
    newConversations: number
    resolvedConversations: number
    resolutionRate: number // percentage
    avgResponseTime: number // minutes
    avgResolutionTime: number // hours
  }
  channels: {
    whatsapp: { total: number; percentage: number }
    webchat: { total: number; percentage: number }
  }
  satisfaction: {
    nps: number // -100 to 100
    csat: number // 0 to 5
    totalRatings: number
    distribution: Record<1 | 2 | 3 | 4 | 5, number>
  }
  dailyMetrics: DailyMetrics[]
  agents: AgentMetrics[]
  busyHours: BusyHour[]
  ratings: SatisfactionRating[]
}

interface AnalyticsStore {
  period: 'today' | '7days' | '30days' | 'custom'
  customRange?: { start: Date; end: Date }
  setPeriod: (period: 'today' | '7days' | '30days' | 'custom', customRange?: { start: Date; end: Date }) => void
  getData: () => AnalyticsData
  exportData: (format: 'pdf' | 'excel' | 'csv') => void
}

// Generate mock data for 30 days
const generateDailyMetrics = (): DailyMetrics[] => {
  const metrics: DailyMetrics[] = []
  for (let i = 29; i >= 0; i--) {
    const date = subDays(new Date(), i)
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    // Weekend has less conversations
    const baseConversations = isWeekend ? 25 : 45
    const variance = Math.floor(Math.random() * 15) - 7

    metrics.push({
      date,
      conversations: baseConversations + variance,
      resolved: Math.floor((baseConversations + variance) * (0.85 + Math.random() * 0.1)),
      avgResponseTime: 2.5 + Math.random() * 1.5, // 2.5 - 4 minutes
      avgResolutionTime: 2.0 + Math.random() * 1.0, // 2 - 3 hours
    })
  }
  return metrics
}

const mockDailyMetrics = generateDailyMetrics()

// Mock agents data
const mockAgents: AgentMetrics[] = [
  {
    id: 'agent-1',
    name: 'João Silva',
    conversations: 287,
    avgResponseTime: 2.8,
    satisfaction: 4.7,
    resolved: 256,
    transfers: 12,
  },
  {
    id: 'agent-2',
    name: 'Maria Santos',
    conversations: 245,
    avgResponseTime: 3.1,
    satisfaction: 4.6,
    resolved: 218,
    transfers: 18,
  },
  {
    id: 'agent-3',
    name: 'Pedro Costa',
    conversations: 312,
    avgResponseTime: 3.5,
    satisfaction: 4.5,
    resolved: 275,
    transfers: 23,
  },
  {
    id: 'agent-4',
    name: 'Ana Oliveira',
    conversations: 198,
    avgResponseTime: 2.9,
    satisfaction: 4.8,
    resolved: 182,
    transfers: 8,
  },
  {
    id: 'agent-5',
    name: 'Lucas Pereira',
    conversations: 205,
    avgResponseTime: 3.0,
    satisfaction: 4.6,
    resolved: 185,
    transfers: 14,
  },
]

// Mock busy hours (peak times)
const mockBusyHours: BusyHour[] = [
  { hour: 0, conversations: 8 },
  { hour: 1, conversations: 4 },
  { hour: 2, conversations: 2 },
  { hour: 3, conversations: 1 },
  { hour: 4, conversations: 1 },
  { hour: 5, conversations: 3 },
  { hour: 6, conversations: 12 },
  { hour: 7, conversations: 28 },
  { hour: 8, conversations: 67 },
  { hour: 9, conversations: 145 },
  { hour: 10, conversations: 142 },
  { hour: 11, conversations: 98 },
  { hour: 12, conversations: 72 },
  { hour: 13, conversations: 84 },
  { hour: 14, conversations: 178 },
  { hour: 15, conversations: 165 },
  { hour: 16, conversations: 124 },
  { hour: 17, conversations: 89 },
  { hour: 18, conversations: 76 },
  { hour: 19, conversations: 112 },
  { hour: 20, conversations: 87 },
  { hour: 21, conversations: 54 },
  { hour: 22, conversations: 32 },
  { hour: 23, conversations: 18 },
]

// Generate mock satisfaction ratings
const generateRatings = (): SatisfactionRating[] => {
  const ratings: SatisfactionRating[] = []
  const distribution = [
    { rating: 5, count: 542 },
    { rating: 4, count: 231 },
    { rating: 3, count: 78 },
    { rating: 2, count: 28 },
    { rating: 1, count: 14 },
  ]

  let id = 1
  distribution.forEach(({ rating, count }) => {
    for (let i = 0; i < count; i++) {
      const daysAgo = Math.floor(Math.random() * 30)
      ratings.push({
        id: `rating-${id++}`,
        conversationId: `conv-${Math.floor(Math.random() * 1000)}`,
        rating: rating as 1 | 2 | 3 | 4 | 5,
        comment: rating <= 2 ? 'Precisa melhorar' : rating === 3 ? 'Ok' : 'Excelente atendimento!',
        date: subDays(new Date(), daysAgo),
      })
    }
  })

  return ratings.sort((a, b) => b.date.getTime() - a.date.getTime())
}

const mockRatings = generateRatings()

export const useAnalytics = create<AnalyticsStore>()((set, get) => ({
  period: '30days',
  customRange: undefined,

  setPeriod: (period, customRange) => {
    set({ period, customRange })
  },

  getData: () => {
    const state = get()
    const { period, customRange } = state

    // Calculate date range
    let startDate: Date
    let endDate = new Date()

    switch (period) {
      case 'today':
        startDate = new Date()
        startDate.setHours(0, 0, 0, 0)
        break
      case '7days':
        startDate = subDays(new Date(), 7)
        break
      case '30days':
        startDate = subDays(new Date(), 30)
        break
      case 'custom':
        if (!customRange) {
          startDate = subDays(new Date(), 30)
        } else {
          startDate = customRange.start
          endDate = customRange.end
        }
        break
      default:
        startDate = subDays(new Date(), 30)
    }

    // Filter daily metrics by date range
    const filteredMetrics = mockDailyMetrics.filter(
      (m) => m.date >= startDate && m.date <= endDate
    )

    // Calculate summary metrics
    const totalConversations = filteredMetrics.reduce((sum, m) => sum + m.conversations, 0)
    const totalResolved = filteredMetrics.reduce((sum, m) => sum + m.resolved, 0)
    const avgResponseTime =
      filteredMetrics.reduce((sum, m) => sum + m.avgResponseTime, 0) / filteredMetrics.length
    const avgResolutionTime =
      filteredMetrics.reduce((sum, m) => sum + m.avgResolutionTime, 0) / filteredMetrics.length

    // Calculate channel distribution (68% WhatsApp, 32% WebChat)
    const whatsappTotal = Math.floor(totalConversations * 0.68)
    const webchatTotal = totalConversations - whatsappTotal

    // Calculate satisfaction metrics
    const totalRatings = mockRatings.length
    const avgRating = mockRatings.reduce((sum, r) => sum + r.rating, 0) / totalRatings

    // Calculate NPS (Net Promoter Score)
    const promoters = mockRatings.filter((r) => r.rating >= 4).length
    const detractors = mockRatings.filter((r) => r.rating <= 2).length
    const nps = Math.round(((promoters - detractors) / totalRatings) * 100)

    const distribution = {
      1: mockRatings.filter((r) => r.rating === 1).length,
      2: mockRatings.filter((r) => r.rating === 2).length,
      3: mockRatings.filter((r) => r.rating === 3).length,
      4: mockRatings.filter((r) => r.rating === 4).length,
      5: mockRatings.filter((r) => r.rating === 5).length,
    }

    return {
      period,
      customRange,
      summary: {
        totalConversations,
        newConversations: totalConversations - totalResolved,
        resolvedConversations: totalResolved,
        resolutionRate: (totalResolved / totalConversations) * 100,
        avgResponseTime,
        avgResolutionTime,
      },
      channels: {
        whatsapp: {
          total: whatsappTotal,
          percentage: 68,
        },
        webchat: {
          total: webchatTotal,
          percentage: 32,
        },
      },
      satisfaction: {
        nps,
        csat: avgRating,
        totalRatings,
        distribution,
      },
      dailyMetrics: filteredMetrics,
      agents: mockAgents,
      busyHours: mockBusyHours,
      ratings: mockRatings.slice(0, 50), // Return only latest 50 ratings
    }
  },

  exportData: (format) => {
    const data = get().getData()
    console.log(`Exporting analytics data as ${format}`, data)
    // In a real app, this would generate and download the file
    alert(`Relatório exportado como ${format.toUpperCase()}!`)
  },
}))
