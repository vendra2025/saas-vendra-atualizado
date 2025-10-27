'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Step {
  number: number
  title: string
  description: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300',
                  currentStep > step.number
                    ? 'bg-[var(--primary)] text-black shadow-[var(--shadow-neon)]'
                    : currentStep === step.number
                    ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-black shadow-[var(--shadow-neon)] animate-glow'
                    : 'bg-[var(--card)] border-2 border-[var(--border)] text-[var(--foreground)]/50'
                )}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <div className="mt-2 text-center hidden md:block">
                <div
                  className={cn(
                    'text-sm font-semibold',
                    currentStep >= step.number
                      ? 'text-[var(--foreground)]'
                      : 'text-[var(--foreground)]/50'
                  )}
                >
                  {step.title}
                </div>
                <div className="text-xs text-[var(--foreground)]/60">
                  {step.description}
                </div>
              </div>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-4 relative">
                <div className="absolute inset-0 bg-[var(--border)]" />
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] transition-all duration-300',
                    currentStep > step.number ? 'w-full' : 'w-0'
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
