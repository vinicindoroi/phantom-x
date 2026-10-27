"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "pt" | "en" | "es";

export interface Translations {
  nav: {
    features: string;
    howItWorks: string;
    demo: string;
    pricing: string;
    signIn: string;
    getStarted: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    startFree: string;
    explore: string;
    latency: string;
    cluster: string;
    cleanTraffic: string;
  };
  demo: {
    title: string;
    subtitle: string;
    demoEnv: string;
    createAccount: string;
    matrixTitle: string;
    filterBy: string;
    clickToFilter: string;
  };
}

const translations: Record<Language, Translations> = {
  pt: {
    nav: {
      features: "Funcionalidades",
      howItWorks: "Como Funciona",
      demo: "Demonstração",
      pricing: "Preços",
      signIn: "Entrar",
      getStarted: "Começar grátis",
    },
    hero: {
      eyebrow: "DUPLA CAMADA DE PROTEÇÃO & INTELIGÊNCIA",
      titleLine1: "Todo o seu tráfego.",
      titleLine2: "Sob controle global.",
      subtitle:
        "Bots, moderadores e acessos indesejados são identificados antes de tocar suas páginas. Roteamento inteligente na borda em menos de 18ms.",
      startFree: "Começar grátis",
      explore: "Como funciona",
      latency: "Latência de Borda: 18ms",
      cluster: "Cluster Global: 14 PoPs Ativos",
      cleanTraffic: "99.98% Tráfego Limpo",
    },
    demo: {
      title: "A interface em ação.",
      subtitle: "Monitore acessos, telemetria de requisições e atividade de rede em tempo real.",
      demoEnv: "Ambiente Demonstrativo",
      createAccount: "Criar Conta Gratuita",
      matrixTitle: "MATRIZ DE TELEMETRIA GLOBAL EM TEMPO REAL",
      filterBy: "Filtrando por",
      clickToFilter: "Passe o cursor sobre os pontos ou clique para filtrar",
    },
  },
  en: {
    nav: {
      features: "Features",
      howItWorks: "How It Works",
      demo: "Demo",
      pricing: "Pricing",
      signIn: "Sign In",
      getStarted: "Get Started",
    },
    hero: {
      eyebrow: "DUAL-LAYER PROTECTION & INTELLIGENCE",
      titleLine1: "All your traffic.",
      titleLine2: "Under global control.",
      subtitle:
        "Bots, reviewers, and unwanted visitors filtered before touching your pages. Intelligent edge routing executed in under 18ms.",
      startFree: "Get Started Free",
      explore: "How it works",
      latency: "Edge Latency: 18ms",
      cluster: "Global Cluster: 14 Active PoPs",
      cleanTraffic: "99.98% Clean Traffic",
    },
    demo: {
      title: "The interface in action.",
      subtitle: "Monitor accesses, request telemetry, and network activity in real time.",
      demoEnv: "Demo Environment",
      createAccount: "Create Free Account",
      matrixTitle: "GLOBAL REAL-TIME TELEMETRY MATRIX",
      filterBy: "Filtering by",
      clickToFilter: "Hover over dots or click to filter",
    },
  },
  es: {
    nav: {
      features: "Funcionalidades",
      howItWorks: "Cómo Funciona",
      demo: "Demostración",
      pricing: "Precios",
      signIn: "Iniciar Sesión",
      getStarted: "Comenzar gratis",
    },
    hero: {
      eyebrow: "DOBLE CAPA DE PROTECCIÓN E INTELIGENCIA",
      titleLine1: "Todo su tráfico.",
      titleLine2: "Bajo control global.",
      subtitle:
        "Bots, revisores y visitas no deseadas filtrados antes de tocar sus páginas. Enrutamiento inteligente en el borde en menos de 18ms.",
      startFree: "Comenzar gratis",
      explore: "Cómo funciona",
      latency: "Latencia de Borde: 18ms",
      cluster: "Cluster Global: 14 PoPs Activos",
      cleanTraffic: "99.98% Tráfico Limpio",
    },
    demo: {
      title: "La interfaz en acción.",
      subtitle: "Supervise accesos, telemetría de solicitudes y actividad de red en tiempo real.",
      demoEnv: "Ambiente Demostrativo",
      createAccount: "Crear Cuenta Gratuita",
      matrixTitle: "MATRIZ DE TELEMETRÍA GLOBAL EN TIEMPO REAL",
      filterBy: "Filtrando por",
      clickToFilter: "Pase el cursor sobre los puntos o haga clic para filtrar",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "pt",
  setLanguage: () => {},
  t: translations.pt,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("phantom_lang") as Language;
    if (saved && (saved === "pt" || saved === "en" || saved === "es")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("phantom_lang", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
