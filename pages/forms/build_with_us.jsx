import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../components/Footer";
import Nav from "../../components/navbar/NavLayout";
import Build_us_with from "../../components/forms/Build_us_with";

function build_with_us() {
  return (
    <>
      <Head>
        <title>Build With Us Cohort</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div>
        <Container fluid className="body">
          <Row
            className="header"
            style={{ height: "fit-content", marginBottom: "10px" }}
          >
            <div style={{ margin: "50px auto 0px auto" }}>
              <Image
                src="/bulid_with_us.jpeg"
                alt="build_with_us"
                height={500}
                width={2000}
                layout="responsive"
              ></Image>
            </div>

            <h1
              style={{
                margin: "50px auto 5px auto",
                textAlign: "center",
                fontSize: "2.7rem",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Build With Us Cohort
            </h1>
            <p
              style={{
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              A program to catalyse the journey of starting up a successful
              venture for budding entrepreneurs who just have an idea.
            </p>
            {/* <Row className='cf'>
                            <Col style={{fontWeight: "bold", fontSize: "1.2rem",width:"max-content",padding:"0"}}>Have An Idea ?</Col>
                            <Col style={{fontWeight: "bold", fontSize: "1.2rem",width:"max-content",padding:"0"}}><span>&#11044;</span> Build With Us<span>&#11044;</span></Col>
                            <Col style={{fontWeight: "bold", fontSize: "1.2rem",width:"max-content",padding:"0"}}> Launch With US</Col>
                        </Row> */}
            <div className="veer">
              <p>To know more details about Cohort visit:</p>
              <p
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <a
                  href="https://www.instagram.com/p/CiDdL8xBI80/?utm_source=ig_web_copy_link"
                  target={"_blank"}
                  rel={"noreferrer"}
                >
                  events.ecelliitbhu.com/info-cohort
                </a>
              </p>
              <p>
                Have an idea?<span style={{ margin: "0 1%" }}>&#11044;</span>
                Build With Us<span style={{ margin: "0 1%" }}>&#11044;</span>
                Launch With Us{" "}
              </p>
            </div>
          </Row>
          <Row>
            <Build_us_with />
          </Row>
          <Footer />
        </Container>
      </div>
    </>
  );
}

export default build_with_us;
