import Head from "next/head";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
export default function FAQs() {
  return (
    <>
      <Head>
        <title>FAQs</title>
      </Head>
      <Nav />
      <div>
        <Container fluid className="body">
          <Row
            className="header"
            style={{ height: "fit-content", marginBottom: "50px" }}
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
              FAQs
            </h1>
            <Col
              className="info"
              style={{
                gap: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                margin: "30px auto",
              }}
            >
              <Row>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "left",
                    paddingLeft: "30px",
                  }}
                >
                  What is E-Cell IIT BHU ?
                </h2>
                <p
                  style={{
                    fontSize: "1.1rem",
                    textAlign: "left",
                    paddingLeft: "30px",
                    margin: "0px",
                  }}
                >
                  E-Cell IIT BHU is the entrepreneurial community of IIT BHU
                  providing budding entrepreneurs and enthusiasts a nurturing
                  ground to ideate innovate and incubate their startups and
                  bring out the Steve Jobs inside them!
                </p>
              </Row>
              <Row>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "left",
                    paddingLeft: "30px",
                  }}
                >
                  How can I join E-Cell IIT BHU?
                </h2>
                <p
                  style={{
                    fontSize: "1.1rem",
                    textAlign: "left",
                    paddingLeft: "30px",
                    margin: "0px",
                  }}
                >
                  Get in touch with any of the coordinators in the Team page of
                  E-Cell Website and we’ll get you added to our community.
                  Complete your assigned tasks diligently and voila! you’re now
                  a member of this growing community!
                </p>
              </Row>

              <Row>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "left",
                    paddingLeft: "30px",
                  }}
                >
                  How can I join E-Cell IIT BHU?
                </h2>
                <p
                  style={{
                    fontSize: "1.1rem",
                    textAlign: "left",
                    paddingLeft: "30px",
                    margin: "0px",
                  }}
                >
                  Get in touch with any of the coordinators in the Team page of
                  E-Cell Website and we’ll get you added to our community.
                  Complete your assigned tasks diligently and voila! you’re now
                  a member of this growing community!
                </p>
              </Row>
            </Col>
            <Col
              className="info"
              style={{
                gap: "30px",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Row>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "left",
                    paddingLeft: "30px",
                  }}
                >
                  What does E-Cell IIT BHU do ?
                </h2>
                <p
                  style={{
                    fontSize: "1.1rem",
                    textAlign: "left",
                    paddingLeft: "30px",
                    margin: "0px",
                  }}
                >
                  Get in touch with any of the coordinators in the Team page of
                  E-Cell Website and we’ll get you added to our community.
                  Complete your assigned tasks diligently and voila! you’re now
                  a member of this growing community!
                  <br /> <br />
                  We organize various events task competitions conclaves talks
                  and our flagship event i.e. E-Summit all by ourself. You’ll
                  definitely hear about us somewhere or the other.
                  <br /> <br />
                  We’ve been praised by some of the distinguished alumni of IIT
                  BHU for doing a tremendous job @ the campus and are striving
                  for excellence in our every step.
                </p>
              </Row>

              <Row>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    color: "black",
                    fontWeight: "bold",
                    textAlign: "left",
                    paddingLeft: "30px",
                  }}
                >
                  How do I get my startup associated with E-Cell?
                </h2>
                <p
                  style={{
                    fontSize: "1.1rem",
                    textAlign: "left",
                    paddingLeft: "30px",
                    margin: "0px",
                  }}
                >
                  Get in touch with any of the coordinators in the Team page of
                  E-Cell Website and we’ll get you added to our community.
                  Complete your assigned tasks diligently and voila! you’re now
                  a member of this growing community!
                </p>
              </Row>
            </Col>
          </Row>
          <Footer />
        </Container>
      </div>
    </>
  );
}
