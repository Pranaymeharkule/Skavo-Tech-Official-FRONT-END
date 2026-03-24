/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {

      colors: {
        brand: "#0a1435",
        soft: "#f9fafb",
        accent: "#d4af37",
        dark: "#111827",
        light: "#f3f4f6",

        luxury: {
          black: "#0B0B0F",
          purple: "#8B5CF6",
          blue: "#3B82F6",
          glass: "rgba(255,255,255,0.08)"
        }
      },

      backgroundImage: {
        "luxury-gradient":
          "linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)",
        "hero-overlay":
          "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.8))"
      },

      boxShadow: {
        luxury: "0 25px 60px rgba(139,92,246,0.25)",
        glow: "0 0 40px rgba(139,92,246,0.4)"
      },

      backdropBlur: {
        xs: "2px"
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: [],
};