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
            <Link href="/who_we_are">
              <a className="dropdown-item">
                <FcCollaboration fontSize="2.2rem"></FcCollaboration>
                <div>
                  <h4>Who we are?</h4>
                  <p>
                    Get to Know the E-Cell,
                    <br />
                    who we are and what we do.
                  </p>
                </div>
              </a>
            </Link>
            <Link href="/events">
              <a className="dropdown-item" href="#">
                <FcCollaboration fontSize="2.2rem"></FcCollaboration>
                <div>
                  <h4>Events</h4>
                  <p>
                    Discover the buzzing events
                    <br />
                    happening throughout the year!
                  </p>
                </div>
              </a>
            </Link>
          </li>
          <li className="dropdown-subcontainer">
            <Link href="/gallery">
              <a className="dropdown-item" href="#">
                <FcCollaboration fontSize="2.2rem"></FcCollaboration>
                <div>
                  <h4>Gallery</h4>
                  <p>A glimpse of our culture through our E-Album!</p>
                </div>
              </a>
            </Link>

            <a className="dropdown-item" href="#">
              <FcCollaboration fontSize="2.2rem"></FcCollaboration>
              <div>
                <h4>Initiatives</h4>
                <p>
                  Initiatives taken by the E-Cell to improve
                  <br />
                  the entrepreneurship culture @ IIT BHU
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
                  Witness our expansive lineup of <br /> prominent speakers and
                  guests!
                </p>
              </div>
            </a>

            <a className="dropdown-item" href="#">
              <FcCollaboration fontSize="2.2rem"></FcCollaboration>
              <div>
                <h4>Sponsors and Associates</h4>
                <p>
                  Meet our facilitators who support us <br />
                  to make the best of E-Cell!
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
            <a
              className="dropdown-item"
              href="https://ecelliitbhu.notion.site/Startup-Internship-Portal-a0455bf737864af29bdef29ab488fccf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FcApproval fontSize="2.2rem"></FcApproval>
              <div>
                <h4>Internship Portal</h4>
                <p>
                  Reach out to us for getting interns
                  <br /> for your budding startup!
                </p>
              </div>
            </a>

            <a className="dropdown-item" href="#">
              <FcApproval fontSize="2.2rem"></FcApproval>
              <div>
                <h4>Startup Services Portal</h4>
                <p>
                  Access the startup services for IIT BHU <br /> entrepreneurs
                  provided by E-Cell Associations.
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
                  Join our community of IIT BHU budding
                  <br /> {`alumni & student entrepreneurs!`}
                </p>
              </div>
            </a>

            <a
              className="dropdown-item"
              href="https://discord.link/ecelliitbhu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FcApproval fontSize="2.2rem"></FcApproval>
              <div>
                <h4>E-Community</h4>
                <p>
                  Join the world of entrepreneurs and enthusiasts
                  <br /> and build the future together!
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
                  {`Join our initiative of creating & motivating`}
                  <br /> {`the entrepreneurs of your college!`}
                </p>
              </div>
            </a>
            <a className="dropdown-item" href="#">
              <FcApproval fontSize="2.2rem"></FcApproval>
              <div>
                <h4>Mentor Forum</h4>
                <p>
                  Request for a connect to a <br />{" "}
                  {`mentor for your startup sector!`}
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
                  Umbrella organization at IIT BHU for
                  <br />
                  nurturing start-ups
                </p>
              </div>
            </a>
            {/* </Link> */}

            <a
              className="dropdown-item"
              href="https://thingqbator.nasscomfoundation.org/"
              rel="noreferrer"
              target="_blank"
            >
              <FcAddressBook fontSize="2.2rem"></FcAddressBook>
              <div>
                <h4>Cisco thingQbator</h4>
                <p>
                  An internal makerspace “Internet of Things” <br />- focused
                  incubator
                </p>
              </div>
            </a>
          </li>
          <li className="dropdown-subcontainer">
            <a
              className="dropdown-item"
              href="https://tiiciitbhu.org/ncl-iit-bhu-incubation-centre"
              rel="noreferrer"
              target="_blank"
            >
              <FcAddressBook fontSize="2.2rem"></FcAddressBook>
              <div>
                <h4>NCL-IIT BHU Incubation Centre</h4>
                <p>
                  A Northern Coalfields Limited (NCL) <br /> CSR initiative
                  funded incubator
                </p>
              </div>
            </a>

            <a
              className="dropdown-item"
              href="https://www.idapthub.org/"
              rel="noreferrer"
              target="_blank"
            >
              <FcAddressBook fontSize="2.2rem"></FcAddressBook>
              <div>
                <h4>IDAPT-Hub Foundation</h4>
                <p>
                  Technology Innovation Hub for “Data Analytics
                  <br /> and Predictive Technologies”
                </p>
              </div>
            </a>
          </li>
          <li className="dropdown-subcontainer">
            <a
              className="dropdown-item"
              href="https://tiiciitbhu.org/rabi"
              rel="noreferrer"
              target="_blank"
            >
              <FcAddressBook fontSize="2.2rem"></FcAddressBook>
              <div>
                <h4>R-ABI, IIT BHU</h4>
                <p>
                  An Agribusiness and Agri-preneurship <br /> focused incubator
                  @ IIT BHU
                </p>
              </div>
            </a>

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
                <p>Official Startup Policy of IIT BHU</p>
              </div>
            </a>
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
                    Connect with us to request for <br /> any kind of startup
                    assistance.
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
                    Reach out to us for any startup assistance/ <br /> guidance/
                    referral and other opportunities!
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
                    We’d love to network with our alums <br /> working towards
                    the same cause!
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
                    Reach out to us for the full database of <br /> IIT BHU
                    Entrepreneurs looking to raise funds!
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
                    We welcome all Corporate collaborations and
                    <br /> CSR Initiatives to strengthen the startup community!
                  </p>
                </div>
              </a>
            </Link>

            <Link href="/team">
              <a className="dropdown-item">
                <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                <div>
                  <h4>Meet the team</h4>
                  <p>Get to know the Core Team of E-Cell.</p>
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
            <a className="dropdown-item" href="#">
              <FcServices fontSize="2.2rem"></FcServices>
              <div>
                <h4>Startup Bundle</h4>
                <p>
                  The Ultimate Guidebook for young <br /> entrepreneurs on
                  starting up!
                </p>
              </div>
            </a>

            <a
              className="dropdown-item"
              href="https://www.notion.so/ecelliitbhu/Entrepreneurship-Library-44a56c8083a24f9688554483b1aa3717"
            >
              <FcServices fontSize="2.2rem"></FcServices>
              <div>
                <h4>Resource Library</h4>
                <p>
                  Your go-to encyclopedia for all startup
                  <br />
                  resources- All at one place!
                </p>
              </div>
            </a>
          </li>
          <li className="dropdown-subcontainer">
            <Link href="/FAQs">
              <a className="dropdown-item">
                <FcServices fontSize="2.2rem"></FcServices>
                <div>
                  <h4>Frequently Asked Questions</h4>
                  <p>
                    Get all your startup/ E-Cell <br /> related doubts answered!
                  </p>
                </div>
              </a>
            </Link>
            <a className="dropdown-item" href="https://issuu.com/ecelliitbhu">
              <FcServices fontSize="2.2rem"></FcServices>
              <div>
                <h4>E-Digest Magazine</h4>
                <p>
                  Glance through the E-Cell <br />
                  Quarterly Magazine{" "}
                </p>
              </div>
            </a>
          </li>
          <li className="dropdown-subcontainer">
            <a
              className="dropdown-item"
              href="https://ecelliitbhu.substack.com"
            >
              <FcServices fontSize="2.2rem"></FcServices>
              <div>
                <h4>Newsletter Archives</h4>
                <p>
                  Visit our E-Cell’s Weekly Newsletter <br />
                  archive on Substack
                </p>
              </div>
            </a>
            <a
              className="dropdown-item"
              href="https://medium.com/ecelliitbhu/feature/home"
            >
              <FcServices fontSize="2.2rem"></FcServices>
              <div>
                <h4>Blogs</h4>
                <p>Visit the Official E-Cell Medium Blog</p>
              </div>
            </a>
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
export const Esummit = () => {
  return (
    <li className="nav-item dropdown learn">
      <Link href="/" passHref>
        <a className="nav-link">
          <h3>{`E-Summit'22`}</h3>
        </a>
      </Link>
    </li>
  );
};
