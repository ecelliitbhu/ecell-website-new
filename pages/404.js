import Head from "next/head";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";

const Error = () => {
  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <link rel="shortcut icon" href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico" />
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
              src="https://assets10.lottiefiles.com/packages/lf20_25qm2qe0.json"
              background="transparent"
              speed="1"
              style={{
                height: "500px",
                width: "80%",
                margin: "0px auto",
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

export default Error;
