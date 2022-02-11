import React from "react";
import Head from "next/head";
const ContactForm = () => {
  return (
    <>
      <form className="cf">
        <div className="half left cf">
          <input type="text" id="input-name" placeholder="Name" />
          <input type="email" id="input-email" placeholder="Email address" />
          <input type="text" id="input-number" placeholder="Contact Number" />
          <input
            type="text"
            id="input-startup"
            placeholder="Name of startup/company"
          />
        </div>
        <div className="half right cf">
          <textarea
            name="subject"
            type="text"
            id="input-subject"
            placeholder="Subject"
            style={{height:"20%"}}
          ></textarea>
          <textarea
            name="message"
            type="text"
            id="input-message"
            placeholder="Message"
            style={{height:"175px"}}
          ></textarea>
        </div>
        <input type="submit" value="Submit" id="input-submit" />
      </form>
    </>
  );
};

export default ContactForm;
