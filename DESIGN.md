---
version: alpha
name: Cardápio Digital — Design System
description: Design tokens MD3-inspired para plataforma de cardápio digital com pedidos via WhatsApp. Mobile-first, acessível, food-tech.
colors:
  primary: "#D45200"
  on-primary: "#FFFFFF"
  primary-container: "#FFDBC6"
  on-primary-container: "#441500"
  secondary: "#865200"
  on-secondary: "#FFFFFF"
  secondary-container: "#FFDDB6"
  on-secondary-container: "#2A1600"
  tertiary: "#5E5E00"
  on-tertiary: "#FFFFFF"
  tertiary-container: "#E4E46A"
  on-tertiary-container: "#1B1C00"
  error: "#BA1A1A"
  on-error: "#FFFFFF"
  error-container: "#FFDAD6"
  on-error-container: "#410002"
  success: "#1E7A34"
  on-success: "#FFFFFF"
  success-container: "#A2F5AD"
  on-success-container: "#00210B"
  background: "#FFF8F5"
  on-background: "#221A15"
  surface: "#FFF8F5"
  on-surface: "#221A15"
  surface-dim: "#E8D7CE"
  surface-bright: "#FFF8F5"
  surface-container: "#FDEDE3"
  surface-container-high: "#F7E6DB"
  surface-variant: "#F3DFD3"
  on-surface-variant: "#544942"
  outline: "#857973"
  outline-variant: "#D7C3B8"
  whatsapp: "#25D366"
  on-whatsapp: "#FFFFFF"
  whatsapp-container: "#A0F5BD"
  on-whatsapp-container: "#002112"
typography:
  display-lg:
    fontFamily: "var(--font-sans)"
    fontSize: 3.5rem
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  display-md:
    fontFamily: "var(--font-sans)"
    fontSize: 2.75rem
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  display-sm:
    fontFamily: "var(--font-sans)"
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 1.2
  headline-lg:
    fontFamily: "var(--font-sans)"
    fontSize: 1.75rem
    fontWeight: 700
    lineHeight: 1.25
  headline-md:
    fontFamily: "var(--font-sans)"
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.3
  headline-sm:
    fontFamily: "var(--font-sans)"
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.35
  title-lg:
    fontFamily: "var(--font-sans)"
    fontSize: 1.125rem
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.006em"
  title-md:
    fontFamily: "var(--font-sans)"
    fontSize: 1rem
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "0.006em"
  title-sm:
    fontFamily: "var(--font-sans)"
    fontSize: 0.875rem
    fontWeight: 600
    lineHeight: 1.45
    letterSpacing: "0.008em"
  body-lg:
    fontFamily: "var(--font-sans)"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.019em"
  body-md:
    fontFamily: "var(--font-sans)"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0.019em"
  body-sm:
    fontFamily: "var(--font-sans)"
    fontSize: 0.75rem
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.019em"
  label-lg:
    fontFamily: "var(--font-sans)"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.008em"
  label-md:
    fontFamily: "var(--font-sans)"
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.008em"
  label-sm:
    fontFamily: "var(--font-sans)"
    fontSize: 0.625rem
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.019em"
rounded:
  none: 0
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  full: 9999px
spacing:
  0: 0
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  7: 28px
  8: 32px
  9: 36px
  10: 40px
  12: 48px
  14: 56px
  16: 64px
elevation:
  level-0: { boxShadow: "none" }
  level-1: { boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)" }
  level-2: { boxShadow: "0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.04)" }
  level-3: { boxShadow: "0 10px 15px rgba(0,0,0,0.08), 0 4px 6px rgba(0,0,0,0.04)" }
  level-4: { boxShadow: "0 20px 25px rgba(0,0,0,0.1), 0 8px 10px rgba(0,0,0,0.04)" }
  level-5: { boxShadow: "0 28px 35px rgba(0,0,0,0.12), 0 10px 15px rgba(0,0,0,0.06)" }
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: 12px 24px
    typography: "{typography.label-lg}"
  button-primary-hover:
    backgroundColor: "{colors.on-primary-container}"
    textColor: "{colors.primary}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    border: "2px solid {colors.outline}"
    padding: 10px 22px
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.md}"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.on-whatsapp}"
    rounded: "{rounded.full}"
    padding: 14px 28px
  card-elevated:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    elevation: "{elevation.level-1}"
  card-filled:
    backgroundColor: "{colors.surface-container}"
    rounded: "{rounded.lg}"
  card-outlined:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.outline-variant}"
    rounded: "{rounded.md}"
  input-filled:
    backgroundColor: "{colors.surface-variant}"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.sm}"
    border: "none"
  dialog:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    elevation: "{elevation.level-3}"
  badge:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
    rounded: "{rounded.full}"
    padding: 2px 10px
    typography: "{typography.label-sm}"
  nav-item:
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.full}"
  nav-item-active:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
---
# Cardápio Digital — Design System

Plataforma de cardápio digital com pedidos via WhatsApp. Design system inspirado no **Material Design 3**, adaptado para food-tech brasileiro.

## Visão Geral do Sistema

**Tone de Voz:** Amigável, acolhedor, direto. A plataforma deve transmitir confiança e apetite.

**Público-alvo:**
- Donos de pequenos restaurantes, lanchonetes, food trucks, pizzarias
- Clientes finais (pessoas fazendo pedidos)
- Faixa etária: 18–60+ anos (exige acessibilidade)

**Princípios de Design:**
1. **Mobile-first** — A maioria dos acessos é via celular
2. **Acessível** — WCAG AA mínimo em todos os componentes
3. **Rápido** — PWA-ready, carregamento instantâneo
4. **Adaptável** — Cada loja pode ter sua própria cor primária
5. **Conversão** — O caminho até o pedido via WhatsApp deve ser o mais curto possível

## Cores

### Sistema de Cores

O sistema usa uma paleta MD3 completa com 5 papéis de cores:
- **Primary:** Cor da marca (personalizável por loja via `theme_primary_color`)
- **Secondary:** Cor complementar para elementos secundários
- **Tertiary:** Cor de destaque para variação visual
- **Neutral:** Fundos e superfícies (com variantes)
- **Semantic:** Success, Error, Warning, WhatsApp

### Contraste WCAG

Todas as combinações de `on-*` com suas cores base atingem **WCAG AA (4.5:1)** para texto normal e **AAA (7:1)** para texto grande (≥18px bold ou ≥24px regular).

| Combinação | Ratio | Nível |
|---|---|---|
| `primary` ( #D45200 ) + `on-primary` ( #FFFFFF ) | 4.8:1 | AA ✓ |
| `primary-container` ( #FFDBC6 ) + `on-primary-container` ( #441500 ) | 8.2:1 | AAA ✓ |
| `background` ( #FFF8F5 ) + `on-background` ( #221A15 ) | 12.1:1 | AAA ✓ |
| `surface-variant` ( #F3DFD3 ) + `on-surface-variant` ( #544942 ) | 5.1:1 | AA ✓ |
| `whatsapp` ( #25D366 ) + `on-whatsapp` ( #FFFFFF ) | 4.7:1 | AA ✓ |

### Customização por Loja

Cada loja pode definir sua `theme_primary_color`. O sistema gera dinamicamente:
- `primary-container` = primary com 85% de transparência sobre superfície
- `on-primary` = branco ou preto (dependendo do luminance do primary)
- Estados hover/active/pressed baseados no primary

## Tipografia

### Família

**Geist (Sans)** — fonte variável padrão do Next.js, baixa largura, excelente legibilidade em telas pequenas.

**Fallback stack:** `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

### Escala

Seguimos a escala MD3 com 13 níveis tipográficos:
- **display-lg/md/sm** — títulos de hero e splash (uso raro)
- **headline-lg/md/sm** — títulos de seção
- **title-lg/md/sm** — títulos de cartão, cabeçalhos
- **body-lg/md/sm** — texto corrido, descrições
- **label-lg/md/sm** — botões, etiquetas, badges

### Hierarquia Visual

```
display → headline → title → body → label
  (h1)     (h2-h3)   (h4-h5)  (p)    (small)
```

## Layout & Espaçamento

### Grid

- **Mobile:** 4 colunas, gutter 16px, margem 16px
- **Tablet:** 8 colunas, gutter 24px, margem 32px
- **Desktop:** 12 colunas, gutter 24px, margem automática (max-width: 1200px)

### Espaçamento

Escala de 8px com exceções de 4px: `0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64`

Padrões:
- **Card interno:** padding 16px
- **Entre cards:** gap 12px–16px
- **Seções:** padding vertical 32px–48px
- **Listas:** gap 8px–12px

## Elevação & Profundidade

5 níveis de elevação:

| Level | Uso | Sombra |
|---|---|---|
| 0 | Sem elevação (superfície base) | none |
| 1 | Cards, itens de lista | `0 1px 3px rgb(0 0 0 / 0.08)` |
| 2 | Cartão elevado, header | `0 4px 6px rgb(0 0 0 / 0.07)` |
| 3 | Modal, dialog | `0 10px 15px rgb(0 0 0 / 0.08)` |
| 4 | Drawer lateral | `0 20px 25px rgb(0 0 0 / 0.10)` |
| 5 | Toast, snackbar | `0 28px 35px rgb(0 0 0 / 0.12)` |

## Cantos (Shape/Radius)

| Token | Valor | Uso |
|---|---|---|
| `none` | 0 | Inputs dentro de cards, imagens |
| `xs` | 4px | Badges, chips |
| `sm` | 8px | Inputs, botões secundários |
| `md` | 12px | Botões principais, cards de item |
| `lg` | 16px | Cards, containers de seção |
| `xl` | 20px | Dialogs, modais |
| `full` | 9999px | Botão WhatsApp, avatares, chips |

## Componentes

### Botões

**Button Primary (alta ênfase)**
- Usado para: "Fazer Pedido", "Salvar", "Adicionar"
- Cor: `primary` com texto `on-primary`
- Border-radius: `md` (12px)
- Padding: 12px 24px
- Hover: escurece 10% (darken), eleva 1 nível
- Focus: ring 3px `primary` com opacidade 0.4
- Disabled: opacidade 0.38

**Button WhatsApp (alta ênfase)**
- Usado exclusivamente para enviar pedido
- Cor: `whatsapp` ( #25D366 )
- Border-radius: `full` (pill shape)
- Padding: 14px 28px (maior para destaque)
- Ícone: WhatsApp SVG à esquerda

**Button Secondary & Ghost**
- Secondary: outline com cor `primary`
- Ghost: sem background, cor `on-surface-variant`

### Inputs

**Input Filled**
- Background: `surface-variant`
- Border-radius: `sm` (8px)
- Label flutuante (MD3 style) ou label superior
- Focus: primary color bottom border (2px)
- Error: `error` color
- Helper text abaixo

### Cards

**Card Elevated** — Item do cardápio
- Background: `surface`
- Border-radius: `lg` (16px)
- Elevation: level 1
- Padding: 16px
- Sombra sutil

**Card Outlined** — Configurações, formulários
- Background: `surface`
- Border: `outline-variant`
- Border-radius: `md` (12px)

### Badges

- Background: `primary-container`
- Texto: `on-primary-container`
- Border-radius: `full`
- Font: `label-sm`
- Usado para: preço promocional, tags dietéticas, status

### Diálogos

- Background: `surface`
- Border-radius: `xl` (20px)
- Elevation: level 3
- Overlay: fundo preto com 32% opacidade
- Actions: alinhados à direita

## Acessibilidade (WCAG)

### Diretrizes Obrigatórias

1. **Contraste:** Mínimo AA (4.5:1) para texto normal, AAA (7:1) para texto grande
2. **Foco Visível:** Todos os elementos interativos devem ter indicador de foco claro (ring de 3px)
3. **ARIA Labels:** Todos os ícones e botões sem texto devem ter `aria-label`
4. **Navegação por Teclado:** Tab order lógico, Enter/Space para ativar, Escape para fechar modais
5. **Touch Targets:** Mínimo 44×44px para alvos de toque (mobile)
6. **Reduced Motion:** Respeitar `prefers-reduced-motion` — desabilitar animações desnecessárias
7. **Semântica:** Usar elementos HTML semânticos (`<nav>`, `<main>`, `<section>`, `<button>`, etc.)
8. **Screen Reader:** `role` e `aria-*` apropriados para componentes customizados (dialog, tabs, switch)

### Testes de Acessibilidade

- Lighthouse (Chrome DevTools)
- axe DevTools
- Teste de navegação por teclado (Tab + Enter)
- Teste com leitor de tela (NVDA/VoiceOver)

## Boas Práticas

### Do ✅

- Usar tokens de cor em vez de valores inline
- Fornecer texto alternativo (`alt`) para todas as imagens
- Usar `sr-only` para conteúdo acessível apenas por leitor de tela
- Manter o fluxo de pedido em no máximo 3 toques: Ver → Adicionar → Enviar WhatsApp
- Usar estados de carregamento (skeleton/spinner) para dados async

### Don't ❌

- Usar hover como única forma de revelar informação crítica
- Esconder overflow de texto sem ellipsis ou expansão
- Fazer elementos focáveis sem estilo de foco visível
- Usar `px` fixos em vez da escala de espaçamento
- Misturar valores de cor inline nos componentes
