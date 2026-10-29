
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer";
import Image from "next/image";
import { firebaseDB as db } from "../../lib/firebase";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import Nav from "../../components/navbar/NavLayout";

function todaysDate() {
  return new Date().toISOString().slice(0, 10);
}

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="white"
    width="18"
    height="18"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

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

  return (
    <div className="event-card">
      {/* Full-bleed poster — zooms on card hover */}
      <div className="event-img-wrap">
        <Image
          src={poster}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          unoptimized
        />
      </div>

      {/* Floating Instagram badge — top-right corner */}
      {resolvedInstagramLink && (
        <a
          href={resolvedInstagramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="insta-badge"
          aria-label="View on Instagram"
          onClick={(e) => e.stopPropagation()}
        >
          <InstagramIcon />
        </a>
      )}

      {/* Cinematic bottom overlay — title always visible, CTA reveals on hover */}
      <div className="event-info">
        <span className="event-org-tag">E-Cell IIT BHU</span>
        <h3 className="event-title-new">{title}</h3>
        <div className="event-cta-row">
          <a
            href={resolvedRegisterLink}
            target="_blank"
            rel="noopener noreferrer"
            className="event-reg-btn"
          >
            Register Now
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>
    </div>
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
            <div className="events-header">
              <p className="events-eyebrow">✦ Entrepreneurship in Action</p>
              <h1 className="events-heading">
                Events <span className="events-heading-accent">@ E‑Cell</span>
              </h1>
              <p className="events-subheading">
                Where ideas collide, startups ignite, and futures are forged.
              </p>
            </div>

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
        /* ── Google Font ── */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');

        /* ── Section header ── */
        .events-header {
          text-align: center;
          padding: 60px 16px 8px;
          width: 100%;
        }
        .events-eyebrow {
          font-family: 'Inter', sans-serif;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #e67e22;
          margin: 0 0 14px;
          opacity: 0.85;
        }
        .events-heading {
          font-family: 'Inter', sans-serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -1.5px;
          color: #0f0f14;
          margin: 0 0 16px;
        }
        .events-heading-accent {
          background: linear-gradient(135deg, #e67e22 0%, #f39c12 50%, #e74c3c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .events-subheading {
          font-family: 'Inter', sans-serif;
          font-size: 1.05rem;
          color: #6b7280;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* ── Grid ── */
        .events-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          width: 100%;
          max-width: 1340px;
          margin: 48px auto 0;
          padding: 0 20px 80px;
        }

        /* ── Cinematic event card ── */
        .event-card {
          position: relative;
          width: 100%;
          height: 420px;
          border-radius: 22px;
          overflow: hidden;
          cursor: pointer;
          background: #0d0d14;
          box-shadow:
            0 8px 32px rgba(0,0,0,0.18),
            0 2px 8px rgba(0,0,0,0.10);
          transition:
            transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.45s ease;
        }
        .event-card:hover {
          transform: translateY(-12px) scale(1.01);
          box-shadow:
            0 32px 64px rgba(0,0,0,0.28),
            0 8px 24px rgba(0,0,0,0.18);
        }

        /* ── Poster fills the card — Ken Burns zoom on hover ── */
        .event-img-wrap {
          position: absolute;
          inset: 0;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .event-card:hover .event-img-wrap {
          transform: scale(1.08);
        }

        /* ── Gradient vignette — always covers the bottom ── */
        .event-img-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(8, 6, 18, 0.97) 0%,
            rgba(8, 6, 18, 0.70) 38%,
            rgba(8, 6, 18, 0.18) 65%,
            transparent 100%
          );
          transition: background 0.4s ease;
        }
        .event-card:hover .event-img-wrap::after {
          background: linear-gradient(
            to top,
            rgba(8, 6, 18, 0.99) 0%,
            rgba(8, 6, 18, 0.88) 48%,
            rgba(8, 6, 18, 0.30) 72%,
            transparent 100%
          );
        }

        /* ── Floating Instagram badge ── */
        .insta-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 20;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            #f09433 0%, #e6683c 22%,
            #dc2743 45%, #cc2366 72%,
            #bc1888 100%
          );
          box-shadow: 0 4px 16px rgba(188, 24, 136, 0.45);
          opacity: 0.9;
          transition:
            transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
            box-shadow 0.3s ease,
            opacity 0.2s ease;
          text-decoration: none;
        }
        .insta-badge:hover {
          transform: scale(1.22) rotate(-8deg);
          box-shadow: 0 8px 28px rgba(188, 24, 136, 0.65);
          opacity: 1;
        }

        /* ── Bottom info panel ── */
        .event-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
          padding: 0 20px 22px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        /* Org tag — fades in on hover */
        .event-org-tag {
          font-family: 'Inter', sans-serif;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #e67e22;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s;
        }
        .event-card:hover .event-org-tag {
          opacity: 1;
          transform: translateY(0);
        }

        /* Title — always visible */
        .event-title-new {
          font-family: 'Inter', sans-serif;
          font-size: 1.1rem;
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-shadow: 0 2px 12px rgba(0,0,0,0.5);
        }

        /* CTA row — slides up + fades in on hover */
        .event-cta-row {
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.32s ease 0.08s, transform 0.32s ease 0.08s;
          margin-top: 4px;
        }
        .event-card:hover .event-cta-row {
          opacity: 1;
          transform: translateY(0);
        }

        /* Register button */
        .event-reg-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: linear-gradient(135deg, #e67e22 0%, #f5a623 100%);
          color: white;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 10px 20px;
          border-radius: 50px;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(230, 126, 34, 0.45);
          transition:
            box-shadow 0.25s ease,
            transform 0.25s ease;
          white-space: nowrap;
        }
        .event-reg-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(230, 126, 34, 0.65);
          color: white;
        }
        .event-reg-btn:active {
          transform: translateY(0);
        }

        /* ── Responsive ── */
        @media (max-width: 1200px) {
          .events-grid {
            grid-template-columns: repeat(2, 1fr);
            max-width: 760px;
          }
        }
        @media (max-width: 640px) {
          .events-grid {
            grid-template-columns: 1fr;
            max-width: 360px;
            padding: 0 10px 40px;
          }
          .events-heading { letter-spacing: -1px; }
        }
      `}</style>
    </>
  );
}
