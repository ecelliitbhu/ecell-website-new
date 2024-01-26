import React from "react";
import Image from "next/legacy/image";
import { GrMail } from "react-icons/gr";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import sharad from "../../../public/mentorship_pool/Sharad_seth.jpeg"
import anshu from "../../../public/mentorship_pool/Anshu.jpeg"
import saikat from "../../../public/mentorship_pool/saikat.jpeg"
import manish from "../../../public/mentorship_pool/manish.jpeg"
import amit from "../../../public/mentorship_pool/amit.jpeg"
import anshul from "../../../public/mentorship_pool/anshul.jpeg"
import ekansh from "../../../public/mentorship_pool/ekansh.jpeg"
import rajesh from "../../../public/mentorship_pool/rajesh.jpeg"
import cyril from "../../../public/mentorship_pool/cyril.jpeg"
import kaustubh from "../../../public/mentorship_pool/kaustubh.jpeg"
import ankit from "../../../public/mentorship_pool/ankit.jpeg"
import sunil from "../../../public/mentorship_pool/sunil.jpeg"
import vinaytosh from "../../../public/mentorship_pool/vinaytosh.jpeg"
import rishi from "../../../public/mentorship_pool/rishi.jpeg"
import nitin from "../../../public/mentorship_pool/nitin.jpg"
import binod from "../../../public/mentorship_pool/BINOD.jpg"

const verticalHeads = [
  {
    name: "Sharad Seth",
    position: "Fractional CPO/CTO at multiple startups",
    institute:"IIT-BHU, IIM-B Graduate",
    image: sharad,
    linkedin: "https://www.linkedin.com/in/sharadseth/",
  },
  {
    name: "Anshu Srivastav",
    position: "Investor-VC Funds and Charter Member at TiE Pune",
    institute:"IIT-BHU Graduate",
    image: anshu,
    linkedin: "https://www.linkedin.com/in/anshus/",
  },
  {
    name: "Saikat Sinha",
    position: "APAC- Social and Digital Lead (APAC) at Lenovo",
    institute:"NIT-Rourkela, IIM-L Graduate",
    image: saikat,
    linkedin: "https://www.linkedin.com/in/saikatsinha2/",
  },
  {
    name: "Manish Jindal",
    position: "Co-Founder and COO at Bytescare",
    institute:"IIT-BHU Graduate",
    image: manish,
    linkedin: "https://linkedin.com/in/manishjindal13/",
  },
  {
    name: "Amit K",
    position: "Co-Founder and COO at iHeal HealthTech",
    institute:"IIT-BHU Graduate",
    image: amit,
    linkedin: "https://linkedin.com/in/amit-medsamaan-medtech",
  },
  {
    name: "Anshul Agrawal",
    position: "Co-Founder at Habuild",
    institute:"IIT-BHU, IIM-C Graduate",
    image: anshul,
    linkedin: "https://linkedin.com/in/anshul-agrawal-8001b031",
  },
  {
    name: "Ekansh Srivastva",
    position: "Product Lead at Arya.ag, ex-Product Lead at Spinny",
    institute:"IIT-BHU Graduate",
    image: ekansh,
    linkedin: "https://www.linkedin.com/in/ekansh77/",
  },
  {
    name: "Rajesh Gupta",
    position: "Co-Founder at Stealth, ex-SWE at Hewlett Packard",
    institute:"IIT-BHU Graduate",
    image: rajesh,
    linkedin: "https://www.linkedin.com/in/rajeshgupta1482/",
  },
  {
    name: "Cyril Thomas",
    position: "CEO at Workcrew, ex-Project Manager at AT&T and ex-HR Lead at Flipkart",
    institute:"XLRI Jamshedpur Graduate",
    image: cyril,
    linkedin: "https://www.linkedin.com/in/cyril-thomas-1402/",
  },
  {
    name: "Kaustubh Patekar",
    position: "Founder at ProdZen, DeepTech Club Core member at Nasscom",
    institute:"IIT-B, MIT, and Stanford Graduate",
    image: kaustubh,
    linkedin: "https://www.linkedin.com/in/kaustubh-patekar/",
  },
  {
    name: "Ankit Bachchan",
    position: "Creative Director, Growth at Jai Kisan, ex-Brand Manager at TVF",
    institute:"",
    image: ankit,
    linkedin: "https://www.linkedin.com/in/ankitrajbachchan/",
  },
  {
    name: "Sunil Londhe",
    position: "General Manager-Crop Scientist",
    institute:"",
    image: sunil,
    linkedin: "https://linkedin.com/in/sunil-londhe",
  },
  {
    name: "Vinaytosh",
    position: "Director at Thumbay Institue for AI in HealthCare at Gulf Medical University",
    institute:"IIT-BHU Graduate",
    image: vinaytosh,
    linkedin: "https://www.linkedin.com/in/vinaytosh/",
  },
  {
    name: "Rishi Agrawal",
    position: "Co-Founder and CEO at TeamLease RegTech, ex-VP at BNY Mellon",
    institute:"IIT-BHU, IIM-C Graduate",
    image: rishi,
    linkedin: "https://www.linkedin.com/in/agrawal-rishi/",
  },
  {
    name: "Binod Kumar",
    position: "Founder & CEO At TrueFirms™",
    institute:"",
    image: binod,
    linkedin: "https://www.linkedin.com/in/kumar-binod/",
  },
  {
    name: "Nitin",
    position: "Core Team, Director- Business and Growth at Falcon, ex-Razorpay and PayU",
    institute:"IIM-B Graduate",
    image: nitin,
    linkedin: "https://www.linkedin.com/in/nitinsharmavats/",
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
