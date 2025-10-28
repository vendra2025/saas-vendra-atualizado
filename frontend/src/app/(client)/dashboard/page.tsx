import { Container } from '@/components/ui/container'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LayoutDashboard, MessageCircle, Users, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-[var(--foreground)]/70">
          Bem-vindo de volta! Aqui está um resumo da sua conta.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glow-border-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Conversas Ativas
            </CardTitle>
            <MessageCircle className="w-4 h-4 text-[var(--primary)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-[var(--foreground)]/60">
              +2 desde ontem
            </p>
          </CardContent>
        </Card>

        <Card className="glow-border-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Contatos
            </CardTitle>
            <Users className="w-4 h-4 text-[var(--primary)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">487</div>
            <p className="text-xs text-[var(--foreground)]/60">
              +23 este mês
            </p>
          </CardContent>
        </Card>

        <Card className="glow-border-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Resposta
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-[var(--primary)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-[var(--foreground)]/60">
              +5% vs. semana passada
            </p>
          </CardContent>
        </Card>

        <Card className="glow-border-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Tokens Usados
            </CardTitle>
            <LayoutDashboard className="w-4 h-4 text-[var(--primary)]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45k</div>
            <p className="text-xs text-[var(--foreground)]/60">
              55k restantes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Status WhatsApp */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Status WhatsApp
              <Badge variant="success">Conectado</Badge>
            </CardTitle>
            <CardDescription>
              Sua conexão WhatsApp está ativa e funcionando
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--foreground)]/70">Número</span>
              <span className="font-medium">(11) 99999-9999</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--foreground)]/70">
                Última sincronização
              </span>
              <span className="font-medium">há 5 minutos</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--foreground)]/70">Método</span>
              <span className="font-medium">Evolution API (QR Code)</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Acesse as funcionalidades mais usadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all">
              <MessageCircle className="w-4 h-4 text-[var(--primary)]" />
              <div className="text-left">
                <div className="font-medium text-sm">Ver Conversas</div>
                <div className="text-xs text-[var(--foreground)]/60">
                  3 aguardando resposta
                </div>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all">
              <Users className="w-4 h-4 text-[var(--primary)]" />
              <div className="text-left">
                <div className="font-medium text-sm">Gerenciar Contatos</div>
                <div className="text-xs text-[var(--foreground)]/60">
                  487 contatos cadastrados
                </div>
              </div>
            </button>

            <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 transition-all">
              <LayoutDashboard className="w-4 h-4 text-[var(--primary)]" />
              <div className="text-left">
                <div className="font-medium text-sm">Configurar Assistente</div>
                <div className="text-xs text-[var(--foreground)]/60">
                  Personalize as respostas
                </div>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Notice */}
      <Card className="border-[var(--primary)]/20 bg-[var(--primary)]/5">
        <CardContent className="py-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gradient mb-2">
              🚀 Em Desenvolvimento
            </div>
            <p className="text-[var(--foreground)]/70">
              Este é um preview do dashboard. As funcionalidades completas serão
              implementadas nas próximas fases.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
