'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCheckout } from '@/hooks/useCheckout'
import { Eye, EyeOff, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Step2Registration() {
  const { data, updateData, setCurrentStep } = useCheckout()
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const handleChange = (field: string, value: string) => {
    updateData({ [field]: value })

    // Update password strength
    if (field === 'password') {
      let strength = 0
      if (value.length >= 8) strength++
      if (/[A-Z]/.test(value)) strength++
      if (/[0-9]/.test(value)) strength++
      if (/[^A-Za-z0-9]/.test(value)) strength++
      setPasswordStrength(strength)
    }
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const canContinue = () => {
    return (
      data.name.length >= 3 &&
      isValidEmail(data.email) &&
      data.phone.length >= 10 &&
      data.document.length >= 11 &&
      data.password.length >= 8 &&
      passwordStrength >= 2
    )
  }

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return { text: 'Muito fraca', color: 'text-red-500' }
    if (passwordStrength === 1) return { text: 'Fraca', color: 'text-orange-500' }
    if (passwordStrength === 2) return { text: 'Média', color: 'text-yellow-500' }
    if (passwordStrength === 3) return { text: 'Forte', color: 'text-green-500' }
    return { text: 'Muito forte', color: 'text-[var(--primary)]' }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Dados Pessoais</h2>
        <p className="text-[var(--foreground)]/70">
          Preencha seus dados para criar sua conta
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Nome Completo */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="name">Nome Completo *</Label>
          <Input
            id="name"
            type="text"
            placeholder="João Silva"
            value={data.name}
            onChange={(e) => handleChange('name', e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="joao@exemplo.com"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>

        {/* Telefone */}
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(11) 99999-9999"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            required
          />
        </div>

        {/* CPF/CNPJ */}
        <div className="space-y-2">
          <Label htmlFor="document">CPF/CNPJ *</Label>
          <Input
            id="document"
            type="text"
            placeholder="000.000.000-00"
            value={data.document}
            onChange={(e) => handleChange('document', e.target.value)}
            required
          />
        </div>

        {/* Empresa (opcional) */}
        <div className="space-y-2">
          <Label htmlFor="company">Empresa (opcional)</Label>
          <Input
            id="company"
            type="text"
            placeholder="Minha Empresa Ltda"
            value={data.company}
            onChange={(e) => handleChange('company', e.target.value)}
          />
        </div>

        {/* Senha */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="password">Senha *</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Mínimo 8 caracteres"
              value={data.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]/50 hover:text-[var(--foreground)] transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {data.password && (
            <div className="space-y-2">
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-1 flex-1 rounded-full transition-all',
                      i < passwordStrength
                        ? 'bg-[var(--primary)]'
                        : 'bg-[var(--border)]'
                    )}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={getStrengthLabel().color}>
                  {getStrengthLabel().text}
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <div
                      className={cn(
                        'w-3 h-3 rounded-full border flex items-center justify-center',
                        data.password.length >= 8
                          ? 'bg-[var(--primary)] border-[var(--primary)]'
                          : 'border-[var(--border)]'
                      )}
                    >
                      {data.password.length >= 8 && (
                        <Check className="w-2 h-2 text-black" />
                      )}
                    </div>
                    <span className="text-xs">8+ caracteres</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Terms */}
        <div className="md:col-span-2">
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1"
              required
            />
            <label htmlFor="terms" className="text-sm text-[var(--foreground)]/70">
              Eu concordo com os{' '}
              <a href="/termos" className="text-[var(--primary)] hover:underline">
                Termos de Uso
              </a>{' '}
              e{' '}
              <a href="/privacidade" className="text-[var(--primary)] hover:underline">
                Política de Privacidade
              </a>
            </label>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(1)}
        >
          Voltar
        </Button>
        <Button
          size="lg"
          onClick={() => setCurrentStep(3)}
          disabled={!canContinue()}
          glow={canContinue()}
        >
          Ir para Pagamento
        </Button>
      </div>
    </div>
  )
}
