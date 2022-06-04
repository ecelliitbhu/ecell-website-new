import React from "react";
import { ref, push } from "firebase/database";
import { useState } from "react";
import { firebaseDB } from "../../lib/firebase";
import { Row } from "react-bootstrap";
const TechTeamExpansionForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [github1, setGithub1] = useState("");
  const [github2, setGithub2] = useState("");
  const [deploy1, setDeploy1] = useState("");
  const [deploy2, setDeploy2] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const db = firebaseDB;
    push(ref(db, "techTeamExpansionResponses/"), {
      a_name: name,
      b_email: email,
      c_contact_number: number,
      d_branch: branch,
      e_github1: github1,
      f_deploy1: deploy1,
      g_github2: github2,
      h_deploy2: deploy2,
    })
      .then(() => {
        alert("Form submitted successfully");
        setName("");
        setEmail("");
        setNumber("");
        setBranch("");
        setGithub1("");
        setGithub2("");
        setDeploy1("");
        setDeploy2("");
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
              Contact Detail(s) <span style={{ color: "red" }}>*</span>
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
              Branch (B Tech/ IDD/ PG) and Year{" "}
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
        <h2 style={{ marginTop: "90px" }}>Task 1: Form Application</h2>
        <Row className="form-item">
          <label htmlFor="github1">
            <h5>
              Link to Github Repository
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={github1}
            placeholder="https://github.com/facebook/react"
            onChange={(e) => setGithub1(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="deploy1">
            <h5>
              Link to deployed web app
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={deploy1}
            placeholder="https://randomtestapp.netlify.app/"
            onChange={(e) => setDeploy1(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        <h2 style={{ marginTop: "90px" }}>Task 2: Google Authentication Application</h2>
        <Row className="form-item">
          <label htmlFor="github2">
            <h5>
              Link to Github Repository
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={github2}
            placeholder="https://github.com/facebook/react"
            onChange={(e) => setGithub2(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="deploy2">
            <h5>
              Link to deployed web app
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            value={deploy2}
            placeholder="https://randomtestapp.netlify.app/"
            onChange={(e) => setDeploy2(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        <input type="submit" value="Submit" id="input-submit" />
      </form>
    </>
  );
};

export default TechTeamExpansionForm;
