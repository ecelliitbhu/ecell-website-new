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
    <footer className="footer" style={{ backgroundColor: "#f8f9fa", padding: "3rem 1rem 1rem 1rem", marginTop: "4rem" }}>
      <Container>
        <Row className="footer-container text-center text-md-start">
          {/* Contact Us */}
          <Col md={4} className="footer-items mb-4">
            <h5 className="mb-3">Contact Us</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <div className="d-flex align-items-start">
                <MdLocationOn size={20} style={{ marginRight: "10px" }} />
                <p className="mb-0 text-start">
                  Indian Institute of Technology<br />
                  (Banaras Hindu University)<br />
                  Varanasi, India<br />
                  PIN: 221005
                </p>
              </div>
              <div className="d-flex align-items-center">
                <AiTwotoneMail size={20} style={{ marginRight: "10px" }} />
                <a href="mailto:ecell@iitbhu.ac.in" className="text-decoration-none text-dark">
                  ecell@iitbhu.ac.in
                </a>
              </div>
              <div className="d-flex align-items-center">
                <BsFillTelephoneOutboundFill size={18} style={{ marginRight: "10px" }} />
                <p className="mb-0">+91 9120787959</p>
              </div>
            </div>
          </Col>

          {/* Important Links */}
          <Col md={4} className="footer-items mb-4">
            <h5 className="mb-3">Important Links</h5>
            <Row>
              <Col>
                <ul className="list-unstyled">
                  <li><Link href="/" className="text-decoration-none text-dark">Home</Link></li>
                  <li><Link href="/events" className="text-decoration-none text-dark">Events</Link></li>
                  <li><a href="https://medium.com/ecelliitbhu/feature/home" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">Blogs</a></li>
                  <li><a href="https://bit.ly/build-with-us-ecell" className="text-decoration-none text-dark">Initiatives</a></li>
                  <li><Link href="/gallery" className="text-decoration-none text-dark">Gallery</Link></li>
                </ul>
              </Col>
              <Col>
                <ul className="list-unstyled">
                  <li><Link href="/who_we_are" className="text-decoration-none text-dark">Who we are?</Link></li>
                  <li><Link href="/" className="text-decoration-none text-dark">How E-Cell works</Link></li>
                  <li><Link href="/team" className="text-decoration-none text-dark">Meet the team</Link></li>
                  <li><a href="https://tiiciitbhu.org/" target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">I-3 F</a></li>
                  <li><Link href="/contacts" className="text-decoration-none text-dark">Contact Us</Link></li>
                </ul>
              </Col>
            </Row>
          </Col>

          {/* Newsletter Embed */}
          <Col md={4} className="footer-items mb-4">
            <h5 className="mb-3">Subscribe to our Newsletter</h5>
            <iframe
              src="https://ecelliitbhu.substack.com/embed"
              className="w-100"
              style={{
                border: "1px solid #EEE",
                background: "#fff",
                minHeight: "200px",
              }}
              scrolling="no"
            ></iframe>
          </Col>
        </Row>

        {/* Social Icons */}
        <Row className="justify-content-center mt-4 mb-3">
          <div className="d-flex justify-content-center gap-4 flex-wrap">
            <a href="https://www.linkedin.com/company/ecelliitbhu/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={22} className="text-dark" />
            </a>
            <a href="https://www.instagram.com/ecelliitbhu/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={22} className="text-dark" />
            </a>
            <a href="https://www.facebook.com/ecelliitvaranasi" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={22} className="text-dark" />
            </a>
            <a href="https://twitter.com/ecelliitbhu" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={22} className="text-dark" />
            </a>
            <a href="https://www.youtube.com/channel/UCUme5nNmSKY1GiUBUhlAnOQ" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={22} className="text-dark" />
            </a>
            <a href="https://discord.com/invite/EPm5mfbCKP" target="_blank" rel="noopener noreferrer">
              <FaDiscord size={22} className="text-dark" />
            </a>
          </div>
        </Row>

        {/* Footer Bottom */}
        <hr />
        <Row className="text-center text-muted">
          <small>© {new Date().getFullYear()} E-Cell IIT BHU. All rights reserved.</small>
        </Row>
      </Container>
    </footer>
  );
};

export default EtaSection;
