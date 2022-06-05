import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Footer from "../../../components/Footer";
import Nav from "../../../components/navbar/NavLayout";
import GroupD from "../../../components/forms/GroupD";
export default function GD() {
  return (
    <>
      <Head>
        <title>Group Discussion Day-2</title>
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
              Group Discussion Day-2
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
              Those students who could not attend today’s Group Discussions for
              Team Expansion of E-Cell IIT BHU should fill up this form.
              <br /> Schedule will be notified through Whatsapp.
            </p>
          </Row>
          <Row>
            <GroupD />
          </Row>
          <Footer />
        </Container>
      </div>
    </>
  );
}
