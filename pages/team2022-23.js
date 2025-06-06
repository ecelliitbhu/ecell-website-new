import React from "react";
import Head from "next/head";
import Footer from "../components/Footer";
import Nav from "../components/navbar/NavLayout";
import Image from "next/legacy/image";
import prof from "../public/rajnesh_tyagi.png";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary } from "@mui/material";
import TeamLayout from "@/components/TeamLayout";
import { team2021 } from "@/staticdata/TeamsData/Team2021";
import { team2022 } from "@/staticdata/TeamsData/Team2022";
import { team2023 } from "@/staticdata/TeamsData/Team2023";
import { team2024 } from "@/staticdata/TeamsData/Team2024";
import Link from 'next/link';


const Team2022 = () => {
    return <div>
      <Nav />
        <h2
            style={{
              fontSize: "2rem",
              color: "black",
              textAlign: "center",
              fontWeight: "bold",
              margin: "90px auto 30px auto",
            }}
          >
            TEAM OF 2022-23
          </h2>
        <TeamLayout teamData={team2022} showheading={false}/>
    </div>;

  };
  export default Team2022;
  