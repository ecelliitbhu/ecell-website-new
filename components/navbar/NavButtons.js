import Link from "next/link";
import React from "react";

export const Contacts = () => {
  return (
    <button className="btn btn-outline-success" id="login" type="submit">
      Contacts
    </button>
  );
};
export const Startups = () => {
  return (
    <Link href="/startups" passHref>
      <button className="btn btn-info" id="sign-up">
        Startups
      </button>
    </Link>
  );
};
