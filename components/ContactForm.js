import React from "react";
import { firebaseDB } from "../lib/firebase";
import { ref, push} from "firebase/database";
import { useState } from "react";
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState();
  const [startup, setStartup] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const db = firebaseDB;
    push(ref(db, "contactUs/"), {
      name: name,
      email: email,
      contact_number: number,
      startup: startup,
      subject: subject,
      message: message,
    })
      .then(() => alert("Form submitted successfully"))
      .catch((error) => alert(error.message));
      setName("");
      setEmail("");
      setNumber("");
      setStartup("");
      setSubject("");
      setMessage("");
  };
  return (
    <>
      <form className="cf contact-form" onSubmit={handleSubmit}>
        <div className="half left cf">
          <input
            type="text"
            id="contact-name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            id="contact-email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            id="contact-number"
            placeholder="Contact Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
          <input
            type="text"
            id="contact-startup/company"
            placeholder="Name of startup/company"
            value={startup}
            onChange={(e) => setStartup(e.target.value)}
          />
        </div>
        <div className="half right cf">
          <textarea
            name="subject"
            type="text"
            id="contact-subject"
            placeholder="Subject"
            style={{ height: "20%" }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          ></textarea>
          <textarea
            name="message"
            type="text"
            id="contact-message"
            placeholder="Message"
            style={{ height: "175px" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <input type="submit" value="Submit" id="input-submit" />
      </form>
    </>
  );
};

export default ContactForm;
