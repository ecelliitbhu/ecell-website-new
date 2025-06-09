import Form from "react-bootstrap/Form";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-hot-toast";

import { firestoreDB } from "@/lib/firebase";

import { doc, setDoc, serverTimestamp } from "firebase/firestore";



const VERTICALS = [
  {
    name: "Design Team",
    description:
    "The Design Team at E-Cell is responsible for creating all visual graphics, including the logo, website, posters, and social media graphics, ensuring a cohesive and engaging visual identity for the organisation."
  },
  {
    name:"SAP Team",
    description:
    "The Student Assistance Program (SAP) team of E-Cell IIT BHU supports student startups by providing essential resources, connections, and guidance to help turn their ideas into reality."
  },
  {
    name: "Tech Team",
    description:
      "The tech team of E-Cell IIT(BHU) manages the digital infrastructure, including website development, website maintenance, and technical support for all events and initiatives.",
  },
  {
    name: "Branding Team",
    description:
      "Branding team is dedicated towards crafting a compelling and unique identity of E-Cell, enhancing our presence and fostering a strong, cohesive image. We blend creativity with strategy to engage our community and amplify our message.",
  },
  {
    name: "Relations Team",
    description:
      "Relations Team at E-Cell cultivates partnerships with industry leaders, investors, and VCs, fostering innovation, growth, and enriching the events with sponsors and esteemed speakers.",
  },
  {
    name: "Strategy and Outreach",
    description:
      "The Strategy and Outreach Team of E-Cell drives entrepreneurial growth through robust partnerships with like minded institutions and organisations. We also develop and implement strategies to amplify E-Cell’s online presence and engage with the broader community to raise awareness about E-Cell and its initiatives."
  },
{
    name: "Innovation and Incubation Team",
    description:
      "The INI Vertical ensures seamless coordination between IIT BHU Incubators and E-Cell by handling all the official tasks. We are also responsible for coordinating with PG students facilitating commercialisation of their researches.",
  },
{
    name: "Events Team",
    description:
      "Events Team is responsible for handling and organizing all the events, webinars, and workshops, conducted by E-Cell during the course of the session.",
  },
{
    name: "Video Editing Team",
    description:
      "Responsible for creating, editing, and producing engaging video content for E-Cell events, promotions, and social media channels, thereby creating an impact on audience."
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
  "Engineering Physics",
  "Chemistry",
  "Material Science and Technology",
];
export default function TeamExpansionForm2024() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      interestedTeams: []
    }});

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (e, vertical) => {
    const updatedSelections = e.target.checked
      ? [...selectedOptions, vertical]
      : selectedOptions.filter((item) => item !== vertical);

    setSelectedOptions(updatedSelections);
  };

  const getPreferenceText = (vertical) => {
    const index = selectedOptions.indexOf(vertical);
    if (index === 0) return 'First preference';
    if (index === 1) return 'Second preference';
    if (index === 2) return 'Third preference';
    return '';
  };

  const [commitmentValue, setCommitmentValue] = useState(5);
  const handleCommitmentChange = (event) => {
    setCommitmentValue(parseInt(event.target.value));
  };

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const customDocId = data.fullname + data.branch;
      const docRef = doc(firestoreDB, "TeamExpansion_E-Cell_2024", customDocId);

      await setDoc(docRef, {
        ...data,
        timestamp: serverTimestamp(),
      });

      // console.log("Document written with ID: ", customDocId);
      toast.success("Form submitted successfully! See you in the E-Cell Team !",{
        duration: 4000});
      reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error submitting form",{
        duration: 4000});
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
              {/* <option value="1st year">1st year</option> */}
              <option value="2nd year">2nd year</option>
               <option value="3rd year">3rd year</option>
              <option value="4th year">4th year</option>
              <option value="5th year">5th year</option>
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
            <Form.Label>Select interested teams according to preference </Form.Label>
            <div style={{ paddingLeft: ".825rem" }}>
              {VERTICALS.map((vertical) => (
                <div key={vertical.name}>
                   <Controller
              name="interestedTeams"
              control={control}
              render={({ field }) => (
                <Form.Check
                  key={vertical.name}
                  style={{ fontSize: "1.2rem" }}
                  type="checkbox"
                  label={vertical.name}
                  value={vertical.name}
                  onChange={(e) => {
                    const updatedValue = e.target.checked
                      ? [...(field.value || []), vertical.name]
                      : (field.value || []).filter((item) => item !== vertical.name);

                    field.onChange(updatedValue);
                    handleCheckboxChange(e, vertical.name);
                  }}
                  checked={field.value?.includes(vertical.name)}
                  disabled={!field.value?.includes(vertical.name) && selectedOptions.length >= 3}
                />
              )}
            />
                   {selectedOptions.includes(vertical.name) && (
              <span style={{ color: 'red', marginLeft: '1rem' }}>
                {getPreferenceText(vertical.name)}
              </span>
            )}
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
