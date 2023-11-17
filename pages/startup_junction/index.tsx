import React, { FunctionComponent } from "react";
import Nav from "@/components/navbar/NavLayout";
import { Container } from "react-bootstrap";
import Footer from "@/components/Footer";
import Image from "next/image";
import styles from "./startup_junction.module.css";
import Link from "next/link";
import Head from "next/head";
import { MapPin, CalendarDays } from "lucide-react";

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
                <div className={styles.venue}>
                  <div>
                    <CalendarDays />
                    <span className={styles.heroDate}> 15th December 2023</span>
                  </div>
                  <div>
                    <MapPin />
                    <span className={styles.heroDate}>
                      {" "}
                      Delhi/NCR and Bengaluru
                    </span>
                  </div>
                </div>

                <p className={styles.heroDescription}>
                  Accelerate your startup&apos;s journey at Startup Junction,
                  E-Cell IIT BHU&apos;s visionary initiative to connect
                  promising startups with VCs, fostering innovation, growth, and
                  collaboration. Register now for this incredible chance to
                  propel your startup forward.
                </p>

                <Link
                  href="/forms/startup_junction"
                  className={`${styles.btn} ${styles.btnFill} ${styles.marginRightBtn}`}
                >
                  Register
                </Link>
                <Link
                  href={"/startup_junction#about"}
                  className={`${styles.btn} ${styles.btnOutline} ${styles.marginRightBtn}`}
                >
                  Learn more &darr;
                </Link>
              </div>
              <div className={styles.heroImgBox}>
                <Image
                  width={400}
                  height={400}
                  src="/startup_junction/startup-junction.png"
                  alt="Startup Junction"
                  className="hero-Image"
                />
              </div>
            </div>
          </section>
          <section className={styles.about} id="about">
            <h1>Our Partners</h1>
            <div className={styles.vcsimage}>
              <Link href="https://ivycamp.in/" target="_blank">
                <Image
                  width={150}
                  height={150}
                  src="/startup_junction_vcs/ivy.jpg"
                  alt="Woman enjoying food, meals in storage container, and food bowls on a table"
                  className={styles.vcimg}
                />
              </Link>
              <Link href="https://www.fortytwo.vc/" target="_blank">
              <Image
                width={150}
                height={100}
                src="/startup_junction_vcs/FortyTwo.png"
                alt="Woman enjoying food, meals in storage container, and food bowls on a table"
                className={styles.vcimg}
              />
              </Link>
              <Link href="https://ipventures.in/" target="_blank">
              <Image
                width={150}
                height={100}
                src="/startup_junction_vcs/ipv.png"
                alt="Woman enjoying food, meals in storage container, and food bowls on a table"
                className={styles.vcimg}
              />
              </Link>
              <Link href="https://soonicornventures.com/" target="_blank">
              <Image
                width={100}
                height={100}
                src="/startup_junction_vcs/sv.jpg"
                alt="Woman enjoying food, meals in storage container, and food bowls on a table"
                className={styles.vcimg}
              />
              </Link>
              <Link href="https://xscaleglobal.com/" target="_blank">
              <Image
                width={150}
                height={100}
                src="/startup_junction_vcs/xscale.png"
                alt="Woman enjoying food, meals in storage container, and food bowls on a table"
                className={styles.vcimg}
              />
              </Link>
              <Link href="https://www.91springboard.com/" target="_blank">
              <Image
                width={100}
                height={100}
                src="/startup_junction_vcs/s91.png"
                alt="Woman enjoying food, meals in storage container, and food bowls on a table"
                className={styles.vcimg}
              />
              </Link>
              <Link href="https://www.faad.in" target="_blank">
                <Image
                  width={120}
                  height={120}
                  src="/startup_junction_vcs/faad.jpeg"
                  alt="Woman enjoying food, meals in storage container, and food bowls on a table"
                  className={styles.vcimg}
                />
              </Link>
              <Link href="https://fluidvc.in/" target="_blank">
                <Image
                  width={100}
                  height={30}
                  src="/startup_junction_vcs/fluid.jpeg"
                  alt="Woman enjoying food, meals in storage container, and food bowls on a table"
                  className={styles.vcimg}
                />
              </Link>
              <Link href="https://nas.io/the-ecosystem-community" target="_blank">
                <Image
                  width={120}
                  height={120}
                  src="/startup_junction_vcs/nas.jpeg"
                  alt="Woman enjoying food, meals in storage container, and food bowls on a table"
                  className={styles.vcimg}
                />
              </Link>
              <div>
               < p style={{fontWeight:"bold"}}>
               Others Coming soon...
               </p>
              </div>
            </div>
          </section>
          <section className={styles.about} id="about">
            <h1>About Startup Junction</h1>
            <p>
              Startup Junction, a pre-event of E-Summit&apos;24 is an initiative
              by the Entrepreneurship Cell of IIT BHU aimed at nurturing and
              advancing the startup ecosystem in our country. Our vision is to
              connect venture capitalists with promising startups, providing a
              platform for innovation, growth, and collaboration.This one-day
              event, will take place in Delhi/NCR and Bengaluru on 15th
              Dec&apos;23, where the startups shortlisted after the due
              diligence round would get to pitch in front our VC panel, and
              serve as an exclusive platform for visibility, mentorship, and
              funding.
            </p>
          </section>{" "}
          <section className={styles.about}>
            <h1>About E-Summit&apos;24</h1>
            <p>
              E-Summit IIT BHU is the annual flagship event of Entrepreneurship
              Cell of IIT BHU. It stands as a testament to our commitment to
              promoting entrepreneurship and fostering innovation. This event is
              a celebration of the entrepreneurial spirit and serves as a
              dynamic platform for startups, young innovators, students, and
              industry leaders to come together, share knowledge, and inspire
              innovation. The latest edition of this entrepreneurial
              extravaganza, E-Summit&apos;24 is all set to take place from
              February 2nd to February 4th, 2024, and promises to be an
              enriching experience for all the participants.
            </p>
          </section>{" "}
          <section className={styles.about}>
            <h1>Why should you attend?</h1>
            <p>
              Startup Junction is a great opportunity for the seed and pre-seed stage startups looking forward to raising funds, building a strong network and  accelerating their growth. This event offers a unique opportunity to pitch to venture capitalists, connect with industry experts and receive invaluable guidance. By participating, startups gain exposure, networking, and potential investment, making it a pivotal step toward success in the entrepreneurial world. The shortlisted teams would also receive credits from AWS, Microsoft, Freshworks, and CleverTape.
            </p>
          </section>{" "}
          <section className={styles.about}>
            <h1>How to Register?</h1>
            <p>
              To register, startups should click on the “Register” tab above and
              complete the form provided, along with the submission of relevant
              documents. Our team will then conduct the due diligence, verifying
              the provided information and assessing each startup&apos;s
              potential. The shortlisted teams, selected to pitch in front of
              the VC panel on the event day, will be required to pay a moderate
              fee of Rs. 999 for the final presentation.
            </p>
           </section>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default StartupJunction;
