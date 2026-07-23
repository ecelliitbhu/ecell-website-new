import React, { useEffect, useState } from "react";
import "../styles/globals.scss";
import Router from "next/router";
import dynamic from "next/dynamic";
// import SSRProvider from "react-bootstrap/SSRProvider";
import Layout from "../components/Layout";
import { AuthProvider } from "../context/auth";
import Head from "next/head";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

import GlobalProvider from "@/components/Providers/GlobalProvider";
import { SessionProvider } from "next-auth/react";


function MyApp({ Component, pageProps:{session,...pageProps}, }) {
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
    // <SSRProvider>
    <SessionProvider session={session}>
<GlobalProvider>
      <Layout>
        <Head>
          <link rel="shortcut icon" href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
            key="viewport"
          />
          <meta name="robots" content="index, follow" />
        </Head>
        {loading ? (

          <p>Loading...</p>
        ) : (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=G-Y2J09VFNXJ`}
            />

            <Script id="google-analytics" strategy="afterInteractive">
              {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-Y2J09VFNXJ');
                `}
            </Script>

             {/* added */}
            <Script
              strategy="afterInteractive"
              src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
              integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ"
              crossOrigin="anonymous"
            />

            
            <Component {...pageProps} />

            <Analytics />
            <div>
              <Toaster position={"top-center"} />
            </div>
          </>
        )}
      </Layout>
</GlobalProvider>
</SessionProvider>
  );
}

export default MyApp;
