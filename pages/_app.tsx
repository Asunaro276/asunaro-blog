import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import SEO from "next-seo.config"
import { ThemeProvider } from '@emotion/react'
import { basicTheme } from 'styles/theme'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider theme={basicTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
