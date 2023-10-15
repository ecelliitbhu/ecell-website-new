import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import logo from "../../public/Ecell-logo.png";
export const NavLogo = () => {
  return (
    <div className="navbar-brand">
      <Link href="/" passHref legacyBehavior>
        <Image
          src={logo}
          height="50"
          width="120"
          className="lf-logo lf-logo-dark -mt-1"
          alt="Ecell IIT BHU"
        ></Image>
      </Link>
    </div>
  );
};
