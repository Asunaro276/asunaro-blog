module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        vollkorn: ['Vollkorn'],
        montserrat: ['Montserrat Subrayada'],
        nserif: ["Noto Serif"],
        mplus: ["M PLUS Rounded 1c"],
        biz: ['BIZ UDPGothic'],
      }
    },
  },
  plugins: [],
}
