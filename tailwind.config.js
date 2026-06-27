/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#00f5e4",
        secondary: "#8b5cf6",
        dark: "#02040f",
        "dark-2": "#0a0e1a",
        "dark-3": "#0e1325",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
