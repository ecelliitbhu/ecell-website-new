import React, { useState } from "react";
import Link from "next/link";
import { FcApproval } from "react-icons/fc";
import { FcCollaboration } from "react-icons/fc";
import { FcAddressBook } from "react-icons/fc";
import { FcServices } from "react-icons/fc";
import { RiArrowDropDownLine } from "react-icons/ri";
export const Discover = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <li
      className="nav-item dropdown discover"
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <a
        className="nav-link "
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <h3>Discover</h3>
        <RiArrowDropDownLine fontSize="2rem"></RiArrowDropDownLine>
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <ul className="dropdown-container">
          <li className="dropdown-subcontainer">
            <Link href="/events">
              <a className="dropdown-item">
                <FcCollaboration fontSize="2.2rem"></FcCollaboration>
                <div>
                  <h4>Who we are?</h4>
                  <p>
                    Discover the buzzing events
                    <br />
                    happening throughout the year!
                  </p>
                </div>
              </a>
            </Link>
            <a className="dropdown-item" href="https://medium.com/ecelliitbhu">
              <FcCollaboration fontSize="2.2rem"></FcCollaboration>
              <div>
                <h4>Events</h4>
                <p>
                  Discover what&apos;s trending <br />
                  in the startup ecosystem.
                </p>
              </div>
            </a>
          </li>
          <li className="dropdown-subcontainer">
            <a className="dropdown-item" href="#">
              <FcCollaboration fontSize="2.2rem"></FcCollaboration>
              <div>
                <h4>Gallery</h4>
                <p>
                  Initiatives taken up by E-Cell to improve <br /> the
                  entrepreneurship culture @ IIT BHU
                </p>
              </div>
            </a>

            <a className="dropdown-item" href="#">
              <FcCollaboration fontSize="2.2rem"></FcCollaboration>
              <div>
                <h4>Initiatives</h4>
                <p>
                  Uncover the great startups <br />
                  that have been #BuiltinIITBHU
                </p>
              </div>
            </a>
          </li>
          <li className="dropdown-subcontainer">
            <a className="dropdown-item" href="#">
              <FcCollaboration fontSize="2.2rem"></FcCollaboration>
              <div>
                <h4>Past speakers</h4>
                <p>
                  Initiatives taken up by E-Cell to improve <br /> the
                  entrepreneurship culture @ IIT BHU
                </p>
              </div>
            </a>

            <a className="dropdown-item" href="#">
              <FcCollaboration fontSize="2.2rem"></FcCollaboration>
              <div>
                <h4>Sponsors and Associates</h4>
                <p>
                  Uncover the great startups <br />
                  that have been #BuiltinIITBHU
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </li>
  );
};

export const Initiatives = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <li
      className="nav-item dropdown design"
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <a
        className="nav-link "
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <h3>Initiatives</h3>
        <RiArrowDropDownLine fontSize="2rem"></RiArrowDropDownLine>
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <ul className="dropdown-container">
          <li className="dropdown-subcontainer">
            <a className="dropdown-item" href="#">
              <FcApproval fontSize="2.2rem"></FcApproval>
              <div>
                <h4>Internship Portal</h4>
                <p>
                  Register your startup for interns
                  <br /> or work in budding startups!
                </p>
              </div>
            </a>

            <a className="dropdown-item" href="#">
              <FcApproval fontSize="2.2rem"></FcApproval>
              <div>
                <h4>Startup Services Portal</h4>
                <p>
                  Tweak Lottie animations
                  <br /> without Adobe After Effects
                </p>
              </div>
            </a>
          </li>
          <li className="dropdown-subcontainer">
            <a className="dropdown-item" href="#">
              <FcApproval fontSize="2.2rem"></FcApproval>
              <div>
                <h4>Build with us</h4>
                <p>
                  Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                </p>
              </div>
            </a>

            <a className="dropdown-item" href="#">
              <FcApproval fontSize="2.2rem"></FcApproval>
              <div>
                <h4>IIT BHU Projects Portal</h4>
                <p>
                  Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                </p>
              </div>
            </a>
          </li>
          <li className="dropdown-subcontainer">
            <a className="dropdown-item" href="#">
              <FcApproval fontSize="2.2rem"></FcApproval>
              <div>
                <h4>Campus Ambassador program</h4>
                <p>
                  Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                </p>
              </div>
            </a>
            <a className="dropdown-item" href="#">
              <FcApproval fontSize="2.2rem"></FcApproval>
              <div>
                <h4>Mentor Forum</h4>
                <p>
                  Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </li>
  );
};
export const Incubators = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <li
      className="nav-item dropdown code"
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <a
        className="nav-link "
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <h3>Incubators</h3>
        <RiArrowDropDownLine fontSize="2rem"></RiArrowDropDownLine>
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <ul className="dropdown-container">
          <li className="dropdown-subcontainer">
            {/* <Link href="https://tiiciitbhu.org"> */}
            <a
              className="dropdown-item"
              href="https://tiiciitbhu.org"
              rel="noreferrer"
              target="_blank"
            >
              <FcAddressBook fontSize="2.2rem"></FcAddressBook>
              <div>
                <h4>
                  {"Technology Innovation"} <br />
                  {"& Incubation Centre"}
                </h4>
                <p>
                  Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                </p>
              </div>
            </a>
            {/* </Link> */}

            <Link href="/contacts">
              <a className="dropdown-item" href="#">
                <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                <div>
                  <h4>Cisco thingQbator</h4>
                  <p>
                    Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                  </p>
                </div>
              </a>
            </Link>
          </li>
          <li className="dropdown-subcontainer">
            <Link href="/contacts">
              <a className="dropdown-item" href="#">
                <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                <div>
                  <h4>NCL-IIT BHU Incubation Centre</h4>
                  <p>
                    Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                  </p>
                </div>
              </a>
            </Link>

            <Link href="/contacts">
              <a className="dropdown-item" href="#">
                <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                <div>
                  <h4>IDAPT-Hub Foundation</h4>
                  <p>
                    Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                  </p>
                </div>
              </a>
            </Link>
          </li>
          <li className="dropdown-subcontainer">
            <Link href="/contacts">
              <a className="dropdown-item">
                <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                <div>
                  <h4>R-ABI, IIT BHU</h4>
                  <p>
                    Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                  </p>
                </div>
              </a>
            </Link>

            <Link href="/team">
              <a
                className="dropdown-item"
                href="https://www.iitbhu.ac.in/cf/cis/innovation"
                rel="noreferrer"
                target="_blank"
              >
                <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                <div>
                  <h4>
                    {"Innovation"}
                    <br />
                    {"& Start-up Policy IIT BHU"}
                  </h4>
                  <p>
                    Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                  </p>
                </div>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};
export const Connect = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <li
      className="nav-item code"
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <a
        className="nav-link "
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <h3>Connect</h3>
        <RiArrowDropDownLine fontSize="2rem"></RiArrowDropDownLine>
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <ul className="dropdown-container">
          <li className="dropdown-subcontainer">
            <Link href="/contacts">
              <a className="dropdown-item" href="#">
                <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                <div>
                  <h4>For students</h4>
                  <p>
                    Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                  </p>
                </div>
              </a>
            </Link>

            <Link href="/contacts">
              <a className="dropdown-item" href="#">
                <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                <div>
                  <h4>For startups</h4>
                  <p>
                    Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                  </p>
                </div>
              </a>
            </Link>
          </li>
          <li className="dropdown-subcontainer">
            <Link href="/contacts">
              <a className="dropdown-item" href="#">
                <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                <div>
                  <h4>For alumni</h4>
                  <p>
                    Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                  </p>
                </div>
              </a>
            </Link>

            <Link href="/contacts">
              <a className="dropdown-item" href="#">
                <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                <div>
                  <h4>For Investor and VCs</h4>
                  <p>
                    Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                  </p>
                </div>
              </a>
            </Link>
          </li>
          <li className="dropdown-subcontainer">
            <Link href="/contacts">
              <a className="dropdown-item">
                <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                <div>
                  <h4>For corporates</h4>
                  <p>
                    Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                  </p>
                </div>
              </a>
            </Link>

            <Link href="/team">
              <a className="dropdown-item">
                <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                <div>
                  <h4>Meet the team</h4>
                  <p>
                    Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                  </p>
                </div>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};
export const Learn = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <li
      className="nav-item dropdown learn"
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <a
        className="nav-link"
        href="#"
        id="navbarDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <h3>Learn</h3>
        <RiArrowDropDownLine fontSize="2rem"></RiArrowDropDownLine>
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <ul className="dropdown-container">
          <li className="dropdown-subcontainer">
            <a className="dropdown-item" href="https://medium.com/ecelliitbhu">
              <FcServices fontSize="2.2rem"></FcServices>
              <div>
                <h4>How E-cell works?</h4>
                <p>How-to guides, interviews, articles, and more</p>
              </div>
            </a>

            <a className="dropdown-item" href="#">
              <FcServices fontSize="2.2rem"></FcServices>
              <div>
                <h4>Resource Library</h4>
                <p>
                  Stay up-to-date with our latest <br />
                  events held @ecelliitbhu
                </p>
              </div>
            </a>
          </li>
          <li className="dropdown-subcontainer">
            <a className="dropdown-item" href="#">
              <FcServices fontSize="2.2rem"></FcServices>
              <div>
                <h4>Blogs</h4>
                <p>
                  A comprehensive guide to this <br />
                  powerful little format
                </p>
              </div>
            </a>

            <Link href="/FAQs">
              <a className="dropdown-item">
                <FcServices fontSize="2.2rem"></FcServices>
                <div>
                  <h4>Frequently Asked Questions</h4>
                  <p>Get your questions answered</p>
                </div>
              </a>
            </Link>
          </li>
          <li className="dropdown-subcontainer">
            <a className="dropdown-item" href="#">
              <FcServices fontSize="2.2rem"></FcServices>
              <div>
                <h4>Newsletter Archives</h4>
                <p>Learn from the Entrepreneurship Experts</p>
              </div>
            </a>
            <Link href="https://ecelliitbhu.substack.com/">
              <a
                className="dropdown-item"
                href="https://ecelliitbhu.substack.com/"
              >
                <FcServices fontSize="2.2rem"></FcServices>
                <div>
                  <h4>E-Digest Magazine</h4>
                  <p>
                    Where those who work with Lottie <br />
                    can come together
                  </p>
                </div>
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};
export const Contact = () => {
  return (
    <li className="nav-item dropdown learn">
      <Link href="/contacts" passHref>
        <a className="nav-link">
          <h3>Contacts</h3>
        </a>
      </Link>
    </li>
  );
};
export const Startups = () => {
  return (
    <li className="nav-item dropdown learn">
      <Link href="/startups" passHref>
        <a className="nav-link">
          <h3>Startups</h3>
        </a>
      </Link>
    </li>
  );
};
