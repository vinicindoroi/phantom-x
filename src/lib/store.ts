import {
  Campaign,
  Domain,
  GeoAggregate,
  MetricOverview,
  RiskCategory,
  RoutingRule,
  TrafficEvent,
} from "@/types";

// Global traffic hub definitions
export const GLOBAL_LOCATIONS = [
  { city: "São Paulo", country: "Brasil", code: "BR", lat: -23.5505, lon: -46.6333 },
  { city: "Rio de Janeiro", country: "Brasil", code: "BR", lat: -22.9068, lon: -43.1729 },
  { city: "Nova York", country: "Estados Unidos", code: "US", lat: 40.7128, lon: -74.006 },
  { city: "San Francisco", country: "Estados Unidos", code: "US", lat: 37.7749, lon: -122.4194 },
  { city: "Londres", country: "Reino Unido", code: "GB", lat: 51.5074, lon: -0.1278 },
  { city: "Frankfurt", country: "Alemanha", code: "DE", lat: 50.1109, lon: 8.6821 },
  { city: "Tóquio", country: "Japão", code: "JP", lat: 35.6762, lon: 139.6503 },
  { city: "Paris", country: "França", code: "FR", lat: 48.8566, lon: 2.3522 },
  { city: "Toronto", country: "Canadá", code: "CA", lat: 43.6532, lon: -79.3832 },
  { city: "Sydney", country: "Austrália", code: "AU", lat: -33.8688, lon: 151.2093 },
  { city: "Amsterdã", country: "Holanda", code: "NL", lat: 52.3676, lon: 4.9041 },
  { city: "Singapura", country: "Singapura", code: "SG", lat: 1.3521, lon: 103.8198 },
  { city: "Lisboa", country: "Portugal", code: "PT", lat: 38.7223, lon: -9.1393 },
  { city: "Madrid", country: "Espanha", code: "ES", lat: 40.4168, lon: -3.7038 },
];

const BROWSERS = ["Chrome 124", "Safari 17.4", "Firefox 125", "Edge 124", "HeadlessChrome"];
const OS_LIST = ["Windows 11", "macOS Sonoma", "iOS 17.4", "Android 14", "Linux x86_64"];
const REFERRERS = [
  "https://google.com/search",
  "https://instagram.com",
  "https://facebook.com",
  "https://linkedin.com",
  "https://twitter.com",
  "Direto / Marcador",
  "https://youtube.com",
];

// USER ACCOUNT STORES START AT 100% ZERO FOR NEW ACCOUNTS
let domainsStore: Domain[] = [];
let campaignsStore: Campaign[] = [];
let routingRulesStore: RoutingRule[] = [];
let eventsStore: TrafficEvent[] = [];

// Demo cache for landing page showcase
let demoEventsCache: TrafficEvent[] = [];

function generateDemoEventsPool(count: number = 60): TrafficEvent[] {
  const events: TrafficEvent[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const timeOffset = Math.floor(i * (120000 / count));
    const loc = GLOBAL_LOCATIONS[Math.floor(Math.random() * GLOBAL_LOCATIONS.length)];
    const isBot = Math.random() < 0.12;
    const isSuspicious = !isBot && Math.random() < 0.15;

    const riskScore = isBot
      ? Math.floor(75 + Math.random() * 25)
      : isSuspicious
      ? Math.floor(40 + Math.random() * 30)
      : Math.floor(1 + Math.random() * 25);

    const riskCategory: RiskCategory = isBot ? "bot" : isSuspicious ? "suspicious" : "clean";
    const device = isBot ? "bot" : Math.random() < 0.65 ? "mobile" : "desktop";
    const ipLast = Math.floor(Math.random() * 254) + 1;
    const ipFirst = Math.floor(Math.random() * 190) + 10;
    const rawIp = `${ipFirst}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${ipLast}`;
    const ipMasked = `${ipFirst}.${Math.floor(Math.random() * 250)}.***.***`;

    events.push({
      id: `evt_demo_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}_${i}`,
      timestamp: new Date(now - timeOffset).toISOString(),
      domain: "checkout.phantom-x.io",
      campaignId: "camp_demo",
      campaignName: "Lançamento Q4 — Tráfego Pago",
      ip: rawIp,
      ipMasked,
      country: loc.country,
      countryCode: loc.code,
      city: loc.city,
      latitude: loc.lat + (Math.random() - 0.5) * 0.1,
      longitude: loc.lon + (Math.random() - 0.5) * 0.1,
      device,
      browser: isBot ? "HeadlessChrome / Crawler" : BROWSERS[Math.floor(Math.random() * (BROWSERS.length - 1))],
      os: OS_LIST[Math.floor(Math.random() * OS_LIST.length)],
      referrer: REFERRERS[Math.floor(Math.random() * REFERRERS.length)],
      targetUrl: "https://minhaloja.com/checkout",
      routedTo: isBot ? "https://minhaloja.com/verificacao-seguranca" : "https://minhaloja.com/checkout",
      riskScore,
      riskCategory,
      latencyMs: Math.floor(12 + Math.random() * 38),
      isThreat: isBot || riskScore > 70,
      threatReasons: isBot ? ["Assinatura automatizada Headless"] : [],
    });
  }

  return events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

demoEventsCache = generateDemoEventsPool(80);

export const store = {
  // Reset account completely back to zero
  resetAccountToZero() {
    domainsStore = [];
    campaignsStore = [];
    routingRulesStore = [];
    eventsStore = [];
  },

  // Seed sample data if user explicitly wants to populate test data
  seedAccountDemo() {
    const defaultDom: Domain = {
      id: `dom_${Date.now().toString(36)}`,
      name: "checkout.phantom-x.io",
      status: "active",
      sslStatus: "valid",
      dnsRecords: [
        { type: "CNAME", host: "checkout", expected: "cname.phantom-edge.io", verified: true },
        { type: "TXT", host: "_phantom-challenge", expected: "phantom-verify=894318712", verified: true },
      ],
      eventsCount: 15,
      activeCampaigns: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    domainsStore = [defaultDom];

    campaignsStore = [
      {
        id: `camp_${Date.now().toString(36)}`,
        name: "Campanha Inicial de Teste",
        domainId: defaultDom.id,
        domainName: defaultDom.name,
        status: "active",
        targetUrl: "https://meusite.com/oferta",
        fallbackUrl: "https://meusite.com/seguranca",
        utmSource: "meta",
        utmMedium: "cpc",
        utmCampaign: "teste_borda",
        totalEvents: 15,
        cleanEvents: 14,
        botEvents: 1,
        conversionRate: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    eventsStore = generateDemoEventsPool(15);
  },

  // Overview metrics: 100% zero when account is new
  getOverviewMetrics(): MetricOverview {
    if (eventsStore.length === 0) {
      return {
        activeVisitors: 0,
        totalEvents: 0,
        sessionCount: 0,
        uniqueCountries: 0,
        automatedThreatsBlocked: 0,
        periodGrowth: {
          visitors: 0,
          events: 0,
          sessions: 0,
          threats: 0,
        },
      };
    }

    const totalEvents = eventsStore.length;
    const threats = eventsStore.filter((e) => e.isThreat).length;
    const uniqueCountries = new Set(eventsStore.map((e) => e.countryCode)).size;
    const uniqueSessions = new Set(eventsStore.map((e) => e.ipMasked)).size;

    // Active visitors: non-threat events in the last 15 minutes
    const fifteenMinAgo = Date.now() - 15 * 60 * 1000;
    const recentClean = eventsStore.filter(
      (e) => new Date(e.timestamp).getTime() > fifteenMinAgo && !e.isThreat
    );
    const activeVisitors = Math.max(
      recentClean.length > 0 ? new Set(recentClean.map((e) => e.ipMasked)).size : 1,
      0
    );

    return {
      activeVisitors,
      totalEvents,
      sessionCount: uniqueSessions,
      uniqueCountries,
      automatedThreatsBlocked: threats,
      periodGrowth: {
        visitors: 0,
        events: 0,
        sessions: 0,
        threats: 0,
      },
    };
  },

  getEvents(filter?: {
    limit?: number;
    domain?: string;
    campaignId?: string;
    risk?: RiskCategory;
    country?: string;
    search?: string;
  }): TrafficEvent[] {
    let result = [...eventsStore];

    if (filter?.domain && filter.domain !== "all" && filter.domain !== "Todos os Domínios") {
      result = result.filter((e) => e.domain === filter.domain);
    }
    if (filter?.campaignId && filter.campaignId !== "all") {
      result = result.filter((e) => e.campaignId === filter.campaignId);
    }
    if (filter?.risk && filter.risk !== ("all" as any)) {
      result = result.filter((e) => e.riskCategory === filter.risk);
    }
    if (filter?.country && filter.country !== "all") {
      result = result.filter((e) => e.countryCode === filter.country);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (e) =>
          e.city.toLowerCase().includes(q) ||
          e.country.toLowerCase().includes(q) ||
          e.domain.toLowerCase().includes(q) ||
          e.ipMasked.includes(q) ||
          e.browser.toLowerCase().includes(q)
      );
    }

    const limit = filter?.limit || 50;
    return result.slice(0, limit);
  },

  ingestEvent(payload: {
    domain?: string;
    targetUrl?: string;
    userAgent?: string;
    ip?: string;
    campaignId?: string;
    referrer?: string;
  }): TrafficEvent {
    const loc = GLOBAL_LOCATIONS[Math.floor(Math.random() * GLOBAL_LOCATIONS.length)];
    const ua = payload.userAgent || "Mozilla/5.0";

    const isKnownBot = /bot|crawl|spider|slurp|headless|wget|curl|python-requests|aiohttp|httpx|postman|scrapy|urllib/i.test(ua);
    const riskScore = isKnownBot
      ? Math.floor(80 + Math.random() * 20)
      : Math.floor(5 + Math.random() * 25);
    const riskCategory: RiskCategory = isKnownBot ? "bot" : riskScore > 65 ? "suspicious" : "clean";

    const matchedDomain = payload.domain || domainsStore[0]?.name || "app.phantom-x.io";
    const matchedCampaign = campaignsStore.find((c) => c.id === payload.campaignId) || campaignsStore[0];
    const rawIp = payload.ip || `177.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}.45`;
    const ipMasked = rawIp.replace(/\.\d+\.\d+$/, ".***.***");
    const targetUrl = payload.targetUrl || matchedCampaign?.targetUrl || "https://meusite.com";

    const newEvent: TrafficEvent = {
      id: `evt_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      domain: matchedDomain,
      campaignId: matchedCampaign?.id || "camp_default",
      campaignName: matchedCampaign?.name || "Roteamento Geral",
      ip: rawIp,
      ipMasked,
      country: loc.country,
      countryCode: loc.code,
      city: loc.city,
      latitude: loc.lat,
      longitude: loc.lon,
      device: isKnownBot ? "bot" : "mobile",
      browser: isKnownBot ? "Bot / Crawler" : "Chrome 124",
      os: "Android 14",
      referrer: payload.referrer || "https://google.com",
      targetUrl,
      routedTo: isKnownBot ? "https://minhaloja.com/verificacao-seguranca" : targetUrl,
      riskScore,
      riskCategory,
      latencyMs: Math.floor(14 + Math.random() * 25),
      isThreat: isKnownBot,
      threatReasons: isKnownBot ? ["User-Agent com assinatura automatizada"] : [],
    };

    eventsStore.unshift(newEvent);
    if (eventsStore.length > 500) {
      eventsStore.pop();
    }

    // Update domain and campaign counters
    const dom = domainsStore.find((d) => d.name === matchedDomain);
    if (dom) {
      dom.eventsCount = (dom.eventsCount || 0) + 1;
    }
    if (matchedCampaign) {
      matchedCampaign.totalEvents += 1;
      if (newEvent.isThreat) {
        matchedCampaign.botEvents += 1;
      } else {
        matchedCampaign.cleanEvents += 1;
      }
    }

    return newEvent;
  },

  generateRandomSimulatedEvent(): TrafficEvent {
    const loc = GLOBAL_LOCATIONS[Math.floor(Math.random() * GLOBAL_LOCATIONS.length)];
    const camp = campaignsStore[Math.floor(Math.random() * campaignsStore.length)];
    const isThreat = Math.random() < 0.15;
    const isSusp = !isThreat && Math.random() < 0.15;
    const riskScore = isThreat
      ? Math.floor(82 + Math.random() * 18)
      : isSusp
      ? Math.floor(45 + Math.random() * 25)
      : Math.floor(2 + Math.random() * 28);
    const riskCategory: RiskCategory = isThreat ? "bot" : isSusp ? "suspicious" : "clean";

    const domainName = camp?.domainName || domainsStore[0]?.name || "gateway.phantom-x.io";
    const targetUrl = camp?.targetUrl || "https://seusite.com/destino";

    const event: TrafficEvent = {
      id: `evt_sim_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString(),
      domain: domainName,
      campaignId: camp?.id || "camp_sim",
      campaignName: camp?.name || "Tráfego Simulado",
      ip: `189.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}.12`,
      ipMasked: `189.${Math.floor(Math.random() * 200)}.***.***`,
      country: loc.country,
      countryCode: loc.code,
      city: loc.city,
      latitude: loc.lat + (Math.random() - 0.5) * 0.05,
      longitude: loc.lon + (Math.random() - 0.5) * 0.05,
      device: isThreat ? "bot" : Math.random() < 0.7 ? "mobile" : "desktop",
      browser: isThreat ? "Automated Headless" : BROWSERS[Math.floor(Math.random() * (BROWSERS.length - 1))],
      os: OS_LIST[Math.floor(Math.random() * OS_LIST.length)],
      referrer: REFERRERS[Math.floor(Math.random() * REFERRERS.length)],
      targetUrl,
      routedTo: isThreat ? "https://seusite.com/seguranca" : targetUrl,
      riskScore,
      riskCategory,
      latencyMs: Math.floor(10 + Math.random() * 30),
      isThreat,
      threatReasons: isThreat ? ["Padrão de requisição anômalo"] : [],
    };

    eventsStore.unshift(event);
    if (eventsStore.length > 500) {
      eventsStore.pop();
    }

    const dom = domainsStore.find((d) => d.name === domainName);
    if (dom) {
      dom.eventsCount = (dom.eventsCount || 0) + 1;
    }
    if (camp) {
      camp.totalEvents += 1;
      if (isThreat) camp.botEvents += 1;
      else camp.cleanEvents += 1;
    }

    return event;
  },

  getDomains(): Domain[] {
    return [...domainsStore];
  },

  addDomain(name: string): Domain {
    const cleanName = name.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    const newDomain: Domain = {
      id: `dom_${Date.now().toString(36)}`,
      name: cleanName,
      status: "pending_verification",
      sslStatus: "provisioning",
      dnsRecords: [
        {
          type: "CNAME",
          host: cleanName.split(".")[0],
          expected: "cname.phantom-edge.io",
          verified: false,
        },
        {
          type: "TXT",
          host: "_phantom-challenge",
          expected: `phantom-verify=${Math.floor(Math.random() * 90000000 + 10000000)}`,
          verified: false,
        },
      ],
      eventsCount: 0,
      activeCampaigns: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    domainsStore.push(newDomain);
    return newDomain;
  },

  verifyDomainDNS(domainId: string): Domain | null {
    const domain = domainsStore.find((d) => d.id === domainId);
    if (!domain) return null;

    domain.dnsRecords.forEach((r) => (r.verified = true));
    domain.status = "active";
    domain.sslStatus = "valid";
    domain.updatedAt = new Date().toISOString();
    return { ...domain };
  },

  deleteDomain(domainId: string): boolean {
    const initialLen = domainsStore.length;
    domainsStore = domainsStore.filter((d) => d.id !== domainId);
    return domainsStore.length < initialLen;
  },

  getCampaigns(): Campaign[] {
    return [...campaignsStore];
  },

  createCampaign(data: Partial<Campaign>): Campaign {
    const domain = domainsStore.find((d) => d.id === data.domainId) || domainsStore[0];
    const newCamp: Campaign = {
      id: `camp_${Date.now().toString(36)}`,
      name: data.name || "Nova Campanha",
      domainId: domain ? domain.id : "default",
      domainName: domain ? domain.name : "phantom-x.io",
      status: "active",
      targetUrl: data.targetUrl || "https://seusite.com",
      fallbackUrl: data.fallbackUrl,
      utmSource: data.utmSource,
      utmMedium: data.utmMedium,
      utmCampaign: data.utmCampaign,
      utmTerm: data.utmTerm,
      utmContent: data.utmContent,
      totalEvents: 0,
      cleanEvents: 0,
      botEvents: 0,
      conversionRate: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    campaignsStore.push(newCamp);
    if (domain) {
      domain.activeCampaigns = (domain.activeCampaigns || 0) + 1;
    }
    return newCamp;
  },

  updateCampaign(campaignId: string, data: Partial<Campaign>): Campaign | null {
    const idx = campaignsStore.findIndex((c) => c.id === campaignId);
    if (idx === -1) return null;
    campaignsStore[idx] = {
      ...campaignsStore[idx],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return campaignsStore[idx];
  },

  deleteCampaign(campaignId: string): boolean {
    const initialLen = campaignsStore.length;
    campaignsStore = campaignsStore.filter((c) => c.id !== campaignId);
    return campaignsStore.length < initialLen;
  },

  getRoutingRules(): RoutingRule[] {
    return [...routingRulesStore];
  },

  createRoutingRule(data: Partial<RoutingRule>): RoutingRule {
    const domain = domainsStore.find((d) => d.id === data.domainId) || domainsStore[0];
    const newRule: RoutingRule = {
      id: `rule_${Date.now().toString(36)}`,
      name: data.name || "Nova Regra de Roteamento",
      domainId: domain ? domain.id : "default",
      domainName: domain ? domain.name : "phantom-x.io",
      priority: data.priority || routingRulesStore.length + 1,
      status: "active",
      conditions: data.conditions || { maxRiskScore: 50 },
      destinationUrl: data.destinationUrl || "https://destino.com",
      fallbackUrl: data.fallbackUrl || "https://fallback.com",
      hitsCount: 0,
      createdAt: new Date().toISOString(),
    };
    routingRulesStore.push(newRule);
    return newRule;
  },

  deleteRoutingRule(ruleId: string): boolean {
    const initial = routingRulesStore.length;
    routingRulesStore = routingRulesStore.filter((r) => r.id !== ruleId);
    return routingRulesStore.length < initial;
  },

  getGeoDistribution(): GeoAggregate[] {
    if (eventsStore.length === 0) {
      return [];
    }

    const countryMap = new Map<string, { country: string; code: string; count: number; lat: number; lon: number }>();

    eventsStore.forEach((evt) => {
      const existing = countryMap.get(evt.countryCode);
      if (existing) {
        existing.count += 1;
      } else {
        countryMap.set(evt.countryCode, {
          country: evt.country,
          code: evt.countryCode,
          count: 1,
          lat: evt.latitude,
          lon: evt.longitude,
        });
      }
    });

    const total = eventsStore.length;
    return Array.from(countryMap.values())
      .map((item) => ({
        country: item.country,
        countryCode: item.code,
        eventsCount: item.count,
        percentage: Math.round((item.count / total) * 100),
        latitude: item.lat,
        longitude: item.lon,
      }))
      .sort((a, b) => b.eventsCount - a.eventsCount);
  },

  getTimeSeries(hours: number = 24): { hour: string; events: number; threats: number }[] {
    const result = [];
    const now = new Date();
    for (let i = hours - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 3600000);
      const hourStr = `${d.getHours().toString().padStart(2, "0")}:00`;

      if (eventsStore.length === 0) {
        result.push({ hour: hourStr, events: 0, threats: 0 });
        continue;
      }

      const windowStart = d.getTime() - 1800000;
      const windowEnd = d.getTime() + 1800000;
      const hourEvts = eventsStore.filter((e) => {
        const t = new Date(e.timestamp).getTime();
        return t >= windowStart && t <= windowEnd;
      });

      result.push({
        hour: hourStr,
        events: hourEvts.length,
        threats: hourEvts.filter((e) => e.isThreat).length,
      });
    }
    return result;
  },

  getDeviceStats() {
    if (eventsStore.length === 0) {
      return { desktop: 0, mobile: 0, tablet: 0, bot: 0 };
    }
    const total = eventsStore.length;
    const desktop = eventsStore.filter((e) => e.device === "desktop").length;
    const mobile = eventsStore.filter((e) => e.device === "mobile").length;
    const tablet = eventsStore.filter((e) => e.device === "tablet").length;
    const bot = eventsStore.filter((e) => e.device === "bot" || e.isThreat).length;

    return {
      desktop: Math.round((desktop / total) * 100),
      mobile: Math.round((mobile / total) * 100),
      tablet: Math.round((tablet / total) * 100),
      bot: Math.round((bot / total) * 100),
    };
  },

  // ================= DEMO METHODS FOR LANDING PAGE SHOWCASE =================
  getDemoOverviewMetrics(): MetricOverview {
    return {
      activeVisitors: 218,
      totalEvents: 68420,
      sessionCount: 52190,
      uniqueCountries: 24,
      automatedThreatsBlocked: 3410,
      periodGrowth: {
        visitors: +14.6,
        events: +23.8,
        sessions: +18.2,
        threats: -8.4,
      },
    };
  },

  getDemoEvents(limit: number = 8): TrafficEvent[] {
    return demoEventsCache.slice(0, limit);
  },

  getDemoGeoDistribution(): GeoAggregate[] {
    const demoHubs = [
      { country: "Brasil", code: "BR", eventsCount: 28410, percentage: 41, lat: -23.5505, lon: -46.6333 },
      { country: "Estados Unidos", code: "US", eventsCount: 18920, percentage: 28, lat: 40.7128, lon: -74.006 },
      { country: "Reino Unido", code: "GB", eventsCount: 7120, percentage: 10, lat: 51.5074, lon: -0.1278 },
      { country: "Alemanha", code: "DE", eventsCount: 5410, percentage: 8, lat: 50.1109, lon: 8.6821 },
      { country: "Japão", code: "JP", eventsCount: 3890, percentage: 6, lat: 35.6762, lon: 139.6503 },
      { country: "Portugal", code: "PT", eventsCount: 2710, percentage: 4, lat: 38.7223, lon: -9.1393 },
      { country: "Canadá", code: "CA", eventsCount: 1960, percentage: 3, lat: 43.6532, lon: -79.3832 },
    ];
    return demoHubs.map((h) => ({
      country: h.country,
      countryCode: h.code,
      eventsCount: h.eventsCount,
      percentage: h.percentage,
      latitude: h.lat,
      longitude: h.lon,
    }));
  },

  getDemoTimeSeries(hours: number = 24): { hour: string; events: number; threats: number }[] {
    const result = [];
    const now = new Date();
    for (let i = hours - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 3600000);
      const hourStr = `${d.getHours().toString().padStart(2, "0")}:00`;
      const baseEvents = Math.floor(180 + Math.sin(i / 3) * 60 + Math.random() * 40);
      const threats = Math.floor(baseEvents * 0.08 + Math.random() * 6);
      result.push({
        hour: hourStr,
        events: baseEvents,
        threats,
      });
    }
    return result;
  },
};
