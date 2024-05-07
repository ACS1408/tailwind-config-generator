/** @type {import('tailwindcss').Config} */

const colors = {
  primary: "var(--wac-primary)",
  secondary: "var(--wac-secondary)",
  black: {
    DEFAULT: "var(--wac-black)",
    900: "var(--wac-black-900)",
    800: "var(--wac-black-800)",
    700: "var(--wac-black-700)",
  },
  white: "var(--wac-white)",
  dark: "var(--wac-dark)",
  error: "var(--wac-error)",
  warning: "var(--wac-warning)",
  success: "var(--wac-success)",
};

const spacing = {
  4.5: "var(--wac-spacing-4pt5)",
  5.5: "var(--wac-spacing-5pt5)",
  6.5: "var(--wac-spacing-6pt5)",
  7.5: "var(--wac-spacing-7pt5)",
};

const fontWeight = {
  light: "var(--wac-font-light)",
  regular: "var(--wac-font-regular)",
  medium: "var(--wac-font-medium)",
  semibold: "var(--wac-font-semibold)",
  bold: "var(--wac-font-bold)",
};

const fontSize = {
  h1: "var(--wac-text-h1)",
  h2: "var(--wac-text-h2)",
  h3: "var(--wac-text-h3)",
  h4: "var(--wac-text-h4)",
  h5: "var(--wac-text-h5)",
  h6: "var(--wac-text-h6)",
  p: "var(--wac-text-p)",
};

const boxShadow = {
  sm: "var(--wac-shadow-sm)",
  md: "var(--wac-shadow-md)",
  lg: "var(--wac-shadow-lg)",
};

const container = {
  center: true,
  padding: "calc(var(--gutter-x) / 2)",
};

const screens = {
  xs: { max: "576px" },
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  xxl: "1420px",
  xxxl: "1600px",
  laptop: { min: "1200px", max: "1450px" },
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
    boxShadow,
    container,
    screens,
    extend: {
      spacing,
      fontSize,
    },
  },
  plugins: [],
};
