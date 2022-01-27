import React from "react";
import { Modal, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";

function toBase64(arr) {
  arr = new Uint8Array(arr);
  // if it's an ArrayBuffer
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ""));
}

function MyVerticallyCenteredModal(props) {
  // console.log(props.details);
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
          {details.Name}
          <div style={{ fontSize: "1rem", color: "grey" }}>
            {details.domain}, Founded in {details.yearOfGraduation}
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: "flex" }}>
        <p style={{ marginRight: "7px"}}>{details.description}</p>
        <div className="startup-modal-image" style={{
              height: "1005",
              width: "100%",
            }}>
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
              src={`data:image/png;base64,${toBase64(
                details.avatar.data.data
              )}`}
              alt="ankbajh"
              layout="fixed"
              height="120"
              width="120"
            ></Image>
          </div>
        </div>
      </Modal.Body>
      <div className="startup-modal-footer">
        <div style={{ width: "85%", marginRight: "7px" }}>
          <h2 style={{ fontSize: "1rem" }}>Founders</h2>
          <div className="founders-container">
            {details.founders.map((founder_details) => {
              const isOkay = founder_details.founder ? true : false;
              return (
                founder_details.founder.length>0?(
                  <a
                    key={founder_details.linkedin}
                    href={
                      founder_details.linkedin.slice(0, 12) === "https://www."
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
                ):""
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
  const [modalShow, setModalShow] = React.useState(false);
  // console.log(props.details.avatar.data);
  return (
    <>
      <div className="startup-item" onClick={() => setModalShow(true)}>
        <Image
          src={`data:image/png;base64,${toBase64(
            props.details.avatar.data.data
          )}`}
          alt="ankbajh"
          layout="responsive"
          height="1000"
          width="1000"
        />
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        details={props.details}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default Startup;
