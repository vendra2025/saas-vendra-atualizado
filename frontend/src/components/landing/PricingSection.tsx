'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Sparkles } from 'lucide-react'

const planFeatures = [
  '20 arquivos incluídos',
  '100.000 tokens/mês',
  '1 conexão WhatsApp',
  '1 WebChat customizado',
  'Base de conhecimento ilimitada',
  'IA com múltiplos modelos',
  'Processamento de áudio e imagem',
  'Relatórios completos',
  'Suporte por email',
]

const addons = [
  {
    category: 'Arquivos',
    options: [
      { amount: '+50', price: 'R$ 19' },
      { amount: '+100', price: 'R$ 29' },
      { amount: '+500', price: 'R$ 79' },
    ],
  },
  {
    category: 'Tokens',
    options: [
      { amount: '+500k', price: 'R$ 29' },
      { amount: '+1M', price: 'R$ 49' },
      { amount: '+5M', price: 'R$ 199' },
    ],
  },
  {
    category: 'WhatsApp',
    options: [
      { amount: '+1 conexão', price: 'R$ 39' },
      { amount: '+5 conexões', price: 'R$ 149' },
    ],
  },
  {
    category: 'WebChat',
    options: [
      { amount: '+1', price: 'R$ 19' },
      { amount: '+3', price: 'R$ 49' },
    ],
  },
]

export function PricingSection() {
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
            Preço <span className="text-gradient">Simples</span> e Transparente
          </h2>
          <p className="text-xl text-[var(--foreground)]/70 max-w-2xl mx-auto">
            Um plano completo com tudo incluso. Adicione recursos conforme sua
            necessidade.
          </p>
        </motion.div>

        {/* Main Plan */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <Card className="relative overflow-hidden glow-border-strong">
            {/* Badge */}
            <div className="absolute top-6 right-6">
              <Badge variant="success" className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Mais Popular
              </Badge>
            </div>

            <CardHeader className="text-center pt-12">
              <CardTitle className="text-4xl mb-4">Plano Base</CardTitle>
              <div className="flex items-end justify-center gap-2">
                <span className="text-6xl font-bold text-gradient">R$ 97</span>
                <span className="text-2xl text-[var(--foreground)]/70 mb-2">/mês</span>
              </div>
              <CardDescription className="text-base mt-4">
                Acesso completo à plataforma com recursos profissionais
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-8">
              <ul className="space-y-4">
                {planFeatures.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[var(--primary)]" />
                    </div>
                    <span className="text-[var(--foreground)]/80">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-8">
              <Button size="lg" className="w-full" glow>
                Começar Agora - 14 dias grátis
              </Button>
              <p className="text-sm text-[var(--foreground)]/60 text-center">
                Sem cartão de crédito. Cancele quando quiser.
              </p>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold mb-4">
            Add-ons <span className="text-gradient">Opcionais</span>
          </h3>
          <p className="text-lg text-[var(--foreground)]/70">
            Expanda seus recursos conforme sua necessidade
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {addons.map((addon, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className="h-full hover:scale-105 transition-transform duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-center">
                    {addon.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {addon.options.map((option, optIndex) => (
                      <li
                        key={optIndex}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-[var(--foreground)]/70">
                          {option.amount}
                        </span>
                        <span className="font-semibold text-[var(--primary)]">
                          {option.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
