const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#fff",
            a: {
              color: "#3b82f6",
              "&:hover": {
                color: "#60a5fa",
              },
            },
            h1: {
              color: "#fff",
            },
            h2: {
              color: "#fff",
            },
            h3: {
              color: "#fff",
            },
            h4: {
              color: "#fff",
            },
            p: {
              color: "#fff",
            },
            strong: {
              color: "#fff",
            },
            blockquote: {
              color: "#d1d5db",
              borderLeftColor: "#3b82f6",
            },
            code: {
              color: "#fff",
              backgroundColor: "#374151",
              padding: "0.25rem",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
            },
            pre: {
              backgroundColor: "#1f2937",
              color: "#fff",
            },
            hr: {
              borderColor: "#374151",
              marginTop: "2em",
              marginBottom: "2em",
            },
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        dark: {
          colors: {
            background: "#000000",
            foreground: "#ffffff",
            primary: {
              DEFAULT: "#3b82f6",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
    require("@tailwindcss/typography"),
  ],
};
