'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Accordion, AccordionItem } from '@/components/ui/accordion'

const faqs = [
  {
    question: 'O que é o Vendra SaaS?',
    answer:
      'O Vendra SaaS é uma plataforma completa de atendimento automatizado via WhatsApp e WebChat com Inteligência Artificial. Conecte seus canais, treine a IA com sua base de conhecimento e deixe seus clientes serem atendidos 24 horas por dia, 7 dias por semana.',
  },
  {
    question: 'Como funciona a cobrança?',
    answer:
      'Oferecemos um plano mensal de R$ 97 que inclui 20 arquivos, 100k tokens, 1 conexão WhatsApp e 1 WebChat. Você pode adicionar recursos extras através de add-ons opcionais conforme sua necessidade. Sem taxas ocultas ou surpresas.',
  },
  {
    question: 'Posso testar antes de assinar?',
    answer:
      'Sim! Oferecemos 14 dias de trial gratuito sem necessidade de cartão de crédito. Você terá acesso completo a todas as funcionalidades do plano base para testar a plataforma.',
  },
  {
    question: 'Quais modelos de IA são suportados?',
    answer:
      'Suportamos múltiplos modelos de IA via OpenRouter, incluindo Claude Sonnet 4.5, GPT-4o, Gemini Pro e muitos outros. Você pode escolher o modelo que melhor se adequa ao seu caso de uso através do painel administrativo.',
  },
  {
    question: 'Meu número WhatsApp pode ser bloqueado?',
    answer:
      'Implementamos diversas camadas de proteção contra bloqueios, incluindo rate limiting inteligente (máximo 60 mensagens/hora), sistema de warm-up para números novos, detecção de palavras proibidas e monitoramento de saúde em tempo real. Além disso, oferecemos conexão híbrida (Evolution API + Meta API oficial) para máxima estabilidade.',
  },
  {
    question: 'Posso conectar múltiplos números WhatsApp?',
    answer:
      'Sim! O plano base inclui 1 conexão WhatsApp, mas você pode adicionar conexões extras através de add-ons: +1 conexão por R$ 39/mês ou +5 conexões por R$ 149/mês.',
  },
  {
    question: 'Como funciona o processamento de áudio e imagem?',
    answer:
      'A IA interpreta automaticamente áudios usando reconhecimento de voz (transcription), analisa imagens usando visão computacional e processa documentos extraindo o texto. Tudo isso de forma automática para fornecer respostas contextualizadas.',
  },
  {
    question: 'Os dados são seguros?',
    answer:
      'Sim! Utilizamos criptografia end-to-end para todas as comunicações, armazenamento seguro em servidores com certificações internacionais e estamos em conformidade com a LGPD (Lei Geral de Proteção de Dados). Seus dados e dos seus clientes estão completamente protegidos.',
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer:
      'Sim, você pode cancelar sua assinatura a qualquer momento diretamente no painel de configurações. Não há multas, taxas de cancelamento ou qualquer tipo de compromisso de longo prazo. Seu acesso continuará até o fim do período pago.',
  },
  {
    question: 'Vocês oferecem suporte técnico?',
    answer:
      'Sim! Oferecemos suporte por email para todos os clientes, documentação completa com tutoriais em vídeo e uma central de ajuda com as perguntas mais frequentes. Nosso time responde em até 24 horas em dias úteis.',
  },
]

export function FAQ() {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent via-[var(--card)]/20 to-transparent">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h2>
          <p className="text-xl text-[var(--foreground)]/70">
            Tire suas dúvidas sobre a plataforma
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Accordion>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} title={faq.question}>
                {faq.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </Container>
    </section>
  )
}
