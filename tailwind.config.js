/** @type {import('tailwindcss').Config} */

const colors = {
  primary: "var(--primary)",
  secondary: "var(--secondary)",
  black: {
    DEFAULT: "var(--black)",
    900: "var(--black-900)"
  },
  white: "var(--white)",
  transparent: "var(--transparent)",
};

const spacing = {};

const fontSize = {
  base: "1rem",
  // sm: "var(--text-sm)",
  // md: "var(--text-md)",
  // lg: "var(--text-lg)",
  // xl: "var(--text-xl)",
  // h1: "var(--text-h1)",
  // h2: "var(--text-h2)",
  // h3: "var(--text-h3)",
  // h4: "var(--text-h4)",
  // h5: "var(--text-h5)",
  // h6: "var(--text-h6)",
};

const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
};

const container = {
  center: true,
  padding: "calc(var(--gutter-x) / 2)",
};

module.exports = {
  content: [
    "./widgets/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors,
    fontWeight,
    container,
    extend: {
      fontSize,
      spacing,
      screens: {
        xs: { max: "576px" },
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1420px",
        xxxl: "1600px",
        laptop: { min: "1200px", max: "1450px" },
      },
    },
  },
  plugins: [],
};
