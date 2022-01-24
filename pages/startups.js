import React, { useEffect, useState } from "react";
import Head from "next/head";
import Nav from "../components/navbar/NavLayout";
import { Col, Container, Row, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import Filter from "../components/startups/Filter";
import Startup from "../components/startups/Startup";
import FilterOffcanvas from "../components/startups/FilterOffcanvas";
import axios from "axios";
// import { FaFilter } from "react-icons/fa";
const StartupDirectory = () => {
  const [startups, setStartups] = useState([]);
  useEffect(() => {
    axios.get("api/startup").then(async (res) => {
      console.log(res.data);
      setStartups(res.data);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Startups</title>
      </Head>
      <Nav />
      <div>
        <Container fluid className="body">
          <Row
            className="header"
            style={{ height: "fit-content", marginBottom: "50px" }}
          >
            <h1
              style={{
                margin: "20px auto 0px auto",
                fontSize: "4rem",
                color: "black",
              }}
            >
              Startup Directory
            </h1>
          </Row>
          <Row>
            <Filter></Filter>
            <Col className="startups">
              <Row className="search-container">
                <input type="search" name="" id="" placeholder="Search..." />
              </Row>
              <Row style={{ margin: "10px" }} className="filter-offcanvas">
                <FilterOffcanvas style={{ float: "left" }}></FilterOffcanvas>
              </Row>
              <Row className="startups-list">
                {startups.map((post) => {
                  return (
                    <Startup
                      key={post._id}
                      details={post}
                    />
                  );
                })}
                {/* <Startup></Startup>
                <Startup></Startup>
                <Startup></Startup>
                <Startup></Startup>
                <Startup></Startup>
                <Startup></Startup>
                <Startup></Startup>
                <Startup></Startup> */}
              </Row>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <Footer />
        </Container>
      </div>
    </>
  );
};

export default StartupDirectory;
