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
const StartupDirectory = () => {
  const [startups, setStartups] = useState([]);
  useEffect(() => {
    get(ref(firebaseDB, `startupDirectory/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setStartups(Object.entries(snapshot.val()));
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [val1, setVal1] = useState(true)
  const [val2, setVal2] = useState(true)
  const [val3, setVal3] = useState(true)
  const [val4, setVal4] = useState(true)
  const [val5, setVal5] = useState(true)
  const [val6, setVal6] = useState(true)
  const [val7, setVal7] = useState(true)
  const [val8, setVal8] = useState(true)
  const [val9, setVal9] = useState(true)
  const [val10, setVal10] = useState(true)
  const [val11, setVal11] = useState(true)
  const [val12, setVal12] = useState(true)
  const [val13, setVal13] = useState(true)
  const [val14, setVal14] = useState(true)
  const [val15, setVal15] = useState(true)
  const [dta1, setDta1] = useState('  ')
  const [dta2, setDta2] = useState('  ')
  const [dta3, setDta3] = useState('  ')
  const [dta4, setDta4] = useState('  ')
  const [dta5, setDta5] = useState('  ')
  const [dta6, setDta6] = useState('  ')
  const [dta7, setDta7] = useState('  ')
  const [dta8, setDta8] = useState('  ')
  const [dta9, setDta9] = useState('  ')
  const [dta10, setDta10] = useState('  ')
  const [dta11, setDta11] = useState('  ')
  const [dta12, setDta12] = useState('  ')
  const [dta13, setDta13] = useState('  ')
  const [dta14, setDta14] = useState('  ')
  const [dta15, setDta15] = useState('  ')
  const handleChange=(data)=>{
    if (data === 'AgriTech') {
      if (val1 === true && dta1 === '  ') {
        setDta1(data);
      }
      setVal1(!val1)
      if (dta1 === 'AgriTech') {
        setDta1('  ')
      }
    }
    if (data === 'FinTech') {
      if (val2 === true && dta2 === '  ') {
        setDta2(data);
      }
      setVal2(!val2)
      if (dta2 === 'FinTech') {
        setDta2('  ')
      }
    }
    if (data === 'E-Commerce') {
      if (val3 === true && dta3 === '  ') {
        setDta3(data);
      }
      setVal3(!val3)
      if (dta3 === 'E-Commerce') {
        setDta3('  ')
      }
    }
    if (data === 'EdTech') {
      if (val4 === true && dta4 === '  ') {
        setDta4(data);
      }
      setVal4(!val4)
      if (dta4 === 'EdTech') {
        setDta4('  ')
      }
    }
    if (data === 'AdTech') {
      if (val5 === true && dta5 === '  ') {
        setDta5(data);
      }
      setVal5(!val5)
      if (dta5 === 'AdTech') {
        setDta5('  ')
      }
    }
    if (data === 'TravelTech') {
      if (val6 === true && dta6 === '  ') {
        setDta6(data);
      }
      setVal6(!val6)
      if (dta6 === 'TravelTech') {
        setDta6('  ')
      }
    }
    if (data === 'Electric Vehicles') {
      if (val7 === true && dta7 === '  ') {
        setDta7(data);
      }
      setVal7(!val7)
      if (dta7 === 'Electric Vehicles') {
        setDta7('  ')
      }
    }
    if (data === 'HealthTech') {
      if (val8 === true && dta8 === '  ') {
        setDta8(data);
      }
      setVal8(!val8)
      if (dta8 === 'HealthTech') {
        setDta8('  ')
      }
    }
    if (data === 'IT Sector') {
      if (val9 === true && dta9 === '  ') {
        setDta9(data);
      }
      setVal9(!val9)
      if (dta9 === 'IT Sector') {
        setDta9('  ')
      }
    }
    if (data === 'Logistics') {
      if (val10 === true && dta10 === '  ') {
        setDta10(data);
      }
      setVal10(!val10)
      if (dta10 === 'Logistics') {
        setDta10('  ')
      }
    }
    if (data === 'Retail') {
      if (val11 === true && dta11 === '  ') {
        setDta11(data);
      }
      setVal11(!val11)
      if (dta11 === 'Retail') {
        setDta11('  ')
      }
    }
    if (data === 'Startup Ecosystem') {
      if (val12 === true && dta12 === '  ') {
        setDta12(data);
      }
      setVal12(!val12)
      if (dta12 === 'Startup Ecosystem') {
        setDta12('  ')
      }
    }
    if (data === 'EnterpriseTech') {
      if (val13 === true && dta13 === '  ') {
        setDta13(data);
      }
      setVal13(!val13)
      if (dta13 === 'EnterpriseTech') {
        setDta13('  ')
      }
    }
    if (data === 'Consultancy Services') {
      if (val14 === true && dta14 === '  ') {
        setDta14(data);
      }
      setVal14(!val14)
      if (dta14 === 'Consultancy Services') {
        setDta14('  ')
      }
    }
    if (data === 'InsurTech') {
      if (val15 === true && dta15 === '  ') {
        setDta15(data);
      }
      setVal15(!val15)
      if (dta15 === 'InsurTech') {
        setDta15('  ')
      }
    }
  }

  const [dummy, setDummy] = useState('')
  const click1 = () => {
    if (dta1!=='  ') {
      if (dta2!=='  ' || dta3!=='  ' || dta4!=='  ' || dta5!=='  ' || dta6!=='  ' || dta7!=='  ' || dta8!=='  ' || dta9!=='  ' || dta10!=='  ' || dta11!=='  ' || dta12!=='  ' || dta13!=='  ' || dta14!=='  ' || dta15!=='  '){
        setDummy('  ')
      }
      else{
        setDummy('')
      }
    }
    if (dta1 === '  '){
      setDummy('  ')
    }
  }
  const click2 = () => {
    if (dta2!=='  ') {
      if (dta1!=='  ' || dta3!=='  ' || dta4!=='  ' || dta5!=='  ' || dta6!=='  ' || dta7!=='  ' || dta8!=='  ' || dta9!=='  ' || dta10!=='  ' || dta11!=='  ' || dta12!=='  ' || dta13!=='  ' || dta14!=='  ' || dta15!=='  '){
        setDummy('  ')
      }
      else{
        setDummy('')
      }
    }
    if (dta2 === '  '){
      setDummy('  ')
    }
  }
  const click3 = () => {
    if (dta3!=='  ') {
      if (dta1!=='  ' || dta2!=='  ' || dta4!=='  ' || dta5!=='  ' || dta6!=='  ' || dta7!=='  ' || dta8!=='  ' || dta9!=='  ' || dta10!=='  ' || dta11!=='  ' || dta12!=='  ' || dta13!=='  ' || dta14!=='  ' || dta15!=='  '){
        setDummy('  ')
      }
      else{
        setDummy('')
      }
    }
    if (dta3 === '  '){
      setDummy('  ')
    }
  }
  const click4 = () => {
    if (dta4!=='  ') {
      if (dta1!=='  ' || dta2!=='  ' || dta3!=='  ' || dta5!=='  ' || dta6!=='  ' || dta7!=='  ' || dta8!=='  ' || dta9!=='  ' || dta10!=='  ' || dta11!=='  ' || dta12!=='  ' || dta13!=='  ' || dta14!=='  ' || dta15!=='  '){
        setDummy('  ')
      }
      else{
        setDummy('')
      }
    }
    if (dta4 === '  '){
      setDummy('  ')
    }
  }
  const click5 = () => {
    if (dta5!=='  ') {
      if (dta1!=='  ' || dta2!=='  ' || dta3!=='  ' || dta4!=='  ' || dta6!=='  ' || dta7!=='  ' || dta8!=='  ' || dta9!=='  ' || dta10!=='  ' || dta11!=='  ' || dta12!=='  ' || dta13!=='  ' || dta14!=='  ' || dta15!=='  '){
        setDummy('  ')
      }
      else{
        setDummy('')
      }
    }
    if (dta5 === '  '){
      setDummy('  ')
    }
  }
  const click6 = () => {
    if (dta6!=='  ') {
      if (dta1!=='  ' || dta2!=='  ' || dta3!=='  ' || dta4!=='  ' || dta5!=='  ' || dta7!=='  ' || dta8!=='  ' || dta9!=='  ' || dta10!=='  ' || dta11!=='  ' || dta12!=='  ' || dta13!=='  ' || dta14!=='  ' || dta15!=='  '){
        setDummy('  ')
      }
      else{
        setDummy('')
      }
    }
    if (dta6 === '  '){
      setDummy('  ')
    }
  }
  const click7 = () => {
    if (dta7!=='  ') {
      if (dta1!=='  ' || dta2!=='  ' || dta3!=='  ' || dta4!=='  ' || dta5!=='  ' || dta6!=='  ' || dta8!=='  ' || dta9!=='  ' || dta10!=='  ' || dta11!=='  ' || dta12!=='  ' || dta13!=='  ' || dta14!=='  ' || dta15!=='  '){
        setDummy('  ')
      }
      else{
        setDummy('')
      }
    }
    if (dta7 === '  '){
      setDummy('  ')
    }
  }
  const click8 = () => {
    if (dta8!=='  ') {
      if (dta1!=='  ' || dta2!=='  ' || dta3!=='  ' || dta4!=='  ' || dta5!=='  ' || dta6!=='  ' || dta7!=='  ' || dta9!=='  ' || dta10!=='  ' || dta11!=='  ' || dta12!=='  ' || dta13!=='  ' || dta14!=='  ' || dta15!=='  '){
        setDummy('  ')
      }
      else{
        setDummy('')
      }
    }
    if (dta8 === '  '){
      setDummy('  ')
    }
  }
  const click9 = () => {
    if (dta9!=='  ') {
      if (dta1!=='  ' || dta2!=='  ' || dta3!=='  ' || dta4!=='  ' || dta5!=='  ' || dta6!=='  ' || dta7!=='  ' || dta8!=='  ' || dta10!=='  ' || dta11!=='  ' || dta12!=='  ' || dta13!=='  ' || dta14!=='  ' || dta15!=='  '){
        setDummy('  ')
      }
      else{
        setDummy('')
      }
    }
    if (dta9 === '  '){
      setDummy('  ')
    }
  }
  const click10 = () => {
    if (dta10!=='  ') {
      if (dta1!=='  ' || dta2!=='  ' || dta3!=='  ' || dta4!=='  ' || dta5!=='  ' || dta6!=='  ' || dta7!=='  ' || dta8!=='  ' || dta9!=='  ' || dta11!=='  ' || dta12!=='  ' || dta13!=='  ' || dta14!=='  ' || dta15!=='  '){
        setDummy('  ')
      }
      else{
        setDummy('')
      }
    }
    if (dta10 === '  '){
      setDummy('  ')
    }
  }
  const click11 = () => {
    if (dta11!=='  ') {
      if (dta1!=='  ' || dta2!=='  ' || dta3!=='  ' || dta4!=='  ' || dta5!=='  ' || dta6!=='  ' || dta7!=='  ' || dta8!=='  ' || dta9!=='  ' || dta10!=='  ' || dta12!=='  ' || dta13!=='  ' || dta14!=='  ' || dta15!=='  '){
        setDummy('  ')
      }
      else{
        setDummy('')
      }
    }
    if (dta11 === '  '){
      setDummy('  ')
    }
  }
  const click12 = () => {
    if (dta12!=='  ') {
      if (dta1!=='  ' || dta2!=='  ' || dta3!=='  ' || dta4!=='  ' || dta5!=='  ' || dta6!=='  ' || dta7!=='  ' || dta8!=='  ' || dta9!=='  ' || dta10!=='  ' || dta11!=='  ' || dta13!=='  ' || dta14!=='  ' || dta15!=='  '){
        setDummy('  ')
      }
      else{
        setDummy('')
      }
    }
    if (dta12 === '  '){
      setDummy('  ')
    }
  }
  const click13 = () => {
    if (dta13!=='  ') {
      if (dta1!=='  ' || dta2!=='  ' || dta3!=='  ' || dta4!=='  ' || dta5!=='  ' || dta6!=='  ' || dta7!=='  ' || dta8!=='  ' || dta9!=='  ' || dta10!=='  ' || dta11!=='  ' || dta12!=='  ' || dta14!=='  ' || dta15!=='  '){
        setDummy('  ')
      }
      else{
        setDummy('')
      }
    }
    if (dta13 === '  '){
      setDummy('  ')
    }
  }
  const click14 = () => {
    if (dta14!=='  ') {
      if (dta1!=='  ' || dta2!=='  ' || dta3!=='  ' || dta4!=='  ' || dta5!=='  ' || dta6!=='  ' || dta7!=='  ' || dta8!=='  ' || dta9!=='  ' || dta10!=='  ' || dta11!=='  ' || dta12!=='  ' || dta13!=='  ' || dta15!=='  '){
        setDummy('  ')
      }
      else{
        setDummy('')
      }
    }
    if (dta14 === '  '){
      setDummy('  ')
    }
  }
  const click15 = () => {
    if (dta15!=='  ') {
      if (dta1!=='  ' || dta2!=='  ' || dta3!=='  ' || dta4!=='  ' || dta5!=='  ' || dta6!=='  ' || dta7!=='  ' || dta8!=='  ' || dta9!=='  ' || dta10!=='  ' || dta11!=='  ' || dta12!=='  ' || dta13!=='  ' || dta14!=='  '){
        setDummy('  ')
      }
      else{
        setDummy('')
      }
    }
    if (dta15 === '  '){
      setDummy('  ')
    }
  }

  const isOkay = (post) => {
    return (
      ((post[1].name &&
        post[1].name.toLowerCase().includes(search.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(search.toLowerCase())) ||
      (post[1].description &&
        post[1].description.toLowerCase().includes(search.toLowerCase())) ||
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
        post[1].domain.toLowerCase().includes(dta1.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(dta2.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(dta3.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(dta4.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(dta5.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(dta6.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(dta7.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(dta8.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(dta9.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(dta10.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(dta11.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(dta12.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(dta13.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(dta14.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(dta15.toLowerCase())) ||
      (post[1].domain &&
        post[1].domain.toLowerCase().includes(dummy.toLowerCase()))))
  };

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
              <Filter click1={click1} click2={click2} click3={click3} click4={click4} click5={click5} click6={click6} click7={click7} click8={click8} click9={click9} click10={click10} click11={click11} click12={click12} click13={click13} click14={click14} click15={click15} val1={val1} val2={val2} val3={val3} val4={val4} val5={val5} val6={val6} val7={val7} val8={val8} val9={val9} val10={val10} val11={val11} val12={val12} val13={val13} val14={val14} val15={val15} change1={() => handleChange('AgriTech')} change2={() => handleChange('FinTech')} change3={() => handleChange('E-Commerce')} change4={() => handleChange('EdTech')} change5={() => handleChange('AdTech')} change6={() => handleChange('TravelTech')} change7={() => handleChange('Electric Vehicles')} change8={() => handleChange('HealthTech')} change9={() => handleChange('IT Sector')} change10={() => handleChange('Logistics')} change11={() => handleChange('Retail')} change12={() => handleChange('Startup Ecosystem')} change13={() => handleChange('Enterprise Tech')} change14={() => handleChange('Consultancy Services')} change15={() => handleChange('InsurTech')}></Filter>
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
                  if (isOkay(post))
                    return <Startup key={post[0]} details={post[1]} />;
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
