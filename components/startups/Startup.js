import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

function MyVerticallyCenteredModal(props) {
  const details = props.details;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {details.name}
          <div style={{ fontSize: "1rem", color: "grey" }}>
            {details.domain}, Founded in {details.year}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: "flex" }}>
        <p style={{ marginRight: "7px" }}>{details.description}</p>
        <div
          className="startup-modal-image"
          style={{
            height: "1005",
            width: "100%",
          }}
        >
          <div
            style={{
              height: "120px",
              width: "120px",
              position: "relative",
              bottom: "70px",
              float: "right",
            }}
          >
            <Image
              src={details.avatar}
              alt={details.name}
              height="1000"
              width="1000"
            />
          </div>
        </div>
      </Modal.Body>
      <div className="startup-modal-footer">
        <div style={{ width: "85%", marginRight: "7px" }}>
          <h2 style={{ fontSize: "1rem" }}>Founders</h2>
          <div className="founders-container">
            {details.founders &&
              details.founders.map((founder_details) => {
                return founder_details.founder.length > 0 ? (
                  <a
                    key={founder_details.linkedin}
                    href={
                      founder_details.linkedin &&
                      (founder_details.linkedin.startsWith(
                        "https://www.linkedin.com/"
                      ) ||
                        founder_details.linkedin.startsWith(
                          "https://in.linkedin.com/"
                        ))
                        ? founder_details.linkedin
                        : "https://www." + founder_details.linkedin
                    }
                    rel="noreferrer"
                    target="_blank"
                  >
                    <FaLinkedin fontSize="1.5rem"></FaLinkedin>
                    <span style={{ fontSize: "0.8rem" }}>
                      {founder_details.founder}
                    </span>
                  </a>
                ) : (
                  ""
                );
              })}
          </div>
        </div>
        <Button
          className="startup-website"
          href={details.website}
          rel="noreferrer"
          target="_blank"
          style={{
            backgroundColor: "#fb6930",
            border: "none",
          }}
        >
          Website
        </Button>
      </div>
    </Modal>
  );
}

const Startup = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // console.log(props.details.avatar.data);
  return (
    <>
      <div className="startup-item" onClick={handleShow}>
        <Image
          src={props.details.avatar}
          alt={props.details.name}
          height="1000"
          width="1000"
        />
      </div>
      <MyVerticallyCenteredModal
        details={props.details}
        show={show}
        onHide={handleClose}
      />
    </>
  );
};

export default Startup;
