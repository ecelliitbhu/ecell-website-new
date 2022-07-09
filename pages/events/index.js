import Head from "next/head";
import Link from "next/link";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "../../components/Footer";
import Poster from "../../public/esummit-poster.png";
import Image from "next/image";
import casex1 from "../../public/casex1.png";
import casex2 from "../../public/casex2.png";
import casex3 from "../../public/casex3.png";
import pep from "../../public/pitch-er-perfect.png";
import novice from "../../public/ecell-novice.jpeg";
import ama from "../../public/ama.png";
import pdmm from "../../public/pdmm.png";
import fs from "../../public/founder-speak.png";
import bootcamp from "../../public/bootcamp.png";
import flam from "../../public/flam.png";
import Nav from "../../components/navbar/NavLayout";
import Calender from "../../components/Calender";

import { useState } from "react";

export default function Events() {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <Head>
        <title>Events</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div>
        <Container fluid className="body">
          <Row className="what-we-do info" style={{ margin: "50px auto" }}>
            <h1 style={{ padding: "0px", margin: "10px auto" }}>
              Events @ E-Cell IIT BHU
            </h1>
            <Row className="card-container">
              <Card className="card" style={{ height: "fit-content" }}>
                <Card.Body style={{ padding: "25px 15px" }}>
                  <Image src={pep} height={250} width={250}></Image>
                  <Card.Title style={{ margin: "20px auto 10px" }}>
                    Pitching Events
                  </Card.Title>

                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "#FA8231",
                      border: "#FA8231",
                      margin: "8px auto",
                    }}
                    className="card-button"
                  >
                    Know More! &rarr;
                  </Button>
                </Card.Body>
              </Card>
              <Card className="card" style={{ height: "fit-content" }}>
                <Card.Body style={{ padding: "25px 15px" }}>
                  <Image src={novice} height={250} width={250}></Image>
                  <Card.Title style={{ margin: "20px auto 10px" }}>
                    Freshers Weekend
                  </Card.Title>

                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "#FA8231",
                      border: "#FA8231",
                      margin: "8px auto",
                    }}
                    className="card-button"
                  >
                    Know More! &rarr;
                  </Button>
                </Card.Body>
              </Card>
              <Card className="card" style={{ height: "fit-content" }}>
                <Card.Body style={{ padding: "25px 15px" }}>
                  <Image src={casex3} height={250} width={250}></Image>
                  <Card.Title style={{ margin: "20px auto 10px" }}>
                    UI/UX Competition
                  </Card.Title>

                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "#FA8231",
                      border: "#FA8231",
                      margin: "8px auto",
                    }}
                    className="card-button"
                  >
                    Know More! &rarr;
                  </Button>
                </Card.Body>
              </Card>
            </Row>

            <Row className="card-container">
              <Card className="card" style={{ height: "fit-content" }}>
                <Card.Body style={{ padding: "25px 15px" }}>
                  <Image src={casex1} height={250} width={250}></Image>
                  <Card.Title style={{ margin: "20px auto 10px" }}>
                    CasEx- National Case Study Competition
                  </Card.Title>

                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "#FA8231",
                      border: "#FA8231",
                      margin: "8px auto",
                    }}
                    className="card-button"
                  >
                    Know More! &rarr;
                  </Button>
                </Card.Body>
              </Card>
              <Card className="card" style={{ height: "fit-content" }}>
                <Card.Body style={{ padding: "25px 15px" }}>
                  <Image src={ama} height={250} width={250}></Image>
                  <Card.Title style={{ margin: "20px auto 10px" }}>
                    Ask Me Anything Sessions
                  </Card.Title>

                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "#FA8231",
                      border: "#FA8231",
                      margin: "8px auto",
                    }}
                    className="card-button"
                  >
                    Know More! &rarr;
                  </Button>
                </Card.Body>
              </Card>
              <Card className="card" style={{ height: "fit-content" }}>
                <Card.Body style={{ padding: "25px 15px" }}>
                  <Image src={pdmm} height={250} width={250}></Image>
                  <Card.Title style={{ margin: "20px auto 10px" }}>
                    Masterclasses
                  </Card.Title>

                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "#FA8231",
                      border: "#FA8231",
                      margin: "8px auto",
                    }}
                    className="card-button"
                  >
                    Know More! &rarr;
                  </Button>
                </Card.Body>
              </Card>
            </Row>

            <Row className="card-container">
              <Card className="card" style={{ height: "fit-content" }}>
                <Card.Body style={{ padding: "25px 15px" }}>
                  <Image src={fs} height={250} width={250}></Image>
                  <Card.Title style={{ margin: "20px auto 10px" }}>
                    {`Founder’s Speak`}
                  </Card.Title>

                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "#FA8231",
                      border: "#FA8231",
                      margin: "8px auto",
                    }}
                    className="card-button"
                  >
                    Know More! &rarr;
                  </Button>
                </Card.Body>
              </Card>
              <Card className="card" style={{ height: "fit-content" }}>
                <Card.Body style={{ padding: "25px 15px" }}>
                  <Image src={bootcamp} height={250} width={250}></Image>
                  <Card.Title style={{ margin: "20px auto 10px" }}>
                    Bootcamps
                  </Card.Title>

                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "#FA8231",
                      border: "#FA8231",
                      margin: "8px auto",
                    }}
                    className="card-button"
                  >
                    Know More! &rarr;
                  </Button>
                </Card.Body>
              </Card>
              <Card className="card" style={{ height: "fit-content" }}>
                <Card.Body style={{ padding: "25px 15px" }}>
                  <Image src={flam} height={250} width={250}></Image>
                  <Card.Title style={{ margin: "20px auto 10px" }}>
                    Webinars
                  </Card.Title>

                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "#FA8231",
                      border: "#FA8231",
                      margin: "8px auto",
                    }}
                    className="card-button"
                  >
                    Know More! &rarr;
                  </Button>
                </Card.Body>
              </Card>
            </Row>
          </Row>
          <Row style={{ margin: "100px auto" }} className="calender-component">
            <h1
              style={{
                margin: "auto",
                textAlign: "center",
                fontSize: "4rem",
                fontWeight: "bold",
              }}
            >
              Calender
            </h1>
            <Calender />
          </Row>
          <div id="instafeed-container"></div>
          <Footer />
        </Container>
      </div>
    </>
  );
}
