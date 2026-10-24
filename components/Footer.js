import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import {
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaDiscord,
  FaInstagram,
} from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <Row className="footer-container">
          <Col className="footer-items contact-us">
            <h5>Contact Us</h5>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                className="footer-address"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
               
                <p>
                  Indian Institute of Technology <br />
                  (Banaras Hindu University)
                  <br />
                  Varanasi, India <br /> PIN: 221005
                </p>
              </div>
              <div className="contact-row ">
                <AiTwotoneMail className="contact-icons" />
                <a href="mailto:ecell@iitbhu.ac.in" className="mail-us">
                  ecell@iitbhu.ac.in
                </a>
              </div>

              <div className="contact-row , bg">
                <BsFillTelephoneOutboundFill className="contact-icons" />
                <p>+91 9120787959</p>
              </div>

            </div>
          </Col>
          <Col className="footer-items important-footer">
            <h5>Important</h5>
            <Row style={{ display: "grid", gridTemplateColumns: "2fr 3fr" }}>
              <Col>
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/events">Events</Link>
                  </li>
                  <li>
                    <a
                      href="https://medium.com/ecelliitbhu/feature/home"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Blogs
                    </a>
                  </li>
                  <li>
                    <a href="https://bit.ly/build-with-us-ecell">Initiatives</a>
                  </li>
                  <li>
                    <Link href="/gallery">Gallery</Link>
                  </li>
                </ul>
              </Col>
              <Col>
                <ul>
                  <li>
                    <Link href="/who_we_are">Who we are?</Link>
                  </li>
                  <li>
                    <Link href="">How E-Cell works</Link>
                  </li>
                  <li>
                    <Link href="/team">Meet the team</Link>
                  </li>
                  <li>
                    <a
                      href="https://tiiciitbhu.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      I-3 F
                    </a>
                  </li>
                  <li>
                    <Link href="/contacts">Contact Us</Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
          <Col className="footer-items">
            <iframe
              src="https://ecelliitbhu.substack.com/embed"
              className="newsletter"
              style={{
                border: "1px solid #EEE",
                background: "#f8f9fa",
                margin: "auto",
              }}
            ></iframe>
          </Col>
        </Row>    
        <div
          className="social"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginTop: "10px",
          }}
        >
          <a
            href="https://www.instagram.com/ecelliitbhu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icons" />
          </a>
          <a
            href="https://www.facebook.com/ecelliitvaranasi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="social-icons" />
          </a>
          <a
            href="https://www.linkedin.com/company/ecelliitbhu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="social-icons" />
          </a>
          <a
            href="https://twitter.com/ecelliitbhu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="social-icons" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCUme5nNmSKY1GiUBUhlAnOQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="social-icons" />
          </a>
          <a
            href="https://discord.com/invite/EPm5mfbCKP"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord className="social-icons" />
          </a>
        </div>


      </footer>
    </>
  );
};

export default Footer;
