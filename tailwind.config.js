/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "spartan": ["League Spartan", "sans-serif"],
      },
      colors: {
        "customPurple": "#7C5DFA",
        "customPurple2": "#9277FF",
        "dark": "#1E2139",
        "darkBlue": "#252945",
        "lightGray": "#DFE3FA",
        "darkerGray": "#888EB0",
        "fadedPurple": "#7E88C3",
        "black1": "#0C0E16",
        "black2": "#141625",
        "red": "#EC5757",
        "fadedRed": "rgb(255, 151, 151)",
        "lightBG": "#F8F8FB",
      },
    },
  },
  plugins: [],
}