module.exports = {
  mode: "jit",
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './libs/parse/*.{js,ts,jsx,tsx}'
  ],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        logo: ['Montserrat Subrayada'],
        title: ['Noto Serif', 'Helvetica', 'Arial', 'Verdana'],
        body: [
          'Noto Serif',
          'Yu Gothic',
          'Roboto',
        ],
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
},
}
