import Nav from "../components/navbar/NavLayout";
import Footer from "../components/Footer";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import {
  Esummit,
  GuestLectures,
  FoundersSpeak,
  Workshops,
} from "../components/Gallery";
const Gallery = () => {
  return (
    <>
      <Head>
        <title>Gallery</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div>
        <Container fluid className="body">
          <Row
            className="header"
            style={{ height: "fit-content", margin: "50px 0px" }}
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
              Gallery
            </h1>
            <h3
              style={{
                margin: "10px auto",
                fontSize: "1.8rem",
                textAlign: "center",
                color: "black",
              }}
            >
              A GLIMPSE INTO LIFE WITH E-CELL
            </h3>
          </Row>
          <Row
            className="esummit"
            style={{
              height: "fit-content",
              marginBottom: "50px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                margin: "10px auto",
                textAlign: "center",
                fontSize: "2.5rem",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Esummit
            </h1>
            <Esummit></Esummit>
          </Row>
          <Row
            className="founder-speak"
            style={{
              height: "fit-content",
              marginBottom: "50px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                margin: "10px auto",
                textAlign: "center",
                fontSize: "2.5rem",
                color: "black",
                fontWeight: "bold",
              }}
            >
              {`Founder's Speak`}
            </h1>
            <FoundersSpeak></FoundersSpeak>
          </Row>
          <Row
            className="workshops"
            style={{
              height: "fit-content",
              marginBottom: "50px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                margin: "10px auto",
                textAlign: "center",
                fontSize: "2.5rem",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Workshops
            </h1>
            <Workshops></Workshops>
          </Row>
          <Row
            className="guest-lectures"
            style={{
              height: "fit-content",
              marginBottom: "50px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                margin: "10px auto",
                textAlign: "center",
                fontSize: "2.5rem",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Guest Lectures
            </h1>
            <GuestLectures></GuestLectures>
          </Row>
          <Footer />
        </Container>
      </div>
    </>
  );
};

export default Gallery;
