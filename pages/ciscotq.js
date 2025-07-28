import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import Image from "next/image";
// import questionmark from "../public/question.png";
// import img1 from "../public/ciscotqimg.png";
// import thingqbator from "../public/thingqbator.png"
import IncubatorPage from "../pages/IncubatorPage";
// import i3image from "../public/i3.png";

const questionmark = "https://ik.imagekit.io/ecelliitbhu/website/question.png";
const img1 = "https://ik.imagekit.io/ecelliitbhu/website/ciscotqimg.png";
const thingqbator = "https://ik.imagekit.io/ecelliitbhu/website/thingqbator.png";
const i3image = "https://ik.imagekit.io/ecelliitbhu/website/i3.png";

const ciscotq = () => {
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
  const programs = [
    {
      title: "Hackathons",
      description: "Hackathons are 24-hr programs (single sprint) in which students and budding entrepreneurs are given a chance to build software/hardware to showcase their competency on a problem statement. Till now, 5 Hackathons have been successfully organized and the winners were awarded.",
      
    },
    {
      title: "Workshops and Webinars",
      description: "Workshops on AI, IoT, ML, Blockchain, and other future technologies are conducted from time to time. Webinars are conducted by IIT-BHU Alums, Technopreneurs, Senior executives of MNCs, and Venture capitalists on various technical and business-related sessions.",
    },
    {
      title: "ThingQbator Internship Programs",
      description: "It is a virtual creative learning program where university students engage in problem-solving and building solutions. The Design Thinking Process is applied, and the program is broken into three tracks, based on various stages at which students’ projects are - Learning Track, Project Track, and Startup Track.",
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
  return (
    <>
   
      <Head>
        <title>Cisco ThingQbator</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`font-family:'Poppins',sans-serif;`}</style>
      </Head>
      
      
      <IncubatorPage
        title="Cisco"
        highlightedTitle=" ThingQbator"
        description="The name “thingQbator” is a combination of ‘Internet of Things’ and ‘Incubator’. It is a part of the CSR initiative of CISCO systems in partnership with NASSCOM Foundation. It is an AI/IOT based makerspace program."
        logoSrc={thingqbator}
        questionMarkSrc={questionmark}
        mainImage={img1}
        buttonText="Click Here for More Info"
        buttonLink="https://thingqbator.nasscomfoundation.org/"
        description2="Since May 2018, as a part of a CSR initiative, Cisco Systems along with NASSCOM Foundation has established a Cisco thingQbator at IIT (BHU) Varanasi. This AI and IoT-based makerspace program help to accelerate innovation and entrepreneurship among the student community."
        facilities={facilities}
        programs={programs}
        title2="What is"  
        currentData={currentData}
      />
           
     
    
    </>
  );
};

export default ciscotq;
