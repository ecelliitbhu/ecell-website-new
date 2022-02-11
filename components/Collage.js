import React from "react";
import { Row } from "react-bootstrap";
import Image from "next/image";
import startups from "../public/startups.png";
import startups_mobile from "../public/startups_mobile.png";
export const Collage = () => {
  return (
    <Row
      className="collage-container collage-normal"
      style={{ margin: "70px 0px" }}
    >
      <h1 style={{ margin: "20px 0px" }}>
        Successful Ventures From IIT BHU Alumni
      </h1>
      <Image src={startups} alt="startups"></Image>
    </Row>
  );
};
export const CollagePhone = () => {
  return (
    <Row
      className="collage-container collage-mobile"
      style={{ margin: "70px 0px" }}
    >
      <h1 style={{ fontSize: "1.8rem", margin: "20px 0px" }}>
        Startups From IIT BHU
      </h1>
      <Image src={startups_mobile} alt="startups"></Image>
    </Row>
  );
};
