import React from "react";
import { ref, push } from "firebase/database";
import { useState } from "react";
import { firebaseDB } from "../lib/firebase";
import { Row } from "react-bootstrap";
import { MdVerticalSplit } from "react-icons/md";
const TeamExpansionForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [sap, setSap] = useState(false);
  const [iit, setIit] = useState(false);
  const [events, setEvents] = useState(false);
  const [tech, setTech] = useState(false);
  const [SR, setSR] = useState(false);
  const [brand, setBrand] = useState(false);
  const [commitment, setCommitment] = useState("");
  const [
    why_join_ecell_and_selected_vertical,
    setWhy_join_ecell_and_selected_vertical,
  ] = useState("");
  const [prev_experience, setPrev_experience] = useState("");
  const [non_acad_engagements, setNon_acad_engagements] = useState("");
  const [any_other_point, setAny_other_point] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    var verticals = [];
    sap && verticals.push("SAP");
    SR && verticals.push("SR");
    events && verticals.push("Events");
    tech && verticals.push("Tech");
    brand && verticals.push("Branding");
    iit && verticals.push("Innovation & Incubation");
    const db = firebaseDB;
    push(ref(db, "teamExpansionResponses/"), {
      a_name: name,
      b_email: email,
      c_contact_number: number,
      d_branch: branch,
      e_commitment: commitment,
      f_verticals_opted: verticals,
      g_why_join_ecell_and_selected_vertical:
        why_join_ecell_and_selected_vertical,
      h_prev_experience: prev_experience,
      i_non_acad_engagements: non_acad_engagements,
      j_any_other_point: any_other_point,
      k_sap: sap,
    })
      .then(() => {
        alert("Form submitted successfully");
        setName("");
        setEmail("");
        setNumber("");
        setBranch("");
        setSap(false);
        setIit(false);
        setBrand(false);
        setTech(false);
        setEvents(false);
        setSR(false);
        setCommitment("");
        setWhy_join_ecell_and_selected_vertical("");
        setPrev_experience("");
        setNon_acad_engagements("");
        setAny_other_point("");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <>
      <form className="cf teamExpansion-form" onSubmit={handleSubmit} style={{width:"95%", maxWidth:"800px"}}>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Name <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
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
              Contact Detail(s) <span style={{ color: "red" }}>*</span>
            </h5>
            <span>Please share WhatsApp number without +91</span>
          </label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Branch (B Tech/ IDD/ PG) and Year{" "}
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <h2 style={{ marginTop: "90px" }}>Team Application</h2>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Which Team(s) are you interested in?{" "}
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <Row className="checkbox-option">
            <input
              type="checkbox"
              value="SAP"
              checked={sap}
              onChange={() => setSap(!sap)}
            />
            <span> Startup Assistance Program</span>
          </Row>
          <Row className="checkbox-option">
            <input
              type="checkbox"
              value="Inno and Incu"
              checked={iit}
              onChange={() => setIit(!iit)}
            />

            <span>{`Innovation & Incubation Team`}</span>
          </Row>
          <Row className="checkbox-option">
            <input
              type="checkbox"
              value="Events"
              checked={events}
              onChange={() => setEvents(!events)}
            />

            <span>Events Team</span>
          </Row>
          <Row className="checkbox-option">
            <input
              type="checkbox"
              value="Branding"
              checked={brand}
              onChange={() => setBrand(!brand)}
            />

            <span>Branding Team</span>
          </Row>
          <Row className="checkbox-option">
            <input
              type="checkbox"
              value="Tech"
              checked={tech}
              onChange={() => setTech(!tech)}
            />

            <span>Technical Team</span>
          </Row>
          <Row className="checkbox-option">
            <input
              type="checkbox"
              value="SR"
              checked={SR}
              onChange={() => setSR(!SR)}
            />
            <span> Strategic Relations Team</span>
          </Row>
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Commitment for number of hours per week
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={commitment}
            onChange={(e) => setCommitment(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Why do you want to join E Cell, and the above selected unit?
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={why_join_ecell_and_selected_vertical}
            onChange={(e) =>
              setWhy_join_ecell_and_selected_vertical(e.target.value)
            }
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <h2 style={{ marginTop: "90px" }}>Tell us about Yourself!</h2>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Previous Experience(s) in students organisation/ management{" "}
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={prev_experience}
            onChange={(e) => setPrev_experience(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Any other non-academic activities/ engagements{" "}
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={non_acad_engagements}
            onChange={(e) => setNon_acad_engagements(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Any other point(s) you wish to mention:{" "}
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={any_other_point}
            onChange={(e) => setAny_other_point(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <input type="submit" value="Submit" id="input-submit" />
      </form>
    </>
  );
};

export default TeamExpansionForm;
