import {
  Discover,
  Initiatives,
  Learn,
  Connect,
  Team,
  Incubators,
  Contact,
  Startups,
} from "./NavItems";
import { NavLogo } from "./NavLogo";
import Link from "next/link";
import Notification from "./Notification";
import NotificationOffCanvas from "./NotificationOffcanvas";
import { useState } from "react";
import { cn } from "@/lib/utils";


const Nav = () => {
  const [collapse, setCollapse] = useState(true)
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">

          <NavLogo />
          <NotificationOffCanvas />
          <div className={cn("navbar-collapse",collapse && "max-lg:collapse")} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Discover />
              <Initiatives />
              <Learn />
              <Incubators />
              {/* <Connect /> */}
              <Team />
              <Startups />
              <Contact />
              <Notification />
            </ul>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            onClick={()=>setCollapse(!collapse)}
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Nav;
