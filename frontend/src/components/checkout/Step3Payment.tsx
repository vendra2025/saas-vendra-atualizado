'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useCheckout } from '@/hooks/useCheckout'
import { CreditCard, QrCode, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Step3Payment() {
  const { data, updateData, setCurrentStep } = useCheckout()
  const [activeTab, setActiveTab] = useState<'card' | 'pix'>('card')
  const [pixCopied, setPixCopied] = useState(false)

  // Mock PIX QR Code
  const pixCode = 'CODIGO_PIX_MOCK_12345678901234567890'

  const handleCopyPixCode = () => {
    navigator.clipboard.writeText(pixCode)
    setPixCopied(true)
    setTimeout(() => setPixCopied(false), 2000)
  }

  const handleFinish = () => {
    updateData({ paymentMethod: activeTab })
    setCurrentStep(4)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Pagamento</h2>
        <p className="text-[var(--foreground)]/70">
          Escolha sua forma de pagamento preferida
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[var(--border)]">
        <button
          onClick={() => setActiveTab('card')}
          className={cn(
            'flex items-center gap-2 px-4 py-3 border-b-2 transition-colors',
            activeTab === 'card'
              ? 'border-[var(--primary)] text-[var(--primary)]'
              : 'border-transparent text-[var(--foreground)]/60 hover:text-[var(--foreground)]'
          )}
        >
          <CreditCard className="w-4 h-4" />
          Cartão de Crédito
        </button>
        <button
          onClick={() => setActiveTab('pix')}
          className={cn(
            'flex items-center gap-2 px-4 py-3 border-b-2 transition-colors',
            activeTab === 'pix'
              ? 'border-[var(--primary)] text-[var(--primary)]'
              : 'border-transparent text-[var(--foreground)]/60 hover:text-[var(--foreground)]'
          )}
        >
          <QrCode className="w-4 h-4" />
          PIX
        </button>
      </div>

      {/* Card Payment */}
      {activeTab === 'card' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Número do Cartão</Label>
            <Input
              id="cardNumber"
              type="text"
              placeholder="0000 0000 0000 0000"
              maxLength={19}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardExpiry">Validade</Label>
              <Input
                id="cardExpiry"
                type="text"
                placeholder="MM/AA"
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardCvc">CVV</Label>
              <Input
                id="cardCvc"
                type="text"
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardName">Nome no Cartão</Label>
            <Input
              id="cardName"
              type="text"
              placeholder="JOÃO SILVA"
            />
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-4">
            <p className="text-sm text-[var(--foreground)]/70">
              💳 Pagamento processado por{' '}
              <span className="font-semibold text-[var(--primary)]">Stripe</span>{' '}
              - Totalmente seguro e criptografado
            </p>
          </div>
        </div>
      )}

      {/* PIX Payment */}
      {activeTab === 'pix' && (
        <div className="space-y-6">
          <Card className="p-8">
            <div className="flex flex-col items-center space-y-6">
              {/* QR Code Placeholder */}
              <div className="w-64 h-64 bg-white rounded-lg flex items-center justify-center">
                <div className="text-center p-4">
                  <QrCode className="w-32 h-32 mx-auto text-black mb-2" />
                  <p className="text-xs text-black">Escaneie o QR Code com seu app de banco</p>
                </div>
              </div>

              {/* PIX Code */}
              <div className="w-full">
                <Label className="mb-2 block">Código PIX Copia e Cola</Label>
                <div className="flex gap-2">
                  <Input
                    value={pixCode}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    onClick={handleCopyPixCode}
                    className="flex-shrink-0"
                  >
                    {pixCopied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {pixCopied && (
                  <p className="text-sm text-[var(--primary)] mt-2">
                    ✓ Código copiado com sucesso!
                  </p>
                )}
              </div>

              {/* Instructions */}
              <div className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg p-4">
                <h4 className="font-semibold mb-2">Como pagar com PIX:</h4>
                <ol className="text-sm text-[var(--foreground)]/70 space-y-1 list-decimal list-inside">
                  <li>Abra o app do seu banco</li>
                  <li>Escolha pagar com PIX QR Code ou Copia e Cola</li>
                  <li>Escaneie o QR Code ou cole o código acima</li>
                  <li>Confirme o pagamento</li>
                  <li>Pronto! Seu acesso será liberado automaticamente</li>
                </ol>
              </div>

              {/* Status */}
              <div className="flex items-center gap-2 text-yellow-500">
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span className="text-sm">Aguardando pagamento...</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(2)}
        >
          Voltar
        </Button>
        <Button
          size="lg"
          onClick={handleFinish}
          glow
        >
          {activeTab === 'card' ? 'Finalizar Pagamento' : 'Confirmar PIX'}
        </Button>
      </div>
    </div>
  )
}
