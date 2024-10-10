import Head from "next/head";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import CdTestimonials from "../components/CdTestimonials";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import Image from "next/legacy/image";
import { useRef } from "react";

export default function CampusDirector() {
  const whatWeOfferRef = useRef(null);

  const scrollToWhatWeOffer = () => {
    if (whatWeOfferRef.current) {
      whatWeOfferRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <Head>
        <title>Campus Executive Internship</title>

        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <meta name={"description"} content={"Campus Executive Internship"} />
        <meta property="og:title" content="Campus Executive Internship" />
        <meta
          property="og:description"
          content="Become the Student Lead of enhancing and expanding the
                entrepreneurial opportunities in your college!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ecelliitbhu.com/cd" />
        <meta httpEquiv="Content-Language" content="en-us" />
        <meta charSet="UTF-8" />
      </Head>
      <Nav />
      <div>
        <Container fluid className="body">
          <Row className="header" style={{ margin: "80px auto" }}>
            <Col className="info cd-info">
              <h1>Join the Campus Executive Intership Programme!</h1>
              <h2>
                Accelerate the entrepreneurial <br /> journey in your college!
              </h2>
              <p>
                Become the Student Lead of enhancing and expanding the
                entrepreneurial opportunities in your college!
              </p>

              <Button
                className="get-started join-cd"
                href="https://docs.google.com/forms/u/1/d/e/1FAIpQLSeZfM1LGMAkT1HbChxNtvm5pobNqnvE7uNMf32OmBAble6aTw/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register Now!
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
              <h1 className="mb-2">Why Campus Executive Internship?</h1>
              <p>
                Devoted to acting as a symbiotic link between the entrepreneurs
                and the existing startup ecosystem, E-Cell IIT BHU provides you
                with an opportunity to lead and educate the students masses in
                your college with various startup related activities and events
                to inculcate the entrepreneurial culture in your own college!
              </p>
              <Button
                className="learn-more mt-2 join-cd"
                // href="/cd/#what-we-offer"
                onClick={scrollToWhatWeOffer}
                // target="_blank"
                // rel="noopener noreferrer"
              >
                Learn more &rarr;
              </Button>
              <Row className="reach">
                <Col>
                  <h3 className="reach-num" id="count1">
                    1700+
                  </h3>
                  <p className="reach-info">{`Enthusiastic Campus Intern's Onboarded`}</p>
                </Col>
                <Col>
                  <h3 className="reach-num" id="count2">
                    250+
                  </h3>
                  <p className="reach-info">Colleges supported till date!</p>
                </Col>
              </Row>
            </Col>
            <Col className="image-section" style={{ padding: "40px" }}>
              <lottie-player
                src="https://assets3.lottiefiles.com/packages/lf20_lnn3liuj.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </Col>
          </Row>
          <Row></Row>
          <Row
            id="what-we-offer"
            ref={whatWeOfferRef}
            className="what-we-do info"
            style={{ margin: "60px auto 0px" }}
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

                <p>Free E-Summit 2024 Passes</p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/2.png" alt="" height="512" width="512" />
                </div>

                <p>
                  Network with Unicorn Founders and gain valuable experience.
                </p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/3.png" alt="" height="512" width="512" />
                </div>

                <p>One-to-one mentorship by startup founders</p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/4.png" alt="" height="512" width="512" />
                </div>
                <p>
                  Top performers will be featured on the social media handles of
                  E-Cell IIT BHU.
                </p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/5.png" alt="" height="512" width="512" />
                </div>
                <p>Access to the Entrepreneurship Masterclass</p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/8.png" alt="" height="512" width="512" />
                </div>
                <p>
                  Opportunity to enter BWU Cohort and start your
                  entrepreneurship journey
                </p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/7.png" alt="" height="512" width="512" />
                </div>
                <p>Access to Curated Startup Helpbook of E-Cell IIT BHU</p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/6.png" alt="" height="512" width="512" />
                </div>
                <p>
                  {`Top Campus Executive Interns to be featured in the E-Cell IIT BHU's Weekly Newsletter`}
                </p>
              </div>
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/9.png" alt="" height="512" width="512" />
                </div>
                <p>Certificate of Internship verified by E-Cell IIT BHU</p>
              </div>
              {/*<div className="perk">*/}
              {/*  <div className="perk-image">*/}
              {/*    <Image src="/perks/10.png" alt="" height="512" width="512" />*/}
              {/*  </div>*/}
              {/*  <p>Free E-Summit 2024 Merch to the (Top 5 Performers)</p>*/}
              {/*</div>*/}
              <div className="perk">
                <div className="perk-image">
                  <Image src="/perks/10.png" alt="" height="512" width="512" />
                </div>
                <p>
                  Goodies, merchandise and learning resources from our sponsors
                </p>
              </div>
            </div>
          </Row>
          <Row className="who-are-we" style={{ margin: "auto" }}>
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
              <h1 style={{ fontSize: "3rem", margin: "30px 0px" }}>
                Responsibilities
              </h1>
              <ul className="ca-responsibilities">
                <li>
                  <DoneRoundedIcon className="resp-icon" />
                  The Campus Executive Intern must assist the students with
                  their total capacity in registering for E-Cell IIT BHU&apos;s
                  competitions.
                </li>
                <li>
                  <DoneRoundedIcon className="resp-icon" />
                  The Campus Executive Intern must increase the outreach of the
                  initiatives of the E-Cell IIT BHU to promote entrepreneurial
                  activities in his/her college network.
                </li>
                <li>
                  <DoneRoundedIcon className="resp-icon" />
                  The Campus Executive Intern may coordinate with the college
                  authorities to extensively circulate the message regarding the
                  conduction of E-Cell IIT BHU events and initatives.
                </li>
                <li>
                  <DoneRoundedIcon className="resp-icon" />
                  The Campus Executive Intern must Ideate by engaging in
                  discussions with the other Campus Interns and E-cell
                  coordinators to bring new ideas and increase overall reach of
                  E-Cell IIT BHU
                </li>
                <li>
                  <DoneRoundedIcon className="resp-icon" />
                  The Campus Executive intern may organize events/sessions
                  promoting entrepreneurship in their respective colleges with
                  the support of E-Cell IIT BHU.
                </li>
              </ul>
            </Col>
          </Row>
          <Row className="collage-container" style={{ margin: "70px 0px" }}>
            <h1>{`Testimonials from previous Campus Executives`}</h1>
            <CdTestimonials />
          </Row>
          <Row className="collage-container" style={{ margin: "70px 0px" }}>
            <h1>Convinced Enough? Register Now!</h1>

            <Button
              className="get-started join-cd"
              style={{ margin: "30px auto" }}
              href="https://docs.google.com/forms/u/1/d/e/1FAIpQLSeZfM1LGMAkT1HbChxNtvm5pobNqnvE7uNMf32OmBAble6aTw/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
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
