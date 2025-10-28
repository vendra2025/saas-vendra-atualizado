'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAssistantConfig } from '@/hooks/useAssistantConfig'
import { ShoppingCart, Calendar, Wrench, FileText } from 'lucide-react'

const templates = [
  {
    id: 'ecommerce',
    name: 'E-commerce',
    icon: ShoppingCart,
    content: `Você é um assistente de vendas para e-commerce.

Objetivos:
- Ajudar clientes a encontrar produtos
- Responder dúvidas sobre estoque, preços e prazos
- Processar pedidos via link de checkout

Regras:
- Sempre confirme o endereço de entrega
- Ofereça cupons de desconto quando aplicável
- Informe sobre frete grátis acima de R$200

Exemplo de resposta:
"Encontrei o produto que você procura! Ele está disponível em estoque. O preço é R$149,90 com frete grátis. Deseja finalizar o pedido?"`,
  },
  {
    id: 'agendamento',
    name: 'Agendamento',
    icon: Calendar,
    content: `Você é um assistente de agendamentos.

Objetivos:
- Verificar disponibilidade na agenda
- Confirmar dados do cliente (nome, telefone, email)
- Agendar horários disponíveis

Regras:
- Horários disponíveis: seg-sex 9h-18h
- Duração padrão: 1 hora
- Confirmação por WhatsApp 24h antes

Exemplo de resposta:
"Tenho disponibilidade na terça-feira às 14h. Posso confirmar seu agendamento neste horário?"`,
  },
  {
    id: 'suporte',
    name: 'Suporte Técnico',
    icon: Wrench,
    content: `Você é um assistente de suporte técnico.

Objetivos:
- Diagnosticar problemas básicos
- Fornecer soluções passo-a-passo
- Escalar para técnico quando necessário

Regras:
- Sempre peça o número do pedido
- Confirme o modelo do produto
- Documente todas as tentativas de solução

Exemplo de resposta:
"Vou ajudá-lo a resolver isso. Primeiro, pode me confirmar o número do seu pedido?"`,
  },
  {
    id: 'blank',
    name: 'Em Branco',
    icon: FileText,
    content: '',
  },
]

export function InstructionsEditor() {
  const { config, updateInstructions } = useAssistantConfig()

  return (
    <div className="space-y-6">
      {/* Templates */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">
          Templates Pré-configurados
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Escolha um template para começar ou crie suas próprias instruções
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {templates.map((template) => {
            const Icon = template.icon
            return (
              <button
                key={template.id}
                onClick={() => updateInstructions(template.content)}
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary transition-colors"
              >
                <Icon className="w-6 h-6 text-primary" />
                <span className="text-sm font-medium text-white">
                  {template.name}
                </span>
              </button>
            )
          })}
        </div>
      </Card>

      {/* Editor */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            Instruções Customizadas
          </h3>
          <span className="text-sm text-gray-400">
            {config.instructions.length}/5000 caracteres
          </span>
        </div>

        <textarea
          value={config.instructions}
          onChange={(e) => updateInstructions(e.target.value)}
          maxLength={5000}
          rows={16}
          placeholder="Digite as instruções para o assistente..."
          className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
          style={{ lineHeight: '1.6' }}
        />

        {/* Variáveis disponíveis */}
        <div className="mt-4 p-4 bg-background rounded-lg border border-border">
          <h4 className="text-sm font-medium text-white mb-2">
            Variáveis Disponíveis
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            <div className="text-gray-400">
              <code className="text-primary">{'{nome_cliente}'}</code> - Nome do
              contato
            </div>
            <div className="text-gray-400">
              <code className="text-primary">{'{telefone}'}</code> - Número de
              telefone
            </div>
            <div className="text-gray-400">
              <code className="text-primary">{'{email}'}</code> - Email do
              contato
            </div>
            <div className="text-gray-400">
              <code className="text-primary">{'{data_atual}'}</code> - Data de
              hoje
            </div>
            <div className="text-gray-400">
              <code className="text-primary">{'{hora_atual}'}</code> - Hora
              atual
            </div>
            <div className="text-gray-400">
              <code className="text-primary">{'{nome_empresa}'}</code> - Nome da
              sua empresa
            </div>
          </div>
        </div>
      </Card>

      {/* Dicas */}
      <Card className="bg-primary/5 border-primary/20">
        <h4 className="text-sm font-medium text-primary mb-2">💡 Dicas</h4>
        <ul className="space-y-1 text-xs text-gray-400">
          <li>• Seja específico sobre o que o assistente deve e não deve fazer</li>
          <li>• Inclua exemplos de respostas ideais</li>
          <li>• Defina o tom de voz desejado (formal, casual, técnico)</li>
          <li>• Especifique quando transferir para humano</li>
          <li>• Use as variáveis para personalizar as respostas</li>
        </ul>
      </Card>
    </div>
  )
}
