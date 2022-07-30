import { GetStaticProps } from 'next';
import { getPrismicCLient } from '../../services/prismic';
import { RichText } from 'prismic-dom';
import Link from 'next/link';

import Head from 'next/head';
import styles from './styles.module.scss';

type Post = {
  slug: string;
  title: string;
  summary: string;
  updatedAt: string;
};

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.postsList}>
          {posts.map(post => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.summary}</p>
              </a>
            </Link>
          ))}
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

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      summary:
        post.data.content.find(content => content.type === 'paragraph' || 'heading3')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    };
  });

  return {
    props: {
      posts
    }
  };
};
