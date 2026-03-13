import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  // prefix all classes to avoid conflicts with the user's own tailwind
  prefix: "crb-",
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "dot-bounce": {
          "0%,80%,100%": { transform: "scale(0)" },
          "40%": { transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
        "dot-bounce": "dot-bounce 1.4s infinite ease-in-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
