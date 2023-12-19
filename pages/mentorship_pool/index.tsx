import React, { FunctionComponent } from "react";
import Nav from "@/components/navbar/NavLayout";
import { Container } from "react-bootstrap";
import Footer from "@/components/Footer";
import Image from "next/image";
import styles from "./mentorship_pool.module.css";
import Link from "next/link";
import Head from "next/head";
import Mentors from "./components/mentors";

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
            <div className={styles.hero}>
              <div className="hero-text-box">
                <h1 className={styles.headingPrimary}>Mentor Pool </h1>
                <div className={styles.para}>
                <p className={styles.heroDescription}>
                The Startup Mentorship Program is your gateway to transformative connections between aspiring student founders and seasoned industry professionals. Our carefully curated program pairs student visionaries with mentors possessing extensive entrepreneurial experience and expertise across various industries. Our mentors are dedicated to providing personalized guidance, insights, and invaluable support to help student founders navigate the challenges of startup life throughout the year.
                </p>
                </div>
                
              </div>
              
            </div>


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
            <div className="what-we-do info row"><h1>Join Us</h1>
                <p>Join us in building an enthralling entrepreneurial ecosysytem!!</p>
                
                <div className={styles.card_row}>
                    <div className="card card">
                        <div className="card-body">
                            <div className="card-title h5">Join as a Mentor</div>
                            <p>By joining as a mentor, you contribute to the growth of the entrepreneurial community. Fill out the form below to get started.</p>
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSdlsizxKMUltELAMoUwdv8wuw0GSv_aAyUqHywX018J-_ucAQ/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
                                    <button type="button" className="card-button btn btn-dark">Join →</button>
                                    </a>
                                    </div>
                            </div>
                            <div className={styles.space}></div>
                        <div className="card card">
                            <div className="card-body">
                                <div className="card-title h5">Join as a Mentee</div>
                                <p>Are you a startup looking for guidance? Let us connect you with the right mentors. Fill out the form below.</p>
                                <a href="https://forms.gle/xQsffLTWAnuZLKuw6" target="_blank" rel="noopener noreferrer"><button type="button" className="card-button btn btn-dark">Join →</button></a>
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
