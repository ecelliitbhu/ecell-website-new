import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-hot-toast";

import { firestoreDB } from "@/lib/firebase";

import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

const VERTICALS = [
  {
    name: "Design",
    description:
      "The Design Team is responsible for creating all of the visual materials for E-Summit, including the logo, website, posters, and social media graphics.",
  },
  {
    name: "Operations and marketing",
    description:
      "The Operations and Marketing Team is responsible for planning and executing all of the logistics for E-Summit, including registration, ticketing, sponsorships, and vendor relations. ",
  },
  {
    name: "Social Media and Content",
    description:
      "The Social Media and Content Team is responsible for creating and managing all of the social media content for E-Summit. They will also be responsible for creating other content, such as blog posts, articles, and videos.",
  },
  {
    name: "Publicity",
    description:
      "The Publicity Team is responsible for generating media coverage for E-Summit. They will also be responsible for managing the reputation of E-Summit. They will also be responsible for promoting the event through various channels, including social media, email, and print.",
  },
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
    reset,
  } = useForm();
  const [commitmentValue, setCommitmentValue] = useState(5);
  const handleCommitmentChange = (event) => {
    setCommitmentValue(parseInt(event.target.value));
  };

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const customDocId = data.fullname + data.branch;
      const docRef = doc(firestoreDB, "teamExpansionESummit24", customDocId);

      await setDoc(docRef, {
        ...data,
        timestamp: serverTimestamp(),
      });

      console.log("Document written with ID: ", customDocId);
      toast.success("Form submitted successfully!");
      reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error submitting form");
    }
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
          <Form.Group className="mb-3" controlId="year">
            <Form.Label>
              Select your year <span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...register("year", { required: true })}
            >
              <option>Open this select menu</option>
              <option value="1st year">1st year</option>
              <option value="2nd year">2nd year</option>
              {/* <option value="3rd year">3rd year</option>
              <option value="4th year">4th year</option>
              <option value="5th year">5th year</option> */}
            </Form.Select>
            {errors.course && (
              <span style={{ color: "red" }}>Please select your year</span>
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
              {/* <option value="MTech">MTech</option>
              <option value="PhD">PhD</option> */}
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
            <Form.Label>Select interested teams</Form.Label>
            <div style={{ paddingLeft: ".825rem" }}>
              {VERTICALS.map((vertical) => (
                <div key={vertical.name}>
                  <Form.Check
                    key={vertical.name}
                    style={{ fontSize: "1.2rem" }}
                    type="checkbox"
                    label={vertical.name}
                    value={vertical.name}
                    {...register("interestedTeams")}
                  />
                  <p className={"form-card-description"}>
                    {vertical.description}
                  </p>
                </div>
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
