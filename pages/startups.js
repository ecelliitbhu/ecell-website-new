import React, { useEffect, useState } from "react";
import Head from "next/head";
import Nav from "../components/navbar/NavLayout";
import { Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Filter from "../components/startups/Filter";
import Startup from "../components/startups/Startup";
import FilterOffcanvas from "../components/startups/FilterOffcanvas";
import { StartupList } from "../components/startupList";
import axios from "axios";
const StartupDirectory = () => {
  const [startups, setStartups] = useState(StartupList);
  useEffect(() => {
    axios
      .get("https://startup-directory.herokuapp.com/startups")
      .then(async (res) => {
        // console.log(res.data);
        setStartups(res.data);
      });
  }, []);
  const [search, setSearch] = useState("");
  return (
    <>
      <Head>
        <title>Startups</title>
        <link rel="shortcut icon" href="/favicon.ico" />
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="filter-container">
              <Filter></Filter>
            </div>

            <div className="startups">
              <Row className="search-container">
                <input
                  type="search"
                  name=""
                  id=""
                  placeholder="Search for startup's name, founder, category, foundation year..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </Row>
              <Row style={{ margin: "10px" }} className="filter-offcanvas">
                <FilterOffcanvas style={{ float: "left" }}></FilterOffcanvas>
              </Row>
              <Row className="startups-list">
                {startups.map((post) => {
                  if (
                    post.Name.toLowerCase().includes(search.toLowerCase()) ||
                    post.domain.toLowerCase().includes(search.toLowerCase()) ||
                    post.description
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    post.yearOfGraduation
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    post.founders[0].founder
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    post.founders[1].founder
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    post.founders[2].founder
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    post.founders[3].founder
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    post.founders[4].founder
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return <Startup key={post._id} details={post} />;
                  }
                })}
              </Row>
            </div>
          </div>
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
