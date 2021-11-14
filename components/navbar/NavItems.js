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
                  <h4>Events</h4>
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
                <h4>Blog</h4>
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
                <h4>Initiatives</h4>
                <p>
                  Initiatives taken up by E-Cell to improve <br /> the
                  entrepreneurship culture @ IIT BHU
                </p>
              </div>
            </a>

            <a className="dropdown-item" href="#">
              <FcCollaboration fontSize="2.2rem"></FcCollaboration>
              <div>
                <h4>Showcase</h4>
                <p>
                  Uncover the great startups <br />
                  that have been #BuiltinIITBHU
                </p>
              </div>
            </a>
          </li>
          <ul className="dropdown-subcontainer right-nav-column">
            <div className="right-nav-column-sub">
              <li>
                <Link className="dropdown-item" href="/gallery">
                  Gallery
                </Link>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Baba black sheep
                </a>
              </li>
            </div>
            <div className="right-nav-column-sub">
              <li>
                <a className="dropdown-item" href="#">
                  Jonny Jonny
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Humpty dumpty sat on a wall
                </a>
              </li>
            </div>
          </ul>
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
                <h4>Opportunity Connect</h4>
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
export const Connect = () => {
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
        <h3>Connect</h3>
        <RiArrowDropDownLine fontSize="2rem"></RiArrowDropDownLine>
      </a>
      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        <ul className="dropdown-container">
          <li className="dropdown-subcontainer">
            <a className="dropdown-item" href="#">
              <FcAddressBook fontSize="2.2rem"></FcAddressBook>
              <div>
                <h4>For Students</h4>
                <p>
                  Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                </p>
              </div>
            </a>

            <a className="dropdown-item" href="#">
              <FcAddressBook fontSize="2.2rem"></FcAddressBook>
              <div>
                <h4>For VCs, Angel Investors and firms</h4>
                <p>
                  Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                </p>
              </div>
            </a>
          </li>
          <li className="dropdown-subcontainer">
            <a className="dropdown-item" href="#">
              <FcAddressBook fontSize="2.2rem"></FcAddressBook>
              <div>
                <h4>For Startups</h4>
                <p>
                  Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                </p>
              </div>
            </a>

            <a className="dropdown-item" href="#">
              <FcAddressBook fontSize="2.2rem"></FcAddressBook>
              <div>
                <h4>For Collaborations</h4>
                <p>
                  Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                </p>
              </div>
            </a>
          </li>
          <li className="dropdown-subcontainer">
            <a className="dropdown-item" href="#">
              <FcAddressBook fontSize="2.2rem"></FcAddressBook>
              <div>
                <h4>Sponsors and Associates</h4>
                <p>
                  Lorem ipsum dolor sit <br /> amet consectetur adipisicing
                </p>
              </div>
            </a>

            <Link href="/team">
              <a className="dropdown-item">
                <FcAddressBook fontSize="2.2rem"></FcAddressBook>
                <div>
                  <h4>Team</h4>
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
                <h4>Blog</h4>
                <p>How-to guides, interviews, articles, and more</p>
              </div>
            </a>

            <a className="dropdown-item" href="#">
              <FcServices fontSize="2.2rem"></FcServices>
              <div>
                <h4>Event updates</h4>
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
                <h4>How E-Cell Works</h4>
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
                  <h4>FAQ &amp; Support</h4>
                  <p>Get your questions answered</p>
                </div>
              </a>
            </Link>
          </li>
          <li className="dropdown-subcontainer">
            <a className="dropdown-item" href="#">
              <FcServices fontSize="2.2rem"></FcServices>
              <div>
                <h4>Courses</h4>
                <p>Learn from the Entrepreneurship Experts</p>
              </div>
            </a>

            <a className="dropdown-item" href="#">
              <FcServices fontSize="2.2rem"></FcServices>
              <div>
                <h4>Forum</h4>
                <p>
                  Where those who work with Lottie <br />
                  can come together
                </p>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </li>
  );
};
