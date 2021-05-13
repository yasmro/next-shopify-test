import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { client } from '../utils/shopify'

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          {props.products.map((product) => (
            <Link href="/[id]" as={`/${product.id}`}>
              <a>
                <h1>{product.title}</h1>
              </a>
            </Link>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export const getStaticProps = async () => {  
  const products = await client.product.fetchAll();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
};