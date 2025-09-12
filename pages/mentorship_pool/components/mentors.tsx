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


const tanay    = "https://ik.imagekit.io/tc4boofhd/ecell/IMG-20250728-WA0000.jpg_id=vL4xqD&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InZMNHhxRCIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NDY4MDI5MX0.eZf0ela1qSJM_-GXVU60dV4zoj3_3tcUwtvTPgQBnk4&signature=06247d2a06befaac7b6f2687230053c55764cceef2f8c0c36c296f50ffeac5b9?updatedAt=1757693667773";
const ashok     = "https://ik.imagekit.io/tc4boofhd/ecell/3a4936ae-9fea-4389-8db5-4d823ac49ed6.jpeg_id=GDoLN2&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkdEb0xOMiIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NDg0NDQ4M30.ZNkewdes9wFgdWVsczSxVl9ssqGwOsGDHXzIK0a9-Qg&signature=fb258badcec361fe48f9c7cdb80a4439b37cd3c08fc6dbdea03805f653a0727f?updatedAt=1757694647931";
const prashant    = "https://ik.imagekit.io/tc4boofhd/ecell/Photo-in-Frames.jpg_id=JD8Blr&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkpEOEJsciIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NDkwNDYyNn0.xeVqMZf7St4Y3nBT0xXjrXxDUv5bed1cVJpqzODfRdA&signature=7282f93f48ca0da49991c65522dbfbcbd6b68ee80fb2fd8bf47ebf2b1c6e9a4e?updatedAt=1757694759651";
const prithwijit    = "https://ik.imagekit.io/tc4boofhd/ecell/IMG_0658.JPG_id=JDWPer&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkpEV1BlciIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NTAyOTk1OX0.p6KsHu8CUnpekeefUgMXiizU1JBfm30e6r1HzMRqDps&signature=361a870a91d9049c094eae5099c9488ba23cbee74f3535454cf1283b96b14194?updatedAt=1757694921041";
const ashish      = "https://ik.imagekit.io/tc4boofhd/ecell/ashish_headshot.JPG_id=4vzBrd&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjR2ekJyZCIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NTA0MjMwMH0.meNgussqzvlZHGfPOgmEv6DrTMeQfwsNTrRQFR29vEQ&signature=48db7bea772999a6a29380d4fbdbd4affe9db3103ed5a9c4af215cf12f2d8176?updatedAt=1757695037421";
const binod    = "https://ik.imagekit.io/tc4boofhd/ecell/binod-photo.jpeg_id=ZYQ7le&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlpZUTdsZSIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NTE3OTAzM30.Go1481B-D9T5qfJ3T7plkk59vL-97Uz0a377TDr-6vw&signature=02f95ba51447682f229034af3157b8672a2358be8d4c784156c45bf4fc1564b9?updatedAt=1757695628707";
const nitin    = "https://ik.imagekit.io/tc4boofhd/ecell/PROFILE-PIC-.jpeg_id=NYOKzW&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik5ZT0t6VyIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NTE4Mjc5NH0.lg8-YjVRgYWG4f1OcMogwOi5SbB6IRxC131Sy5CaCxA&signature=225fb5ec0f94ec15c52b2fbd4b4569020b91473b513c1e2cab91d6c29bcdd7f5?updatedAt=1757697697310";
const anubhav    = "https://ik.imagekit.io/tc4boofhd/ecell/IMG_6748.jpeg_id=RY6DWK&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlJZNkRXSyIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NTUxMjc0NX0.01IM3FkdTUnWU1-kFy2T9d4KboLbWi6WrnBYzs36OvY&signature=68e41272b98340ad682ea314c400938a36e12bd575a6e1deb09f4ccb215d7e5e?updatedAt=1757697869179";
const sanjay     = "https://ik.imagekit.io/tc4boofhd/ecell/IMG-20250126-WA0190.jpg_id=0vW70Z&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB2VzcwWiIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NTgzNzgxNX0.58JxreWILBldt2my8Sf8EI_8ukrrUzy6cYL82cu8sck&signature=20171d6bc67e160261d2732a7606c48576ebc54d117b086de0552edd4f801e49?updatedAt=1757697955927";
const vinaytosh  = "https://ik.imagekit.io/tc4boofhd/ecell/vinaytosh_mishra.jpg_id=ZYx0Pv&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlpZeDBQdiIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NjEyMDI1Nn0.RVzfuLhhIvcKGSltyUaB3aF8QJjQ9IeI8aGarR4qatw&signature=9c50edd09f192c8d52bbc7fbadb62d813139bc352942adb792e336e34b657614?updatedAt=1757698046340";
const sharad     = "https://ik.imagekit.io/tc4boofhd/ecell/image_2.jpg_id=djBPPD&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRqQlBQRCIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NjE5MTYyMn0.YBMdOMDeES4c_pizIU7J4Cs8kBmXsGYRBMJQg8lxF5w&signature=0b2ae852030de6d630c9d46b42e64afe495882f7508e43d5a14f3e3dc1994a16?updatedAt=1757698142332";
const bhashwanth     = "https://ik.imagekit.io/tc4boofhd/ecell/Screen-Shot-2025-01-29-at-3.33.54-PM.png_id=xPjYXJ&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InhQallYSiIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NjYyMDQ5M30.3S5P2yW0ELT0mFM9vxl5sF7DXSeQLzaXB7BWbBq_yXI&signature=18428a8771a078f17c9ea84edaa4cbcd79e7f685fe05bab066a7c00314e68dbf?updatedAt=1757698222658";
const anjali = "https://ik.imagekit.io/tc4boofhd/ecell/18.jpg_id=zrZ4j1&accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InpyWjRqMSIsImZvcm1JZCI6IndhcHoxcSIsImlhdCI6MTc1NzI3MDQ5MH0.Z8qCLtMfA2euEMSRsaS6pwPhNc0yJEJcDnZP-dC0JgE&signature=3d10e4e629b56826ee766b165eac3e5f3d0d9bccfb9beabfb9f9fbc94429c6d6?updatedAt=1757698338165";



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
