"use client";

import React, { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import {
  UserCheck,
  ShieldAlert,
  ArrowRight,
  Zap,
  Lock,
  Globe2,
  CheckCircle2,
  Cpu,
  Fingerprint,
} from "lucide-react";

export const RoutingDiagram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"all" | "human" | "bot">("all");

  return (
    <div className="relative w-full max-w-5xl mx-auto py-8 px-4 select-none font-sans">
      {/* Outer Obsidian Frame with Ambient Glow */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#12141c]/90 via-[#0a0c10]/95 to-[#020203] border border-white/10 p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden ring-1 ring-white/5">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-40 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/4 w-80 h-40 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />

        {/* Header HUD / Ingress Bar */}
        <div className="flex flex-wrap items-center justify-between pb-6 border-b border-white/10 gap-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-white">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="font-semibold tracking-wider">PIPELINE DE BORDA PHANTOM-X</span>
            </div>
            <span className="text-xs font-mono text-brand-muted hidden sm:inline">
              Edge Telemetry & Real-Time Filtering
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 bg-black/60 border border-white/10 p-1 rounded-xl text-xs font-mono">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 rounded-lg transition ${
                activeTab === "all"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-brand-muted hover:text-white"
              }`}
            >
              Fluxo Completo
            </button>
            <button
              onClick={() => setActiveTab("human")}
              className={`px-3 py-1 rounded-lg transition flex items-center space-x-1 ${
                activeTab === "human"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-brand-muted hover:text-white"
              }`}
            >
              <span>Visitante Real</span>
            </button>
            <button
              onClick={() => setActiveTab("bot")}
              className={`px-3 py-1 rounded-lg transition flex items-center space-x-1 ${
                activeTab === "bot"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-brand-muted hover:text-white"
              }`}
            >
              <span>Crawlers & Bots</span>
            </button>
          </div>
        </div>

        {/* 3-Stage Pipeline: Ingress -> Central Neural Engine -> Outbound Routing */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* STAGE 1: INGRESSO MULTI-CANAL (Left 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[11px] font-mono text-brand-muted uppercase tracking-wider flex items-center space-x-1.5">
              <Globe2 className="w-3.5 h-3.5 text-white" />
              <span>1. Origens de Tráfego</span>
            </div>

            {/* Ingress Card 1: Comprador / Visitante */}
            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                activeTab === "all" || activeTab === "human"
                  ? "bg-[#10131c] border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.06)]"
                  : "bg-black/40 border-white/5 opacity-40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white font-semibold">
                  TRÁFEGO PAGO
                </span>
                <span className="text-[10px] font-mono text-white">4G/5G / WiFi</span>
              </div>
              <div className="text-xs font-bold text-white">Visitante Humano Real</div>
              <div className="text-[11px] text-brand-muted mt-1 leading-snug">
                Meta Ads, TikTok, Google Search. Dispositivo móvel/desktop residencial.
              </div>
            </div>

            {/* Ingress Card 2: Bots / Inspecionadores */}
            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                activeTab === "all" || activeTab === "bot"
                  ? "bg-[#10131c] border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.06)]"
                  : "bg-black/40 border-white/5 opacity-40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300 font-semibold">
                  INSPEÇÃO
                </span>
                <span className="text-[10px] font-mono text-neutral-400">Datacenter ASN</span>
              </div>
              <div className="text-xs font-bold text-neutral-200">Bots & Review Crawlers</div>
              <div className="text-[11px] text-brand-muted mt-1 leading-snug">
                Google-InspectionTool, Facebot, ByteSpider, headless scrapers.
              </div>
            </div>
          </div>

          {/* STAGE 2: PHANTOM-X CORE PROCESSOR (Center 6 cols) */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-6 rounded-3xl bg-black/60 border border-white/15 shadow-inner">
            {/* Animated Radar Concentric Circles */}
            <div className="absolute w-48 h-48 rounded-full border border-white/10 animate-ping pointer-events-none opacity-20" />
            <div className="absolute w-64 h-64 rounded-full border border-white/5 pointer-events-none" />

            {/* Central Vault with Logo */}
            <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-b from-[#181a24] to-[#08090d] border border-white/30 p-2 shadow-[0_0_40px_rgba(255,255,255,0.18)] flex items-center justify-center group hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-2xl bg-black/80 flex items-center justify-center p-3 border border-white/10">
                <Logo size={62} className="filter drop-shadow-[0_0_14px_rgba(255,255,255,0.8)]" />
              </div>
            </div>

            {/* Processor Title */}
            <div className="relative z-10 mt-4 text-center">
              <span className="font-mono text-sm font-bold text-white tracking-widest uppercase">
                Motor de Decisão em Borda
              </span>
              <p className="text-xs text-brand-secondary mt-0.5 font-sans">
                Inspeção de Assinatura, ASN e Risco em &lt; 14ms
              </p>
            </div>

            {/* Live Real-Time Telemetry Tags */}
            <div className="relative z-10 mt-4 grid grid-cols-2 gap-2 w-full max-w-sm text-[11px] font-mono">
              <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center space-x-2">
                <Fingerprint className="w-3.5 h-3.5 text-white shrink-0" />
                <span className="text-brand-secondary truncate">Click ID Assinado</span>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center space-x-2">
                <Zap className="w-3.5 h-3.5 text-white shrink-0" />
                <span className="text-brand-secondary truncate">Latência &lt; 18ms</span>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center space-x-2">
                <Cpu className="w-3.5 h-3.5 text-white shrink-0" />
                <span className="text-brand-secondary truncate">ASN IP Filtering</span>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 flex items-center space-x-2">
                <Lock className="w-3.5 h-3.5 text-white shrink-0" />
                <span className="text-brand-secondary truncate">Anti-Open Redirect</span>
              </div>
            </div>
          </div>

          {/* STAGE 3: DESTINOS AUTORIZADOS (Right 3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[11px] font-mono text-brand-muted uppercase tracking-wider flex items-center space-x-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
              <span>3. Entrega Determinística</span>
            </div>

            {/* Destination 1: Página de Oferta (Conversão) */}
            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                activeTab === "all" || activeTab === "human"
                  ? "bg-[#10131c] border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.06)]"
                  : "bg-black/40 border-white/5 opacity-40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/15 text-white font-semibold">
                  ROTA DE OFERTA
                </span>
                <span className="text-[10px] font-mono text-white flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                  <span>Liberado</span>
                </span>
              </div>
              <div className="text-xs font-bold text-white">Página de Conversão</div>
              <div className="text-[11px] text-brand-muted mt-1 leading-snug">
                Checkout direto com preservação integral de UTMs e Click ID atribuído.
              </div>
            </div>

            {/* Destination 2: Safe Page (Proteção & Compliance) */}
            <div
              className={`p-3.5 rounded-2xl border transition-all ${
                activeTab === "all" || activeTab === "bot"
                  ? "bg-[#10131c] border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.06)]"
                  : "bg-black/40 border-white/5 opacity-40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/15 text-neutral-300 font-semibold">
                  ROTA SEGURA
                </span>
                <span className="text-[10px] font-mono text-neutral-400 flex items-center space-x-1">
                  <ShieldAlert className="w-3 h-3 text-neutral-400" />
                  <span>Mitigado</span>
                </span>
              </div>
              <div className="text-xs font-bold text-neutral-200">Safe Page / Verificação</div>
              <div className="text-[11px] text-brand-muted mt-1 leading-snug">
                Artigo neutro ou verificação institucional. Zero risco de reprovação ou bloqueio.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
