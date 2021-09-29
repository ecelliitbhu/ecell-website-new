import React from "react";
import Image  from "next/image";
import logo from "../../public/Ecell-logo.png"
export const NavLogo = () => {
  return (
    <a className="navbar-brand" href="#">
      {/* <img
        src="https://static.lottiefiles.com/images/v3/lottiefiles-logo.svg"
        alt="Lottiefiles Logo"
        className="lf-logo lf-logo-dark -mt-1"
      /> */}
      <Image src={logo} height="70" width="150"></Image>
    </a>
  );
};
