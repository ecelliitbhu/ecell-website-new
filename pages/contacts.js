import Link from "next/link";
import Head from "next/head";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import {
  FaDiscord,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import ContactForm from "../components/forms/ContactForm";
export default function Contacts() {
  return (
    <>
      <Head>
        <title>Contact Us</title>
        <meta name="robots" content="index, follow" />
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
                width: "90%",
              }}
            >
              There are five kinds of people who can help you succeed in
              entrepreneurship: Mentors you admire, Partners you respects,
              Employees you can trust, Friends you make time for, A family that
              supports you.
              <br /> Reach us out, we are always here to help you out..
            </p>
          </Row>
          <Row
            className="contact-container"
            style={{ height: "fit-content", marginBottom: "50px", gap: "20px" }}
          >
            <Col
              className="contact-item"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  margin: "auto",
                  textAlign: "center",
                  fontSize: "1.5rem",
                  color: "#FA8132",
                }}
              >
                Email
              </h2>
              <p
                href="mailto:ecell@iitbhu.ac.in"
                style={{
                  margin: "auto",
                  textAlign: "center",
                  fontSize: "1.2rem",
                  color: "black",
                }}
              >
                <Link href="mailto:ecell@iitbhu.ac.in">ecell@iitbhu.ac.in</Link>
              </p>
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
                  color: "#FA8132",
                }}
              >
                Phone Number
              </h2>
              <p
                style={{
                  margin: "auto",
                  textAlign: "center",
                  fontSize: "1.2rem",
                  color: "black",
                }}
              >
                +91 9587887413
              </p>
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
                  color: "#FA8132",
                }}
              >
                Social Media
              </h2>
              <Row
                className="social"
                style={{
                  margin: "0px auto",
                  gap: "0px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                  width: "280px",
                }}
              >
                <Link href="https://www.instagram.com/ecelliitbhu/" passHref>
                  <FaInstagram
                    className="social-icons"
                    style={
                      {
                        // margin: "2px",
                        // fontSize: "1.5rem",
                      }
                    }
                  ></FaInstagram>
                </Link>
                <Link href="https://www.facebook.com/ecelliitvaranasi" passHref>
                  <FaFacebook
                    className="social-icons"
                    style={
                      {
                        // margin: "2px",
                        // fontSize: "1.5rem",
                      }
                    }
                  ></FaFacebook>
                </Link>
                <Link
                  href="https://www.linkedin.com/company/ecelliitbhu/"
                  passHref
                >
                  <FaLinkedin
                    className="social-icons"
                    style={
                      {
                        // margin: "2px",
                        // fontSize: "1.5rem",
                      }
                    }
                  ></FaLinkedin>
                </Link>
                <Link href="https://twitter.com/ecelliitbhu" passHref>
                  <FaTwitter
                    className="social-icons"
                    style={
                      {
                        // margin: "2px",
                        // fontSize: "1.5rem",
                      }
                    }
                  ></FaTwitter>
                </Link>
                <Link
                  href="https://www.youtube.com/channel/UCUme5nNmSKY1GiUBUhlAnOQ"
                  passHref
                >
                  <FaYoutube
                    className="social-icons"
                    style={
                      {
                        // margin: "2px",
                        // fontSize: "1.5rem",
                      }
                    }
                  ></FaYoutube>
                </Link>
                <Link href="https://discord.com/invite/EPm5mfbCKP" passHref>
                  <FaDiscord
                    className="social-icons"
                    style={
                      {
                        // margin: "2px",
                        // fontSize: "1.5rem",
                      }
                    }
                  ></FaDiscord>
                </Link>
              </Row>
            </Col>
          </Row>
          <Row>
            <ContactForm></ContactForm>
          </Row>
          <Row style={{ marginBottom: "50px" }}>
            <h1
              style={{
                margin: "10px auto",
                textAlign: "center",
                fontSize: "2rem",
                color: "#FA8132",
                fontWeight: "bold",
              }}
            >
              Address
            </h1>
            <p
              style={{
                margin: "auto",
                textAlign: "center",
                fontSize: "1.2rem",
                color: "black",
              }}
            >
              Indian Institute of Technology (Banaras Hindu University),
              Varanasi, India, PIN:221005
            </p>
          </Row>
          <Footer />
        </Container>
      </div>
    </>
  );
}
