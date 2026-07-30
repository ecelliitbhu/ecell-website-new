import React from "react";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../components/Footer";
import Nav from "../../components/navbar/NavLayout";
import MentorshipProgramme from "../../components/forms/MentorshipProgramme";

function mentorship_programme() {
  return (
    <>
      <Head>
        <title>Mentorship Programme 2022-23</title>
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
                margin: "50px auto 5px auto",
                textAlign: "center",
                fontSize: "2.7rem",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Mentorship Programme 2022-23
            </h1>



          </Row>
          <Row>
            <MentorshipProgramme />
          </Row>
          <Footer />
        </Container>
      </div>
    </>
  );
}

export default mentorship_programme;
