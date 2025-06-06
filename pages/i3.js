import React from "react";
import Head from "next/head";
import Image from "next/legacy/image";
import img1 from "../public/i3SideImg.png";
import IncubatorPage from "../pages/IncubatorPage";
import i3image from "../public/i3.png";
import i3logo from "../public/i3logo.webp"


const i3 = () => {
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
    const services = [
      "Technical Due-Diligence",
      "Training Programs",
      "Mentoring",
      "Legal Advice",
      "Ip Creation And Projection",
      "Funding Support",
      "Networking Support",
    ];
    const currentDatai3=[
      {
        title:"130",
        description:"Trained Start-ups",
        link:"https://i3f-iitbhu.org/",
      },
      {
        title:"53",
        description:"Incubated Start-ups",
        link:"https://i3f-iitbhu.org/",
      },
      {
        title:"230 Lakhs",
        description:"Fund Supported",
        link:"https://i3f-iitbhu.org/",
      },
      {
        title:"19",
        description:"Presentable Technologies",
        link:"https://i3f-iitbhu.org/",
      },
      ];
  return (
    <>
   
    <Head >
        <title>I3F [Ideation, Innovation and Incubation Foundation]</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`font-family:'Poppins',sans-serif;`}</style>
      </Head>
    
      
        <IncubatorPage
          title="I3F"
          highlightedTitle="Ideation, Innovation, and Incubation Foundation"
          description="The I3F is monitored by a managing committee of 7 members comprising of Director, I3F Coordinator, and faculty. The committee consists of Prof PK Jain, Prof Rajnesh Tyagi(Coordinator), Prof RS Singh, Dr Shishir Gaur, Dr Shyam Kamal, and Dr Prasenjit Chanek. Some of the objectives of the I3F include fostering an entrepreneurial culture among students, encouraging tech transfer and commercialization, and forging linkages between business and academia."
          mainImage={img1}
          buttonText="Click Here for More Info"
          buttonLink="https://i3f-iitbhu.org/"
          description2="Ideation, Innovation and Incubation Foundation (I-3F), earlier known as Technology Innovation and Incubation Center (TIIC), is an umbrella organization at IIT (BHU) Varanasi for fostering an entrepreneurial ecosystem and nurturing startups in the East UP region. It administers various units that provide ‘Start to Scale’ support for entrepreneurship and facilitates research activities to convert into commercial ventures."
          facilities={facilities}
          title2="What is"
          i3Image={i3image}
          services={services}
          i3Logo={i3logo}
          currentDatai3={currentDatai3}
        />

        

       
     
    </>
  );
}; 

export default i3;
