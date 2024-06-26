module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './libs/parse/*.{js,ts,jsx,tsx}',
  ],
  // important: true,
  theme: {
    extend: {
      fontFamily: {
        logo: ['Montserrat Subrayada'],
        title: ['Arial', 'Meiryo', 'Noto Sans Jp'],
        body: ['Meiryo', 'Arial', 'Yu Gothic', 'Roboto', 'Noto Sans Jp'],
        code: ['Source Han Code JP', 'HackGen35']
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
