import React, { FunctionComponent } from "react";
import Nav from "@/components/navbar/NavLayout";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import Footer from "@/components/Footer";
import Image from "next/image";
import styles from "./mentorship_pool.module.css";
import Link from "next/link";
import Head from "next/head";
import Mentors from "./components/mentors";
import img from "../../public/mentorship_pool/heroimg-removebg-preview.png"

interface OwnProps {}

type Props = OwnProps;

const MentorshipPool: FunctionComponent<Props> = () => {
  return (
    <>
      <Head>
        <title>Mentor Pool</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div>
        <Nav />
        <Container fluid className="body">
          <section className={styles.sectionHero}>
          <Row className={`header ${styles.hero1}`}>
  <Col className="info cd-info">
    <h1 style={{ marginBottom: '10px' }}>Startup Mentor Pool</h1>
    <p style={{ marginTop: '0', marginBottom: '20px' }}>
    Connect with seasoned industry professionals and boost your entrepreneurial journey!
<br></br><br></br>
<li>
Personalised Guidance</li>
<li>Industry Insights</li>
<li>Invaluable support</li>
<br></br>
Specially curated programs where mentors across various industries share their experience and expertise and guide you through your journey.

    </p>
    <div className={styles.button}>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSdlsizxKMUltELAMoUwdv8wuw0GSv_aAyUqHywX018J-_ucAQ/viewform?usp=sf_link">
        <button type="button" className="btn btn-dark btn-lg btn-block">Startup Application→</button>
      </a>
      <a href="https://forms.gle/xQsffLTWAnuZLKuw6">
        <button type="button" className="btn btn-lg btn-block" style={{backgroundColor: "#e67e22", color:"white"}}>Mentor Application→</button>
      </a>
    </div>
  </Col>
  <Col className="image-section">
    <img src={img.src} className="img-fluid" style={{justifyContent: 'center'}} alt="Responsive" />
  </Col>
</Row>

            
            {/* <div className="info waw col"> */}
            <div className={styles.hsp}>
              <div className="reach row">
                <div className="col">
                  <h3 className="reach-num" id="count1" style={{ color:"#E67E22" }}>20+</h3><p className="reach-info">Student startups!</p>
                  </div>
                  <div className="col" style={{ margin: '0 100px' }}>
                  <h3 className="reach-num" id="count2" style={{ color:"#E67E22" }}>700+</h3><p className="reach-info">Alumni Startups!</p>
                  </div>
                  <div className="col">
                    <h3 className="reach-num" id="count2" style={{ color:"#E67E22" }}>15+</h3><p className="reach-info">Mentors!</p>
                    </div>
                    </div>
                    </div>





          <Mentors></Mentors>
          <div className={styles.para}>
                <p className={styles.heroDescription}>
                The Startup Mentorship Program is your gateway to transformative connections between aspiring student founders and seasoned industry professionals. Our carefully curated program pairs student visionaries with mentors possessing extensive entrepreneurial experience and expertise across various industries. Our mentors are dedicated to providing personalised guidance, insights, and invaluable support to help student founders navigate the challenges of startup life throughout the year.

                </p>
                </div>

            
                <div className="what-we-do info row">
    <h1>Join Us</h1>
    <p>Join us in building an enthralling entrepreneurial ecosystem!!</p>

    <div className={styles.card_row}>
    <div className={`card ${styles.fatCard}`} style={{ padding: 0 }}>
  <div className="card-body" style={{textAlign: 'justify', textJustify: 'inter-word' }}>
    <div className="card-title h5">Join as a Mentor</div>
    <p style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'justify' }}>
      By joining as a mentor, you contribute to the growth of the entrepreneurial community. Fill out the form below to get started.
    </p>
    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdlsizxKMUltELAMoUwdv8wuw0GSv_aAyUqHywX018J-_ucAQ/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
      <button type="button" className="card-button btn btn-dark">Join →</button>
    </a>
  </div>
</div>

        <div className={styles.space}></div>
        <div className={`card card ${styles.fatCard}`}>
        <div className="card-body" style={{ marginBottom: '5px' }}>
    <div className="card-title h5">Join as a Mentee</div>
    <p style={{ marginTop: '23px', marginBottom: '23px', textAlign:'justify'}}>Are you a startup looking for guidance? Let us connect you with the right mentors. Fill out the form below.</p>
    <a href="https://forms.gle/xQsffLTWAnuZLKuw6" target="_blank" rel="noopener noreferrer">
        <button type="button" className="card-button btn btn-dark">Join →</button>
    </a>
</div>

        </div>
    </div>
</div>


                
          </section>
          
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default MentorshipPool;
