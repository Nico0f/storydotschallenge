import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from './layout'

export default function App({ Component, pageProps }: AppProps) {
  //@ts-ignore
  if (Component.getLayout) {
  //@ts-ignore
    return Component.getLayout(
          <Component {...pageProps} />
        )
    }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
