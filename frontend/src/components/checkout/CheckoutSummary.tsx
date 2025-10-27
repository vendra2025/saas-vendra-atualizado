'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCheckout } from '@/hooks/useCheckout'
import { formatCurrency } from '@/lib/utils'
import { Check, X } from 'lucide-react'

export function CheckoutSummary() {
  const { data, removeAddon, getTotalPrice } = useCheckout()

  const basePlanPrice = 97

  return (
    <div className="sticky top-6">
      <Card className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Resumo do Pedido</h3>

          {/* Base Plan */}
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium">Plano Base</div>
                <ul className="text-xs text-[var(--foreground)]/60 mt-1 space-y-0.5">
                  <li>• 20 arquivos</li>
                  <li>• 100k tokens</li>
                  <li>• 1 WhatsApp</li>
                  <li>• 1 WebChat</li>
                </ul>
              </div>
              <div className="font-semibold">{formatCurrency(basePlanPrice)}</div>
            </div>
          </div>

          {/* Divider */}
          {data.selectedAddons.length > 0 && (
            <div className="border-t border-[var(--border)] my-4" />
          )}

          {/* Add-ons */}
          {data.selectedAddons.length > 0 && (
            <div className="space-y-3">
              <div className="text-sm font-medium text-[var(--foreground)]/70">
                Add-ons Selecionados
              </div>
              {data.selectedAddons.map((addon) => (
                <div key={addon.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-2 flex-1">
                    <button
                      onClick={() => removeAddon(addon.id)}
                      className="w-5 h-5 rounded-full border border-[var(--border)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:border-red-500 hover:bg-red-500/10"
                    >
                      <X className="w-3 h-3 text-red-500" />
                    </button>
                    <div className="text-sm">
                      <Badge variant="default" className="mr-2 capitalize">
                        {addon.category}
                      </Badge>
                      {addon.amount}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    +{formatCurrency(addon.price)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-[var(--border)] my-4" />

          {/* Total */}
          <div className="flex items-center justify-between text-lg font-bold">
            <div>Total/mês</div>
            <div className="text-gradient">{formatCurrency(getTotalPrice())}</div>
          </div>

          {/* Trial Badge */}
          <div className="bg-[var(--primary)]/10 border border-[var(--primary)]/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <div className="font-semibold text-[var(--primary)]">
                  14 dias grátis
                </div>
                <div className="text-xs text-[var(--foreground)]/70">
                  Teste sem compromisso. Cancele quando quiser.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Included */}
        <div className="border-t border-[var(--border)] pt-4">
          <div className="text-sm font-medium mb-3">Incluído no plano:</div>
          <ul className="space-y-2 text-sm text-[var(--foreground)]/70">
            {[
              'Base de conhecimento ilimitada',
              'Múltiplos modelos de IA',
              'Processamento de mídia',
              'Relatórios completos',
              'Suporte por email',
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="w-3 h-3 text-[var(--primary)]" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  )
}
