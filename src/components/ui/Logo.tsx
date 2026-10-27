import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 30 }) => {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/logo.png"
        alt="Phantom-X Logo"
        width={size}
        height={size}
        className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]"
      />
    </div>
  );
};
