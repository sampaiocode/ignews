import { SubscribeButton } from '../components/SubscribeButton';
import { GetServerSideProps } from 'next';

import Head from 'next/head';
import Image from 'next/image';

import styles from './home.module.scss';
import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>
            News about <br />
            the <span>React</span> world
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <Image src="/images/avatar.svg" width="334" height="520" alt="Girl Coding" />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const price = await stripe.prices.retrieve('price_1LEbQ5JJ7IuMKM8EsXvvrtwX');

  const product = {
    priceId: price.id,
    amount: Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100)
  };

  return {
    props: {
      product
    }
  };
};
