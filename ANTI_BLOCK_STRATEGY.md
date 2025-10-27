# 🛡️ ESTRATÉGIA ANTI-BLOQUEIO WHATSAPP

## 📋 PROBLEMA IDENTIFICADO

A Meta está aplicando mudanças rigorosas no WhatsApp Business, resultando em **bloqueios e restrições inesperadas**, inclusive em números com API oficial.

---

## 🎯 ESTRATÉGIA MULTI-CAMADA

### 1. Sistema Híbrido Multi-Canal ✅

**Prioridade de Envio:**
```
1º Evolution API (QR Code) → Mais estável, menos restrito
2º Meta API Oficial → Fallback automático
3º WebChat → Sempre disponível (canal próprio)
```

**Vantagens:**
- ✅ Redundância total
- ✅ Evolution API não sofre restrições da Meta
- ✅ WebChat 100% confiável
- ✅ Fallback automático transparente

---

### 2. Rate Limiting Inteligente 🚦

**Limites Implementados:**
```typescript
const LIMITS = {
  messages_per_hour: 60,        // Max 60 msg/hora por número
  delay_between_messages: 3000, // 3s entre mensagens
  max_daily: 1000,              // Max 1000 msg/dia
  burst_limit: 5,               // Max 5 msg seguidas sem delay
};
```

**Regras:**
- ⏱️ Delay mínimo de 3-5s entre mensagens
- 🛑 Pausar automaticamente se detectar warning
- 🔄 Rotação automática entre números (se múltiplos)
- 📊 Monitoramento contínuo de taxa de entrega

---

### 3. Warm-up de Números Novos 🌡️

**Protocolo de Aquecimento:**
```
Dia 1-2:   20 mensagens/dia
Dia 3-5:   50 mensagens/dia
Dia 6-10:  100 mensagens/dia
Dia 11-14: 500 mensagens/dia
Dia 15+:   1000 mensagens/dia (limite máximo)
```

**Implementação:**
- Automatizado no sistema
- Badge visual para cliente saber o status
- Bloqueio automático se tentar ultrapassar

---

### 4. Health Monitoring Proativo 📊

**Sinais de Alerta:**
```typescript
const WARNING_SIGNS = {
  delivery_rate_drop: 0.7,     // Taxa entrega < 70%
  repeated_failures: 5,        // 5 falhas seguidas
  read_rate_drop: 0.5,         // Taxa leitura < 50%
  ban_keywords_detected: true, // Palavras banidas detectadas
};
```

**Ações Automáticas:**
1. 🟡 **Atenção** (taxa < 80%): Notificar cliente
2. 🟠 **Risco** (taxa < 70%): Reduzir velocidade automaticamente
3. 🔴 **Crítico** (taxa < 50%): Pausar conta e notificar urgente

**Dashboard do Cliente:**
```
┌─────────────────────────────────────┐
│ 🟢 Status: Saudável                 │
│ Taxa de entrega: 95%                │
│ Mensagens hoje: 234/1000            │
│ Limite horário: 48/60               │
│ Próximo reset: em 12 minutos        │
└─────────────────────────────────────┘
```

---

### 5. Boas Práticas Obrigatórias 📋

**No Cadastro/Primeira Configuração:**
- ✅ Checkbox: "Li e aceito as políticas do WhatsApp Business"
- ✅ Tutorial obrigatório de boas práticas
- ✅ Exemplos do que fazer e NÃO fazer

**Regras Automáticas do Sistema:**
```
❌ BLOQUEIOS AUTOMÁTICOS:
- Palavras proibidas: "promoção grátis", "ganhe dinheiro", "clique aqui"
- Envio para números não validados
- Mensagens idênticas em massa
- Taxa de bloqueio > 5% (opt-out)

✅ VALIDAÇÕES:
- Opt-in obrigatório antes de enviar
- Validação de número antes do envio
- Personalização mínima (nome do contato)
- Limite de mensagens não respondidas
```

**Palavras/Frases Banidas:**
```
- "grátis", "promoção", "ganhe"
- "clique aqui", "clique no link"
- "oportunidade única", "limitado"
- "compartilhe com amigos"
- URLs encurtadas suspeitas
```

---

### 6. Arquitetura de Fallback 🔄

**Fluxo de Envio:**
```typescript
async function sendMessage(message) {
  // 1. Verificar health do número
  const health = await checkNumberHealth(message.from);

  // 2. Verificar rate limit
  const canSend = await checkRateLimit(message.from);
  if (!canSend.allowed) {
    throw new Error('Rate limit exceeded');
  }

  // 3. Tentar Evolution API (primário)
  try {
    const result = await evolutionAPI.send(message);
    await logSuccess(result);
    return result;
  } catch (error) {

    // 4. Fallback para Meta API
    if (error.code === 'BANNED' || error.code === 'RATE_LIMIT') {
      try {
        const result = await metaAPI.send(message);
        await logSuccess(result, 'fallback_meta');
        return result;
      } catch (metaError) {

        // 5. Último recurso: agendar para depois
        await scheduleRetry(message, '1hour');
        throw new Error('All channels failed, scheduled for retry');
      }
    }
  }
}
```

---

### 7. Múltiplos Números (Opcional) 📱

**Para clientes com alto volume:**
- Cliente pode conectar múltiplos números WhatsApp
- Sistema distribui carga automaticamente (round-robin)
- Se um número bloquear, outros continuam operando
- Dashboard mostra status individual de cada número

**Exemplo:**
```
Número 1: 🟢 Saudável (500/1000 msg hoje)
Número 2: 🟢 Saudável (450/1000 msg hoje)
Número 3: 🟠 Atenção (700/1000 msg hoje) - Reduzindo velocidade
Número 4: 🔴 Pausado (bloqueado temporariamente)
```

---

### 8. Conformidade Meta (Templates) 📝

**Sistema de Templates Aprovados:**
- Cliente cria templates de mensagens
- Admin do SaaS submete para aprovação da Meta
- Só mensagens aprovadas podem ser enviadas em massa
- Templates transacionais liberados (confirmação, notificação)

**Categorias de Mensagens:**
```
1. TRANSACIONAL: Confirmações, notificações (liberado)
2. MARKETING: Promoções (requer aprovação Meta)
3. ATENDIMENTO: Suporte, dúvidas (liberado com limite)
```

---

### 9. Sistema de Opt-in/Opt-out 🔐

**Opt-in (Consentimento):**
- Obrigatório antes de adicionar contato
- Registro de quando/como foi dado o consentimento
- Checkbox no formulário de cadastro
- Log auditável por cliente e Meta

**Opt-out (Remoção):**
- Comando automático: "SAIR", "PARAR", "STOP"
- Link em cada mensagem de marketing
- Remoção imediata da lista
- Bloqueio permanente de reenvio

**Interface:**
```
┌─────────────────────────────────────┐
│ Contato: João Silva                 │
│ ✅ Opt-in: Sim (2025-10-15)         │
│ Origem: Formulário site             │
│ Último envio: 2025-10-26            │
│ Status: Ativo                       │
└─────────────────────────────────────┘
```

---

### 10. Alertas e Notificações 🔔

**Cliente será notificado quando:**
```
🟡 Taxa de entrega < 80%
🟠 Taxa de entrega < 70%
🔴 Número de bloqueios > 3/dia
⚠️ Aproximando limite diário (80% usado)
🚫 Palavras suspeitas detectadas em mensagens
📉 Taxa de resposta caindo
```

**Canais de Notificação:**
- Email
- In-app (dashboard)
- Webhook (opcional)
- WhatsApp (do próprio admin do cliente)

---

## 📚 Documentação e Educação

**Seção "Central de Ajuda":**
```
📖 Como evitar bloqueios no WhatsApp
📖 Política de uso do WhatsApp Business
📖 Boas práticas de mensagens
📖 O que fazer se meu número foi bloqueado
📖 Como recuperar número bloqueado
📖 Entendendo as métricas de saúde
📖 Templates aprovados vs. mensagens livres
```

**Tutoriais em Vídeo:**
- Configuração inicial segura
- Warm-up de número novo
- Interpretando métricas de saúde
- Criando templates eficazes

---

## 🔧 Implementação Técnica

### Dashboard - Card de Status
```tsx
<Card className="border-2" borderColor={healthColor}>
  <div className="flex items-center gap-3">
    {healthStatus === 'healthy' && <CheckCircle className="text-green-500" />}
    {healthStatus === 'warning' && <AlertTriangle className="text-yellow-500" />}
    {healthStatus === 'risk' && <XCircle className="text-red-500" />}

    <div>
      <h3 className="font-bold">Status do Número</h3>
      <Badge color={healthColor}>{healthLabel}</Badge>
    </div>
  </div>

  <div className="mt-4 space-y-2">
    <MetricBar label="Taxa de entrega" value={deliveryRate} target={80} />
    <MetricBar label="Mensagens hoje" value={todayCount} max={dailyLimit} />
    <MetricBar label="Limite horário" value={hourlyCount} max={60} />
  </div>

  {healthStatus !== 'healthy' && (
    <Alert variant="warning" className="mt-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        {recommendations[healthStatus]}
      </AlertDescription>
    </Alert>
  )}
</Card>
```

### Backend - Rate Limiter Service
```typescript
// backend/src/services/rateLimiter.service.ts

import { Redis } from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export const rateLimiterService = {
  async canSendMessage(tenantId: string, phoneNumber: string) {
    const hourKey = `rate:${phoneNumber}:hour:${getCurrentHour()}`;
    const dayKey = `rate:${phoneNumber}:day:${getCurrentDay()}`;

    const [hourCount, dayCount] = await Promise.all([
      redis.get(hourKey),
      redis.get(dayKey),
    ]);

    if (parseInt(hourCount || '0') >= 60) {
      return {
        allowed: false,
        reason: 'hourly_limit',
        resetIn: getMinutesToNextHour()
      };
    }

    if (parseInt(dayCount || '0') >= 1000) {
      return {
        allowed: false,
        reason: 'daily_limit',
        resetIn: getMinutesToNextDay()
      };
    }

    return { allowed: true };
  },

  async incrementCounter(phoneNumber: string) {
    const hourKey = `rate:${phoneNumber}:hour:${getCurrentHour()}`;
    const dayKey = `rate:${phoneNumber}:day:${getCurrentDay()}`;

    await Promise.all([
      redis.incr(hourKey),
      redis.incr(dayKey),
      redis.expire(hourKey, 3600),
      redis.expire(dayKey, 86400),
    ]);
  },

  async getHealth(phoneNumber: string) {
    const stats = await getMessageStats(phoneNumber);

    const deliveryRate = stats.delivered / stats.sent;
    const readRate = stats.read / stats.delivered;
    const blockRate = stats.blocked / stats.sent;

    if (deliveryRate < 0.5 || blockRate > 0.1) {
      return { status: 'critical', score: 0 };
    } else if (deliveryRate < 0.7 || blockRate > 0.05) {
      return { status: 'risk', score: 30 };
    } else if (deliveryRate < 0.8) {
      return { status: 'warning', score: 60 };
    } else {
      return { status: 'healthy', score: 100 };
    }
  },
};
```

---

## ✅ CHECKLIST DE IMPLEMENTAÇÃO

### Fase 1: Fundação (Junto com Backend)
- [ ] Implementar rate limiter service
- [ ] Criar health monitoring service
- [ ] Setup Redis para contadores
- [ ] Middleware de verificação antes de enviar

### Fase 2: Dashboard Cliente
- [ ] Card de status de saúde
- [ ] Métricas em tempo real
- [ ] Alertas visuais
- [ ] Histórico de entregas

### Fase 3: Regras de Negócio
- [ ] Lista de palavras banidas
- [ ] Validação de opt-in/opt-out
- [ ] Sistema de warm-up automático
- [ ] Logs de consentimento

### Fase 4: Fallback e Redundância
- [ ] Implementar fallback Evolution → Meta
- [ ] Sistema de retry inteligente
- [ ] Queue para mensagens falhadas
- [ ] Múltiplos números (opcional)

### Fase 5: Educação
- [ ] Criar central de ajuda
- [ ] Tutorial interativo
- [ ] Vídeos explicativos
- [ ] Emails educativos

---

## 🎯 RESULTADOS ESPERADOS

Com esta estratégia implementada:

✅ **90%+ de uptime** nos envios
✅ **Redução de 95%** em bloqueios
✅ **Transparência total** para o cliente sobre saúde da conta
✅ **Conformidade** com políticas do WhatsApp
✅ **Experiência premium** com múltiplos canais

---

*Última atualização: 2025-10-27*
