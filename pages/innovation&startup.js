// pages/Ciscotq.js
import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import Image from "next/legacy/image";
// import thingqbator from "../public/thingqbator.png";
// import questionmark from "../public/question.png";
// import img1 from "../public/ciscotqimg.png";
// import img2 from "../public/person.png";
import IncubatorPage from "../pages/IncubatorPage"
const thingQbator = "https://ik.imagekit.io/ecelliitbhu/website/thingqbator.png";
const questionmark = "https://ik.imagekit.io/ecelliitbhu/website/question.png";
const img1 = "https://ik.imagekit.io/ecelliitbhu/website/ciscotqimg.png";
const img2 = "https://ik.imagekit.io/ecelliitbhu/website/person.png";

const Ciscotq = () => {
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

  const facilities = [
    "Makerspace Network",
    "Cisco Sparkboard",
    "Sensors & Actuators Components",
    "Webex Teams",
  ];

  return (
    <>
      <Head>
        <title>Cisco ThingQbator</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style>
          {`font-family:'Poppins',sans-serif;`}
        </style>
      </Head>
      <Nav />
      <IncubatorPage
        title="Cisco"
        highlightedTitle="ThingQbator"
        description="The name “thingQbator” is a combination of ‘Internet of Things’ and ‘Incubator’. thingQbator was started as an internal incubator of IoT ideas coming from Cisco’s engineer community. With the central belief that none of us is smarter than all of us, the aim was to create makerspaces where IoT enthusiasts could learn more about digital technologies in a hands-on environment and turn their ideas into working prototypes."
        logoSrc={thingqbator}
        questionMarkSrc={questionmark}
        mainImage={img1}
        buttonText="Click Here for More Info"
        buttonLink="https://thingqbator.nasscomfoundation.org/"
        programs={programs}
        facilities={facilities}
      />
      <Footer />
    </>
  );
};

export default Ciscotq;
