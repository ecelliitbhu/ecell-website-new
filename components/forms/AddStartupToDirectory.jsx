import React from "react";
import { ref, push } from "firebase/database";
import { useState } from "react";
import { firebaseDB } from "../../lib/firebase";
import { Row } from "react-bootstrap";

function AddStartupToDirectory() {
  const [form_detail, setForm_detail] = useState({
    Startup_Name: "",
    Founder_Name: "",
    Founder_Oraganisation: "",
    email: "",
    phone_number: "",
    member1_name: "",
    member1_organisation: "",
    member1_email: "",
    member1_phone: "",
    member2_name: "",
    member2_organisation: "",
    member2_email: "",
    member2_phone: "",
    member3_name: "",
    member3_organisation: "",
    member3_email: "",
    member3_phone: "",
    member4_name: "",
    member4_organisation: "",
    member4_email: "",
    member4_phone: "",
    idea_sector: "None",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [text, setText] = useState(false);
  const [idea_Sec, setIdea_Sec] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idea_Sec == "others") {
      if (!text) {
        alert("Blank Idea Sector Not allowed");
        return;
      }
    }
    setIsSubmitting(true);
    const db = firebaseDB;
    push(ref(db, "/build_with_us"), {
      Startup_Name: form_detail.Startup_Name,
      Founder_Name: form_detail.Founder_Name,
      Founder_Oraganisation: form_detail.Founder_Oraganisation,
      email: form_detail.email,
      phone_number: form_detail.phone_number,
      member1_name: form_detail.member1_name,
      member1_organisation: form_detail.member1_organisation,
      member1_email: form_detail.member1_email,
      member1_phone: form_detail.member1_phone,
      member2_name: form_detail.member2_name,
      member2_organisation: form_detail.member2_organisation,
      member2_email: form_detail.member2_email,
      member2_phone: form_detail.member2_phone,
      member3_name: form_detail.member3_name,
      member3_organisation: form_detail.member3_organisation,
      member3_email: form_detail.member3_email,
      member3_phone: form_detail.member3_phone,
      member4_name: form_detail.member4_name,
      member4_organisation: form_detail.member4_organisation,
      member4_email: form_detail.member4_email,
      member4_phone: form_detail.member4_phone,
      idea_sector: form_detail.idea_sector,
    })
      .then(() => {
        setForm_detail({
          Startup_Name: "",
          Founder_Name: "",
          Founder_Oraganisation: "",
          email: "",
          phone_number: "",
          member1_name: "",
          member1_organisation: "",
          member1_email: "",
          member1_phone: "",
          member2_name: "",
          member2_organisation: "",
          member2_email: "",
          member2_phone: "",
          member3_name: "",
          member3_organisation: "",
          member3_email: "",
          member3_phone: "",
          member4_name: "",
          member4_organisation: "",
          member4_email: "",
          member4_phone: "",
          idea_sector: "None",
        });
        setIsSubmitting(false);
        alert("Form Submitted Sucessfully");
      })
      .catch((error) => alert(error.message));
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
    let field = e.target.value;
    setIdea_Sec(field);
    if (field == "Others") {
      setText(true);
    } else {
      setText(false);
      setForm_detail({ ...form_detail, idea_sector: field });
    }
  };

  const handleText = (e) => {
    let text = e.target.value;

    setForm_detail({ ...form_detail, idea_sector: text });
  };

  return (
    <>
      <form
        className="cf teamExpansion-form"
        onSubmit={handleSubmit}
        style={{ width: "95%", maxWidth: "800px" }}
      >
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Name of startup/idea</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="First Cry"
            value={form_detail.Startup_Name}
            onChange={(e) =>
              setForm_detail({ ...form_detail, Startup_Name: e.target.value })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              {`Founder's Name`} <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="Ethan Hunt"
            value={form_detail.Founder_Name}
            onChange={(e) =>
              setForm_detail({ ...form_detail, Founder_Name: e.target.value })
            }
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              {`Founder's Institute/Organisation`}{" "}
              <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="IIT Varanasi(BHU)"
            value={form_detail.Founder_Oraganisation}
            onChange={(e) =>
              setForm_detail({
                ...form_detail,
                Founder_Oraganisation: e.target.value,
              })
            }
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              {`Founder's Email`} <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="ethanhunt@gmail.com"
            value={form_detail.email}
            onChange={(e) =>
              setForm_detail({ ...form_detail, email: e.target.value })
            }
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              {`Founder's Contact No.`} <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="8978545852"
            value={form_detail.phone_number}
            onChange={(e) =>
              setForm_detail({ ...form_detail, phone_number: e.target.value })
            }
            required
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 1 Name</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="Ethan Hunt"
            value={form_detail.member1_name}
            onChange={(e) =>
              setForm_detail({ ...form_detail, member1_name: e.target.value })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 1 Email</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="ethan_hunt@gmail.com"
            value={form_detail.member1_email}
            onChange={(e) =>
              setForm_detail({ ...form_detail, member1_email: e.target.value })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 1 Institue/Organisation</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="Name of your organisation"
            value={form_detail.member1_organisation}
            onChange={(e) =>
              setForm_detail({
                ...form_detail,
                member1_organisation: e.target.value,
              })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 1 Contact</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="9899564515"
            value={form_detail.member1_phone}
            onChange={(e) =>
              setForm_detail({ ...form_detail, member1_phone: e.target.value })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 2 Name</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="Ethan Hunt"
            value={form_detail.member2_name}
            onChange={(e) =>
              setForm_detail({ ...form_detail, member2_name: e.target.value })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 2 Email</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="ethan_hunt@gmail.com"
            value={form_detail.member2_email}
            onChange={(e) =>
              setForm_detail({ ...form_detail, member2_email: e.target.value })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 2 Institue/Organisation</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="Name of your organisation"
            value={form_detail.member2_organisation}
            onChange={(e) =>
              setForm_detail({
                ...form_detail,
                member2_organisation: e.target.value,
              })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 2 Contact</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="9899564515"
            value={form_detail.member2_phone}
            onChange={(e) =>
              setForm_detail({ ...form_detail, member2_phone: e.target.value })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 3 Name</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="Ethan Hunt"
            value={form_detail.member3_name}
            onChange={(e) =>
              setForm_detail({ ...form_detail, member3_name: e.target.value })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 3 Email</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="ethan_hunt@gmail.com"
            value={form_detail.member3_email}
            onChange={(e) =>
              setForm_detail({ ...form_detail, member3_email: e.target.value })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 3 Institue/Organisation</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="Name of your organisation"
            value={form_detail.member3_organisation}
            onChange={(e) =>
              setForm_detail({
                ...form_detail,
                member3_organisation: e.target.value,
              })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 3 Contact</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="9899564515"
            value={form_detail.member3_phone}
            onChange={(e) =>
              setForm_detail({ ...form_detail, member3_phone: e.target.value })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 4 Name</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="Ethan Hunt"
            value={form_detail.member4_name}
            onChange={(e) =>
              setForm_detail({ ...form_detail, member4_name: e.target.value })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 4 Email</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="ethan_hunt@gmail.com"
            value={form_detail.member4_email}
            onChange={(e) =>
              setForm_detail({ ...form_detail, member4_email: e.target.value })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 4 Institue/Organisation</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="Name of your organisation"
            value={form_detail.member4_organisation}
            onChange={(e) =>
              setForm_detail({
                ...form_detail,
                member4_organisation: e.target.value,
              })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>Team Member 4 Contact</h5>
          </label>
          <input
            type="text"
            style={{ borderBottom: "2px solid grey" }}
            placeholder="9899564515"
            value={form_detail.member4_phone}
            onChange={(e) =>
              setForm_detail({ ...form_detail, member4_phone: e.target.value })
            }
          />
        </Row>
        <Row className="form-item">
          <label htmlFor="fname">
            <h5>
              Idea Sector <span style={{ color: "red" }}>*</span>
            </h5>
          </label>
          <select className="select" value={idea_Sec} onChange={handleSelect}>
            <option value="Not Sure">Not Sure</option>
            <option value="Logistics">Logistics</option>
            <option value="Fintech">Fintech</option>
            <option value="Travel Tech">Travel Tech</option>
            <option value="Edtech">Edtech</option>
            <option value="Enterprise Tech">Enterprise Tech</option>
            <option value="Consumer Services">Consumer Services</option>
            <option value="Agri Tech">Agri Tech</option>
            <option value="Health Tech">Health Tech</option>
            <option value="Food Processing">Food Processing</option>
            <option value="Clean Energy">Clean Energy</option>
            <option value="Community">Community</option>
            <option value="Others">Others</option>
          </select>
          <textarea
            name="idea_Sec"
            id="idea_Sec"
            cols="5"
            rows="8"
            className="Text_Area"
            style={text ? { display: "block" } : { display: "none" }}
            onChange={handleText}
          ></textarea>
        </Row>
        <input
          type={isSubmitting ? "button" : "submit"}
          value={isSubmitting ? "Submitting..." : "Submit"}
          style={isSubmitting ? { background: "grey" } : {}}
          id="input-submit"
        />
      </form>
    </>
  );
}

export default AddStartupToDirectory;