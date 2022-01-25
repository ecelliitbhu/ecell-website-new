import "../styles/globals.scss";
import Layout from "../components/Layout";
import SSRProvider from "react-bootstrap/SSRProvider";
import { AuthProvider } from "../context/auth";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <AuthProvider>
        <Layout>
          <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </SSRProvider>
  );
}

export default MyApp;
