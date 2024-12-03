import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Footer from "../../../components/Footer";
import Nav from "../../../components/navbar/NavLayout";
import Campus_Ambassador_Program from "../../../components/forms/Campus_Ambassador_Program";
export default function Contacts() {
  return (
    <>
      <Head>
        <title>Campus Ambassador's Program</title>
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
                fontSize: "2.5rem",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Campus Ambassador's Program
              {/* E-Cell IIT BHU, Campus Ambassador's Program  2023-24 */}
            </h1>
          </Row>
          <Row
            className="about-this-program"
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
              Campus Ambassador's Program by E-Cell IIT BHU offers students the chance to
              represent and promote the organization at their school, colleges and universities.
              <br /> This internship is a unique opportunity to sharpen your leadership, outreach, and
              communication skills. Please fill out the form carefully as the information provided
              will help us assess your application.

            </p>
          </Row>
          <Row>
            <Campus_Ambassador_Program />
          </Row>
          <Footer />
        </Container>
      </div>
    </>
  );
}
