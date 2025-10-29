# ⚡ PROPOSTA - FASE 11: AUTOMAÇÕES E FLUXOS

## ⏱️ Tempo Estimado: 3 dias

---

## 🎯 OBJETIVO

Criar um sistema completo de automações e fluxos visuais com:
- Interface visual de criação de fluxos
- Triggers automáticos (eventos que iniciam o fluxo)
- Condições lógicas (if/else)
- Ações automatizadas (enviar mensagem, criar tarefa, etc.)
- Templates de automação prontos
- Sistema de teste e debug

---

## 📦 O QUE SERÁ FEITO

### 11.1 Sistema de Fluxos Simplificado

**Estrutura de um Fluxo:**
```typescript
interface Flow {
  id: string
  name: string
  description: string
  isActive: boolean
  trigger: Trigger
  actions: Action[]
  createdAt: Date
  updatedAt: Date
  executionCount: number
}

interface Trigger {
  type: 'new_message' | 'keyword' | 'schedule' | 'contact_created' | 'manual'
  config: {
    keyword?: string
    schedule?: string // cron expression
    channels?: ('whatsapp' | 'webchat')[]
  }
}

interface Action {
  id: string
  type: 'send_message' | 'add_tag' | 'assign_agent' | 'create_task' | 'wait' | 'condition'
  config: {
    message?: string
    tagId?: string
    agentId?: string
    taskTitle?: string
    waitMinutes?: number
    condition?: {
      field: string
      operator: 'equals' | 'contains' | 'greater_than'
      value: string
    }
    thenActions?: Action[]
    elseActions?: Action[]
  }
  order: number
}
```

### 11.2 Página Principal de Automações

**Layout:**
- Header com botão "Criar Fluxo"
- Cards de fluxos com status (ativo/inativo)
- Estatísticas: Total de fluxos, Execuções hoje, Taxa de sucesso
- Filtros: Todos, Ativos, Inativos, Templates

### 11.3 Editor de Fluxo Simplificado

**Componentes:**
- TriggerCard: Mostra o gatilho selecionado
- ActionsList: Lista de ações em sequência
- AddActionButton: Adiciona nova ação

**Não faremos drag-and-drop** devido ao tempo - usaremos lista sequencial

### 11.4 Templates de Automação

**5 Templates Prontos:**

1. **Saudação Automática**
   - Trigger: Nova mensagem
   - Action: Enviar saudação

2. **Horário de Atendimento**
   - Trigger: Nova mensagem fora do horário
   - Action: Enviar mensagem de ausência

3. **Distribuição de Atendentes**
   - Trigger: Nova conversa
   - Action: Atribuir ao atendente com menos conversas

4. **Follow-up Automático**
   - Trigger: Conversa resolvida
   - Action: Aguardar 24h → Enviar mensagem de follow-up

5. **Palavras-chave**
   - Trigger: Mensagem contém "preço"
   - Action: Enviar tabela de preços

---

## 📂 ARQUIVOS QUE SERÃO CRIADOS

1. `hooks/useAutomations.ts` - Zustand store
2. `components/automacoes/FlowCard.tsx` - Card de fluxo
3. `components/automacoes/FlowsList.tsx` - Lista de fluxos
4. `components/automacoes/FlowEditor.tsx` - Editor simplificado
5. `components/automacoes/TriggerSelector.tsx` - Seletor de gatilho
6. `components/automacoes/ActionCard.tsx` - Card de ação
7. `components/automacoes/ActionSelector.tsx` - Seletor de ação
8. `components/automacoes/FlowStats.tsx` - Estatísticas
9. `app/(client)/automacoes/page.tsx` - Página principal
10. `app/(client)/automacoes/[id]/page.tsx` - Editor de fluxo

**Total**: 10 arquivos

---

## ✅ CRITÉRIOS DE ACEITE

- ✅ Lista de fluxos com search e filtros
- ✅ Criar/editar/excluir fluxos
- ✅ Ativar/desativar fluxos
- ✅ 5 tipos de triggers
- ✅ 6 tipos de ações
- ✅ 5 templates prontos
- ✅ Estatísticas de execução
- ✅ Interface intuitiva
- ✅ Build sem erros

---

**⏳ Iniciando Fase 11...**

*Data: 2025-10-29*
*Fase: 11/65*
*Progresso: 15%*
