
import Head from "next/head";
import { Container, Row, Button, Card } from "react-bootstrap";
import Footer from "../../components/Footer";
import Image from "next/image";
import { firebaseDB as db } from "../../lib/firebase";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import Nav from "../../components/navbar/NavLayout";

function todaysDate() {
  return new Date().toISOString().slice(0, 10);
}

const Event = ({
  poster,
  title,
  registrationLink,
  instagramLink,
}) => {
  const resolvedRegisterLink =
    registrationLink ||
    (title === "The Big Brand Theory"
      ? "https://unstop.com/o/HqVCD6G?lb=QsxAV9my&utm_medium=Share&utm_source=WhatsApp"
      : title === "Techstars Startup Weekend Varanasi"
      ? "https://unstop.com"
      : "https://unstop.com");

  const resolvedInstagramLink =
    instagramLink ||
    (title === "The Big Brand Theory"
      ? "https://www.instagram.com/p/DYHEBnpk5Mn/?igsh=MWxuODcybHMyOG83Zg=="
      : title === "Techstars Startup Weekend Varanasi"
      ? "https://www.instagram.com/p/DbsedOyk8iq/?xtok=MXVicnFtamt2Y2xwYw=="
      : null);

  const shouldShiftButtons =
    title === "The Big Brand Theory" ||
    title === "Techstars Startup Weekend Varanasi";

  return (
    <Card
      className={`card event-card ${
        shouldShiftButtons ? "shift-buttons" : ""
      }`}
      style={{
        height: "420px",
        width: "100%",
        maxWidth: "320px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(0, 0, 0, 0.08)",
        backgroundColor: "#ffffff",
      }}
    >
      <Card.Body
        className="event-card-body"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
          padding: "20px",
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
        }}
      >
        <div
          className="event-image-wrapper"
          style={{
            height: "210px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <Image
            src={poster}
            alt={title}
            height={210}
            width={210}
            style={{
              maxHeight: "210px",
              maxWidth: "100%",
              objectFit: "contain",
            }}
            unoptimized
          />
        </div>

        <div
          className="event-title-wrapper"
          style={{
            height: "60px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "12px 0",
          }}
        >
          <Card.Title
            className="event-card-title"
            style={{
              fontSize: "1.15rem",
              fontWeight: "700",
              lineHeight: "1.3",
              textAlign: "center",
              margin: 1,
              color: "#1a1a1a",
              backgroundColor: "transparent",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
            title={title}
          >
            {title}
          </Card.Title>
        </div>

        <div
          className="event-buttons-wrapper"
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            width: "100%",
            paddingBottom: "5px",
          }}
        >
          <a
            href={resolvedRegisterLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button
              className="event-btn register-btn"
              style={{
                backgroundColor: "#f5a422",
                borderColor: "#f5a422",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "0.9rem",
                height: "40px",
                padding: "8px 18px",
                borderRadius: "6px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "1",
              }}
            >
              Register Now!
            </Button>
          </a>

          {resolvedInstagramLink && (
            <a
              href={resolvedInstagramLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Link"
              style={{ textDecoration: "none" }}
            >
              <span
                className="instagram-icon-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/events/instagram-symbol.png"
                  alt="Instagram"
                  width={36}
                  height={36}
                  style={{
                    width: "24px",
                    height: "30px",
                    objectFit: "contain",
                    display: "block",
                  }}
                  unoptimized
                />
              </span>
            </a>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default function Events() {
  const [isLoading, setIsLoading] = useState(true);
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    const unsubscribe = onValue(
      ref(db, "events/"),
      (snapshot) => {
        if (snapshot.exists()) {
          let events = Object.entries(snapshot.val());

          events = events.map((event) => ({
            id: event[0],
            ...event[1],
          }));

          events.sort((a, b) =>
            a.beginDate < b.beginDate ? 1 : -1
          );

          setEventsList(events);
          setIsLoading(false);
        } else {
          console.log("No data available");
          setEventsList([]);
          setIsLoading(false);
        }
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Head>
        <title>Events</title>
        <meta name="robots" content="index, follow" />
        <link
          rel="shortcut icon"
          href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico"
        />
      </Head>

      <Nav />

      <div>
        <Container fluid className="body">
          <Row
            className="what-we-do info"
            style={{ margin: "50px auto" }}
          >
            <h1
              style={{
                padding: "0px",
                margin: "40px auto 0 auto",
              }}
            >
              Events @ E-Cell IIT BHU
            </h1>

            {isLoading ? (
              <div
                style={{
                  margin: "auto",
                  width: "fit-content",
                }}
              >
                <Image
                  src="https://ik.imagekit.io/ecelliitbhu/website/loading.gif"
                  width={300}
                  alt="Loading..."
                  height={300}
                  unoptimized
                />
              </div>
            ) : (
              <div className="events-grid">
                {eventsList
                  .filter(
                    (event) =>
                      event.title !== "Start-Bucks" &&
                      event.title !== "Startup Concurso" &&
                      event.title !== "Novice Fiesta'23" &&
                      event.title !== "Novice Fiesta - 3rd edition" &&
                      event.title !== "Pitch-er Perfect" &&
                      event.title !== "Design Rush'21"
                  )
                  .map((event) => (
                    <Event key={event.id} {...event} />
                  ))}
              </div>
            )}
          </Row>

          <Footer />
        </Container>
      </div>

      <style jsx global>{`
        .events-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px;
          width: 100%;
          max-width: 1320px;
          margin: 30px auto;
          padding: 10px 15px 40px;
        }

        .event-card {
          width: 100% !important;
          max-width: 320px !important;
          height: 400px !important;
          margin: 0 auto !important;
          display: flex !important;
          flex-direction: column !important;
          border-radius: 12px !important;
          overflow: hidden !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          background-color: #ffffff !important;
          transition: transform 0.25s ease,
            box-shadow 0.25s ease !important;
        }

        .event-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px rgba(0, 0, 0, 0.12) !important;
        }

        .event-card-body {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: space-between !important;
          height: 100% !important;
          padding: 10px !important;
          box-sizing: border-box !important;
          background-color: #ffffff !important;
        }

        .event-image-wrapper {
          height: 210px !important;
          width: 100% !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          overflow: hidden !important;
        }

        .event-title-wrapper {
          height: 60px !important;
          width: 100% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin: 10px  !important;
        }

        .event-card-title {
          font-size: 1.5rem !important;
          font-weight: 700 !important;
          line-height: 1.3 !important;
          text-align: center !important;
          margin: 10px !important;
          color: #1a1a1a !important;
          background-color: transparent !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
          overflow: hidden !important;
          
        }

        .event-buttons-wrapper {
          margin-top: auto !important;
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          gap: 8px !important;
          width: 100% !important;
          padding-bottom: 55px !important;
        }

        /* Shift only the buttons in the first two specified events */
        .shift-buttons .event-buttons-wrapper {
          transform: translateX(25px) !important;
        }

        .event-btn {
          font-size: 1rem !important;
          font-weight: 600 !important;
          padding: 10px 18px !important;
          border-radius: 10px !important;
          height: 40px !important;
          width: fit-content !important;
          margin:10px 10 !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition: all 0.2s ease-in-out !important;
          border: none !important;
        }

        .register-btn {
          background-color: #ffaf6b !important;
          color: white !important;
          border: none !important;
        }

        .register-btn:hover {
          background-color: orange !important;
          color: black !important;
        }

        .instagram-icon-link {
          border: none !important;
          transition: transform 0.2s ease !important;
        }

        .instagram-icon-link:hover {
          transform: scale(1.2) !important;
        }

        .coming-soon-badge {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          height: 40px !important;
          padding: 0 24px !important;
          border-radius: 9999px !important;
          background: linear-gradient(
            135deg,
            rgba(250, 130, 49, 0.08) 0%,
            rgba(245, 158, 11, 0.15) 100%
          ) !important;
          border: 1.5px solid rgba(250, 130, 49, 0.45) !important;
          color: #d96316 !important;
          font-size: 0.88rem !important;
          font-weight: 700 !important;
          letter-spacing: 0.6px !important;
          text-transform: uppercase !important;
          box-shadow: 0 2px 10px rgba(250, 130, 49, 0.12) !important;
          transition: all 0.25s ease !important;
          cursor: default !important;
          user-select: none !important;
        }

        .coming-soon-badge:hover {
          transform: translateY(-2px);
          background: linear-gradient(
            135deg,
            rgba(250, 130, 49, 0.14) 0%,
            rgba(245, 158, 11, 0.22) 100%
          ) !important;
          border-color: rgba(250, 130, 49, 0.7) !important;
          box-shadow: 0 4px 16px rgba(250, 130, 49, 0.22) !important;
        }

        .coming-soon-dot {
          width: 8px !important;
          height: 8px !important;
          border-radius: 50% !important;
          background-color: #fa8231 !important;
          box-shadow: 0 0 0 0 rgba(250, 130, 49, 0.7) !important;
          animation: pulseComingSoon 2s infinite
            cubic-bezier(0.4, 0, 0.6, 1) !important;
        }

        @keyframes pulseComingSoon {
          0% {
            box-shadow: 0 0 0 0 rgba(250, 130, 49, 0.7);
            transform: scale(0.95);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(250, 130, 49, 0);
            transform: scale(1.1);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(250, 130, 49, 0);
            transform: scale(0.95);
          }
        }

        @media (max-width: 1200px) {
          .events-grid {
            grid-template-columns: repeat(2, 1fr);
            max-width: 720px;
          }
        }

        @media (max-width: 640px) {
          .events-grid {
            grid-template-columns: 1fr;
            max-width: 340px;
            padding: 10px 10px 30px;
          }
        }
      `}</style>
    </>
  );
}
