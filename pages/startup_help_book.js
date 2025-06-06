import Image from "next/legacy/image";
import Card from "@mui/material/Card";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import part1_img from "../public/startup_help_book/part1.jpg";
import part2_img from "../public/startup_help_book/part2.jpg";
import React, { useState } from "react";
import Link from "next/link";
import Nav from "../components/navbar/NavLayout";
import Footer from "../components/Footer";

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
    setIconColorLeft("#4a90e2"); // Change color to dull on hover
  };
  const handleIconLeaveLeft = () => {
    setIconColorLeft("#1976d2"); // Restore the original color
  };

  const handleIconHoverRight = () => {
    setIconColorRight("#4a90e2"); // Change color to dull on hover
  };
  const handleIconLeaveRight = () => {
    setIconColorRight("#1976d2"); // Restore the original color
  };
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
            <Link
              passHref
              href="https://drive.google.com/file/d/1v2y7U62XWt_JeFjRBwHKQeMR28C2ZBqM/view"
              legacyBehavior>
              <Image src={part1_img} alt="logic"></Image>
            </Link>
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
                <Link
                  passHref
                  href="https://drive.google.com/file/d/1v2y7U62XWt_JeFjRBwHKQeMR28C2ZBqM/view"
                  legacyBehavior>
                  <div>
                    <DownloadForOfflineIcon
                      onMouseEnter={handleIconHoverLeft}
                      onMouseLeave={handleIconLeaveLeft}
                      fontSize="large"
                      style={{ color: iconColorLeft }}
                    />
                  </div>
                </Link>
              </div>
            </div>
          </Card>
        </div>

        <div style={{ marginLeft: "7%", border: "3px solid #EBEBE3" }}>
          <Card sx={{ maxWidth: 370 }}>
            <Link
              passHref
              href="https://drive.google.com/file/d/12VZa4pBivtHm8ifY-tLeA7UIcnGvn1I2/view"
              legacyBehavior>
              <Image src={part2_img} alt="logic"></Image>
            </Link>
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
                <Link
                  passHref
                  href="https://drive.google.com/file/d/12VZa4pBivtHm8ifY-tLeA7UIcnGvn1I2/view"
                  legacyBehavior>
                  <div>
                    <DownloadForOfflineIcon
                      onMouseEnter={handleIconHoverRight}
                      onMouseLeave={handleIconLeaveRight}
                      fontSize="large"
                      style={{ color: iconColorRight }}
                    />
                  </div>
                </Link>
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
