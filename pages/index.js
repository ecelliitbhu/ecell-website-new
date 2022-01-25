import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
// import styles from '../styles/Home.module.css'
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Collage from "../components/collage/Collage";
// import Collage from "../components/collage/Collage";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import Testimonials from "../components/Testimonials";
// import Vector from "../public/startup-image.png"
var stripe_load = () => {
  if (typeof window !== "undefined") {
    const typingPromises = (message, timeout, reverse) =>
      [...message].map(
        (ch, i) =>
          new Promise((resolve) => {
            if (reverse) {
              setTimeout(() => {
                resolve(message.substring(0, message.length - i - 1));
              }, (timeout / 2) * i);
            } else {
              setTimeout(() => {
                resolve(message.substring(0, i + 1));
              }, timeout * i);
            }
          })
      );

    // Used to add manual delays.
    const delay = (ms) => new Promise((res) => setTimeout(res, ms));

    // Changes the text of the "#terminal" id.
    class Terminal {
      // Construct a new object using an array of text,
      // interval between typing characters, and the
      // delay between typing / erasing.
      constructor(text, interval, pause) {
        this.text = text;
        this.interval = interval;
        this.pause = pause;
        this.counter = 0;
        this.update();
      }

      // Asynchronously update the terminal text.
      async update() {
        // Circle back to the start of the list.
        if (this.counter === this.text.length) {
          this.counter = 0;
        }

        // Get the next message, and update the counter for next time.
        let message = this.text[this.counter];
        this.counter++;

        // Type the word, going forwards.
        typingPromises(message, this.interval, false).forEach((promise) => {
          promise.then((portion) => {
            document.getElementById("terminal").innerHTML = portion;
          });
        });

        // Wait until it's finished.
        await delay(this.interval * message.length + this.pause);

        // Erase the word, going backwards.
        typingPromises(message, this.interval, true).forEach((promise) => {
          promise.then((portion) => {
            document.getElementById("terminal").innerHTML = portion;
          });
        });

        // Wait until it's finished.
        await delay((this.interval / 4) * message.length + this.pause);

        // Now do it again!
        this.update();
      }
    }
    let titles = ["Ideation", "Innovation", "Execution", "Incubation"];
    const term = new Terminal(titles, 100, 1500);
  }
};
export default function Home() {
  useEffect(()=>stripe_load(),[]);
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
              <h2>{"Accelerate Your"}</h2>
              <h2 id="terminal"></h2>
              <h2>{"Journey!"}</h2>
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
                src="https://assets3.lottiefiles.com/packages/lf20_ewvhihmc.json"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </Col>
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
              <dotlottie-player
                src="https://assets7.lottiefiles.com/dotlotties/dlf10_wpar4she.lottie"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></dotlottie-player>
            </Col>
          </Row>
          <Row>
            <Collage></Collage>
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
                    src="https://assets10.lottiefiles.com/packages/lf20_oxwzlirk.json"
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
                    src="https://assets2.lottiefiles.com/packages/lf20_s7vzoj2n.json"
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
            </Row>
          </Row>
          <Row></Row>
          <Row className="collage-container" style={{ margin: "70px 0px" }}>
            <h1>What people think about us</h1>
            <Testimonials></Testimonials>
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
        src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"
      ></script>
      <script
        async
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
      ></script>
    </>
  );
}
