import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
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
            content1: {
              DEFAULT: "#111111",
              foreground: "#f0f0f0"
            },
            content2: {
              DEFAULT: "#1a1a1a",
              foreground: "#f0f0f0"
            },
            content3: {
              DEFAULT: "#222222",
              foreground: "#f0f0f0"
            },
            content4: {
              DEFAULT: "#2a2a2a",
              foreground: "#f0f0f0"
            },
            divider: {
              DEFAULT: "rgba(255, 255, 255, 0.1)"
            },
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
}
