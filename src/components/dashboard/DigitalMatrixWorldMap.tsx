"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { GeoAggregate, TrafficEvent } from "@/types";
import {
  MATRIX_COLS,
  MATRIX_ROWS,
  WORLD_MATRIX_DOTS,
  MATRIX_TECH_HUBS,
} from "./worldDotData";
import { ZoomIn, ZoomOut, RotateCcw, Activity } from "lucide-react";
import { getCountryFlag } from "@/lib/geoFlags";

interface DigitalMatrixWorldMapProps {
  events?: TrafficEvent[];
  geoData?: GeoAggregate[];
  selectedCountry?: string | null;
  onSelectCountry?: (code: string | null) => void;
  className?: string;
  showControls?: boolean;
  interactive?: boolean;
  compact?: boolean;
}

export const DigitalMatrixWorldMap: React.FC<DigitalMatrixWorldMapProps> = ({
  events = [],
  geoData = [],
  selectedCountry = null,
  onSelectCountry,
  className = "",
  showControls = true,
  interactive = true,
  compact = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [hoveredNode, setHoveredNode] = useState<{
    name: string;
    code: string;
    eventsCount: number;
    percentage: number;
    lat: number;
    lon: number;
    state?: string;
    stateCode?: string;
  } | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Map active geo nodes to matrix positions using real geoData without fabricated numbers
  const activeHubNodes = useMemo(() => {
    return MATRIX_TECH_HUBS.map((hub) => {
      const match = geoData.find((g) => g.countryCode === hub.code);
      const eventsCount = match ? match.eventsCount : 0;
      const percentage = match ? match.percentage : 0;

      return {
        ...hub,
        eventsCount,
        percentage,
        hasActivity: eventsCount > 0,
      };
    });
  }, [geoData]);

  // Native non-passive wheel event listener attached to the map container
  // to completely block page scroll up/down while zooming with mouse wheel
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleNativeWheel = (e: WheelEvent) => {
      if (!interactive) return;
      e.preventDefault();
      e.stopPropagation();
      const zoomDelta = e.deltaY > 0 ? -0.15 : 0.15;
      setZoom((z) => Math.min(Math.max(0.8, z + zoomDelta), 3.5));
    };

    container.addEventListener("wheel", handleNativeWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleNativeWheel);
    };
  }, [interactive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let pulseCycle = 0;

    const render = () => {
      pulseCycle = (pulseCycle + 0.04) % (Math.PI * 2);

      const dpr = window.devicePixelRatio || 1;
      const w = canvas.parentElement?.clientWidth || 900;
      const h = canvas.parentElement?.clientHeight || (compact ? 360 : 500);

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Sophisticated Obsidian/Graphite Gradient Background for Deep Command Center Depth
      const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 25, w / 2, h / 2, Math.max(w, h) * 0.75);
      bgGrad.addColorStop(0, "#141722");
      bgGrad.addColorStop(0.35, "#0b0d13");
      bgGrad.addColorStop(0.72, "#040507");
      bgGrad.addColorStop(1, "#010102");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Apply Zoom & Pan
      ctx.translate(w / 2 + pan.x, h / 2 + pan.y);
      ctx.scale(zoom, zoom);
      ctx.translate(-w / 2, -h / 2);

      // Compute Matrix Dimensions
      const marginX = w * 0.035;
      const marginY = h * 0.07;
      const usableW = w - marginX * 2;
      const usableH = h - marginY * 2;

      const cellW = usableW / MATRIX_COLS;
      const cellH = usableH / MATRIX_ROWS;
      const baseDotSize = Math.max(2.4, Math.min(cellW * 0.8, cellH * 0.8));

      // 1. Draw Continental Matrix Dots (Luminous white with delicate subtle glow)
      ctx.fillStyle = "rgba(240, 245, 255, 0.74)";
      ctx.shadowColor = "rgba(255, 255, 255, 0.38)";
      ctx.shadowBlur = 3;
      const dotRadius = Math.max(0.6, baseDotSize * 0.22);

      WORLD_MATRIX_DOTS.forEach(([col, row]) => {
        const px = marginX + col * cellW;
        const py = marginY + row * cellH;

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(px, py, baseDotSize, baseDotSize, dotRadius);
        } else {
          ctx.rect(px, py, baseDotSize, baseDotSize);
        }
        ctx.fill();
      });
      // Reset glow shadow so it doesn't affect other operations
      ctx.shadowBlur = 0;

      // 2. Active Tech Hub Nodes with Clean Radar Rings
      activeHubNodes.forEach((hub) => {
        const isSelected = selectedCountry === hub.code;
        const px = marginX + hub.col * cellW;
        const py = marginY + hub.row * cellH;

        // If hub has real traffic or is selected
        if (hub.hasActivity || isSelected) {
          // Sharp luminous white center dot with soft halo
          ctx.shadowColor = "rgba(255, 255, 255, 0.75)";
          ctx.shadowBlur = 5;
          ctx.fillStyle = "#ffffff";

          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(px - 1, py - 1, baseDotSize + 2, baseDotSize + 2, 1);
          } else {
            ctx.rect(px - 1, py - 1, baseDotSize + 2, baseDotSize + 2);
          }
          ctx.fill();
          ctx.shadowBlur = 0;

          // Expanding radar ring pulse
          const wave = (Math.sin(pulseCycle + hub.row * 0.5) + 1) / 2;
          const pulseRadius = baseDotSize * 1.5 + wave * (baseDotSize * 3.5);
          const opacity = Math.max(0, 0.8 - wave * 0.8);

          ctx.strokeStyle = isSelected
            ? `rgba(255, 255, 255, ${opacity + 0.2})`
            : `rgba(255, 255, 255, ${opacity * 0.7})`;
          ctx.lineWidth = isSelected ? 1.5 : 1;

          ctx.beginPath();
          ctx.arc(px + baseDotSize / 2, py + baseDotSize / 2, pulseRadius, 0, Math.PI * 2);
          ctx.stroke();

          // City & Volume Label
          if (isSelected || hub.percentage >= 10 || zoom > 1.2) {
            ctx.font = "10px JetBrains Mono, monospace";
            ctx.fillStyle = isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.85)";
            ctx.fillText(`${hub.name} (${hub.eventsCount})`, px + baseDotSize + 6, py + baseDotSize);
          }
        } else {
          // Default calm hub indicator
          ctx.fillStyle = isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.6)";
          ctx.beginPath();
          ctx.rect(px, py, baseDotSize, baseDotSize);
          ctx.fill();
        }
      });

      // 3. Fine Connection Arcs between key active hubs (only drawn when there's active traffic)
      if (events.length > 0 || geoData.length > 0) {
        const arcs = [
          { from: "São Paulo", to: "Nova York" },
          { from: "Nova York", to: "Londres" },
          { from: "Londres", to: "Frankfurt" },
          { from: "Frankfurt", to: "Tóquio" },
          { from: "Tóquio", to: "Singapura" },
        ];

        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 4]);

        arcs.forEach(({ from, to }) => {
          const h1 = activeHubNodes.find((h) => h.name === from);
          const h2 = activeHubNodes.find((h) => h.name === to);
          if (h1 && h2) {
            const x1 = marginX + h1.col * cellW + baseDotSize / 2;
            const y1 = marginY + h1.row * cellH + baseDotSize / 2;
            const x2 = marginX + h2.col * cellW + baseDotSize / 2;
            const y2 = marginY + h2.row * cellH + baseDotSize / 2;

            const midX = (x1 + x2) / 2;
            const midY = Math.min(y1, y2) - Math.abs(x2 - x1) * 0.16;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.quadraticCurveTo(midX, midY, x2, y2);
            ctx.stroke();
          }
        });
        ctx.setLineDash([]); // reset
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [activeHubNodes, zoom, pan, selectedCountry, compact, events.length, geoData.length]);

  // Mouse drag & hover handling
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
      return;
    }

    // Detect hover on tech hub cities
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const marginX = w * 0.035;
    const marginY = h * 0.07;
    const usableW = w - marginX * 2;
    const usableH = h - marginY * 2;
    const cellW = usableW / MATRIX_COLS;
    const cellH = usableH / MATRIX_ROWS;
    const baseDotSize = Math.max(2.4, Math.min(cellW * 0.8, cellH * 0.8));

    const worldMouseX = (mouseX - (w / 2 + pan.x)) / zoom + w / 2;
    const worldMouseY = (mouseY - (h / 2 + pan.y)) / zoom + h / 2;

    let matched: any = null;
    for (const hub of activeHubNodes) {
      const px = marginX + hub.col * cellW + baseDotSize / 2;
      const py = marginY + hub.row * cellH + baseDotSize / 2;
      const dist = Math.hypot(worldMouseX - px, worldMouseY - py);

      if (dist < 14) {
        matched = hub;
        break;
      }
    }

    if (matched) {
      setHoveredNode(matched);
      setTooltipPos({ x: mouseX, y: mouseY });
    } else {
      setHoveredNode(null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setHoveredNode(null);
  };

  const handleClick = () => {
    if (hoveredNode && onSelectCountry) {
      if (selectedCountry === hoveredNode.code) {
        onSelectCountry(null);
      } else {
        onSelectCountry(hoveredNode.code);
      }
    }
  };

  const handleDoubleClick = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    if (onSelectCountry) onSelectCountry(null);
  };

  return (
    <div
      ref={containerRef}
      style={{ touchAction: "none", overscrollBehavior: "contain" }}
      className={`relative w-full h-full bg-black overflow-hidden select-none font-sans ${className}`}
    >
      <canvas
        ref={canvasRef}
        style={{ touchAction: "none", overscrollBehavior: "contain" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        className={`w-full h-full bg-black ${
          interactive ? "cursor-grab active:cursor-grabbing" : ""
        }`}
      />

      {/* Controls Overlay */}
      {showControls && (
        <div className="absolute top-4 right-4 flex items-center space-x-1.5 bg-brand-surface/90 backdrop-blur-md border border-brand-border px-2 py-1.5 rounded-lg shadow-glow-sm z-20">
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.3, 3.5))}
            title="Aproximar (+)"
            className="p-1 text-brand-secondary hover:text-white transition"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.3, 0.8))}
            title="Afastar (-)"
            className="p-1 text-brand-secondary hover:text-white transition"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
              if (onSelectCountry) onSelectCountry(null);
            }}
            title="Redefinir visualização"
            className="p-1 text-brand-secondary hover:text-white transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Selected Country Filter Badge */}
      {selectedCountry && (
        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-brand-surface/90 backdrop-blur border border-brand-border px-3 py-1.5 rounded-lg text-xs font-mono z-20">
          <span className="text-sm select-none">{getCountryFlag(selectedCountry)}</span>
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white">Filtrando por: {selectedCountry}</span>
          {onSelectCountry && (
            <button
              onClick={() => onSelectCountry(null)}
              className="ml-2 text-brand-secondary hover:text-white"
            >
              ✕
            </button>
          )}
        </div>
      )}

      {/* Bottom Telemetry Legend Bar */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-4 bg-brand-surface/85 backdrop-blur-md border border-brand-border px-3.5 py-1.5 rounded-lg text-xs text-brand-secondary font-sans z-20">
        <div className="flex items-center space-x-1.5">
          <Activity className="w-3.5 h-3.5 text-white animate-pulse" />
          <span className="text-white font-medium">Telemetria Global</span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 text-[11px] text-brand-muted">
          <span>Scroll para zoom • Arraste para navegar</span>
        </div>
      </div>

      {/* Interactive Tooltip on Node Hover (Only when hub has data or user hovers) */}
      {hoveredNode && (
        <div
          style={{ left: tooltipPos.x + 14, top: tooltipPos.y - 12 }}
          className="pointer-events-none absolute z-30 bg-[#0d0e14]/95 backdrop-blur-md border border-white/10 px-3.5 py-2.5 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] text-xs font-sans ring-1 ring-white/5"
        >
          <div className="font-semibold text-white flex items-center justify-between space-x-3">
            <div className="flex items-center space-x-1.5">
              <span className="text-base leading-none select-none">{getCountryFlag(hoveredNode.code)}</span>
              <span className="text-white font-medium">{hoveredNode.name}</span>
              {hoveredNode.stateCode && (
                <span className="text-[10px] bg-white/10 text-white font-mono px-1.5 py-0.5 rounded border border-white/10 font-bold">
                  {hoveredNode.stateCode}
                </span>
              )}
            </div>
            <span className="text-brand-secondary font-mono text-[11px]">[{hoveredNode.code}]</span>
          </div>
          {hoveredNode.state && (
            <div className="text-[11px] text-brand-muted mt-0.5 pl-6">
              {hoveredNode.state}
            </div>
          )}
          <div className="text-brand-secondary mt-2 flex justify-between space-x-4 text-[11px]">
            <span>Volume registrado:</span>
            <span className="text-white font-bold font-mono">{hoveredNode.eventsCount} reqs</span>
          </div>
          {hoveredNode.percentage > 0 && (
            <div className="text-brand-secondary flex justify-between space-x-4 text-[11px]">
              <span>Fatia da rede:</span>
              <span className="text-white font-mono">{hoveredNode.percentage}%</span>
            </div>
          )}
          <div className="text-[10px] text-brand-muted mt-1.5 border-t border-white/5 pt-1 italic">
            Clique para filtrar por este território
          </div>
        </div>
      )}
    </div>
  );
};
