// import React from "react";
// import { ref, set } from "firebase/database";
// import { useState } from "react";
// import { firebaseDB } from "../../lib/firebase";
// import { Row } from "react-bootstrap";
// const MentorshipProgramme = () => {
//   const [formDetails, setFormDetails] = useState({
//     name: "",
//     number: "",
//     email: "",
//     branch: "",
//     programme: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // console.log(formDetails);
//     // return;
//     setIsSubmitting(true);
//     const db = firebaseDB;
//     set(
//       ref(
//         db,
//         `mentorshipProgramme2223/${formDetails.name + formDetails.number}`
//       ),
//       {
//         a_name: formDetails.name,
//         b_number: formDetails.number,
//         c_email: formDetails.email,
//         d_branch: formDetails.branch,
//         e_programme: formDetails.programme,
//       }
//     )
//       .then(() => {
//         setIsSubmitting(false);
//         setFormDetails({
//           name: "",
//           number: "",
//           email: "",
//           branch: "",
//           programme: "",
//         });
//         alert("Form submitted successfully");
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
//           <label>
//             <h5>
//               Name <span style={{ color: "red" }}>*</span>
//             </h5>
//           </label>
//           <input
//             type="text"
//             style={{ borderBottom: "2px solid grey" }}
//             value={formDetails.name}
//             onChange={(e) =>
//               setFormDetails({ ...formDetails, name: e.target.value })
//             }
//             required
//           />
//         </Row>
//         <Row className="form-item">
//           <label>
//             <h5>
//               Whatsapp number
//               <span style={{ color: "red" }}>*</span>
//             </h5>
//             <span>Please share WhatsApp number without +91</span>
//           </label>
//           <input
//             type="text"
//             placeholder="9876543210"
//             value={formDetails.number}
//             onChange={(e) =>
//               setFormDetails({
//                 ...formDetails,
//                 number: e.target.value,
//               })
//             }
//             style={{ borderBottom: "2px solid grey" }}
//             required
//           />
//         </Row>
//         <Row className="form-item">
//           <label>
//             <h5>
//               Email ID <span style={{ color: "red" }}>*</span>
//             </h5>
//           </label>
//           <input
//             type="email"
//             placeholder="example@gmail.com"
//             value={formDetails.email}
//             onChange={(e) =>
//               setFormDetails({
//                 ...formDetails,
//                 email: e.target.value,
//               })
//             }
//             style={{ borderBottom: "2px solid grey" }}
//             required
//           />
//         </Row>
//         <Row className="form-item">
//           <label>
//             <h5>
//               Branch <span style={{ color: "red" }}>*</span>
//             </h5>
//           </label>
//           <input
//             type="text"
//             // placeholder="example@gmail.com"
//             value={formDetails.branch}
//             onChange={(e) =>
//               setFormDetails({
//                 ...formDetails,
//                 branch: e.target.value,
//               })
//             }
//             style={{ borderBottom: "2px solid grey" }}
//             required
//           />
//         </Row>
//         <Row className="form-item">
//           <label>
//             <h5>
//               Programme <span style={{ color: "red" }}>*</span>
//             </h5>
//           </label>
//           <input
//             type="text"
//             placeholder="B.Tech/ IDD"
//             value={formDetails.programme}
//             onChange={(e) =>
//               setFormDetails({
//                 ...formDetails,
//                 programme: e.target.value,
//               })
//             }
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

// export default MentorshipProgramme;
