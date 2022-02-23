import Head from "next/head";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import Testimonials from "../components/Testimonials";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import Image from "next/image";

export default function CampusDirector() {
  return (
    <>
      <Head>
        <title>Campus Director</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div>
        <Container fluid className="body">
          <Row className="header">
            <Col className="info">
              <h1>Join the Campus Director Programme!</h1>
              <h2>
                Accelerate the entrepreneurial <br /> journey in your college!
              </h2>
              <p>
                Become the Student Lead of enhancing and expanding the
                entrepreneurial opportunities in your college!
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
                src="https://assets6.lottiefiles.com/packages/lf20_djmhnml5.json"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </Col>
            <div id="who-are-we"></div>
          </Row>
          <Row className="who-are-we">
            <Col className="info waw">
              <h1>Why Campus Director?</h1>
              <p>
                Devoted to acting as a symbiotic link between the entrepreneurs
                and the existing startup ecosystem, E-Cell IIT BHU provides you
                with an opportunity to lead and educate the students masses in
                your college with various startup related activities and events
                to inculcate the entrepreneurial culture in your own college!
              </p>
              <Button variant="dark" className="learn-more" href="/who_we_are">
                Learn more &rarr;
              </Button>
              <Row className="reach">
                <Col>
                  <h3 className="reach-num" id="count1">
                    1700+
                  </h3>
                  <p className="reach-info">{`Enthusiastic CD's Onboarded`}</p>
                </Col>
                <Col>
                  <h3 className="reach-num" id="count2">
                    250+
                  </h3>
                  <p className="reach-info">Colleges supported till date!</p>
                </Col>
              </Row>
            </Col>
            <Col className="image-section">
              <lottie-player
                src="https://assets6.lottiefiles.com/packages/lf20_qAEc0l.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </Col>
          </Row>
          <Row></Row>
          <Row
            className="what-we-do info"
            style={{ backgroundColor: "#f7fbff", padding: "30px 0px" }}
          >
            <h1>What we offer?</h1>
            <p>
              {`Through our vision of "Learn, Build and Scale" we implement
              various initiatives and events in IIT BHU to foster the
              entrepreneurial minds and create a culture of enthralling startups
              bound for success!`}
            </p>
            <div className="perks-container">
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/1.png" alt="" height="512" width="512" />
                </div>

                <p>Free E-Summit 2022 Passes</p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/2.png" alt="" height="512" width="512" />
                </div>

                <p>50% off on GrowthSchool Workshops</p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/3.png" alt="" height="512" width="512" />
                </div>

                <p>E-Learn Markets Financial Course Worth 999</p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/4.png" alt="" height="512" width="512" />
                </div>
                <p>D2C Pro Memberships worth 999 (Top 50 Performers)</p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/5.png" alt="" height="512" width="512" />
                </div>
                <p>Access to the Entrepreneurship Masterclass</p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/6.png" alt="" height="512" width="512" />
                </div>
                <p>GeeksforGeeks Coupons</p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/7.png" alt="" height="512" width="512" />
                </div>
                <p>Access to Curated Startup Helpbook of E-Cell IIT BHU</p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/8.png" alt="" height="512" width="512" />
                </div>
                <p>
                  {`Top CDs to be featured in the E-Cell IIT BHU's Weekly Newsletter`}
                </p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/9.png" alt="" height="512" width="512" />
                </div>
                <p>Certificate of CD Programme verified by E-Cell IIT BHU</p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/10.png" alt="" height="512" width="512" />
                </div>
                <p>Free E-Summit 2022 Merch to the (Top 5 Performers)</p>
              </div>
            </div>
          </Row>
          <Row className="who-are-we" style={{ margin: "30px auto" }}>
            <Col className="image-section">
              <lottie-player
                src="https://assets7.lottiefiles.com/packages/lf20_9qt5pr9g.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </Col>
            <Col className="info waw">
              <h1 style={{ fontSize: "3rem" }}>Responsibilities</h1>
              <ul className="ca-responsibilities">
                <li>
                  <DoneRoundedIcon className="resp-icon" />
                  Acting as a link between IIT (BHU) Varanasi and your own
                  campus throughout the year.
                </li>
                <li>
                  <DoneRoundedIcon className="resp-icon" />
                  Coordinating with Strategic Relations’ team of
                  Entrepreneurship Cell, IIT BHU to conduct various events
                  throughout the year in your college.
                </li>
                <li>
                  <DoneRoundedIcon className="resp-icon" />
                  Publicising entrepreneurship oriented events and competitions
                  in your college as well as over Social Media.
                </li>
                <li>
                  <DoneRoundedIcon className="resp-icon" />
                  Inviting Alumni Entrepreneurs of your college to participate
                  in Shark Tank IIT BHU.
                </li>
                <li>
                  <DoneRoundedIcon className="resp-icon" />
                  Networking with Local Startups and Startup Co-Founders.
                </li>
              </ul>
            </Col>
          </Row>
          <Row className="collage-container" style={{ margin: "70px 0px" }}>
            <h1>{`Testimonials from previous CDs`}</h1>
            <Testimonials></Testimonials>
          </Row>
          <Row className="collage-container" style={{ margin: "70px 0px" }}>
            <h1>Convinced Enough? Register Now!</h1>
            <Button
              variant="info"
              className="get-started"
              href="/#who-are-we"
              style={{ margin: "30px auto" }}
            >
              Join Us
            </Button>
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
