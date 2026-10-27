"use client";

import React, { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { auth } from "@/lib/auth";
import { siteConfig } from "@/config/site";
import { Key, Copy, Check, ShieldCheck, Code, Globe, RefreshCw } from "lucide-react";

export default function SettingsPage() {
  const session = auth.getSession();
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);
  const [openRedirectProtection, setOpenRedirectProtection] = useState(true);
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [apiKey, setApiKey] = useState("ph_live_98a7f4e0c3b211ef893a0242ac120002");

  const trackingSnippet = `<!-- Script de Telemetria ${siteConfig.name} -->
<script
  src="https://edge.phantomx.pro/v1/telemetry.js"
  data-phantom-key="${apiKey}"
  async
></script>`;

  const copyToClipboard = (text: string, type: "key" | "script") => {
    navigator.clipboard.writeText(text);
    if (type === "key") {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    } else {
      setCopiedScript(true);
      setTimeout(() => setCopiedScript(false), 2000);
    }
  };

  const handleGenerateNewKey = () => {
    if (confirm("Gerar uma nova chave invalidará a chave atual imediatamente. Deseja prosseguir?")) {
      const newKey = `ph_live_${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`;
      setApiKey(newKey);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-brand-black">
      <Header
        title="Configurações & Credenciais de Ingestão"
        subtitle="Gerenciamento de chaves de API, regras de integridade e snippet de rastreamento"
      />

      <div className="p-6 space-y-8 max-w-5xl w-full mx-auto font-mono text-xs">
        {/* Organization Information */}
        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 shadow-glow-sm space-y-4">
          <div className="border-b border-brand-border pb-3">
            <h3 className="text-sm font-bold text-white">Organização & Ambiente</h3>
            <p className="text-brand-secondary text-[11px]">
              Dados de identificação do workspace e isolamento multi-tenant
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-brand-muted mb-1 text-[11px]">ORGANIZAÇÃO</label>
              <input
                type="text"
                readOnly
                value={session?.user.organizationName || "Nexora Intelligence Lab"}
                className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-brand-muted mb-1 text-[11px]">OPERADOR ATIVO</label>
              <input
                type="text"
                readOnly
                value={session?.user.email || "admin@phantomx.pro"}
                className="w-full px-3 py-2 bg-brand-black border border-brand-border rounded-lg text-white"
              />
            </div>
          </div>
        </div>

        {/* API Credentials */}
        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 shadow-glow-sm space-y-4">
          <div className="border-b border-brand-border pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white">Chave de Ingestão de API</h3>
              <p className="text-brand-secondary text-[11px]">
                Utilizada para autenticar chamadas server-to-server ou clientes SDK
              </p>
            </div>
            <button
              onClick={handleGenerateNewKey}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-brand-black border border-brand-border text-brand-secondary hover:text-white transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Rotacionar Chave</span>
            </button>
          </div>

          <div>
            <label className="block text-brand-muted mb-1 text-[11px]">API KEY PÚBLICA</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="flex-1 px-3 py-2 bg-brand-black border border-brand-border rounded-lg text-white select-all"
              />
              <button
                onClick={() => copyToClipboard(apiKey, "key")}
                className="px-3.5 py-2 rounded-lg bg-white text-black font-semibold hover:bg-neutral-200 transition flex items-center space-x-1.5"
              >
                {copiedKey ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedKey ? "Copiado!" : "Copiar"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Client Tracking Snippet */}
        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 shadow-glow-sm space-y-4">
          <div className="border-b border-brand-border pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white">Snippet JavaScript de Rastreamento</h3>
              <p className="text-brand-secondary text-[11px]">
                Adicione antes do fechamento da tag <code>&lt;/head&gt;</code> em suas páginas
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(trackingSnippet, "script")}
              className="px-3.5 py-1.5 rounded-lg bg-brand-black border border-brand-border text-white hover:bg-brand-hover transition flex items-center space-x-1.5"
            >
              {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedScript ? "Copiado!" : "Copiar Snippet"}</span>
            </button>
          </div>

          <div className="p-4 rounded-lg bg-brand-black border border-brand-borderSubtle overflow-x-auto">
            <pre className="text-white text-[11px] leading-relaxed">
              <code>{trackingSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Routing Security Policies */}
        <div className="bg-brand-surface border border-brand-border rounded-xl p-6 shadow-glow-sm space-y-4">
          <div className="border-b border-brand-border pb-3">
            <h3 className="text-sm font-bold text-white">Políticas de Segurança e Proteção de Borda</h3>
            <p className="text-brand-secondary text-[11px]">
              Proteção contra open redirects, limitação de requisições e allowlists de destino
            </p>
          </div>

          <div className="space-y-4">
            <label className="flex items-start justify-between cursor-pointer p-3 rounded-lg bg-brand-black border border-brand-borderSubtle">
              <div>
                <div className="text-white font-medium">Bloqueio de Open Redirects</div>
                <div className="text-brand-muted text-[11px] mt-0.5">
                  Garante que o tráfego só possa ser redirecionado para domínios explicitamente
                  cadastrados na sua allowlist de segurança.
                </div>
              </div>
              <input
                type="checkbox"
                checked={openRedirectProtection}
                onChange={(e) => setOpenRedirectProtection(e.target.checked)}
                className="rounded border-brand-border bg-brand-surface text-white focus:ring-0 mt-1"
              />
            </label>

            <label className="flex items-start justify-between cursor-pointer p-3 rounded-lg bg-brand-black border border-brand-borderSubtle">
              <div>
                <div className="text-white font-medium">Rate Limiting de Borda (60 req/min por IP)</div>
                <div className="text-brand-muted text-[11px] mt-0.5">
                  Isola automaticamente IPs que ultrapassem a frequência normal de navegação
                  humana, mitigando raspagem automatizada e ataques L7.
                </div>
              </div>
              <input
                type="checkbox"
                checked={rateLimitEnabled}
                onChange={(e) => setRateLimitEnabled(e.target.checked)}
                className="rounded border-brand-border bg-brand-surface text-white focus:ring-0 mt-1"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
