import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Footer from "../../../components/Footer";
import Nav from "../../../components/navbar/NavLayout";
import TeamExpansionForm2024 from "../../../components/forms/TeamExpansionForm2024";
export default function Contacts() {
  return (
    <>
      <Head>
        <title>Team Expansion 2024</title>
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
              E-Cell&apos;24 Team Expansion
              {/* E-Cell IIT BHU, Team Expansion 2023-24 */}
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
              The Entrepreneurship Cell (E-Cell), IIT (BHU) Varanasi aims to
              foster the spirit of entrepreneurship and innovation in the
              college.
              <br /> Fill this form to be a part of
              E-Cell Team &apos; and contribute
              to build the entrepreneurship culture!
            </p>
          </Row>
          <Row>
            <TeamExpansionForm2024 />
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
