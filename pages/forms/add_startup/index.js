import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Footer from "../../../components/Footer";
import Nav from "../../../components/navbar/NavLayout";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../../../context/auth";
import { firebaseDB } from "../../../lib/firebase";
import { ref, push, getDatabase, get, child } from "firebase/database";
import {
  getStorage,
  ref as firebaseStorageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import Router from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
const AddStartup = () => {
  // const { superAdminUserName, superAdminToken, logoutSuperAdmin } = useAuth();
  // console.log(superAdminToken)
  // useEffect(() => {
  //   if (!superAdminToken) Router.replace("/adminlogin");
  // });
  function logout(e) {
    e.preventDefault();
    // logoutSuperAdmin();
  }
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [founders, setFounders] = useState([{ founder: "", linkedin: "" }]);
  const handleFounderChange = (index, field, value) => {
    const updatedFounders = [...founders];
    updatedFounders[index][field] = value;
    setFounders(updatedFounders);
  };

  const addFounderInput = () => {
    if (founders.length < 5) {
      setFounders([...founders, { founder: "", linkedin: "" }]);
    }
  };
  const [files, setFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(files);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const validFounders = founders.filter(f => f.founder.trim() !== "");
    const storage = getStorage();
    const db = firebaseDB;
    const imageName = name + year + uuidv4();
    const storageRef = firebaseStorageRef(
      storage,
      `startupDirectory/addRequests/${imageName}`
    );
    const metadata = { contentType: "image/png" };
    uploadBytes(storageRef, files, metadata).then((snapshot) => {
      getDownloadURL(
        firebaseStorageRef(storage, `startupDirectory/addRequests/${imageName}`)
      )
        .then((url) => {
          push(ref(db, "startupDirectory/addRequests/"), {
            name: name,
            description: description,
            domain: domain,
            year: year,
            website: website,
            founders: validFounders,
            avatar: url,
          })
            .then(() => {
              setName("");
              setDomain("");
              setDescription("");
              setYear("");
              setWebsite("");
              setFounders([{ founder: "", linkedin: "" }]);
              setFiles("");
              setIsLoading(false);
              alert("Form submitted successfully");
            })
            .catch((error) => alert(error.message));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  return (
    <>
      <Head>
        <title>Add Startup</title>
        <link rel="shortcut icon" href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico" />
      </Head>
      <Nav />
      <div>
        <Container fluid className="body">
          <Row
            className="header"
            style={{ height: "fit-content", marginBottom: "10px" }}
          >
            <h1
              style={{
                margin: "50px auto 0px auto",
                textAlign: "center",
                fontSize: "2.1rem",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Add Startup
            </h1>
          </Row>
          <Row
            className="who-are-we"
            style={{ height: "fit-content", margin: "20px 0" }}
          >
            <p
              style={{
                margin: "auto",
                textAlign: "center",
                fontSize: "1rem",
                color: "black",
                width: "90%",
              }}
            >
              The Entrepreneurship Cell (E-Cell), IIT (BHU) Varanasi aims to
              foster the spirit of entrepreneurship and innovation in the
              college.
              <br /> Fill this form to be a part of the E-Cell, and contribute
              to building the entrepreneurship culture!
            </p>
          </Row>
          <Row>
            <form
              className="cf teamExpansion-form"
              onSubmit={handleSubmit}
              style={{ width: "95%", maxWidth: "800px" }}
            >
              <Row className="form-item">
                <label>
                  <h5>
                    Name of the startup <span style={{ color: "red" }}>*</span>
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
                <label>
                  <h5>
                    Logo of the startup <span style={{ color: "red" }}>*</span>
                  </h5>
                </label>
                <input
                  type="file"
                  name="files"
                  onChange={(e) => setFiles(e.target.files[0])}
                  style={{ borderBottom: "2px solid grey" }}
                  value={files ? files[0] : ""}
                  required
                />
              </Row>
              <Row className="form-item">
                <label>
                  <h5>
                    Enter the domain <span style={{ color: "red" }}>*</span>
                  </h5>
                </label>
                <input
                  type="text"
                  onChange={(e) => setDomain(e.target.value)}
                  style={{ borderBottom: "2px solid grey" }}
                  value={domain}
                  required
                />
              </Row>
              <Row className="form-item">
                <label>
                  <h5>
                    Enter the year the startup was founded in{" "}
                    <span style={{ color: "red" }}>*</span>
                  </h5>
                </label>
                <input
                  type="text"
                  placeholder="Enter Year"
                  value={year}
                  style={{ borderBottom: "2px solid grey" }}
                  onChange={(e) => setYear(e.target.value)}
                  required
                />
              </Row>
              <Row className="form-item">
                <label>
                  <h5>
                    Enter Description <span style={{ color: "red" }}>*</span>
                  </h5>
                </label>
                <textarea
                  type="text"
                  placeholder="Enter Description"
                  rows="8"
                  cols="40"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ borderBottom: "2px solid grey" }}
                  required
                ></textarea>
              </Row>
              {founders.map((item, index) => (
                <div key={index}>
                  <Row className="form-item">
                    <label>
                      <h5>
                        Enter Founder {index + 1} {index === 0 && <span style={{ color: "red" }}>*</span>}
                      </h5>
                    </label>
                    <input
                      type="text"
                      placeholder={`Enter Founder ${index + 1}`}
                      value={item.founder}
                      onChange={(e) => handleFounderChange(index, "founder", e.target.value)}
                      style={{ borderBottom: "2px solid grey" }}
                      required={index === 0}
                    />
                  </Row>
                  <Row className="form-item">
                    <label>
                      <h5>Linkedin of Founder {index + 1}</h5>
                    </label>
                    <input
                      type="text"
                      placeholder={`Linkedin of Founder ${index + 1}`}
                      value={item.linkedin}
                      onChange={(e) => handleFounderChange(index, "linkedin", e.target.value)}
                      style={{ borderBottom: "2px solid grey" }}
                    />
                  </Row>
                </div>
              ))}

              {founders.length < 5 && (
                <Row className="form-item" style={{ marginTop: "10px", marginBottom: "20px" }}>
                  <Button variant="secondary" onClick={addFounderInput} style={{ width: "fit-content", margin: "0 auto" }}>
                    + Add Another Founder
                  </Button>
                </Row>
              )}
              <Row className="form-item">
                <label>
                  <h5>Startup Website</h5>
                </label>
                <input
                  type="text"
                  placeholder="Startup Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  style={{ borderBottom: "2px solid grey" }}
                />
              </Row>

              {!isLoading && (
                <input type="submit" value="Submit" id="input-submit" />
              )}
            </form>
          </Row>
          <Footer />
        </Container>
      </div>

      {/* {superAdminToken && ( */}
      {/* <Card style={{ margin: "50px auto", width: "70%" }}> */}
      {/* {superAdminToken && <span>{superAdminUserName}</span>} */}
      {/* <Button variant="primary" onClick={() => logout()}>
            Logout
          </Button> */}
      {/* <Card.Body>
          <Card.Title>Add Startup</Card.Title> */}
      {/* <form
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
            placeholder="Ethan Hunt"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              File <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="file"
            name="files"
            onChange={(e) => setFiles(e.target.files[0])}
            style={{ borderBottom: "2px solid grey" }}
            value={name}
            required
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Enter Domain <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            onChange={(e) => setDomain(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            value={domain}
            required
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Enter Year <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            placeholder="Enter Year"
            value={year}
            style={{ borderBottom: "2px solid grey" }}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Enter Status <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            placeholder="Enter status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Enter Description <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <textarea
            type="text"
            placeholder="Enter Description"
            rows="8"
            cols="40"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
            required
          ></textarea>
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Enter Founder 1 <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            placeholder="Enter Founder 1"
            value={founder1}
            onChange={(e) => setFounder1(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Enter Year <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            placeholder="Enter Founder 2"
            value={founder2}
            onChange={(e) => setFounder2(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Enter Year <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            placeholder="Linkedin of Founder 2"
            value={linkedin2}
            onChange={(e) => setLinkedin2(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Enter Year <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            placeholder="Enter Founder 3"
            value={founder3}
            onChange={(e) => setFounder3(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Enter Year <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            placeholder="Enter Founder 4"
            value={founder4}
            onChange={(e) => setFounder4(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Enter Year <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            placeholder="Linkedin of Founder 4"
            value={linkedin4}
            onChange={(e) => setLinkedin4(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Enter Year <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            placeholder="Enter Founder 5"
            value={founder5}
            onChange={(e) => setFounder5(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Enter Year <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            placeholder="Linkedin of Founder 5"
            value={linkedin5}
            onChange={(e) => setLinkedin5(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        <Row className="form-item">
          <label>
            <h5>
              Enter Year <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            placeholder="startup website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            style={{ borderBottom: "2px solid grey" }}
          />
        </Row>
        {!isLoading && (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        )}
      </form> */}
      {/* </Card.Body>
      </Card> */}
      {/* )} */}
    </>
  );
};

export default AddStartup;
