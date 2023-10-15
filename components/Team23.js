import React from "react";
import Image from "next/legacy/image";
import { GrMail } from "react-icons/gr";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import parth from "../public/team/2023-2024/parth.jpeg";
import abhirvey from "../public/team/2023-2024/Abhirvey.jpeg";
import balveer from "../public/team/2023-2024/balveer.jpeg";
import atharv from "../public/team/2023-2024/Atharv.jpg";
import Indrajeet from "../public/team/2023-2024/Indrajeet.jpg";
import mridul from "../public/team/2023-2024/Mridul.jpg";
import muskan from "../public/team/2023-2024/Muskan_Aggarwal.png";
import pranjali from "../public/team/2023-2024/Pranjali.jpg";
import rahul from "../public/team/2023-2024/rahul.jpeg";
import sahil from "../public/team/2023-2024/sahil.jpeg";
import sameer from "../public/team/2023-2024/sameer.jpg";
import sanskar from "../public/team/2023-2024/Sanskar.jpg";
import shailesh from "../public/team/2023-2024/shailesh.jpg";
import vanishka from "../public/team/2023-2024/Vanshika.jpg";
import Varun from "../public/team/2023-2024/Varun.jpg";
import om from "../public/team/2023-2024/om.png";
import rishav from "../public/team/2023-2024/rishav.jpeg";
import akshat from "../public/team/2023-2024/akshat.png";
const presidents = [
  {
    name: "PARTH GUPTA",
    image: parth,
    post: "VICE PRESIDENT E-CELL",
    email: "mailto:parthsanjeev.gupta.che20@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/parthgupta03/",
  },
  {
    name: "VANSHIKA GUPTA",
    image: vanishka,
    post: "ASSOCIATE VICE PRESIDENT E-CELL",
    email: "mailto:vanshika.gupta.met20@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/vanshikagupta13",
  },
];
const verticalHeads = [
  {
    name: "Atharv Patil",
    image: atharv,
    position: "STARTUP ASSISTANCE PROGRAM HEAD",
    email: "mailto:atharv.patil.che21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/atharv-patil/",
  },
  {
    name: "Mridul Ramakrishnan",
    image: mridul,
    position: "STARTUP ASSISTANCE PROGRAM HEAD",
    email: "mailto:mridul.ramakrishnan.mat21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/mridul-ramakrishnan-267401229/",
  },
  {
    name: "Shailesh Agarwal",
    image: shailesh,
    position: "INNOVATION & INCUBATION HEAD",
    email: "mailto:shailesh.agarwal.eee21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/mridul-ramakrishnan-267401229/",
  },
  {
    name: "ABHIRVEY IYER",
    image: abhirvey,
    position: "STRATEGIC RELATIONS HEAD",
    email: "mailto:abhirvey.rajeshiyer.phe21@iitbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/abhirveyiyer27/",
  },
  {
    name: "Varun Barve",
    image: Varun,
    position: "PUBLIC RELATION HEAD",
    email: "mailto:barvevarun.makarand.cd.mst21@iitbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/varunbarvem",
  },
  {
    name: "Rishav Thakur",
    image: rishav,
    position: "MARKETING HEAD",
    email: "mailto:rishav.thakur.cer21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/rishav-thakur-23b290199",
  },
  {
    name: "Pranjali Yadav",
    image: pranjali,
    position: "EVENTS HEAD",
    email: "mailto:pranjali.yadav.cd.mec21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/pranjali-yadav-39583022b",
  },
  {
    name: "Akshat Shah",
    image: akshat,
    position: "EVENTS HEAD",
    email: "mailto:sakshat.kalpeshbhai.mst21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/akshat-shah-639b46223",
  },
  {
    name: "Sahil Gupta",
    image: sahil,
    position: "PUBLICITY HEAD",
    email: "mailto:sahil.sgupta.cer21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/sahil-gupta-87268a23a",
  },
  {
    name: "Om Subham Pati",
    image: om,
    position: "BRANDING HEAD",
    email: "mailto:omsubham.pati.cse21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/om-subham-pati-a49785242/",
  },
  {
    name: "Muskan Aggarwal",
    image: muskan,
    position: "DESIGN HEAD",
    email: "mailto:muskan.aggarwal.min21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/muskan-aggarwal-3bba63238",
  },
  {
    name: "Indrajeet Gupta",
    image: Indrajeet,
    position: "CONTENT HEAD",
    email: "mailto:indrajeet.gupta.min21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/indrajeet-gupta-0a5b25209",
  },
  {
    name: "Balveer Singh Rao",
    image: balveer,
    position: "TECH HEAD",
    email: "mailto:balveer.singhrao.eee21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/balveer-singh-rao-636449229/",
  },
  {
    name: "Rahul Kumar Sonkar",
    image: rahul,
    position: "TECH HEAD",
    email: "mailto:rahul.kumarsonkar.eee21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/rahul-kumar-sonkar-262442253/",
  },

  {
    name: "Sameer Sharma",
    image: sameer,
    position: "HOSPITALITY HEAD",
    email: "mailto:sameer.sharma.che21@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/sameer-sharma-9720a022a",
  },
  {
    name: "Sanskar Pandey",
    image: sanskar,
    position: "PARLIAMENT REPRESENTATIVE",
    email: "mailto:sanskar.pandey.civ22@itbhu.ac.in",
    linkedin: "https://www.linkedin.com/in/sanskar-pandey-12687825b",
  },
];
export default function Team23(props) {
  return (
    <div
      className={"container"}
      style={{
        margin: "80px auto",
      }}
    >
      <div className={"row"}>
        <h2
          style={{
            fontSize: "1.4rem",
            textAlign: "center",
            width: "100%",
            fontWeight: "bold",
          }}
        >
          TEAM OF 2023-24
        </h2>
        <div className="team-container">
          {presidents.map((president, index) => {
            return (
              <div className="our-team" key={index}>
                <Image
                  src={president.image}
                  height={1600}
                  width={1600}
                  className="img-responsive img-contain"
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
                  height={1600}
                  width={1600}
                  className="img-responsive img-contain"
                  alt="team member"
                />
                <div className="team-content">
                  <h3 className="name">{head.name.toUpperCase()}</h3>
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
