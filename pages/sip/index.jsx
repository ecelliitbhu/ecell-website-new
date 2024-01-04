import Footer from "@/components/Footer";
import Nav from "@/components/navbar/NavLayout";
import Head from "next/head";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import styles from "@/pages/sip/sip.module.css";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SIP() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [roll, setRoll] = useState();
  const [email, setEmail] = useState();
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [modalErrors, setModalErrors] = useState({});

  /* Toast Functions */
  const showToastMessageSuccess = (success_message) => {
    toast.success(success_message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  const showToastMessageError = (error_message) => {
    toast.error(error_message, {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  /* Modal related Functions */
  const handleModalClose = () => setShow(false);
  const handleModalShow = () => setShow(true);

  const emailVerification = () => {
    // Regular expression to validate email format
    const emailRegex =
      /^[a-zA-Z_.]+\.[a-zA-Z_]+\.(mec|mat|cse|che|ece|eee|met|phy|apd|phe|cer|min|mst)\d{2}@itbhu\.ac\.in$/;

    // Check if the email matches the expected format
    const isIITBHUStudent = emailRegex.test(email);

    setIsValidEmail(isIITBHUStudent);

    if (isIITBHUStudent) {
      return true;
    } else {
      showToastMessageError("Invalid Institute ID");
      return false;
    }
  };

  const setErrors = (field) => {
    if (!!modalErrors[field]) {
      setModalErrors({ ...modalErrors, [field]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const validateField = (fieldName, fieldValue, errorMessage) => {
      if (!fieldValue || fieldValue === "") {
        newErrors[fieldName] = errorMessage;
      }
    };

    // Each filed validation using validateField function
    validateField("name", name, "Please enter your name");
    validateField("roll", roll, "Please enter your roll number");
    validateField("email", email, "Please enter your email");

    // Other validations if required

    return newErrors;
  };

  const handleSubmit = () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setModalErrors(formErrors);
    } else {
      const email_validity = emailVerification();
      if (email_validity == true) {
        window.location.href = "/sip/student";
      } else {
        // handleModalClose();
        console.log("Invalid Email");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Startup Junction</title>
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div>
        <Nav />
        <Container fluid className="body">
          <h1 className={styles.heading}>Startup Internship Portal</h1>
          <Row style={{ marginBottom: "3.2rem" }}>
            <Col>
              <Card style={{ marginRight: "10%" }}>
                <Card.Img variant="top" src="/sip/student.jpg" />
                <Card.Body style={{ marginBottom: "0" }}>
                  <Card.Title>Student</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card content.
                  </Card.Text>
                  <Button
                    style={{ marginTop: "0.8rem" }}
                    variant="primary"
                    onClick={handleModalShow}
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ marginLeft: "10%" }}>
                <Card.Img variant="top" src="/sip/startup.png" height={210} />
                <Card.Body style={{ marginBottom: "0" }}>
                  <Card.Title>Startup</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card content.
                  </Card.Text>
                  <a href="/sip/startup">
                    <Button style={{ marginTop: "0.8rem" }} variant="primary">
                      Read More
                    </Button>
                  </a>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />

        {/* Student Modal */}
        <Modal centered show={show} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Institute Verification</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    placeholder="Bruce Wayne"
                    autoFocus
                    onChange={(e) => {
                      setName(e.target.value);
                      setErrors("name");
                    }}
                    isInvalid={!!modalErrors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {modalErrors.name}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="roll">
                <Form.Label column sm="2">
                  Roll no
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="number"
                    placeholder="21135000"
                    autoFocus
                    onChange={(e) => {
                      setRoll(e.target.value);
                      setErrors("roll");
                    }}
                    isInvalid={!!modalErrors.roll}
                  />
                  <Form.Control.Feedback type="invalid">
                    {modalErrors.roll}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="email">
                <Form.Label column sm="2">
                  Email
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    placeholder="bruce.wayne.mec21@itbhu.ac.in"
                    autoFocus
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors("email");
                    }}
                    isInvalid={!!modalErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {modalErrors.email}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer />
      </div>
    </>
  );
}
