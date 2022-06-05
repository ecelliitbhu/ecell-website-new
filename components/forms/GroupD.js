import React from "react";
import { ref, push } from "firebase/database";
import { useState } from "react";
import { firebaseDB } from "../../lib/firebase";
import { Row } from "react-bootstrap";
const GroupD = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const db = firebaseDB;
    push(ref(db, "reasonForMissingGDDay2/"), {
      a_name: name,
      b_email: email,
      c_contact_number: number,
      d_reason: reason,
    })
      .then(() => {
        alert("Form submitted successfully");
        setName("");
        setEmail("");
        setNumber("");
        setReason("");
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
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Reason for missing the Group Discussion{" "}
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            required
          />
        </Row>
        <input type="submit" value="Submit" id="input-submit" />
      </form>
    </>
  );
};

export default GroupD;
