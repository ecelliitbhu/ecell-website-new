import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../context/auth";

const AdminLogin = () => {
  const { superAdminToken, setSuperAdminToken, setSuperAdminUserName } =
    useAuth();
  // console.log(superAdminToken);
  useEffect(() => {
    if (superAdminToken) Router.replace("/addstartup");
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage,setLoginMessage]=useState();
  function handleSubmit(e) {
    e.preventDefault();
    axios({
      method: "post",
      url: "/api/adminLogin",
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        // console.log(res.data);
        const { message, token } = res.data;
        setLoginMessage(message);
        if (token) {
          setSuperAdminUserName(email);
          setSuperAdminToken(token);
        }
      })
      .catch((err) => {
        console.log("Error....");
      });
  }
  return (
    <>
      <Card style={{ margin: "50px auto" }}>
        <Card.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card.Title>Admin Login</Card.Title>
          <form onSubmit={handleSubmit}>
            {loginMessage && (<h1>{loginMessage}</h1>)}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button variant="primary" type="submit">
                Login
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AdminLogin;
