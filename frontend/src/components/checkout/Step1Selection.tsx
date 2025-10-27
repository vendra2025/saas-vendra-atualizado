'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Plus, X } from 'lucide-react'
import { useCheckout, type Addon } from '@/hooks/useCheckout'
import { cn } from '@/lib/utils'

const AVAILABLE_ADDONS = {
  files: [
    { id: 'files-50', amount: '+50', price: 19 },
    { id: 'files-100', amount: '+100', price: 29 },
    { id: 'files-500', amount: '+500', price: 79 },
  ],
  tokens: [
    { id: 'tokens-500k', amount: '+500k', price: 29 },
    { id: 'tokens-1m', amount: '+1M', price: 49 },
    { id: 'tokens-5m', amount: '+5M', price: 199 },
  ],
  whatsapp: [
    { id: 'whatsapp-1', amount: '+1 conexão', price: 39 },
    { id: 'whatsapp-5', amount: '+5 conexões', price: 149 },
  ],
  webchat: [
    { id: 'webchat-1', amount: '+1', price: 19 },
    { id: 'webchat-3', amount: '+3', price: 49 },
  ],
}

export function Step1Selection() {
  const { data, addAddon, removeAddon, setCurrentStep } = useCheckout()

  const isAddonSelected = (addonId: string) => {
    return data.selectedAddons.some((addon) => addon.id === addonId)
  }

  const toggleAddon = (category: keyof typeof AVAILABLE_ADDONS, addon: { id: string; amount: string; price: number }) => {
    if (isAddonSelected(addon.id)) {
      removeAddon(addon.id)
    } else {
      addAddon({ ...addon, category })
    }
  }

  return (
    <div className="space-y-8">
      {/* Base Plan */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Plano Base</h2>
        <Card className="border-2 border-[var(--primary)] glow-border relative">
          <div className="absolute top-4 right-4">
            <Badge variant="success">Incluído</Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-3xl flex items-end gap-2">
              <span className="text-gradient">R$ 97</span>
              <span className="text-lg text-[var(--foreground)]/70 font-normal">/mês</span>
            </CardTitle>
            <CardDescription className="text-base">
              Acesso completo à plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[
                '20 arquivos incluídos',
                '100.000 tokens/mês',
                '1 conexão WhatsApp',
                '1 WebChat customizado',
                'Base de conhecimento ilimitada',
                'IA com múltiplos modelos',
                'Processamento de mídia',
                'Relatórios completos',
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-[var(--foreground)]/80">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Add-ons */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Add-ons Opcionais</h2>
        <p className="text-[var(--foreground)]/70 mb-6">
          Selecione recursos adicionais conforme sua necessidade
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Files */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
              Arquivos
            </h3>
            <div className="space-y-2">
              {AVAILABLE_ADDONS.files.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon('files', addon)}
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-lg border transition-all',
                    isAddonSelected(addon.id)
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                      : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-5 h-5 rounded border-2 flex items-center justify-center',
                        isAddonSelected(addon.id)
                          ? 'border-[var(--primary)] bg-[var(--primary)]'
                          : 'border-[var(--border)]'
                      )}
                    >
                      {isAddonSelected(addon.id) && (
                        <Check className="w-3 h-3 text-black" />
                      )}
                    </div>
                    <span>{addon.amount} arquivos</span>
                  </div>
                  <span className="font-semibold text-[var(--primary)]">
                    R$ {addon.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tokens */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
              Tokens
            </h3>
            <div className="space-y-2">
              {AVAILABLE_ADDONS.tokens.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon('tokens', addon)}
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-lg border transition-all',
                    isAddonSelected(addon.id)
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                      : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-5 h-5 rounded border-2 flex items-center justify-center',
                        isAddonSelected(addon.id)
                          ? 'border-[var(--primary)] bg-[var(--primary)]'
                          : 'border-[var(--border)]'
                      )}
                    >
                      {isAddonSelected(addon.id) && (
                        <Check className="w-3 h-3 text-black" />
                      )}
                    </div>
                    <span>{addon.amount} tokens</span>
                  </div>
                  <span className="font-semibold text-[var(--primary)]">
                    R$ {addon.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* WhatsApp */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
              WhatsApp
            </h3>
            <div className="space-y-2">
              {AVAILABLE_ADDONS.whatsapp.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon('whatsapp', addon)}
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-lg border transition-all',
                    isAddonSelected(addon.id)
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                      : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-5 h-5 rounded border-2 flex items-center justify-center',
                        isAddonSelected(addon.id)
                          ? 'border-[var(--primary)] bg-[var(--primary)]'
                          : 'border-[var(--border)]'
                      )}
                    >
                      {isAddonSelected(addon.id) && (
                        <Check className="w-3 h-3 text-black" />
                      )}
                    </div>
                    <span>{addon.amount}</span>
                  </div>
                  <span className="font-semibold text-[var(--primary)]">
                    R$ {addon.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* WebChat */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--primary)]" />
              WebChat
            </h3>
            <div className="space-y-2">
              {AVAILABLE_ADDONS.webchat.map((addon) => (
                <button
                  key={addon.id}
                  onClick={() => toggleAddon('webchat', addon)}
                  className={cn(
                    'w-full flex items-center justify-between p-3 rounded-lg border transition-all',
                    isAddonSelected(addon.id)
                      ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                      : 'border-[var(--border)] hover:border-[var(--primary)]/50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-5 h-5 rounded border-2 flex items-center justify-center',
                        isAddonSelected(addon.id)
                          ? 'border-[var(--primary)] bg-[var(--primary)]'
                          : 'border-[var(--border)]'
                      )}
                    >
                      {isAddonSelected(addon.id) && (
                        <Check className="w-3 h-3 text-black" />
                      )}
                    </div>
                    <span>{addon.amount} WebChat</span>
                  </div>
                  <span className="font-semibold text-[var(--primary)]">
                    R$ {addon.price}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex justify-end pt-4">
        <Button size="lg" onClick={() => setCurrentStep(2)} glow>
          Continuar para Cadastro
        </Button>
      </div>
    </div>
  )
}
