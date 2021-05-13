import { useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'

import { client } from '../utils/shopify'


export default function Detail(props) {
    const [checkoutLink, setCheckoutLink] = useState("");
    useEffect(() => {
        client.checkout.create().then((checkout) => {
            const variantsId = props.product.variants[0].id;
            client.checkout.addLineItems(checkout.id, [{ variantId: variantsId, quantity: 1}])
            .then((checkout) => {
                console.log(checkout.lineItems); 
                setCheckoutLink(checkout.webUrl);
            });
        });
    }, []);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <h1>Detail: {props.product.title}</h1>
          <div>
              {
                  props.product.variants.map((variant) => (
                      <>
                        <h2>{variant.title} (Price: ¥{variant.price})</h2>
                      </>
                  )) 
              }
          </div>
          <div>
              {JSON.stringify(props.product)}
          </div>

          <Link href={checkoutLink}><button>購入する</button></Link>
          <Link href="/" as={`/`}>
              <a>
                <h1>BACK</h1>
              </a>
            </Link>
        </div>
      </main>

    </div>
  )
}

export const getStaticPaths = async () => {
    const products = await client.product.fetchAll();
    const paths = products.map((product) => ({
      params: { id: product.id.toString() },
    }))
    return { paths, fallback: false }
  }

export const getStaticProps = async ({ params }) => {
    try {
        const id = params?.id;
        if(!id) {
          return { props: { errors: "not found" } };
        }
        const productRes = await client.product.fetch(id);
        const product = JSON.parse(JSON.stringify(productRes));
        return { props: { product: product } }
    } catch (err) {
        return { props: { errors: "unexpected error" } };
    }
};