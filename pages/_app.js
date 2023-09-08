import { GoogleOAuthProvider } from "@react-oauth/google"
import Head from "next/head"
import "../styles/globals.css"
export function reportWebVitals(metric) {
  if (metric.label === "web-vital") {
    console.log(metric.name, metric.value) // or send to analytics
  }
}
export default function App({ Component, pageProps }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
      <Head>
        {/* <script
          src={`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`}
        ></script> */}
      </Head>
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  )
}
