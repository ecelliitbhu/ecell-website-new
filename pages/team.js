import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import akj from "../public/team/akj.jpg";
import prof from "../public/team/rajnesh_tyagi.png";
import vp from "../public/team/vp.jpg";
import avp from "../public/team/amitavp.jpg";
import sr from "../public/team/sr.jpeg";
import rieu from "../public/team/rieu.jpeg";
import ev from "../public/team/ev.jpeg";
import wnb from "../public/team/wnb.jpg";
import tqb from "../public/team/tqb.jpeg";

const Team = () => {
  return (
    <>
      <Head>
        <title>Team</title>
      </Head>
      <Nav />
      <div
        className="container"
        style={{
          margin: "80px auto",
        }}
      >
        <div className="row">
          <h1
            style={{
              margin: "auto",
              textAlign: "center",
              fontSize: "4rem",
              fontWeight: "bold",
            }}
          >
            The Team
          </h1>
          <h2
            style={{
              fontSize: "1.5rem",
              color: "black",
              textAlign: "center",
            }}
          >
            GET TO KNOW THE TEAM OF E-CELL
          </h2>
        </div>
        <div>
          <h2
            style={{
              fontSize: "2rem",
              color: "black",
              textAlign: "center",
              fontWeight: "bold",
              margin: "90px auto 30px auto",
            }}
          >
            UNDER THE GUIDANCE OF
          </h2>
          <div className="our-team" style={{ margin: "auto" }}>
            <Image src={prof} className="img-responsive" alt="team member" />
            <div className="team-content">
              <h3 className="name">PROF. RAJNESH TYAGI</h3>
              <span className="post">PROF. INCHARGE, E-CELL</span>
            </div>
          </div>
        </div>

        <div className="row">
          <h2
            style={{
              fontSize: "2rem",
              color: "black",
              textAlign: "center",
              fontWeight: "bold",
              margin: "90px auto 30px auto",
            }}
          >
            CORE TEAM MEMBERS
          </h2>
          <div className="team-container">
            <div className="our-team">
              <Image src={vp} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">HARSHIT SHUKLA</h3>
                <span className="post">VICE PRESIDENT E-CELL</span>
                <div className="team-social">
                  <Link href="#">
                    <FaFacebook className="social-icons"></FaFacebook>
                  </Link>
                  <Link href="#">
                    <FaLinkedin className="social-icons"></FaLinkedin>
                  </Link>
                  <Link href="#">
                    <FaTwitter className="social-icons"></FaTwitter>
                  </Link>
                </div>
              </div>
            </div>
            <div className="our-team">
              <Image src={avp} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">AMIT KUMAR BAHETI</h3>
                <span className="post">ASSOCIATE VICE PRESIDENT E-CELL</span>
                <div className="team-social">
                  <Link href="#">
                    <FaFacebook className="social-icons"></FaFacebook>
                  </Link>
                  <Link href="#">
                    <FaLinkedin className="social-icons"></FaLinkedin>
                  </Link>
                  <Link href="#">
                    <FaTwitter className="social-icons"></FaTwitter>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="team-container-1">
            <div className="our-team ">
              <Image src={sr} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">ANMOL GOYAL</h3>
                <span className="post">STRATEGIC RELATIONS HEAD</span>
                <div className="team-social">
                  <Link href="#">
                    <FaFacebook className="social-icons"></FaFacebook>
                  </Link>
                  <Link href="#">
                    <FaLinkedin className="social-icons"></FaLinkedin>
                  </Link>
                  <Link href="#">
                    <FaTwitter className="social-icons"></FaTwitter>
                  </Link>
                </div>
              </div>
            </div>
            <div className="our-team">
              <Image src={akj} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">AMIT KUMAR JHA</h3>
                <span className="post">SAP HEAD</span>
                <div className="team-social">
                  <Link href="#">
                    <FaFacebook className="social-icons"></FaFacebook>
                  </Link>
                  <Link href="#">
                    <FaLinkedin className="social-icons"></FaLinkedin>
                  </Link>
                  <Link href="#">
                    <FaTwitter className="social-icons"></FaTwitter>
                  </Link>
                </div>
              </div>
            </div>
            <div className="our-team  ">
              <Image src={rieu} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">ARSHAD KHAN</h3>
                <span className="post">RIEU HEAD</span>
                <div className="team-social">
                  <Link href="#">
                    <FaFacebook className="social-icons"></FaFacebook>
                  </Link>
                  <Link href="#">
                    <FaLinkedin className="social-icons"></FaLinkedin>
                  </Link>
                  <Link href="#">
                    <FaTwitter className="social-icons"></FaTwitter>
                  </Link>
                </div>
              </div>
            </div>

            <div className="our-team ">
              <Image src={ev} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">ABHISHEK NAVNEET FARDE</h3>
                <span className="post">EVENTS HEAD</span>
                <div className="team-social">
                  <Link href="#">
                    <FaFacebook className="social-icons"></FaFacebook>
                  </Link>
                  <Link href="#">
                    <FaLinkedin className="social-icons"></FaLinkedin>
                  </Link>
                  <Link href="#">
                    <FaTwitter className="social-icons"></FaTwitter>
                  </Link>
                </div>
              </div>
            </div>
            <div className="our-team">
              <Image src={wnb} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">AATISHYA SOOD</h3>
                <span className="post">WEB AND BRANDING HEAD</span>
                <div className="team-social">
                  <Link href="#">
                    <FaFacebook className="social-icons"></FaFacebook>
                  </Link>
                  <Link href="#">
                    <FaLinkedin className="social-icons"></FaLinkedin>
                  </Link>
                  <Link href="#">
                    <FaTwitter className="social-icons"></FaTwitter>
                  </Link>
                </div>
              </div>
            </div>
            <div className="our-team  ">
              <Image src={tqb} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">ANSHUL SINGH</h3>
                <span className="post">STUDENT BODY HEAD, CISCO THINGQ</span>
                <div className="team-social">
                  <Link href="#">
                    <FaFacebook className="social-icons"></FaFacebook>
                  </Link>
                  <Link href="#">
                    <FaLinkedin className="social-icons"></FaLinkedin>
                  </Link>
                  <Link href="#">
                    <FaTwitter className="social-icons"></FaTwitter>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Team;
