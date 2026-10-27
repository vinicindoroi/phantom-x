import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#050505",
          dark: "#0A0A0A",
          surface: "#111111",
          hover: "#181818",
          border: "#252525",
          borderSubtle: "#1c1c1c",
          borderHighlight: "#383838",
          white: "#FFFFFF",
          secondary: "#A1A1AA",
          muted: "#666666",
        },
      },
      fontFamily: {
        sans: [
          "Poppins",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        poppins: [
          "Poppins",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      boxShadow: {
        glow: "0 0 35px -5px rgba(255, 255, 255, 0.08)",
        "glow-sm": "0 0 15px -3px rgba(255, 255, 255, 0.05)",
        "glow-lg": "0 0 60px -10px rgba(255, 255, 255, 0.12)",
      },
      animation: {
        pulseSlow: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
