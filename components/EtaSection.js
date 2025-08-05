// components/EtaSection.jsx

import { Row, Col, Container } from "react-bootstrap";
import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaDiscord,
} from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";

const EtaSection = () => {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: "#f8f9fa",
        padding: "3rem 1rem 1rem 1rem",
        marginTop: "4rem",
      }}
    >
      <Container>
        <Row className="footer-container text-center text-md-start">
          {/* Contact Us */}
          <Col xs={12} md={4} className="footer-items mb-5">
            <h5 className="mb-3 fw-bold">Contact Us</h5>
            <div className="d-flex flex-column gap-3 text-start">
              <div className="d-flex align-items-start">
                <MdLocationOn size={20} className="me-2 mt-1" />
                <p className="mb-0">
                  Indian Institute of Technology<br />
                  (Banaras Hindu University)<br />
                  Varanasi, India<br />
                  PIN: 221005
                </p>
              </div>
              <div className="d-flex align-items-center">
                <AiTwotoneMail size={20} className="me-2" />
                <a
                  href="mailto:ecell@iitbhu.ac.in"
                  className="text-decoration-none text-dark"
                >
                  ecell@iitbhu.ac.in
                </a>
              </div>
              <div className="d-flex align-items-center">
                <BsFillTelephoneOutboundFill size={18} className="me-2" />
                <p className="mb-0">+91 9120787959</p>
              </div>
            </div>
          </Col>

          {/* Important Links */}
          <Col xs={12} md={4} className="footer-items mb-5">
            <h5 className="mb-3 fw-bold">Important Links</h5>
            <Row>
              <Col xs={6}>
                <ul className="list-unstyled">
                  <li>
                    <Link href="/" className="footer-link">Home</Link>
                  </li>
                  <li>
                    <Link href="/events" className="footer-link">Events</Link>
                  </li>
                  <li>
                    <a href="https://medium.com/ecelliitbhu/feature/home" target="_blank" rel="noopener noreferrer" className="footer-link">Blogs</a>
                  </li>
                  <li>
                    <a href="https://bit.ly/build-with-us-ecell" className="footer-link">Initiatives</a>
                  </li>
                  <li>
                    <Link href="/gallery" className="footer-link">Gallery</Link>
                  </li>
                </ul>
              </Col>
              <Col xs={6}>
                <ul className="list-unstyled">
                  <li>
                    <Link href="/who_we_are" className="footer-link">Who we are?</Link>
                  </li>
                  <li>
                    <Link href="/" className="footer-link">How E-Cell works</Link>
                  </li>
                  <li>
                    <Link href="/team" className="footer-link">Meet the team</Link>
                  </li>
                  <li>
                    <a href="https://tiiciitbhu.org/" target="_blank" rel="noopener noreferrer" className="footer-link">I-3 F</a>
                  </li>
                  <li>
                    <Link href="/contacts" className="footer-link">Contact Us</Link>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>

          {/* Newsletter Embed */}
          <Col xs={12} md={4} className="footer-items mb-5">
            <h5 className="mb-3 fw-bold">Subscribe to our Newsletter</h5>
            <iframe
              src="https://ecelliitbhu.substack.com/embed"
              className="w-100"
              style={{
                border: "1px solid #EEE",
                background: "#fff",
                height: "250px",
              }}
              scrolling="no"
              title="Newsletter"
            ></iframe>
          </Col>
        </Row>

        {/* Social Icons */}
        <Row className="justify-content-center mt-3 mb-3">
          <div className="d-flex justify-content-center gap-4 flex-wrap">
            <a href="https://www.linkedin.com/company/ecelliitbhu/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaLinkedin size={22} />
            </a>
            <a href="https://www.instagram.com/ecelliitbhu/" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaInstagram size={22} />
            </a>
            <a href="https://www.facebook.com/ecelliitvaranasi" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaFacebook size={22} />
            </a>
            <a href="https://twitter.com/ecelliitbhu" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaTwitter size={22} />
            </a>
            <a href="https://www.youtube.com/channel/UCUme5nNmSKY1GiUBUhlAnOQ" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaYoutube size={22} />
            </a>
            <a href="https://discord.com/invite/EPm5mfbCKP" target="_blank" rel="noopener noreferrer" className="social-icon">
              <FaDiscord size={22} />
            </a>
          </div>
        </Row>

        {/* Footer Bottom */}
        <hr />
        <Row className="text-center">
          <small className="text-muted">
            © {new Date().getFullYear()} E-Cell IIT BHU. All rights reserved.
          </small>
        </Row>
      </Container>

      <style jsx>{`
        .footer-link {
          text-decoration: none;
          color: #343a40;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: #0d6efd;
        }

        .social-icon {
          color: #343a40;
          transition: color 0.3s;
        }

        .social-icon:hover {
          color: #0d6efd;
        }
      `}</style>
    </footer>
  );
};

export default EtaSection;
