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
        title: ['Arial', 'Meiryo'],
        body: [
          'Meiryo',
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
