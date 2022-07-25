import { GetServerSideProps, GetStaticProps } from 'next';
import { getPrismicCLient } from '../../services/prismic';

import Head from 'next/head';
import Prismic from '@prismicio/client';

import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.postsList}>
          <a href="#">
            <time>20 de julho de 2022</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a Monorepo to manage multiple packages
              with a shared build, test, and release process.
            </p>
          </a>
          <a href="">
            <time>20 de julho de 2022</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a Monorepo to manage multiple packages
              with a shared build, test, and release process.
            </p>
          </a>
          <a href="">
            <time>20 de julho de 2022</time>
            <strong>Creating a Monorepo with Lerna & Yarn Workspaces</strong>
            <p>
              In this guide, you will learn how to create a Monorepo to manage multiple packages
              with a shared build, test, and release process.
            </p>
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicCLient();

  const response = await prismic.getByType('post', {
    fetch: ['post.title', 'post.content'],
    pageSize: 100
  });

  console.log(JSON.stringify(response, null, 2));

  return {
    props: {}
  };
};
