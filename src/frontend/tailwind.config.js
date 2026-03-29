/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Bricolage Grotesque", "sans-serif"],
        sans: ["Satoshi", "sans-serif"],
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
          foreground: "var(--color-secondary-fg)",
        },
        muted: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-muted-fg)",
        },
        accent: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-fg)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-foreground)",
        },
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-primary)",
        surface: "var(--color-surface)",
        gold: {
          DEFAULT: "var(--color-gold)",
          foreground: "var(--color-primary-fg)",
        },
      },
      borderRadius: {
        lg: "0.625rem",
        md: "0.5rem",
        sm: "0.375rem",
        xl: "0.875rem",
        "2xl": "1rem",
      },
      boxShadow: {
        "glow-teal": "0 0 12px oklch(78% 0.12 195 / 0.35), 0 0 30px oklch(78% 0.12 195 / 0.12)",
        "glow-teal-sm": "0 0 6px oklch(78% 0.12 195 / 0.3)",
        card: "0 4px 24px oklch(0% 0 0 / 0.4)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
