import React from "react";
import { ref, push } from "firebase/database";
import { useState } from "react";
import { firebaseDB } from "../../lib/firebase";
import { Row } from "react-bootstrap";
const TeamInfo = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [branch, setBranch] = useState("");
  const [vertical, setVertical] = useState("");
  const [linkedin, setlinkedin] = useState("");
  const [insta, setInsta] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!vertical) return;
    setIsSubmitting(true);
    const db = firebaseDB;
    push(ref(db, "teamMembers/"), {
      a_name: name,
      b_email: email,
      c_contact_number: number,
      d_rollNo: rollNo,
      e_branch: branch,
      f_vertical: vertical,
      g_linkedin: linkedin,
      h_insta: insta,
      i_twitter: twitter,
      j_discord: discord,
    })
      .then(() => {
        setName("");
        setEmail("");
        setNumber("");
        setRollNo("");
        setlinkedin("");
        setInsta("");
        setTwitter("");
        setDiscord("");
        setBranch("");
        setVertical("");
        setIsSubmitting(false);
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
              Name <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="Ethan Hunt"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Roll Number <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="20145016"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Branch (B Tech/B Arch/IDD/PG) and Year
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={branch}
            placeholder="Mechanical Engineering BTech 1st Year"
            onChange={(e) => setBranch(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Email <span style={{ color: "red" }}>*</span>
            </h5>
            <span>Please share institute email id</span>
          </label>
          <input
            type="email"
            value={email}
            placeholder="example@itbhu.ac.in"
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Phone Number <span style={{ color: "red" }}>*</span>
            </h5>
            <span>Please share WhatsApp number without +91</span>
          </label>
          <input
            type="text"
            value={number}
            placeholder="9876543210"
            onChange={(e) => setNumber(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <Row
          className="form-item"
          onChange={(e) => setVertical(e.target.value)}
          value={vertical}
        >
          <label htmlFor="fname">
            <h5>
              Team
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <Row className="checkbox-option">
            <input type="radio" value="SAP" name="vertical" />
            <span> Startup Assistance Program</span>
          </Row>
          <Row className="checkbox-option">
            <input type="radio" value="InI" name="vertical" />
            <span>{`Innovation & Incubation Team`}</span>
          </Row>
          <Row className="checkbox-option">
            <input type="radio" value="events" name="vertical" />
            <span>Events Team</span>
          </Row>
          <Row className="checkbox-option">
            <input type="radio" value="Branding" name="vertical" />
            <span>Branding Team</span>
          </Row>
          <Row className="checkbox-option">
            <input type="radio" value="tech" name="vertical" />
            <span>Technical Team</span>
          </Row>
          <Row className="checkbox-option">
            <input type="radio" value="SR" name="vertical" />
            <span> Strategic Relations Team</span>
          </Row>
          <Row className="checkbox-option">
            <input type="radio" value="E-Summit" name="vertical" />
            <span>{`E-Summit'23`}</span>
          </Row>
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Linkedin Profile Link<span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={linkedin}
            onChange={(e) => setlinkedin(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Instagram Username<span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={insta}
            onChange={(e) => setInsta(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Twitter Username<span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Discord Username<span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            required
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

export default TeamInfo;
