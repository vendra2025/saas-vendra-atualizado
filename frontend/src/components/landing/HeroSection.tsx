'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BackgroundParticles } from './BackgroundParticles'
import { StatsCounter } from './StatsCounter'
import { ArrowRight, Play } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background Particles */}
      <BackgroundParticles />

      {/* Content */}
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge variant="success" className="mb-4">
                🚀 Atendimento Inteligente 24/7
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              Automatize seu{' '}
              <span className="text-gradient glow-text">atendimento</span> com
              IA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-[var(--foreground)]/70 max-w-xl"
            >
              Conecte seu WhatsApp e WebChat, treine a IA com sua base de
              conhecimento e deixe seus clientes serem atendidos 24 horas por
              dia, 7 dias por semana.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" glow className="group">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="secondary" className="group">
                <Play className="mr-2 h-5 w-5" />
                Ver Demonstração
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 text-sm text-[var(--foreground)]/60"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-[var(--card)] border-2 border-[var(--background)] flex items-center justify-center"
                  >
                    👤
                  </div>
                ))}
              </div>
              <span>Mais de 2.300 empresas confiam na Vendra</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Mockup/Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-full blur-3xl opacity-20 animate-pulse-slow" />

              {/* Mockup Placeholder */}
              <div className="relative z-10 bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 shadow-2xl glow-border">
                <div className="space-y-4">
                  {/* Chat Messages Mockup */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                      👤
                    </div>
                    <div className="flex-1 bg-[var(--background)] rounded-2xl p-4">
                      <p className="text-sm">
                        Olá! Gostaria de saber sobre os preços
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 flex-row-reverse">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)] flex items-center justify-center">
                      🤖
                    </div>
                    <div className="flex-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-2xl p-4">
                      <p className="text-sm text-black font-medium">
                        Claro! Nosso plano base custa R$ 97/mês e inclui 20
                        arquivos, 100k tokens...
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                      👤
                    </div>
                    <div className="flex-1 bg-[var(--background)] rounded-2xl p-4">
                      <p className="text-sm">Perfeito! Como faço para começar?</p>
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  <div className="flex items-center gap-2 text-[var(--primary)]">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
                      <div
                        className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"
                        style={{ animationDelay: '0.2s' }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse"
                        style={{ animationDelay: '0.4s' }}
                      />
                    </div>
                    <span className="text-xs">IA está digitando...</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Counter */}
        <StatsCounter />
      </Container>
    </section>
  )
}
