# 📇 PROPOSTA - FASE 9: GESTÃO DE CONTATOS

## ⏱️ Tempo Estimado: 2 dias

---

## 🎯 OBJETIVO

Criar um sistema completo de gerenciamento de contatos com:
- Lista de contatos com busca avançada e filtros
- Criação e edição de contatos com formulário completo
- Importação em massa via CSV
- Sistema de tags e segmentação
- Histórico de interações e conversas
- Visualização de métricas por contato

---

## 📦 O QUE SERÁ FEITO

### 9.1 Página Principal de Contatos

**Componente:**
```
app/(client)/contatos/page.tsx
```

**Layout:**
- Header com título + botões "Novo Contato" e "Importar CSV"
- Barra de busca global + filtros rápidos
- Grid/Lista de contatos (toggle de visualização)
- Sidebar com estatísticas gerais
- Paginação (25 contatos por página)

**Estatísticas no Header:**
- Total de contatos
- Novos este mês
- Taxa de engajamento
- Tags mais usadas

---

### 9.2 Lista de Contatos

**Componente:**
```
components/contatos/ContactList.tsx
```

**Visualizações:**

**1. Grid View (padrão):**
- Cards com avatar, nome, empresa
- Badges: Tags + status (ativo/inativo)
- Última interação
- Ações rápidas: Editar | Excluir | Mensagem

**2. Table View:**
- Colunas: Avatar | Nome | Email | Telefone | Empresa | Tags | Última interação | Ações
- Ordenação por qualquer coluna
- Seleção múltipla (checkbox)
- Ações em massa: Adicionar tag | Excluir | Exportar

**Card de Contato:**
```typescript
interface ContactCardProps {
  contact: Contact
  view: 'grid' | 'table'
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onMessage: (id: string) => void
}
```

---

### 9.3 Modal de Criar/Editar Contato

**Componente:**
```
components/contatos/ContactModal.tsx
```

**Seções do Formulário:**

**1. Informações Básicas**
- Nome completo (obrigatório)
- Email (validação)
- Telefone (máscara +55)
- WhatsApp (checkbox: "Mesmo que telefone")
- Data de nascimento (date picker)
- Gênero (select: Masculino | Feminino | Outro | Não informar)

**2. Informações Profissionais**
- Empresa
- Cargo
- Website
- LinkedIn

**3. Endereço**
- CEP (busca automática via API)
- Rua
- Número
- Complemento
- Bairro
- Cidade
- Estado (select)
- País

**4. Tags e Segmentação**
- Tags existentes (multi-select)
- Criar nova tag (input + botão)
- Cores personalizadas por tag

**5. Notas**
- Textarea livre
- Histórico de edições
- Última atualização

**Validações:**
- Email único
- Telefone no formato válido
- CEP válido (se preenchido)

**Ações:**
- Salvar
- Salvar e Criar Novo
- Cancelar
- Excluir (se editando)

---

### 9.4 Importação de CSV

**Componente:**
```
components/contatos/ImportCSVModal.tsx
```

**Fluxo:**

**Etapa 1: Upload**
- Drag and drop ou seleção de arquivo
- Validação: Apenas .csv
- Preview das primeiras 5 linhas
- Download de template CSV

**Etapa 2: Mapeamento de Colunas**
- Detecta automaticamente colunas comuns
- Permite mapear manualmente:
  - Coluna CSV → Campo do sistema
- Campos obrigatórios destacados
- Preview da importação

**Etapa 3: Validação**
- Lista de erros encontrados:
  - Emails duplicados
  - Telefones inválidos
  - Campos obrigatórios vazios
- Opções:
  - Ignorar linhas com erro
  - Corrigir e reimportar
  - Importar apenas válidos

**Etapa 4: Importação**
- Progress bar
- Estatísticas em tempo real:
  - Processados: X/Y
  - Importados com sucesso: Z
  - Erros: W
- Relatório final com download

**Template CSV:**
```csv
nome,email,telefone,empresa,cargo,tags
João Silva,joao@example.com,+5511999999999,Empresa X,CEO,"cliente,vip"
Maria Santos,maria@example.com,+5511988888888,Empresa Y,CTO,"lead,tech"
```

---

### 9.5 Sistema de Busca e Filtros

**Componente:**
```
components/contatos/ContactFilters.tsx
```

**Busca Global:**
- Input com ícone de lupa
- Busca em: Nome, Email, Telefone, Empresa, Tags
- Resultados em tempo real (debounce 300ms)
- Highlight dos termos encontrados

**Filtros Rápidos:**
- Todos os contatos
- Adicionados hoje
- Adicionados esta semana
- Adicionados este mês
- Inativos (sem interação há 30+ dias)

**Filtros Avançados (Dropdown):**

1. **Por Tags** (multi-select)
   - Lista de todas as tags
   - Contador de contatos por tag
   - Operador: Qualquer | Todas

2. **Por Status**
   - Ativo
   - Inativo
   - Bloqueado

3. **Por Período de Cadastro**
   - Hoje
   - Esta semana
   - Este mês
   - Últimos 3 meses
   - Personalizado (date range)

4. **Por Última Interação**
   - Última hora
   - Últimas 24h
   - Últimos 7 dias
   - Últimos 30 dias
   - Nunca interagiu

5. **Por Empresa**
   - Lista de empresas únicas
   - Busca inline

**Filtros Ativos:**
- Badges com os filtros aplicados
- Botão "Limpar todos"
- Contador: "Mostrando X de Y contatos"

---

### 9.6 Visualização de Contato Individual

**Componente:**
```
components/contatos/ContactDetails.tsx
```

**Layout:**
- Drawer lateral (abre ao clicar no contato)
- 4 tabs: Perfil | Conversas | Agendamentos | Atividades

**Tab 1: Perfil**
- Avatar grande (com opção de upload)
- Informações completas
- Tags com badge
- Botões de ação:
  - Editar
  - Enviar mensagem
  - Agendar evento
  - Exportar vCard

**Tab 2: Conversas**
- Lista de todas as conversas
- Filtro por canal (WhatsApp | WebChat)
- Ordenação: Mais recente | Mais antiga
- Para cada conversa:
  - Data/hora
  - Canal
  - Resumo (primeiras linhas)
  - Status (aberta | resolvida)
  - Botão: Ver completa

**Tab 3: Agendamentos**
- Lista de eventos com este contato
- Integração com useAgenda
- Filtros: Futuros | Passados | Todos
- Status: Agendado | Realizado | Cancelado
- Botão: Novo agendamento

**Tab 4: Atividades**
- Timeline de todas as interações:
  - Contato criado
  - Informações atualizadas
  - Tags adicionadas/removidas
  - Conversas iniciadas
  - Agendamentos criados
  - Compras realizadas
- Ordenação cronológica reversa

---

### 9.7 Sistema de Tags

**Componente:**
```
components/contatos/TagManager.tsx
```

**Funcionalidades:**
- Criar tag (nome + cor)
- Editar tag (nome e cor)
- Excluir tag (com confirmação)
- Visualizar contatos por tag
- Estatísticas: X contatos com esta tag

**Tags Pré-definidas:**
```typescript
const defaultTags = [
  { id: '1', name: 'Cliente', color: '#00FF88' },
  { id: '2', name: 'Lead', color: '#00B8FF' },
  { id: '3', name: 'VIP', color: '#FFD700' },
  { id: '4', name: 'Interessado', color: '#A855F7' },
  { id: '5', name: 'Cancelado', color: '#EF4444' },
  { id: '6', name: 'Parceiro', color: '#10B981' },
]
```

**Ações em Massa:**
- Selecionar múltiplos contatos
- Adicionar tag a todos
- Remover tag de todos
- Substituir tag

---

### 9.8 Zustand Store para Contatos

**Store:**
```
hooks/useContacts.ts
```

**Estado:**
```typescript
interface Contact {
  id: string
  // Básico
  name: string
  email: string
  phone: string
  whatsapp?: string
  avatar?: string
  birthdate?: Date
  gender?: 'male' | 'female' | 'other' | 'not_specified'

  // Profissional
  company?: string
  position?: string
  website?: string
  linkedin?: string

  // Endereço
  address?: {
    zipCode: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
    country: string
  }

  // Segmentação
  tags: string[]
  status: 'active' | 'inactive' | 'blocked'

  // Notas e histórico
  notes?: string

  // Metadata
  createdAt: Date
  updatedAt: Date
  lastInteraction?: Date
  conversationsCount: number
  appointmentsCount: number
}

interface Tag {
  id: string
  name: string
  color: string
  contactsCount: number
}

interface ContactsStore {
  contacts: Contact[]
  tags: Tag[]
  selectedContact: Contact | null
  searchQuery: string
  filters: {
    tags: string[]
    status: ('active' | 'inactive' | 'blocked')[]
    dateRange?: { start: Date; end: Date }
    lastInteraction?: string
  }
  view: 'grid' | 'table'
  sortBy: 'name' | 'email' | 'company' | 'createdAt' | 'lastInteraction'
  sortOrder: 'asc' | 'desc'

  // Contact actions
  addContact: (contact: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateContact: (id: string, contact: Partial<Contact>) => void
  deleteContact: (id: string) => void
  deleteMultipleContacts: (ids: string[]) => void
  setSelectedContact: (contact: Contact | null) => void

  // Tag actions
  addTag: (tag: Omit<Tag, 'id' | 'contactsCount'>) => void
  updateTag: (id: string, tag: Partial<Tag>) => void
  deleteTag: (id: string) => void
  addTagToContacts: (contactIds: string[], tagId: string) => void
  removeTagFromContacts: (contactIds: string[], tagId: string) => void

  // Search and filter
  setSearchQuery: (query: string) => void
  setFilters: (filters: Partial<ContactsStore['filters']>) => void
  clearFilters: () => void
  getFilteredContacts: () => Contact[]

  // View and sort
  setView: (view: 'grid' | 'table') => void
  setSortBy: (sortBy: ContactsStore['sortBy']) => void
  toggleSortOrder: () => void

  // Import
  importFromCSV: (data: any[]) => { success: number; errors: any[] }
}
```

---

### 9.9 Dados Mock

**Mock de 20 contatos:**
```typescript
const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    phone: '+55 11 99999-9999',
    whatsapp: '+55 11 99999-9999',
    avatar: 'https://i.pravatar.cc/150?img=1',
    birthdate: new Date(1985, 5, 15),
    gender: 'male',
    company: 'Tech Solutions',
    position: 'CEO',
    website: 'https://techsolutions.com',
    tags: ['cliente', 'vip'],
    status: 'active',
    notes: 'Cliente desde 2023. Muito satisfeito com o serviço.',
    createdAt: new Date(2023, 0, 15),
    updatedAt: new Date(2025, 9, 20),
    lastInteraction: new Date(2025, 9, 27),
    conversationsCount: 45,
    appointmentsCount: 12,
  },
  // ... mais 19 contatos
]

const mockTags: Tag[] = [
  { id: '1', name: 'Cliente', color: '#00FF88', contactsCount: 8 },
  { id: '2', name: 'Lead', color: '#00B8FF', contactsCount: 5 },
  { id: '3', name: 'VIP', color: '#FFD700', contactsCount: 3 },
  { id: '4', name: 'Interessado', color: '#A855F7', contactsCount: 4 },
  { id: '5', name: 'Parceiro', color: '#10B981', contactsCount: 2 },
]
```

---

### 9.10 Exportação de Contatos

**Componente:**
```
components/contatos/ExportModal.tsx
```

**Formatos:**
- CSV (compatível com Excel)
- vCard (.vcf) - importável em qualquer agenda
- JSON (para desenvolvedores)

**Opções:**
- Exportar todos os contatos
- Exportar apenas filtrados
- Exportar selecionados
- Escolher campos a exportar

**Preview:**
- Quantidade de contatos
- Tamanho estimado do arquivo
- Campos incluídos

---

## 📂 ARQUIVOS QUE SERÃO CRIADOS

**Página Principal (1 arquivo):**
1. `app/(client)/contatos/page.tsx`

**Componentes de Contatos (12 arquivos):**
2. `components/contatos/ContactList.tsx`
3. `components/contatos/ContactCard.tsx`
4. `components/contatos/ContactModal.tsx`
5. `components/contatos/ContactDetails.tsx`
6. `components/contatos/ContactFilters.tsx`
7. `components/contatos/ImportCSVModal.tsx`
8. `components/contatos/ExportModal.tsx`
9. `components/contatos/TagManager.tsx`
10. `components/contatos/TagBadge.tsx`
11. `components/contatos/ContactStats.tsx`
12. `components/contatos/ActivityTimeline.tsx`
13. `components/contatos/ConversationList.tsx`

**Hook de Estado (1 arquivo):**
14. `hooks/useContacts.ts`

**Utilitários (2 arquivos):**
15. `lib/csv-parser.ts` (funções de parse/export CSV)
16. `lib/vcard-generator.ts` (geração de vCards)

**Total**: 16 arquivos

---

## ✅ CRITÉRIOS DE ACEITE

Ao final da Fase 9, teremos:

- ✅ Lista de contatos com visualização grid e tabela
- ✅ Busca em tempo real funcionando
- ✅ Filtros avançados (tags, status, período, última interação)
- ✅ Criação e edição completa de contatos
- ✅ Sistema de tags com cores personalizadas
- ✅ Importação de CSV com mapeamento de colunas
- ✅ Exportação em 3 formatos (CSV, vCard, JSON)
- ✅ Visualização detalhada por contato (drawer)
- ✅ Timeline de atividades
- ✅ Integração com agenda (lista de agendamentos por contato)
- ✅ 20 contatos mock para demonstração
- ✅ 5 tags pré-definidas
- ✅ Seleção e ações em massa
- ✅ Zustand store gerenciando estado
- ✅ Validações de email e telefone
- ✅ Design responsivo
- ✅ Build sem erros

---

## 🎨 REFERÊNCIAS DE DESIGN

**Inspirações:**
- HubSpot CRM (gestão de contatos)
- Pipedrive (interface limpa e intuitiva)
- Notion Databases (filtros e visualizações)
- Linear (design system e interações)

**Cores por Status:**
- Ativo: #00FF88 (verde neon)
- Inativo: #6B7280 (cinza)
- Bloqueado: #EF4444 (vermelho)

---

## 🔗 DEPENDÊNCIAS

Nenhuma nova dependência externa! Usaremos:
- Zustand (já instalado)
- Framer Motion (já instalado)
- Lucide Icons (já instalado)
- Date-fns (já instalado)

Funcionalidades nativas:
- File API para upload de CSV
- FileReader para leitura de CSV
- Blob para download de arquivos

---

## 📅 EXEMPLO DE USO

1. **Usuário acessa /contatos**
2. **Vê lista de 20 contatos mock** em grid view
3. **Clica em "Novo Contato"** → Abre modal com formulário
4. **Preenche dados**: Nome, Email, Telefone, Empresa, Tags
5. **Salva** → Contato aparece na lista
6. **Usa busca** para encontrar "João Silva"
7. **Clica no card** → Abre drawer com detalhes
8. **Navega pelas tabs**: Perfil | Conversas | Agendamentos | Atividades
9. **Adiciona nova tag** "Premium" com cor dourada
10. **Seleciona 5 contatos** → Adiciona tag "Newsletter" em massa
11. **Clica "Importar CSV"** → Faz upload, mapeia colunas, importa 50 contatos
12. **Usa filtros**: Mostra apenas "Clientes VIP" adicionados "Este mês"
13. **Exporta filtrados** em formato vCard

---

## 🚀 PRÓXIMA FASE

Após conclusão da Fase 9, partiremos para:

**Fase 10: Sistema de Conversas** (3 dias)
- Interface de chat em tempo real
- Lista de conversas ativas
- Suporte a múltiplos canais (WhatsApp, WebChat)
- Marcação de resolvido/pendente
- Transferência entre atendentes
- Notas internas
- Templates de respostas rápidas

---

## 💬 COMO FUNCIONA O PROCESSO

Após aprovação:

1. ✅ Criarei o Zustand store com 20 contatos e 5 tags mock
2. ✅ Implementarei a lista de contatos (grid + table)
3. ✅ Criarei o modal completo de criação/edição
4. ✅ Implementarei busca e filtros avançados
5. ✅ Criarei o sistema de importação CSV
6. ✅ Implementarei visualização detalhada (drawer)
7. ✅ Adicionarei sistema de tags
8. ✅ Implementarei exportação (CSV, vCard, JSON)
9. 📝 Atualizarei o `DEVELOPMENT_LOG.md`
10. 🎯 Marcarei a Fase 9 como concluída no `ROADMAP.md`

---

**⏳ Iniciando Fase 9...**

---

*Data: 2025-10-28*
*Fase: 9/65*
*Tempo estimado: 2 dias*
*Progresso atual: 12% (8/65 fases concluídas)*
