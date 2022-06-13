import { Card, Button } from "react-bootstrap";
import { useAuth } from "../context/auth";
import { firebaseDB } from "../lib/firebase";
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
  const [founder1, setFounder1] = useState("");
  const [founder2, setFounder2] = useState("");
  const [founder3, setFounder3] = useState("");
  const [founder4, setFounder4] = useState("");
  const [founder5, setFounder5] = useState("");
  const [founders, setFounders] = useState([]);
  const [linkedin1, setLinkedin1] = useState("");
  const [linkedin2, setLinkedin2] = useState("");
  const [linkedin3, setLinkedin3] = useState("");
  const [linkedin4, setLinkedin4] = useState("");
  const [linkedin5, setLinkedin5] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("");
  const [files, setFiles] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(files);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    var foundersArray = [];
    founder1 &&
      linkedin1 &&
      foundersArray.push({ founder: founder1, linkedin: linkedin1 });
    founder2 &&
      linkedin2 &&
      foundersArray.push({ founder: founder2, linkedin: linkedin2 });
    founder3 &&
      linkedin3 &&
      foundersArray.push({ founder: founder3, linkedin: linkedin3 });
    founder4 &&
      linkedin4 &&
      foundersArray.push({ founder: founder4, linkedin: linkedin4 });
    founder5 &&
      linkedin5 &&
      foundersArray.push({ founder: founder5, linkedin: linkedin5 });
    // setFounders(foundersArray);
    const storage = getStorage();
    const db = firebaseDB;
    const imageName = name + year + uuidv4();
    const storageRef = firebaseStorageRef(
      storage,
      `startupDirectory/${imageName}`
    );
    uploadBytes(storageRef, files).then((snapshot) => {
      getDownloadURL(
        firebaseStorageRef(storage, `startupDirectory/${imageName}`)
      )
        .then((url) => {
          push(ref(db, "startupDirectory/"), {
            name: name,
            description: description,
            domain: domain,
            status: status,
            year: year,
            website: website,
            founders: foundersArray,
            avatar: url,
          })
            .then(() => {
              setName("");
              setDomain("");
              setDescription("");
              setStatus("");
              setYear("");
              setWebsite("");
              setFounder1("");
              setFounder2("");
              setFounder3("");
              setFounder4("");
              setFounder5("");
              setLinkedin1("");
              setLinkedin2("");
              setLinkedin3("");
              setLinkedin4("");
              setLinkedin5("");
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
      {/* {superAdminToken && ( */}
      <Card style={{ margin: "50px auto", width: "70%" }}>
        {/* {superAdminToken && <span>{superAdminUserName}</span>} */}
        {/* <Button variant="primary" onClick={() => logout()}>
            Logout
          </Button> */}
        <Card.Body>
          <Card.Title>Add Startup</Card.Title>
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div>
                <input
                  type="file"
                  name="files"
                  onChange={(e) => setFiles(e.target.files[0])}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Enter Domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Enter status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
              <textarea
                type="text"
                placeholder="Enter Description"
                rows="8"
                cols="40"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <input
                type="text"
                placeholder="Enter Founder 1"
                value={founder1}
                onChange={(e) => setFounder1(e.target.value)}
              />
              <input
                type="text"
                placeholder="Linkedin Founder 1"
                value={linkedin1}
                onChange={(e) => setLinkedin1(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Founder 2"
                value={founder2}
                onChange={(e) => setFounder2(e.target.value)}
              />
              <input
                type="text"
                placeholder="Linkedin Founder 2"
                value={linkedin2}
                onChange={(e) => setLinkedin2(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Founder 3"
                value={founder3}
                onChange={(e) => setFounder3(e.target.value)}
              />
              <input
                type="text"
                placeholder="Linkedin Founder 3"
                value={linkedin3}
                onChange={(e) => setLinkedin3(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Founder 4"
                value={founder4}
                onChange={(e) => setFounder4(e.target.value)}
              />
              <input
                type="text"
                placeholder="Linkedin Founder 4"
                value={linkedin4}
                onChange={(e) => setLinkedin4(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Founder 5"
                value={founder5}
                onChange={(e) => setFounder5(e.target.value)}
              />
              <input
                type="text"
                placeholder="Linkedin Founder 5"
                value={linkedin5}
                onChange={(e) => setLinkedin5(e.target.value)}
              />
              <input
                type="text"
                placeholder="startup website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              {!isLoading && (
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              )}
            </div>
          </form>
        </Card.Body>
      </Card>
      {/* )} */}
    </>
  );
};

export default AddStartup;
