import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import Image from "next/legacy/image";
// import nclLogo from "../public/nclLogo.png"
// import questionmark from "../public/question.png";
// import img1 from "../public/rabi.png";
import IncubatorPage from "./IncubatorPage";

const nclLogo = "https://ik.imagekit.io/ecelliitbhu/website/nclLogo.png";
const questionmark = "https://ik.imagekit.io/ecelliitbhu/website/question.png";
const img1 = "https://ik.imagekit.io/ecelliitbhu/website/rabi.png";

const JIC = () => {
  const programs = [
    {
      title: "Start-up Insights",
      description: `Lab to Market Innovation Workshop in Collaboration with I-3F and GDC`,
    },
    {
      title: "Techtalk on Agritech & Agrifintech for Bharat, in collaboration with R-ABI",
      description: ``,
    },
    {
      title : "Certification Course on Investments in collaboration with NSE Academy",
      description : ""
    }
  ];

  const facilities = [
  {
    title:"Makerspace Network",
    image:"https://ik.imagekit.io/ecelliitbhu/website/markerspace.jpg",

  },
  {
    title:"Cisco Sparkboard",
    image:"https://ik.imagekit.io/ecelliitbhu/website/ciscospark.png",
  },
  {
    title:"Sensors & Actuators Components",
    image:"https://ik.imagekit.io/ecelliitbhu/website/sensor.jpg",
  },
  {
    title:"Webex Teams",
    image:"https://ik.imagekit.io/ecelliitbhu/website/webex.jpg",
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
  const selectionProcess = [
    {
      title: "RIC-1",
      description:
        "The cohort is launched. Applications are screened and called to pitch idea to the RIC",
    },
    {
      title: "RIC-2",
      description:
        "Startups show progress of the idea to the RIC after completion of 2 months local residency and AOP (this year 13 startups were shortlisted for CIC)",
    },
    {
      title: "CIC",
      description:
        "Committee reviews progress and based on that recommends grant in aid amount to funding agency (RKVY). (Out of 13, 9 startups selected this year)",
    },
  ];

  return (
    <>
      <Head>
        <title>RKVY-RAFTAAR Agri Business Incubator (R-ABI)</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`font-family:'Poppins',sans-serif;`}</style>
      </Head>
     
      <IncubatorPage
        title="RKVY-RAFTAAR Agri Business Incubator" 
        highlightedTitle="(R-ABI)"
        description="R-ABl is a scheme funded by Ministry of Agriculture and Farmers’ Welfare (MoA & FW). It aims at strengthening the infrastructure in agriculture and allied areas in order to promote agripreneurship and agri business by providing financial support"
       
        questionMarkSrc={questionmark}
        mainImage={img1}
        buttonText="Click Here for More Info"
        buttonLink="https://thingqbator.nasscomfoundation.org/"
        programs={programs}
        selectionProcess={selectionProcess} 
        facilities={facilities}
        title2="What Does"
        title3="Do"
        nclLogo={nclLogo}
        currentData={currentData}
        description2="Since May 2018, as a part of a CSR initiative, Cisco Systems along with NASSCOM Foundation has established a Cisco thingQbator at IIT (BHU) Varanasi. This AI and IoT-based makerspace program help to accelerate innovation and entrepreneurship among the student community."
      />
     
    </>
  );
};

export default JIC;
