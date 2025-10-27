# 🚀 SaaS Vendra - Plataforma de Atendimento Inteligente

> Sistema de atendimento automatizado via WhatsApp e WebChat com IA, multi-tenant, design neon premium.

## 📋 Sobre o Projeto

SaaS completo para automatização de atendimento ao cliente via WhatsApp e WebChat, com Inteligência Artificial, processamento de mídia, gestão de contatos, agendamento de mensagens, transmissões em massa, e muito mais.

### 🎯 Diferenciais

- **Design Premium**: Interface neon com efeitos glow, partículas e animações suaves
- **Multi-tenant**: Arquitetura escalável com banco compartilhado
- **Anti-bloqueio**: Sistema híbrido Evolution API + Meta API + WebChat
- **IA Flexível**: Suporte a múltiplos modelos via OpenRouter
- **Rate Limiting**: Proteção inteligente contra bloqueios do WhatsApp
- **Processamento de Mídia**: Áudio, imagem, vídeo e documentos

## 🛠️ Stack Tecnológica

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animações)
- **tsParticles** (efeitos de partículas)
- **shadcn/ui** (componentes)
- **Recharts** (gráficos)

### Backend
- **Node.js + Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **Redis** (cache e rate limiting)
- **Bull/BullMQ** (filas)
- **JWT** (autenticação)

### Integrações
- **Stripe** (pagamentos via cartão)
- **PIX** (pagamentos)
- **Evolution API** (WhatsApp via QR Code)
- **Meta Graph API** (WhatsApp oficial)
- **OpenRouter** (IA - múltiplos modelos)
- **Gemini TTS** (text-to-speech)
- **AWS S3** (storage)
- **SendGrid** (emails)
- **Sentry** (monitoring)

## 📁 Estrutura do Projeto

```
saas-vendra/
├── frontend/              # Next.js 14 App
│   ├── src/
│   │   ├── app/          # App Router (páginas)
│   │   ├── components/   # Componentes React
│   │   ├── lib/          # Utilitários e APIs
│   │   └── styles/       # CSS global
│   └── public/           # Assets estáticos
│
├── backend/              # Node.js API
│   ├── src/
│   │   ├── controllers/  # Controllers
│   │   ├── services/     # Lógica de negócio
│   │   ├── routes/       # Rotas da API
│   │   ├── middlewares/  # Middlewares
│   │   ├── queues/       # Filas (Bull)
│   │   └── utils/        # Utilitários
│   └── prisma/           # Schema e migrations
│
├── docs/                 # Documentação
│   ├── ROADMAP.md
│   ├── DEVELOPMENT_LOG.md
│   └── ANTI_BLOCK_STRATEGY.md
│
└── docker-compose.yml    # Orquestração
```

## 🎨 Design System

### Cores
```
Verde Neon:    #00FF88
Verde Escuro:  #00CC6F
Dark BG:       #0A0E14
Dark Card:     #151922
Border:        #1F2937
```

### Efeitos
- Glow neon nos botões principais
- Partículas animadas no background
- Gradientes suaves
- Hover effects com scale e brightness
- Animações de entrada (fade + slide)

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Conta Stripe (test mode)
- Chaves de API (OpenRouter, Gemini, Evolution, SendGrid)

### Instalação

```bash
# 1. Clonar repositório
git clone <repo-url>
cd saas-vendra

# 2. Instalar dependências - Frontend
cd frontend
npm install

# 3. Instalar dependências - Backend
cd ../backend
npm install

# 4. Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas chaves

# 5. Rodar migrations
npx prisma migrate dev

# 6. Seed (opcional)
npx prisma db seed

# 7. Rodar projeto
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Acessar: http://localhost:3000
```

### Docker (Recomendado)

```bash
docker-compose up -d
```

## 📊 Status do Projeto

**Fase Atual**: Planejamento e Setup Inicial
**Progresso**: 0% (0/65 fases concluídas)
**Branch**: `claude/saas-project-setup-011CUXy9QmJrN89ASPjeA2p8`

Veja [ROADMAP.md](ROADMAP.md) para detalhes completos.

## 📖 Documentação

- [ROADMAP.md](ROADMAP.md) - Todas as fases do desenvolvimento
- [DEVELOPMENT_LOG.md](DEVELOPMENT_LOG.md) - Registro diário de progresso
- [ANTI_BLOCK_STRATEGY.md](ANTI_BLOCK_STRATEGY.md) - Estratégia anti-bloqueio WhatsApp

## 🏗️ Modelo de Negócio

### Plano Base: R$ 97/mês
- 20 arquivos
- 100k tokens
- 1 conexão WhatsApp
- 1 WebChat
- Suporte por email

### Add-ons
- **Arquivos**: +50 (R$ 19) | +100 (R$ 29) | +500 (R$ 79)
- **Tokens**: +500k (R$ 29) | +1M (R$ 49) | +5M (R$ 199)
- **WhatsApp**: +1 conexão (R$ 39) | +5 (R$ 149)
- **WebChat**: +1 (R$ 19) | +3 (R$ 49)

## 🛡️ Estratégia Anti-Bloqueio

Sistema híbrido inteligente:
1. **Evolution API** (primário) - Estável, sem restrições Meta
2. **Meta API Oficial** (fallback) - Para maior volume
3. **WebChat** (sempre disponível) - Canal próprio

Rate limiting:
- 60 msg/hora por número
- Delay 3-5s entre mensagens
- Health monitoring em tempo real
- Warm-up automático de números novos

Veja [ANTI_BLOCK_STRATEGY.md](ANTI_BLOCK_STRATEGY.md) para detalhes completos.

## 👥 Contribuindo

Este é um projeto em desenvolvimento ativo. Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Proprietário - Todos os direitos reservados

---

**Desenvolvido com ❤️ e muito ☕ por Vendra**

*Última atualização: 2025-10-27*
