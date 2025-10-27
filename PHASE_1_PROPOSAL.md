# 📋 PROPOSTA - FASE 1: SETUP INICIAL

## ⏱️ Tempo Estimado: 1 dia

---

## 🎯 OBJETIVO

Configurar o ambiente de desenvolvimento completo do projeto, incluindo:
- Projeto Next.js 14 com TypeScript
- Estrutura de pastas organizada
- Design System base (cores neon, componentes)
- Bibliotecas de UI e animações
- Configuração inicial do Tailwind CSS

---

## 📦 O QUE SERÁ FEITO

### 1.1 Inicialização do Projeto Next.js

```bash
npx create-next-app@latest frontend --typescript --tailwind --app
cd frontend
```

**Configurações:**
- ✅ TypeScript
- ✅ ESLint
- ✅ Tailwind CSS
- ✅ App Router (nova arquitetura Next.js 14)
- ✅ `src/` directory
- ✅ Import alias configurado

---

### 1.2 Instalação de Dependências

**Animações e Efeitos:**
```bash
npm install framer-motion @tsparticles/react @tsparticles/slim
```

**Ícones e Utilitários:**
```bash
npm install lucide-react clsx tailwind-merge
```

**Componentes UI (shadcn/ui):**
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add tabs
```

**Total de dependências**: ~15 pacotes

---

### 1.3 Estrutura de Pastas

```
frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Grupo de rotas de autenticação
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   │
│   │   ├── (public)/            # Grupo de rotas públicas
│   │   │   ├── page.tsx         # Landing page (/)
│   │   │   ├── checkout/
│   │   │   ├── termos/
│   │   │   └── privacidade/
│   │   │
│   │   ├── (client)/            # Grupo de rotas do cliente
│   │   │   ├── dashboard/
│   │   │   ├── agenda/
│   │   │   ├── mensagens/
│   │   │   ├── arquivos/
│   │   │   ├── contatos/
│   │   │   ├── conversas/
│   │   │   ├── formularios/
│   │   │   ├── transmissao/
│   │   │   ├── assistente/
│   │   │   ├── ferramentas/
│   │   │   ├── relatorios/
│   │   │   ├── webchat/
│   │   │   └── configuracoes/
│   │   │
│   │   ├── (admin)/             # Grupo de rotas do admin
│   │   │   ├── dashboard/
│   │   │   ├── clientes/
│   │   │   ├── configuracoes/
│   │   │   ├── financeiro/
│   │   │   ├── suporte/
│   │   │   └── logs/
│   │   │
│   │   ├── layout.tsx           # Layout raiz
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                  # Componentes shadcn
│   │   ├── layout/              # Layouts reutilizáveis
│   │   ├── landing/             # Componentes da landing
│   │   ├── client/              # Componentes do painel cliente
│   │   └── admin/               # Componentes do painel admin
│   │
│   ├── lib/
│   │   ├── utils.ts             # Utilitários gerais
│   │   └── api.ts               # Cliente API
│   │
│   └── styles/
│       └── globals.css
│
├── public/
│   ├── images/
│   └── fonts/
│
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

**Total**: ~40 pastas criadas

---

### 1.4 Design System Base

**Arquivo: `tailwind.config.ts`**

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00FF88',
          dark: '#00CC6F',
          glow: 'rgba(0, 255, 136, 0.5)',
          50: '#E6FFF5',
          100: '#CCFFEB',
          200: '#99FFD7',
          300: '#66FFC3',
          400: '#33FFAF',
          500: '#00FF88',
          600: '#00CC6F',
          700: '#009952',
          800: '#006636',
          900: '#003319',
        },
        dark: {
          bg: '#0A0E14',
          card: '#151922',
          border: '#1F2937',
          hover: '#1A1F2E',
        },
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 255, 136, 0.5)',
        'neon-strong': '0 0 40px rgba(0, 255, 136, 0.8)',
        'neon-soft': '0 0 10px rgba(0, 255, 136, 0.3)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 136, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-neon': 'linear-gradient(135deg, #00FF88 0%, #00CC6F 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

---

### 1.5 Componentes Base

**Arquivo: `src/lib/utils.ts`**

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Arquivo: `src/components/ui/container.tsx`**

```typescript
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
```

---

### 1.6 Configuração de Estilos Globais

**Arquivo: `src/app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary: 142 100% 50%; /* #00FF88 */
    --background: 220 26% 7%; /* #0A0E14 */
    --foreground: 0 0% 100%;
  }

  * {
    @apply border-dark-border;
  }

  body {
    @apply bg-dark-bg text-foreground;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }

  /* Scrollbar customizado */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-dark-card;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-primary/50 rounded-full;
  }

  ::-webkit-scrollbar-thumb:hover {
    @apply bg-primary;
  }
}

@layer utilities {
  .text-gradient {
    @apply bg-gradient-neon bg-clip-text text-transparent;
  }

  .glow-text {
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
  }
}
```

---

## 📂 ARQUIVOS QUE SERÃO CRIADOS

1. **Configuração**: 3 arquivos (tailwind.config, tsconfig, package.json atualizado)
2. **Estrutura de pastas**: ~40 diretórios
3. **Componentes base**: 5 componentes (Container, Button customizado, etc)
4. **Utilitários**: 2 arquivos (utils.ts, api.ts)
5. **Estilos**: 1 arquivo (globals.css)

**Total**: ~51 arquivos/pastas criados

---

## ✅ CRITÉRIOS DE ACEITE

Ao final da Fase 1, teremos:

- ✅ Projeto Next.js 14 rodando em `http://localhost:3000`
- ✅ Tailwind CSS configurado com tema neon
- ✅ Todas as dependências instaladas sem erros
- ✅ Estrutura de pastas completa
- ✅ Design System documentado
- ✅ Componentes base funcionando
- ✅ Build do projeto sem erros (`npm run build`)

---

## 🚀 PRÓXIMA FASE

Após conclusão da Fase 1, partiremos para:

**Fase 2: Landing Page** (5 dias)
- Hero Section com partículas
- Features Grid
- Pricing
- FAQ
- Footer

---

## ❓ DÚVIDAS/APROVAÇÃO

Antes de começar, preciso confirmar:

1. ✅ **Aprovado para prosseguir com a Fase 1?**
2. ❓ Alguma modificação na estrutura de pastas?
3. ❓ Alguma biblioteca adicional que deseja incluir?
4. ❓ Prefere algum ajuste nas cores do design system?

---

## 💬 COMO FUNCIONA O PROCESSO

Após sua aprovação:

1. ✅ Executarei todos os comandos da Fase 1
2. 📝 Atualizarei o `DEVELOPMENT_LOG.md` com o progresso
3. 🎯 Marcarei a Fase 1 como concluída no `ROADMAP.md`
4. 📋 Apresentarei a **Proposta da Fase 2** para nova aprovação
5. 🔄 Repetiremos o ciclo até completar todas as 65 fases

---

**⏳ Aguardando sua aprovação para iniciar...**

Digite **"APROVADO"** ou **"COMEÇAR"** para prosseguir com a Fase 1.

Ou solicite modificações caso deseje algum ajuste antes de iniciar.

---

*Data: 2025-10-27*
*Fase: 1/65*
*Tempo estimado: 1 dia*
