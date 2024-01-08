import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { ToastContainer, toast } from "react-toastify";
import {
  addDataToStudentModal,
  addResumeToCloudStorage,
} from "./databaseInteractions";

function StudentForm({ hiringProfilesString, applicableCandidatesString }) {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    email: "",
    contactNumber: "",
    applyingPosition: "",
    resume: null,
    linkedinId: "",
    githubId: "",
  });

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

  /* Handler Functions */
  const handleChange = (event) => {
    const { id, value, files } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "resume" ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hello");

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    // Process or submit the form data as needed
    console.log("Form Data:", formData);
    console.log("Resume :", formData.resume);

    try {
      showToastMessageSuccess("Form Submitted");
      const resume_url = await addResumeToCloudStorage(formData.resume);

      // Storing form data to database
      try {
        // showToastMessageSuccess("Form Submitted");
        const documentId = await addDataToStudentModal(formData, resume_url);
        window.location.href = "/sip";
      } catch (error) {
        console.error("Failed to add data to Firestore: ", error);
        // showToastMessageError("Failed to add data");
      }
    } catch (resumeError) {
      console.error("Failed to upload resume: ", resumeError);
      // showToastMessageError("Failed to upload Resume");
    }
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="">
        <Col md="6" className="mb-4">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              required
              value={formData.name}
              onChange={handleChange}
              style={{ width: "80%" }}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your name
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md="6" className="mb-4">
          <Form.Group controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Select
              required
              value={formData.year}
              onChange={handleChange}
              style={{ width: "80%" }}
            >
              <option value="" disabled>
                Select Year
              </option>
              {applicableCandidatesString.split("$").map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please enter the year
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="">
        <Col md="6" className="mb-4">
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
              style={{ width: "80%" }}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your email
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col md="6" className="mb-4">
          <Form.Group controlId="contactNumber">
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter your contact number"
              required
              value={formData.contactNumber}
              onChange={handleChange}
              style={{ width: "80%" }}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your contact number
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-2 mt-0">
        <Col md="6" className="mb-4">
          <Form.Group controlId="linkedinId">
            <Form.Label>LinkedIn ID (Optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your LinkedIn ID"
              value={formData.linkedinId}
              onChange={handleChange}
              style={{ width: "80%" }}
            />
          </Form.Group>
        </Col>

        <Col md="6" className="mb-4">
          <Form.Group controlId="githubId">
            <Form.Label>GitHub ID (Optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your GitHub ID"
              value={formData.githubId}
              onChange={handleChange}
              style={{ width: "80%" }}
            />
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md="6">
          <Form.Group controlId="applyingPosition">
            <Form.Label>Applying Position</Form.Label>
            <Form.Select
              required
              value={formData.applyingPosition}
              onChange={handleChange}
              style={{ width: "80%" }}
            >
              <option value="" disabled>
                Select Position
              </option>
              {hiringProfilesString.split("$").map((position, index) => (
                <option key={index} value={position}>
                  {position}
                </option>
              ))}
              {/* Add more options as needed */}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please enter your applying position
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="">
        <Col md="12">
          <Form.Group controlId="resume">
            <Form.Label>Resume (PDF)</Form.Label>
            <Form.Control
              type="file"
              accept=".pdf"
              required
              onChange={handleChange}
              style={{ width: "90%" }}
            />

            <Form.Control.Feedback type="invalid">
              Please upload a PDF resume
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Button className="mt-3" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default StudentForm;
