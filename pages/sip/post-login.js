"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { getStoredUser } from "../../lib/auth";

export default function PostLogin() {
  const router = useRouter();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    console.log("router.isReady:", router.isReady);
    console.log("router.query:", router.query);
    if (!router.isReady) return; //  wait until router.query is populated

    const redirectBasedOnRole = async () => {
      // const user = await getStoredUser();
      // console.log("user: ", user)

      const tabParam = Array.isArray(router.query.tab)
        ? router.query.tab[0]
        : router.query.tab;

      console.log("tabParam:", tabParam);

      const user = await getStoredUser();
      console.log("user: ", user);


      if (!tabParam) {
        router.push("/sip");
        return;
      }

      const roles = user.roles || [];
      console.log("student id: ", user.id)

      if (tabParam === "student") {
        if (roles.includes("STUDENT")) {
          try {
            // const studentId = await getStudentId();
            console.log("student id: ", user.id)
            const res = await fetch(`${BACKEND_URL}/students/${user.id}`);
            const profile = await res.json();

            const isComplete =
              profile?.rollNo &&
              profile?.branch &&
              profile?.year &&
              profile?.courseType &&
              profile?.cpi;

            router.push(
              isComplete
                ? "/sip/student/opportunities"
                : "/sip/student/profile?edit=true"
            );
          } catch (err) {
            console.error("Profile check failed:", err);
            router.push("/sip/student/profile");
          }
        } else {
          router.push("/sip");
        }
      } else if (tabParam === "recruiter") {
        if (roles.includes("RECRUITER")) {
          try {
            const res = await fetch(`${BACKEND_URL}/recruiters/${user.id}`);
            const profile = await res.json();

            const isComplete = profile?.companyName && profile?.websiteUrl;

            router.push(
              isComplete
                ? "/sip/recruiter/dashboard"
                : "/sip/recruiter/profile?edit=true"
            );
          } catch (err) {
            console.error("Profile fetch error:", err);
            router.push("/sip/recruiter/profile");
          }
        } else {
          router.push("/sip");
        }
      } else if (tabParam === "ambassador") {
        if (roles.includes("AMBASSADOR")) {
          router.push("/campusambassador");
        } else {
          router.push("/campus-ambassador-form");
        }
      } else {
        router.push("/sip");
      }
    };

    redirectBasedOnRole();
  }, [router.isReady]); // Only runs when router is ready

  return <p>Redirecting...</p>;
}
