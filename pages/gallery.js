import Nav from "../components/navbar/NavLayout";
import Footer from "../components/Footer";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import {
  FoundersSpeak,
  AlumniMeetups,
  ESummit,
  MentorshipSessions,
  PitchingEvents,
  Incubators,
  ELectures,
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
              Alumni Meetups
            </h1>
            <AlumniMeetups></AlumniMeetups>
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
              E-Summit
            </h1>
            <ESummit></ESummit>
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
              Entrepreneurship Lectures
            </h1>
            <ELectures></ELectures>
          </Row>
          <Row
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
              Mentorship Sessions
            </h1>
            <MentorshipSessions></MentorshipSessions>
          </Row>
          <Row
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
              Incubators
            </h1>
            <Incubators></Incubators>
          </Row>
          <Row
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
              Pitching Events
            </h1>
            <PitchingEvents></PitchingEvents>
          </Row>
          <Row
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
          <Footer />
        </Container>
      </div>
    </>
  );
};

export default Gallery;
