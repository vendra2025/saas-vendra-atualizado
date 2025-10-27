'use client'

import { Container } from '@/components/ui/container'
import { Stepper } from '@/components/ui/stepper'
import { CheckoutSummary } from '@/components/checkout/CheckoutSummary'
import { Step1Selection } from '@/components/checkout/Step1Selection'
import { Step2Registration } from '@/components/checkout/Step2Registration'
import { Step3Payment } from '@/components/checkout/Step3Payment'
import { Step4Confirmation } from '@/components/checkout/Step4Confirmation'
import { useCheckout } from '@/hooks/useCheckout'
import Link from 'next/link'

const STEPS = [
  { number: 1, title: 'Seleção', description: 'Plano e add-ons' },
  { number: 2, title: 'Cadastro', description: 'Seus dados' },
  { number: 3, title: 'Pagamento', description: 'Método' },
  { number: 4, title: 'Confirmação', description: 'Concluir' },
]

export default function CheckoutPage() {
  const { currentStep } = useCheckout()

  return (
    <div className="min-h-screen py-12">
      <Container>
        {/* Logo */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center font-bold text-black shadow-[var(--shadow-neon)]">
              V
            </div>
            <span className="text-2xl font-bold text-gradient">Vendra</span>
          </Link>
        </div>

        {/* Stepper */}
        <div className="mb-12">
          <Stepper steps={STEPS} currentStep={currentStep} />
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && <Step1Selection />}
            {currentStep === 2 && <Step2Registration />}
            {currentStep === 3 && <Step3Payment />}
            {currentStep === 4 && <Step4Confirmation />}
          </div>

          {/* Summary Sidebar - Hide on confirmation step */}
          {currentStep !== 4 && (
            <div className="lg:col-span-1">
              <CheckoutSummary />
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
