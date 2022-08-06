import { AppProps } from '../../node_modules/next/app';
import { Header } from '../components/Header';
import { Router } from 'next/router';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';

import nProgress from 'nprogress';

import '../styles/global.scss';

Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}

export default MyApp;
