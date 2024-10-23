// pages/Ciscotq.js
import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import Image from "next/legacy/image";
import thingqbator from "../public/thingqbator.png";
import questionmark from "../public/question.png";
import img1 from "../public/ncl.png";
import img2 from "../public/person.png";
import IncubatorPage from "../pages/IncubatorPage"

const ncl = () => {

  const facilities = [
    "Makerspace Network",
    "Cisco Sparkboard",
    "Sensors & Actuators Components",
    "Webex Teams",
  ];
  const selectionCriteria = [
    {
      title: "Application",
      description: `Presentation of the basic business pian to the selection committee after filling the application form.`
    },
    {
      title: "Evaluation Parameters",
      description: `Post concept phase
innovation-based business model
early stages of development  with high-growth potential
Provides economic benefits to the Society
Illustrated ability for paying incubator rents while they develop positive cash flow
At least 1 project member fully committed and involved in the project
Business has legal freedom to operate`
    },
    {
      title: "Signing of MoU ",
      description: `It is a formal step to outline the terms of collaboration between the incubator and a startup or another entity. 
This document typically sets the groundwork for how the incubator will support the startup in terms of resources, mentorship, infrastructure, or investment, and what the startup is expected to deliver or adhere to in return.`
    }, 
  ]; 
  return (
    <>
      <Head>
        <title>NCL-IIT (BHU) INCUBATION CENTRE (NIIC)</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style>
          {`font-family:'Poppins',sans-serif;`}
        </style>
      </Head>
      <Nav />
      <IncubatorPage
        title="NCL-IIT (BHU) INCUBATION CENTRE "
        highlightedTitle="(NIIC)"
        description="Its core strengths include Technology Commercialization in the sector of Agricultural, Agri-Business, Cleantech, Food Safety & Testing, Information Technology & E-Commerce, Bio-Technology & Health Sector.
It provides services like Mentoring, Counselling, Training, Financial Linkages, Seed Funding, Lab Facility, Office Facility, Networking support, etc."
        description2="It is a joint collaboration of Indian Institute of Technology (Banaras Hindu University) and Northern Coalfields Limited. NCL — IIT (BHU) Incubation Centre, it also provides start to scale support for tech based startups."
        questionMarkSrc={questionmark}
        mainImage={img1}
        buttonText="Click Here for More Info"
        buttonLink="https://thingqbator.nasscomfoundation.org/"
        facilities={facilities}
        selectionCriteria={selectionCriteria}
        title2="What Is "
      />
      <Footer />
    </>
  );
};

export default ncl;
