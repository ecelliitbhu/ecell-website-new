import React from "react";
import { ref, set } from "firebase/database";
import { useState } from "react";
import { firebaseDB } from "../../lib/firebase";
import { Row } from "react-bootstrap";
const ContactAttendee = () => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    number: "",
    email: "",
    organization_institute: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [foundersSpeak, setFoundersSpeak] = useState(false);
  const [newsLetter, setNewsLetter] = useState(false);
  const [eCommunity, setECommunity] = useState(false);
  const [ama, setAma] = useState(false);
  const [ideaGeneration, setIdeaGeneration] = useState(false);
  const [brainstormingSessions, setBrainstormingSessions] = useState(false);
  const [
    ideationStartupsFoundersCommunity,
    setIdeationStartupsFoundersCommunity,
  ] = useState(false);
  const [foundersCommunity, setFoundersCommunity] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    var initiatives = [];
    foundersSpeak && initiatives.push("Founders Speak");
    newsLetter && initiatives.push("E-Cell IIT BHU Newsletter");
    eCommunity && initiatives.push("E-Community");
    ama && initiatives.push("AMA Session");
    ideaGeneration && initiatives.push("Idea Generation Meetings");
    brainstormingSessions && initiatives.push("Brainstorming Sessions");
    ideationStartupsFoundersCommunity && initiatives.push("Ideation Startups Founders Community");
    foundersCommunity && initiatives.push("Founders Community");
    // console.log(formDetails,initiatives);
    // return;
    setIsSubmitting(true);
    const db = firebaseDB;
    set(
      ref(
        db,
        `contactUsHelpbook/${
          formDetails.name + formDetails.number
        }`
      ),
      {
        a_name: formDetails.name,
        b_number: formDetails.number,
        c_email: formDetails.email,
        d_organization_institute: formDetails.organization_institute,
        e_initiatives: initiatives,
      }
    )
      .then(() => {
        setIsSubmitting(false);
        setFormDetails({
            name: "",
            number: "",
            email: "",
            organization_institute: "",
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
          <label>
            <h5>
              Name <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            value={formDetails.name}
            onChange={(e) =>
              setFormDetails({ ...formDetails, name: e.target.value })
            }
            required
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Phone number
              <span style={{ color: "red" }}>*</span>
            </h5>
            <span>WhatsApp preferred</span>
          </label>
          <input
            type="text"
            placeholder="9876543210"
            value={formDetails.number}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                number: e.target.value,
              })
            }
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Email ID <span style={{ color: "red" }}>*</span>
            </h5>
            <span>Work Email Preferred</span>
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={formDetails.email}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                email: e.target.value,
              })
            }
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Organization/Institute
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            // placeholder="example@gmail.com"
            value={formDetails.organization_institute}
            onChange={(e) =>
              setFormDetails({
                ...formDetails,
                organization_institute: e.target.value,
              })
            }
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Initiative Interested to be a part of
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <Row className="checkbox-option">
            <input
              type="checkbox"
              value="founders_speak"
              checked={foundersSpeak}
              onChange={() => setFoundersSpeak(!foundersSpeak)}
            />
            <span> Founders Speak</span>
          </Row>
          <Row className="checkbox-option">
            <input
              type="checkbox"
              checked={newsLetter}
              onChange={() => setNewsLetter(!newsLetter)}
            />
            <span> E-Cell IIT BHU Newsletter</span>
          </Row>
          <Row className="checkbox-option">
            <input
              type="checkbox"
              checked={eCommunity}
              onChange={() => setECommunity(!eCommunity)}
            />
            <span> E-Community</span>
          </Row>
          <Row className="checkbox-option">
            <input
              type="checkbox"
              checked={ama}
              onChange={() => setAma(!ama)}
            />
            <span>AMAs Sessions</span>
          </Row>
          <Row className="checkbox-option">
            <input
              type="checkbox"
              checked={ideaGeneration}
              onChange={() => setIdeaGeneration(!ideaGeneration)}
            />
            <span>Idea Generation Meetings</span>
          </Row>
          <Row className="checkbox-option">
            <input
              type="checkbox"
              checked={brainstormingSessions}
              onChange={() => setBrainstormingSessions(!brainstormingSessions)}
            />
            <span>Brainstorming Sessions</span>
          </Row>
          <Row className="checkbox-option">
            <input
              type="checkbox"
              checked={ideationStartupsFoundersCommunity}
              onChange={() =>
                setIdeationStartupsFoundersCommunity(
                  !ideationStartupsFoundersCommunity
                )
              }
            />
            <span>Ideation Startups Founders Community</span>
          </Row>
          <Row className="checkbox-option">
            <input
              type="checkbox"
              checked={foundersCommunity}
              onChange={() => setFoundersCommunity(!foundersCommunity)}
            />
            <span>Founders Community</span>
          </Row>
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

export default ContactAttendee;
