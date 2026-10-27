"use client";

import React from "react";
import { Logo } from "@/components/ui/Logo";
import { User, Bot, FileText, CheckCircle } from "lucide-react";

export const RoutingDiagram: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-10 px-4 select-none font-sans">
      {/* SVG Connecting Curved Wires with Animated Energy Pulses (Monochromatic Black & White) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 800 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Monochromatic Gradients for Glowing Wires */}
          <linearGradient id="userFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="botFlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#52525b" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#71717a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#a1a1aa" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="cleanDestGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="safeDestGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a1a1aa" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#71717a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#52525b" stopOpacity="0.3" />
          </linearGradient>

          {/* White Glow Filter */}
          <filter id="neonGlowWhite" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 1. Wire: Real User (top left) -> Central Phantom-X */}
        <path
          d="M 180 70 C 260 70, 280 140, 340 140"
          stroke="url(#userFlowGrad)"
          strokeWidth="2.5"
          filter="url(#neonGlowWhite)"
        />
        {/* Animated Particle: User to Central */}
        <circle r="4" fill="#ffffff" filter="url(#neonGlowWhite)">
          <animateMotion
            path="M 180 70 C 260 70, 280 140, 340 140"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>

        {/* 2. Wire: Bot / Crawler (bottom left) -> Central Phantom-X */}
        <path
          d="M 180 210 C 260 210, 280 140, 340 140"
          stroke="url(#botFlowGrad)"
          strokeWidth="2"
        />
        {/* Animated Particle: Bot to Central */}
        <circle r="3.5" fill="#a1a1aa">
          <animateMotion
            path="M 180 210 C 260 210, 280 140, 340 140"
            dur="3.2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* 3. Wire: Central Phantom-X -> Offer Page (top right) */}
        <path
          d="M 460 140 C 520 140, 540 70, 620 70"
          stroke="url(#cleanDestGrad)"
          strokeWidth="2.5"
          filter="url(#neonGlowWhite)"
        />
        {/* Animated Particle: Central to Offer */}
        <circle r="4" fill="#ffffff" filter="url(#neonGlowWhite)">
          <animateMotion
            path="M 460 140 C 520 140, 540 70, 620 70"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>

        {/* 4. Wire: Central Phantom-X -> Safe / Verification Page (bottom right) */}
        <path
          d="M 460 140 C 520 140, 540 210, 620 210"
          stroke="url(#safeDestGrad)"
          strokeWidth="2"
        />
        {/* Animated Particle: Central to Safe */}
        <circle r="3.5" fill="#a1a1aa">
          <animateMotion
            path="M 460 140 C 520 140, 540 210, 620 210"
            dur="3.2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* HTML Interactive Nodes Layer */}
      <div className="relative z-20 flex items-center justify-between min-h-[260px] max-w-3xl mx-auto">
        {/* Left Column: Incoming Traffic Types */}
        <div className="flex flex-col justify-between h-[210px]">
          {/* Top Node: Real User */}
          <div className="flex items-center space-x-3 group">
            <div className="w-14 h-14 rounded-2xl bg-brand-surface/90 border border-neutral-700/80 p-3 flex items-center justify-center shadow-glow-sm group-hover:border-white/70 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="text-left font-sans">
              <div className="text-xs font-bold text-white tracking-wide">Visitante Real</div>
              <div className="text-[10px] text-neutral-400">Humano verificado</div>
            </div>
          </div>

          {/* Bottom Node: Bot / Crawler */}
          <div className="flex items-center space-x-3 group">
            <div className="w-14 h-14 rounded-2xl bg-brand-surface/90 border border-neutral-800 p-3 flex items-center justify-center shadow-glow-sm group-hover:border-neutral-600 transition-all">
              <Bot className="w-6 h-6 text-neutral-400" />
            </div>
            <div className="text-left font-sans">
              <div className="text-xs font-bold text-neutral-300 tracking-wide">Bot / Crawler</div>
              <div className="text-[10px] text-neutral-500">Automação & scrapers</div>
            </div>
          </div>
        </div>

        {/* Center Node: Phantom-X Core Logo Engine (Enlarged, Pure Black & White, No "Motor de Borda") */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Outer glowing white aura */}
          <div className="absolute w-36 h-36 rounded-full bg-white/10 blur-2xl animate-pulse pointer-events-none" />

          {/* Core Logo Container - Larger & Prominent */}
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-neutral-900/90 border border-white/30 p-1 shadow-[0_0_35px_rgba(255,255,255,0.2)] flex items-center justify-center hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-[22px] bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center p-3">
              <Logo size={74} className="filter drop-shadow-[0_0_16px_rgba(255,255,255,0.9)]" />
            </div>
          </div>
        </div>

        {/* Right Column: Routed Destinations */}
        <div className="flex flex-col justify-between h-[210px]">
          {/* Top Node: Clean Offer Destination */}
          <div className="flex items-center space-x-3 flex-row-reverse space-x-reverse group">
            <div className="w-14 h-14 rounded-2xl bg-brand-surface/90 border border-neutral-700/80 p-3 flex items-center justify-center shadow-glow-sm group-hover:border-white/70 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="text-right font-sans">
              <div className="text-xs font-bold text-white tracking-wide">Página de Oferta</div>
              <div className="text-[10px] text-neutral-400">Acesso liberado &lt; 18ms</div>
            </div>
          </div>

          {/* Bottom Node: Safe Verification Page */}
          <div className="flex items-center space-x-3 flex-row-reverse space-x-reverse group">
            <div className="w-14 h-14 rounded-2xl bg-brand-surface/90 border border-neutral-800 p-3 flex items-center justify-center shadow-glow-sm group-hover:border-neutral-600 transition-all">
              <CheckCircle className="w-6 h-6 text-neutral-400" />
            </div>
            <div className="text-right font-sans">
              <div className="text-xs font-bold text-neutral-300 tracking-wide">Página Segura</div>
              <div className="text-[10px] text-neutral-500">Mitigação / Safe Page</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
