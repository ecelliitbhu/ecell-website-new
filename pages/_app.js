import "../styles/globals.scss";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import SSRProvider from "react-bootstrap/SSRProvider";
import { AuthProvider } from "../context/auth";
import Head from "next/head";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    Router.events.on("routeChangeStart", (url, { shallow }) => {
      setLoading(true);
    });
    Router.events.on("routeChangeComplete", (url, { shallow }) => {
      setLoading(false);
    });
  }, []);

  return (
    <SSRProvider>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-BGE65NNDEZ`}
      />
      <Script
        strategy="lazyOnload"
        src={`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-BGE65NNDEZ');`}
      />

      <AuthProvider>
        <Layout>
          <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
          </Head>
          {loading ? (
            <Player
              autoplay
              loop
              src="https://assets8.lottiefiles.com/packages/lf20_b0firirj.json"
              style={{ height: "300px", width: "300px" }}
            >
              <Controls visible={false} />
            </Player>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </AuthProvider>
    </SSRProvider>
  );
}

export default MyApp;
