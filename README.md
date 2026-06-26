# 🍽️ Cardápio Digital

[![GitHub stars](https://img.shields.io/github/stars/manda-vai/cardapio-digital)](https://github.com/manda-vai/cardapio-digital/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/manda-vai/cardapio-digital)](https://github.com/manda-vai/cardapio-digital/issues)
[![GitHub license](https://img.shields.io/github/license/manda-vai/cardapio-digital)](https://github.com/manda-vai/cardapio-digital/blob/main/LICENSE)

Plataforma de **cardápio digital** para restaurantes, lanchonetes e estabelecimentos alimentícios. Pedidos via **WhatsApp** — sem necessidade de checkout ou gateway de pagamento.

## ✨ Funcionalidades

### 🏪 Cardápio Público (`/cardapio/[slug]`)
- Cardápio completo com categorias e busca
- Visualização de itens com fotos, descrição e preços
- Modificadores e variações (tamanhos, adicionais)
- Layout responsivo (mobile-first)
- Dark mode automático

### 🛒 Pedido com WhatsApp (`/pedido/[slug]`)
- Carrinho completo com quantidade e modificadores
- Resumo do pedido com valores totais
- **Geração de mensagem formatada para WhatsApp**
- Sem checkout — envia direto para o WhatsApp do estabelecimento

### ⚙️ Painel Admin (`/admin`)
- **Dashboard** com estatísticas de pedidos e faturamento
- **Gestão de Cardápio** (CRUD): adicionar/editar/remover itens e categorias
- **Configurações da Loja**: nome, WhatsApp, endereço, horários, logo
- **Gestão de Pedidos**: acompanhar status (pendente → preparando → pronto → entregue)

### ♿ Acessibilidade (WCAG AA)
- Navegação por teclado em todos os componentes
- Roles e atributos ARIA (tabs, dialog, switch)
- Focus trap em modais e drawers
- Contraste mínimo 4.5:1
- Suporte a `prefers-reduced-motion`

## 🏗️ Stack

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **Next.js** | 16 (App Router) | Framework full-stack |
| **TypeScript** | Strict | Tipagem segura |
| **Tailwind CSS** | v4 | Estilização utilitária |
| **pnpm** | 11.x | Gerenciador de pacotes |

### Design System
- **Atomic Design**: atoms → molecules → organisms → pages
- **Material Design 3**: tokens de cores, tipografia, elevação, bordas
- **Geist**: tipografia otimizada (Vercel)
- **Lucide**: ícones consistentes

### Arquitetura de Componentes
```
src/
├── app/           ← Páginas (App Router) — atuam como templates/pages
├── components/
│   ├── atoms/     ← Componentes base: Button, Badge, Card, Dialog, Input...
│   ├── molecules/ ← Combinações: SearchBar, MenuItemCard, CategoryTabs...
│   └── organisms/ ← Blocos funcionais: Header, CartDrawer, MenuEditor...
├── data/          ← Dados mock (JSON) — substituível por banco
├── lib/           ← Utilitários: db.ts, utils.ts
└── types/         ← Interfaces TypeScript
```

## 🚀 Começando

```bash
# Instalar dependências
pnpm install

# Rodar em desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Iniciar produção
pnpm start
```

### Acessar
| Página | URL |
|--------|-----|
| Cardápio | https://manda-vai.github.io/cardapio-digital/cardapio/loja-exemplo |
| Pedido | https://manda-vai.github.io/cardapio-digital/pedido/loja-exemplo |
| Admin | https://manda-vai.github.io/cardapio-digital/admin |

## 🔄 Melhoria Contínua

O projeto conta com **4 cronjobs automatizados** que pesquisam e implementam melhorias continuamente:

| Job | Frequência | Descrição |
|-----|-----------|-----------|
| 🔍 **Pesquisa Concorrentes** | Seg 08:00 | Analisa Goomer, MenuDino, iFood, reclamações |
| 💡 **Melhorias Disruptivas** | Qua 10:00 | Propõe funcionalidades inovadoras |
| 🎯 **Análise UX** | Sex 09:00 | Pesquisa Reclame Aqui e redes sociais |
| ⚙️ **Implementação** | Seg 11:00 | Aplica melhorias automaticamente |

## 📄 Licença

MIT
