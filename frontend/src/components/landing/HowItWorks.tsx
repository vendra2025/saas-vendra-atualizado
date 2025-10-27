'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { QrCode, Settings, Zap } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: QrCode,
    title: 'Conecte',
    description:
      'Conecte seu WhatsApp via QR Code (Evolution API) ou API oficial da Meta em menos de 2 minutos.',
    image: '📱',
  },
  {
    number: 2,
    icon: Settings,
    title: 'Configure',
    description:
      'Configure seu assistente com IA, faça upload da sua base de conhecimento e personalize as respostas.',
    image: '⚙️',
  },
  {
    number: 3,
    icon: Zap,
    title: 'Automatize',
    description:
      'Deixe a IA atender seus clientes 24/7 automaticamente. Você pode monitorar e intervir quando necessário.',
    image: '🚀',
  },
]

export function HowItWorks() {
  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Como <span className="text-gradient">Funciona</span>
          </h2>
          <p className="text-xl text-[var(--foreground)]/70 max-w-2xl mx-auto">
            Em 3 passos simples você já está com seu atendimento automatizado
          </p>
        </motion.div>

        <div className="space-y-24 relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--primary)] to-transparent hidden lg:block" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div
                className={`${
                  index % 2 === 1 ? 'lg:col-start-2 lg:text-left' : 'lg:text-right'
                }`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-black font-bold text-2xl mb-6 shadow-[var(--shadow-neon)] relative">
                  {step.number}
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-full animate-ping opacity-20" />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <step.icon className="w-8 h-8 text-[var(--primary)]" />
                  <h3 className="text-3xl font-bold">{step.title}</h3>
                </div>

                <p className="text-lg text-[var(--foreground)]/70 max-w-md">
                  {step.description}
                </p>
              </div>

              {/* Visual/Mockup */}
              <div
                className={`${
                  index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                }`}
              >
                <div className="relative">
                  <div className="aspect-square max-w-md mx-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 flex items-center justify-center text-8xl hover:scale-105 transition-transform duration-300 glow-border-soft">
                    {step.image}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
