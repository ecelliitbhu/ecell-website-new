import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import Image from "next/legacy/image";
import prof from "../public/rajnesh_tyagi.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary } from "@mui/material";
import Team21 from "@/components/Team21";
import Team22 from "../components/Team22";
import Team23 from "../components/Team23";
import Team24 from "../components/Team24";

const Team = () => {
  return (
    <>
      <Head>
        <title>Team</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
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
            <Image src={prof} className="img-responsive" alt="team member" />
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
          <Team24 />
          <Team23 />
          <Accordion className="past-team">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h2
                style={{
                  fontSize: "1.4rem",
                  textAlign: "center",
                  width: "100%",
                  fontWeight: "bold",
                }}
              >
                TEAM OF 2022-23
              </h2>
            </AccordionSummary>
            <Team22 />
          </Accordion>
          <Accordion className="past-team">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h2
                style={{
                  fontSize: "1.4rem",
                  textAlign: "center",
                  width: "100%",
                  fontWeight: "bold",
                }}
              >
                TEAM OF 2021-22
              </h2>
            </AccordionSummary>
            <Team21 />
          </Accordion>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Team;
