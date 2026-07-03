import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#1a1408",
          800: "#3a2c14",
          700: "#5c451e",
          600: "#8a6a2c",
          gold: "#c9a24b",
          cream: "#faf6ec"
        }
      },
      fontFamily: {
        serif: ["Georgia", "'Playfair Display'", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
export default config;
