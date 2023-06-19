import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-hot-toast";

import { firestoreDB } from "../../lib/firebase";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const VERTICALS = [
  "Startup Assistance Program",
  "Events Team",
  "Branding Team",
  "Technical Team",
  "Strategic Relations Team",
  "Cisco thingQbator",
  "Innovation & Incubation Team",
];
const BRANCHES = [
  "Architecture, Planning and Design",
  "Biomedical Engineering",
  "Ceramic Engineering",
  "Chemical Engineering",
  "Civil Engineering",
  "Computer Science and Engineering",
  "Electrical Engineering",
  "Electronics Engineering",
  "Mechanical Engineering",
  "Metallurgical Engineering",
  "Mining Engineering",
  "Pharmaceutical Engineering and Technology",
  "Biochemical Engineering",
  "Industrial Chemistry",
  "Mathematical Sciences",
  "Physics",
  "Chemistry",
  "Material Science and Technology",
];
export default function TeamExpansionForm2023() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm();
  const [commitmentValue, setCommitmentValue] = useState(5);
  const handleCommitmentChange = (event) => {
    setCommitmentValue(parseInt(event.target.value));
  };

  const onSubmit = (data) => {
    // console.log(data);
    addDoc(collection(firestoreDB, "teamExpansion2023"), {
      ...data,
      timestamp: serverTimestamp(),
    })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        toast.success("Form submitted successfully!");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.error("Error submitting form");
      });

    console.log(data);
  };
  return (
    <div className={"form-card"}>
      <div className={"form-card-content"}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className={"name-email"}>
            <Form.Group className="mb-3" controlId="FullName">
              <Form.Label style={{ fontSize: "1.2rem" }}>
                Full Name<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Bill Gates"
                {...register("fullname", { required: true })}
              />
              {errors.fullname && (
                <span style={{ color: "red" }}>
                  Please provide your full name
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>
                Email address<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="name@itbhu.ac.in"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span style={{ color: "red" }}>
                  Please provide your institute email
                </span>
              )}
            </Form.Group>
          </div>
          <Form.Group className="mb-3" controlId="PhoneNumber">
            <Form.Label>
              Phone Number(WhatsApp)<span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="9999888877"
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber && (
              <span style={{ color: "red" }}>
                Please provide your phone number
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Course">
            <Form.Label>
              Select your course <span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...register("course", { required: true })}
            >
              <option>Open this select menu</option>
              <option value="BTech">BTech</option>
              <option value="BArch">BArch</option>
              <option value="IDD">IDD</option>
              <option value="MTech">MTech</option>
              <option value="PhD">PhD</option>
            </Form.Select>
            {errors.course && (
              <span style={{ color: "red" }}>Please select your course</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Branch">
            <Form.Label>
              Select your branch <span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...register("branch", { required: true })}
            >
              <option>Open this select menu</option>
              {BRANCHES.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </Form.Select>
            {errors.branch && (
              <span style={{ color: "red" }}>Please select your branch</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="Verticals">
            <Form.Label>Select interested verticals</Form.Label>
            <div style={{ paddingLeft: ".825rem" }}>
              {VERTICALS.map((vertical) => (
                <Form.Check
                  key={vertical}
                  className={"form-card-description"}
                  type="checkbox"
                  label={vertical}
                  value={vertical}
                  {...register("interestedVerticals")}
                />
              ))}
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Commitment">
            <Form.Label>Commitment (hours per week)</Form.Label>
            <Form.Range
              {...register("commitmentHours")}
              min={1}
              max={20}
              defaultValue={5}
              onChange={handleCommitmentChange}
            />
            <div>Selected Range: {commitmentValue}</div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="Reason">
            <Form.Label>
              Why do you wish to join E-Cell IIT BHU and the above selected
              teams(s)? <span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter your reason here..."
              {...register("reason", { required: true })}
            />
            {errors.reason && (
              <span style={{ color: "red" }}>
                Please provide your reason to join E-Cell
              </span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="PreviousExperiences">
            <Form.Label>
              Previous experiences in student organization/management (please
              mention in points)
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter your previous experiences here..."
              {...register("previousExperiences")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="NonAcademicEngagements">
            <Form.Label>Any non-academic engagements?</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter your non-academic engagements here..."
              {...register("nonAcademicEngagements")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="OtherPoints">
            <Form.Label>Any other point(s) you wish to mention</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter any other points here..."
              {...register("otherPoints")}
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type={"submit"} size="lg">
              Submit
            </Button>
          </div>
          <DevTool control={control} placement="top-right" />
        </Form>
      </div>
    </div>
  );
}
