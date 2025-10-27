'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  MessageCircle,
  Brain,
  Zap,
  FileAudio,
  BookOpen,
  BarChart3,
} from 'lucide-react'

const features = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Integrado',
    description:
      'Conecte via QR Code (Evolution API) ou API oficial da Meta. Sistema híbrido para máxima estabilidade.',
  },
  {
    icon: Brain,
    title: 'IA Avançada',
    description:
      'Múltiplos modelos via OpenRouter: Claude Sonnet 4.5, GPT-4o, Gemini Pro e mais.',
  },
  {
    icon: Zap,
    title: 'Multi-canal',
    description:
      'WhatsApp, WebChat e mais canais integrados em uma única plataforma.',
  },
  {
    icon: FileAudio,
    title: 'Processamento de Mídia',
    description:
      'Interprete e responda a áudios, imagens, vídeos e documentos automaticamente.',
  },
  {
    icon: BookOpen,
    title: 'Base de Conhecimento',
    description:
      'Treine a IA com seus documentos, URLs e FAQs. Base ilimitada incluída.',
  },
  {
    icon: BarChart3,
    title: 'Relatórios Detalhados',
    description:
      'Métricas em tempo real, análise de sentimento e insights acionáveis.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function FeaturesGrid() {
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
            Funcionalidades <span className="text-gradient">Poderosas</span>
          </h2>
          <p className="text-xl text-[var(--foreground)]/70 max-w-2xl mx-auto">
            Tudo que você precisa para automatizar e escalar seu atendimento ao
            cliente
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                glow
                className="h-full group hover:scale-105 transition-all duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center mb-4 group-hover:shadow-[var(--shadow-neon)] transition-shadow">
                    <feature.icon className="w-6 h-6 text-black" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
