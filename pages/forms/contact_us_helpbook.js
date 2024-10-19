import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer";
import Nav from "../../components/navbar/NavLayout";
import ContactAttendee from "../../components/forms/ContactAttendee";
export default function ContactAttendeeForm() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <link rel="shortcut icon" href="/favicon.ico" />
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
                margin: "50px auto 0px auto",
                textAlign: "center",
                fontSize: "2.1rem",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Contact Us
            </h1>
          </Row>
          <Row
            className="who-are-we"
            style={{ height: "fit-content", margin: "20px 0" }}
          >
            <p
              style={{
                margin: "auto",
                textAlign: "center",
                fontSize: "1rem",
                color: "black",
                width: "90%",
              }}
            >
              {`To attend any of the future Founders speak, AMAs sessions, Guest
              Speaker Seminars, or to be part of E-Community, Ideation Startups
              Founders Community, Idea Generation Meetings and Brainstorming
              Sessions, fill out this form. You will contacted soon after we
              receive your response.`}
            </p>
          </Row>
          <Row>
            <ContactAttendee />
          </Row>
          <Footer />
        </Container>
      </div>
    </>
  );
}
