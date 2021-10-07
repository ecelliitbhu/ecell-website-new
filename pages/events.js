import Head from "next/head";
import { Container, Row, Col, Button, Card} from "react-bootstrap";
import Footer from "../components/Footer";
import Poster from "../public/esummit_poster.png";
import Image from "next/image";
import casex1 from "../public/casex1.png";
import casex2 from "../public/casex2.png";
import casex3 from "../public/casex3.png";
import Nav from "../components/navbar/NavLayout";
import { useState} from "react";
export default function Events() {
  const [loadMore, setLoadMore] = useState(false);
  return (
    <>
      <Head>
        <title>Events</title>
      </Head>
      <Nav />
      <div>
        <Container fluid className="body">
          <Row
            className="header"
            style={{
              backgroundColor: "white",
              width: "fit-content",
              border: "1px solid white",
              borderRadius: "20px",
              padding: "20px 0px",
              margin: "40px auto",
              justifyContent: "center",
            }}
          >
            <Col
              className="info"
              style={{ backgroundColor: "white", width: "95%" }}
            >
              <h1
                style={{
                  backgroundColor: "white",
                  color: "black",
                  marginTop: "40px",
                  fontWeight: "normal",
                }}
              >
                The Annual Entrepreneurial Fest <br />
                of IIT BHU is here !
              </h1>
              <Button
                variant="info"
                className="get-started"
                style={{
                  backgroundColor: "#FA8231",
                  border: "#FA8231",
                  width: "200px",
                }}
              >
                Register Now!
              </Button>
            </Col>
            <Col
              className="image-section"
              style={{
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "50px auto",
                padding: "0px",
                width: "95%",
              }}
            >
              <Image src={Poster} height={370} width={1394}></Image>
            </Col>
          </Row>
          <Row></Row>
          <Row className="what-we-do info" style={{ margin: "50px auto" }}>
            <h1 style={{ padding: "0px" }}>Events @ E-Cell IIT BHU</h1>
            <Row className="card-container">
              <Card className="card" style={{ height: "fit-content" }}>
                <Card.Body style={{ padding: "25px 15px" }}>
                  <Image src={casex1} height={320} width={290}></Image>
                  <Card.Title style={{ margin: "10px auto" }}>CaseX</Card.Title>
                  <Card.Text style={{ height: "15px" }}>
                    3rd-12th Sept
                  </Card.Text>
                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "#FA8231",
                      border: "#FA8231",
                      margin: "8px auto",
                    }}
                    className="card-button"
                  >
                    Know More! &rarr;
                  </Button>
                </Card.Body>
              </Card>
              <Card className="card" style={{ height: "fit-content" }}>
                <Card.Body style={{ padding: "25px 15px" }}>
                  <Image src={casex2} height={320} width={290}></Image>
                  <Card.Title style={{ margin: "10px auto" }}>
                    Idea Validation Bootcamp
                  </Card.Title>
                  <Card.Text style={{ height: "15px" }}>
                    3rd-12th Sept
                  </Card.Text>
                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "#FA8231",
                      border: "#FA8231",
                      margin: "8px auto",
                    }}
                    className="card-button"
                  >
                    Know More! &rarr;
                  </Button>
                </Card.Body>
              </Card>
              <Card className="card" style={{ height: "fit-content" }}>
                <Card.Body style={{ padding: "25px 15px" }}>
                  <Image src={casex3} height={320} width={290}></Image>
                  <Card.Title style={{ margin: "10px auto" }}>
                    Design Rush
                  </Card.Title>
                  <Card.Text style={{ height: "15px" }}>
                    3rd-12th Sept
                  </Card.Text>
                  <Button
                    variant="danger"
                    style={{
                      backgroundColor: "#FA8231",
                      border: "#FA8231",
                      margin: "8px auto",
                    }}
                    className="card-button"
                  >
                    Know More! &rarr;
                  </Button>
                </Card.Body>
              </Card>
            </Row>
            <Button
              variant="warning"
              style={{ width: "150px", margin: "auto"}}
              onClick={() => setLoadMore(!loadMore)}
            >
              Load More
            </Button>
            {loadMore && (
              <Row className="card-container">
                <Card className="card" style={{ height: "fit-content" }}>
                  <Card.Body style={{ padding: "25px 15px" }}>
                    <Image src={casex1} height={320} width={290}></Image>
                    <Card.Title style={{ margin: "10px auto" }}>
                      CaseX
                    </Card.Title>
                    <Card.Text style={{ height: "15px" }}>
                      3rd-12th Sept
                    </Card.Text>
                    <Button
                      variant="danger"
                      style={{
                        backgroundColor: "#FA8231",
                        border: "#FA8231",
                        margin: "8px auto",
                      }}
                      className="card-button"
                    >
                      Know More! &rarr;
                    </Button>
                  </Card.Body>
                </Card>
                <Card className="card" style={{ height: "fit-content" }}>
                  <Card.Body style={{ padding: "25px 15px" }}>
                    <Image src={casex2} height={320} width={290}></Image>
                    <Card.Title style={{ margin: "10px auto" }}>
                      Idea Validation Bootcamp
                    </Card.Title>
                    <Card.Text style={{ height: "15px" }}>
                      3rd-12th Sept
                    </Card.Text>
                    <Button
                      variant="danger"
                      style={{
                        backgroundColor: "#FA8231",
                        border: "#FA8231",
                        margin: "8px auto",
                      }}
                      className="card-button"
                    >
                      Know More! &rarr;
                    </Button>
                  </Card.Body>
                </Card>
                <Card className="card" style={{ height: "fit-content" }}>
                  <Card.Body style={{ padding: "25px 15px" }}>
                    <Image src={casex3} height={320} width={290}></Image>
                    <Card.Title style={{ margin: "10px auto" }}>
                      Design Rush
                    </Card.Title>
                    <Card.Text style={{ height: "15px" }}>
                      3rd-12th Sept
                    </Card.Text>
                    <Button
                      variant="danger"
                      style={{
                        backgroundColor: "#FA8231",
                        border: "#FA8231",
                        margin: "8px auto",
                      }}
                      className="card-button"
                    >
                      Know More! &rarr;
                    </Button>
                  </Card.Body>
                </Card>
              </Row>
            )}
          </Row>
          <Footer/>
        </Container>
      </div>
    </>
  );
}