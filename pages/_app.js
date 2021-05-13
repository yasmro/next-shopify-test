import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <h1>Shopify x JAMStack with Next.js!</h1>
      <div className="container mx-auto px-4">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
