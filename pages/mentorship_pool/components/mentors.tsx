import React from "react";
// import Image from "next/legacy/image";
import Image from "next/image";

import { FaLinkedin } from "react-icons/fa";
// import sharad from "../../../public/mentorship_pool/Sharad_seth.jpeg"
// import anshu from "../../../public/mentorship_pool/Anshu.jpeg"
// import saikat from "../../../public/mentorship_pool/saikat.jpeg"
// import manish from "../../../public/mentorship_pool/manish.jpeg"
// import amit from "../../../public/mentorship_pool/amit.jpeg"
// import anshul from "../../../public/mentorship_pool/anshul.jpeg"
// import ekansh from "../../../public/mentorship_pool/ekansh.jpeg"
// import rajesh from "../../../public/mentorship_pool/rajesh.jpeg"
// import cyril from "../../../public/mentorship_pool/cyril.jpeg"
// import kaustubh from "../../../public/mentorship_pool/kaustubh.jpeg"
// import ankit from "../../../public/mentorship_pool/ankit.jpeg"
// import sunil from "../../../public/mentorship_pool/sunil.jpeg"
// import vinaytosh from "../../../public/mentorship_pool/vinaytosh.jpeg"
// import rishi from "../../../public/mentorship_pool/rishi.jpeg"
// import nitin from "../../../public/mentorship_pool/nitin.jpg"
// import binod from "../../../public/mentorship_pool/BINOD.jpg"


const tanay    = "https://ik.imagekit.io/tc4boofhd/ecell/tanay__Q8_vP3fnm?updatedAt=1757812469092";
const ashok     = "https://ik.imagekit.io/tc4boofhd/ecell/ashok_ag_FTaiNVJlt?updatedAt=1761568267960";
const prashant    = "https://ik.imagekit.io/tc4boofhd/ecell/Photo-in-Frames.jpg_id=JD8Blr&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkpEOEJsciIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NDkwNDYyNn0.xeVqMZf7St4Y3nBT0xXjrXxDUv5bed1cVJpqzODfRdA&signature=7282f93f48ca0da49991c65522dbfbcbd6b68ee80fb2fd8bf47ebf2b1c6e9a4e?updatedAt=1757694759651";
const prithwijit    = "https://ik.imagekit.io/tc4boofhd/ecell/prithwijit_deyy_IvaOV32sz?updatedAt=1761568601194";
const ashish      = "https://ik.imagekit.io/tc4boofhd/ecell/ashish_bansal_Ggykxk-Qq?updatedAt=1761568827673";
const binod    = "https://ik.imagekit.io/tc4boofhd/ecell/binod_kumar_VH_L1CYUY-?updatedAt=1761568953087";
const nitin    = "https://ik.imagekit.io/tc4boofhd/ecell/PROFILE-PIC-.jpeg_id=NYOKzW&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik5ZT0t6VyIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NTE4Mjc5NH0.lg8-YjVRgYWG4f1OcMogwOi5SbB6IRxC131Sy5CaCxA&signature=225fb5ec0f94ec15c52b2fbd4b4569020b91473b513c1e2cab91d6c29bcdd7f5?updatedAt=1761569057676";
const anubhav    = "https://ik.imagekit.io/tc4boofhd/ecell/anubhav_tRw7uJ_dI?updatedAt=1757811848261";
const sanjay     = "https://ik.imagekit.io/tc4boofhd/ecell/sanjaysrivastava_TnN6zeFSP?updatedAt=1761569286340";
const vinaytosh  = "https://ik.imagekit.io/tc4boofhd/ecell/vinaytosh_gFBBayday?updatedAt=1761569372418";
const sharad     = "https://ik.imagekit.io/tc4boofhd/ecell/image_2.jpg_id=djBPPD&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRqQlBQRCIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NjE5MTYyMn0.YBMdOMDeES4c_pizIU7J4Cs8kBmXsGYRBMJQg8lxF5w&signature=0b2ae852030de6d630c9d46b42e64afe495882f7508e43d5a14f3e3dc1994a16?updatedAt=1761569563617";
const bhashwanth     = "https://ik.imagekit.io/tc4boofhd/ecell/bhashwanth_sxverPyDo?updatedAt=1761569640210";
const anjali = "https://ik.imagekit.io/tc4boofhd/ecell/18.jpg_id=zrZ4j1&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InpyWjRqMSIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NzI3MDQ5MH0.Z8qCLtMfA2euEMSRsaS6pwPhNc0yJEJcDnZP-dC0JgE&signature=3d10e4e629b56826ee766b165eac3e5f3d0d9bccfb9beabfb9f9fbc94429c6d6?updatedAt=1757698338165";
const satyam_srivastav = "https://ik.imagekit.io/tc4boofhd/ecell/satyamsriv.png?updatedAt=1761570282360";
const govindsharma = "https://ik.imagekit.io/tc4boofhd/ecell/govindsharma.png?updatedAt=1761571054702";
//const pavithra = "https://ik.imagekit.io/tc4boofhd/ecell/prathvi.png?updatedAt=1761571427738";
const shashwatghosh = "https://ik.imagekit.io/tc4boofhd/ecell/shashwat_ghosh.png?updatedAt=1761571576549";



const verticalHeads = [
  {
    name: "Tanay Mandelia",
    position: "Fundraising & Investment @ Marwar Mentors Private Limited",
    institute:"",
    image: tanay,
    linkedin: "https://www.linkedin.com/in/tanay-mandelia",
  },
  {
    name: "Dr Ashok Agarwal",
    position: "Senior Vice President @ Axis Bank Ltd",
    institute:"",
    image: ashok,
    linkedin: "https://www.linkedin.com/in/drashokagarwal",
  },
  
  {
    name: "Prashant K Tiwari",
    position: "Software Engineer @ Linkedin",
    institute:"",
    image: prashant,
    linkedin: "https://www.linkedin.com/in/pktparticle/",
  },
  {
    name: "Prithwijit Dey",
    position: "Entrepreneur, Chief Operating Officer & Founding Member @ Alchemyst AI",
    institute:"",
    image: prithwijit,
    linkedin: "https://www.linkedin.com/in/prithwijitdey/",
  },
  {
    name: "Ashish Bansal",
    position: "Founder & CEO @ StarSpark AI",
    institute:"",
    image: ashish,
    linkedin: "https://linkedin.com/in/bansalashish",
  },
  {
    name: "Binod Kumar",
    position: "Founder and CEO @ TrueFirms and AgentsArchitects.ai",
    institute:"",
    image: binod,
    linkedin: "https://www.linkedin.com/in/kumar-binod/",
  },
  {
    name: "Nitin Sharma",
    position: "Founder @ Integrated Fintech Community",
    institute:"",
    image: nitin,
    linkedin: "https://www.linkedin.com/in/nitinsharmavats/",
  },
  {
    name: "Anubhav Dwivedi",
    position: "CEO & Founder @ Saviant",
    institute:"",
    image: anubhav,
    linkedin: "https://www.linkedin.com/anubhavdwivedi",
  },
  {
    name: "Sanjay Shrivastava",
    position: "Head - Fertilizer Business @ Hindalco Industries Limited",
    institute:"",
    image: sanjay,
    linkedin: "https://sanjay.srivastava@adityabirla.com",
  },
  {
    name: "Vinaytosh Mishra",
    position: "Associate Dean @ Thumbay College of Management and AI in Healthcare. Gulf Medical University ,Ajman,UAE",
    institute:"",
    image: vinaytosh,
    linkedin: "https://www.linkedin.com/in/vinaytosh/",
  },
  {
    name: "Sharad Seth",
    position: "Fractional CTPO @ Various Startups",
    institute:"",
    image: sharad,
    linkedin: "https://www.linkedin.com/in/sharadseth/",
  },
  {
    name: "Bhashwanth Kadapagunta",
    position: "AI & Engineering Leader	@ Deloitte",
    institute:"",
    image: bhashwanth,
    linkedin: "https://www.linkedin.com/in/bhashwanth/",
  },
  {
    name: "Anjali Sharma",
    position: "AI Product Manager @ Mesha",
    institute:"",
    image: anjali,
    linkedin: "https://www.linkedin.com/in/anjalisharmaaa/",
  },
  {
    name: "Satyam Srivastav",
    position: "Software Professional @ Microsoft",
    institute:"",
    image: satyam_srivastav,
    linkedin: "https://www.linkedin.com/in/satyam-srivastav/",
  },
  {
    name: "Govind Sharma",
    position: "Mentoring, Guest faculty, Expert Evaluator-MoEs Innovation Cell, National Research Development Corporation, New Delhi",
    institute:"",
    image: govindsharma,
    linkedin: "https://www.linkedin.com/in/govind-sharma-5385a816",
  },
  // {
  //   name: "PAVITHRA ADDANKI",
  //   position: "Founder @ MXC Ignite",
  //   institute:"",
  //   image: pavithra,
  //   linkedin: "https://www.linkedin.com/in/pavithra-addanki/",
  // },
  {
    name: "Shashwat Ghosh",
    position: "Enterpreneur @ Helix Consulting",
    institute:"",
    image: shashwatghosh,
    linkedin: "https://www.linkedin.com/in/shashwatghosh-ai-b2b-gtm-fractionalcmo/",
  },
  
  
];
export default function Mentors() {
  return (
    <div className="container" style={{ margin: "10px auto" }}>
    <h2
      style={{
        fontSize: "2rem",
        textAlign: "center",
        width: "100%",
        fontWeight: "bold",
        color: "black",
      }}
    >
      Featured Mentors
    </h2>
  
    <div className="row">
      {verticalHeads.map((head, index) => (
        <div className="col-md-3" key={index}>
          <div className="our-team">
            <Image
              src={head.image}
              height={1600}
              width={1600}
              unoptimized 
              className="img-responsive img-contain"
              alt="team member"
            />
            <div className="team-content">
              <h3 className="name">{head.name.toUpperCase()}</h3>
              <span className="post">{head.position}</span>
              <span className="post">{head.institute}</span>
              <div className="team-social">
                <a
                  href={head.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="social-icons"></FaLinkedin>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  

  );
}
