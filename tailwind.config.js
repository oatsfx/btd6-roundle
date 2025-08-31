// tailwind.config.js
const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        flip: "flip 0.8s ease-in-out",
        "arrow-fade": "arrowFade 0.8s ease-in-out",
      },
      keyframes: {
        flip: {
          "0%": { backgroundColor: "#00000066" },
          "10%": { transform: "scaleY(1)" },
          "55%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
        arrowFade: {
          "0%, 40%": { opacity: 0.0 },
          "100%": { opacity: 1.0 },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#06020a",
            foreground: "#ffffff",
            primary: {
              50: "#e2f1ff",
              100: "#b6d1fd",
              200: "#89b2f6",
              300: "#5b93f0",
              400: "#2f74ea",
              500: "#155bd0",
              600: "#0c46a3",
              700: "#053276",
              800: "#001e49",
              900: "#000a1e",
              DEFAULT: "#155bd0",
              foreground: "#ffffff",
            },
            secondary: {
              50: "#f5fede",
              100: "#e5f9b5",
              200: "#d4f388",
              300: "#c4ef5b",
              400: "#b3ea2f",
              500: "#9ad015",
              600: "#77a20c",
              700: "#547406",
              800: "#314501",
              900: "#0f1800",

              DEFAULT: "#9ad015",
              foreground: "#ffffff",
            },
            focus: "#0c46a3",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};
