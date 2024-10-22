import React from "react";
import { ref, set } from "firebase/database";
import { useState } from "react";
import { firebaseDB } from "../../../lib/firebase";
import { Row } from "react-bootstrap";
const StartBucksForm = () => {
  const [formDetails, setFormDetails] = useState({
    teamName: "",
    college:"",
    teamLeader: { name: "", phoneNumber: "", email: "" },
    teamMember1: { name: "", phoneNumber: "" },
    teamMember2: { name: "", phoneNumber: "" },
    teamMember3: { name: "", phoneNumber: "" },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formDetails);
    // return;
    setIsSubmitting(true);
    const db = firebaseDB;
    set(
      ref(
        db,
        `eventsRegistration/startBucks2022/${
          formDetails.teamName + formDetails.teamLeader.phoneNumber
        }`
      ),
      formDetails
    )
      .then(() => {
        setIsSubmitting(false);
        setFormDetails({
          teamName: "",
          college:"",
          teamLeader: { name: "", phoneNumber: "", email: "" },
          teamMember1: { name: "", phoneNumber: "" },
          teamMember2: { name: "", phoneNumber: "" },
          teamMember3: { name: "", phoneNumber: "" },
        });
        alert("Form submitted successfully");
      })
      .catch((error) => alert(error.message));
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
              College <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="College Name"
            value={formDetails.college}
            onChange={(e) =>
              setFormDetails({ ...formDetails, college: e.target.value })
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
              Team Leader Whatsapp number
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
              Team Leader Email ID <span style={{ color: "red" }}>*</span>
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
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 1 Name</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="Ethan Hunt"
            value={formDetails.teamMember1.name}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                teamMember1: {
                  ...formDetails.teamMember1,
                  name: e.target.value,
                },
              })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 1 Whatsapp number</h5>
            <span>Please share WhatsApp number without +91</span>
          </label>
          <input
            type="text"
            placeholder="9876543210"
            value={formDetails.teamMember1.phoneNumber}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                teamMember1: {
                  ...formDetails.teamMember1,
                  phoneNumber: e.target.value,
                },
              })
            }
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 2 Name</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="Ethan Hunt"
            value={formDetails.teamMember2.name}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                teamMember2: {
                  ...formDetails.teamMember2,
                  name: e.target.value,
                },
              })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 2 Whatsapp number</h5>
            <span>Please share WhatsApp number without +91</span>
          </label>
          <input
            type="text"
            placeholder="9876543210"
            value={formDetails.teamMember2.phoneNumber}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                teamMember2: {
                  ...formDetails.teamMember2,
                  phoneNumber: e.target.value,
                },
              })
            }
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 3 Name</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="Ethan Hunt"
            value={formDetails.teamMember3.name}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                teamMember3: {
                  ...formDetails.teamMember3,
                  name: e.target.value,
                },
              })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 3 Whatsapp number</h5>
            <span>Please share WhatsApp number without +91</span>
          </label>
          <input
            type="text"
            placeholder="9876543210"
            value={formDetails.teamMember3.phoneNumber}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                teamMember3: {
                  ...formDetails.teamMember3,
                  phoneNumber: e.target.value,
                },
              })
            }
            style={{ borderBottom: "2px solid grey" }}
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

export default StartBucksForm;
