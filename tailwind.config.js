/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '60': '60',
        '100': '100',
        // Aur bhi values yahan add kar sakte hain
      },
      fontFamily: {
        sans: ['"Open Sans"'],
        sansing: ['"Open Sans", "sans-serif"'],
        manrope: ['Manrope', 'sans-serif'],
        helveticaLight: ['"Helvetica Neue-Light"', 'Arial', 'sans-serif', 'Manrope'], 
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'], // Adding Open Sans to sans font family
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      }, // Close the keyframes object
    }, // Close the extend object
  },
  plugins: [],
}
