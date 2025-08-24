import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import Image from "next/image";
// import teslaSpeaker from "../public/past_speakers/tesla_speaker.jpg";
// import sanjaysethi from "../public/past_speakers/sanjaysethi.jpeg";
// import amisaha from "../public/past_speakers/amitavasaha.jpeg";
// import piyu from "../public/past_speakers/piyushagrawal.jpeg";
// import vish from "../public/past_speakers/vishaljindal.jpeg";
// import dharam from "../public/past_speakers/dharamveer.jpeg";
// import manish from "../public/past_speakers/manishgupta.jpeg";
// import priyasharma from "../public/past_speakers/priyasharma.jpeg";
// import gunjan from "../public/past_speakers/gunjanshukla.jpeg";
// import vishwanathan from "../public/past_speakers/vishwanathaniyer.jpeg";
// import jagadeesh from "../public/past_speakers/jagadeesh.jpeg";
// import sandeep from "../public/past_speakers/sandeep.jpeg";
// import krishna from "../public/past_speakers/krishna.jpeg";
// import vinamra from "../public/past_speakers/vinamra.jpeg";
// import kaustuv from "../public/past_speakers/kaustuv.jpeg";

const anirban        = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/anirban.jpg?tr=w-300,h-300";
const ankurwarikoo   = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/ankurwarikoo.jpg?tr=w-300,h-300";
const chinmayasharma = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/chinmayasharma.jpg?tr=w-300,h-300";
const christopher    = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/christopher.jpg?tr=w-300,h-300";
const dhruvagarwala  = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/dhruvagarwala.jpg?tr=w-300,h-300";
const Gautamravi     = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/Gautamravi.jpg?tr=w-300,h-300";
const girishshivani  = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/girishshivani.jpg?tr=w-300,h-300";
const gunit          = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/gunit.jpg?tr=w-300,h-300";
const kataria        = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/kataria.jpg?tr=w-300,h-300";
const kshitiz        = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/kshitiz.jpg?tr=w-300,h-300";
const Kumarbagrodia  = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/Kumarbagrodia.jpg?tr=w-300,h-300";
const manan          = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/manan.jpg?tr=w-300,h-300";
const manananand     = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/manananand.jpg?tr=w-300,h-300";
const saurabh        = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/saurabh.jpg?tr=w-300,h-300";
const Shaileshkumar  = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/Shaileshkumar.jpg?tr=w-300,h-300,cm-pad_resize";
const vishwas        = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/vishwas.jpg";
const teslaSpeaker  = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/tesla_speaker.jpg?tr=w-300,h-300";
const sanjaysethi   = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/sanjaysethi.jpeg?tr=w-300,h-300";
const amisaha       = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/amitavasaha.jpeg?tr=w-300,h-300";
const piyu          = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/piyushagrawal.jpeg?tr=w-300,h-300";
const vish          = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/vishaljindal.jpeg?tr=w-300,h-300";
const dharam        = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/dharamveer.jpeg?tr=w-300,h-300";
const manish        = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/manishgupta.jpeg?tr=w-300,h-300";
const priyasharma   = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/priyasharma.jpeg?tr=w-300,h-300";
const gunjan        = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/gunjanshukla.jpeg?tr=w-300,h-300";
const vishwanathan  = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/vishwanathaniyer.jpeg?tr=w-300,h-300";
const jagadeesh     = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/jagadeesh.jpeg?tr=w-300,h-300";
const sandeep       = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/sandeep.jpeg?tr=w-300,h-300";
const krishna       = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/krishna.jpeg?tr=w-300,h-300";
const vinamra       = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/vinamra.jpeg?tr=w-300,h-300";
const kaustuv       = "https://ik.imagekit.io/ecelliitbhu/website/past_speakers/kaustuv.jpeg?tr=w-300,h-300";


const PastSpeakers = () => {
  return (
    <>
      <Head>
        <title>Past Speakers</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico" />
        <meta
          name="description"
          content="Explore a gallery of influential past speakers who've graced E-cell IIT-BHU with their presence. View images of founders and their companies, such as ShopClues, FirstCry, and PhysicsWallah, who've shared their insights and experiences with our entrepreneurial community."
        />
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
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Guru Sankararaman</h3>
                <span className="post">ex-Vice President IT @Tesla</span>
              </div>
            </div>
                        <div className="our-team past-speaker">
              <Image
                src={anirban}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Anirban Ghosh</h3>
                <span className="post">Ex-AVP @Sugar</span>
              </div>
            </div>
                        <div className="our-team past-speaker">
              <Image
                src={ankurwarikoo}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Ankur Warikoo</h3>
                <span className="post">Founder @WebVeda</span>
              </div>
            </div>
                        <div className="our-team past-speaker">
              <Image
                src={chinmayasharma}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Chinmaya Sharma</h3>
                <span className="post">Infoedge Ventures</span>
              </div>
            </div>
                         <div className="our-team past-speaker">
              <Image
                src={christopher}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Christopher Turillo</h3>
                <span className="post">Co-Founder @Medha</span>
              </div>
            </div> 
                        <div className="our-team past-speaker">
              <Image
                src={dhruvagarwala}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Dhruv Agarwal</h3>
                <span className="post">Co-Founder proptiger.com, CEO housing.com</span>
              </div>
            </div>
                        <div className="our-team past-speaker">
              <Image
                src={Gautamravi}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Gautam Ravi</h3>
                <span className="post">WEH Ventures</span>
              </div>
            </div>
                        <div className="our-team past-speaker">
              <Image
                src={girishshivani}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Girish Shivani</h3>
                <span className="post">Executive Director,Fund Manager at YourNest Venture Capital</span>
              </div>
            </div>
                        <div className="our-team past-speaker">
              <Image
                src={gunit}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Gunit Dhingra</h3>
                <span className="post">Product Manager @Google,Lead product managet at make my trip</span>
              </div>
            </div>
                        <div className="our-team past-speaker">
              <Image
                src={kataria}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Amit Kataria</h3>
                <span className="post">Co-Founder,COO @Saras AI</span>
              </div>
            </div>
                        <div className="our-team past-speaker">
              <Image
                src={kshitiz}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Kshitiz Aggarwal</h3>
                <span className="post">Asia Data,AI @Microsoft</span>
              </div>
            </div>
                        <div className="our-team past-speaker">
              <Image
                src={Kumarbagrodia}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Kumaar Bagrodia</h3>
                <span className="post">Founder,neuro-scientist @NeuroLeap</span>
              </div>
            </div>
                        <div className="our-team past-speaker">
              <Image
                src={manan}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Manan Singhal</h3>
                <span className="post">Director Strategy @Zepto</span>
              </div>
            </div>
                        <div className="our-team past-speaker">
              <Image
                src={manananand}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Manan Anand</h3>
                <span className="post">Investor @growX ventures</span>
              </div>
            </div>
                        <div className="our-team past-speaker">
              <Image
                src={saurabh}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Saurabh Singh</h3>
                <span className="post">Partner @Trifecta Capital</span>
              </div>
            </div>
                        <div className="our-team past-speaker">
              <Image
                src={Shaileshkumar}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Shailesh Kumar</h3>
                <span className="post">Chief Success Officer @Saras AI Institute</span>
              </div>
            </div>
            <div className="our-team past-speaker">
              <Image
                src={vishwas}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Vishwas Jain</h3>
                <span className="post">Manager Data Scientist @MasterCard</span>
              </div>
            </div>
            <div className="our-team past-speaker">
              <Image
                src={sanjaysethi}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Sanjay Sethi</h3>
                <span className="post">Co-Founder, CEO @ShopClues.com</span>
              </div>
            </div>
            <div className="our-team past-speaker">
              <Image
                src={amisaha}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Amitava Saha</h3>
                <span className="post">Co-Founder,CEO @XpressBees</span>
                <span className="post">Co-Founder, COO @FirstCry.com</span>
              </div>
            </div>
            <div className="our-team past-speaker">
              <Image 
                src={piyu}  
                width={300}
                height={300} 
                className="img-responsive"
                alt="team member" 
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Piyush Agrawal</h3>
                <span className="post"> Founder, Director @cricbuzz.com</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image src={vish}
               width={300}
               height={300} 
               className="img-responsive" 
               alt="team member" 
               unoptimized
               />
              <div className="team-content">
                <h3 className="name">Vishal Jindal</h3>
                <span className="post">Co-Founder, CEO @Biryani by Kilo</span>
              </div>
            </div>
            <div className="our-team past-speaker ">
              <Image
                src={dharam}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Dharamveer Singh Chouhan</h3>
                <span className="post">Co-Founder,CEO @Zostel</span>
              </div>
            </div>
            <div className="our-team past-speaker">
              <Image
                src={manish}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Manish Gupta</h3>
                <span className="post">Founder @Alphonso Inc.</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image
                src={priyasharma}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Priya Sharma</h3>
                <span className="post">Co-Founder @ZestMoney</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image
                src={gunjan}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Gunjan Shukla</h3>
                <span className="post">ex-CFO @Paypal India</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image
                src={vishwanathan}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Vishwanathan Iyer</h3>
                <span className="post">VP Architecture @Cisco (APJ)</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image
                src={jagadeesh}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">BV Jagadeesh</h3>
                <span className="post">MD Kaaj Ventures</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image
                src={sandeep}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Sandeep Jain</h3>
                <span className="post">Founder, CEO @GeeksforGeeks</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image
                src={krishna}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Krishna Vedati</h3>
                <span className="post">Co-Founder, CEO @Tynker.com</span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image
                src={vinamra}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
              <div className="team-content">
                <h3 className="name">Vinamra Pandya</h3>
                <span className="post">
                  Founder, CEO @ GoNuts.com (Fortune 40 Under 40)
                </span>
              </div>
            </div>
            <div className="our-team past-speaker  ">
              <Image
                src={kaustuv}
                width={300}
                height={300}
                className="img-responsive"
                alt="team member"
                unoptimized
              />
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
