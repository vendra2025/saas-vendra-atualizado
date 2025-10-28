# 📋 PROPOSTA - FASE 7: CONFIGURAÇÃO DO ASSISTENTE

## ⏱️ Tempo Estimado: 3 dias

---

## 🎯 OBJETIVO

Criar uma interface completa e intuitiva para configuração do assistente de IA, incluindo:
- Configuração de identidade (nome, avatar, tom de voz)
- Definição de objetivos do assistente
- Editor de instruções customizadas
- Gerenciador de regras de negócio
- Parâmetros de IA (temperatura, max tokens, modelo)
- Preview em tempo real do assistente

---

## 📦 O QUE SERÁ FEITO

### 7.1 Página Principal de Configuração

**Componente:**
```
app/(client)/assistente/configurar/page.tsx
```

**Layout:**
- Tabs navigation: Identidade | Objetivos | Instruções | Regras | Parâmetros
- Botões de ação: Salvar, Testar, Resetar
- Estado de salvamento automático (badge "Salvo" ou "Salvando...")
- Preview colapsável à direita

---

### 7.2 Tab 1: Identidade do Assistente

**Componente:**
```
components/assistente/IdentityForm.tsx
```

**Campos:**

1. **Nome do Assistente**
   - Input text
   - Max 50 caracteres
   - Exemplo: "Atendente Virtual Vendra"
   - Tooltip: "Nome que aparecerá nas conversas"

2. **Avatar**
   - Upload de imagem ou seleção de preset
   - 6 avatars pré-configurados
   - Suporte para PNG/JPG (max 2MB)
   - Preview circular com bordas neon

3. **Tom de Voz**
   - Radio buttons ou Select
   - Opções:
     - Formal: "Sempre use senhor/senhora"
     - Amigável: "Use linguagem casual e próxima"
     - Profissional: "Equilibrado entre formal e amigável"
     - Personalizado: (textarea para definir)

4. **Saudação Inicial**
   - Textarea
   - Max 300 caracteres
   - Exemplo: "Olá! Sou o assistente virtual da Vendra. Como posso ajudar?"
   - Suporte para variáveis: {nome_cliente}, {horario}, {dia_semana}

5. **Mensagem de Despedida**
   - Textarea
   - Max 300 caracteres
   - Exemplo: "Foi um prazer ajudar! Se precisar, estou sempre aqui."

**Validações:**
- Nome obrigatório
- Saudação obrigatória
- Tom de voz obrigatório

---

### 7.3 Tab 2: Objetivos do Assistente

**Componente:**
```
components/assistente/ObjectivesForm.tsx
```

**Seções:**

**Objetivo Principal:**
- Textarea com sugestões
- Max 500 caracteres
- Exemplos em cards:
  - "Responder dúvidas sobre produtos e serviços"
  - "Qualificar leads e agendar reuniões"
  - "Oferecer suporte técnico básico"
  - "Processar pedidos e pagamentos"

**Objetivos Secundários (lista):**
- Lista dinâmica (adicionar/remover)
- Cada item: Input text (max 200 caracteres)
- Min 0, Max 5 objetivos
- Drag and drop para reordenar

**O que o assistente DEVE fazer:**
- Lista de checkboxes
- Opções pré-definidas:
  - ☑ Responder rapidamente (em até 2 segundos)
  - ☑ Ser empático e compreensivo
  - ☑ Coletar informações importantes
  - ☑ Sugerir produtos/serviços relevantes
  - ☑ Transferir para humano quando necessário
  - ☑ Confirmar informações antes de processar

**O que o assistente NÃO DEVE fazer:**
- Lista de checkboxes
- Opções pré-definidas:
  - ☑ Fazer promessas que não pode cumprir
  - ☑ Compartilhar dados sensíveis
  - ☑ Tomar decisões financeiras sem autorização
  - ☑ Insistir após recusa do cliente
  - ☑ Usar linguagem ofensiva ou inadequada

---

### 7.4 Tab 3: Instruções Customizadas

**Componente:**
```
components/assistente/InstructionsEditor.tsx
```

**Editor Avançado:**
- Code editor (Monaco ou similar)
- Syntax highlighting
- Contagem de caracteres (max 5000)
- Botões de ajuda com templates

**Templates Pré-configurados:**

1. **E-commerce**
```
Você é um assistente de vendas para e-commerce.
Objetivos:
- Ajudar clientes a encontrar produtos
- Responder dúvidas sobre estoque, preços e prazos
- Processar pedidos via link de checkout

Regras:
- Sempre confirme o endereço de entrega
- Ofereça cupons de desconto quando aplicável
- Informe sobre frete grátis acima de R$200
```

2. **Agendamento**
```
Você é um assistente de agendamentos.
Objetivos:
- Verificar disponibilidade na agenda
- Confirmar dados do cliente (nome, telefone, email)
- Agendar horários disponíveis

Regras:
- Horários disponíveis: seg-sex 9h-18h
- Duração padrão: 1 hora
- Confirmação por WhatsApp 24h antes
```

3. **Suporte Técnico**
```
Você é um assistente de suporte técnico.
Objetivos:
- Diagnosticar problemas básicos
- Fornecer soluções passo-a-passo
- Escalar para técnico quando necessário

Regras:
- Sempre peça o número do pedido
- Confirme o modelo do produto
- Documente todas as tentativas de solução
```

**Variáveis Disponíveis:**
- Display de variáveis que podem ser usadas:
  - `{nome_cliente}`: Nome do contato
  - `{telefone}`: Número de telefone
  - `{email}`: Email do contato
  - `{data_atual}`: Data de hoje
  - `{hora_atual}`: Hora atual
  - `{nome_empresa}`: Nome da sua empresa

---

### 7.5 Tab 4: Regras de Negócio

**Componente:**
```
components/assistente/RulesManager.tsx
```

**Seções:**

**Horário de Atendimento:**
- Checkbox: "Ativar resposta automática fora do horário"
- Grid com horários por dia da semana:
  ```
  Segunda:    09:00 - 18:00
  Terça:      09:00 - 18:00
  Quarta:     09:00 - 18:00
  Quinta:     09:00 - 18:00
  Sexta:      09:00 - 18:00
  Sábado:     Fechado (ou personalizar)
  Domingo:    Fechado (ou personalizar)
  ```
- Mensagem fora do horário (textarea):
  "Estamos fora do horário de atendimento. Retornaremos em breve!"

**Palavras-chave para Transferência:**
- Lista dinâmica
- Quando detectar estas palavras, transfere para humano:
  - "falar com atendente"
  - "quero cancelar"
  - "problema urgente"
  - "reclamação"
  - Botão: + Adicionar palavra-chave

**Limite de Mensagens:**
- Input number
- Após X mensagens sem resolver, oferece transferência
- Padrão: 5 mensagens
- Range: 3-10

**Detecção de Sentimento:**
- Checkbox: "Detectar frustração do cliente"
- Se cliente demonstrar frustração, oferece transferência automática

**Persistência de Contexto:**
- Checkbox: "Lembrar conversas anteriores"
- Tempo de memória: Select (1 dia, 7 dias, 30 dias, Sempre)

---

### 7.6 Tab 5: Parâmetros de IA

**Componente:**
```
components/assistente/ParametersPanel.tsx
```

**Configurações:**

**Modelo de IA:**
- Select com ícones
- Opções:
  - Claude Sonnet 3.5 (Recomendado)
  - Claude Opus 3
  - GPT-4o
  - GPT-4o mini
  - Gemini 1.5 Pro
  - Gemini 1.5 Flash
- Descrição e preço por modelo

**Temperatura:**
- Slider (0.0 a 1.0)
- Padrão: 0.7
- Label explicativo:
  - 0.0 = Mais conservador e consistente
  - 1.0 = Mais criativo e variado
- Preview visual do impacto

**Máximo de Tokens por Resposta:**
- Slider (100 a 4000)
- Padrão: 500
- Label: "Tokens ≈ palavras × 1.3"
- Estimativa de custo por resposta

**Frequência de Contexto:**
- Select:
  - Baixa: Considera apenas a mensagem atual
  - Média: Considera últimas 5 mensagens
  - Alta: Considera toda a conversa (recomendado)

**Modo de Citação:**
- Checkbox: "Citar fonte ao responder baseado na base de conhecimento"
- Formato: "Segundo o documento X..."

**Fallback:**
- Checkbox: "Ativar resposta padrão quando não souber"
- Textarea: Mensagem fallback
- Exemplo: "Não tenho certeza sobre isso. Deixe-me transferir para um atendente."

---

### 7.7 Preview em Tempo Real

**Componente:**
```
components/assistente/PreviewChat.tsx
```

**Funcionalidades:**
- Chat mockup simulando WhatsApp
- Testa configurações em tempo real
- Botão: "Enviar mensagem de teste"
- Exemplos rápidos:
  - "Olá, preciso de ajuda"
  - "Qual o horário de atendimento?"
  - "Quero falar com um atendente"
  - "Quanto custa?"

**Elementos do Preview:**
- Avatar do assistente (configurado)
- Nome do assistente (configurado)
- Mensagens com o tom de voz aplicado
- Indicador de digitação animado
- Timestamp

**Teste Avançado:**
- Modal completo de teste
- Histórico de conversa salvo
- Possibilidade de testar cenários:
  - Cliente feliz
  - Cliente frustrado
  - Fora do horário
  - Perguntas sobre produtos

---

### 7.8 Sistema de Salvamento

**Store Zustand:**
```
hooks/useAssistantConfig.ts
```

**Estado:**
```typescript
interface AssistantConfig {
  identity: {
    name: string
    avatar: string
    tone: 'formal' | 'friendly' | 'professional' | 'custom'
    customTone?: string
    greeting: string
    farewell: string
  }
  objectives: {
    primary: string
    secondary: string[]
    shouldDo: string[]
    shouldNotDo: string[]
  }
  instructions: string
  rules: {
    schedule: {
      enabled: boolean
      hours: Record<string, { start: string; end: string; closed: boolean }>
      offlineMessage: string
    }
    transferKeywords: string[]
    messageLimit: number
    detectFrustration: boolean
    persistContext: boolean
    contextDuration: number
  }
  parameters: {
    model: string
    temperature: number
    maxTokens: number
    contextFrequency: 'low' | 'medium' | 'high'
    citeSources: boolean
    fallbackEnabled: boolean
    fallbackMessage: string
  }
}
```

**Funções:**
- `loadConfig()`: Carrega configuração salva
- `saveConfig(config)`: Salva (com debounce de 2s)
- `resetToDefault()`: Volta para padrão
- `exportConfig()`: Exporta JSON
- `importConfig(json)`: Importa JSON

---

## 📂 ARQUIVOS QUE SERÃO CRIADOS

**Página Principal (1 arquivo):**
1. `app/(client)/assistente/configurar/page.tsx`

**Componentes do Assistente (7 arquivos):**
2. `components/assistente/IdentityForm.tsx`
3. `components/assistente/ObjectivesForm.tsx`
4. `components/assistente/InstructionsEditor.tsx`
5. `components/assistente/RulesManager.tsx`
6. `components/assistente/ParametersPanel.tsx`
7. `components/assistente/PreviewChat.tsx`
8. `components/assistente/ConfigTabs.tsx` (wrapper com tabs)

**Hook de Estado (1 arquivo):**
9. `hooks/useAssistantConfig.ts`

**Componentes UI Adicionais (se necessário):**
10. `components/ui/slider.tsx` (para temperatura e tokens)
11. `components/ui/tabs.tsx` (se ainda não existir)

**Total**: 11 arquivos

---

## ✅ CRITÉRIOS DE ACEITE

Ao final da Fase 7, teremos:

- ✅ Interface completa de configuração com 5 tabs
- ✅ Identidade: nome, avatar, tom de voz, saudação, despedida
- ✅ Objetivos: principal, secundários, deve/não deve fazer
- ✅ Instruções: editor avançado com 3 templates
- ✅ Regras: horário, transferência, limites, sentimento
- ✅ Parâmetros: modelo, temperatura, tokens, contexto
- ✅ Preview em tempo real funcionando
- ✅ Salvamento automático com debounce
- ✅ Zustand store para gerenciar estado
- ✅ Validações em todos os campos
- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Build sem erros

---

## 🎨 REFERÊNCIAS DE DESIGN

**Inspirações:**
- OpenAI Playground (parâmetros de IA)
- Discord Server Settings (tabs navigation)
- Notion (editor de texto)
- Intercom (chat preview)

**Elementos Visuais:**
- Tabs com indicador visual
- Cards com hover effects
- Sliders customizados com gradiente neon
- Preview chat com animações suaves
- Badge "Salvo" com fade
- Tooltips explicativos em todos os campos

---

## 🔗 DEPENDÊNCIAS

Nenhuma nova dependência necessária! Usaremos:
- Zustand (já instalado)
- Framer Motion (já instalado)
- Lucide Icons (já instalado)

Opcionalmente (se quiser editor avançado):
```bash
npm install @monaco-editor/react
```

---

## 💾 MOCK DE CONFIGURAÇÃO

```typescript
const defaultConfig: AssistantConfig = {
  identity: {
    name: 'Assistente Virtual',
    avatar: '/avatars/default.png',
    tone: 'professional',
    greeting: 'Olá! Como posso ajudar você hoje?',
    farewell: 'Foi um prazer conversar! Até logo!',
  },
  objectives: {
    primary: 'Responder dúvidas e fornecer suporte aos clientes',
    secondary: [
      'Qualificar leads',
      'Agendar reuniões',
      'Coletar feedback',
    ],
    shouldDo: [
      'Responder rapidamente',
      'Ser empático',
      'Coletar informações',
      'Transferir quando necessário',
    ],
    shouldNotDo: [
      'Fazer promessas impossíveis',
      'Compartilhar dados sensíveis',
      'Insistir após recusa',
    ],
  },
  instructions: `Você é um assistente virtual profissional.
Sempre seja educado, claro e objetivo.
Se não souber algo, admita e ofereça alternativas.`,
  rules: {
    schedule: {
      enabled: true,
      hours: {
        monday: { start: '09:00', end: '18:00', closed: false },
        tuesday: { start: '09:00', end: '18:00', closed: false },
        // ... outros dias
      },
      offlineMessage: 'Estamos fora do horário. Retornaremos em breve!',
    },
    transferKeywords: ['atendente', 'humano', 'cancelar', 'reclamação'],
    messageLimit: 5,
    detectFrustration: true,
    persistContext: true,
    contextDuration: 7,
  },
  parameters: {
    model: 'claude-sonnet-3.5',
    temperature: 0.7,
    maxTokens: 500,
    contextFrequency: 'high',
    citeSources: true,
    fallbackEnabled: true,
    fallbackMessage: 'Não tenho certeza. Deixe-me transferir para um atendente.',
  },
}
```

---

## 🚀 PRÓXIMA FASE

Após conclusão da Fase 7, partiremos para:

**Fase 8: Agenda de Atendimentos** (2 dias)
- Calendário interativo
- Agendamento de eventos
- Visualização por dia/semana/mês
- Integração com assistente

---

## ❓ DÚVIDAS/APROVAÇÃO

Antes de começar, preciso confirmar:

1. ✅ **Aprovado para prosseguir com a Fase 7?**
2. ❓ Deseja adicionar ou remover alguma configuração?
3. ❓ Algum modelo de IA específico deve ter prioridade?
4. ❓ Prefere editor simples ou avançado (Monaco)?

---

## 💬 COMO FUNCIONA O PROCESSO

Após sua aprovação:

1. ✅ Criarei a estrutura de tabs da página
2. ✅ Implementarei cada formulário (5 tabs)
3. ✅ Criarei o Zustand store para gerenciar estado
4. ✅ Implementarei o preview em tempo real
5. ✅ Adicionarei salvamento automático
6. ✅ Criarei templates pré-configurados
7. 📝 Atualizarei o `DEVELOPMENT_LOG.md` com o progresso
8. 🎯 Marcarei a Fase 7 como concluída no `ROADMAP.md`
9. 📋 Apresentarei a **Proposta da Fase 8** para nova aprovação
10. 🔄 Repetiremos o ciclo até completar todas as 65 fases

---

**⏳ Aguardando sua aprovação para iniciar a Fase 7...**

Digite **"continue"** ou **"APROVADO"** para prosseguir.

Ou solicite modificações caso deseje algum ajuste antes de iniciar.

---

*Data: 2025-10-28*
*Fase: 7/65*
*Tempo estimado: 3 dias*
*Progresso atual: 9% (6/65 fases concluídas)*
