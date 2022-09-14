import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store';
import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Header from './layout/Header';
import Head from 'next/head';
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Provider store={store}>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div style={{backgroundColor: '#edf2f7'}}>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
        </div>
      </Provider>
    </ChakraProvider>
  )
}

export default MyApp
