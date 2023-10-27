import { Accordion, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";
import Image from "next/legacy/image";
import { GrMail } from "react-icons/gr";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import Amit from "../public/team/2022-2023/Amit.jpg";
import Tanaya from "../public/team/2022-2023/Tanaya.jpg";
import Tanya from "../public/team/2022-2023/Tanya.jpeg";
import Parth from "../public/team/2022-2023/Parth.jpg";
import Ashwat from "../public/team/2022-2023/Ashwat.jpg";
import Divyansh from "../public/team/2022-2023/Divyansh.jpg";
import Shreya from "../public/team/2022-2023/Shreya.jpg";
import Vanshika from "../public/team/2022-2023/Vanshika.jpg";
const presidents = [
  {
    name: "AMIT KUMAR BAHETI",
    image: Amit,
    post: "VICE PRESIDENT E-CELL",
    email:
      "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=amit.krbaheti.eee19@iitbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/amitkumarbaheti/",
    twitter: "https://twitter.com/amit_baheti_",
  },
  {
    name: "TANAYA MUJUMDAR",
    image: Tanaya,
    post: "ASSOCIATE VICE PRESIDENT E-CELL",
    email: "mailto:mujumdartanaya@gmail.com",
    linkedin: "https://www.linkedin.com/in/tanaya-mujumdar-80aa17207",
    twitter: "https://twitter.com/TanayaMujumdar",
  },
];
const verticalHeads = [
  {
    name: "TANYA GUPTA",
    image: Tanya,
    position: "BRANDING HEAD",
    email: "mailto:tanya.gupta.che20@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/tanya-gupta-215942214",
    twitter:
      "https://twitter.com/TanyaGu27136914?t=pBdV1Hb-cSR19h2Zcqr9Yg&s=08",
  },
  {
    name: "PARTH GUPTA",
    image: Parth,
    position: "SAP HEAD",
    email: "mailto:parthsanjeev.gupta.che20@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/parthgupta03/",
    twitter: "https://twitter.com/ParthG03",
  },
  {
    name: "ASHWAT KUMAR SINGH",
    image: Ashwat,
    position: "TECH HEAD",
    email: "mailto:ashwat.kumarsingh.met20@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/ashwat-singh/",
    twitter: "https://twitter.com/ashwat_singh",
  },
  {
    name: "SHREYA JAIN",
    image: Shreya,
    position: "EVENTS HEAD",
    email: "mailto:shreya.jain.cd.eee20@iitbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/shreya-jain-/",
    twitter: "https://twitter.com/shreyaj90",
  },
  {
    name: "VANSHIKA GUPTA",
    image: Vanshika,
    position: "STRATEGIC RELATIONS HEAD",
    email: "mailto:vanshika.gupta.met20@iitbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/vanshika-gupta-299001201",
    twitter: "https://twitter.com/vanshika130502",
  },
  {
    name: "DIVYANSH THAKRE",
    image: Divyansh,
    position: "INNOVATION & INCUBATION HEAD",
    email: "mailto:divyansh.thakre.civ20@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/divyanshthakre/",
    twitter: "https://twitter.com/Divyansh_03",
  },
];
export default function Team22(props) {
  return (
    <div
      className={"container"}
      style={{
        margin: "80px auto",
      }}
    >
      <div className={"row"}>
        <Accordion className="past-team">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h2
              style={{
                fontSize: "1.4rem",
                textAlign: "center",
                width: "100%",
                fontWeight: "bold",
              }}
            >
              TEAM OF 2022-23
            </h2>
          </AccordionSummary>
          <div className="team-container">
            {presidents.map((president, index) => {
              return (
                <div className="our-team" key={index}>
                  <Image
                    src={president.image}
                    className="img-responsive"
                    alt="team member"
                  />
                  <div className="team-content">
                    <h3 className="name">{president.name}</h3>
                    <span className="post">{president.post}</span>
                    <div className="team-social">
                      <a
                        href={president.email}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GrMail className="social-icons"></GrMail>
                      </a>
                      <a
                        href={president.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="social-icons"></FaLinkedin>
                      </a>
                      <a
                        href={president.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter className="social-icons"></FaTwitter>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="team-container-1">
            {verticalHeads.map((head, index) => {
              return (
                <div className="our-team" key={index}>
                  <Image
                    src={head.image}
                    className="img-responsive"
                    alt="team member"
                  />
                  <div className="team-content">
                    <h3 className="name">{head.name}</h3>
                    <span className="post">{head.position}</span>
                    <div className="team-social">
                      <a
                        href={head.email}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GrMail className="social-icons"></GrMail>
                      </a>
                      <a
                        href={head.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="social-icons"></FaLinkedin>
                      </a>
                      <a
                        href={head.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter className="social-icons"></FaTwitter>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Accordion>
      </div>
    </div>
  );
}
