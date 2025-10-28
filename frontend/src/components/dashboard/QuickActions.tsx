'use client'

import { Card } from '@/components/ui/card'
import {
  MessageSquarePlus,
  UserPlus,
  Upload,
  TestTube,
  FileBarChart,
  Settings,
} from 'lucide-react'
import { motion } from 'framer-motion'

const actions = [
  {
    id: 1,
    icon: MessageSquarePlus,
    title: 'Iniciar Conversa',
    description: 'Enviar mensagem manual',
    shortcut: 'Ctrl+N',
    href: '/mensagens/nova',
  },
  {
    id: 2,
    icon: UserPlus,
    title: 'Adicionar Contato',
    description: 'Importar ou criar contato',
    shortcut: 'Ctrl+K',
    href: '/contatos/novo',
  },
  {
    id: 3,
    icon: Upload,
    title: 'Upload de Arquivo',
    description: 'Adicionar à base de conhecimento',
    shortcut: 'Ctrl+U',
    href: '/arquivos/upload',
  },
  {
    id: 4,
    icon: TestTube,
    title: 'Testar Assistente',
    description: 'Simular conversa',
    shortcut: 'Ctrl+T',
    href: '/assistente/teste',
  },
  {
    id: 5,
    icon: FileBarChart,
    title: 'Ver Relatório',
    description: 'Exportar métricas',
    shortcut: 'Ctrl+R',
    href: '/relatorios',
  },
  {
    id: 6,
    icon: Settings,
    title: 'Configurações Rápidas',
    description: 'Ajustar preferências',
    shortcut: 'Ctrl+,',
    href: '/configuracoes',
  },
]

export function QuickActions() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <motion.a
              key={action.id}
              href={action.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <Card
                hover
                className="h-full cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-medium text-white mb-1 text-sm">
                    {action.title}
                  </h4>
                  <p className="text-xs text-gray-400 mb-2">
                    {action.description}
                  </p>
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-card-hover text-xs text-gray-400">
                    <kbd className="font-mono">{action.shortcut}</kbd>
                  </div>
                </div>
              </Card>
            </motion.a>
          )
        })}
      </div>
    </div>
  )
}
