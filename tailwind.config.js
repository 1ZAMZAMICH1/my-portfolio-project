import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gothic: ['Gotham', 'cursive'],
      },
      // --- ДОБАВЛЕН БЛОК ДЛЯ CSS-АНИМАЦИИ ---
      keyframes: {
        scroll: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        scrollReverse: {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'scroll': 'scroll 60s linear infinite',
        'scroll-reverse': 'scrollReverse 60s linear infinite',
      },
      // --- КОНЕЦ БЛОКА ---
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      layout: {
        radius: {
          small: "8px",
          medium: "12px",
          large: "16px",
        },
      },
      themes: {
        light: {
          colors: {
            background: "#0a0a0a",
            foreground: "#f0f0f0",
            focus: "#e11d48",
            content1: { DEFAULT: "#111111", foreground: "#f0f0f0" },
            content2: { DEFAULT: "#1a1a1a", foreground: "#f0f0f0" },
            content3: { DEFAULT: "#222222", foreground: "#f0f0f0" },
            content4: { DEFAULT: "#2a2a2a", foreground: "#f0f0f0" },
            divider: { DEFAULT: "rgba(255, 255, 255, 0.1)" },
            primary: {
              50: "#fef2f2",
              100: "#fee2e2",
              200: "#fecaca",
              300: "#fca5a5",
              400: "#f87171",
              500: "#ef4444",
              600: "#dc2626",
              700: "#b91c1c",
              800: "#991b1b",
              900: "#7f1d1d",
              DEFAULT: "#dc2626",
              foreground: "#ffffff"
            }
          }
        }
      }
    })
  ]
};

export default config;