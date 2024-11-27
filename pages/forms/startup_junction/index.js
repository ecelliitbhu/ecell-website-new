import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Footer from "../../../components/Footer";
import Nav from "../../../components/navbar/NavLayout";
import StartupJunctionForm from "../../../components/forms/StartupJunctionForm";
export default function Contacts() {
  return (
    <>
      <Head>
        <title>Startup Junction 2024</title>
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
              Startup Junction, E-Cell IIT BHU
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
              Startup Junction, an initiative by the Entrepreneurship Cell of
              IIT BHU, fosters our nation&apos;s startup ecosystem. We connect
              venture capitalists with promising startups, offering a dynamic
              platform for innovation, growth, and collaboration.
              <br />
            </p>
          </Row>
          <Row>
            <StartupJunctionForm />
          </Row>
          <Footer />
        </Container>
      </div>
      {/* <div>
        <Container>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ margin: "200px auto", fontSize: "2rem", color: "red", fontWeight: "bold" }}>
              Thanks for visiting! The form has now closed, if you think that
              you are a valuable asset to the team, then please mail your
              candidature at
              <a href="mailto:ecell@iitbhu.ac.in"> ecell@iitbhu.ac.in</a>
            </h2>
          </div>
          <Footer />
        </Container>
      </div> */}
    </>
  );
}
