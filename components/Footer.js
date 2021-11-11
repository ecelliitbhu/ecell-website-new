import { Row, Col } from "react-bootstrap";
import Link from "next/link";

import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaDiscord,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <Row className="footer-container">
          <Col className="footer-items">
            <h5>Dicover</h5>
            <ul>
              <li>
                <Link href="/events">Events</Link>
              </li>
              <li>
                <Link href="">Initiatives</Link>
              </li>
              <li>
                <Link href="https://medium.com/ecelliitbhu">Blogs</Link>
              </li>
              <li>
                <Link href="">Showcase</Link>
              </li>
            </ul>
          </Col>
          <Col className="footer-items">
            <h5>Initiatives</h5>
            <ul>
              <li>
                <Link href="">Internship Portal</Link>
              </li>
              <li>
                <Link href="">Opportunity Connect</Link>
              </li>
              <li>
                <Link href="">Startup Services Portal</Link>
              </li>
              <li>
                <Link href="">IIT BHU Projects portal</Link>
              </li>
              <li>
                <Link href="">Campus Ambassador program</Link>
              </li>
            </ul>
          </Col>
          <Col className="footer-items">
            <h5>Connect</h5>
            <ul>
              <li>
                <Link href="">For Students</Link>
              </li>
              <li>
                <Link href="">For Startups</Link>
              </li>
              <li>
                <Link href="">For VCs, Angel Investors and Firms</Link>
              </li>
              <li>
                <Link href="">For Collaborations</Link>
              </li>
              <li>
                <Link href="">Sponsors and Associates</Link>
              </li>
              <li>
                <Link href="/team">Team</Link>
              </li>
            </ul>
          </Col>
          <Col className="footer-items">
            <h5>Learn</h5>
            <ul>
              <li>
                <Link href="https://medium.com/ecelliitbhu">Blog</Link>
              </li>
              <li>
                <Link href="">How E-cell Works</Link>
              </li>
              <li>
                <Link href="">Courses</Link>
              </li>
              <li>
                <Link href="">Event Updates</Link>
              </li>
              <li>
                <Link href="/FAQs">FAQ and Support</Link>
              </li>
              <li>
                <Link href="">Forum</Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="social">
          <Link href="https://www.instagram.com/ecelliitbhu/">
            <FaInstagram className="social-icons"></FaInstagram>
          </Link>
          <Link href="https://www.facebook.com/ecelliitvaranasi">
            <FaFacebook className="social-icons"></FaFacebook>
          </Link>
          <Link href="https://www.linkedin.com/company/ecelliitbhu/">
            <FaLinkedin className="social-icons"></FaLinkedin>
          </Link>
          <Link href="https://twitter.com/ecelliitbhu">
            <FaTwitter className="social-icons"></FaTwitter>
          </Link>
          <Link href="https://www.youtube.com/channel/UCUme5nNmSKY1GiUBUhlAnOQ">
            <FaYoutube className="social-icons"></FaYoutube>
          </Link>
          <Link href="https://discord.com/invite/EPm5mfbCKP">
            <FaDiscord className="social-icons"></FaDiscord>
          </Link>
        </Row>
      </footer>
    </>
  );
};

export default Footer;
