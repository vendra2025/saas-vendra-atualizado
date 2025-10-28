'use client'

import { ConversationsChart } from './ConversationsChart'
import { ResponseTimesChart } from './ResponseTimesChart'

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ConversationsChart />
      <ResponseTimesChart />
    </div>
  )
}
