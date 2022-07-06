import React, { useEffect, useState } from "react";
import Head from "next/head";
import Nav from "../components/navbar/NavLayout";
import { Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Filter from "../components/startups/Filter";
import Startup from "../components/startups/Startup";
import FilterOffcanvas from "../components/startups/FilterOffcanvas";
import { ref, get } from "firebase/database";
import { firebaseDB } from "../lib/firebase";
import Image from "next/image";
const StartupDirectory = () => {
  const [startups, setStartups] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    get(ref(firebaseDB, `startupDirectory/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setStartups(Object.entries(snapshot.val()));
        } else {
          console.log("No data available");
        }
        setIsloading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const isOkay = (post) => {
    return (
      (post[1].name &&
        post[1].name.toLowerCase().includes(search.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(search.toLowerCase())) ||
      (post[1].year &&
        post[1].year.toLowerCase().includes(search.toLowerCase())) ||
      (post[1].founders &&
        post[1].founders[0] &&
        post[1].founders[0].founder
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (post[1].founders &&
        post[1].founders[1] &&
        post[1].founders[1].founder
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (post[1].founders &&
        post[1].founders[2] &&
        post[1].founders[2].founder
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (post[1].founders &&
        post[1].founders[3] &&
        post[1].founders[3].founder
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (post[1].founders &&
        post[1].founders[4] &&
        post[1].founders[4].founder
          .toLowerCase()
          .includes(search.toLowerCase()))
    );
  };
  const [search, setSearch] = useState("");
  return (
    <>
      <Head>
        <title>Startups</title>
        <meta name="robots" content="index, follow" />
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
                fontSize: "3rem",
                color: "black",
                fontWeight: "bold",
              }}
            >
              IIT BHU Startup Directory
            </h1>
          </Row>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="filter-container">
              <Filter />
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
                <FilterOffcanvas style={{ float: "left" }} />
              </Row>
              {isLoading ? (
                <div className="loadingGif">
                  <Image
                    src="/loading.gif"
                    width="300"
                    alt="Loading..."
                    height="300"
                  />
                </div>
              ) : (
                <Row className="startups-list">
                {startups.map((post) => {
                  if (isOkay(post))
                    return <Startup key={post[0]} details={post[1]} />;
                })}
              </Row>
              )}
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
