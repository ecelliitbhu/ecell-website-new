import Image from "next/image";
import Card from "@mui/material/Card";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import React, { useState } from "react";
import Link from "next/link";
import Nav from "../components/navbar/NavLayout";
import Footer from "../components/Footer";

const part1_img =
"https://ik.imagekit.io/ecelliitbhu/website/startup_help_book/part1.jpg?tr=w-370,h-524";

const part2_img =
"https://ik.imagekit.io/ecelliitbhu/website/startup_help_book/part2.jpg?tr=w-370,h-524";


const flexContainerStyle = {
  display: "flex",
  flexWrap: "nowrap",
  justifyContent: "center",
  width: "100%",
  overflow: "auto",
  flexDirection: "row",
};

export default function StartupBundle() {
  const [iconColorLeft, setIconColorLeft] = useState("#1976d2");
  const [iconColorRight, setIconColorRight] = useState("#1976d2");

  const handleIconHoverLeft = () => {
    setIconColorLeft("#4a90e2"); 
  };
  const handleIconLeaveLeft = () => {
    setIconColorLeft("#1976d2"); 
  };

  const handleIconHoverRight = () => {
    setIconColorRight("#4a90e2");
  };
  const handleIconLeaveRight = () => {
    setIconColorRight("#1976d2");
  };

  const coverWidth  = 370;
  const coverHeight = 524;

  return (
    <div>
      <Nav />
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "2rem",
          paddingBottom: "3rem",
        }}
      >
        Startup HelpBook
      </h2>

      <div style={flexContainerStyle} className="FlexContainer">
        <div style={{ marginRight: "7%", border: "3px solid #EBEBE3" }}>
          <Card sx={{ maxWidth: 370 }}>
            <a
              href="https://drive.google.com/file/d/1v2y7U62XWt_JeFjRBwHKQeMR28C2ZBqM/view"
              target="_blank"
              rel="noopener noreferrer">
              <Image src={part1_img} alt="Startup HelpBook Part 1" width={coverWidth}
                height={coverHeight}
                priority
                sizes="(max-width: 600px) 80vw, 370px" unoptimized></Image>
            </a>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "0.7rem 1rem",
              }}
            >
              <div style={{ flex: "80%", fontSize: "22px" }}>
                Startup HelpBook Part-1
              </div>
              <div
                style={{
                  flex: "20%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <a
                  href="https://drive.google.com/file/d/1v2y7U62XWt_JeFjRBwHKQeMR28C2ZBqM/view"
                  target="_blank"
                  rel="noopener noreferrer" >
                  <div>
                    <DownloadForOfflineIcon
                      onMouseEnter={handleIconHoverLeft}
                      onMouseLeave={handleIconLeaveLeft}
                      fontSize="large"
                      style={{ color: iconColorLeft }}
                    />
                  </div>
                </a>
              </div>
            </div>
          </Card>
        </div>

        <div style={{ marginLeft: "7%", border: "3px solid #EBEBE3" }}>
          <Card sx={{ maxWidth: 370 }}>
            <a
              href="https://drive.google.com/file/d/12VZa4pBivtHm8ifY-tLeA7UIcnGvn1I2/view"
              target="_blank"
              rel="noopener noreferrer" >
              <Image src={part2_img} alt="Startup HelpBook Part 2" width={coverWidth}
                height={coverHeight}
                priority
                sizes="(max-width: 600px) 80vw, 370px" unoptimized></Image>
            </a>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "0.7rem 1rem",
              }}
            >
              <div style={{ flex: "80%", fontSize: "22px" }}>
                Startup HelpBook Part-2
              </div>
              <div
                style={{
                  flex: "20%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <a
                  href="https://drive.google.com/file/d/12VZa4pBivtHm8ifY-tLeA7UIcnGvn1I2/view"
                  target="_blank"
                  rel="noopener noreferrer" >
                  <div>
                    <DownloadForOfflineIcon
                      onMouseEnter={handleIconHoverRight}
                      onMouseLeave={handleIconLeaveRight}
                      fontSize="large"
                      style={{ color: iconColorRight }}
                    />
                  </div>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <h6
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "1rem",
          paddingBottom: "4.2rem",
        }}
      >
        <em>More parts coming soon..</em>
      </h6>
      <Footer />
    </div>
  );
}
