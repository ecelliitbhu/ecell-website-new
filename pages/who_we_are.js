import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import { Row, Button, Container, Col, Card } from "react-bootstrap";
import Image from "next/image";
import logicalThinking from "../public/logical-thinking.png";
import spaceShip from "../public/spaceship.png";
import networking from "../public/networking.png";
import aboutNew from "../public/who-we-are.png";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
const WhoWeAre = () => {
  return (
    <>
      <Head>
        <title>Who We Are?</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div>
        <Container fluid className="body">
          <Row
            className="header"
            style={{ height: "fit-content", marginTop: "100px" }}
          >
            <Col className="info">
              <h1>What is E-Cell?</h1>
              <p>
                The Entrepreneurship Cell IIT (BHU), Varanasi, is a conglomerate
                of individuals with a vision, a dream. It is a place for all
                those who shirk from taking beaten paths and believe in leaving
                trails in all walks of life. The cell aims at manifesting the
                latent entrepreneurial spirit of young students.
              </p>
            </Col>
          </Row>
          <Row className="card-container">
            <Card className="card" style={{ height: "360px" }}>
              <div style={{ width: "fit-content", margin: "40px auto 20px" }}>
                <Image
                  src={logicalThinking}
                  height="80"
                  width="80"
                  alt="logic"
                ></Image>
              </div>

              <Card.Body>
                <Card.Title>Entrepreneurial Mindset</Card.Title>
                <Card.Text>
                  {`Learn  Through our Programmes like "E-Mentorship" and "Learn Together", we teach the students about all aspects of entrepreneurial journey!`}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="card" style={{ height: "360px" }}>
              <div style={{ width: "fit-content", margin: "40px auto 20px" }}>
                <Image
                  src={spaceShip}
                  height="80"
                  width="80"
                  alt="logic"
                ></Image>
              </div>
              <Card.Body>
                <Card.Title>Improved Interpersonal Skills</Card.Title>
                <Card.Text>
                  {`Build  With Initiatives like "Build With Us" and "Startup 101", deep dive into the ocean of building the solutions for tomorrow!`}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="card" style={{ height: "360px" }}>
              <div style={{ width: "fit-content", margin: "40px auto 20px" }}>
                <Image
                  src={networking}
                  height="80"
                  width="80"
                  alt="logic"
                ></Image>
              </div>
              <Card.Body>
                <Card.Title>Network With Alumni Entrepreneurs</Card.Title>
                <Card.Text>
                  {`Scale Network with alumni founders, Get incubated in our incubators and seize the opportunity to pitch in front of Angel Investors & VCs!`}
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
          <Row className="who-are-we">
            <Col
              className="image-section about-ecell-image"
              style={{
                display: "flex",
                justifyContent: "center",
                // alignItems:"center"
              }}
            >
              <iframe
                src="https://www.youtube-nocookie.com/embed/PSEKcZQINvM"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%" }}
              ></iframe>
            </Col>
            <Col
              className="info waw"
              style={{
                padding: "0px",
              }}
            >
              <h2
                style={{
                  fontSize: "1.8rem",
                  color: "#fd9301",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                About E-Cell
              </h2>
              <h1 style={{ fontSize: "2.5rem" }}>We nurture Entrepreneurs!</h1>
              <p>
                E-Cell IIT BHU is an institute body run by the students of IIT
                (BHU) Varanasi devoted to acting as a symbiotic link between the
                entrepreneurs of E-Cell and the existing startup ecosystem as
                well as acting as a hub where all the startups can meet,
                collaborate and innovate!
              </p>
              {/* <Row style={{ margin: "10px auto", paddingLeft: "15px" }}>
                <Col>
                  <h3 style={{ fontSize: "1.5rem" }}>
                    <GrMapLocation /> Where?
                  </h3>
                  <p
                    style={{
                      textAlign: "left",
                      fontSize: "15px",
                      margin: "0px",
                      width: "100%",
                    }}
                  >
                    Technology Innovation and Incubation Centre IIT BHU
                    Varanasi.
                  </p>
                </Col>
                <Col>
                  <h3 style={{ fontSize: "1.5rem" }}>
                    <BsCalendarCheck /> How?
                  </h3>
                  <p
                    style={{
                      textAlign: "left",
                      fontSize: "15px",
                      margin: "0px",
                      width: "100%",
                    }}
                  >
                    Mentor | Monitor | Motivate
                  </p>
                </Col>
              </Row> */}
              <Button
                className="download-brochure"
                href="https://drive.google.com/file/d/1Fl8qtF1snMM-RL8jTs7euku8adDQcyTL/view?usp=sharing"
                rel="noreferrer"
                target="_blank"
              >
                Download Brochure
              </Button>
            </Col>
          </Row>
          <Row className="what-we-do info" style={{ margin: "50px auto" }}>
            <h1 style={{ padding: "0px", fontSize: "2.5rem" }}>
              Verticals of E-Cell
            </h1>
            <p>
              E-Cell comprises 6 verticals to cater all the functioning and
              activities pertaining to promotion of entrepreneurial culture in
              IIT BHU.
            </p>
            <Row className="card-container ecell-verticals">
              <Card className="card">
                <Card.Body>
                  <lottie-player
                    src="https://assets9.lottiefiles.com/packages/lf20_jJ7Djd.json"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                  <Card.Title>Startup Assistance Program</Card.Title>
                  <Card.Text>
                    <ul>
                      <li>
                        {" "}
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        {`Assistance & Mentor Support to young entrepreneurs of IIT BHU (brainstorming/ ideation/ incubation etc.)`}
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        {`Maintenance and development of "Entrepreneurship Resource Library", "Startup Ultimate Guidebook", "Learn from the entrepreneurs " & "FAQ Repository".`}
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Helping startups in pitch-deck improvement, idea
                        validations, proof-of-concept, MVP planning and
                        development, Growth strategy etc.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        {`Organizing initiatives like "Build With Us", "Learn Together", "Entrepreneurship 101",& "Define Your Ideas".`}
                      </li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="card">
                <Card.Body>
                  <lottie-player
                    src="https://assets7.lottiefiles.com/packages/lf20_0elqlimb.json"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                  <Card.Title>Branding Team</Card.Title>
                  <Card.Text>
                    <ul>
                      <li>
                        {" "}
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        {`Primarily focuses on enhancing the brand value of E-Cell IIT BHU by managing it's official social media accounts.`}
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Conducting design and content curation events.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Marketing of various inter and intra college events and
                        talks that are organized within the cell.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Publicity of various achievements of alums in the field
                        of entrepreneurship.
                      </li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="card">
                <Card.Body>
                  <lottie-player
                    src="https://assets5.lottiefiles.com/packages/lf20_gssu2dkm.json"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                  <Card.Title>Technical Team</Card.Title>
                  <Card.Text>
                    <ul>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Provide an interactive platform for students to get
                        connected with people of our own college through our
                        official website
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Maintaining the Startup Directory for start-ups founded
                        by the Alumnis of IIT BHU.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Development and maintenance of portals for Campus
                        Director Program, Internships, Startup Services etc.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Responsible for building and handling of the TIIC
                        website
                      </li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="card">
                <Card.Body>
                  <lottie-player
                    src="https://assets4.lottiefiles.com/packages/lf20_5e7wgehs.json"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                  <Card.Title>Events Team</Card.Title>
                  <Card.Text>
                    <ul>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Handling and organizing all the events, webinars, and
                        workshops, conducted by E-Cell during the course of the
                        session.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        {`Organizing Founder's speak and Ask Me Anything sessions.`}
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Reaching out to speakers for sessions, talks, webinars,
                        and workshops.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Work as the marketing, publicity, and PR team for every
                        competition organized by E-Cell.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Responsible for managing all the logistics, operations,
                        and hospitality of all the events.
                      </li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="card">
                <Card.Body>
                  <lottie-player
                    src="https://assets1.lottiefiles.com/packages/lf20_yvtgijfx.json"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                  <Card.Title>Strategic Relations Team</Card.Title>
                  <Card.Text>
                    <ul>
                      <li>
                        {" "}
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Establishing relationships with external organizations.{" "}
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Collaborating with various companies and brands for
                        providing support to startups during all phases.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Helping startups to connect with alumni, mentors, and
                        investors.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Maintaining the database of all Investors, Mentors,
                        Accelerators, Incubators, and Alumni Startups.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Connecting with all IIT BHU alumni bodies to make a
                        better flow of information between students and alumni.
                      </li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="card">
                <Card.Body>
                  <lottie-player
                    src="https://assets2.lottiefiles.com/packages/lf20_lbstqvfm.json"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                  <Card.Title>Cisco thingQbator body</Card.Title>
                  <Card.Text>
                    <ul>
                      <li>
                        {" "}
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Act as a whole-body supporting and helping in the
                        functioning of all the activities conducted by Cisco
                        thingQbator.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Handling and organizing events, webinars and workshops
                        conducted by the Cisco thingQbator during the cohort.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Act as an intermediary between the Cisco thingQbator and
                        the students at IIT (BHU), Varanasi and help in
                        increasing the reach in the college.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        To provide aid to the teams of our college who are part
                        of the cohort.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Organize regular brainstorming sessions with the
                        makerspace managers and other thingQbator student bodies
                        on future plans and events.
                      </li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="card">
                <Card.Body>
                  <lottie-player
                    src="https://assets2.lottiefiles.com/packages/lf20_luxumspe.json"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                  <Card.Title>Innovations and Incubation Team</Card.Title>
                  <Card.Text>
                    <ul>
                      <li>
                        {" "}
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Publication of the Quarterly E-Cell IIT BHU’s magazine
                        “E-Digest”.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Publication and Promotion of E-Cell IIT BHU’s Weekly
                        Newsletter on Substack.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Acts as a connecting link between the various incubators
                        at IIT BHU and students.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Conduction of Lecture Series and Entrepreneurship
                        Masterclass sessions.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Organizing interview sessions and promotion of
                        IIC/government-funded activities to promote research and
                        entrepreneurship in IIT BHU.
                      </li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Row>
          </Row>
          <Footer />
        </Container>
      </div>
      <script
        async
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
      ></script>
    </>
  );
};

export default WhoWeAre;
