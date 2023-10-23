import React, { FunctionComponent } from "react";
import Nav from "@/components/navbar/NavLayout";
import { Container } from "react-bootstrap";
import Footer from "@/components/Footer";
import Image from "next/image";
import styles from "./startup_junction.module.css";
import Link from "next/link";
import Head from "next/head";

interface OwnProps {}

type Props = OwnProps;

const StartupJunction: FunctionComponent<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Startup Junction</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div>
        <Nav />
        <Container fluid className="body">
          <section className={styles.sectionHero}>
            <div className={styles.hero}>
              <div className="hero-text-box">
                <h1 className={styles.headingPrimary}>Startup Junction </h1>
                <h2 className={styles.headingSecondary}>
                  Nurturing Innovation and Growth
                </h2>
                <p className={styles.heroDescription}>
                  Startup Junction, an initiative by the Entrepreneurship Cell
                  of IIT BHU, fosters our nation&apos;s startup ecosystem. We
                  connect venture capitalists with promising startups, offering
                  a dynamic platform for innovation, growth, and collaboration.
                </p>

                <Link
                  href="/forms/startup_junction"
                  className={`${styles.btn} ${styles.btnFill} ${styles.marginRightBtn}`}
                >
                  Register
                </Link>
                <Link
                  href={"/"}
                  className={`${styles.btn} ${styles.btnOutline} ${styles.marginRightBtn}`}
                >
                  Learn more &darr;
                </Link>
              </div>
              <div className={styles.heroImgBox}>
                <Image
                  width={500}
                  height={500}
                  src="/startup-image.png"
                  alt="Woman enjoying food, meals in storage container, and food bowls on a table"
                  className="hero-Image"
                />
              </div>
              <div className={styles.deliveredMeals}>
                <div className={styles.deliveredImages}>
                  <Image
                    width={100}
                    height={100}
                    src="https://prayagtandon.github.io/Omnifood-Project/Hero-section/img/customers/customer-1.jpg"
                    alt="Customer photo"
                  />
                  <Image
                    width={100}
                    height={100}
                    src="https://prayagtandon.github.io/Omnifood-Project/Hero-section/img/customers/customer-2.jpg"
                    alt="Customer photo"
                  />
                  <Image
                    width={100}
                    height={100}
                    src="https://prayagtandon.github.io/Omnifood-Project/Hero-section/img/customers/customer-3.jpg"
                    alt="Customer photo"
                  />
                  <Image
                    width={100}
                    height={100}
                    src="https://prayagtandon.github.io/Omnifood-Project/Hero-section/img/customers/customer-4.jpg"
                    alt="Customer photo"
                  />
                  <Image
                    width={100}
                    height={100}
                    src="https://prayagtandon.github.io/Omnifood-Project/Hero-section/img/customers/customer-5.jpg"
                    alt="Customer photo"
                  />
                  <Image
                    width={100}
                    height={100}
                    src="https://prayagtandon.github.io/Omnifood-Project/Hero-section/img/customers/customer-6.jpg"
                    alt="Customer photo"
                  />
                </div>
                <p className={styles.deliveredText}>
                  <span>250,000+</span> meals delivered last year!
                </p>
              </div>
            </div>
          </section>
          <section className={styles.about}>
            <h1>About Startup Junction</h1>
            <p>
              Startup Junction, a pre-event of E-Summit&apos;24 is an initiative
              by the Entrepreneurship Cell of IIT BHU aimed at nurturing and
              advancing the startup ecosystem in our country. Our vision is to
              connect venture capitalists with promising startups, providing a
              platform for innovation, growth, and collaboration.This one-day
              event, will take place in Delhi/NCR and Bengaluru and serve as an
              exclusive platform for visibility, mentorship, and funding.
            </p>
          </section>{" "}
          <section className={styles.about}>
            <h1>Why should you attend?</h1>
            <p>
              Startup Junction is a great opportunity for all the startups
              around the country looking at accelerating their growth. This
              event offers a unique opportunity to pitch to venture capitalists,
              connect with industry experts and receive invaluable guidance. By
              participating, startups gain exposure, networking, and potential
              investment, making it a pivotal step toward success in the
              entrepreneurial world.
            </p>
          </section>{" "}
          <section className={styles.about}>
            <h1>How to Register?</h1>
            <p>
              To register, startups should complete the form provided below,
              along with the submission of relevant documents. Our team will
              then conduct the due diligence, verifying the provided information
              and assessing each startup&apos;s potential. The shortlisted teams,
              selected to pitch in front of the VC panel on the event day, will
              be required to pay a fee of Rs. 599. This process ensures that the
              most promising and committed startups have the opportunity to
              connect with venture capitalists and elevate their entrepreneurial
              journey.
            </p>
          </section>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default StartupJunction;
