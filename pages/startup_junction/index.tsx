import React, { FunctionComponent } from "react";
import Nav from "@/components/navbar/NavLayout";
import { Container } from "react-bootstrap";
import Footer from "@/components/Footer";

interface OwnProps {}

type Props = OwnProps;

const StartupJunction: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <Nav />
      <Container fluid className="body">
        <h1>Startup Junction</h1>
      </Container>
      <Footer />
    </div>
  );
};

export default StartupJunction;
