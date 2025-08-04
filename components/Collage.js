import React from "react";
import { Row } from "react-bootstrap";
import Image from "next/legacy/image";
//  import startups from "../public/startups.png";
//  import startups_mobile from "../public/startups_mobile.png";
const startups =  "https://ik.imagekit.io/ecelliitbhu/website/startups.png?tr=w-1300";
const startups_mobile = "https://ik.imagekit.io/ecelliitbhu/website/startups_mobile.png?tr=w-1300";
export const Collage = () => {
  return (
    <Row className="collage-container collage-normal my-[70px]">
      <h1 className="my-[20px]">
        Successful Ventures From IIT BHU Alumni
      </h1>
      <div className="ml-10"> {/* margin targeting img */}
        <Image
          src={startups}
          alt="startups"
          width={1300}
          height={600}
        />
      </div>
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
      <Image src={startups_mobile}  alt="startups" width={1300} height={600}></Image>
    </Row>
  );
};
