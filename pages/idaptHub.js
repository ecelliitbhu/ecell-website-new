// pages/Ciscotq.js
import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import Image from "next/legacy/image";
import thingqbator from "../public/thingqbator.png";
import questionmark from "../public/question.png";
import img1 from "../public/idapt.png";
import img2 from "../public/person.png";
import IncubatorPage from "./IncubatorPage"
import idaptLogo from "../public/idaptLogo.gif";
const idapthub = () => {
  
  const facilities = [
    {
      title:"Makerspace Network",
      image:"/markerspace.jpg",
  
    },
    {
      title:"Cisco Sparkboard",
      image:"/ciscospark.png",
    },
    {
      title:"Sensors & Actuators Components",
      image:"/sensor.jpg",
    },
    {
      title:"Webex Teams",
      image:"/webex.jpg",
    },
    ];
  const currentData=[
    {
      title:"3815",
      description:"IDEAS",
      link:"https://thingqbator.nasscomfoundation.org/",
    },
    {
      title:"692",
      description:"PROJECTS",
      link:"https://thingqbator.nasscomfoundation.org/",
    },
    {
      title:"369",
      description:"PROTOTYPES",
      link:"https://thingqbator.nasscomfoundation.org/",
    },
    {
      title:"58",
      description:"STARTUPS",
      link:"https://thingqbator.nasscomfoundation.org/",
    },
    ];
  const preIncubationPrograms = [
    {
      title: "Pre Incubation Program",
      description: `For final year undergraduate students / postgraduate students / PhD student / postdoctoral fellow / faculty.
The program will be offered for 2 months during summer vacation. The pre-incubation teams will be supported with a stipend of INR 8000 per month and they will be entitled to use all common facilities of the TIH.`,
    },
    {
      title: "Selection Criteria",
      description: "Teams can choose from a list of product ideas on the website or come up with an original DAPT idea enabling social impact.",
    },
  ];

  const incubationPrograms = [
    {
      title: "Early Stage Incubation",
      description: `Teams can choose from a list of product ideas on the website or come up with an original DAPT idea enabling social impact.
Should additionally have Market Survey and Commercialization Feasibility.
Financial support upto 10 lakhs`,
    },
    {
      title: "Expansion Stage Incubation",
      description: `If the progress of the early-stage incubation team is Very Good, they qualify for this.
10 lakh support for additional 2 years
Help in further fund raising`,
    },
  ];
  return (
    <>
      <Head>
        <title>I-DAPT   </title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style>
          {`font-family:'Poppins',sans-serif;`}
        </style>
      </Head>
    
      <IncubatorPage
        title="I-"
        highlightedTitle="DAPT"
        description="It is a nodal center and Technology Innovation Hub (TIH) for activities in “Data Analytics and Predictive Technologies” under National Mission on Interdisciplinary Cyber Physical Systems (NMICPS).IDAPT also offers the CHANAKYA, with 10000 per month fellowship for selected B.Tech/IDD students and 12400 per month fellowship for selected IDD 5th year/M.Tech students. Other initiatives include IDAPT Hub Pitch Challenge(2022), health-tech hackathon(2022), UDAAN(1.0) (2023)"
      
        questionMarkSrc={questionmark}
        mainImage={img1}
        buttonText="Click Here for More Info"
        buttonLink="https://www.idapthub.org/"
        title2="Areas Of Focus Of  I-"
        idaptLogo={idaptLogo}
        preIncubationPrograms={preIncubationPrograms}
        incubationPrograms={incubationPrograms}
        facilities={facilities}
        currentData={currentData}
        description2="· Telecommunications
      
· Power
· Road transport and Highways
· Defense R&D
· Health & Family Welfare"
      />
    
    </>
  );
};

export default idapthub;
