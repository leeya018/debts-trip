import { GoogleOAuthProvider } from "@react-oauth/google"
import Head from "next/head"
import { autorun } from "mobx"
import "../styles/globals.css"
import "../styles/style.css"
import { userStore } from "mobx/userStore"

export function reportWebVitals(metric) {
  if (metric.label === "web-vital") {
    console.log(metric.name, metric.value) // or send to analytics
  }
}
export default function App({ Component, pageProps }) {
  autorun(() => {
    userStore.saveState()
  })
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
      <Head></Head>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  )
}
