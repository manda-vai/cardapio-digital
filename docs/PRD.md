# PRD: Cardápio Digital — Plataforma SaaS

**Versão:** 1.0
**Data:** 26/06/2026
**Autor:** Product Manager
**Status:** Implementado (v0.1.0)

---

## 1. Problema

Restaurantes pequenos e médios não têm cardápio digital próprio. Usam plataformas como iFood que cobram até 27% por pedido, não têm controle sobre a experiência do cliente e dependem totalmente da plataforma.

**Evidência:**
- 68% dos restaurantes brasileiros não têm presença digital própria (SEBRAE 2025)
- Ticket médio no iFood: R$ 45 com taxa de R$ 12 para o restaurante
- Lojas pequenas faturam R$ 8-15k/mês, perdendo R$ 1.500-3.000 só em taxas

**Oportunidade:** Criar uma plataforma onde restaurantes tenham seu próprio cardápio digital, recebam pedidos via WhatsApp (sem taxa), e futuramente processem pagamentos diretos.

---

## 2. Meta

**North Star Metric:** Lojas ativas recebendo pedidos via WhatsApp

| Métrica | Baseline | Target 30 dias | Target 90 dias |
|---------|----------|----------------|----------------|
| Lojas cadastradas | 0 | 10 | 50 |
| Lojas com cardápio completo | 0 | 5 | 25 |
| Pedidos recebidos via WhatsApp | 0 | 100 | 1.000 |
| Tempo para primeira loja publicar | — | < 30 min | < 15 min |

---

## 3. Usuários

### Dono de restaurante (buyer)
- Idade: 25-55 anos
- Dono de hamburgueria, pizzaria, lanchonete, food truck
- Faturamento: R$ 8-50k/mês
- Dor: taxas altas do iFood, falta de controle
- Necessidade: cardápio próprio, pedidos sem taxa, presença digital

### Cliente final (end user)
- Idade: 18-45 anos
- Faz pedidos via celular
- Necessidade: ver cardápio, montar pedido, enviar para WhatsApp

---

## 4. User Stories

### MUST (MVP)

| # | Story | AC |
|---|-------|-----|
| 1 | **Cadastro de loja** — Como dono, quero cadastrar minha loja para ter meu cardápio digital | Dado email/senha/nome → loja criada → redirect para admin |
| 2 | **Login** — Como dono, quero acessar minha loja com email e senha | Dado credenciais válidas → acesso ao admin da minha loja |
| 3 | **Gerenciar cardápio** — Como dono, quero adicionar/editar/remover itens e categorias | CRUD completo com modificador(es) e preços |
| 4 | **Cardápio público** — Como cliente, quero ver o cardápio da loja | Página `/cardapio/{slug}` com busca, categorias, preços |
| 5 | **Montar pedido** — Como cliente, quero adicionar itens ao carrinho | Carrinho com quantidade, modificadores, notas |
| 6 | **Enviar WhatsApp** — Como cliente, quero enviar o pedido formatado para o WhatsApp | Botão gera texto e abre WhatsApp com mensagem |

### SHOULD (v1.1)

| # | Story | AC |
|---|-------|-----|
| 7 | **Customização visual** — Como dono, quero escolher a cor da minha loja | Cor primária aplicada ao cardápio público |
| 8 | **Upload de fotos** — Como dono, quero adicionar fotos aos itens | Upload via Supabase Storage |
| 9 | **Gestão de pedidos** — Como dono, quero ver e atualizar status dos pedidos | Lista com filtros, status: recebido → preparando → pronto → entregue |
| 10 | **Configurações da loja** — Como dono, quero editar dados da loja | Nome, WhatsApp, endereço, horários, logo |

### COULD (v2.0+)

| # | Story | AC |
|---|-------|-----|
| 11 | Pagamento integrado | Checkout no site, PIX/cartão |
| 12 | Acompanhamento de pedido | Status em tempo real para o cliente |
| 13 | Domínio próprio | `burger.meuapp.com` |
| 14 | Programa de fidelidade | Pontos por compra |
| 15 | Analytics avançado | Horário pico, item mais vendido, ticket médio |

---

## 5. Requisitos MoSCoW

### Must Have
- [x] Cadastro de loja (onboarding)
- [x] Login por loja (multi-tenant)
- [x] CRUD cardápio (categorias, itens, modificadores)
- [x] Cardápio público (responsivo, mobile-first)
- [x] Carrinho de pedidos
- [x] Envio via WhatsApp
- [x] Acessibilidade WCAG AA

### Should Have
- [ ] Customização visual (cor primária por loja)
- [ ] Upload de fotos (Supabase Storage)
- [ ] Gestão de pedidos (status, filtros)
- [ ] Configurações da loja (dados, horários)
- [ ] Dashboard com métricas

### Could Have
- [ ] Pagamento integrado
- [ ] Acompanhamento em tempo real
- [ ] Domínio próprio
- [ ] Programa de fidelidade
- [ ] Analytics avançado

### Won't Have (neste ciclo)
- App nativo (iOS/Android)
- Integração com iFood/Rappi
- Multi-idioma
- Marketplace entre lojas

---

## 6. Stack

| Camada | Tecnologia | Justificativa |
|--------|------------|---------------|
| Frontend | Next.js 16 (App Router) | SSR/SSG, React 19, Server Components |
| UI | Tailwind CSS v4 + Atomic Design | Design system consistente |
| Backend | Supabase (PostgreSQL + Auth + Storage) | Multi-tenant RLS, auth pronto |
| Deploy | Vercel | Zero-config, edge functions |
| WhatsApp | URL scheme (`wa.me/?text=`) | Sem custo, sem API |

---

## 7. Restrições

- **Budget:** R$ 0 (Vercel free tier + Supabase free tier)
- **Prazo:** MVP funcional em 2 semanas
- **Equipe:** 1 dev full-stack
- **Dados:** Iniciais via seed, posteriormente via admin

---

## 8. Rollout

### Fase 1 — MVP (Semana 1-2)
- [x] Onboarding + Auth multi-tenant
- [x] CRUD cardápio
- [x] Cardápio público
- [x] Pedido via WhatsApp
- [ ] Deploy em produção
- [ ] Onboarding de 3 lojas beta

### Fase 2 — v1.1 (Semana 3-4)
- [ ] Customização visual
- [ ] Upload de fotos
- [ ] Gestão de pedidos
- [ ] Dashboard com métricas

### Fase 3 — v2.0 (Mês 2-3)
- [ ] Pagamento integrado
- [ ] Acompanhamento de pedido
- [ ] Analytics

### Rollback Criteria
- Se < 30% das lojas cadastro concluído em 7 dias → investigar UX do onboarding
- Se < 50% dos pedidos enviados via WhatsApp → investigar fluxo de checkout
- Se error rate > 5% → rollback para versão anterior

---

## 9. O que NÃO estamos fazendo

- **App nativo** — Web-first, PWA depois
- **Integração com plataformas** — iFood, Rappi são concorrentes, não parceiros
- **Multi-idioma** — Foco no Brasil
- **Marketplace** — Cada loja é independente
- **Pagamento no MVP** — WhatsApp é o diferencial, sem taxas

---

## 10. Métricas de Sucesso

### Gate 1 (Semana 2)
- [ ] 3 lojas beta cadastradas
- [ ] 10 pedidos enviados via WhatsApp
- [ ] NPS > 8 dos donos de loja

### Gate 2 (Mês 1)
- [ ] 10 lojas ativas
- [ ] 100 pedidos/mês
- [ ] Tempo médio para publicar < 30 min

### Gate 3 (Mês 3)
- [ ] 50 lojas ativas
- [ ] 1.000 pedidos/mês
- [ ] Receita > R$ 0 (primeiro pagamento integrado)