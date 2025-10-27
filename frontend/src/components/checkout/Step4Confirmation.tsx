'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCheckout } from '@/hooks/useCheckout'
import { CheckCircle, Mail, User, CreditCard } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'

export function Step4Confirmation() {
  const { data, getTotalPrice } = useCheckout()

  useEffect(() => {
    // Confetti animation or success animation
    // Future: Send confirmation email, create account, etc.
  }, [])

  return (
    <div className="space-y-8">
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-[var(--primary)]" />
          </div>
          <div className="absolute inset-0 bg-[var(--primary)] rounded-full animate-ping opacity-20" />
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gradient">
          Pagamento Confirmado! 🎉
        </h2>
        <p className="text-lg text-[var(--foreground)]/70">
          Sua conta foi criada com sucesso. Bem-vindo à Vendra!
        </p>
      </div>

      {/* Account Details */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Detalhes da Conta</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
              <User className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <div className="text-sm text-[var(--foreground)]/60">Nome</div>
              <div className="font-medium">{data.name}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <div className="text-sm text-[var(--foreground)]/60">Email</div>
              <div className="font-medium">{data.email}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-[var(--primary)]" />
            </div>
            <div>
              <div className="text-sm text-[var(--foreground)]/60">Plano</div>
              <div className="font-medium">
                Plano Base + {data.selectedAddons.length} add-ons
              </div>
              <div className="text-sm text-[var(--primary)]">
                {formatCurrency(getTotalPrice())}/mês
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <Card className="p-6 bg-gradient-to-br from-[var(--card)] to-[var(--primary)]/5">
        <h3 className="font-semibold text-lg mb-4">Próximos Passos</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-black">1</span>
            </div>
            <div>
              <div className="font-medium">Verifique seu email</div>
              <div className="text-sm text-[var(--foreground)]/70">
                Enviamos um email de confirmação para {data.email}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-black">2</span>
            </div>
            <div>
              <div className="font-medium">Acesse o painel</div>
              <div className="text-sm text-[var(--foreground)]/70">
                Faça login e comece a configurar seu assistente
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[var(--primary)] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-black">3</span>
            </div>
            <div>
              <div className="font-medium">Conecte seu WhatsApp</div>
              <div className="text-sm text-[var(--foreground)]/70">
                Em segundos você estará pronto para atender
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/login">
          <Button size="lg" glow className="w-full sm:w-auto">
            Acessar Painel
          </Button>
        </Link>
        <Link href="/">
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            Voltar ao Início
          </Button>
        </Link>
      </div>

      {/* Additional Info */}
      <div className="text-center text-sm text-[var(--foreground)]/60">
        <p>
          Precisa de ajuda?{' '}
          <a href="mailto:contato@vendra.com" className="text-[var(--primary)] hover:underline">
            Entre em contato
          </a>
        </p>
      </div>
    </div>
  )
}
