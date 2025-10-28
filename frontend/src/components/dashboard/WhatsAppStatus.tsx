'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Activity,
  Battery,
  Clock,
  MessageSquare,
  Power,
  TestTube,
  FileText,
} from 'lucide-react'
import Image from 'next/image'

export function WhatsAppStatus() {
  const isConnected = true
  const uptime = 99.8
  const latency = 120

  return (
    <Card className="relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background:
            'radial-gradient(circle at top right, #00FF88 0%, transparent 70%)',
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Status do WhatsApp
            </h3>
            <Badge variant={isConnected ? 'success' : 'default'}>
              <span
                className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                }`}
              />
              {isConnected ? 'Conectado' : 'Desconectado'}
            </Badge>
          </div>
          <div className="p-3 rounded-full bg-green-500/10 border border-green-500/20">
            <MessageSquare className="w-8 h-8 text-green-500" />
          </div>
        </div>

        {/* Connection Info */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="text-xl">📱</span>
            </div>
            <div>
              <p className="text-sm text-gray-400">Número</p>
              <p className="text-white font-medium">+55 11 99999-9999</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">Nome</p>
              <p className="text-white font-medium">Vendra Atendimento</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Status</p>
              <p className="text-green-500 font-medium">Online</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Última sinc.</p>
                <p className="text-sm text-white">Há 2 min</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Battery className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Bateria</p>
                <p className="text-sm text-white">89%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Na fila</p>
                <p className="text-sm text-white">0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="border-t border-border pt-4 mb-6">
          <p className="text-sm font-medium text-white mb-3">
            Saúde da Conexão
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-green-500" />
                <span className="text-xs text-gray-400">Uptime</span>
              </div>
              <p className="text-2xl font-bold text-white">{uptime}%</p>
              <p className="text-xs text-gray-400">Últimas 24h</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-primary" />
                <span className="text-xs text-gray-400">Latência</span>
              </div>
              <p className="text-2xl font-bold text-white">{latency}ms</p>
              <p className="text-xs text-gray-400">Média atual</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Power className="w-4 h-4 mr-2" />
            Desconectar
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <TestTube className="w-4 h-4 mr-2" />
            Testar
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <FileText className="w-4 h-4 mr-2" />
            Logs
          </Button>
        </div>
      </div>
    </Card>
  )
}
