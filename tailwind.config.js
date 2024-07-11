/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        'lg': {'min': '1024px'},
        // => @media (max-width: 1023px) { ... }
  
        'md': {'min': '650px'},
        // => @media (max-width: 767px) { ... }
  
        'sm': {'max': '649px'},
        // => @media (max-width: 639px) { ... }
      },
     
    },
  },
  plugins: [],
  darkMode: "class",
};
