# 📋 PROPOSTA - FASE 2: LANDING PAGE

## ⏱️ Tempo Estimado: 5 dias

---

## 🎯 OBJETIVO

Criar uma landing page completa com design neon premium, incluindo:
- Hero Section com partículas animadas
- Features Grid (6 funcionalidades principais)
- Seção "Para Quem É" (público-alvo)
- Seção "Como Funciona" (3 steps)
- Pricing (plano base + add-ons)
- FAQ (8-10 perguntas frequentes)
- Footer completo

---

## 📦 O QUE SERÁ FEITO

### 2.1 Hero Section com Partículas

**Componentes:**
```
components/landing/HeroSection.tsx
components/landing/BackgroundParticles.tsx
components/landing/StatsCounter.tsx
```

**Conteúdo:**
- Background animado com tsParticles (efeito matrix/tecnológico)
- Headline principal com gradiente neon
- Subheadline explicativa
- 2 CTAs principais (Começar Agora + Ver Demonstração)
- Mockup/imagem lado direito (mulher com celular)
- Cards de estatísticas animados:
  - 2300+ clientes ativos
  - 115+ empresas
  - 98% satisfação
  - 24/7 suporte

**Animações:**
- Fade in + slide up ao carregar
- Counter animado nos números
- Pulse no CTA principal
- Float na imagem

---

### 2.2 Features Grid (6 Cards)

**Componente:**
```
components/landing/FeaturesGrid.tsx
```

**Features:**
1. **WhatsApp Integrado**
   - Ícone: MessageCircle
   - Descrição: Conecte via QR Code ou API oficial

2. **IA Avançada**
   - Ícone: Brain
   - Descrição: Múltiplos modelos (Claude, GPT, Gemini)

3. **Multi-canal**
   - Ícone: Zap
   - Descrição: WhatsApp + WebChat integrados

4. **Processamento de Mídia**
   - Ícone: FileAudio
   - Descrição: Áudio, imagem, vídeo e documentos

5. **Base de Conhecimento**
   - Ícone: BookOpen
   - Descrição: Treine com seus próprios dados

6. **Relatórios Detalhados**
   - Ícone: BarChart3
   - Descrição: Métricas em tempo real

**Efeitos:**
- Grid 3x2 (responsivo para 1 coluna em mobile)
- Hover: border glow + scale 1.05
- Animação stagger (cards aparecem em sequência)

---

### 2.3 Seção "Para Quem É"

**Componente:**
```
components/landing/TargetAudience.tsx
```

**Público-alvo (6 cards):**
1. **Agências de Marketing**
   - Ícone: Megaphone
   - Descrição: Gerencie múltiplos clientes

2. **E-commerce**
   - Ícone: ShoppingCart
   - Descrição: Atendimento 24/7 automatizado

3. **Consultórios Médicos**
   - Ícone: Stethoscope
   - Descrição: Agendamentos e lembretes

4. **Escolas e Cursos**
   - Ícone: GraduationCap
   - Descrição: Matrículas e suporte a alunos

5. **Imobiliárias**
   - Ícone: Home
   - Descrição: Qualificação de leads

6. **Prestadores de Serviços**
   - Ícone: Wrench
   - Descrição: Orçamentos e agendamentos

**Layout:**
- Grid 3x2 (responsivo)
- Cards com background gradient sutil
- Hover effect: glow no ícone

---

### 2.4 Seção "Como Funciona"

**Componente:**
```
components/landing/HowItWorks.tsx
```

**Steps (3 etapas):**

**Step 1: Conecte**
- Número: 1 (em círculo com glow)
- Descrição: Conecte seu WhatsApp via QR Code ou API oficial
- Imagem: QR Code mockup

**Step 2: Configure**
- Número: 2
- Descrição: Configure seu assistente com IA e base de conhecimento
- Imagem: Dashboard mockup

**Step 3: Automatize**
- Número: 3
- Descrição: Deixe a IA atender seus clientes 24/7
- Imagem: Chat mockup

**Layout:**
- Layout alternado (imagem esquerda/direita)
- Linha vertical conectando os steps (gradient neon)
- Animação: steps aparecem ao rolar a página

---

### 2.5 Pricing (Plano + Add-ons)

**Componente:**
```
components/landing/PricingSection.tsx
components/landing/PricingCard.tsx
components/landing/AddonsGrid.tsx
```

**Plano Base: R$ 97/mês**
- Card destacado (glow mais forte)
- Lista de features:
  - ✓ 20 arquivos
  - ✓ 100k tokens
  - ✓ 1 conexão WhatsApp
  - ✓ 1 WebChat
  - ✓ Base de conhecimento ilimitada
  - ✓ Relatórios completos
  - ✓ Suporte por email
- CTA: "Começar Agora" (botão glow)

**Add-ons (grid 2x2):**

1. **+ Arquivos**
   - +50 por R$ 19/mês
   - +100 por R$ 29/mês
   - +500 por R$ 79/mês

2. **+ Tokens**
   - +500k por R$ 29/mês
   - +1M por R$ 49/mês
   - +5M por R$ 199/mês

3. **+ WhatsApp**
   - +1 conexão por R$ 39/mês
   - +5 conexões por R$ 149/mês

4. **+ WebChat**
   - +1 por R$ 19/mês
   - +3 por R$ 49/mês

**Layout:**
- Card plano base centralizado e destacado
- Grid add-ons abaixo (4 cards)
- Hover: scale e glow
- Badge "Mais Popular" no plano base

---

### 2.6 FAQ (Accordion)

**Componente:**
```
components/landing/FAQ.tsx
components/ui/accordion.tsx (criar)
```

**Perguntas (10):**

1. **O que é o Vendra SaaS?**
   - Resposta: Plataforma de atendimento automatizado via WhatsApp e WebChat com IA

2. **Como funciona a cobrança?**
   - Resposta: Plano mensal de R$ 97 + add-ons opcionais

3. **Posso testar antes de assinar?**
   - Resposta: Sim, oferecemos 14 dias de trial gratuito

4. **Quais modelos de IA são suportados?**
   - Resposta: Claude Sonnet, GPT-4o, Gemini Pro e mais via OpenRouter

5. **Meu número WhatsApp pode ser bloqueado?**
   - Resposta: Implementamos rate limiting e boas práticas para evitar bloqueios

6. **Posso conectar múltiplos números?**
   - Resposta: Sim, você pode adicionar conexões extras via add-ons

7. **Como funciona o processamento de áudio e imagem?**
   - Resposta: A IA interpreta automaticamente usando reconhecimento de voz e visão

8. **Os dados são seguros?**
   - Resposta: Sim, criptografia end-to-end e conformidade com LGPD

9. **Posso cancelar a qualquer momento?**
   - Resposta: Sim, sem multas ou taxas de cancelamento

10. **Vocês oferecem suporte técnico?**
    - Resposta: Sim, suporte por email e documentação completa

**Layout:**
- Accordion com ícones + / -
- Animação suave ao expandir/colapsar
- Hover: background change

---

### 2.7 Footer Completo

**Componente:**
```
components/landing/Footer.tsx
```

**Seções:**

**Coluna 1: Logo + Descrição**
- Logo Vendra (com glow)
- Tagline: "Atendimento inteligente via WhatsApp e WebChat"

**Coluna 2: Produto**
- Funcionalidades
- Preços
- Integrações
- Casos de Uso

**Coluna 3: Empresa**
- Sobre Nós
- Blog
- Carreiras
- Contato

**Coluna 4: Legal**
- Termos de Uso
- Política de Privacidade
- LGPD
- Cookies

**Coluna 5: Contato**
- Email: contato@vendra.com
- WhatsApp: (11) 99999-9999
- Endereço: São Paulo, SP

**Social:**
- Links: Instagram, LinkedIn, YouTube, Twitter
- Ícones com hover glow

**Copyright:**
- © 2025 Vendra SaaS. Todos os direitos reservados.
- "Desenvolvido com ❤️ e muito ☕"

---

## 📂 ARQUIVOS QUE SERÃO CRIADOS

**Componentes Landing (9 arquivos):**
1. `components/landing/HeroSection.tsx`
2. `components/landing/BackgroundParticles.tsx`
3. `components/landing/StatsCounter.tsx`
4. `components/landing/FeaturesGrid.tsx`
5. `components/landing/TargetAudience.tsx`
6. `components/landing/HowItWorks.tsx`
7. `components/landing/PricingSection.tsx`
8. `components/landing/FAQ.tsx`
9. `components/landing/Footer.tsx`

**Componentes UI Adicionais (1 arquivo):**
10. `components/ui/accordion.tsx`

**Atualização:**
11. `app/(public)/page.tsx` (atualizar com todas as seções)

**Total**: 11 arquivos

---

## ✅ CRITÉRIOS DE ACEITE

Ao final da Fase 2, teremos:

- ✅ Landing page completa e responsiva
- ✅ Todas as 7 seções implementadas
- ✅ Animações suaves (Framer Motion)
- ✅ Partículas animadas no hero (tsParticles)
- ✅ Design neon consistente
- ✅ Mobile-first (responsivo)
- ✅ Performance otimizada
- ✅ SEO básico (meta tags)
- ✅ Acessibilidade (ARIA labels)
- ✅ Build sem erros

---

## 🎨 REFERÊNCIAS DE DESIGN

**Inspirações:**
- Vercel (animações suaves)
- Stripe (clareza e simplicidade)
- Linear (design minimalista dark)
- Framer (efeitos premium)

**Paleta de Cores (já definida):**
- Primary: #00FF88 (Verde Neon)
- Background: #0A0E14
- Card: #151922
- Border: #1F2937

**Tipografia:**
- Headings: Bold, grande, com glow
- Body: Regular, legível
- Hierarchy clara (h1 > h2 > h3 > p)

---

## 🚀 PRÓXIMA FASE

Após conclusão da Fase 2, partiremos para:

**Fase 3: Sistema de Checkout** (3 dias)
- Multi-step checkout
- Integração Stripe
- PIX
- Cadastro de cliente

---

## ❓ DÚVIDAS/APROVAÇÃO

Antes de começar, preciso confirmar:

1. ✅ **Aprovado para prosseguir com a Fase 2?**
2. ❓ Algum ajuste no conteúdo das seções?
3. ❓ Deseja adicionar ou remover alguma feature da lista?
4. ❓ Prefere algum estilo diferente de animação?

---

## 💬 COMO FUNCIONA O PROCESSO

Após sua aprovação:

1. ✅ Criarei todos os componentes da landing page
2. 📝 Atualizarei o `DEVELOPMENT_LOG.md` com o progresso
3. 🎯 Marcarei a Fase 2 como concluída no `ROADMAP.md`
4. 📋 Apresentarei a **Proposta da Fase 3** para nova aprovação
5. 🔄 Repetiremos o ciclo até completar todas as 65 fases

---

**⏳ Aguardando sua aprovação para iniciar a Fase 2...**

Digite **"APROVADO"** ou **"COMEÇAR FASE 2"** para prosseguir.

Ou solicite modificações caso deseje algum ajuste antes de iniciar.

---

*Data: 2025-10-27*
*Fase: 2/65*
*Tempo estimado: 5 dias*
*Progresso atual: 1.5% (1/65 fases concluídas)*
