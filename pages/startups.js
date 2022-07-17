import React, { useEffect, useState } from "react";
import Head from "next/head";
import Nav from "../components/navbar/NavLayout";
import { Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Filter from "../components/startups/Filter";
import Startup from "../components/startups/Startup";
import FilterOffcanvas from "../components/startups/FilterOffcanvas";
import { ref, get, once, onValue } from "firebase/database";
import { firebaseDB } from "../lib/firebase";
import Image from "next/image";
const StartupDirectory = () => {
  const [startups, setStartups] = useState([]);
  const [isLoading, setIsloading] = useState(true);
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


  const [agritech, setAgritech] = useState("  ")
  const [fintech, setFintech] = useState("  ")
  const [ecommerce, setEcommerce] = useState("  ")
  const [edtech, setEdtech] = useState("  ")
  const [adtech, setAdtech] = useState("  ")
  const [traveltech, setTraveltech] = useState("  ")
  const [electricvehicles, setElectricvehicles] = useState("  ")
  const [healthtech, setHealthtech] = useState("  ")
  const [itsector, setItsector] = useState("  ")
  const [logistics, setLogistics] = useState("  ")
  const [retail, setRetail] = useState("  ")
  const [startupecosystem, setStartupecosystem] = useState("  ")
  const [enterprisetech, setEnterprisetech] = useState("  ")
  const [consultancyservices, setConsultancyservices] = useState("  ")
  const [insurtech, setInsurtech] = useState("  ")
  const [dummy, setDummy] = useState("")

  const agritechf = () => {
    if (agritech === "  ") { setAgritech("agritech") }
    else if (agritech === "agritech") { setAgritech("  ") }
    if (fintech === "  " && agritech !== "  " && ecommerce === "  " && edtech === "  " &&
      adtech === "  " && traveltech === "  " && electricvehicles === "  " &&
      healthtech === "  " && itsector === "  " && logistics === "  " && retail === "  " &&
      startupecosystem === "  " && enterprisetech === "  " && consultancyservices === "  " && insurtech === "  ") { setDummy("") }
    else { setDummy("  ") }
  }
  const fintechf = () => {
    if (fintech === "  ") { setFintech("fintech") }
    else if (fintech === "fintech") { setFintech("  ") }
    if (fintech !== "  " && agritech === "  " && ecommerce === "  " && edtech === "  " &&
      adtech === "  " && traveltech === "  " && electricvehicles === "  " &&
      healthtech === "  " && itsector === "  " && logistics === "  " && retail === "  " &&
      startupecosystem === "  " && enterprisetech === "  " && consultancyservices === "  " && insurtech === "  ") { setDummy("") }
    else { setDummy("  ") }
  }
  const ecommercef = () => {
    if (ecommerce === "  ") { setEcommerce("e-commerce") }
    else if (ecommerce === "e-commerce") { setEcommerce("  ") }
    if (fintech === "  " && agritech === "  " && ecommerce !== "  " && edtech === "  " &&
      adtech === "  " && traveltech === "  " && electricvehicles === "  " &&
      healthtech === "  " && itsector === "  " && logistics === "  " && retail === "  " &&
      startupecosystem === "  " && enterprisetech === "  " && consultancyservices === "  " && insurtech === "  ") { setDummy("") }
    else { setDummy("  ") }
  }
  const edtechf = () => {
    if (edtech === "  ") { setEdtech("edtech"); setDummy("  ") }
    else if (edtech === "edtech") { setEdtech("  "); setDummy("  ") }
    if (fintech === "  " && agritech === "  " && ecommerce === "  " && edtech !== "  " &&
      adtech === "  " && traveltech === "  " && electricvehicles === "  " &&
      healthtech === "  " && itsector === "  " && logistics === "  " && retail === "  " &&
      startupecosystem === "  " && enterprisetech === "  " && consultancyservices === "  " && insurtech === "  ") { setDummy("") }
    else { setDummy("  ") }
  }
  const adtechf = () => {
    if (adtech === "  ") { setAdtech("adtech"); setDummy("  ") }
    else if (adtech === "adtech") { setAdtech("  "); setDummy("  ") }
    if (fintech === "  " && agritech === "  " && ecommerce === "  " && edtech === "  " &&
      adtech !== "  " && traveltech === "  " && electricvehicles === "  " &&
      healthtech === "  " && itsector === "  " && logistics === "  " && retail === "  " &&
      startupecosystem === "  " && enterprisetech === "  " && consultancyservices === "  " && insurtech === "  ") { setDummy("") }
    else { setDummy("  ") }
  }
  const traveltechf = () => {
    if (traveltech === "  ") { setTraveltech("traveltech") }
    else if (traveltech === "traveltech") { setTraveltech("  ") }
    if (fintech === "  " && agritech === "  " && ecommerce === "  " && edtech === "  " &&
      adtech === "  " && traveltech !== "  " && electricvehicles === "  " &&
      healthtech === "  " && itsector === "  " && logistics === "  " && retail === "  " &&
      startupecosystem === "  " && enterprisetech === "  " && consultancyservices === "  " && insurtech === "  ") { setDummy("") }
    else { setDummy("  ") }
  }
  const electricvehiclesf = () => {
    if (electricvehicles === "  ") { setElectricvehicles("electric vehicles") }
    else if (electricvehicles === "electric vehicles") { setElectricvehicles("  ") }
    if (fintech === "  " && agritech === "  " && ecommerce === "  " && edtech === "  " &&
      adtech === "  " && traveltech === "  " && electricvehicles !== "  " &&
      healthtech === "  " && itsector === "  " && logistics === "  " && retail === "  " &&
      startupecosystem === "  " && enterprisetech === "  " && consultancyservices === "  " && insurtech === "  ") { setDummy("") }
    else { setDummy("  ") }
  }
  const healthtechf = () => {
    if (healthtech === "  ") { setHealthtech("healthtech") }
    else if (healthtech === "healthtech") { setHealthtech("  ") }
    if (fintech === "  " && agritech === "  " && ecommerce === "  " && edtech === "  " &&
      adtech === "  " && traveltech === "  " && electricvehicles === "  " &&
      healthtech !== "  " && itsector === "  " && logistics === "  " && retail === "  " &&
      startupecosystem === "  " && enterprisetech === "  " && consultancyservices === "  " && insurtech === "  ") { setDummy("") }
    else { setDummy("  ") }
  }
  const itsectorf = () => {
    if (itsector === "  ") { setItsector("it sector") }
    else if (itsector === "it sector") { setItsector("  ") }
    if (fintech === "  " && agritech === "  " && ecommerce === "  " && edtech === "  " &&
      adtech === "  " && traveltech === "  " && electricvehicles === "  " &&
      healthtech === "  " && itsector !== "  " && logistics === "  " && retail === "  " &&
      startupecosystem === "  " && enterprisetech === "  " && consultancyservices === "  " && insurtech === "  ") { setDummy("") }
    else { setDummy("  ") }
  }
  const logisticsf = () => {
    if (logistics === "  ") { setLogistics("logistics") }
    else if (logistics === "logistics") { setLogistics("  ") }
    if (fintech === "  " && agritech === "  " && ecommerce === "  " && edtech === "  " &&
      adtech === "  " && traveltech === "  " && electricvehicles === "  " &&
      healthtech === "  " && itsector === "  " && logistics !== "  " && retail === "  " &&
      startupecosystem === "  " && enterprisetech === "  " && consultancyservices === "  " && insurtech === "  ") { setDummy("") }
    else { setDummy("  ") }
  }
  const retailf = () => {
    if (retail === "  ") { setRetail("retail") }
    else if (retail === "retail") { setRetail("  ") }
    if (fintech === "  " && agritech === "  " && ecommerce === "  " && edtech === "  " &&
      adtech === "  " && traveltech === "  " && electricvehicles === "  " &&
      healthtech === "  " && itsector === "  " && logistics === "  " && retail !== "  " &&
      startupecosystem === "  " && enterprisetech === "  " && consultancyservices === "  " && insurtech === "  ") { setDummy("") }
    else { setDummy("  ") }
  }
  const startupecosystemf = () => {
    if (startupecosystem === "  ") { setStartupecosystem("startup ecosystem") }
    else if (startupecosystem === "startup ecosystem") { setStartupecosystem("  ") }
    if (fintech === "  " && agritech === "  " && ecommerce === "  " && edtech === "  " &&
      adtech === "  " && traveltech === "  " && electricvehicles === "  " &&
      healthtech === "  " && itsector === "  " && logistics === "  " && retail === "  " &&
      startupecosystem !== "  " && enterprisetech === "  " && consultancyservices === "  " && insurtech === "  ") { setDummy("") }
    else { setDummy("  ") }
  }
  const enterprisetechf = () => {
    if (enterprisetech === "  ") { setEnterprisetech("enterprisetech") }
    else if (enterprisetech === "enterprisetech") { setEnterprisetech("  ") }
    if (fintech === "  " && agritech === "  " && ecommerce === "  " && edtech === "  " &&
      adtech === "  " && traveltech === "  " && electricvehicles === "  " &&
      healthtech === "  " && itsector === "  " && logistics === "  " && retail === "  " &&
      startupecosystem === "  " && enterprisetech !== "  " && consultancyservices === "  " && insurtech === "  ") { setDummy("") }
    else { setDummy("  ") }
  }
  const consultancyservicesf = () => {
    if (consultancyservices === "  ") { setConsultancyservices("consultancy services") }
    else if (consultancyservices === "consultancy services") { setConsultancyservices("  ") }
    if (fintech === "  " && agritech === "  " && ecommerce === "  " && edtech === "  " &&
      adtech === "  " && traveltech === "  " && electricvehicles === "  " &&
      healthtech === "  " && itsector === "  " && logistics === "  " && retail === "  " &&
      startupecosystem === "  " && enterprisetech === "  " && consultancyservices !== "  " && insurtech === "  ") { setDummy("") }
    else { setDummy("  ") }
  }
  const insurtechf = () => {
    if (insurtech === "  ") { setInsurtech("insurtech") }
    else if (insurtech === "insurtech") { setInsurtech("  ") }
    if (fintech === "  " && agritech === "  " && ecommerce === "  " && edtech === "  " &&
      adtech === "  " && traveltech === "  " && electricvehicles === "  " &&
      healthtech === "  " && itsector === "  " && logistics === "  " && retail === "  " &&
      startupecosystem === "  " && enterprisetech === "  " && consultancyservices === "  " && insurtech !== "  ") { setDummy("") }
    else { setDummy("  ") }
  }



  const isOkay = (post) => {
    return (
      ((post[1].name &&
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
            .includes(search.toLowerCase()))) &&
      ((post[1].domain &&
        post[1].domain.toLowerCase().includes(agritech)) ||
        (post[1].domain &&
          post[1].domain.toLowerCase().includes(fintech)) ||
        (post[1].domain &&
          post[1].domain.toLowerCase().includes(ecommerce)) ||
        (post[1].domain &&
          post[1].domain.toLowerCase().includes(edtech)) ||
        (post[1].domain &&
          post[1].domain.toLowerCase().includes(adtech)) ||
        (post[1].domain &&
          post[1].domain.toLowerCase().includes(traveltech)) ||
        (post[1].domain &&
          post[1].domain.toLowerCase().includes(electricvehicles)) ||
        (post[1].domain &&
          post[1].domain.toLowerCase().includes(healthtech)) ||
        (post[1].domain &&
          post[1].domain.toLowerCase().includes(itsector)) ||
        (post[1].domain &&
          post[1].domain.toLowerCase().includes(logistics)) ||
        (post[1].domain &&
          post[1].domain.toLowerCase().includes(retail)) ||
        (post[1].domain &&
          post[1].domain.toLowerCase().includes(startupecosystem)) ||
        (post[1].domain &&
          post[1].domain.toLowerCase().includes(enterprisetech)) ||
        (post[1].domain &&
          post[1].domain.toLowerCase().includes(consultancyservices)) ||
        (post[1].domain &&
          post[1].domain.toLowerCase().includes(insurtech)) ||
        (post[1].domain &&
          post[1].domain.toLowerCase().includes(dummy)))
    );
  };
  const [search, setSearch] = useState("");

  function isValid(value) {
    return value != undefined;
  }
  const searchedStartups = startups.map((post) => {
    if (isOkay(post))
      return <Startup key={post[0]} details={post[1]} />;
  })
  const unavailableStartup = () => {
    if (searchedStartups.filter(isValid).length === 0) {
      return <h3 style={{ marginTop: '5vh' }}>If your startup is not in the list, then please fill the form here, we will add it as soon as possible, and update you as well!</h3>;
    }
  }

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
            <aside style={{
              position: 'sticky',
              top: '5rem',
              display: 'block !important',
              height: 'calc(96vh - 4rem)',
              paddingLeft: '0.25rem',
              marginLeft: '-0.25rem',
              overflowY: 'auto',
            }}>
              <div className="filter-container" style={{ width: '18vw' }}>
                <Filter agritechf={agritechf} fintechf={fintechf} ecommercef={ecommercef}
                  edtechf={edtechf} adtechf={adtechf} traveltechf={traveltechf}
                  electricvehiclesf={electricvehiclesf} healthtechf={healthtechf}
                  itsectorf={itsectorf} logisticsf={logisticsf} retailf={retailf}
                  startupecosystemf={startupecosystemf} enterprisetechf={enterprisetechf}
                  consultancyservicesf={consultancyservicesf} insurtechf={insurtechf}
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
                <FilterOffcanvas style={{ float: "left" }} />
              </Row>
              <div style={{ textAlign: 'center', maxWidth: '40vw' }}>{!isLoading && unavailableStartup()}</div>
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
                  {searchedStartups}
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
