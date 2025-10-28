'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Zap, FileText, ShoppingCart, TrendingUp } from 'lucide-react'
import { BuyCreditsModal } from './BuyCreditsModal'
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

const usageData = [
  { day: 1, tokens: 2800 },
  { day: 2, tokens: 3200 },
  { day: 3, tokens: 2900 },
  { day: 4, tokens: 3500 },
  { day: 5, tokens: 3100 },
  { day: 6, tokens: 6500 },
  { day: 7, tokens: 3000 },
]

export function CreditsWidget() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const tokensUsed = 45000
  const tokensTotal = 100000
  const filesUsed = 12
  const filesTotal = 20

  const tokensPercentage = (tokensUsed / tokensTotal) * 100
  const filesPercentage = (filesUsed / filesTotal) * 100

  const averageDaily = 3000
  const daysRemaining = Math.floor((tokensTotal - tokensUsed) / averageDaily)

  return (
    <>
      <Card>
        <h3 className="text-lg font-semibold text-white mb-6">
          Créditos e Uso
        </h3>

        {/* Tokens */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-medium text-white">Tokens</span>
            </div>
            <span className="text-sm text-gray-400">
              {tokensUsed.toLocaleString('pt-BR')} / {tokensTotal.toLocaleString('pt-BR')}
            </span>
          </div>
          <Progress
            value={tokensUsed}
            max={tokensTotal}
            size="lg"
            variant={tokensPercentage > 80 ? 'warning' : 'default'}
          />
          <p className="text-xs text-gray-400 mt-2">
            Estimativa: ~{daysRemaining} dias restantes
          </p>
        </div>

        {/* Arquivos */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-medium text-white">Arquivos</span>
            </div>
            <span className="text-sm text-gray-400">
              {filesUsed} / {filesTotal}
            </span>
          </div>
          <Progress
            value={filesUsed}
            max={filesTotal}
            size="lg"
            variant={filesPercentage > 80 ? 'warning' : 'default'}
          />
          <p className="text-xs text-gray-400 mt-2">
            {filesTotal - filesUsed} slots disponíveis
          </p>
        </div>

        {/* Histórico de Consumo */}
        <div className="border-t border-border pt-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-white">
              Histórico de Consumo
            </span>
          </div>
          <div className="h-[60px] mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#151922',
                    border: '1px solid #1F2937',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                  formatter={(value: number) => [
                    `${value.toLocaleString('pt-BR')} tokens`,
                    'Uso',
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="tokens"
                  stroke="#00FF88"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-gray-400">Média diária</p>
              <p className="text-white font-medium">
                {averageDaily.toLocaleString('pt-BR')} tokens
              </p>
            </div>
            <div>
              <p className="text-gray-400">Pico</p>
              <p className="text-white font-medium">
                6.500 tokens
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full"
          glow
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Comprar Mais Créditos
        </Button>
      </Card>

      <BuyCreditsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
