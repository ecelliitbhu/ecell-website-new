import Head from "next/head";
import { Container, Row, Button, Card } from "react-bootstrap";
import Footer from "../../components/Footer";
import Image from "next/image";
import { firebaseDB as db } from "../../lib/firebase";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import Nav from "../../components/navbar/NavLayout";
// import Calender from "../../components/Calender";

function todaysDate() {
  return new Date().toISOString().slice(0, 10);
}

const Event = ({
  poster,
  knowMore,
  title,
  beginDate,
  endDate,
  registrationLink,
}) => {
  return (
    <Card className="card" style={{ height: "fit-content" }}>
      <Card.Body style={{ padding: "25px 15px" }}>
        <Image src={poster} alt={title} height={250} width={250}></Image>
        <Card.Title style={{ margin: "20px auto 10px" }}>{title}</Card.Title>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {endDate >= todaysDate && beginDate <= todaysDate && (
            <a href={register} target="_blank" rel="noopener noreferrer">
              <Button
                style={{
                  backgroundColor: "#2AB574",
                  border: "#2AB574",
                  margin: "4px",
                  fontSize: "0.9rem",
                  height: "fit-content",
                  width: "fit-content",
                }}
                className="card-button"
              >
                Register Now!
              </Button>
            </a>
          )}
          <a href={knowMore} target="_blank" rel="noopener noreferrer">
            <Button
              variant="danger"
              style={{
                backgroundColor: "#FA8231",
                border: "#FA8231",
                margin: "4px",
                fontSize: "0.9rem",
                height: "fit-content",
                width: "fit-content",
              }}
              className="card-button"
            >
              Know More! &rarr;
            </Button>
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default function Events() {
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [eventsList, setEventsList] = useState([]);
  useEffect(() => {
    onValue(
      ref(db, `events/`),
      (snapshot) => {
        if (snapshot.exists()) {
          let events = Object.entries(snapshot.val());
          events = events.map((event) => {
            return { id: event[0], ...event[1] };
          });
          events.sort((a, b) => (a.beginDate < b.beginDate ? 1 : -1));
          setEventsList(events);
          setIsLoading(false);
        } else {
          console.log("No data available");
          setEventsList([]);
        }
      },
      (error) => console.log(error)
    );
  }, []);
  return (
    <>
      <Head>
        <title>Events</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div>
        <Container fluid className="body">
          <Row className="what-we-do info" style={{ margin: "50px auto" }}>
            <h1 style={{ padding: "0px", margin: "40px auto" }}>
              Events @ E-Cell IIT BHU
            </h1>
            {isLoading ? (
              <div style={{ margin: "auto", width: "fit-content" }}>
                <Image
                  src="/loading.gif"
                  width="300"
                  alt="Loading..."
                  height="300"
                />
              </div>
            ) : (
              <Row className="card-container">
                {eventsList.map((event, id) => {
                  return (
                    <Event
                      key={id}
                      poster={event.poster}
                      knowMore={event.knowMoreLink}
                      register={event.registerationLink}
                      title={event.title}
                      beginDate={event.beginDate}
                      endDate={event.endDate}
                    />
                  );
                })}
              </Row>
            )}
          </Row>
          {/* <Row style={{ margin: "100px auto" }} className="calender-component">
            <h1
              style={{
                margin: "auto",
                textAlign: "center",
                fontSize: "4rem",
                fontWeight: "bold",
              }}
            >
              Calender
            </h1>
            <Calender />
          </Row>
          <div id="instafeed-container"></div> */}
          <Footer />
        </Container>
      </div>
    </>
  );
}
