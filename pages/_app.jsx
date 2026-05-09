import '../styles/globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
  const { company, nav } = pageProps;
  const gaId = company?.analyticsId;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}</Script>
        </>
      )}
      <Header company={company} nav={nav} />
      <main style={{ paddingTop: 68 }}>
        <Component {...pageProps} />
      </main>
      <Footer company={company} />
    </>
  );
}
