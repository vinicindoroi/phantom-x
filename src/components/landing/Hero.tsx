"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { TechGlobe } from "../globe/TechGlobe";
import { RoutingDiagram } from "./RoutingDiagram";
import { useLanguage } from "@/lib/i18n";

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-36 md:pt-44 pb-20 overflow-hidden bg-brand-black">
      {/* 
        3D Rotating Dotted Globe:
        Positioned comfortably DOWN so its top curve never passes or pokes behind the navbar options,
        fully visible without clipping ("sem cortar"), framed directly behind the headline & routing diagram.
      */}
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] md:w-[680px] md:h-[680px] pointer-events-none z-0 opacity-70 flex items-center justify-center">
        <TechGlobe className="w-full h-full" />
      </div>

      {/* Hero Headline & Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Main Headline (Clean, no AI badges or shield icons) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 font-sans drop-shadow-md">
          {t.hero.titleLine1} <br />
          <span className="text-brand-secondary font-medium">{t.hero.titleLine2}</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl text-base sm:text-lg text-brand-secondary leading-relaxed font-sans font-normal mb-9">
          {t.hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition shadow-glow flex items-center justify-center space-x-2 group"
          >
            <span>{t.hero.startFree}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-brand-surface/90 backdrop-blur hover:bg-brand-hover text-white font-medium text-sm border border-brand-border transition flex items-center justify-center space-x-2"
          >
            <span>{t.hero.explore}</span>
            <ChevronDown className="w-4 h-4 text-brand-secondary" />
          </a>
        </div>
      </div>

      {/* Central Interconnected Engine Diagram (Competitor Inspired) */}
      <div className="relative z-20 w-full mt-6">
        <RoutingDiagram />
      </div>

      {/* Live Micro Ticker at bottom */}
      <div className="relative z-20 mt-8 w-full max-w-4xl px-4 flex items-center justify-between text-[11px] font-mono text-brand-secondary border-t border-brand-borderSubtle pt-4">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white">{t.hero.latency}</span>
        </div>
        <div className="hidden sm:block text-brand-muted">
          {t.hero.cluster}
        </div>
        <div className="text-white">
          {t.hero.cleanTraffic}
        </div>
      </div>
    </section>
  );
};
