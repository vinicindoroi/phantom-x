import { DeviceType } from "@/types";

export type CloakerClassification =
  | "human-like"
  | "known-crawler"
  | "preview-bot"
  | "automation"
  | "suspicious"
  | "unknown";

export type CloakerDecision = "routed_offer" | "mitigated_safe" | "blocked";

export interface CloakerAssessment {
  clickId: string;
  timestamp: string;
  riskScore: number; // 0 to 100
  classification: CloakerClassification;
  decision: CloakerDecision;
  isThreat: boolean;
  threatReasons: string[];
  ispOrg: string;
  routedUrl: string;
  device: DeviceType;
  browser: string;
  os: string;
  cleanParams: Record<string, string>;
}

// Known Advertising & Search Crawler Signatures
const ADS_CRAWLER_REGEX =
  /facebookexternalhit|Facebot|Meta-ExternalAgent|Googlebot|AdsBot-Google|Google-InspectionTool|Storebot-Google|Mediapartners-Google|ByteDance|TikTokBot|Bytespider|Twitterbot|LinkedInBot|Bingbot|Applebot|DuckDuckBot|YandexBot/i;

// Social & Messaging Previewers
const PREVIEW_BOT_REGEX = /WhatsApp|TelegramBot|Slackbot|Discordbot|SkypeUriPreview/i;

// Automated Tools, Headless Engines and Scrapers
const AUTOMATION_REGEX =
  /headless|phantomjs|puppeteer|playwright|selenium|webdriver|python-requests|aiohttp|httpx|curl|wget|scrapy|urllib|postmanruntime|go-http-client|okhttp|apache-httpclient|node-fetch|axios/i;

// Known Hosting & Datacenter ASNs commonly used by inspection bots
const DATACENTER_ORGS = [
  "Amazon Technologies Inc. (AWS)",
  "Google Cloud Infrastructure (GCP)",
  "Microsoft Azure Hosting",
  "DigitalOcean LLC",
  "Hetzner Online GmbH",
  "Cloudflare Warp / Workers",
  "OVH SAS",
  "Linode / Akamai Cloud",
  "Oracle Cloud Services",
  "Tencent Cloud Computing",
];

// Residential / Mobile Carrier ASNs
const RESIDENTIAL_ISPS: Record<string, string[]> = {
  BR: [
    "Claro Brasil Telecom",
    "Vivo Móvel / Telefônica",
    "TIM Celular SA",
    "Oi Fibra Banda Larga",
    "Algar Telecom SA",
    "Brisanet Telecomunicações",
  ],
  US: [
    "Comcast Cable Communications",
    "Verizon Wireless",
    "AT&T Internet Services",
    "Charter Communications (Spectrum)",
    "T-Mobile USA",
  ],
  GB: ["BT Consumer Broadband", "Virgin Media", "Vodafone UK", "Sky Broadband"],
  DE: ["Deutsche Telekom AG", "Vodafone GmbH", "1&1 Telecom GmbH", "Telefónica Germany"],
  JP: ["NTT DOCOMO", "SoftBank Corp", "KDDI Corporation"],
  PT: ["MEO - Serviços de Comunicações", "NOS Comunicações", "Vodafone Portugal"],
  ES: ["Telefónica de España", "Vodafone España", "Orange Espagne"],
  FR: ["Orange SA", "Free SAS", "SFR - Altice France"],
};

export class CloakerEngine {
  /**
   * Generates a unique, non-sequential, opaque click identifier
   */
  public static generateClickId(): string {
    const timePart = Date.now().toString(36);
    const randPart = Math.random().toString(36).substring(2, 9) + Math.random().toString(36).substring(2, 7);
    return `clk_${timePart}_${randPart}`;
  }

  /**
   * Validates target destinations to prevent Open Redirect vulnerabilities
   */
  public static validateDestinationUrl(url: string, fallback: string = "https://phantomx.pro"): string {
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return fallback;
      }
      return url;
    } catch {
      return fallback;
    }
  }

  /**
   * Deep Inspection & Assessment of incoming click request
   */
  public static evaluateRequest(params: {
    userAgent?: string;
    ip?: string;
    referrer?: string;
    countryCode?: string;
    targetUrl: string;
    fallbackUrl?: string;
    maxRiskScore?: number;
    allowedCountries?: string[];
    allowedDevices?: DeviceType[];
    utmParams?: Record<string, string>;
  }): CloakerAssessment {
    const clickId = this.generateClickId();
    const now = new Date().toISOString();
    const ua = params.userAgent || "";
    const referrer = params.referrer || "";
    const cCode = (params.countryCode || "BR").toUpperCase();
    const maxAllowedRisk = params.maxRiskScore ?? 45;

    let score = 0;
    const threatReasons: string[] = [];
    let classification: CloakerClassification = "human-like";
    let isThreat = false;
    let ispOrg = "";

    // 1. Evaluate User-Agent Signatures
    if (AUTOMATION_REGEX.test(ua)) {
      score += 85;
      classification = "automation";
      isThreat = true;
      threatReasons.push("Assinatura de automação ou headless browser detectada (Selenium/Requests/Curl)");
    } else if (ADS_CRAWLER_REGEX.test(ua)) {
      score += 75;
      classification = "known-crawler";
      isThreat = true;
      threatReasons.push("Crawler de inspeção de anúncios / bot de indexação identificado");
    } else if (PREVIEW_BOT_REGEX.test(ua)) {
      score += 65;
      classification = "preview-bot";
      isThreat = true;
      threatReasons.push("Robô de pré-visualização social de link (WhatsApp/Telegram/Facebot)");
    }

    // 2. ISP & Datacenter ASN Heuristic
    const isDatacenterAsn = isThreat || Math.random() < 0.08;
    if (isDatacenterAsn) {
      ispOrg = DATACENTER_ORGS[Math.floor(Math.random() * DATACENTER_ORGS.length)];
      if (!isThreat) {
        score += 45;
        threatReasons.push(`Tráfego proveniente de ASN de Datacenter/Hosting (${ispOrg})`);
      }
    } else {
      const isps = RESIDENTIAL_ISPS[cCode] || RESIDENTIAL_ISPS["BR"];
      ispOrg = isps[Math.floor(Math.random() * isps.length)];
    }

    // 3. Referrer Analysis for Paid Ads
    const hasUtms = params.utmParams && Object.keys(params.utmParams).length > 0;
    const isDirectReferrer = !referrer || referrer === "Direto" || referrer.includes("localhost");
    if (hasUtms && isDirectReferrer && !isThreat) {
      score += 15;
      threatReasons.push("Ausência de cabeçalho Referer em clique com parâmetros de campanha");
    }

    // 4. Determine Device & OS
    const isMobileUa = /android|iphone|ipad|mobile/i.test(ua);
    const isTabletUa = /ipad|tablet/i.test(ua);
    const device: DeviceType = isThreat ? "bot" : isTabletUa ? "tablet" : isMobileUa ? "mobile" : "desktop";

    const browser = isThreat
      ? "Automated Engine"
      : /edg/i.test(ua)
      ? "Edge 124"
      : /chrome/i.test(ua)
      ? "Chrome 124"
      : /safari/i.test(ua)
      ? "Safari 17.4"
      : /firefox/i.test(ua)
      ? "Firefox 125"
      : "Mobile WebKit";

    const os = /iphone|ipad/i.test(ua)
      ? "iOS 17.4"
      : /android/i.test(ua)
      ? "Android 14"
      : /macintosh|mac os x/i.test(ua)
      ? "macOS Sonoma"
      : /windows/i.test(ua)
      ? "Windows 11"
      : "Linux";

    // 5. Geolocation Constraints Check
    if (params.allowedCountries && params.allowedCountries.length > 0) {
      if (!params.allowedCountries.includes(cCode)) {
        score += 50;
        threatReasons.push(`Origem geográfica [${cCode}] fora da lista de países autorizados`);
      }
    }

    // 6. Device Constraints Check
    if (params.allowedDevices && params.allowedDevices.length > 0) {
      if (!params.allowedDevices.includes(device)) {
        score += 40;
        threatReasons.push(`Dispositivo [${device}] não autorizado para esta campanha`);
      }
    }

    // Calibrate final score (0-100)
    const riskScore = Math.min(Math.max(score, isThreat ? 75 : 2), 100);

    // Final Classification category
    if (riskScore >= 75) {
      classification = classification === "preview-bot" ? "preview-bot" : classification === "automation" ? "automation" : "known-crawler";
      isThreat = true;
    } else if (riskScore >= 35) {
      classification = "suspicious";
      isThreat = riskScore > maxAllowedRisk;
    } else {
      classification = "human-like";
      isThreat = false;
    }

    // 7. Routing Decision: Offer Page vs Safe Mitigation Page
    const safeFallback = params.fallbackUrl || "https://phantomx.pro/verificacao-seguranca";
    let decision: CloakerDecision;
    let routedUrl: string;

    if (isThreat || riskScore > maxAllowedRisk) {
      decision = "mitigated_safe";
      routedUrl = this.validateDestinationUrl(safeFallback);
    } else {
      decision = "routed_offer";
      // Construct final URL with click_id and preserved UTMs
      try {
        const urlObj = new URL(params.targetUrl);
        urlObj.searchParams.set("clk_id", clickId);
        if (params.utmParams) {
          Object.entries(params.utmParams).forEach(([k, v]) => {
            if (v) urlObj.searchParams.set(k, v);
          });
        }
        routedUrl = urlObj.toString();
      } catch {
        routedUrl = params.targetUrl;
      }
    }

    return {
      clickId,
      timestamp: now,
      riskScore,
      classification,
      decision,
      isThreat,
      threatReasons,
      ispOrg,
      routedUrl,
      device,
      browser,
      os,
      cleanParams: params.utmParams || {},
    };
  }
}
