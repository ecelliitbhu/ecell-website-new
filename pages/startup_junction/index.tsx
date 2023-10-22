import React, { FunctionComponent } from "react";
import Nav from "@/components/navbar/NavLayout";
import { Container } from "react-bootstrap";
import Footer from "@/components/Footer";
import Image from 'next/image';
import styles from "./startup_junction.module.css";
import Link from "next/link";


interface OwnProps {}

type Props = OwnProps;

const StartupJunction: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <Nav />
      <Container fluid className="body">
        <section className={styles.sectionHero}>
          <div className={styles.hero}>
            <div className="hero-text-box">
              <h1 className={styles.headingPrimary}>
              Startup Junction - Nurturing Innovation and Growth
              </h1>
              <p className={styles.heroDescription}>
              Startup Junction, an initiative by the Entrepreneurship Cell of IIT BHU, fosters our nation's startup ecosystem. We connect venture capitalists with promising startups, offering a dynamic platform for innovation, growth, and collaboration.
              </p>
          
              <Link
                href="#"
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
      </Container>
      <Footer />
    </div>
  );
};

export default StartupJunction;
