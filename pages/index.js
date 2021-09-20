import Head from "next/head";
// import Image from "next/image";
// import styles from '../styles/Home.module.css'
import { Container, Row, Col, Button } from "react-bootstrap";
// import Vector from "../public/startup-image.png"
export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
      <div>
        <Container fluid>
          <Row className="header">
            <Col className="header-info">
              <h1>E-Cell IIT BHU</h1>
              <h2>Accelerate your Startup Journey</h2>
              <p>
                Welcome to the entrepreneurship community of IIT BHU where we
                ideate, innovate and incubate the future innovations of the
                century!
              </p>
              <Button variant="info" className="get-started">
                Get Started !
              </Button>
            </Col>
            <Col className="header-image">
              <lottie-player
                src="https://assets8.lottiefiles.com/packages/lf20_ihwqyxn5.json"
                background="transparent"
                speed="1"
                autoplay
              ></lottie-player>
            </Col>
          </Row>
          <Row><span className="tag">Ideate|Innovate|Incubate</span></Row>
        </Container>
      </div>
    </>
  );
}
