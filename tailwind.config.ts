import { type Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        gray: {
          950: "#131315",
          900: "#18181B",
          600: "#5D5F61",
          500: "#76787A",
          400: "#909499",
          300: "#AAAEB3",
          100: "#E1E3E6",
        },
        farcaster: {
          900: "#8465CB",
        },
        background: "#0A0A0A",
      },
    },
  },
  plugins: [],
} satisfies Config;
