# 📋 PROPOSTA - FASE 6: DASHBOARD CLIENTE

## ⏱️ Tempo Estimado: 3 dias

---

## 🎯 OBJETIVO

Criar um dashboard completo e interativo para o painel do cliente, incluindo:
- Cards de métricas em tempo real
- Gráficos de desempenho (conversas, respostas, horários)
- Status detalhado do WhatsApp
- Sistema de créditos com compra
- Atividades recentes e logs
- Estatísticas de uso de tokens e arquivos

---

## 📦 O QUE SERÁ FEITO

### 6.1 Cards de Métricas em Tempo Real

**Componente:**
```
components/dashboard/MetricsCards.tsx
```

**Métricas (6 cards):**

1. **Conversas Ativas**
   - Ícone: MessageSquare
   - Valor: 12 ativas
   - Variação: +5 desde ontem (+71%)
   - Cor: Verde (positivo)

2. **Total de Contatos**
   - Ícone: Users
   - Valor: 487 contatos
   - Variação: +23 esta semana (+5%)
   - Cor: Verde (positivo)

3. **Taxa de Resposta**
   - Ícone: TrendingUp
   - Valor: 94%
   - Variação: +2% vs. semana passada
   - Cor: Verde (positivo)

4. **Tokens Usados**
   - Ícone: Zap
   - Valor: 45k / 100k
   - Progress bar: 45%
   - Link: "Comprar mais"

5. **Arquivos Usados**
   - Ícone: FileText
   - Valor: 12 / 20
   - Progress bar: 60%
   - Link: "Gerenciar"

6. **Média de Resposta**
   - Ícone: Clock
   - Valor: 2.3 segundos
   - Variação: -0.5s (mais rápido)
   - Cor: Verde (positivo)

**Layout:**
- Grid 3x2 (responsivo para 2x3 em tablet, 1 coluna em mobile)
- Cards com animação de entrada (stagger)
- Hover: scale + glow sutil
- Números animados (counter ao aparecer)

---

### 6.2 Gráficos de Desempenho

**Componente:**
```
components/dashboard/ChartsSection.tsx
components/dashboard/ConversationsChart.tsx
components/dashboard/ResponseTimesChart.tsx
components/dashboard/HourlyActivityChart.tsx
```

**Gráfico 1: Conversas por Dia (Últimos 7 dias)**
- Tipo: Line Chart (área preenchida)
- Eixo X: Seg, Ter, Qua, Qui, Sex, Sáb, Dom
- Eixo Y: Número de conversas
- Dados mock: [23, 34, 28, 45, 38, 41, 52]
- Cor: Gradiente verde neon
- Animação: linha desenha ao aparecer

**Gráfico 2: Tempo de Resposta (Últimos 7 dias)**
- Tipo: Bar Chart
- Eixo X: Dias da semana
- Eixo Y: Segundos
- Dados mock: [2.5, 2.3, 2.8, 2.1, 2.4, 2.2, 2.3]
- Cor: Verde neon
- Meta: linha vermelha em 3s (SLA)

**Gráfico 3: Atividade por Horário (Heatmap)**
- Tipo: Grid heatmap
- Eixo X: 0h às 23h
- Eixo Y: Seg a Dom
- Intensidade: Opacidade do verde neon
- Tooltip: "42 conversas às 14h na Quarta"

**Biblioteca:**
- Usar Recharts (leve e responsivo)
- Instalar: `npm install recharts`

**Layout:**
- Grid 2 colunas (1 coluna em mobile)
- Conversas por dia: 2/3 largura
- Tempo de resposta: 1/3 largura
- Heatmap: largura total abaixo

---

### 6.3 Status Detalhado do WhatsApp

**Componente:**
```
components/dashboard/WhatsAppStatus.tsx
components/dashboard/ConnectionDetails.tsx
```

**Card Status:**
- Badge grande: "Conectado" (verde) ou "Desconectado" (vermelho)
- QR Code exibido se desconectado
- Avatar do número conectado
- Informações:
  - Número: +55 11 99999-9999
  - Nome: Vendra Atendimento
  - Status: Online
  - Última sincronização: Há 2 minutos
  - Bateria: 89% (ícone)
  - Mensagens na fila: 0

**Ações rápidas:**
- Botão: "Desconectar"
- Botão: "Testar Conexão"
- Botão: "Ver Logs"

**Saúde da Conexão:**
- Gráfico mini line chart (últimas 24h)
- Uptime: 99.8%
- Latência média: 120ms

**Layout:**
- Card destacado (maior que os outros)
- Ícone WhatsApp grande no topo
- Informações organizadas em grid
- Animação pulse no badge "Conectado"

---

### 6.4 Sistema de Créditos e Compra

**Componente:**
```
components/dashboard/CreditsWidget.tsx
components/dashboard/BuyCreditsModal.tsx
```

**Widget de Créditos:**

**Seção 1: Uso Atual**
- **Tokens**: 45,000 / 100,000 (45%)
  - Progress bar com gradiente
  - Estimativa: "Restam ~15 dias"
  - Ícone: Zap

- **Arquivos**: 12 / 20 (60%)
  - Progress bar
  - Estimativa: "8 slots disponíveis"
  - Ícone: FileText

**Seção 2: Histórico de Consumo**
- Mini gráfico (últimos 7 dias)
- Média diária: 3,000 tokens
- Pico: 6,500 tokens (terça-feira)

**Botão CTA:**
- "Comprar Mais Créditos" (destaque com glow)
- Abre modal de compra

**Modal de Compra:**

**Tabs:**
1. **Tokens**
   - +500k por R$ 29/mês
   - +1M por R$ 49/mês (15% off - POPULAR)
   - +5M por R$ 199/mês (30% off)

2. **Arquivos**
   - +50 por R$ 19/mês
   - +100 por R$ 29/mês (POPULAR)
   - +500 por R$ 79/mês

3. **Combos**
   - Combo Pro: +1M tokens + 100 arquivos = R$ 69/mês (12% off)
   - Combo Ultra: +5M tokens + 500 arquivos = R$ 249/mês (20% off)

**Pagamento:**
- Stripe: Cartão de crédito
- PIX: QR Code + copia e cola
- Adiciona ao plano existente (cobrança proporcional)

**Layout:**
- Modal centralizado, fundo escuro
- Tabs com indicador visual
- Cards de planos com hover effect
- Badge "POPULAR" nos mais vendidos

---

### 6.5 Atividades Recentes e Logs

**Componente:**
```
components/dashboard/RecentActivity.tsx
components/dashboard/ActivityItem.tsx
```

**Lista de Atividades (últimas 10):**

Cada item mostra:
- Ícone (baseado no tipo)
- Descrição da ação
- Timestamp relativo ("Há 2 minutos")
- Badge de status (sucesso/erro/info)

**Exemplos de atividades:**

1. **Nova conversa iniciada**
   - Ícone: MessageSquare (verde)
   - Descrição: "João Silva iniciou uma conversa"
   - Timestamp: Há 2 minutos
   - Badge: Novo

2. **Resposta automática enviada**
   - Ícone: Bot (azul)
   - Descrição: "IA respondeu sobre horários de atendimento"
   - Timestamp: Há 5 minutos
   - Badge: Automático

3. **Arquivo processado**
   - Ícone: FileCheck (verde)
   - Descrição: "catalogo-produtos.pdf adicionado à base"
   - Timestamp: Há 12 minutos
   - Badge: Sucesso

4. **Erro na conexão**
   - Ícone: AlertTriangle (vermelho)
   - Descrição: "Falha ao enviar mensagem para +55 11 98888-8888"
   - Timestamp: Há 1 hora
   - Badge: Erro
   - Link: "Ver detalhes"

5. **Tokens adquiridos**
   - Ícone: ShoppingCart (verde)
   - Descrição: "+500k tokens adicionados ao plano"
   - Timestamp: Há 2 horas
   - Badge: Compra

6. **Novo contato salvo**
   - Ícone: UserPlus (verde)
   - Descrição: "Maria Oliveira adicionada aos contatos"
   - Timestamp: Há 3 horas
   - Badge: Novo

**Funcionalidades:**
- Link "Ver todos os logs" no final
- Filtro: Todos / Conversas / Erros / Compras
- Auto-refresh a cada 30 segundos
- Animação de entrada (fade in) para novas atividades

**Layout:**
- Lista vertical com scroll
- Altura máxima: 400px
- Hover: background sutil
- Divisor entre items

---

### 6.6 Quick Actions Aprimoradas

**Componente:**
```
components/dashboard/QuickActions.tsx
```

**Ações (6 botões):**

1. **Iniciar Conversa**
   - Ícone: MessageSquarePlus
   - Descrição: "Enviar mensagem manual"
   - Atalho: Ctrl+N

2. **Adicionar Contato**
   - Ícone: UserPlus
   - Descrição: "Importar ou criar contato"
   - Atalho: Ctrl+K

3. **Upload de Arquivo**
   - Ícone: Upload
   - Descrição: "Adicionar à base de conhecimento"
   - Atalho: Ctrl+U

4. **Testar Assistente**
   - Ícone: TestTube
   - Descrição: "Simular conversa"
   - Atalho: Ctrl+T

5. **Ver Relatório**
   - Ícone: FileBarChart
   - Descrição: "Exportar métricas"
   - Atalho: Ctrl+R

6. **Configurações Rápidas**
   - Ícone: Settings
   - Descrição: "Ajustar preferências"
   - Atalho: Ctrl+,

**Layout:**
- Grid 3x2 (responsivo para 2x3)
- Cards com ícone grande
- Hover: scale + glow
- Tooltip mostra atalho do teclado

---

## 📂 ARQUIVOS QUE SERÃO CRIADOS

**Componentes Dashboard (14 arquivos):**
1. `components/dashboard/MetricsCards.tsx`
2. `components/dashboard/MetricCard.tsx` (individual)
3. `components/dashboard/ChartsSection.tsx`
4. `components/dashboard/ConversationsChart.tsx`
5. `components/dashboard/ResponseTimesChart.tsx`
6. `components/dashboard/HourlyActivityChart.tsx`
7. `components/dashboard/WhatsAppStatus.tsx`
8. `components/dashboard/ConnectionDetails.tsx`
9. `components/dashboard/CreditsWidget.tsx`
10. `components/dashboard/BuyCreditsModal.tsx`
11. `components/dashboard/RecentActivity.tsx`
12. `components/dashboard/ActivityItem.tsx`
13. `components/dashboard/QuickActions.tsx`

**Componentes UI Adicionais (2 arquivos):**
14. `components/ui/progress.tsx` (barra de progresso)
15. `components/ui/modal.tsx` (modal genérico)

**Atualização:**
16. `app/(client)/dashboard/page.tsx` (substituir placeholder)
17. `package.json` (adicionar recharts)

**Total**: 17 arquivos

---

## ✅ CRITÉRIOS DE ACEITE

Ao final da Fase 6, teremos:

- ✅ Dashboard funcional com dados mock realistas
- ✅ 6 cards de métricas com animações
- ✅ 3 gráficos interativos (line, bar, heatmap)
- ✅ Status do WhatsApp detalhado
- ✅ Sistema de compra de créditos (modal)
- ✅ Feed de atividades recentes (últimas 10)
- ✅ Quick actions com atalhos de teclado
- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Animações suaves (Framer Motion)
- ✅ Performance otimizada
- ✅ Build sem erros

---

## 📊 DADOS MOCK

Para esta fase, usaremos dados simulados:

**Métricas:**
```typescript
{
  conversasAtivas: 12,
  totalContatos: 487,
  taxaResposta: 94,
  tokensUsados: 45000,
  tokensTotal: 100000,
  arquivosUsados: 12,
  arquivosTotal: 20,
  mediaResposta: 2.3
}
```

**Conversas por dia:**
```typescript
[23, 34, 28, 45, 38, 41, 52]
```

**Atividades:**
- 10 atividades simuladas com tipos variados
- Timestamps realistas
- Mix de sucesso/erro/info

---

## 🎨 REFERÊNCIAS DE DESIGN

**Inspirações:**
- Vercel Analytics (gráficos limpos)
- Stripe Dashboard (métricas claras)
- Linear (animações suaves)
- Plausible (heatmap de horários)

**Componentes de Gráficos:**
- Recharts (biblioteca escolhida)
- Customização com cores neon
- Tooltips estilizados
- Animações ao carregar

**Interatividade:**
- Hover states em todos os elementos
- Tooltips informativos
- Modais para ações complexas
- Feedback visual em ações

---

## 🔗 DEPENDÊNCIAS

**Nova dependência:**
```bash
npm install recharts
```

**Tipo:**
```bash
npm install -D @types/recharts
```

---

## 🚀 PRÓXIMA FASE

Após conclusão da Fase 6, partiremos para:

**Fase 7: Configuração do Assistente** (3 dias)
- Configuração de identidade (nome, avatar, tom)
- Definição de objetivos
- Instruções customizadas
- Regras de negócio
- Parâmetros de IA (temperatura, max tokens)
- Preview em tempo real

---

## ❓ DÚVIDAS/APROVAÇÃO

Antes de começar, preciso confirmar:

1. ✅ **Aprovado para prosseguir com a Fase 6?**
2. ❓ Algum ajuste nas métricas exibidas?
3. ❓ Deseja adicionar ou remover algum gráfico?
4. ❓ Preferências sobre os planos de créditos (preços)?

---

## 💬 COMO FUNCIONA O PROCESSO

Após sua aprovação:

1. ✅ Instalarei o Recharts para os gráficos
2. ✅ Criarei todos os componentes do dashboard
3. ✅ Implementarei o sistema de créditos com modal
4. ✅ Adicionarei o feed de atividades em tempo real
5. 📝 Atualizarei o `DEVELOPMENT_LOG.md` com o progresso
6. 🎯 Marcarei a Fase 6 como concluída no `ROADMAP.md`
7. 📋 Apresentarei a **Proposta da Fase 7** para nova aprovação
8. 🔄 Repetiremos o ciclo até completar todas as 65 fases

---

**⏳ Aguardando sua aprovação para iniciar a Fase 6...**

Digite **"continue"** ou **"APROVADO"** para prosseguir.

Ou solicite modificações caso deseje algum ajuste antes de iniciar.

---

*Data: 2025-10-28*
*Fase: 6/65*
*Tempo estimado: 3 dias*
*Progresso atual: 8% (5/65 fases concluídas)*
