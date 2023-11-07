import Footer from "@/components/Footer";
import Nav from "@/components/navbar/NavLayout";
import Head from "next/head";
import { Container } from "react-bootstrap";
import styles from "@/pages/sip/sip.module.css";

export default function SIP() {
  return (
    <>
      <Head>
        <title>Startup Junction</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div>
        <Nav />
        <Container fluid className="body">
          <h1 className={styles.heading}>Startup Internship Portal</h1>
          <div className={styles.container}>
            <iframe
              className={styles.iframe}
              src="https://formfacade.com/public/100610822838405973517/all/form/1FAIpQLSccBs16Xwt8EPkQx_ApLhWsrtm3nfYyGW-71UVW2lFhcqVT7A"
            ></iframe>
          </div>
        </Container>
        <Footer />
      </div>
    </>
  );
}
