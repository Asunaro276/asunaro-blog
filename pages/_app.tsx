import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import SEO from 'next-seo.config'
import { ThemeProvider } from '@emotion/react'
import { basicTheme } from 'styles/theme'
import { CssBaseline } from '@mui/material'

if (process.env.NEXT_PUBLIC_USE_API_MOCKING) {
  import('../mocks')
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <CssBaseline />
      <ThemeProvider theme={basicTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
