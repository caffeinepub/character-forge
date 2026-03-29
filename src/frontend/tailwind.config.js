/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cinzel", "serif"],
        sans: ["Rajdhani", "sans-serif"],
        cinzel: ["Cinzel", "serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        background: "var(--color-bg)",
        foreground: "var(--color-foreground)",
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-foreground)",
        },
        popover: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-foreground)",
        },
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-fg)",
        },
        secondary: {
          DEFAULT: "var(--color-surface)",
          foreground: "var(--color-muted-fg)",
        },
        muted: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-muted-fg)",
        },
        accent: {
          DEFAULT: "var(--color-gold)",
          foreground: "var(--color-bg)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-foreground)",
        },
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-gold)",
        gold: {
          DEFAULT: "var(--color-gold)",
          bright: "var(--color-gold-bright)",
          dim: "var(--color-gold-dim)",
        },
        purple: {
          DEFAULT: "var(--color-purple)",
          bright: "var(--color-purple-bright)",
        },
        nebula: "var(--color-nebula)",
        glass: "var(--color-glass)",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
        xl: "1rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        "glow-gold": "0 0 16px oklch(75% 0.1 75 / 0.5), 0 0 40px oklch(75% 0.1 75 / 0.2)",
        "glow-gold-sm": "0 0 8px oklch(75% 0.1 75 / 0.4)",
        "glow-purple": "0 0 20px oklch(45% 0.18 290 / 0.5), 0 0 50px oklch(45% 0.18 290 / 0.2)",
        glass: "0 8px 32px oklch(0% 0 0 / 0.4), inset 1px 1px 0 oklch(80% 0.05 285 / 0.08)",
      },
      animation: {
        twinkle: "twinkle 3s ease-in-out infinite",
        "twinkle-delay": "twinkle 4s ease-in-out 1.5s infinite",
        nebula: "nebula 20s ease-in-out infinite alternate",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.35s ease-out",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        nebula: {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "100%": { transform: "translate(3%, 2%) scale(1.08)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
