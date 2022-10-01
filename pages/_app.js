import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store';
import * as React from 'react';
import Header from './layout/Header';
import Navigation from './layout/Navigation';
import Config from './layout/Config';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <title>科技博客</title>
        <meta name="description" content="技術ブログ" />
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5003930059909941" crossOrigin="anonymous"></script>
      </Head>
      <div>
        <Header />
        <Navigation />
        <main>
          <Component {...pageProps} />
        </main>
      </div>
      <Config></Config>
    </Provider>
  )
};

export default MyApp
