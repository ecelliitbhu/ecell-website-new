import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import Image from "next/legacy/image";
// import and add jic logo and questionmark and img1
// from image kit website 
import IncubatorPage from "./IncubatorPage";

const nclLogo = "";
const questionmark = "https://ik.imagekit.io/ecelliitbhu/website/question.png";
const img1 = "https://ik.imagekit.io/ecelliitbhu/website/rabi.png";

const JIC = () => {
    // write the titles and the description of the programs by JIC here 
  const programs = [
    {
      title: "MentorShip Sessions",
      description: ``,
    },
    {
      title: "Infrastructure and Networking Opportunities",
      description: ``,
    },
    {
      title : "Funding and Support for Women Entrepreneurs",
      description : ""
    }
  ];

  const facilities = [];
  const currentData=[];
  const selectionProcess = []

  return (
    <>
      <Head>
        <title></title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`font-family:'Poppins',sans-serif;`}</style>
      </Head>
     
      <IncubatorPage
        title="JIC - IIT (BHU) Varanasi" 
        highlightedTitle=""
        description="Collaboration between IIT (BHU) Varanasi and Union Bank of India to promote entrepreneurship and innovation, Supported by the I-3 Foundation"
       
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
        description2="Faculty and students are regularly invited to submit their startup ideas through a Google Form, across all disciplines, whether they are in technology, healthcare, sustainability, AI/ML, or any other domain with the potential to create an impact.
The ideas are assessed on different criteria, and the selected proposals receive guidance from industry experts and access to incubation resources to bring their ideas to fruition.
"
      />
     
    </>
  );
};

export default JIC;
