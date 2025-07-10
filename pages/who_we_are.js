import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import { Row, Button, Container, Col, Card } from "react-bootstrap";
import Image from "next/legacy/image";
// import logicalThinking from "../public/logical-thinking.png";
// import spaceShip from "../public/spaceship.png";
// import networking from "../public/networking.png";
// import aboutNew from "../public/who-we-are.png";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
const logicalThinking = "https://ik.imagekit.io/ecelliitbhu/website/logical-thinking.png";
const spaceShip       = "https://ik.imagekit.io/ecelliitbhu/website/spaceship.png";
const networking      = "https://ik.imagekit.io/ecelliitbhu/website/networking.png";
const aboutNew        = "https://ik.imagekit.io/ecelliitbhu/website/who-we-are.png";

const WhoWeAre = () => {
  return (
    <>
      <Head>
        <title>Who We Are?</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico" />
      </Head>
      <Nav />
      <div>
        <Container fluid className="body">
          <Row
            className="header"
            style={{ height: "fit-content", marginTop: "100px" }}
          >
            <Col className="info">
              <h1>What is E-Cell IIT BHU?</h1>
              <p>
                E-Cell IIT BHU (The Entrepreneurship Cell) supports
                entrepreneurship through resources, mentorship, networking, and
                events like workshops, competitions, and speaker sessions and
                fosters the overall startup ecosystem in the institute.
              </p>
              <p>
                It is an institute body run by students devoted to acting as a
                link between budding entrepreneurs and the existing startup
                ecosystem. It is a hub where all startups can meet, collaborate
                and innovate.
              </p>
            </Col>
          </Row>
          <Row
            className="header"
            style={{ height: "fit-content", marginTop: "70px" }}
          >
            <Col
              className="info"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                verticalAlign: "middle",
              }}
            >
              <h2
                style={{
                  fontSize: "4rem",
                  marginRight: "1rem",

                  color: "#000",
                }}
              >
                <b>Why join E-Cell?</b>
              </h2>
              <Button
                className="download-brochure"
                href="https://drive.google.com/file/d/1Fl8qtF1snMM-RL8jTs7euku8adDQcyTL/view?usp=sharing"
                rel="noreferrer"
                target="_blank"
                style={{
                  marginRight: "4rem",
                  borderRadius: "12px",
                  marginTop: "0.6rem",
                }}
              >
                Download Brochure
              </Button>
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
                <Card.Title>Foster Entrepreneurial Mindset</Card.Title>
                <Card.Text>
                  Start your Entrepreneurial journey and learn through our
                  programmes like <i>Founder&apos;s Talk</i>, <i>AMA Session</i>{" "}
                  and
                  <i> E-Mentorship</i>.
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
                  Enhance your skills of <em>Leadership</em>,{" "}
                  <em>Communication </em> and
                  <em> Collaboration </em> by working in teams and engaging with
                  industry professionals.
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
                <Card.Title>Network With Startup Ecosystem</Card.Title>
                <Card.Text>
                  {`Expand your network and connect with like minded individuals like fellow entrepreneurs, alumni founderrs and industry experts`}
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
                style={{ width: "70%", minHeight: "30rem" }}
              ></iframe>
            </Col>
          </Row>
          <Row className="what-we-do info" style={{ margin: "50px auto" }}>
            <h1 style={{ padding: "0px", fontSize: "2.5rem" }}>
              Verticals of E-Cell
            </h1>
            <p>
              E-Cell comprises 7 verticals to cater all the functioning and
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
                    src="https://assets1.lottiefiles.com/packages/lf20_qjryhqec/data.json"
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
                  <Card.Title>Relations Team</Card.Title>
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
                    src="https://assets10.lottiefiles.com/packages/lf20_biwpfsmp.json"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                  <Card.Title>Strategy and Outreach Team</Card.Title>
                  <Card.Text>
                    <ul>
                      <li>
                        {" "}
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Enhances the cell&apos;s visibility and manages
                        communication channels.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Promotes events and initiatives and ensures a seamless
                        and enjoyable experience for participants and guests.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Measures and assesses the impact of the entrepreneurship
                        cell&apos;s activities.
                      </li>
                      <li>
                        <CheckCircleOutlinedIcon style={{ color: "green" }} />
                        Identifies growth opportunities through market analysis,
                        trend monitoring, and innovative thinking
                      </li>
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="card">
                <Card.Body>
                  <lottie-player
                    src="https://assets3.lottiefiles.com/packages/lf20_dOedNBDWpA.json"
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
