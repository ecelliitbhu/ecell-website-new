import React, { useEffect, useState } from "react";
import Head from "next/head";
import Nav from "../components/navbar/NavLayout";
import { Container, Row, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import Filter from "../components/startups/Filter";
import Startup from "../components/startups/Startup";
import FilterOffcanvas from "../components/startups/FilterOffcanvas";
import { ref, get, once, onValue } from "firebase/database";
import { firebaseDB } from "../lib/firebase";
import Image from "next/image";
import Link from "next/link";
const StartupDirectory = () => {
  const [startups, setStartups] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [domainFiltersList, setDomainFiltersList] = useState([]);
  const [foundedInFiltersList, setFoundedInFiltersList] = useState([]);
  useEffect(() => {
    onValue(
      ref(firebaseDB, `startupDirectory/`),
      (snapshot) => {
        if (snapshot.exists()) {
          // console.log(Object.entries(snapshot.val()));
          setStartups(Object.entries(snapshot.val()));
        } else {
          console.log("No data available");
        }
        setIsloading(false);
      },
      (error) => console.log(error)
    );
  }, []);
  const isDomainOkay = (post) => {
    if (domainFiltersList.length === 0) {
      // if no filters are selected then show all posts
      return true;
    } else {
      return domainFiltersList.includes(post[1].domain.toLowerCase());
    }
  };
  const isFoundedInOkay = (post) => {
    if (foundedInFiltersList.length === 0) {
      // if no filters are selected then show all posts
      return true;
    } else {
      for (let i = 0; i < foundedInFiltersList.length; i++) {
        if (
          post[1].year >= foundedInFiltersList[i].start &&
          post[1].year < foundedInFiltersList[i].end
        ) {
          return true;
        }
      }
    }
    return false;
  };
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

  const searchedStartups = startups.filter(
    (post) => isOkay(post) && isDomainOkay(post) && isFoundedInOkay(post)
  );

  const unavailableStartup = () => {
    return (
      <h3
        style={{
          margin: "25vh auto",
          fontSize: "2rem",
          width: "80%",
          color: "red",
          height: "fit-content !important",
          textAlign: "center",
        }}
      >
        No results found!
      </h3>
    );
  };

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
                textAlign: "center",
              }}
            >
              IIT BHU Startup Directory
            </h1>
          </Row>
          <div style={{ display: "flex", justifyContent: "left", gap: "20px" }}>
            <aside
              style={{
                position: "sticky",
                top: "5rem",
                display: "block !important",
                height: "calc(96vh - 4rem)",
                // paddingLeft: "0.25rem",
                // marginLeft: "-0.25rem",
                overflowY: "auto",
                overflowY: "hidden",
              }}
            >
              <div
                className="filter-container"
                style={{ width: "fit-content" }}
              >
                <Filter
                  domainFiltersList={domainFiltersList}
                  setDomainFiltersList={setDomainFiltersList}
                  foundedInFiltersList={foundedInFiltersList}
                  setFoundedInFiltersList={setFoundedInFiltersList}
                />
              </div>
            </aside>
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
                <FilterOffcanvas
                  style={{ float: "left" }}
                  domainFiltersList={domainFiltersList}
                  setDomainFiltersList={setDomainFiltersList}
                  foundedInFiltersList={foundedInFiltersList}
                  setFoundedInFiltersList={setFoundedInFiltersList}
                />
              </Row>
              <Link href="/forms/add_startup">
                <Button
                  style={{
                    backgroundColor: "#fb6930",
                    color: "white",
                    margin: "20px 0 0 0",
                  }}
                >
                  Fill out the form here to add your startup
                </Button>
              </Link>
              {/* <div style={{ textAlign: "center", maxWidth: "40vw" }}>
                {!isLoading && unavailableStartup()}
              </div> */}
              {isLoading ? (
                <div className="loadingGif">
                  <Image
                    src="/loading.gif"
                    width="300"
                    alt="Loading..."
                    height="300"
                  />
                </div>
              ) : searchedStartups.length == 0 ? (
                unavailableStartup()
              ) : (
                <Row className="startups-list">
                  {searchedStartups.map((startup) => (
                    <Startup key={startup[0]} details={startup[1]} />
                  ))}
                </Row>
              )}
            </div>
          </div>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <lottie-player
              src="https://assets5.lottiefiles.com/packages/lf20_m6cuL6.json"
              background="transparent"
              speed="1"
              style={{
                height: "100%",
                width: "80%",
                marginBottom: "80px",
              }}
              loop
              autoplay
            ></lottie-player>
          </div> */}
          <Footer />
        </Container>
      </div>
      <script
        async
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
      ></script>
    </>
  );
};

export default StartupDirectory;
