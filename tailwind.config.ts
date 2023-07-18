import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    
    extend: {
      colors : {
        "BLACK_CYNICAL": "#171717",
        "GRAY_CLOUD": "#444444",
        "RED_CARMINE": "#DA0037",
        "WHITE_EGG": "#EDEDED",
      }
    },
  },
  plugins: [],
} satisfies Config;
