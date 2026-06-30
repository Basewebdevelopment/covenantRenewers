import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#06060a",
        deep: "#0a0a10",
        mid: "#101018",
        card: "#14141e",
        cream: "#f0ece0",
        off: "#8a8070",
        gold: "#b8933a",
        "gold-light": "#d4aa55",
        "gold-bright": "#f0c84a",
        ember: "#d63010",
        neon: "#00d48a",
        cobalt: "#1a35d4",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
        serif: ["var(--font-serif)"],
      },
    },
  },
  plugins: [],
};
export default config;
