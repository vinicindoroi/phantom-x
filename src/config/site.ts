export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  currency: string;
  highlighted?: boolean;
  limits: {
    eventsPerMonth: string;
    domains: number;
    campaigns: number;
    retentionDays: number;
  };
  features: string[];
}

export const siteConfig = {
  name: "Phantom-X",
  title: "Phantom-X — Inteligência, Monitoramento e Roteamento de Tráfego Web",
  description:
    "Monitore acessos, entenda a origem das visitas e acompanhe a atividade das suas campanhas em uma única plataforma, com dados organizados em tempo real.",
  url: "https://phantom-x.io",
  ogImage: "https://phantom-x.io/og.png",
  company: {
    name: "Phantom-X Technologies Inc.",
    supportEmail: "suporte@phantom-x.io",
    salesEmail: "contato@phantom-x.io",
  },
  links: {
    github: "https://github.com/phantom-x/phantom-x",
    docs: "/docs",
    terms: "/terms",
    privacy: "/privacy",
    status: "https://status.phantom-x.io",
  },
  nav: [
    { label: "Funcionalidades", href: "#features" },
    { label: "Como Funciona", href: "#how-it-works" },
    { label: "Demonstração", href: "#demo" },
    { label: "Preços", href: "#pricing" },
  ],
  pricing: [
    {
      id: "starter",
      name: "Starter",
      description: "Para começar a monitorar tráfego com visibilidade essencial.",
      priceMonthly: 149,
      currency: "R$",
      limits: {
        eventsPerMonth: "100.000 eventos/mês",
        domains: 3,
        campaigns: 10,
        retentionDays: 14,
      },
      features: [
        "Monitoramento em tempo real (latência < 50ms)",
        "Até 3 domínios conectados",
        "Detecção de tráfego automatizado básico",
        "Mapa global interativo com geolocalização aproximada",
        "Retenção de eventos por 14 dias",
        "Exportação de dados em CSV",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      description: "Para operações em expansão que exigem inteligência avançada.",
      priceMonthly: 389,
      currency: "R$",
      highlighted: true,
      limits: {
        eventsPerMonth: "1.000.000 eventos/mês",
        domains: 15,
        campaigns: 50,
        retentionDays: 60,
      },
      features: [
        "Tudo do plano Starter",
        "Até 15 domínios ativos e verificados",
        "Roteamento dinâmico baseado em regras de geolocalização e idioma",
        "Classificação avançada de risco (Score 0-100)",
        "Stream SSE para dashboards em tempo real",
        "Suporte prioritário via chat",
      ],
    },
    {
      id: "scale",
      name: "Scale",
      description: "Para equipes e operações de alto volume com suporte dedicado.",
      priceMonthly: 890,
      currency: "R$",
      limits: {
        eventsPerMonth: "10.000.000+ eventos/mês",
        domains: 50,
        campaigns: 250,
        retentionDays: 365,
      },
      features: [
        "Tudo do plano Growth",
        "Até 50 domínios com verificação de DNS e SSL automatizada",
        "API ilimitada para ingestão e webhooks",
        "Retenção de dados por 365 dias",
        "Políticas personalizadas de mitigação e allowlist",
        "SLA de 99.9% e gerente de contas dedicado",
      ],
    },
  ] as PricingPlan[],
};
