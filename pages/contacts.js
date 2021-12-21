import Head from "next/head";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
export default function Contacts() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
      </Head>
      <Nav />
      <div>
        <Container fluid className="body">
          <Row
            className="header"
            style={{ height: "fit-content", marginBottom: "10px" }}
          >
            <h1
              style={{
                margin: "10px auto",
                textAlign: "center",
                fontSize: "4rem",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Contact Us
            </h1>
          </Row>
          <Row
            className="who-are-we"
            style={{ height: "fit-content", marginBottom: "50px" }}
          >
            <p
              style={{
                margin: "auto",
                textAlign: "center",
                fontSize: "1.5rem",
                color: "black",
              }}
            >
              There are five kinds of people who can help you succeed in
              entrepreneurship: Mentors you admire, Partners you respects,
              Employees you can trust, Friends you make time for, A family that
              supports you. Reach us out, we are always here to help you out..
            </p>
          </Row>
          <Row className="contact-container">
            <Col
              className="contact-item"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h2
                style={{
                  margin: "auto",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  color: "black",
                }}
              >
                Email
              </h2>
            </Col>
            <Col
              className="contact-item"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h2
                style={{
                  margin: "auto",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  color: "black",
                }}
              >
                Phone Number
              </h2>
            </Col>
            <Col
              className="contact-item"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <h2
                style={{
                  margin: "auto",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  color: "black",
                }}
              >
                Social Media
              </h2>
            </Col>
          </Row>
          <Footer />
        </Container>
      </div>
    </>
  );
}
