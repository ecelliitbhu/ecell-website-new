import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer";
import Nav from "../../components/navbar/NavLayout";
import TeamInfo from "../../components/forms/TeamInfo"
export default function TeamInfoForm() {
  return (
    <>
      <Head>
        <title>Team Members Info</title>
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
              Team Members Info
            </h1>
          </Row>
          {/* <Row
            className="who-are-we"
            style={{ height: "fit-content", margin:"20px 0" }}
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
              The Entrepreneurship Cell (E-Cell), IIT (BHU) Varanasi aims to
              foster the spirit of entrepreneurship and innovation in the
              college.
              <br /> Fill this form to be a part of the E-Cell, and contribute
              to building the entrepreneurship culture!
            </p>
          </Row> */}
          <Row>
            <TeamInfo />
          </Row>
          <Footer />
        </Container>
      </div>
    </>
  );
}
