// Accordion.jsx
import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Card from "react-bootstrap/Card";
import StudentForm from "../forms/studentForm";

const PINK = "rgba(255, 192, 203, 0.6)";
const BLUE = "rgba(0, 0, 255, 0.6)";

function CustomAccordion({ hiringProfilesString, applicableCandidatesString }) {
  return (
    <>
      <Accordion className="" defaultActiveKey={[""]}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Apply Here</Accordion.Header>
          <Accordion.Body>
            <StudentForm
              hiringProfilesString={hiringProfilesString}
              applicableCandidatesString={applicableCandidatesString}
            />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default CustomAccordion;
