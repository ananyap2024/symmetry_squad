/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", /* muted-earth */
        input: "var(--color-input)", /* subtle-beige */
        ring: "var(--color-ring)", /* saffron-orange */
        background: "var(--color-background)", /* warm-cream */
        foreground: "var(--color-foreground)", /* deep-brown */
        primary: {
          DEFAULT: "var(--color-primary)", /* saffron-orange */
          foreground: "var(--color-primary-foreground)", /* white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* earth-brown */
          foreground: "var(--color-secondary-foreground)", /* white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* restrained-red */
          foreground: "var(--color-destructive-foreground)", /* white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* muted-earth */
          foreground: "var(--color-muted-foreground)", /* muted-brown */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* vermillion-red */
          foreground: "var(--color-accent-foreground)", /* white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* subtle-beige */
          foreground: "var(--color-popover-foreground)", /* deep-brown */
        },
        card: {
          DEFAULT: "var(--color-card)", /* subtle-beige */
          foreground: "var(--color-card-foreground)", /* deep-brown */
        },
        success: {
          DEFAULT: "var(--color-success)", /* natural-green */
          foreground: "var(--color-success-foreground)", /* white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* bright-orange */
          foreground: "var(--color-warning-foreground)", /* white */
        },
        error: {
          DEFAULT: "var(--color-error)", /* restrained-red */
          foreground: "var(--color-error-foreground)", /* white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Noto Sans', 'sans-serif'],
        'caption': ['Noto Serif', 'serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "dot-connect": {
          "0%": { strokeDasharray: "0 100" },
          "100%": { strokeDasharray: "100 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "dot-connect": "dot-connect 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      boxShadow: {
        'warm': '0 2px 8px rgba(210, 105, 30, 0.15)',
        'warm-md': '0 4px 12px rgba(210, 105, 30, 0.15)',
        'warm-lg': '0 8px 24px rgba(210, 105, 30, 0.15)',
        'warm-xl': '0 16px 32px rgba(210, 105, 30, 0.15)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}