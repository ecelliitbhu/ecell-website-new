import "../styles/globals.scss";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import SSRProvider from "react-bootstrap/SSRProvider";
import { AuthProvider } from "../context/auth";
import Head from "next/head";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

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
      <AuthProvider>
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
          <Layout>
            <Head>
              <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
          </Layout>
        )}
      </AuthProvider>
    </SSRProvider>
  );
}

export default MyApp;
