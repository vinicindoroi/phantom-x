# Phantom-X — Plataforma SaaS de Inteligência e Roteamento de Tráfego de Borda

> **Tecnologia, precisão e observabilidade em tempo real.**  
> Desenvolvido com direção artística monocromática minimalista, tipografia Poppins e engenharia de borda com baixa latência.

---

## 1. Visão Geral

O **Phantom-X** é uma plataforma SaaS completa para monitoramento, análise de tráfego, atribuição de campanhas e roteamento condicional inteligente na borda da rede. Ele atua inspecionando requisições HTTP, analisando assinaturas de agentes automatizados (bots/scrapers/crawlers), calculando scores de risco em milissegundos e direcionando o tráfego com base em regras geoespaciais e de integridade.

### Destaques da Plataforma
- **Direção Artística Exclusiva:** Interface 100% monocromática minimalista (`#000000`, `#050505`, `#111111`, `#252525`, `#FFFFFF`), fontes **Poppins** em todos os pesos, modo escuro nativo e alto contraste.
- **Globo Interativo 3D (Three.js):** Renderização de matriz pontilhada terrestre com pontos georreferenciados, rotação suave, iluminação atmosférica e visualização imersiva na headline.
- **Banner Panorâmico de Telemetria:** No dashboard principal, a matriz 2D mundial atua como banner operacional contínuo com zoom contido (sem rolagem acidental da página), nós ativos e pulsos de tráfego em tempo real.
- **Console Operacional Completo:**
  - `/dashboard`: Visão geral com banner do mapa mundial, cards de métricas (iniciam em zero para novas contas), gráficos de 24h e feed de requisições ao vivo.
  - `/dashboard/live`: Monitoramento em stream contínuo com opções de pausa, filtros por risco e detalhamento profundo de cabeçalhos.
  - `/dashboard/map`: Mapa global dedicado com detalhamento por país, volume e latência dos nós PoP.
  - `/dashboard/campaigns`: Gestão de links de aquisição, parâmetros UTM e destinos com proteção contra tráfego suspeito.
  - `/dashboard/domains`: Conexão de domínios customizados, validação de CNAME e desafio TXT com TLS automático.
  - `/dashboard/events`: Explorador de eventos de tráfego com busca, paginação e exportação para CSV.
  - `/dashboard/reports`: Relatórios de tendências, distribuição por canais de aquisição e integridade de tráfego.
  - `/dashboard/settings`: Gerenciamento de chaves de API (`ph_live_...`), snippet JavaScript para rastreamento e políticas de mitigação.
- **Proteção e Filtragem de Tráfego Automatizado:** Heurística de detecção para ferramentas automatizadas (`python-requests`, `aiohttp`, `curl`, `headless`, `selenium`, `puppeteer`, `crawlers`), direcionando bots para páginas de mitigação e mantendo o tráfego limpo para o produto final.
- **Privacidade e LGPD/GDPR:** Mascaramento de IP em tempo de ingestão (`189.45.***.***`), sem cookies invasivos entre domínios.

---

## 2. Tecnologias Utilizadas

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + Google Fonts (Poppins)
- **Visualização 3D:** Three.js
- **Ícones:** Lucide React
- **Empacotador:** pnpm

---

## 3. Como Executar Localmente

### Pré-requisitos
- Node.js (versão 18+)
- pnpm (ou npm / yarn)

### Instalação e Execução

```bash
# Instalar dependências
pnpm install

# Executar em modo de desenvolvimento
pnpm dev

# Construir para produção
pnpm build

# Iniciar servidor de produção
pnpm start -p 3000
```

O sistema estará acessível em `http://localhost:3000`.

---

## 4. Estrutura do Projeto

```
src/
├── app/                      # Rotas e páginas do Next.js
│   ├── api/v1/               # Endpoints REST (collect, stats, events, domains, simulate)
│   ├── dashboard/            # Visão geral, mapa, campanhas, domínios, relatórios
│   ├── login/                # Autenticação de usuários
│   ├── signup/               # Cadastro de contas
│   └── page.tsx              # Landing page do Phantom-X
├── components/
│   ├── dashboard/            # Componentes analíticos e mapa de matriz mundial
│   ├── landing/              # Hero 3D, console preview, diagrama de borda
│   └── ui/                   # Logo Phantom-X, botões, modais
├── config/                   # Configurações globais do sistema
├── lib/                      # Store unificada de telemetria e autenticação
└── types/                    # Tipagens TypeScript completas
```

---

## 5. Licença

Todos os direitos reservados à equipe **Phantom-X**.
