# 💬 PROPOSTA - FASE 10: SISTEMA DE CONVERSAS

## ⏱️ Tempo Estimado: 3 dias

---

## 🎯 OBJETIVO

Criar um sistema completo de gerenciamento de conversas com:
- Interface de chat em tempo real
- Lista de conversas ativas
- Suporte a múltiplos canais (WhatsApp, WebChat)
- Sistema de marcação (resolvido/pendente/em_andamento)
- Templates de respostas rápidas
- Transferência entre atendentes
- Notas internas
- Busca e filtros avançados

---

## 📦 O QUE SERÁ FEITO

### 10.1 Página Principal de Conversas

**Componente:**
```
app/(client)/conversas/page.tsx
```

**Layout (3 colunas):**
- **Coluna 1 (25%)**: Lista de conversas
- **Coluna 2 (50%)**: Chat ativo
- **Coluna 3 (25%)**: Detalhes do contato + Notas internas

**Header com:**
- Título + contador de conversas ativas
- Botões: Nova Conversa | Filtros | Configurações
- Status do atendente (Online/Ocupado/Ausente)

---

### 10.2 Lista de Conversas (Sidebar Esquerda)

**Componente:**
```
components/conversas/ConversationList.tsx
```

**Elementos:**

**Barra de Busca:**
- Input com ícone de lupa
- Busca por nome, telefone, mensagem
- Debounce de 300ms

**Filtros Rápidos (Tabs):**
- Todas (contador)
- Não Lidas (badge com número)
- Pendentes (emoji ⏳)
- Em Andamento (emoji 🔄)
- Resolvidas (emoji ✅)
- Arquivadas (emoji 📦)

**Card de Conversa:**
```typescript
interface ConversationCardProps {
  conversation: Conversation
  isActive: boolean
  onClick: () => void
}
```

**Informações no Card:**
- Avatar do contato (foto ou inicial)
- Nome do contato + tags
- Canal (WhatsApp/WebChat icon)
- Última mensagem (truncada em 50 chars)
- Timestamp (formatado: "há 5 min", "ontem", "12/01")
- Badge de mensagens não lidas (se houver)
- Status (resolvido/pendente/em_andamento)
- Pin icon (conversas fixadas aparecem no topo)

**Estados Visuais:**
- Hover: bg-card-hover
- Ativa: bg-primary/10 com borda esquerda primary
- Não lida: texto bold + badge vermelho
- Arquivada: opacidade 60%

**Ordenação:**
1. Conversas fixadas (pinned)
2. Não lidas
3. Mais recentes

---

### 10.3 Interface de Chat (Coluna Central)

**Componente:**
```
components/conversas/ChatWindow.tsx
```

**Header do Chat:**
- Avatar + Nome do contato
- Status (Online/Offline com indicator)
- Canal (WhatsApp/WebChat badge)
- Ações:
  - Pin/Unpin conversa
  - Marcar como resolvido
  - Transferir para outro atendente
  - Arquivar conversa
  - Menu com mais opções (⋮)

**Área de Mensagens:**
- Auto-scroll para última mensagem
- Virtualization para performance (se muitas mensagens)
- Separadores de data ("Hoje", "Ontem", "12 de Janeiro")
- Indicador "digitando..." quando cliente está digitando

**Tipos de Mensagem:**

**1. Mensagem de Texto:**
```typescript
interface TextMessage {
  id: string
  type: 'text'
  content: string
  sender: 'client' | 'agent' | 'bot'
  timestamp: Date
  status: 'sent' | 'delivered' | 'read' | 'failed'
  isEdited?: boolean
}
```

**2. Mensagem de Mídia:**
```typescript
interface MediaMessage {
  id: string
  type: 'image' | 'video' | 'audio' | 'document'
  url: string
  filename?: string
  size?: number
  thumbnail?: string
  caption?: string
  sender: 'client' | 'agent' | 'bot'
  timestamp: Date
  status: MessageStatus
}
```

**3. Mensagem do Sistema:**
```typescript
interface SystemMessage {
  id: string
  type: 'system'
  content: string
  action: 'conversation_started' | 'transferred' | 'resolved' | 'reopened'
  timestamp: Date
}
```

**Componente de Mensagem:**
```
components/conversas/Message.tsx
```

**Layout da Mensagem:**

**Mensagem do Cliente (esquerda):**
- Avatar do contato
- Balloon com bg-card
- Texto em text-white
- Timestamp abaixo (text-xs text-gray-500)

**Mensagem do Atendente (direita):**
- Balloon com bg-primary/20
- Texto em text-white
- Status indicator (✓ enviado, ✓✓ entregue, ✓✓ lido)
- Timestamp abaixo

**Mensagem do Bot (centro):**
- Ícone 🤖
- Balloon com bg-purple-500/20
- Texto em text-purple-200
- Badge "Assistente IA"

**Mensagem de Sistema (centro):**
- Sem balloon
- Texto em text-gray-500 italic
- Ícone de acordo com ação

**Input de Mensagem:**

**Componente:**
```
components/conversas/MessageInput.tsx
```

**Elementos:**
- Botão de Anexo (📎) → Abre menu:
  - 📷 Imagem
  - 🎥 Vídeo
  - 🎤 Áudio
  - 📄 Documento
- Botão de Emoji (😊) → Picker de emojis
- Botão de Templates (⚡) → Modal de templates
- Textarea autoexpandível (max 5 linhas)
- Contador de caracteres (limite WhatsApp: 4096)
- Botão Enviar (sempre visível, disabled se vazio)

**Atalhos de Teclado:**
- Enter: Enviar mensagem
- Shift+Enter: Nova linha
- Ctrl+K: Abrir templates
- Ctrl+E: Abrir emojis
- Esc: Cancelar edição/resposta

**Funcionalidades:**
- Preview de link (se mensagem contiver URL)
- Preview de arquivo antes de enviar
- Modo "respondendo" (mostra mensagem sendo respondida acima do input)
- Modo "editando" (mostra mensagem sendo editada)

---

### 10.4 Painel de Detalhes (Coluna Direita)

**Componente:**
```
components/conversas/ConversationDetails.tsx
```

**Seções (Tabs):**

**Tab 1: Informações do Contato**
- Foto/Avatar (clicável para ampliar)
- Nome completo
- Email
- Telefone/WhatsApp
- Tags
- Botão: Ver Perfil Completo → Abre drawer do ContactDetails
- Botão: Editar Contato
- Estatísticas:
  - Total de conversas: X
  - Tempo médio de resposta: Y min
  - Última conversa: Z dias atrás
  - NPS/Satisfação: ⭐⭐⭐⭐⭐

**Tab 2: Notas Internas**
- Lista de notas (visíveis apenas para atendentes)
- Card de nota:
  - Autor + Avatar
  - Conteúdo da nota
  - Timestamp
  - Botão Editar/Excluir (se autor)
- Botão: + Nova Nota
- Modal para criar/editar nota:
  - Textarea
  - Opção: Fixar nota (aparece no topo)
  - Salvar/Cancelar

**Tab 3: Histórico**
- Timeline de eventos:
  - Conversa iniciada
  - Primeira resposta (SLA)
  - Transferências
  - Status alterado
  - Notas adicionadas
  - Tags modificadas
  - Conversa resolvida/reaberta
- Ordenação cronológica (mais recente primeiro)

**Tab 4: Ações Rápidas**
- Agendar evento com contato
- Criar tarefa/follow-up
- Enviar email
- Adicionar tag
- Transferir para outro atendente
- Bloquear contato (spam)
- Exportar histórico da conversa

---

### 10.5 Sistema de Templates

**Componente:**
```
components/conversas/TemplatesModal.tsx
```

**Interface:**

**Categorias (Tabs):**
- Todas
- Saudações
- Despedidas
- FAQ
- Agendamentos
- Suporte
- Vendas
- Personalizado

**Card de Template:**
- Título do template
- Preview do conteúdo (truncado)
- Variáveis destacadas ({nome}, {data}, etc.)
- Botão: Usar Template
- Botão: Editar (ícone ✏️)
- Botão: Excluir (ícone 🗑️)

**Variáveis Disponíveis:**
- {nome_cliente}
- {nome_atendente}
- {empresa}
- {data}
- {hora}
- {dia_semana}
- {link_agendamento}
- {saldo_creditos}

**Formulário de Template:**
- Nome do template
- Categoria (select)
- Conteúdo (textarea)
- Atalho (opcional, ex: /saudacao)
- Preview com variáveis substituídas

**Uso do Template:**
1. Usuário clica no botão Templates (⚡) ou digita /
2. Modal abre mostrando templates
3. Busca por nome/categoria
4. Clica em "Usar"
5. Template é inserido no input
6. Variáveis são substituídas automaticamente
7. Usuário pode editar antes de enviar

---

### 10.6 Transferência de Conversa

**Componente:**
```
components/conversas/TransferModal.tsx
```

**Fluxo:**
1. Atendente clica em "Transferir"
2. Modal abre com:
   - Lista de atendentes disponíveis
   - Status de cada um (Online/Ocupado/Ausente)
   - Número de conversas ativas
   - Avatar + Nome
   - Botão de seleção
3. Campo opcional: Nota para o próximo atendente
4. Botão: Confirmar Transferência
5. Mensagem de sistema é enviada no chat
6. Conversa move para o novo atendente
7. Notificação é enviada para o novo atendente

**Atendente Card:**
```typescript
interface AgentCardProps {
  agent: {
    id: string
    name: string
    avatar?: string
    status: 'online' | 'busy' | 'away'
    activeConversations: number
    averageResponseTime: number
  }
  isSelected: boolean
  onClick: () => void
}
```

---

### 10.7 Zustand Store para Conversas

**Store:**
```
hooks/useConversations.ts
```

**Estado:**
```typescript
interface Message {
  id: string
  conversationId: string
  type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'system'
  content: string
  sender: 'client' | 'agent' | 'bot'
  senderName: string
  timestamp: Date
  status: 'sent' | 'delivered' | 'read' | 'failed'
  isEdited?: boolean
  metadata?: {
    url?: string
    filename?: string
    size?: number
    thumbnail?: string
    caption?: string
  }
}

interface Conversation {
  id: string
  contactId: string
  contactName: string
  contactAvatar?: string
  contactPhone: string
  channel: 'whatsapp' | 'webchat'
  status: 'pending' | 'in_progress' | 'resolved' | 'archived'
  isPinned: boolean
  unreadCount: number
  lastMessage?: Message
  lastMessageAt: Date
  assignedTo?: string // agent ID
  tags: string[]
  createdAt: Date
  resolvedAt?: Date
  firstResponseAt?: Date
  notes: Note[]
}

interface Note {
  id: string
  conversationId: string
  content: string
  authorId: string
  authorName: string
  isPinned: boolean
  createdAt: Date
  updatedAt: Date
}

interface Template {
  id: string
  name: string
  category: 'greeting' | 'farewell' | 'faq' | 'appointment' | 'support' | 'sales' | 'custom'
  content: string
  shortcut?: string
  variables: string[]
  usageCount: number
}

interface ConversationsStore {
  conversations: Conversation[]
  messages: Record<string, Message[]> // conversationId -> Message[]
  templates: Template[]
  activeConversationId: string | null
  searchQuery: string
  filters: {
    status: ('pending' | 'in_progress' | 'resolved' | 'archived')[]
    channels: ('whatsapp' | 'webchat')[]
    unreadOnly: boolean
  }

  // Conversation actions
  setActiveConversation: (id: string | null) => void
  updateConversationStatus: (id: string, status: Conversation['status']) => void
  togglePin: (id: string) => void
  archiveConversation: (id: string) => void
  transferConversation: (id: string, agentId: string, note?: string) => void
  markAsRead: (id: string) => void

  // Message actions
  sendMessage: (conversationId: string, content: string, type?: Message['type']) => void
  editMessage: (messageId: string, newContent: string) => void
  deleteMessage: (messageId: string) => void
  getMessages: (conversationId: string) => Message[]

  // Note actions
  addNote: (conversationId: string, content: string, isPinned?: boolean) => void
  updateNote: (noteId: string, content: string) => void
  deleteNote: (noteId: string) => void
  togglePinNote: (noteId: string) => void

  // Template actions
  addTemplate: (template: Omit<Template, 'id' | 'usageCount'>) => void
  updateTemplate: (id: string, template: Partial<Template>) => void
  deleteTemplate: (id: string) => void
  useTemplate: (id: string, variables: Record<string, string>) => string

  // Search and filter
  setSearchQuery: (query: string) => void
  setFilters: (filters: Partial<ConversationsStore['filters']>) => void
  clearFilters: () => void
  getFilteredConversations: () => Conversation[]

  // Stats
  getStats: () => {
    total: number
    unread: number
    pending: number
    inProgress: number
    averageResponseTime: number
  }
}
```

---

### 10.8 Dados Mock

**Mock de 15 conversas:**
```typescript
const mockConversations: Conversation[] = [
  {
    id: '1',
    contactId: '1', // João Silva
    contactName: 'João Silva',
    contactAvatar: 'https://i.pravatar.cc/150?img=1',
    contactPhone: '+55 11 99999-9999',
    channel: 'whatsapp',
    status: 'in_progress',
    isPinned: true,
    unreadCount: 3,
    lastMessageAt: new Date(),
    assignedTo: 'agent-1',
    tags: ['vip', 'cliente'],
    createdAt: new Date(2025, 9, 28, 14, 30),
    firstResponseAt: new Date(2025, 9, 28, 14, 32),
    notes: [
      {
        id: 'n1',
        conversationId: '1',
        content: 'Cliente VIP. Sempre atender com prioridade.',
        authorId: 'agent-1',
        authorName: 'Admin',
        isPinned: true,
        createdAt: new Date(2025, 9, 28, 14, 35),
        updatedAt: new Date(2025, 9, 28, 14, 35),
      }
    ]
  },
  // ... mais 14 conversas
]

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: 'm1',
      conversationId: '1',
      type: 'system',
      content: 'Conversa iniciada via WhatsApp',
      sender: 'bot',
      senderName: 'Sistema',
      timestamp: new Date(2025, 9, 28, 14, 30),
      status: 'sent',
    },
    {
      id: 'm2',
      conversationId: '1',
      type: 'text',
      content: 'Olá! Gostaria de saber mais sobre os planos disponíveis.',
      sender: 'client',
      senderName: 'João Silva',
      timestamp: new Date(2025, 9, 28, 14, 30, 30),
      status: 'read',
    },
    {
      id: 'm3',
      conversationId: '1',
      type: 'text',
      content: 'Olá João! Tudo bem? Temos 3 planos principais: Básico, Profissional e Enterprise. Qual seria o seu interesse?',
      sender: 'agent',
      senderName: 'Atendente',
      timestamp: new Date(2025, 9, 28, 14, 32),
      status: 'read',
    },
    // ... mais mensagens
  ],
  // ... mais conversas com mensagens
}

const mockTemplates: Template[] = [
  {
    id: 't1',
    name: 'Saudação Padrão',
    category: 'greeting',
    content: 'Olá {nome_cliente}! 👋 Meu nome é {nome_atendente}. Como posso ajudá-lo hoje?',
    shortcut: '/oi',
    variables: ['nome_cliente', 'nome_atendente'],
    usageCount: 142,
  },
  {
    id: 't2',
    name: 'Horário de Atendimento',
    category: 'faq',
    content: 'Nosso horário de atendimento é de segunda a sexta, das 9h às 18h. Hoje é {dia_semana} e são {hora}. Como posso ajudá-lo?',
    shortcut: '/horario',
    variables: ['dia_semana', 'hora'],
    usageCount: 87,
  },
  // ... mais templates
]
```

---

## 📂 ARQUIVOS QUE SERÃO CRIADOS

**Página Principal (1 arquivo):**
1. `app/(client)/conversas/page.tsx`

**Componentes de Conversas (15 arquivos):**
2. `components/conversas/ConversationList.tsx`
3. `components/conversas/ConversationCard.tsx`
4. `components/conversas/ChatWindow.tsx`
5. `components/conversas/ChatHeader.tsx`
6. `components/conversas/MessageList.tsx`
7. `components/conversas/Message.tsx`
8. `components/conversas/MessageInput.tsx`
9. `components/conversas/ConversationDetails.tsx`
10. `components/conversas/NotesPanel.tsx`
11. `components/conversas/HistoryTimeline.tsx`
12. `components/conversas/TemplatesModal.tsx`
13. `components/conversas/TemplateCard.tsx`
14. `components/conversas/TransferModal.tsx`
15. `components/conversas/AgentCard.tsx`
16. `components/conversas/ConversationStats.tsx`

**Hook de Estado (1 arquivo):**
17. `hooks/useConversations.ts`

**Total**: 17 arquivos

---

## ✅ CRITÉRIOS DE ACEITE

Ao final da Fase 10, teremos:

- ✅ Lista de conversas com busca e filtros funcionando
- ✅ Interface de chat com mensagens em tempo real
- ✅ Suporte a múltiplos canais (WhatsApp, WebChat)
- ✅ Sistema de status (pendente, em andamento, resolvido, arquivado)
- ✅ Templates de respostas rápidas com variáveis
- ✅ Sistema de notas internas
- ✅ Timeline de histórico de eventos
- ✅ Transferência entre atendentes
- ✅ Pin de conversas importantes
- ✅ Contador de mensagens não lidas
- ✅ Indicador "digitando..."
- ✅ Status de mensagem (enviado/entregue/lido)
- ✅ 15 conversas mock com mensagens
- ✅ 10 templates pré-configurados
- ✅ Zustand store gerenciando estado
- ✅ Design responsivo
- ✅ Build sem erros

---

## 🎨 REFERÊNCIAS DE DESIGN

**Inspirações:**
- WhatsApp Web (interface familiar)
- Intercom (sistema de notas e detalhes)
- Zendesk (filtros e organização)
- Crisp Chat (design moderno)

**Cores por Canal:**
- WhatsApp: #25D366 (verde oficial)
- WebChat: #00B8FF (azul)

**Cores por Status:**
- Pendente: #FFB800 (amarelo)
- Em Andamento: #00B8FF (azul)
- Resolvido: #00FF88 (verde neon)
- Arquivado: #6B7280 (cinza)

---

## 🔗 DEPENDÊNCIAS

Nenhuma nova dependência! Usaremos:
- Zustand (já instalado)
- Framer Motion (já instalado)
- Lucide Icons (já instalado)
- date-fns (já instalado)

---

## 📅 EXEMPLO DE USO

1. **Usuário acessa /conversas**
2. **Vê lista de 15 conversas** no sidebar esquerdo
3. **3 conversas com badge de não lidas**
4. **Clica em conversa com João Silva** (VIP, pinned)
5. **Chat abre** no centro com histórico de 12 mensagens
6. **Vê nota interna fixada**: "Cliente VIP. Sempre atender com prioridade."
7. **Usa template** /oi → "Olá João! 👋 Meu nome é Atendente..."
8. **Envia mensagem** → Status: enviado ✓ → entregue ✓✓ → lido ✓✓
9. **Adiciona nota interna**: "Cliente interessado no plano Enterprise"
10. **Marca conversa como resolvida**
11. **Conversa move para tab "Resolvidas"**

---

## 🚀 PRÓXIMA FASE

Após conclusão da Fase 10, partiremos para:

**Fase 11: Automações e Fluxos** (3 dias)
- Criador visual de fluxos (drag-and-drop)
- Triggers automáticos
- Condições e ações
- Templates de automação
- Teste de fluxos

---

## 💬 COMO FUNCIONA O PROCESSO

Após aprovação:

1. ✅ Criarei o Zustand store com 15 conversas e mensagens mock
2. ✅ Implementarei a lista de conversas com busca e filtros
3. ✅ Criarei a interface de chat com input e mensagens
4. ✅ Implementarei o sistema de templates
5. ✅ Criarei o painel de detalhes com notas e histórico
6. ✅ Implementarei transferência entre atendentes
7. ✅ Adicionarei sistema de status e pin
8. ✅ Testarei todo o fluxo de conversa
9. 📝 Atualizarei o `DEVELOPMENT_LOG.md`
10. 🎯 Marcarei a Fase 10 como concluída no `ROADMAP.md`

---

**⏳ Iniciando Fase 10...**

---

*Data: 2025-10-29*
*Fase: 10/65*
*Tempo estimado: 3 dias*
*Progresso atual: 14% (9/65 fases concluídas)*
