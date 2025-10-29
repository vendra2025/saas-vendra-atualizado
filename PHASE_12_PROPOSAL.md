# 📊 PROPOSTA - FASE 12: RELATÓRIOS E ANALYTICS

## ⏱️ Tempo Estimado: 3 dias

---

## 🎯 OBJETIVO

Criar um sistema completo de relatórios e analytics com:
- Dashboard de analytics com gráficos interativos
- Relatórios de conversas com métricas detalhadas
- Análise de desempenho de atendimento
- Filtros avançados por período (hoje, 7 dias, 30 dias, custom)
- Exportação de relatórios (PDF, Excel, CSV)
- Métricas de satisfação e NPS

---

## 📦 O QUE SERÁ FEITO

### 12.1 Dashboard de Analytics

**Métricas Principais:**
```typescript
interface AnalyticsMetrics {
  period: 'today' | '7days' | '30days' | 'custom'
  conversations: {
    total: number
    new: number
    resolved: number
    avgResponseTime: number // minutos
    avgResolutionTime: number // horas
  }
  channels: {
    whatsapp: { total: number; percentage: number }
    webchat: { total: number; percentage: number }
  }
  satisfaction: {
    nps: number // -100 a 100
    csat: number // 0 a 5
    totalRatings: number
    distribution: {
      1: number
      2: number
      3: number
      4: number
      5: number
    }
  }
  agents: {
    id: string
    name: string
    conversations: number
    avgResponseTime: number
    satisfaction: number
  }[]
  busyTimes: {
    hour: number // 0-23
    conversations: number
  }[]
}
```

**Gráficos:**
1. **Conversas por Período** - Linha temporal (últimos 30 dias)
2. **Canais de Atendimento** - Gráfico de pizza
3. **Tempo de Resposta** - Barras comparativas por dia
4. **Horários de Pico** - Heatmap 24h
5. **Performance de Atendentes** - Ranking com métricas
6. **Distribuição de Satisfação** - Histograma 1-5 estrelas

### 12.2 Relatórios Detalhados

**Tipos de Relatórios:**

1. **Relatório de Conversas**
   - Total de conversas (novas, em andamento, resolvidas)
   - Tempo médio de primeira resposta
   - Tempo médio de resolução
   - Taxa de resolução
   - Conversas por canal
   - Conversas por tag

2. **Relatório de Atendimento**
   - Conversas por atendente
   - Tempo médio de resposta por atendente
   - Taxa de satisfação por atendente
   - Transferências realizadas
   - Conversas simultâneas (pico)

3. **Relatório de Satisfação**
   - NPS (Net Promoter Score)
   - CSAT (Customer Satisfaction Score)
   - Distribuição de notas
   - Comentários dos clientes
   - Tendência ao longo do tempo

4. **Relatório de Automações**
   - Fluxos mais executados
   - Taxa de sucesso das automações
   - Economia de tempo (estimada)
   - Erros e falhas

### 12.3 Filtros Avançados

**Opções de Filtro:**
- **Período**: Hoje, Últimos 7 dias, Últimos 30 dias, Este mês, Mês passado, Custom
- **Canal**: Todos, WhatsApp, WebChat
- **Status**: Todos, Pendente, Em Andamento, Resolvido
- **Atendente**: Todos ou específico
- **Tags**: Filtrar por tags de contatos
- **Horário**: Filtrar por faixa de horário (comercial, fora de horário)

### 12.4 Exportação

**Formatos:**
- **PDF**: Relatório visual completo com gráficos
- **Excel**: Dados tabulares com múltiplas abas
- **CSV**: Dados brutos para análise externa

**Conteúdo Exportado:**
- Métricas gerais
- Tabelas de dados
- Gráficos (no PDF)
- Timestamp da exportação
- Filtros aplicados

---

## 📂 ARQUIVOS QUE SERÃO CRIADOS

1. `hooks/useAnalytics.ts` - Zustand store com dados mock
2. `components/relatorios/MetricsOverview.tsx` - Cards de métricas principais
3. `components/relatorios/ConversationsChart.tsx` - Gráfico de linha temporal
4. `components/relatorios/ChannelsChart.tsx` - Gráfico de pizza
5. `components/relatorios/ResponseTimesChart.tsx` - Gráfico de barras
6. `components/relatorios/BusyTimesHeatmap.tsx` - Heatmap de horários
7. `components/relatorios/AgentsPerformance.tsx` - Tabela de performance
8. `components/relatorios/SatisfactionChart.tsx` - Distribuição de satisfação
9. `components/relatorios/PeriodFilter.tsx` - Filtros de período
10. `components/relatorios/ExportButton.tsx` - Botão de exportação com dropdown
11. `app/(client)/relatorios/page.tsx` - Página principal
12. `app/(client)/relatorios/conversas/page.tsx` - Relatório de conversas
13. `app/(client)/relatorios/atendimento/page.tsx` - Relatório de atendimento
14. `app/(client)/relatorios/satisfacao/page.tsx` - Relatório de satisfação

**Total**: 14 arquivos

---

## 📊 DADOS MOCK

**30 dias de histórico simulado:**
- 1.247 conversas totais
- 89% taxa de resolução
- 3.2 min tempo médio de primeira resposta
- 2.4h tempo médio de resolução
- NPS: 78 (Excelente)
- CSAT: 4.6/5.0
- 893 avaliações de satisfação

**Distribuição por Canal:**
- WhatsApp: 68% (848 conversas)
- WebChat: 32% (399 conversas)

**Performance de Atendentes (5 atendentes):**
- João: 287 conversas, 2.8 min resposta, 4.7 satisfação
- Maria: 245 conversas, 3.1 min resposta, 4.6 satisfação
- Pedro: 312 conversas, 3.5 min resposta, 4.5 satisfação
- Ana: 198 conversas, 2.9 min resposta, 4.8 satisfação
- Lucas: 205 conversas, 3.0 min resposta, 4.6 satisfação

**Horários de Pico:**
- 9h-11h: 23% das conversas
- 14h-16h: 28% das conversas
- 19h-21h: 18% das conversas

---

## ✅ CRITÉRIOS DE ACEITE

- ✅ Dashboard com 6 gráficos interativos
- ✅ Métricas calculadas corretamente
- ✅ Filtros de período funcionando
- ✅ 4 tipos de relatórios (overview, conversas, atendimento, satisfação)
- ✅ Exportação em 3 formatos (PDF, Excel, CSV)
- ✅ Performance de atendentes com ranking
- ✅ Heatmap de horários de pico
- ✅ NPS e CSAT calculados
- ✅ Gráficos responsivos (Recharts)
- ✅ Interface intuitiva com tabs
- ✅ Build sem erros

---

## 🎨 LAYOUT

**Estrutura da Página:**

```
┌─────────────────────────────────────────────────────────────┐
│ 📊 Relatórios e Analytics              [Filtros] [Exportar] │
├─────────────────────────────────────────────────────────────┤
│ [Hoje] [7 dias] [30 dias] [Este mês] [Custom]              │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│ │1.247    │ │  89%    │ │ 3.2min  │ │ 4.6/5.0 │           │
│ │Conversas│ │Resolução│ │Resposta │ │  CSAT   │           │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
├─────────────────────────────────────────────────────────────┤
│ ┌───────────────────────┐ ┌───────────────────────────┐   │
│ │ Conversas por Período │ │  Canais de Atendimento    │   │
│ │    (Gráfico Linha)    │ │    (Gráfico Pizza)        │   │
│ └───────────────────────┘ └───────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│ ┌───────────────────────┐ ┌───────────────────────────┐   │
│ │  Tempo de Resposta    │ │   Horários de Pico        │   │
│ │   (Gráfico Barras)    │ │      (Heatmap)            │   │
│ └───────────────────────┘ └───────────────────────────┘   │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐│
│ │         Performance de Atendentes (Tabela)             ││
│ └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────────────────┐  │
│ │      Distribuição de Satisfação (Histograma)          │  │
│ └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Tabs de Navegação:**
- Overview (dashboard completo)
- Conversas (relatório detalhado)
- Atendimento (por atendente)
- Satisfação (NPS/CSAT)

---

## 🔗 INTEGRAÇÕES

**Com outros módulos:**
- useConversations: dados de conversas
- useContacts: dados de contatos
- useAutomations: métricas de automações
- useAgenda: eventos de atendimento

---

**⏳ Iniciando Fase 12...**

*Data: 2025-10-29*
*Fase: 12/65*
*Progresso: 18%*
