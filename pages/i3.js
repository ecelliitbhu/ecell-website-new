import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import Image from "next/legacy/image";
import questionmark from "../public/question.png";
import img1 from "../public/i3SideImg.png";
import IncubatorPage from "../pages/IncubatorPage";
import i3image from "../public/i3.png";
const i3 = () => {
  const facilities = [
    "Makerspace Network",
    "Cisco Sparkboard",
    "Sensors & Actuators Components",
    "Webex Teams",
  ];

  return (
    <>
      <Head>
        <title>I3F [Ideation, Innovation and Incubation Foundation]</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`font-family:'Poppins',sans-serif;`}</style>
      </Head>
      <Nav />
      
      <IncubatorPage
        title="I3F"
        highlightedTitle="Ideation, Innovation, and Incubation Foundation"
        description="The I3F is monitored by a managing committee of 7 members comprising of Director, I3F Coordinator and faculty. The committee consists of Prof PK Jain, Prof Rajnesh Tyagi(Coordinator), Prof RS Singh, Dr Shishir Gaur, Dr Shyam Kamal and Dr Prasenjit Chanek. Some of the objectives of the I3F include to foster entrepreneurship culture among students, to encourage tech transfer and commercialization, to forge linkage between business and academia."
       
        questionMarkSrc={questionmark}
        mainImage={img1}
        buttonText="Click Here for More Info"
        buttonLink="https://i3f-iitbhu.org/"
        description2="Ideation, Innovation and Incubation Foundation (I-3F), earlier known as Technology Innovation and Incubation Center (TIIC), is an umbrella organization at IIT (BHU) Varanasi for fostering an entrepreneurial ecosystem and nurturing startups in the East UP region. It administers various units which provide ‘Start to Scale’ support for entrepreneurship and facilitates research activities to convert into commercial ventures."
        facilities={facilities}
        title2="What is"  // Only facilities are passed, no programs
      />
             {  <div className="flex justify-center mt-10 mb-10">
          <div className=" flex items-center justify-center">
            <Image src={i3image} alt="I3 Foundation" width={550} height={500}  />
          </div>
        </div>} 

      <Footer />
    </>
  );
};

export default i3;
