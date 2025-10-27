'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Megaphone,
  ShoppingCart,
  Stethoscope,
  GraduationCap,
  Home,
  Wrench,
} from 'lucide-react'

const audiences = [
  {
    icon: Megaphone,
    title: 'Agências de Marketing',
    description: 'Gerencie múltiplos clientes com painéis isolados e relatórios personalizados.',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    description: 'Atendimento 24/7 automatizado, catálogo de produtos e finalização de vendas.',
  },
  {
    icon: Stethoscope,
    title: 'Consultórios Médicos',
    description: 'Agendamentos, lembretes de consultas e dúvidas frequentes respondidas.',
  },
  {
    icon: GraduationCap,
    title: 'Escolas e Cursos',
    description: 'Matrículas, suporte a alunos e envio de materiais educacionais.',
  },
  {
    icon: Home,
    title: 'Imobiliárias',
    description: 'Qualificação de leads, agendamento de visitas e envio de portfólios.',
  },
  {
    icon: Wrench,
    title: 'Prestadores de Serviços',
    description: 'Orçamentos automáticos, agendamentos e acompanhamento de solicitações.',
  },
]

export function TargetAudience() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent via-[var(--card)]/20 to-transparent">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Para Quem É a <span className="text-gradient">Vendra</span>?
          </h2>
          <p className="text-xl text-[var(--foreground)]/70 max-w-2xl mx-auto">
            Nossa plataforma é perfeita para empresas de todos os tamanhos e
            segmentos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((audience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full group hover:bg-gradient-to-br hover:from-[var(--card)] hover:to-[var(--primary)]/5 transition-all duration-300">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[var(--primary)]/20 to-[var(--primary-dark)]/20 flex items-center justify-center mb-4 group-hover:shadow-[var(--shadow-neon-soft)] transition-shadow">
                    <audience.icon className="w-7 h-7 text-[var(--primary)]" />
                  </div>
                  <CardTitle className="text-xl mb-2">{audience.title}</CardTitle>
                  <CardDescription className="text-base">
                    {audience.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
