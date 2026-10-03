import React, { useEffect, useState } from "react";
import "../styles/globals.scss";
import Router from "next/router";
import Layout from "../components/Layout";
import Head from "next/head";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { Poppins } from "next/font/google";

import GlobalProvider from "@/components/Providers/GlobalProvider";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  const isGYR = router?.pathname?.startsWith("/grow-your-resume");

  useEffect(() => {
    const handleComplete = () => {};

    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  const content = (
        <div className={poppins.variable}>
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
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=G-Y2J09VFNXJ`}
            />

            <Script id="google-analytics" strategy="lazyOnload">
              {`
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-Y2J09VFNXJ');
              `}
            </Script>

            {/* added */}
            <Script
              strategy="lazyOnload"
              src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
              integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ"
              crossOrigin="anonymous"
            />

            <Component {...pageProps} />

            <Analytics />
            <div>
              <Toaster position={"top-center"} />
            </div>
          </Layout>
        </div>
  );

  return (
    <SessionProvider session={session} refetchInterval={0} refetchOnWindowFocus={false}>
      {isGYR ? content : <GlobalProvider>{content}</GlobalProvider>}
    </SessionProvider>
  );
}

export default MyApp;
