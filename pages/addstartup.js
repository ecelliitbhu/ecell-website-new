import { Card, Button } from "react-bootstrap";
import { useAuth } from "../context/auth";
import Router from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
const AddStartup = () => {
  const { superAdminUserName, superAdminToken, logoutSuperAdmin } = useAuth();
  // console.log(superAdminToken)
  useEffect(() => {
    if (!superAdminToken) Router.replace("/adminlogin");
  });
  function logout(e) {
    // e.preventDefault();
    logoutSuperAdmin();
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
  const [linkedin1, setLinkedin1] = useState("");
  const [linkedin2, setLinkedin2] = useState("");
  const [linkedin3, setLinkedin3] = useState("");
  const [linkedin4, setLinkedin4] = useState("");
  const [linkedin5, setLinkedin5] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("");
  const [files, setFiles] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    var formData = new FormData();
    formData.append("avatar", files);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("domain", domain);
    formData.append("status", status);
    formData.append("year", year);
    formData.append("website", website);
    formData.append("founder1", founder1);
    formData.append("founder2", founder2);
    formData.append("founder3", founder3);
    formData.append("founder4", founder4);
    formData.append("founder5", founder5);
    formData.append("linkedin1", linkedin1);
    formData.append("linkedin2", linkedin2);
    formData.append("linkedin3", linkedin3);
    formData.append("linkedin4", linkedin4);
    formData.append("linkedin5", linkedin5);
    // for (var key of formData.entries()) {
    //   console.log(key[0] + ", " + key[1]);
    // }
    axios({
      method: "post",
      url: "/api/startup",
      data: formData,
      headers: {
        superadmintoken: superAdminToken,
        "Content-Type": "multipart/form-data",
      },
    }).then(function async(res) {
      console.log(res.data);
      setName("");
      setDomain("");
      setDescription("");
      setYear("");
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
      setWebsite("");
      setStatus("");
      setFiles({});
    });
  }
  return (
    <>
      {superAdminToken && (
        <Card style={{ margin: "50px auto", width: "70%" }}>
          {superAdminToken && <span>{superAdminUserName}</span>}
          <Button variant="primary" onClick={() => logout()}>
            Logout
          </Button>
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
                  // name="description"
                  rows="8"
                  cols="40"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
                <input
                  type="text"
                  placeholder="Enter Founder 1"
                  // name="founder1"
                  value={founder1}
                  onChange={(e) => setFounder1(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Linkedin Founder 1"
                  // name="linkedinFounder1"
                  value={linkedin1}
                  onChange={(e) => setLinkedin1(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter Founder 2"
                  // name="founder2"
                  value={founder2}
                  onChange={(e) => setFounder2(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Linkedin Founder 2"
                  // name="linkedinFounder2"
                  value={linkedin2}
                  onChange={(e) => setLinkedin2(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter Founder 3"
                  // name="founder3"
                  value={founder3}
                  onChange={(e) => setFounder3(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Linkedin Founder 3"
                  // name="linkedinFounder3"
                  value={linkedin3}
                  onChange={(e) => setLinkedin3(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter Founder 4"
                  // name="founder4"
                  value={founder4}
                  onChange={(e) => setFounder4(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Linkedin Founder 4"
                  // name="linkedinFounder4"
                  value={linkedin4}
                  onChange={(e) => setLinkedin4(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter Founder 5"
                  // name="founder5"
                  value={founder5}
                  onChange={(e) => setFounder5(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Linkedin Founder 5"
                  // name="linkedinFounder5"
                  value={linkedin5}
                  onChange={(e) => setLinkedin5(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="startup website"
                  // name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default AddStartup;
