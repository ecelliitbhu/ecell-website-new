import { Row, Col } from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
// import 'boxicons'

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

  const [stickyBar, setStickyBar] = useState(false);

  const showSticky = () => {
    setStickyBar(!stickyBar);
  }
  return (
    <>
      <footer className="footer">
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
                className="footer-address"
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
                <a href="mailto:ecell@iitbhu.ac.in" className="mail-us">
                  ecell@iitbhu.ac.in
                </a>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <BsFillTelephoneOutboundFill className="contact-icons" />
                <p>+91 9120787959</p>
              </div>
            </div>
          </Col>
          <Col className="footer-items important-footer">
            <h5>Important</h5>
            <Row style={{ display: "grid", gridTemplateColumns: "1.5fr 3fr" }}>
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
        <div className={stickyBar ? "show-sticky-bar" : "hide-sticky-bar"} style={{ position: "fixed" }}>
          {/* <i className='bx bx-chevron-right'></i> */}
          {/* <img className="bar-slider2" onClick={showSticky} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAO9JREFUWEftlksKwjAQQF+PIHoHUXcuFcSj+9u7cOPClRtBUQQvIIEGQqkOnTQ0ynQ7DHl980kKMvuKzHgwIKkiZsgMSQak+N/30Ai4A1fJxKd4m4aGwA54AUvgrIFqC2gMbIB+CbEHpl0BeTODEuAGzIBTF0ATYAWEMAvgqIFxOTElczBboBeYiYKJAUoCowWqwjyAeUyZwvI2LVkdjBvxg7Znqnk/D+R+KKmlpoa84WR9pAWqM+UWYmdjH5rKZjF6qKyujtDUOpfLtWoqi+eHh3IPtCdw0S7KmCnTnvk1z4AkrWbIDEkGpLj1kGToDcnAMiW8WACSAAAAAElFTkSuQmCC" /> */}
          <img className="bar-slider2" onClick={showSticky} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAopJREFUWEfdmEtLVlEUhh8nYSHZoCZNsgaBCA0iiEgoaOCgXxDSxTQIiuxiDqIoSpBKEYJqUBSENnTkyIE4KoIimkROukAXslmCoATFC+fI4bAva28dfLThG513rff51r6cvU4TDTaaGoyH/waoEzgC7AW2FD8V+xcwD7wCJoCXqTOQUqFm4DRwHthmNPoIjAGPgCVLjBXoJHAb2GxJ6tCoaheA57F4C5BABmOJjM+vAUMhbQhIz54Cx41mVtk9oN8nDgE9LNaM1ShFdxO47grwAV0ERlMcMrRHgfF6nAtoE/AN2JBg8iVh55Vp5bEDWK76uIBUTi0+61Di/cBna0BFdxa4HwJaB/wEVCXL+F6B+WsJqGlU2bYQ0GFgypi4rIySauQAKW438Lb0rE/ZE6DHAFSHWQ2QzqWVJVIHegfsigC5YFYDNA10+Soks60BoOqaqctuBOIOAgc8z98DHT6gRWC9J9BXGcMMI1jnQQj8Blp9QAtAi8dBi1fbW2CpIwQkz40+oDlgZ8BNZ43uQi6o3Cn7ALT7gGYDc13G+CqVu+1ngEM+oLvAgGE+XFC5QMPAFR/QPuCFAUiSOlQu0B7gjQ9I59LXyNav8gpKa0oxOUCfihfsSk7Xy/USMGKsUrVSgkodZ4AH1SAXkK4d2k3qJqxD/3S7VVzozNcP6fuKTiHRI0ne7br0h66wd4DLSRZ2sfeyH+s6HgO9dh+TUn2arsjOEQNS0C3gqskqLNIuVDsV3DAWINmcAHRo5jaKWsDngMnYH7MCKY9a6VOAjgVrK613o9biM+BPDEbPU4DKfIrRW/9Ycf0sPzZoSvSx4UfxkUFt82sLROwcSs2xpvqcCq0pQD1ZwwH9A47GdiW/+wQnAAAAAElFTkSuQmCC" />
          <a
            href="https://www.linkedin.com/company/ecelliitbhu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="social-icons"></FaLinkedin>
          </a>
          <a
            href="https://www.instagram.com/ecelliitbhu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icons"></FaInstagram>
          </a>
          <a
            href="https://www.facebook.com/ecelliitvaranasi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="social-icons"></FaFacebook>
          </a>

          <a
            href="https://twitter.com/ecelliitbhu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="social-icons"></FaTwitter>
          </a>
          <a
            href="https://www.youtube.com/channel/UCUme5nNmSKY1GiUBUhlAnOQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="social-icons"></FaYoutube>
          </a>
          <a
            href="https://discord.com/invite/EPm5mfbCKP"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord className="social-icons"></FaDiscord>
          </a>
        </div>
        {/* <Row className="social">
          <a
            href="https://www.linkedin.com/company/ecelliitbhu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="social-icons"></FaLinkedin>
          </a>
          <a
            href="https://www.instagram.com/ecelliitbhu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icons"></FaInstagram>
          </a>
          <a
            href="https://www.facebook.com/ecelliitvaranasi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="social-icons"></FaFacebook>
          </a>

          <a
            href="https://twitter.com/ecelliitbhu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="social-icons"></FaTwitter>
          </a>
          <a
            href="https://www.youtube.com/channel/UCUme5nNmSKY1GiUBUhlAnOQ"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="social-icons"></FaYoutube>
          </a>
          <a
            href="https://discord.com/invite/EPm5mfbCKP"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaDiscord className="social-icons"></FaDiscord>
          </a>
        </Row> */}
      </footer>
    </>
  );
};

export default Footer;
