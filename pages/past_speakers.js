import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import Image from "next/image";
import teslaSpeaker from "../public/past_speakers/tesla_speaker.jpg";
import sanjaysethi from "../public/past_speakers/sanjaysethi.jpeg";
import amisaha from "../public/past_speakers/amitavasaha.jpeg";
import piyu from "../public/past_speakers/piyushagrawal.jpeg";
import vish from "../public/past_speakers/vishaljindal.jpeg";
import dharam from "../public/past_speakers/dharamveer.jpeg";
import manish from "../public/past_speakers/manishgupta.jpeg";
import priyasharma from "../public/past_speakers/priyasharma.jpeg";
import gunjan from "../public/past_speakers/gunjanshukla.jpeg";
import vishwanathan from "../public/past_speakers/vishwanathaniyer.jpeg";
import jagadeesh from "../public/past_speakers/jagadeesh.jpeg";
import sandeep from "../public/past_speakers/sandeep.jpeg";
import krishna from "../public/past_speakers/krishna.jpeg";
import vinamra from "../public/past_speakers/vinamra.jpeg";
import kaustuv from "../public/past_speakers/kaustuv.jpeg";

const PastSpeakers = () => {
  return (
    <>
      <Head>
        <title>Past Speakers</title>
        <link rel="shortcut icon" href="/favicon.ico" />
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
              margin: "0px auto 60px",
              textAlign: "center",
              fontSize: "4rem",
              fontWeight: "bold",
            }}
          >
            Past Speakers
          </h1>
        </div>
        <div className="row">
          <div className="team-container-1">
            <div className="our-team past-speaker">
              <Image
                src={teslaSpeaker}
                className="img-responsive"
                alt="team member"
              />
              <div className="team-content">
                <h3 className="name">Guru Sankararaman</h3>
                <span className="post">ex-Vice President IT @Tesla</span>
              </div>
            </div>
            <div className="our-team past-speaker">
              <Image src={sanjaysethi} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">Sanjay Sethi</h3>
                <span className="post">Co-Founder, CEO @ShopClues.com</span>
              </div>
            </div>
            <div className="our-team past-speaker">
              <Image src={amisaha} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">Amitava Saha</h3>
                <span className="post">Co-Founder,CEO @XpressBees</span>
                <span className="post">Co-Founder, COO @FirstCry.com</span>
              </div>
            </div>
            <div className="our-team past-speaker">
              <Image
                src={piyu}
                className="img-responsive"
                alt="team member"
              />
              <div className="team-content">
                <h3 className="name">Piyush Agrawal</h3>
                <span className="post"> Founder, Director @cricbuzz.com</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image src={vish} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">Vishal Jindal</h3>
                <span className="post">Co-Founder, CEO @Biryani by Kilo</span>
              </div>
            </div>
            <div className="our-team past-speaker ">
              <Image src={dharam} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">Dharamveer Singh Chouhan</h3>
                <span className="post">Co-Founder,CEO @Zostel</span>
              </div>
            </div>
            <div className="our-team past-speaker">
              <Image src={manish} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">Manish Gupta</h3>
                <span className="post">Founder @Alphonso Inc.</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image src={priyasharma} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">Priya Sharma</h3>
                <span className="post">Co-Founder @ZestMoney</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image src={gunjan} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">Gunjan Shukla</h3>
                <span className="post">ex-CFO @Paypal India</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image src={vishwanathan} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">Vishwanathan Iyer</h3>
                <span className="post">VP Architecture @Cisco (APJ)</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image src={jagadeesh} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">BV Jagadeesh</h3>
                <span className="post">MD Kaaj Ventures</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image src={sandeep} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">Sandeep Jain</h3>
                <span className="post">Founder, CEO @GeeksforGeeks</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image src={krishna} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">Krishna Vedati</h3>
                <span className="post">Co-Founder, CEO @Tynker.com</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image src={vinamra} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">Vinamra Pandya</h3>
                <span className="post">
                  Founder, CEO @ GoNuts.com (Fortune 40 Under 40)
                </span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image src={kaustuv} className="img-responsive" alt="team member" />
              <div className="team-content">
                <h3 className="name">Kaustuv Mukherjee</h3>
                <span className="post">Managing Director @BCG Consulting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PastSpeakers;
