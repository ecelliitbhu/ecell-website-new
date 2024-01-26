import Head from "next/head";
import Link from "next/link";
import Image from "next/legacy/image";
import { Collage, CollagePhone } from "../components/Collage";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import Testimonials from "../components/Testimonials";
import Typewriter from "typewriter-effect";
import { NextSeo } from "next-seo";
import styles from "../pages/startup_junction/startup_junction.module.css";
import { CalendarDays, MapPin } from "lucide-react";
import React from "react";
import Summit from "../public/summit.png";

export default function Home() {
  return (
    <>
      <Head>
        <title>E-Cell IIT BHU</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <NextSeo
        description="Welcome to the vibrant entrepreneurship community of E-cell IIT BHU. Join us as we ideate, iterate, and incubate the innovations that will shape the future of this century. Explore opportunities, events, and resources for aspiring entrepreneurs"
        canonical="https://www.ecelliitbhu.com/"
        openGraph={{
          url: "https://www.ecelliitbhu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FEcell-logo.2af076de.png&w=128&q=75",
          title: "E-CELL IIT-BHU",
          description:
            "Join the IIT BHU entrepreneurship community, where we nurture the future groundbreaking innovations!",
          images: [
            {
              url: "https://www.ecelliitbhu.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FEcell-logo.2af076de.png&w=128&q=75",
              width: 800,
              height: 600,
              alt: "E-CELL IIT-BHU",
              type: "image/jpeg",
            },
            {
              url: "https://media.licdn.com/dms/image/D4D0BAQGNc2KeTCR0Lg/company-logo_200_200/0/1688221885114/ecelliitbhu_logo?e=1706745600&v=beta&t=GyUQXhXpSQD86Ak3oUEqCQlR2Xc1CL_HOOwkMwCck8I",
              width: 900,
              height: 800,
              type: "image/jpeg",
            },
          ],
          siteName: "ecelliitbhu",
        }}
        twitter={{
          handle: "@ecelliitbhu",
          cardType: "summary_large_image",
        }}
      />
      <Nav />
      <div>
        <Container fluid className="body">
          {/* <section className={styles.sectionHero}>
            <div className={styles.hero}>
              <div className="hero-text-box">
                <h1 className={styles.headingPrimary}>E-Summit'24 </h1>
                <div className={styles.venue}>
                  <div>
                    <CalendarDays />
                    <span className={styles.heroDate}> 02-04 February 2024</span>
                  </div>
                  <div>
                    <MapPin />
                    <span className={styles.heroDate}>
                      {" "}
                      Varanasi
                    </span>
                  </div>
                </div>

                <p className={styles.heroDescription}>
                E-Summit is an electrifying celebration of innovation and entrepreneurship, brought to you by the Entrepreneurship Cell ( E-Cell ) at the Indian Institute of Technology ( IIT ) BHU.
                </p>

                <Link
                  href="https://esummit.ecelliitbhu.com/"
                  target="_blank"
                  className={`${styles.btn} ${styles.btnFill} ${styles.marginRightBtn}`}
                  style={{textAlign:"center"}}
                >
                  Explore More
                </Link>
              </div>
              <div className={styles.heroImgBox}>
                <Image
                  width={700}
                  height={300}
                  src={Summit}
                  alt="E-Summit"
                  className="hero-Image"
                />
              </div>
            </div>
          </section> */}

          {/* <Row
            className="header"
            style={{
              background: "white",
              borderRadius: "20px",
              height: "fit-content",
              padding: "20px 0",
              margin: "60px auto",
            }}
          >
            <Col
              className="image-section"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "30px 0",
              }}
            >
              <Image
                src="/cohort.png"
                height={703}
                width={1080}
                alt="Team Expansion"
              ></Image>
            </Col>
            <Col className="info">
              <h1 style={{ fontSize: "2.6rem" }}>Build With Us Cohort</h1>
              <p>
                A cohort facilitated by a personal accountability partner, a
                one-to-one guidance session, and a structured roadmap uniquely
                designed for your idea to build your startup from an idea and
                get funding at the end of the program.
              </p>
              <Link href="/forms/build_with_us" passHref>
                <Button
                  variant="info"
                  className="get-started"
                  style={{
                    color: "white",
                    background: "#fb6930",
                    width: "fit-content",
                    fontSize: "1.2rem",
                    height: "fit-content",
                    padding: "15px 15px",
                  }}
                >
                  Register Now!
                </Button>
              </Link>
            </Col>
          </Row> */}

<section 
  style={{
    height: '100vh',
    
    paddingBottom: '150px',
    boxSizing: 'border-box', // Ensures padding is included in the total height
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between', // Adjust based on your layout needs
    alignItems: 'center', // Center items horizontally
  }}
  className={styles.herosection}
>
  <div className={styles.heroImgBox}>
    <Image
      width={1000}
      height={400}
      src={Summit}
      alt="E-Summit"
      className="hero-Image"
      style={{ margin: 'auto' }} // Center the image within its container
    />
  </div>
  
  <Link href="https://esummit.ecelliitbhu.com/" passHref>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button
        variant="info"
        className="get-started"
        style={{
          color: 'white',
          background: '#166F8A',
          width: 'fit-content',
          fontSize: '1.2rem',
          height: 'fit-content',
          padding: '15px 15px',
        }}
      >
        Explore More!
      </Button>
    </div>
  </Link>
</section>



          <Row className="header">
            <Col className="info">
              <h1>E-Cell IIT BHU</h1>
              <h2>
                {"Accelerate Your"}
                <br />
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: true,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Ideation")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("Iteration")
                      .pauseFor(1000)
                      .deleteAll()
                      .typeString("Incubation")
                      .pauseFor(1000)
                      .deleteAll()
                      .start();
                  }}
                />
                {/* <br /> */}
                {"Journey!"}
              </h2>

              <p>
                Welcome to the entrepreneurship community of IIT BHU where we
                ideate, iterate and incubate the future innovations of the
                century!
              </p>
              <Button
                variant="info"
                className="get-started"
                href="/#who-are-we"
              >
                Get Started !
              </Button>
            </Col>
            <Col className="image-section">
              <lottie-player
                src="https://assets4.lottiefiles.com/packages/lf20_3nvhl4jz.json"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </Col>
            <div id="who-are-we"></div>
          </Row>
          <Row className="who-are-we">
            <Col className="info waw">
              <h1>Who are we?</h1>
              <p>
                E-Cell IIT BHU is an institute body run by the students of IIT
                (BHU) Varanasi devoted to acting as a symbiotic link between the
                entrepreneurs of E-Cell and the existing startup ecosystem as
                well as acting as a hub where all the startups can meet
                ,collaborate and innovate!
              </p>
              <Button variant="dark" className="learn-more" href="/who_we_are">
                Learn more about E-Cell &rarr;
              </Button>
              <Row className="reach">
                <Col>
                  <h3 className="reach-num" id="count1">
                    50000+
                  </h3>
                  <p className="reach-info">overall social reach!</p>
                </Col>
                <Col>
                  <h3 className="reach-num" id="count2">
                    108
                  </h3>
                  <p className="reach-info">startups supported till date!</p>
                </Col>
              </Row>
            </Col>
            <Col className="image-section">
              <lottie-player
                src="https://assets8.lottiefiles.com/packages/lf20_sig6wqne.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </Col>
          </Row>
          <Row></Row>
          <Row className="what-we-do info">
            <h1>What we do?</h1>
            <p>
              {`Through our vision of "Learn, Build and Scale" we implement
              various initiatives and events in IIT BHU to foster the
              entrepreneurial minds and create a culture of enthralling startups
              bound for success!`}
            </p>
            <Row className="card-container">
              <Card className="card">
                <Card.Body>
                  <lottie-player
                    src="https://assets8.lottiefiles.com/packages/lf20_gomzks5q.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                  <Card.Title>Learn</Card.Title>
                  <Card.Text>
                    {`Through our Programmes like "E-Mentorship" and "Learn Together", we teach the students about all aspects of entrepreneurial journey!`}
                  </Card.Text>
                  <a
                    href="https://ecelliitbhu.notion.site/Startup-Bundle-f47d0b39e4754468ad31fd9e0a212d21"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="dark" className="card-button">
                      Learn Here &rarr;
                    </Button>
                  </a>
                </Card.Body>
              </Card>
              <Card className="card">
                <Card.Body>
                  <lottie-player
                    src="https://assets10.lottiefiles.com/packages/lf20_oxwzlirk.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                  <Card.Title>Build</Card.Title>
                  <Card.Text>
                    {`With Initiatives like "Build With Us" and "Startup 101", deep dive into the ocean of building the solutions for tomorrow!`}
                  </Card.Text>
                  <a
                    href="https://bit.ly/build-with-us-ecell"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="dark" className="card-button">
                      Build with us &rarr;
                    </Button>
                  </a>
                </Card.Body>
              </Card>
              <Card className="card">
                <Card.Body>
                  <lottie-player
                    src="https://assets2.lottiefiles.com/packages/lf20_s7vzoj2n.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                  ></lottie-player>
                  <Card.Title>Scale</Card.Title>
                  <Card.Text>
                    {`Network with alumni founders, Get incubated in our incubators and seize the opportunity to pitch in front of Angel Investors & VCs!`}
                  </Card.Text>
                  <a
                    href="https://tiiciitbhu.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="dark" className="card-button">
                      Escalate &rarr;
                    </Button>
                  </a>
                </Card.Body>
              </Card>
            </Row>
          </Row>
          <Collage></Collage>
          <CollagePhone></CollagePhone>
          <Row className="collage-container" style={{ margin: "70px 0px" }}>
            <h1>What people think about us</h1>
            <Testimonials></Testimonials>
          </Row>
          <Footer />
        </Container>
      </div>
      <script
        async
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
      ></script>
      <script
        async
        src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.js"
      ></script>
      <script
        async
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
      ></script>
    </>
  );
}
