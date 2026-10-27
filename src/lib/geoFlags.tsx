import React from "react";

// Standard ISO 3166-1 alpha-2 country flags
export function getCountryFlag(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  const code = countryCode.toUpperCase();
  try {
    const first = 127397 + code.charCodeAt(0);
    const second = 127397 + code.charCodeAt(1);
    return String.fromCodePoint(first, second);
  } catch {
    return "🌐";
  }
}

// Brazilian States Dictionary
export const BRAZILIAN_STATES: Record<string, { name: string; region: string }> = {
  SP: { name: "São Paulo", region: "Sudeste" },
  RJ: { name: "Rio de Janeiro", region: "Sudeste" },
  MG: { name: "Minas Gerais", region: "Sudeste" },
  RS: { name: "Rio Grande do Sul", region: "Sul" },
  PR: { name: "Paraná", region: "Sul" },
  SC: { name: "Santa Catarina", region: "Sul" },
  BA: { name: "Bahia", region: "Nordeste" },
  PE: { name: "Pernambuco", region: "Nordeste" },
  CE: { name: "Ceará", region: "Nordeste" },
  DF: { name: "Distrito Federal", region: "Centro-Oeste" },
  GO: { name: "Goiás", region: "Centro-Oeste" },
  ES: { name: "Espírito Santo", region: "Sudeste" },
  MT: { name: "Mato Grosso", region: "Centro-Oeste" },
  MS: { name: "Mato Grosso do Sul", region: "Centro-Oeste" },
  PA: { name: "Pará", region: "Norte" },
  AM: { name: "Amazonas", region: "Norte" },
  RN: { name: "Rio Grande do Norte", region: "Nordeste" },
  PB: { name: "Paraíba", region: "Nordeste" },
  AL: { name: "Alagoas", region: "Nordeste" },
  PI: { name: "Piauí", region: "Nordeste" },
  MA: { name: "Maranhão", region: "Nordeste" },
  SE: { name: "Sergipe", region: "Nordeste" },
  RO: { name: "Rondônia", region: "Norte" },
  TO: { name: "Tocantins", region: "Norte" },
  AC: { name: "Acre", region: "Norte" },
  AP: { name: "Amapá", region: "Norte" },
  RR: { name: "Roraima", region: "Norte" },
};

// United States Dictionary
export const US_STATES: Record<string, string> = {
  NY: "New York",
  CA: "California",
  TX: "Texas",
  FL: "Florida",
  IL: "Illinois",
  WA: "Washington",
  MA: "Massachusetts",
  VA: "Virginia",
  GA: "Georgia",
  OH: "Ohio",
  PA: "Pennsylvania",
  NJ: "New Jersey",
  CO: "Colorado",
  AZ: "Arizona",
};

// Global hub state code resolver
export function resolveLocationMetadata(city: string, countryCode: string, stateHint?: string) {
  const normCity = (city || "").toLowerCase();
  const cCode = (countryCode || "").toUpperCase();

  // Brazil mappings
  if (cCode === "BR") {
    if (normCity.includes("são paulo") || normCity.includes("sao paulo") || stateHint === "SP") {
      return { state: "São Paulo", stateCode: "SP", country: "Brasil", flag: "🇧🇷" };
    }
    if (normCity.includes("rio de janeiro") || stateHint === "RJ") {
      return { state: "Rio de Janeiro", stateCode: "RJ", country: "Brasil", flag: "🇧🇷" };
    }
    if (normCity.includes("belo horizonte") || stateHint === "MG") {
      return { state: "Minas Gerais", stateCode: "MG", country: "Brasil", flag: "🇧🇷" };
    }
    if (normCity.includes("curitiba") || stateHint === "PR") {
      return { state: "Paraná", stateCode: "PR", country: "Brasil", flag: "🇧🇷" };
    }
    if (normCity.includes("porto alegre") || stateHint === "RS") {
      return { state: "Rio Grande do Sul", stateCode: "RS", country: "Brasil", flag: "🇧🇷" };
    }
    if (normCity.includes("brasília") || normCity.includes("brasilia") || stateHint === "DF") {
      return { state: "Distrito Federal", stateCode: "DF", country: "Brasil", flag: "🇧🇷" };
    }
    if (normCity.includes("salvador") || stateHint === "BA") {
      return { state: "Bahia", stateCode: "BA", country: "Brasil", flag: "🇧🇷" };
    }
    if (normCity.includes("fortaleza") || stateHint === "CE") {
      return { state: "Ceará", stateCode: "CE", country: "Brasil", flag: "🇧🇷" };
    }
    if (normCity.includes("recife") || stateHint === "PE") {
      return { state: "Pernambuco", stateCode: "PE", country: "Brasil", flag: "🇧🇷" };
    }
    if (normCity.includes("florianópolis") || normCity.includes("florianopolis") || stateHint === "SC") {
      return { state: "Santa Catarina", stateCode: "SC", country: "Brasil", flag: "🇧🇷" };
    }
    return { state: stateHint || "Brasil", stateCode: stateHint || "BR", country: "Brasil", flag: "🇧🇷" };
  }

  // USA mappings
  if (cCode === "US") {
    if (normCity.includes("york") || stateHint === "NY") {
      return { state: "New York", stateCode: "NY", country: "Estados Unidos", flag: "🇺🇸" };
    }
    if (normCity.includes("francisco") || normCity.includes("angeles") || normCity.includes("diego") || stateHint === "CA") {
      return { state: "California", stateCode: "CA", country: "Estados Unidos", flag: "🇺🇸" };
    }
    if (normCity.includes("miami") || normCity.includes("orlando") || stateHint === "FL") {
      return { state: "Florida", stateCode: "FL", country: "Estados Unidos", flag: "🇺🇸" };
    }
    if (normCity.includes("austin") || normCity.includes("houston") || normCity.includes("dallas") || stateHint === "TX") {
      return { state: "Texas", stateCode: "TX", country: "Estados Unidos", flag: "🇺🇸" };
    }
    if (normCity.includes("seattle") || stateHint === "WA") {
      return { state: "Washington", stateCode: "WA", country: "Estados Unidos", flag: "🇺🇸" };
    }
    if (normCity.includes("chicago") || stateHint === "IL") {
      return { state: "Illinois", stateCode: "IL", country: "Estados Unidos", flag: "🇺🇸" };
    }
    if (normCity.includes("ashburn") || normCity.includes("virginia") || stateHint === "VA") {
      return { state: "Virginia", stateCode: "VA", country: "Estados Unidos", flag: "🇺🇸" };
    }
    return { state: stateHint || "EUA", stateCode: stateHint || "US", country: "Estados Unidos", flag: "🇺🇸" };
  }

  // United Kingdom
  if (cCode === "GB") {
    return { state: "Inglaterra", stateCode: "ENG", country: "Reino Unido", flag: "🇬🇧" };
  }

  // Germany
  if (cCode === "DE") {
    if (normCity.includes("frankfurt")) return { state: "Hessen", stateCode: "HE", country: "Alemanha", flag: "🇩🇪" };
    if (normCity.includes("münchen") || normCity.includes("munich")) return { state: "Baviera", stateCode: "BY", country: "Alemanha", flag: "🇩🇪" };
    return { state: "Alemanha", stateCode: "DE", country: "Alemanha", flag: "🇩🇪" };
  }

  // Japan
  if (cCode === "JP") {
    return { state: "Tóquio", stateCode: "TK", country: "Japão", flag: "🇯🇵" };
  }

  // Portugal
  if (cCode === "PT") {
    if (normCity.includes("porto")) return { state: "Porto", stateCode: "PRT", country: "Portugal", flag: "🇵🇹" };
    return { state: "Lisboa", stateCode: "LX", country: "Portugal", flag: "🇵🇹" };
  }

  // France
  if (cCode === "FR") {
    return { state: "Île-de-France", stateCode: "IDF", country: "França", flag: "🇫🇷" };
  }

  // Canada
  if (cCode === "CA") {
    if (normCity.includes("toronto")) return { state: "Ontário", stateCode: "ON", country: "Canadá", flag: "🇨🇦" };
    if (normCity.includes("montreal") || normCity.includes("quebec")) return { state: "Quebec", stateCode: "QC", country: "Canadá", flag: "🇨🇦" };
    return { state: "Canadá", stateCode: "CA", country: "Canadá", flag: "🇨🇦" };
  }

  // Spain
  if (cCode === "ES") {
    if (normCity.includes("barcelona")) return { state: "Catalunha", stateCode: "CAT", country: "Espanha", flag: "🇪🇸" };
    return { state: "Madrid", stateCode: "MD", country: "Espanha", flag: "🇪🇸" };
  }

  // Australia
  if (cCode === "AU") {
    return { state: "Nova Gales do Sul", stateCode: "NSW", country: "Austrália", flag: "🇦🇺" };
  }

  // Singapore
  if (cCode === "SG") {
    return { state: "Singapura", stateCode: "SG", country: "Singapura", flag: "🇸🇬" };
  }

  // Fallback
  return {
    state: city || cCode,
    stateCode: cCode,
    country: cCode,
    flag: getCountryFlag(cCode),
  };
}

// Visual Location Badge Component
export interface LocationBadgeProps {
  countryCode: string;
  countryName?: string;
  cityName?: string;
  stateCode?: string;
  stateName?: string;
  showFlag?: boolean;
  showState?: boolean;
  className?: string;
}

export const LocationBadge: React.FC<LocationBadgeProps> = ({
  countryCode,
  countryName,
  cityName,
  stateCode,
  stateName,
  showFlag = true,
  showState = true,
  className = "",
}) => {
  const meta = resolveLocationMetadata(cityName || "", countryCode, stateCode);
  const flag = getCountryFlag(countryCode);
  const resolvedStateCode = stateCode || meta.stateCode;
  const resolvedCountryName = countryName || meta.country;

  return (
    <span className={`inline-flex items-center space-x-1.5 font-sans ${className}`}>
      {showFlag && (
        <span className="text-sm select-none" title={resolvedCountryName} aria-label={resolvedCountryName}>
          {flag}
        </span>
      )}
      <span className="text-white font-medium text-xs">
        {cityName || resolvedCountryName}
      </span>
      {showState && resolvedStateCode && resolvedStateCode !== countryCode && (
        <span
          title={`Estado / Província: ${stateName || meta.state}`}
          className="px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border text-[10px] text-brand-secondary font-mono font-medium tracking-wider"
        >
          {resolvedStateCode}
        </span>
      )}
    </span>
  );
};
