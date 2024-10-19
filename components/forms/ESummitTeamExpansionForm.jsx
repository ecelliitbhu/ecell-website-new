// import React from "react";
// import { ref, set } from "firebase/database";
// import { useState } from "react";
// import { firebaseDB } from "../../lib/firebase";
// import { Row } from "react-bootstrap";
// const TeamExpansionForm = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [number, setNumber] = useState("");
//   const [branch, setBranch] = useState("");
//   const [tech, setTech] = useState(false);
//   const [brand, setBrand] = useState(false);
//   const [involvements, setInvolvements] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const submissionTime = Date.now();
//     setIsSubmitting(true);
//     var verticals = [];
//     tech && verticals.push("Tech");
//     brand && verticals.push("Branding");
//     const db = firebaseDB;
//     set(
//       ref(
//         db,
//         `ESummit2023TeamExpansionResponses/${
//           submissionTime + " " + name + " " + number
//         }`
//       ),
//       {
//         time: submissionTime,
//         a_name: name,
//         b_email: email,
//         c_contact_number: number,
//         d_branch: branch,
//         f_verticals_opted: verticals,
//         g_involvements: involvements,
//       }
//     )
//       .then(() => {
//         setIsSubmitting(false);
//         alert("Form submitted successfully");
//         setName("");
//         setEmail("");
//         setNumber("");
//         setBranch("");
//         setBrand(false);
//         setTech(false);
//         setInvolvements("");
//       })
//       .catch((error) => alert(error.message));
//   };
//   return (
//     <>
//       <form
//         className="cf teamExpansion-form"
//         onSubmit={handleSubmit}
//         style={{ width: "95%", maxWidth: "800px" }}
//       >
//         <Row className="form-item">
//           <label htmlFor="fname">
//             <h5>
//               Name <span style={{ color: "red" }}>*</span>
//             </h5>
//           </label>
//           <input
//             type="text"
//             style={{ borderBottom: "2px solid grey" }}
//             placeholder="Ethan Hunt"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </Row>
//         <Row className="form-item">
//           <label htmlFor="fname">
//             <h5>
//               Email <span style={{ color: "red" }}>*</span>
//             </h5>
//             <span>Please share institute email id</span>
//           </label>
//           <input
//             type="email"
//             value={email}
//             placeholder="example@itbhu.ac.in"
//             onChange={(e) => setEmail(e.target.value)}
//             style={{ borderBottom: "2px solid grey" }}
//             required
//           />
//         </Row>
//         <Row className="form-item">
//           <label htmlFor="fname">
//             <h5>
//               Contact Detail(s) <span style={{ color: "red" }}>*</span>
//             </h5>
//             <span>Please share WhatsApp number without +91</span>
//           </label>
//           <input
//             type="text"
//             value={number}
//             placeholder="9876543210"
//             onChange={(e) => setNumber(e.target.value)}
//             style={{ borderBottom: "2px solid grey" }}
//             required
//           />
//         </Row>
//         <Row className="form-item">
//           <label htmlFor="fname">
//             <h5>
//               Branch (B Tech/B Arch/IDD/PG) and Year{" "}
//               <span style={{ color: "red" }}>*</span>
//             </h5>
//           </label>
//           <input
//             type="text"
//             value={branch}
//             placeholder="your branch and year"
//             onChange={(e) => setBranch(e.target.value)}
//             style={{ borderBottom: "2px solid grey" }}
//             required
//           />
//         </Row>
//         <Row className="form-item">
//           <label htmlFor="fname">
//             <h5>
//               Which Team(s) are you interested in?{" "}
//               <span style={{ color: "red" }}>*</span>
//             </h5>
//           </label>
//           <Row className="checkbox-option">
//             <input
//               type="checkbox"
//               value="Branding"
//               checked={brand}
//               onChange={() => setBrand(!brand)}
//             />
//             <span>Branding Team</span>
//           </Row>
//           <Row className="checkbox-option">
//             <input
//               type="checkbox"
//               value="Tech"
//               checked={tech}
//               onChange={() => setTech(!tech)}
//             />
//             <span>Technical Team</span>
//           </Row>
//         </Row>
//         <Row className="form-item">
//           <label htmlFor="fname">
//             <h5>
//               Involvements elsewhere
//               <span style={{ color: "red" }}>*</span>
//             </h5>
//           </label>
//           <input
//             type="text"
//             value={involvements}
//             placeholder="Enter your answer"
//             onChange={(e) => setInvolvements(e.target.value)}
//             style={{ borderBottom: "2px solid grey" }}
//             required
//           />
//         </Row>
//         <input
//           type={isSubmitting ? "button" : "submit"}
//           value={isSubmitting ? "Submitting..." : "Submit"}
//           style={isSubmitting ? { background: "grey" } : {}}
//           id="input-submit"
//         />
//       </form>
//     </>
//   );
// };

// export default TeamExpansionForm;
