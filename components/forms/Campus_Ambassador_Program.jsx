import Form from "react-bootstrap/Form";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { firestoreDB } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useParams, useRouter, useSearchParams } from "next/navigation";


export default function CampusAmbassadorProgram() {
  const router=useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset, watch
  } = useForm({
    defaultValues: {
    }
  });
  const errorShown = useRef(false);
  
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('error');
  
  useEffect(() => {
    if (errorMessage && !errorShown.current) {
      toast.error(decodeURIComponent(errorMessage));
      errorShown.current = true;
    }
  }, [errorMessage]);
  const selectedYear = watch("year");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [otherSelected,setOtherSelected]=useState(false)
  const [loading,setLoading]=useState(false)
  
  const onSubmit = async (data) => {
    setLoading(true)
    if (selectedSkills.length === 0 && !data.otherSkills) {
      toast.error(
        'Please select at least one skill.'
      );
      setLoading(false)
      return;
    }

    if (!data.commitment) {
      setLoading(false)
      toast.error("Please select the number of hours you can commit.");
      return;
    }
    if (selectedSkills.includes("Other Skills")) {
      const index = selectedSkills.indexOf("Other Skills");
      selectedSkills[index] = data.otherSkills;
    }
    data.skills = selectedSkills.join(', '); // Convert array of skills to a single string

    // Sending the form data as a POST request
    try {
      const response = await fetch('https://cell-backend-8gp3.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.fullname,
          collegeName: data.collegename,
          collegeYear: data.year,
          program: data.degreename,
          phone: data.mobileNumber,
          email: data.email,
          POR: data.PoR,
          reasonToJoin: data.Reason,
          roleInStudentBody: data.role,
          skills: data.skills, // Now a single string of skills
          experience: data.previousExperiences,
          roleInEcell: data.previousAssociation,
          hours: data.commitment,
          contribution: data.contribute,
          motivation: data.otherPoints,
        }),
      });

      const result = await response.json();

    if (response.ok) {
      // Successfully registered
      toast.success('User successfully registered!');
      setLoading(false)
      console.log(result);
      router.push("/")
    } else {
      setLoading(false)
      toast.error(`Error: ${result.error}`);
    }
  } catch (error) {
    console.error('Error registering user:', error);
    toast.error('Failed to register user');
  }
    
  };

  return (
    <div className={"form-card"}>
      <div className={"form-card-content"}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className={"name-college"}>
            <Form.Group className="mb-3" controlId="fullname">
              <Form.Label style={{ fontSize: "1.2rem" }}>
                Full Name<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name"
                {...register("fullname", { required: true })}
                className="mb-2"
              />
              {errors.fullname && (
                <span className="mt-2" style={{ color: "red" }}>
                  Please provide your full name.
                </span>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="collegename">
              <Form.Label style={{ fontSize: "1.2rem" }}>
                College/School Name<span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Your College/School Name"
                {...register("collegename", { required: true })}
                className="mb-2"
              />
              {errors.collegename && (
                <span style={{ color: "red" }}>
                  Please provide your college/school name
                </span>
              )}
            </Form.Group>
          </div>

          <div className={"selectyear"}>
            <Form.Group className="mb-3" controlId="year">
              <Form.Label>
                Select your year <span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                placeholder="Open this select menu"
                {...register("year", { required: true })}
                className="mb-2"
              >
                <option value="" selected disabled hidden>Open this select menu</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>

                <option value="other">Other</option>
                {/* <input type="text" id="otherYear" name="otherYear" disabled></input> */}
              </Form.Select>
              {errors.year && (
                <span style={{ color: "red" }}>Please select your year</span>
              )}
              {selectedYear == "other" && <>
                <Form.Control
                  type="text"
                  placeholder="Your answer"
                  {...register("otherYear", { required: selectedSkills.length==0 })}
                  className="mb-2"
                />
              </>}
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="Degree">
            <Form.Label style={{ fontSize: "1.2rem" }}>
              Degree/Program<span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Your answer"
              {...register("degreename", { required: true })}
              className="mb-2"
            />
            {errors.degreename && (
              <span style={{ color: "red" }}>
                Please provide your degree/program
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="MobileNumber">
            <Form.Label>
              Mobile Number<span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              type="number"
              placeholder="9999888877"
              {...register("mobileNumber", { required: true })}
              className="mb-2"
            />
            {errors.mobileNumber && (
              <span style={{ color: "red" }}>
                Please provide your mobile number
              </span>
            )}
          </Form.Group>

          <div className={"email"}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>
                Email address(Please enter the email you want the updates on) <span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email will be used for logging in dashboard"
                {...register("email", { required: true })}
                className="mb-2"
              />
              {errors.email && (
                <span style={{ color: "red" }}>
                  Please provide your email id
                </span>
              )}
            </Form.Group>
          </div>

          <Form.Group className="mb-3" controlId="PoR">
            <Form.Label>
              Any Position of Responsibility held earlier (if any) ?
              <span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Your PoRs here..."
              {...register("PoR", { required: true })}
              className="mb-2"
            />
            {errors.PoR && (
              <span style={{ color: "red" }}>
                Please answer this section.
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="Reason">
            <Form.Label>
              Why are you interested in joining the Campus Ambassador Program ?
              <span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter your reason here..."
              {...register("Reason", { required: true })}
              className="mb-2"
            />
            {errors.Reason && (
              <span style={{ color: "red" }}>
                Please answer this section.
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="Role">
            <Form.Label>
              Have you been a part of any Student Body or Organizations ? Please mention your role .
              <span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Your answer here..."
              {...register("role", { required: true })}
              className="mb-2"
            />
            {errors.role && (
              <span style={{ color: "red" }} >
                Please answer this section.
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3 flex flex-col" controlId="skills">
            <Form.Label>
              What Skills do you think you can contribute in the Campus Ambassador Program?{' '}
              <span style={{ color: 'red' }}>*</span>
            </Form.Label>

            {['Communication', 'Team Management', 'Event Coordination', 'Public Speaking', 'Social Media Marketing'].map(
              (skill) => (
                <div className="flex gap-3" key={skill}>
                  <input
                    type="checkbox"
                    name="skills"
                    value={skill}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedSkills([...selectedSkills, e.target.value]);
                      } else {
                        setSelectedSkills(selectedSkills.filter(skill => skill !== e.target.value));
                      }
                    }}
                  />
                  <span>{skill}</span>
                  <br />
                </div>
              )
            )}
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <input
                  type="checkbox"
                  name="other"
                  value="Other Skills"
                  onChange={(e) => {
                    setOtherSelected(e.target.checked);
                    if (e.target.checked) {
                      setSelectedSkills([...selectedSkills, "Other Skills"]);
                    } else {
                      setSelectedSkills(selectedSkills.filter(skill => skill !== "Other Skills"));
                    }
                  }}
                />
                <span> Other Skills: </span>
              </div>
              {otherSelected && (<Form.Control controlId="otherSkills" as="textarea" {...register("otherSkills", { required: selectedSkills.length==0 })}
                className="mb-2"
              />)}
            </div>
            <br />
            {errors.otherSkills && (
              <span style={{ color: "red" }}>
                Please select at least one skill.
              </span>
            )}
          </Form.Group>


          <Form.Group className="mb-3" controlId="PreviousExperiences">
            <Form.Label>
              Any Previous Experience in the Campus Ambassador program?
              <span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter your previous experiences here..."
              {...register("previousExperiences", { required: true })}
              className="mb-2"
            />
            {errors.previousExperiences && (
              <span style={{ color: "red" }}>
                Please answer this section.
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="PreviousAssociation">
            <Form.Label>
              Any Previous Association with E-Cell IIT BHU? If yes, please describe your role and contributions.
              <span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter your answer here..."
              {...register("previousAssociation", { required: true })}
              className="mb-2"
            />
            {errors.previousAssociation && (
              <span style={{ color: "red" }}>
                Please answer this section.
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="Commitment">
            <Form.Label>
              How many hours per week can you commit to this program ?
              <span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              {...register("commitment", { required: true })}
            >
              <option>Open this select menu </option>
              <option value="5">1-5</option>
              <option value="10">5-10</option>
              <option value="15">10-15</option>
              <option value="20">15-20</option>

            </Form.Select>
            {errors.commitment && (
              <span style={{ color: "red" }}>Please select number of hours</span>
            )}
          </Form.Group>


          <Form.Group className="mb-3" controlId="Contribute">
            <Form.Label>
              How would you contribute in the Campus Ambassador's Program ?
              <span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Your answer here..."
              {...register("contribute", { required: true })}
              className="mb-2"
            />
            {errors.contribute && (
              <span style={{ color: "red" }}>
                Please answer this section.
              </span>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="otherPoints">
            <Form.Label>
              Is there anything else you'd like us to know about you or your motivation to join the Campus Ambassador Program ?
              <span style={{ color: "red" }}> *</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Your answer here..."
              {...register("otherPoints", { required: true })}
              className="mb-2"
            />
            {errors.otherPoints && (
              <span style={{ color: "red" }}>
                Please answer this section.
              </span>
            )}
          </Form.Group>


          <div className="d-grid gap-2">
            <Button disabled={loading}  variant="primary" type={"submit"} size="lg">
              Submit
            </Button>
          </div>
          <DevTool control={control} placement="top-right" />
        </Form>
      </div >
    </div >
  );
}