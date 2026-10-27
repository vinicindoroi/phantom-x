"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { GeoAggregate, TrafficEvent } from "@/types";
import { ZoomIn, ZoomOut, RotateCcw, Activity } from "lucide-react";

interface DottedWorldMapProps {
  events: TrafficEvent[];
  geoData: GeoAggregate[];
  selectedCountry: string | null;
  onSelectCountry: (code: string | null) => void;
  className?: string;
}

// Low-resolution equirectangular continental dots grid
function generateWorldGrid(): { x: number; y: number }[] {
  const points: { x: number; y: number }[] = [];
  const cols = 120;
  const rows = 60;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const lat = 90 - (r / rows) * 180;
      const lon = (c / cols) * 360 - 180;

      // Approximate land testing
      let isLand = false;
      // Americas
      if (lat >= -55 && lat <= 70 && lon >= -165 && lon <= -35) {
        if (!(lat < 12 && lon < -82) && !(lat > 15 && lon > -50)) isLand = true;
      }
      // Europe & Asia & Africa
      if (lat >= -35 && lat <= 75 && lon >= -20 && lon <= 150) {
        if (!(lat < 10 && lon < 45 && lon > 50)) isLand = true;
        // Med sea gap
        if (lat > 30 && lat < 45 && lon > 0 && lon < 35 && Math.random() < 0.6) isLand = false;
        // Indian ocean gap
        if (lat < 10 && lon > 55 && lon < 95) isLand = false;
      }
      // Australia
      if (lat >= -45 && lat <= -10 && lon >= 110 && lon <= 155) isLand = true;

      if (isLand && Math.random() < 0.85) {
        // Map to normal 0-1 space
        points.push({
          x: (lon + 180) / 360,
          y: (90 - lat) / 180,
        });
      }
    }
  }
  return points;
}

export const DottedWorldMap: React.FC<DottedWorldMapProps> = ({
  events,
  geoData,
  selectedCountry,
  onSelectCountry,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredPoint, setHoveredPoint] = useState<GeoAggregate | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const basePoints = useMemo(() => generateWorldGrid(), []);

  // Map country events to screen coordinates
  const activeNodes = useMemo(() => {
    return geoData.map((geo) => {
      const normX = (geo.longitude + 180) / 360;
      const normY = (90 - geo.latitude) / 180;
      return {
        ...geo,
        normX,
        normY,
      };
    });
  }, [geoData]);

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
      const w = canvas.parentElement?.clientWidth || 800;
      const h = canvas.parentElement?.clientHeight || 450;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      // Deep Black Canvas Background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      // Subtle longitude and latitude guide lines
      ctx.strokeStyle = "rgba(40, 40, 40, 0.4)";
      ctx.lineWidth = 0.5;

      // Apply zoom & pan transformations
      ctx.translate(w / 2 + pan.x, h / 2 + pan.y);
      ctx.scale(zoom, zoom);
      ctx.translate(-w / 2, -h / 2);

      const mapWidth = w * 0.95;
      const mapHeight = h * 0.85;
      const startX = (w - mapWidth) / 2;
      const startY = (h - mapHeight) / 2;

      // Draw subtle grid
      for (let i = 0; i <= 6; i++) {
        const y = startY + (mapHeight / 6) * i;
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(startX + mapWidth, y);
        ctx.stroke();
      }
      for (let i = 0; i <= 12; i++) {
        const x = startX + (mapWidth / 12) * i;
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, startY + mapHeight);
        ctx.stroke();
      }

      // Draw Continental Monochromatic Dots
      ctx.fillStyle = "#27272a";
      basePoints.forEach((p) => {
        const px = startX + p.x * mapWidth;
        const py = startY + p.y * mapHeight;
        ctx.beginPath();
        ctx.arc(px, py, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Live Event Nodes & Pulses
      activeNodes.forEach((node) => {
        const px = startX + node.normX * mapWidth;
        const py = startY + node.normY * mapHeight;
        const isSelected = selectedCountry === node.countryCode;

        // Pulse ring
        const wave = (Math.sin(pulseCycle + node.eventsCount) + 1) / 2;
        const ringRadius = 4 + wave * 9;
        ctx.strokeStyle = isSelected
          ? "rgba(255, 255, 255, 0.85)"
          : "rgba(255, 255, 255, 0.35)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(px, py, ringRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Core dot
        ctx.fillStyle = isSelected ? "#ffffff" : "#e4e4e7";
        ctx.beginPath();
        ctx.arc(px, py, isSelected ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Label for top countries
        if (node.percentage >= 8 || isSelected) {
          ctx.font = "10px Inter, sans-serif";
          ctx.fillStyle = isSelected ? "#ffffff" : "#a1a1aa";
          ctx.fillText(`${node.country} (${node.eventsCount})`, px + 6, py - 4);
        }
      });

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [basePoints, activeNodes, zoom, pan, selectedCountry]);

  // Handle Canvas Interaction (Click to filter by Country, Drag to pan)
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const mapWidth = w * 0.95;
    const mapHeight = h * 0.85;
    const startX = (w - mapWidth) / 2;
    const startY = (h - mapHeight) / 2;

    // Check hit test for active nodes
    let found: GeoAggregate | null = null;
    for (const node of activeNodes) {
      const px = (startX + node.normX * mapWidth - w / 2) * zoom + w / 2 + pan.x;
      const py = (startY + node.normY * mapHeight - h / 2) * zoom + h / 2 + pan.y;

      const dist = Math.hypot(mouseX - px, mouseY - py);
      if (dist < 14) {
        found = node;
        setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        break;
      }
    }
    setHoveredPoint(found);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (hoveredPoint) {
      onSelectCountry(selectedCountry === hoveredPoint.countryCode ? null : hoveredPoint.countryCode);
    }
  };

  return (
    <div className={`relative w-full h-[480px] bg-brand-black rounded-xl border border-brand-border overflow-hidden select-none ${className}`}>
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setIsDragging(false);
          setHoveredPoint(null);
        }}
        onClick={handleClick}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex items-center space-x-2 bg-brand-surface/90 backdrop-blur-md border border-brand-border px-2 py-1.5 rounded-lg shadow-glow-sm">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.3, 3))}
          title="Zoom +"
          className="p-1 hover:text-white text-brand-secondary transition"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.3, 0.8))}
          title="Zoom -"
          className="p-1 hover:text-white text-brand-secondary transition"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            setZoom(1);
            setPan({ x: 0, y: 0 });
            onSelectCountry(null);
          }}
          title="Redefinir visualização"
          className="p-1 hover:text-white text-brand-secondary transition"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Active Filter Badge */}
      {selectedCountry && (
        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-brand-surface/90 border border-brand-border px-3 py-1.5 rounded-lg text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white">Filtrando por: {selectedCountry}</span>
          <button
            onClick={() => onSelectCountry(null)}
            className="ml-2 text-brand-secondary hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Bottom Live Legend */}
      <div className="absolute bottom-4 left-4 flex items-center space-x-4 bg-brand-surface/80 backdrop-blur border border-brand-border px-3 py-1.5 rounded-lg text-xs text-brand-secondary font-mono">
        <div className="flex items-center space-x-1.5">
          <Activity className="w-3.5 h-3.5 text-white animate-pulse" />
          <span className="text-white">Telemetria Ativa</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-white" />
          <span>Nó com tráfego</span>
        </div>
        <div className="text-brand-muted">
          Última sincronização: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Tooltip on Hover */}
      {hoveredPoint && (
        <div
          style={{ left: tooltipPos.x + 12, top: tooltipPos.y - 10 }}
          className="pointer-events-none absolute z-20 bg-brand-surface border border-brand-border px-3 py-2 rounded-lg shadow-glow text-xs"
        >
          <div className="font-semibold text-white flex items-center justify-between space-x-4">
            <span>{hoveredPoint.country}</span>
            <span className="text-brand-secondary font-mono">[{hoveredPoint.countryCode}]</span>
          </div>
          <div className="text-brand-secondary mt-1 flex justify-between space-x-4">
            <span>Volume registrado:</span>
            <span className="font-mono text-white font-bold">{hoveredPoint.eventsCount}</span>
          </div>
          <div className="text-brand-secondary flex justify-between space-x-4">
            <span>Fatia do tráfego:</span>
            <span className="font-mono text-white">{hoveredPoint.percentage}%</span>
          </div>
          <div className="text-[10px] text-brand-muted mt-1 italic">
            Clique para isolar este país
          </div>
        </div>
      )}
    </div>
  );
};
