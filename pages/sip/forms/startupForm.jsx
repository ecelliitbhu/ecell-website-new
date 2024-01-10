import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { hiringProfiles, passoutsOptions } from "./data";
import {
  addDataToStartupModal,
  addJdfileToCloudStorage,
} from "./databaseInteractions";

function StartupForm() {
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [applicableCandidates, setApplicableCandidates] = useState([]);
  const [selectedLoc, setSelectedLoc] = useState("remote");
  // Hriring Profiles states
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [isProfilesOthersChecked, setIsProfilesOthersChecked] = useState(false);
  const [profilesOthersText, setProfilesOthersText] = useState(null);
  // Job Description states
  const [jdfile, setJdfile] = useState(null);
  const [jdfileUrl, setJdfileUrl] = useState(null);
  const [jdfileTextarea, setJdfileTextarea] = useState("");
  // Joining Date states
  const [selectedCheckbox, setSelectedCheckbox] = useState("immediate-check");
  const [joiningDate, setJoiningDate] = useState("immediate");

  // const generatePdf = () => {
  //   console.log("Under generating pdf");
  //   const pdf = new jsPDF();
  //   pdf.text(jdfileTextarea, 10, 10);

  //   // Save the PDF as a file
  //   const pdfBlob = pdf.output("blob");
  //   saveAs(pdfBlob, "generated.pdf");

  //   // Convert the file to a data URL and save it to state
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setJdfile(reader.result);
  //   };
  //   reader.readAsDataURL(pdfBlob);
  // };

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

  /* -----------------------Function----------------------- */
  // Function to handle Date of Joining
  const handleCheckboxChange = (id) => {
    setSelectedCheckbox(id);
    setJoiningDate(id === "immediate-check" ? "immediate" : "");
  };
  const handleTextChange = (event) => {
    setJoiningDate(event.target.value);
  };

  // Function to handle checkbox changes in selected profiles
  const handleHiringProfilesCheckboxes = (label) => {
    setSelectedProfiles((prevSelected) => {
      // If label is in the array, remove it; otherwise, add it
      if (prevSelected.includes(label)) {
        return prevSelected.filter((profile) => profile !== label);
      } else {
        return [...prevSelected, label];
      }
    });
  };

  // Function to handle checkbox changes in selected applicableCandidates
  const handleApplicableCandidates = (label) => {
    setApplicableCandidates((prevSelected) => {
      // If label is in the array, remove it; otherwise, add it
      if (prevSelected.includes(label)) {
        return prevSelected.filter((option) => option !== label);
      } else {
        return [...prevSelected, label];
      }
    });
  };

  const setField = (field, val) => {
    setData({ ...data, [field]: val });
    if (!!errors[field]) {
      setErrors({ ...errors, [field]: null });
    }
  };

  const validateForm = () => {
    const {
      email,
      company_name,
      poc_email,
      poc_linkedin,
      poc_contact,
      company_pos_web,
      stipend,
      loc,
    } = data;
    const newErrors = {};

    const validateField = (fieldName, fieldValue, errorMessage) => {
      if (!fieldValue || fieldValue === "") {
        newErrors[fieldName] = errorMessage;
      }
    };

    // Each filed validation using validateField function
    validateField("email", email, "Please enter your email");
    validateField(
      "company_name",
      company_name,
      "Please enter your company name"
    );
    validateField("poc_email", poc_email, "Please enter your POC email");
    validateField(
      "poc_linkedin",
      poc_linkedin,
      "Please provide your POC linekdin account"
    );
    validateField("poc_contact", poc_contact, "Please enter your POC contact");
    validateField(
      "company_pos_web",
      company_pos_web,
      "Please enter URL for your company's POC website"
    );
    validateField("stipend", stipend, "Please enter stipend amount");

    // Other validations if required
    // Validate that at least one hiring profile is selected
    if (selectedProfiles.length === 0 && isProfilesOthersChecked === false) {
      console.log("profiles error");
      newErrors.hiringProfiles = "Please select at least one hiring profile";
    }

    // Validate that at least one applicableCandidates is selected
    if (applicableCandidates.length === 0) {
      console.log("Applicable Candidates error");
      newErrors.applicableCandidates =
        "Please select at least one Applicable Candidates";
    }
    // console.log(`jdfile :${jdfile}`);
    // console.log(`text area :${jdfileTextarea}`);

    // Validate the JD fields
    if (jdfileTextarea === "") {
      if (jdfile === null || jdfile === undefined) {
        console.log("job description error 1");
        newErrors.jdfileTextarea = "Please provide your Job Description";
      }
    } else {
      if (jdfile != null) {
        console.log("job description error 2");
        newErrors.jdfileTextarea =
          "Please choose either to upload a PDF for the JD OR enter your JD in the provided text area";
      }
    }

    return newErrors;
  };

  const handleSubmitHelper = async (profile_other_text) => {
    console.log(`profile_other_text  : ${profile_other_text}`);
    const formErrors = validateForm();
    // If there are errors in any field
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      showToastMessageError("Please enter all the Fields");
    } else {
      console.log("Form Submitted!!");
      console.log(data);
      showToastMessageSuccess("Form Submitted");

      console.log(`jdfile :${jdfile}`);
      console.log(`text area :${jdfileTextarea}`);

      if (jdfileTextarea !== "") {
        console.log(`jd text:${jdfileTextarea}`);
        // Storing form data to database
        try {
          const documentId = await addDataToStartupModal(
            data,
            profile_other_text,
            selectedProfiles,
            applicableCandidates,
            selectedLoc,
            joiningDate,
            null, // Use jdUrl directly here instead of jdfileUrl
            jdfileTextarea
          );

          // router.push("/sip");
          window.location.href = "/sip";
        } catch (error) {
          console.error("Failed to add data to Firestore: ", error);
          showToastMessageError("Failed to add data");
        }
      } else {
        try {
          const jdUrl = await addJdfileToCloudStorage(jdfile);
          setJdfileUrl(jdUrl);
          console.log("JD uploaded successfully!");

          // Storing form data to database
          try {
            const documentId = await addDataToStartupModal(
              data,
              profile_other_text,
              selectedProfiles,
              applicableCandidates,
              selectedLoc,
              joiningDate,
              jdUrl, // Use jdUrl directly here instead of jdfileUrl
              ""
            );

            // router.push("/sip");
            window.location.href = "/sip";
          } catch (error) {
            console.error("Failed to add data to Firestore: ", error);
            showToastMessageError("Failed to add data");
          }
        } catch (jdError) {
          console.error("Failed to upload JD file: ", jdError);
          showToastMessageError("Failed to upload Job Description");
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(`ProfilesOthersChecked :${isProfilesOthersChecked}`);
    // console.log(`joiningDate :${joiningDate}`);

    if (isProfilesOthersChecked == false) {
      setProfilesOthersText(null);
      const resp = handleSubmitHelper(null);
    } else {
      const resp = handleSubmitHelper(profilesOthersText);
    }
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      style={{
        padding: "2rem 8rem 2rem 6rem",
        marginBottom: "2rem",
        border: "1px solid #ccc",
        borderRadius: "0.5rem",
      }}
    >
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>
          Email address<span style={{ color: "red" }}> *</span>
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={data.email}
          onChange={(e) => setField("email", e.target.value)}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="company_name">
        <Form.Label>
          Company Name<span style={{ color: "red" }}> *</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="OpenAI"
          value={data.company_name}
          onChange={(e) => setField("company_name", e.target.value)}
          isInvalid={!!errors.company_name}
        />
        <Form.Control.Feedback type="invalid">
          {errors.company_name}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="poc_email">
        <Form.Label>
          Email of POC<span style={{ color: "red" }}> *</span>
        </Form.Label>
        <Form.Control
          type="email"
          placeholder=""
          value={data.poc_email}
          onChange={(e) => setField("poc_email", e.target.value)}
          isInvalid={!!errors.poc_email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.poc_email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="poc_linkedin">
        <Form.Label>
          Linkedin Account of POC<span style={{ color: "red" }}> *</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder=""
          value={data.poc_linkedin}
          onChange={(e) => setField("poc_linkedin", e.target.value)}
          isInvalid={!!errors.poc_linkedin}
        />
        <Form.Control.Feedback type="invalid">
          {errors.poc_linkedin}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="poc_contact">
        <Form.Label>
          Contact Number of POC<span style={{ color: "red" }}> *</span>
        </Form.Label>
        <Form.Control
          type="number"
          placeholder=""
          value={data.poc_contact}
          onChange={(e) => setField("poc_contact", e.target.value)}
          isInvalid={!!errors.poc_contact}
        />
        <Form.Control.Feedback type="invalid">
          {errors.poc_contact}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="company_pos_web">
        <Form.Label>
          Company&aposs Website<span style={{ color: "red" }}> *</span>
        </Form.Label>
        <Form.Control
          type="url"
          placeholder=""
          value={data.company_pos_web}
          onChange={(e) => setField("company_pos_web", e.target.value)}
          isInvalid={!!errors.company_pos_web}
        />
        <Form.Control.Feedback type="invalid">
          {errors.company_pos_web}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <span>
          <span>Hiring for profiles</span>
          <span style={{ color: "red" }}> *</span>
        </span>
      </Row>
      <Form.Group className="mb-3" controlId="hiring_profiles">
        {/* All Hiring Profiles */}
        {hiringProfiles.map((profile, index) => (
          <Form.Check
            key={`default-checkbox-${index}`}
            type="checkbox"
            id={`default-checkbox-${index}`}
            label={profile}
            onChange={() => handleHiringProfilesCheckboxes(profile)}
          />
        ))}
        <Row className="mb-3">
          <Col sm="1" style={{ width: "2%" }}>
            <Form.Check
              aria-label="Others"
              id="default-checkbox-others"
              onChange={(e) => {
                setIsProfilesOthersChecked(!isProfilesOthersChecked);
              }}
              checked={isProfilesOthersChecked}
            />
          </Col>
          <Col sm="11" style={{ width: "98%" }}>
            <Form.Control
              type="text"
              size="sm"
              placeholder="Others"
              value={isProfilesOthersChecked ? profilesOthersText || "" : ""}
              onChange={(e) => {
                setProfilesOthersText(e.target.value);
              }}
              disabled={!isProfilesOthersChecked}
            />
          </Col>
        </Row>
      </Form.Group>

      <br />
      <Row>
        <span>
          <span>Applicable Candidates for Internship</span>
          <span style={{ color: "red" }}> *</span>
        </span>
      </Row>
      <Form.Group className="mb-3" controlId="applicable_candidates">
        {/* All Passout Options */}
        {passoutsOptions.map((option, index) => (
          <Form.Check
            key={`checkbox-passouts-${index}`}
            type="checkbox"
            id={`checkbox-passouts-${index}`}
            label={option}
            onChange={() => handleApplicableCandidates(option)}
          />
        ))}
      </Form.Group>

      <br />
      <Row>
        <span>
          <span>Location of Internship</span>
          <span style={{ color: "red" }}> *</span>
        </span>
      </Row>
      <Form.Select
        aria-label="Location of Internship"
        name="loc"
        size="sm"
        defaultValue="remote"
        value={selectedLoc}
        onChange={(e) => setSelectedLoc(e.target.value)}
      >
        <option value="remote">Remote</option>
        <option value="onsite">Onsite</option>
        <option value="hybrid">Hybrid</option>
      </Form.Select>

      <br />
      <Row>
        <span>
          <span>Date of Joining (Mention the date if not Immediate)</span>
          <span style={{ color: "red" }}> *</span>
        </span>
      </Row>
      <Form.Group controlId="date-of-joining" className="mb-3">
        <Form.Check
          type="checkbox"
          id="immediate-check"
          label="Immediate"
          checked={selectedCheckbox === "immediate-check"}
          onChange={() => handleCheckboxChange("immediate-check")}
        />
        <Row>
          <Col sm="1" style={{ width: "2%" }}>
            <Form.Check
              aria-label="Others"
              id="default-checkbox-others"
              checked={selectedCheckbox === "default-checkbox-others"}
              onChange={() => handleCheckboxChange("default-checkbox-others")}
            />
          </Col>
          <Col sm="11" style={{ width: "98%" }}>
            <Form.Control
              type="text"
              size="sm"
              placeholder="Others"
              value={
                selectedCheckbox === "immediate-check" ? "Others" : joiningDate
              }
              onChange={handleTextChange}
              disabled={selectedCheckbox !== "default-checkbox-others"}
            />
          </Col>
        </Row>
      </Form.Group>

      <br />
      <Form.Group controlId="jdfile" className="mb-3">
        <Form.Label>
          Job Description (Please Upload the Job Description Text/Link Here)
          <span style={{ color: "red" }}> *</span>
        </Form.Label>
        <Form.Control
          type="file"
          value={data.jdfile}
          onChange={(e) => {
            setJdfile(e.target.files[0]);
          }}
          isInvalid={!!errors.jdfile}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Or</Form.Label>
        <Form.Control
          as="textarea"
          value={jdfileTextarea}
          onChange={(e) => {
            setJdfileTextarea(e.target.value);
          }}
          isInvalid={!!errors.jdfileTextarea}
          rows={4}
          placeholder="Write your Job Description here"
        />
        <Form.Control.Feedback type="invalid">
          {errors.jdfileTextarea}
        </Form.Control.Feedback>
      </Form.Group>

      <br />
      <Form.Group className="mb-3" controlId="stipend">
        <Form.Label>
          Stipend (Per Month)<span style={{ color: "red" }}> *</span>
        </Form.Label>
        <Form.Control
          type="number"
          placeholder="Write 20 for 20k rupees"
          value={data.stipend}
          onChange={(e) => setField("stipend", e.target.value)}
          isInvalid={!!errors.stipend}
        />
        <Form.Control.Feedback type="invalid">
          {errors.stipend}
        </Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <br />
      <br />
    </Form>
  );
}

export default StartupForm;
