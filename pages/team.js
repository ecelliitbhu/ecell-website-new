import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import Image from "next/image";
// import prof from "../public/rajnesh_tyagi.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary } from "@mui/material";
import TeamLayout from "@/components/TeamLayout";
import { team2021 } from "@/staticdata/TeamsData/Team2021";
import { team2022 } from "@/staticdata/TeamsData/Team2022";
import { team2023 } from "@/staticdata/TeamsData/Team2023";
import { team2024 } from "@/staticdata/TeamsData/Team2024";
import Link from 'next/link';
import { orange } from "@mui/material/colors";

const prof = "https://ik.imagekit.io/ecelliitbhu/website/rajnesh_tyagi.png?tr=w-300,h-360";

const Team = () => {
  return (
    <>
      <Head>
        <title>Team</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico" />
      </Head>
      <Nav />
      <div
        className="container"
        style={{
          margin: "80px auto",
        }}
      >
        <div className="row">
          <h1
            style={{
              margin: "auto",
              textAlign: "center",
              fontSize: "4rem",
              fontWeight: "bold",
            }}
          >
            The Team
          </h1>
          <h2
            style={{
              fontSize: "1.5rem",
              color: "black",
              textAlign: "center",
            }}
          >
            GET TO KNOW THE TEAM OF E-CELL
          </h2>
        </div>
        <div>
          <h2
            style={{
              fontSize: "2rem",
              color: "black",
              textAlign: "center",
              fontWeight: "bold",
              margin: "90px auto 30px auto",
            }}
          >
            UNDER THE GUIDANCE OF
          </h2>
          <div className="our-team" style={{ margin: "auto" }}>
            <Image src={prof}  width={300} height={360} className="img-responsive" alt="team member" unoptimized/>
            <div className="team-content">
              <h3 className="name">PROF. RAJNESH TYAGI</h3>
              <span className="post">PROF. INCHARGE, E-CELL</span>
            </div>
          </div>
        </div>

        <div className="row">
          <h2
            style={{
              fontSize: "2rem",
              color: "black",
              textAlign: "center",
              fontWeight: "bold",
              margin: "90px auto 30px auto",
            }}
          >
            CORE TEAM MEMBERS
          </h2>
          <TeamLayout teamData={team2024}/>
          
          <div className="sm:flex justify-center">
        <div className="m-4">
          <Link href="/team2023-24">
              <h2
                style={{
                  fontSize: "1.5rem",
                  textAlign: "center",
                  width: "100%",
                  backgroundColor: "#fa8231",  
                  color: "white",  
                  padding: "0.6rem",  
                  borderRadius: "0.6rem" 
                }}
              >
                TEAM OF {team2023.session}
              </h2>
              
            
          </Link>
          </div>


          <div className="m-4">
          <Link href="/team2022-23">
          
              <h2
                style={{
                  fontSize: "1.5rem",
                  textAlign: "center",
                  width: "100%",
                  backgroundColor: "#fa8231",  
                  color: "white",  
                  padding: "0.6rem",  
                  borderRadius: "0.6rem"  
                }}
              >
                TEAM OF {team2022.session}
              </h2>
           
          </Link>
          </div>

          <div className="m-4">
           <Link href="/team2021-22">
          
            
              <h2
                style={{
                  fontSize: "1.5rem",
                  textAlign: "center",
                  width: "100%",
                  backgroundColor: "#fa8231",  
                  color: "white",  
                  padding: "0.6rem",  
                  borderRadius: "0.6rem"  
                }}
              >
                TEAM OF {team2021.session}
              </h2>
            
          </Link>
          </div>
          </div>
         
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Team;
