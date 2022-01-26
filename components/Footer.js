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
import { AiTwotoneMail } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <Row>
          <Col
            style={{
              // border: "1px solid #EEE",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></Col>
          <Col
            style={{
              // border: "1px solid #EEE",
              background: "#f8f9fa",
              margin: "auto",
              display: "flex",
              alignItems: "center",
              // justifyContent: "center",
            }}
          ></Col>
        </Row>

        <Row className="footer-container">
          <Col className="footer-items contact-us">
            <h5>Contact Us</h5>
            <div
              style={{
                // border: "1px solid #EEE",
                // margin: "50px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* <MdLocationOn className="contact-icons" /> */}
                {/* <div> */}
                <p>
                  Indian Institute of Technology <br />
                  (Banaras Hindu University)
                  <br />
                  Varanasi, India <br /> PIN: 221005
                </p>
                {/* </div> */}
              </div>

              <div>
                <AiTwotoneMail className="contact-icons" />
                <Link href="mailto:ecell@iitbhu.ac.in">
                  Mail us @ ecell@iitbhu.ac.in
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <BsFillTelephoneOutboundFill className="contact-icons" />
                <p>+91 9451279308</p>
              </div>
            </div>
          </Col>
          <Col className="footer-items">
            <h5>Important</h5>
            <Row>
              <Col>
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
              <Col>
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
            </Row>
          </Col>
          <Col className="footer-items">
            <iframe
              src="https://ecelliitbhu.substack.com/embed"
              // width="650"
              // height="190"
              className="newsletter"
              style={{
                // border: "1px solid #EEE",
                background: "#f8f9fa",
                margin: "auto",
              }}
              // frameborder="0"
              scrolling="no"
            ></iframe>
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
