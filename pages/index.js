import Head from "next/head";
// import Image from "next/image";
// import styles from '../styles/Home.module.css'
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Collage from "../components/collage/Collage";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
// import Vector from "../public/startup-image.png"
export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Nav />
      <div>
        <Container fluid className="body">
          <Row className="header">
            <Col className="info">
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
            <Col className="image-section">
              <lottie-player
                src="https://assets8.lottiefiles.com/packages/lf20_ihwqyxn5.json"
                background="transparent"
                speed="1"
                autoplay
                loop
              ></lottie-player>
            </Col>
          </Row>
          <Row>
            <span className="tag">
              Ideate&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Innovate&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;Incubate
            </span>
          </Row>
          <Row className="who-are-we">
            <Col className="info waw">
              <h1>Who are we?</h1>
              <p>
                E-Cell IIT BHU is an institute body run by the students of IIT
                (BHU) Varanasi devoted to acting as a symbiotic link between the
                entrepreneurs of E-Cell and the existing startup ecosystem as
                well as acting as a hub where all the startups can meet
                ,collaborate and innovate!
              </p>
              <Button variant="dark" className="learn-more">
                Learn more about E-Cell &rarr;
              </Button>
              <Row className="reach">
                <Col>
                  <h3 className="reach-num">50000+</h3>
                  <p className="reach-info">overall social reach!</p>
                </Col>
                <Col>
                  <h3 className="reach-num">108</h3>
                  <p className="reach-info">startups supported till date!</p>
                </Col>
              </Row>
            </Col>
            <Col className="image-section">
              <lottie-player
                src="https://assets1.lottiefiles.com/packages/lf20_lxgjrju4.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </Col>
          </Row>
          <Row className="what-we-do info">
            <h1>What we do?</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem
              veniam quibusdam explicabo deleniti sunt quas, dolorum velit,
              pariatur labore alias a aspernatur impedit quia similique vol
            </p>
            <Row className="card-container">
              <Card className="card">
                <Card.Body>
                  <lottie-player
                    src="https://assets8.lottiefiles.com/packages/lf20_gomzks5q.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This card has supporting text below as a natural lead-in to
                    additional content.{" "}
                  </Card.Text>
                  <Button variant="dark" className="card-button">
                    Card Button &rarr;
                  </Button>
                </Card.Body>
              </Card>
              <Card className="card">
                <Card.Body>
                  <lottie-player
                    src="https://assets8.lottiefiles.com/packages/lf20_gomzks5q.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This card has supporting text below as a natural lead-in to
                    additional content.{" "}
                  </Card.Text>
                  <Button variant="dark" className="card-button">
                    Card Button &rarr;
                  </Button>
                </Card.Body>
              </Card>
              <Card className="card">
                <Card.Body>
                  <lottie-player
                    src="https://assets8.lottiefiles.com/packages/lf20_gomzks5q.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This card has even longer
                    content than the first to show that equal height action.
                  </Card.Text>
                  <Button variant="dark" className="card-button">
                    Card Button &rarr;
                  </Button>
                </Card.Body>
              </Card>
            </Row>
          </Row>
          <Row>
            <Collage />
          </Row>
          <Footer />
        </Container>
      </div>
      <script
        async
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
      ></script>
      <script
        async
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
      ></script>
      <script
        async
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
      ></script>
    </>
  );
}
