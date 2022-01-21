import "../styles/globals.scss";
import Layout from "../components/Layout";
import SSRProvider from "react-bootstrap/SSRProvider";
function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  );
}

export default MyApp;
