/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
     fontFamily: {
      'outfit': ['Outfit', 'sans-serif'],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      fontSize: {
        "2.5": "0.625rem", // 10px
        "2.75": "0.6875rem", // 11px
        "3.25": "0.8125rem", // 13px
        "3.75": "0.9375rem", // 15px
        "4.25": "1.0625rem", // 17px
        "4.75": "1.1875rem", // 19px
        "22": "5.5rem", // 22px
      },
      lineHeight: {
        "3.3275": "0.831875rem", // 13.31px
        "3.63": "0.9075rem", // 14.52px
        "3.75": "0.9375rem", // 15px
        "3.9325": "0.983125rem", // 15.73px
        "4.2": "1.05rem", // 16.8px
        "4.235": "1.05875rem", // 16.94px
        "4.25": "1.0625rem", // 17px
        "4.5": "1.125rem", // 18px
        "4.75": "1.1875rem", // 19px
        "4.84": "1.21rem", // 19.36px
        "5.25": "1.3125rem", // 21px
        "5.4": "1.35rem", // 21.6px
        "6.25": "1.5625rem", // 25px
        "6.5": "1.625rem", // 26px
        "15": "3.75rem", // 60px
        "30.58": "7.645rem", // 122.32px
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}