import { MetricsCards } from '@/components/dashboard/MetricsCards'
import { ChartsSection } from '@/components/dashboard/ChartsSection'
import { WhatsAppStatus } from '@/components/dashboard/WhatsAppStatus'
import { CreditsWidget } from '@/components/dashboard/CreditsWidget'
import { RecentActivity } from '@/components/dashboard/RecentActivity'
import { QuickActions } from '@/components/dashboard/QuickActions'

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2 text-white">Dashboard</h1>
        <p className="text-gray-400">
          Bem-vindo de volta! Aqui está um resumo em tempo real da sua conta.
        </p>
      </div>

      {/* Metrics Cards */}
      <MetricsCards />

      {/* Charts Section */}
      <ChartsSection />

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* WhatsApp Status */}
        <div className="lg:col-span-1">
          <WhatsAppStatus />
        </div>

        {/* Credits Widget */}
        <div className="lg:col-span-1">
          <CreditsWidget />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  )
}
