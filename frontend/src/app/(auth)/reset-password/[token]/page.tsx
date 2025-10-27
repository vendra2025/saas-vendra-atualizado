'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { Eye, EyeOff, Check, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  const router = useRouter()
  const { resetPassword, isLoading } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [success, setSuccess] = useState(false)

  const handlePasswordChange = (value: string) => {
    setPassword(value)

    let strength = 0
    if (value.length >= 8) strength++
    if (/[A-Z]/.test(value)) strength++
    if (/[0-9]/.test(value)) strength++
    if (/[^A-Za-z0-9]/.test(value)) strength++
    setPasswordStrength(strength)
  }

  const getStrengthLabel = () => {
    if (passwordStrength === 0) return { text: 'Muito fraca', color: 'text-red-500' }
    if (passwordStrength === 1) return { text: 'Fraca', color: 'text-orange-500' }
    if (passwordStrength === 2) return { text: 'Média', color: 'text-yellow-500' }
    if (passwordStrength === 3) return { text: 'Forte', color: 'text-green-500' }
    return { text: 'Muito forte', color: 'text-[var(--primary)]' }
  }

  const canSubmit = () => {
    return (
      password.length >= 8 &&
      passwordStrength >= 2 &&
      password === confirmPassword
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!canSubmit()) return

    try {
      await resetPassword(params.token, password)
      setSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (err) {
      console.error(err)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--primary)]/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-[var(--primary)]" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Senha Redefinida!</h2>
          <p className="text-[var(--foreground)]/70 mb-4">
            Sua senha foi alterada com sucesso.
          </p>
          <p className="text-sm text-[var(--foreground)]/60">
            Redirecionando para o login...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center font-bold text-black text-xl shadow-[var(--shadow-neon)]">
              V
            </div>
            <span className="text-2xl font-bold text-gradient">Vendra</span>
          </Link>
          <p className="text-[var(--foreground)]/60 text-sm mt-2">
            Redefinir senha
          </p>
        </div>

        <Card className="glow-border-soft">
          <CardHeader>
            <CardTitle>Nova Senha</CardTitle>
            <CardDescription>
              Digite sua nova senha abaixo
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Nova Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
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

                {/* Password Strength */}
                {password && (
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
                    <span className={`text-sm ${getStrengthLabel().color}`}>
                      {getStrengthLabel().text}
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Digite a senha novamente"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]/50 hover:text-[var(--foreground)] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Password Match Indicator */}
                {confirmPassword && (
                  <div className="flex items-center gap-2 text-sm">
                    {password === confirmPassword ? (
                      <>
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-green-500">Senhas coincidem</span>
                      </>
                    ) : (
                      <span className="text-red-500">Senhas não coincidem</span>
                    )}
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                glow={canSubmit()}
                disabled={!canSubmit() || isLoading}
              >
                {isLoading ? 'Redefinindo...' : 'Redefinir Senha'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
