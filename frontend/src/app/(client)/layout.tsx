'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/client/Sidebar'
import { Topbar } from '@/components/client/Topbar'
import { AuthGuard } from '@/components/auth/AuthGuard'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthGuard>
      <div className="min-h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content */}
        <div className="lg:pl-64">
          {/* Topbar */}
          <Topbar onMenuClick={() => setSidebarOpen(true)} />

          {/* Page Content */}
          <main className="p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
