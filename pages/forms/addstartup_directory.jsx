import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer";
import Nav from "../../components/navbar/NavLayout";
import ContactAttendee from "../../components/forms/ContactAttendee";
export default function AddStartupForm() {
  return (
    <>
      <Head>
        <title>Add Startup</title>
        <link rel="shortcut icon" href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico" />
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
              Add Startup
            </h1>
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
