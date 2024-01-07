import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

import CustomAccordion from "./accordion";

function StartupDetailsModal(props) {
  if (!props.data) {
    return null; // or some default content, or handle the absence of data appropriately
  }
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        scrollable="false"
        centered
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "", // Set your desired background color
            color: "#ffffff",
            borderBottom: "1px solid #dee2e6",
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            <Image
              src="/Ecell-logo.png"
              rounded
              alt="E-Cell"
              style={{ height: "2.5rem" }}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ padding: "20px", fontFamily: "'Roboto', sans-serif" }}
        >
          <Row className="mb-4">
            <Col md={12} className="text-center">
              <h3 style={{ fontSize: "28px", fontWeight: "bold" }}>
                {props.data.company_name}
              </h3>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <div className="mb-3">
                <span style={{ fontSize: "18px", fontWeight: "600" }}>
                  Contact
                </span>{" "}
                <span style={{ fontSize: "16px", paddingLeft: "12px" }}>
                  {props.data.poc_linkedin}
                </span>
              </div>
              <div className="mb-3">
                <span style={{ fontSize: "18px", fontWeight: "600" }}>
                  Joining Date
                </span>{" "}
                <span style={{ fontSize: "16px", paddingLeft: "12px" }}>
                  {props.data.joining_date}
                </span>
              </div>
              <div className="mb-3">
                <span style={{ fontSize: "18px", fontWeight: "600" }}>
                  Location
                </span>{" "}
                <span style={{ fontSize: "16px", paddingLeft: "12px" }}>
                  {props.data.loc}
                </span>
              </div>
              <div className="mb-3">
                <span style={{ fontSize: "18px", fontWeight: "600" }}>
                  Stipend
                </span>{" "}
                <span style={{ fontSize: "16px", paddingLeft: "12px" }}>
                  {props.data.stipend} $
                </span>
              </div>
              <div className="mb-3">
                <span style={{ fontSize: "18px", fontWeight: "600" }}>
                  Website
                </span>{" "}
                <span style={{ fontSize: "16px", paddingLeft: "12px" }}>
                  {props.data.company_pos_web}
                </span>
              </div>
              <div className="mb-3">
                <span style={{ fontSize: "20px", fontWeight: "600" }}>
                  Job Description
                </span>
                <a
                  href={props.data.jdurl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    style={{
                      height: "1.5rem",
                      paddingLeft: "0.8rem",
                    }}
                    src="/sip/next.png"
                    alt="click"
                  />
                </a>
              </div>
            </Col>

            <Col md={6}>
              <div className="mb-3">
                <span style={{ fontSize: "18px", fontWeight: "600" }}>
                  Hiring Profiles:
                </span>
                {props.hiringProfilesString.split("$").map((profile, index) => (
                  <div
                    key={index}
                    style={{
                      fontSize: "16px",
                      fontWeight: "normal",
                      paddingLeft: "0.2rem",
                    }}
                  >
                    • {profile}
                  </div>
                ))}
              </div>
              <div className="mb-3">
                <span style={{ fontSize: "18px", fontWeight: "600" }}>
                  Applicable Candidates:
                </span>
                {props.applicableCandidatesString
                  .split("$")
                  .map((candidate, index) => (
                    <div
                      key={index}
                      style={{
                        fontSize: "16px",
                        fontWeight: "normal",
                        paddingLeft: "0.2rem",
                      }}
                    >
                      • {candidate}
                    </div>
                  ))}
              </div>
              {/* <div className="mb-3">
                <span style={{ fontSize: "18px", fontWeight: "600" }}>
                  Job Description URL:
                </span>{" "}
                <a
                  href={props.data.jdurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    color: "#007BFF",
                  }}
                >
                  Link
                </a>
              </div> */}
            </Col>
          </Row>
        </Modal.Body>

        {/* Accordion of Form for student data  */}
        <CustomAccordion />
      </Modal>
    </>
  );
}

export default StartupDetailsModal;
