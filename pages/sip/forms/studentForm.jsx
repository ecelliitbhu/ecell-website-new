import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import {
  addDataToStudentModal,
  addResumeToCloudStorage,
} from "./databaseInteractions";

function StudentForm() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    year: "",
    email: "",
    contactNumber: "",
    proposedJoiningDate: "",
    applyingPosition: "",
    resume: null,
    linkedinId: "",
    githubId: "",
  });

  const generalFields = [
    "name",
    "year",
    "email",
    "contactNumber",
    "proposedJoiningDate",
    "applyingPosition",
  ];

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
        {generalFields.map((field) => (
          <Col key={field} md="6" className="mb-4">
            <Form.Group controlId={field}>
              <Form.Label>
                {field === "proposedJoiningDate"
                  ? "Proposed Joining Date"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </Form.Label>
              <Form.Control
                type={
                  field === "email"
                    ? "email"
                    : field === "contactNumber"
                    ? "number"
                    : "text"
                }
                placeholder={`Enter your ${field
                  .replace(/([A-Z])/g, " $1")
                  .trim()}`}
                required
                value={formData[field]}
                onChange={handleChange}
                style={{ width: "80%" }}
              />
              <Form.Control.Feedback type="invalid">{`Please enter your ${field
                .replace(/([A-Z])/g, " $1")
                .trim()}.`}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        ))}
      </Row>
      <Row className="mb-2 mt-0">
        {["linkedinId", "githubId"].map((field) => (
          <Col key={field} md="6" className="mb-4">
            <Form.Group controlId={field}>
              <Form.Label>
                {field === "linkedinId"
                  ? "LinkedIn ID"
                  : "GitHub ID (Optional)"}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter your ${field
                  .replace(/([A-Z])/g, " $1")
                  .trim()}`}
                value={formData[field]}
                onChange={handleChange}
                required={field === "linkedinId"}
                style={{ width: "80%" }}
              />
              {field === "linkedinId" && (
                <Form.Control.Feedback type="invalid">
                  Please enter your LinkedIn ID.
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </Col>
        ))}
      </Row>
      <Form.Group className="mb-4" controlId="resume">
        <Form.Label>Resume (PDF)</Form.Label>
        <Form.Control
          type="file"
          accept=".pdf"
          required
          onChange={handleChange}
          style={{ width: "90%" }}
        />
        <Form.Control.Feedback type="invalid">
          Please upload a PDF resume.
        </Form.Control.Feedback>
      </Form.Group>
      <Button className="mt-2" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default StudentForm;
