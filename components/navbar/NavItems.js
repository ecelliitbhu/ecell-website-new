import React, { useState } from "react";
import Link from "next/link";
import {
  FcApproval,
  FcIdea,
  FcFinePrint,
  FcCollaboration,
  FcNews,
} from "react-icons/fc";
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
            <Link href="/who_we_are" className="dropdown-item">
              <FcFinePrint fontSize="2rem"></FcFinePrint>
              <div>
                <h4>Who we are?</h4>
                <p>
                  Get to Know the E-Cell,
                  <br />
                  who we are and what we do.
                </p>
              </div>
            </Link>
            <Link href="/events" className="dropdown-item">
              <FcFinePrint fontSize="2rem"></FcFinePrint>
              <div>
                <h4>Events</h4>
                <p>
                  Discover the buzzing events
                  <br />
                  happening throughout the year!
                </p>
              </div>
            </Link>
          </li>
          <li className="dropdown-subcontainer">
            <Link href="/gallery" className="dropdown-item">
              <FcFinePrint fontSize="2rem"></FcFinePrint>
              <div>
                <h4>Gallery</h4>
                <p>
                  A glimpse of our culture through <br /> our E-Album!
                </p>
              </div>
            </Link>
            <Link href="/team" className="dropdown-item">
              <FcFinePrint fontSize="2rem"></FcFinePrint>
              <div>
                <h4>Meet the team</h4>
                <p>
                  Get to know the Core Team <br /> of E-Cell.
                </p>
              </div>
            </Link>
          </li>
          <li className="dropdown-subcontainer">
            <Link href="/past_speakers" className="dropdown-item">
              <FcFinePrint fontSize="2rem"></FcFinePrint>
              <div>
                <h4>Past speakers</h4>
                <p>
                  Witness our expansive lineup of <br /> prominent speakers and
                  guests!
                </p>
              </div>
            </Link>
            <a
              className="dropdown-item"
              href="https://esummit.ecelliitbhu.com/sponsors/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FcFinePrint fontSize="2rem"></FcFinePrint>
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
              <FcApproval fontSize="2rem"></FcApproval>
              <div>
                <h4>Internship Portal</h4>
                <p>
                  Reach out to us for getting interns
                  <br /> for your budding startup!
                </p>
              </div>
            </a>

            <a
              className="dropdown-item"
              href="https://ecelliitbhu.notion.site/Startup-Services-Portal-33cd37c10e204f7c9b1cd2c465016429"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FcApproval fontSize="2rem"></FcApproval>
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
            <a className="dropdown-item" href="https://iaan.ecelliitbhu.com">
              <FcApproval fontSize="2rem"></FcApproval>
              <div>
                <h4>IIT BHU Alumni Angel Network</h4>
                <p>
                  An initiative by IIT BHU Alumni
                  <br /> and E-Cell IIT BHU
                </p>
              </div>
            </a>

            <Link href="/mentorship_pool" passHref className="dropdown-item">
              <FcApproval fontSize="2rem"></FcApproval>
              <div>
                <h4>
                  Startup Mentor Pool
                </h4>
                <p>
                  {`Elevate Your Journey:`}
                  <br /> {`Join Our Startup Mentor Pool for Guided Success!`}
                </p>
              </div>
            </Link>
          </li>
          <li className="dropdown-subcontainer">
            <Link href="/cd" passHref className="dropdown-item">
              <FcApproval fontSize="2rem"></FcApproval>
              <div>
                <h4>
                  Campus Executive <br /> Internship
                </h4>
                <p>
                  {`Join our initiative of creating & motivating`}
                  <br /> {`the entrepreneurs of your college!`}
                </p>
              </div>
            </Link>
            <Link href="/coming_soon" passHref className="dropdown-item">
              <FcApproval fontSize="2rem"></FcApproval>
              <div>
                <h4>Scale</h4>
                <p>
                  Link with alumni, use our incubators,
                  <br />
                  pitch to Angel Investors & VCs!
                </p>
              </div>
            </Link>
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
      className="nav-item dropdown incubate"
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
              href="https://i3f-iitbhu.org/"
              rel="noreferrer"
              target="_blank"
            >
              <FcIdea fontSize="2rem"></FcIdea>
              <div>
                <h4>
                  {"Ideation Innovation"} <br />
                  {"& Incubation Foundation"}
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
              <FcIdea fontSize="2rem"></FcIdea>
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
              href="https://i3f-iitbhu.org/"
              rel="noreferrer"
              target="_blank"
            >
              <FcIdea fontSize="2rem"></FcIdea>
              <div>
                <h4>
                  NCL-IIT BHU <br /> Incubation Centre
                </h4>
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
              <FcIdea fontSize="2rem"></FcIdea>
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
              href="https://i3f-iitbhu.org/"
              rel="noreferrer"
              target="_blank"
            >
              <FcIdea fontSize="2rem"></FcIdea>
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
              href="https://www.iitbhu.ac.in/contents/institute/cf/misc/doc/innovation_start_up_policy.pdf"
              rel="noreferrer"
              target="_blank"
            >
              <FcIdea fontSize="2rem"></FcIdea>
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
      className="nav-item connect"
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
            <a
              className="dropdown-item"
              href="https://wa.me/+918793177332"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FcCollaboration fontSize="2rem"></FcCollaboration>
              <div>
                <h4>For students</h4>
                <p>
                  Connect with us to request for <br /> any kind of startup
                  assistance.
                </p>
              </div>
            </a>

            <a
              className="dropdown-item"
              href="https://wa.me/+919120787959"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FcCollaboration fontSize="2rem"></FcCollaboration>
              <div>
                <h4>For startups</h4>
                <p>
                  Reach out to us for any startup assistance/ <br /> guidance/
                  referral and other opportunities!
                </p>
              </div>
            </a>
          </li>
          <li className="dropdown-subcontainer">
            <a
              className="dropdown-item"
              href="https://wa.me/+918793177332"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FcCollaboration fontSize="2rem"></FcCollaboration>
              <div>
                <h4>For alumni</h4>
                <p>
                  We’d love to network with our alums <br /> working towards the
                  same cause!
                </p>
              </div>
            </a>

            <a
              className="dropdown-item"
              href="https://wa.me/+919120787959"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FcCollaboration fontSize="2rem"></FcCollaboration>
              <div>
                <h4>For Investor and VCs</h4>
                <p>
                  Reach out to us for the full database of <br /> IIT BHU
                  Entrepreneurs looking to raise funds!
                </p>
              </div>
            </a>
          </li>
          <li className="dropdown-subcontainer">
            <a
              className="dropdown-item"
              href="https://wa.me/+918793177332"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FcCollaboration fontSize="2rem"></FcCollaboration>
              <div>
                <h4>For corporates</h4>
                <p>
                  We welcome all Corporate <br /> collaborations and CSR
                  Initiatives to
                  <br />
                  strengthen the startup community!
                </p>
              </div>
            </a>
            <a
              className="dropdown-item"
              href="https://wa.me/+918793177332"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FcCollaboration fontSize="2rem"></FcCollaboration>
              <div>
                <h4>For internship listing</h4>
                <p>
                  Reach out to us to list your <br /> intership for hiring.
                </p>
              </div>
            </a>
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
            <Link href={"/startup_help_book"} className="dropdown-item">
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}

              <div>
                <FcNews fontSize="2rem"></FcNews>
                <div>
                  <h4>Startup HelpBook</h4>
                  <p>
                    The Ultimate Guidebook for young <br /> entrepreneurs on
                    starting up!
                  </p>
                </div>
              </div>
            </Link>

            <a
              className="dropdown-item"
              href="https://www.notion.so/ecelliitbhu/Entrepreneurship-Library-44a56c8083a24f9688554483b1aa3717"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FcNews fontSize="2rem"></FcNews>
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
            <Link
              href="https://medium.com/ecelliitbhu/feature/home"
              className="dropdown-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FcNews fontSize="2rem"></FcNews>
              <div>
                <h4>Blogs</h4>
                <p>
                  Visit the Official E-Cell <br /> Medium Blog
                </p>
              </div>
            </Link>
            <Link
              className="dropdown-item"
              href="https://issuu.com/ecelliitbhu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FcNews fontSize="2rem"></FcNews>
              <div>
                <h4>E-Digest Magazine</h4>
                <p>
                  Glance through the E-Cell <br />
                  Quarterly Magazine{" "}
                </p>
              </div>
            </Link>
          </li>
          <li className="dropdown-subcontainer">
            <Link
              className="dropdown-item"
              href="https://ecelliitbhu.substack.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FcNews fontSize="2rem"></FcNews>
              <div>
                <h4>Newsletter Archives</h4>
                <p>
                  Visit our E-Cell’s Weekly Newsletter <br />
                  archive on Substack
                </p>
              </div>
            </Link>
            <Link href={"/FAQs"} className="dropdown-item">
              <FcNews fontSize="2rem"></FcNews>
              <div>
                <h4>Frequently Asked Questions</h4>
                <p>
                  Get all your startup/ E-Cell <br /> related doubts answered!
                </p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};
export const Contact = () => {
  return (
    <li className="nav-item dropdown contact-nav">
      <Link href="/contacts" passHref className="nav-link">
        <h3>Contact</h3>
      </Link>
    </li>
  );
};
export const Team = () => {
  return (
    <li className="nav-item dropdown contact-nav">
      <Link href="/team" passHref className="nav-link">
        <h3>Team</h3>
      </Link>
    </li>
  );
};
export const Startups = () => {
  return (
    <li className="nav-item dropdown startups-nav">
      <Link href="/startups" passHref className="nav-link">
        <h3>Startups</h3>
      </Link>
    </li>
  );
};

export const SignInButton = () => {
  return (
    
       <Link href="/signin" passHref  >
    <button
      aria-label="Sign in with Google"
      className="flex items-center  border border-gray-300 rounded-full p-0.5 pr-5 shadow-md"
    >
      <span className="text-sm text-gray-300 tracking-wider">Sign in with </span>
      <div className="flex items-center justify-center  w-9 h-9 rounded-l-md">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" className="w-5 h-5">
          <title>Sign in with Google</title>
          <desc>Google G Logo</desc>
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285f4"
          ></path>
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34a853"
          ></path>
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#fbbc05"
          ></path>
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#ea4335"
          ></path>
        </svg>
      </div>
      
    </button>
    </Link>
    
  );
};