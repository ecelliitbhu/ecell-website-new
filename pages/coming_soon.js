import Head from "next/head";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";

const ComingSoon = () => {
  return (
    <>
      <Head>
        <title>Coming Soon</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div>
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <lottie-player
              src="https://assets5.lottiefiles.com/packages/lf20_m6cuL6.json"
              background="transparent"
              speed="1"
              style={{
                height: "100%",
                width: "80%",
                margin: "80px auto 80px",
              }}
              loop
              autoplay
            ></lottie-player>
          </div>
          <Footer />
        </Container>
      </div>
      <script
        async
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
      ></script>
    </>
  );
};

export default ComingSoon;
