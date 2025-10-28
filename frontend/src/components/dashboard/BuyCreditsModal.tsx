'use client'

import { useState } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Zap, FileText, Package, CreditCard, QrCode, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BuyCreditsModalProps {
  isOpen: boolean
  onClose: () => void
}

type TabType = 'tokens' | 'arquivos' | 'combos'
type PaymentMethod = 'stripe' | 'pix'

const tokenPlans = [
  { id: 1, amount: '500k', price: 29, popular: false },
  { id: 2, amount: '1M', price: 49, discount: 15, popular: true },
  { id: 3, amount: '5M', price: 199, discount: 30, popular: false },
]

const filePlans = [
  { id: 1, amount: 50, price: 19, popular: false },
  { id: 2, amount: 100, price: 29, popular: true },
  { id: 3, amount: 500, price: 79, popular: false },
]

const combos = [
  {
    id: 1,
    name: 'Combo Pro',
    tokens: '1M',
    files: 100,
    price: 69,
    discount: 12,
    popular: false,
  },
  {
    id: 2,
    name: 'Combo Ultra',
    tokens: '5M',
    files: 500,
    price: 249,
    discount: 20,
    popular: true,
  },
]

export function BuyCreditsModal({ isOpen, onClose }: BuyCreditsModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('tokens')
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe')

  const tabs = [
    { id: 'tokens' as TabType, label: 'Tokens', icon: Zap },
    { id: 'arquivos' as TabType, label: 'Arquivos', icon: FileText },
    { id: 'combos' as TabType, label: 'Combos', icon: Package },
  ]

  const handlePurchase = () => {
    // Mock de compra
    alert('Funcionalidade de compra será implementada na integração com Stripe/PIX')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Comprar Créditos"
      size="xl"
    >
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-border pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setSelectedPlan(null)
              }}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg transition-all',
                activeTab === tab.id
                  ? 'bg-primary text-background font-medium'
                  : 'bg-card text-gray-400 hover:text-white hover:bg-card-hover'
              )}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tokens Tab */}
      {activeTab === 'tokens' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {tokenPlans.map((plan) => (
            <Card
              key={plan.id}
              hover
              className={cn(
                'cursor-pointer transition-all',
                selectedPlan === plan.id && 'ring-2 ring-primary'
              )}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <Badge variant="info" className="mb-3">
                  Mais Popular
                </Badge>
              )}
              {plan.discount && (
                <Badge variant="success" className="mb-3 ml-2">
                  {plan.discount}% OFF
                </Badge>
              )}
              <div className="text-center">
                <Zap className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-2xl font-bold text-white mb-1">
                  +{plan.amount}
                </p>
                <p className="text-sm text-gray-400 mb-4">tokens</p>
                <p className="text-3xl font-bold text-primary">
                  R$ {plan.price}
                </p>
                <p className="text-xs text-gray-400 mt-1">/mês</p>
              </div>
              {selectedPlan === plan.id && (
                <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Selecionado</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Arquivos Tab */}
      {activeTab === 'arquivos' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {filePlans.map((plan) => (
            <Card
              key={plan.id}
              hover
              className={cn(
                'cursor-pointer transition-all',
                selectedPlan === plan.id && 'ring-2 ring-primary'
              )}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <Badge variant="info" className="mb-3">
                  Mais Popular
                </Badge>
              )}
              <div className="text-center">
                <FileText className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-2xl font-bold text-white mb-1">
                  +{plan.amount}
                </p>
                <p className="text-sm text-gray-400 mb-4">arquivos</p>
                <p className="text-3xl font-bold text-primary">
                  R$ {plan.price}
                </p>
                <p className="text-xs text-gray-400 mt-1">/mês</p>
              </div>
              {selectedPlan === plan.id && (
                <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Selecionado</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Combos Tab */}
      {activeTab === 'combos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {combos.map((combo) => (
            <Card
              key={combo.id}
              hover
              className={cn(
                'cursor-pointer transition-all',
                selectedPlan === combo.id && 'ring-2 ring-primary'
              )}
              onClick={() => setSelectedPlan(combo.id)}
            >
              {combo.popular && (
                <Badge variant="info" className="mb-3">
                  Mais Popular
                </Badge>
              )}
              <Badge variant="success" className="mb-3 ml-2">
                {combo.discount}% OFF
              </Badge>
              <div className="text-center">
                <Package className="w-10 h-10 text-primary mx-auto mb-3" />
                <p className="text-xl font-bold text-white mb-3">
                  {combo.name}
                </p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div>
                    <Zap className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-sm text-gray-400">+{combo.tokens}</p>
                  </div>
                  <div>
                    <FileText className="w-5 h-5 text-primary mx-auto mb-1" />
                    <p className="text-sm text-gray-400">+{combo.files}</p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-primary">
                  R$ {combo.price}
                </p>
                <p className="text-xs text-gray-400 mt-1">/mês</p>
              </div>
              {selectedPlan === combo.id && (
                <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">Selecionado</span>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Payment Method */}
      {selectedPlan && (
        <div className="border-t border-border pt-6">
          <h4 className="text-sm font-medium text-white mb-4">
            Método de Pagamento
          </h4>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => setPaymentMethod('stripe')}
              className={cn(
                'flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all',
                paymentMethod === 'stripe'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-gray-600'
              )}
            >
              <CreditCard className="w-5 h-5" />
              <span className="font-medium">Cartão de Crédito</span>
            </button>
            <button
              onClick={() => setPaymentMethod('pix')}
              className={cn(
                'flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all',
                paymentMethod === 'pix'
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-gray-600'
              )}
            >
              <QrCode className="w-5 h-5" />
              <span className="font-medium">PIX</span>
            </button>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handlePurchase} glow className="flex-1">
              Finalizar Compra
            </Button>
          </div>
        </div>
      )}
    </Modal>
  )
}
