import React from 'react'
import Head from "next/head";
import { Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer";
import Nav from "../../components/navbar/NavLayout";
import Build_us_with from '../../components/forms/Build_us_with';

function build_with_us() {
    return (
        <>
            <Head>
                <title>Build With Us</title>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <Nav />
            <div>
                <Container fluid className="body">
                    <Row
                        className="header"
                        style={{ height: "fit-content", marginBottom: "10px" }}
                    >
                        <h1
                            style={{
                                margin: "50px auto 0px auto",
                                textAlign: "center",
                                fontSize: "2.1rem",
                                color: "black",
                                fontWeight: "bold",
                            }}
                        >
                            Build With Us
                        </h1>
                    </Row>
                    <Row>
                        <Build_us_with />
                    </Row>
                    <Footer />
                </Container>
            </div>
        </>
    )
}

export default build_with_us