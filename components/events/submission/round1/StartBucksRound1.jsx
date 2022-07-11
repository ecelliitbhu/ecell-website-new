import React, { useCallback } from "react";
import { ref, set } from "firebase/database";
import {
  getStorage,
  ref as firebaseStorageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";
import { firebaseDB } from "../../../../lib/firebase";
import { Row, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

const MyDropzone = ({ formDetails, setFormDetails }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFormDetails({ ...formDetails, file: acceptedFiles[0] });
    },
    [formDetails, setFormDetails]
  );
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
    },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
  });
  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} required />
        <div
          style={{
            height: "180px",
            width: "100%",
            border: "2px solid black",
            borderStyle: "dotted",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!formDetails.file ? (
            <>
              <Button onClick={open}>Click here to select a file</Button>
              <span style={{ color: "red" }}>Only PDF files are allowed</span>
            </>
          ) : (
            <>
              <a
                href={URL.createObjectURL(formDetails.file)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {formDetails.file.name}
              </a>
              <Button
                variant="danger"
                onClick={() =>
                  setFormDetails({ ...formDetails, file: undefined })
                }
              >
                Remove file
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const StartBucksRound1 = () => {
  const [formDetails, setFormDetails] = useState({
    teamName: "",
    teamLeader: { name: "", phoneNumber: "", email: "" },
    file: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const db = firebaseDB;
    const storage = getStorage();
    const fileName = formDetails.file.name + uuidv4();
    const storageRef = firebaseStorageRef(
      storage,
      `events/startBucks/round1/${fileName}`
    );
    const metadata = { contentType: formDetails.file.type };
    uploadBytes(storageRef, formDetails.file, metadata).then((snapshot) => {
      getDownloadURL(
        firebaseStorageRef(storage, `eventsSubmission/startBucks/round1/${fileName}`)
      ).then((fileLink) => {
        set(
          ref(
            db,
            `startBucks2022/round1/${
              formDetails.teamName + formDetails.teamLeader.phoneNumber
            }`
          ),
          {
            ...formDetails,
            file: fileLink,
          }
        )
          .then(() => {
            setIsSubmitting(false);
            setFormDetails({
              teamName: "",
              teamLeader: { name: "", phoneNumber: "", email: "" },
              file: undefined,
            });
            alert("Form submitted successfully");
          })
          .catch((error) => alert(error.message));
      });
    });
  };
  return (
    <>
      <form
        className="cf teamExpansion-form"
        onSubmit={handleSubmit}
        style={{ width: "95%", maxWidth: "800px" }}
      >
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Team Name <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="Impossible Missions Force"
            value={formDetails.teamName}
            onChange={(e) =>
              setFormDetails({ ...formDetails, teamName: e.target.value })
            }
            required
          />
        </Row>

        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Team Leader Name <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="Ethan Hunt"
            value={formDetails.teamLeader.name}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                teamLeader: { ...formDetails.teamLeader, name: e.target.value },
              })
            }
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Contact Number
              <span style={{ color: "red" }}>*</span>
            </h5>
            <span>Please share WhatsApp number without +91</span>
          </label>
          <input
            type="text"
            placeholder="9876543210"
            value={formDetails.teamLeader.phoneNumber}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                teamLeader: {
                  ...formDetails.teamLeader,
                  phoneNumber: e.target.value,
                },
              })
            }
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Email ID <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={formDetails.teamLeader.email}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                teamLeader: {
                  ...formDetails.teamLeader,
                  email: e.target.value,
                },
              })
            }
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <Row>
          <MyDropzone
            formDetails={formDetails}
            setFormDetails={setFormDetails}
          />
        </Row>
        <input
          type={isSubmitting ? "button" : "submit"}
          value={isSubmitting ? "Submitting..." : "Submit"}
          style={isSubmitting ? { background: "grey" } : {}}
          id="input-submit"
        />
      </form>
    </>
  );
};

export default StartBucksRound1;
