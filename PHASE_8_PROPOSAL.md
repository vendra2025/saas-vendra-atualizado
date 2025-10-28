# 📋 PROPOSTA - FASE 8: AGENDA DE ATENDIMENTOS

## ⏱️ Tempo Estimado: 2 dias

---

## 🎯 OBJETIVO

Criar um sistema completo de agendamentos com calendário interativo, incluindo:
- Calendário visual com navegação por mês/semana/dia
- Criação e edição de eventos/agendamentos
- Visualização de disponibilidade
- Filtros por tipo de evento e status
- Lista de próximos agendamentos
- Sincronização com assistente de IA

---

## 📦 O QUE SERÁ FEITO

### 8.1 Página Principal de Agenda

**Componente:**
```
app/(client)/agenda/page.tsx
```

**Layout:**
- Barra superior: Navegação de data + botão "Novo Agendamento" + filtros
- Visualização: Tabs (Mês | Semana | Dia)
- Sidebar: Lista de próximos agendamentos (5 mais próximos)

---

### 8.2 Calendário Mensal

**Componente:**
```
components/agenda/MonthView.tsx
```

**Funcionalidades:**
- Grid 7x6 (dias da semana × semanas)
- Navegação: Anterior / Hoje / Próximo
- Indicadores visuais:
  - Dia atual: Border neon
  - Dias com eventos: Badge com contador
  - Dias passados: Opacidade reduzida
- Click no dia: Abre modal de novo evento
- Hover no dia: Mostra tooltip com resumo dos eventos

**Eventos no Dia:**
- Até 3 eventos: Exibe cards pequenos
- Mais de 3: "+2 mais" com tooltip

---

### 8.3 Visualização Semanal

**Componente:**
```
components/agenda/WeekView.tsx
```

**Funcionalidades:**
- Grid com 7 colunas (seg-dom)
- Linhas de hora: 00:00 às 23:00
- Eventos posicionados por hora
- Scroll vertical para navegar horários
- Drag and drop para realocar eventos
- Click no slot vazio: Criar evento naquele horário

**Layout:**
- Header: Dias da semana com data
- Body: Timeline com intervalos de 1 hora
- Eventos: Cards coloridos por tipo

---

### 8.4 Visualização Diária

**Componente:**
```
components/agenda/DayView.tsx
```

**Funcionalidades:**
- Timeline detalhada (00:00 - 23:00)
- Intervalos de 30 minutos
- Lista de eventos do dia na sidebar
- Slots disponíveis destacados em verde
- Slots ocupados em vermelho

---

### 8.5 Modal de Criar/Editar Evento

**Componente:**
```
components/agenda/EventModal.tsx
```

**Campos:**

1. **Título do Evento**
   - Input text
   - Max 100 caracteres
   - Obrigatório

2. **Tipo de Evento**
   - Select
   - Opções:
     - Consulta
     - Reunião
     - Demonstração
     - Suporte
     - Follow-up
     - Outro

3. **Data e Hora**
   - Date picker
   - Time picker (início e fim)
   - Duração calculada automaticamente

4. **Cliente**
   - Select com busca
   - Opção: "Novo cliente" (abre modal)
   - Mostra: Nome, telefone, email

5. **Descrição**
   - Textarea
   - Max 500 caracteres
   - Opcional

6. **Lembretes**
   - Checkboxes:
     - 15 minutos antes
     - 1 hora antes
     - 1 dia antes
     - Email + WhatsApp

7. **Status**
   - Select:
     - Agendado (default)
     - Confirmado
     - Realizado
     - Cancelado
     - Remarcado

8. **Cor do Evento**
   - 8 opções de cores
   - Facilita identificação visual

**Ações:**
- Salvar
- Salvar e Enviar Lembrete
- Cancelar
- Deletar (se editando)

---

### 8.6 Lista de Próximos Agendamentos

**Componente:**
```
components/agenda/UpcomingEvents.tsx
```

**Funcionalidades:**
- Lista dos próximos 10 eventos
- Ordenação: Mais próximo primeiro
- Para cada evento:
  - Título
  - Data e hora
  - Cliente (nome + avatar)
  - Status (badge colorido)
  - Botões: Ver detalhes | Editar | Cancelar

**Filtros:**
- Todos
- Hoje
- Esta semana
- Este mês
- Por status (agendado/confirmado/etc)

---

### 8.7 Zustand Store para Agendamentos

**Store:**
```
hooks/useAgenda.ts
```

**Estado:**
```typescript
interface Event {
  id: string
  title: string
  type: 'consulta' | 'reuniao' | 'demo' | 'suporte' | 'followup' | 'outro'
  startDate: Date
  endDate: Date
  clientId?: string
  clientName: string
  clientPhone?: string
  clientEmail?: string
  description?: string
  status: 'agendado' | 'confirmado' | 'realizado' | 'cancelado' | 'remarcado'
  color: string
  reminders: string[]
  createdAt: Date
  updatedAt: Date
}

interface AgendaStore {
  events: Event[]
  selectedDate: Date
  view: 'month' | 'week' | 'day'

  // Actions
  addEvent: (event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateEvent: (id: string, event: Partial<Event>) => void
  deleteEvent: (id: string) => void
  setView: (view: 'month' | 'week' | 'day') => void
  setSelectedDate: (date: Date) => void
  getEventsByDate: (date: Date) => Event[]
  getUpcomingEvents: (limit: number) => Event[]
}
```

---

### 8.8 Filtros e Busca

**Componente:**
```
components/agenda/AgendaFilters.tsx
```

**Filtros:**
- Por tipo de evento (multi-select)
- Por status (multi-select)
- Por período (hoje, semana, mês, personalizado)
- Por cliente (busca)

**Busca:**
- Input text
- Busca em: título, cliente, descrição
- Resultados em tempo real

---

### 8.9 Dados Mock

**Mock de eventos:**
```typescript
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Consulta - João Silva',
    type: 'consulta',
    startDate: new Date(2025, 9, 28, 10, 0), // 28 Out 2025, 10:00
    endDate: new Date(2025, 9, 28, 11, 0),
    clientName: 'João Silva',
    clientPhone: '+55 11 99999-9999',
    description: 'Primeira consulta - dúvidas sobre produto',
    status: 'agendado',
    color: '#00FF88',
    reminders: ['1h'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // ... mais 9 eventos de exemplo
]
```

---

## 📂 ARQUIVOS QUE SERÃO CRIADOS

**Página Principal (1 arquivo):**
1. `app/(client)/agenda/page.tsx`

**Componentes de Agenda (8 arquivos):**
2. `components/agenda/MonthView.tsx`
3. `components/agenda/WeekView.tsx`
4. `components/agenda/DayView.tsx`
5. `components/agenda/EventModal.tsx`
6. `components/agenda/EventCard.tsx`
7. `components/agenda/UpcomingEvents.tsx`
8. `components/agenda/AgendaFilters.tsx`
9. `components/agenda/TimeSlot.tsx`

**Hook de Estado (1 arquivo):**
10. `hooks/useAgenda.ts`

**Componentes UI Adicionais (se necessário):**
11. `components/ui/datepicker.tsx` (date picker)
12. `components/ui/timepicker.tsx` (time picker)

**Total**: 12 arquivos

---

## ✅ CRITÉRIOS DE ACEITE

Ao final da Fase 8, teremos:

- ✅ Calendário com 3 visualizações (mês/semana/dia)
- ✅ Criação e edição de eventos funcionando
- ✅ Modal completo com todos os campos
- ✅ Lista de próximos agendamentos (10 mais próximos)
- ✅ Filtros por tipo, status e período
- ✅ Busca em tempo real
- ✅ Zustand store gerenciando eventos
- ✅ 10 eventos mock para demonstração
- ✅ Indicadores visuais (cores, badges, status)
- ✅ Design responsivo
- ✅ Build sem erros

---

## 🎨 REFERÊNCIAS DE DESIGN

**Inspirações:**
- Google Calendar (layout e UX)
- Calendly (agendamento intuitivo)
- Notion Calendar (design minimalista)
- Linear (animações e interações)

**Paleta de Cores por Tipo:**
- Consulta: #00FF88 (verde neon)
- Reunião: #00B8FF (azul)
- Demonstração: #A855F7 (roxo)
- Suporte: #F59E0B (amarelo)
- Follow-up: #10B981 (verde)
- Outro: #6B7280 (cinza)

---

## 🔗 DEPENDÊNCIAS

Nenhuma nova dependência! Usaremos:
- Zustand (já instalado)
- Framer Motion (já instalado)
- Lucide Icons (já instalado)
- Date-fns (para manipulação de datas - se necessário)

Opcional:
```bash
npm install date-fns
```

---

## 📅 EXEMPLO DE USO

1. **Usuário acessa /agenda**
2. **Vê calendário do mês atual** com eventos destacados
3. **Clica em um dia** → Abre modal "Novo Agendamento"
4. **Preenche os campos**: Título, Tipo, Data/Hora, Cliente, Descrição
5. **Salva** → Evento aparece no calendário
6. **Troca para visualização semanal** → Vê timeline detalhada
7. **Clica em um evento** → Edita ou cancela
8. **Sidebar mostra próximos 10 eventos**
9. **Usa filtros** para ver apenas "Consultas Agendadas"

---

## 🚀 PRÓXIMA FASE

Após conclusão da Fase 8, partiremos para:

**Fase 9: Gestão de Contatos** (2 dias)
- Lista de contatos com busca e filtros
- Criação e edição de contatos
- Importação em massa (CSV)
- Tags e segmentação
- Histórico de conversas

---

## ❓ DÚVIDAS/APROVAÇÃO

Antes de começar, preciso confirmar:

1. ✅ **Aprovado para prosseguir com a Fase 8?**
2. ❓ Algum tipo de evento adicional que deseja incluir?
3. ❓ Preferências sobre os lembretes (apenas WhatsApp, email, ambos)?
4. ❓ Deseja integração com Google Calendar? (pode ser fase futura)

---

## 💬 COMO FUNCIONA O PROCESSO

Após sua aprovação:

1. ✅ Criarei o Zustand store para gerenciar eventos
2. ✅ Implementarei as 3 visualizações de calendário
3. ✅ Criarei o modal completo de eventos
4. ✅ Adicionarei a lista de próximos agendamentos
5. ✅ Implementarei filtros e busca
6. ✅ Adicionarei 10 eventos mock para demonstração
7. 📝 Atualizarei o `DEVELOPMENT_LOG.md` com o progresso
8. 🎯 Marcarei a Fase 8 como concluída no `ROADMAP.md`
9. 📋 Apresentarei a **Proposta da Fase 9** para nova aprovação
10. 🔄 Repetiremos o ciclo até completar todas as 65 fases

---

**⏳ Aguardando sua aprovação para iniciar a Fase 8...**

Digite **"continue"** ou **"APROVADO"** para prosseguir.

Ou solicite modificações caso deseje algum ajuste antes de iniciar.

---

*Data: 2025-10-28*
*Fase: 8/65*
*Tempo estimado: 2 dias*
*Progresso atual: 11% (7/65 fases concluídas)*
