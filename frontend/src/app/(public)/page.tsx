import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <Container>
          <div className="text-center space-y-6">
            <Badge variant="success">Fase 1 Concluída ✓</Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="text-gradient glow-text">
                Vendra SaaS
              </span>
            </h1>
            <p className="text-xl text-[var(--foreground)]/70 max-w-2xl mx-auto">
              Plataforma de Atendimento Inteligente via WhatsApp e WebChat
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" glow>
                Começar Agora
              </Button>
              <Button size="lg" variant="secondary">
                Ver Demonstração
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Design System <span className="text-gradient">Neon</span>
            </h2>
            <p className="text-[var(--foreground)]/70">
              Componentes base configurados e prontos para uso
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card glow>
              <CardHeader>
                <CardTitle>Botões</CardTitle>
                <CardDescription>
                  Variantes primary, secondary, outline e ghost
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full">Primary</Button>
                <Button variant="secondary" className="w-full">Secondary</Button>
                <Button variant="outline" className="w-full">Outline</Button>
              </CardContent>
            </Card>

            <Card glow>
              <CardHeader>
                <CardTitle>Cards</CardTitle>
                <CardDescription>
                  Com efeito glow e hover
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--foreground)]/70">
                  Cards responsivos com tema dark e efeitos neon animados
                </p>
              </CardContent>
            </Card>

            <Card glow>
              <CardHeader>
                <CardTitle>Badges</CardTitle>
                <CardDescription>
                  Status visuais coloridos
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge variant="success">Sucesso</Badge>
                <Badge variant="warning">Atenção</Badge>
                <Badge variant="danger">Erro</Badge>
                <Badge variant="info">Info</Badge>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20">
        <Container>
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Stack Tecnológica</CardTitle>
              <CardDescription>
                Tecnologias modernas e performáticas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge>Next.js 14</Badge>
                <Badge>TypeScript</Badge>
                <Badge>Tailwind CSS v4</Badge>
                <Badge>Framer Motion</Badge>
                <Badge>tsParticles</Badge>
                <Badge>Lucide Icons</Badge>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[var(--border)]">
        <Container>
          <div className="text-center text-sm text-[var(--foreground)]/50">
            <p>© 2025 Vendra SaaS. Todos os direitos reservados.</p>
            <p className="mt-2">
              Desenvolvido com <span className="text-[var(--primary)]">♥</span> e muito{' '}
              <span className="text-[var(--primary)]">☕</span>
            </p>
          </div>
        </Container>
      </footer>
    </main>
  )
}
