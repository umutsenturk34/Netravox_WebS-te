import '../styles/globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const { company, nav } = pageProps;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header company={company} nav={nav} />
      <main style={{ paddingTop: 68 }}>
        <Component {...pageProps} />
      </main>
      <Footer company={company} />
    </>
  );
}
