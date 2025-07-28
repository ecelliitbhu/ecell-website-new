"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession, signOut } from "next-auth/react";
import { getStoredUser } from "../../lib/auth";
import { toast } from "react-hot-toast";
import { query } from "firebase/database";

export default function PostLogin() {
    const router = useRouter();
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        console.log("router.isReady:", router.isReady);
        if (!router.isReady) return; //  wait until router.query is populated

        const redirectBasedOnRole = async () => {
            const tabParam = localStorage.getItem("activeTab");

            const user = await getStoredUser();

            if (!tabParam) {
                router.push("/grow-your-resume");
                return;
            }

            if (tabParam === "student" && (!user?.email || !user.email.endsWith("@itbhu.ac.in"))) {
                // setTimeout(()=>toast.error("Login from institute ID"),2000);
                router.push({
                    pathname: "/grow-your-resume",
                    query: { error: "Login with Institute ID" },
                });

                // Logout the session and redirect
                // await signOut({callbackUrl:"/grow-your-resume"});
                // setTimeout(() => toast.error("Login from institute ID"), 2000);
                // toast.error("Login from institute ID");
                // router.push("/grow-your-resume");

                return;
            }

            const roles = user.roles || [];

            if (tabParam === "student") {
                if (roles.includes("STUDENT")) {
                    try {
                        const res = await fetch(`${BACKEND_URL}/students/getinfo/${user.id}`);
                        const profile = await res.json();

                        const isComplete = profile?.name && profile?.rollNo && profile?.branch && profile?.year && profile?.courseType && profile?.cpi && profile?.resumeUrl;

                        router.push(isComplete ? "/grow-your-resume/student/opportunities" : "/grow-your-resume/student/profile?edit=true");
                    } catch (err) {
                        console.error("Profile check failed:", err);
                        router.push("/grow-your-resume/student/profile");
                    }
                } else {
                    router.push("/grow-your-resume/student/profile?edit=true");
                }
            } else if (tabParam === "recruiter") {
                if (roles.includes("RECRUITER")) {
                    try {
                        const res = await fetch(`${BACKEND_URL}/recruiters/getinfo/${user.id}`);
                        const profile = await res.json();

                        const isComplete = profile?.companyName && profile?.websiteUrl;

                        // if (isComplete && profile?.verified){
                        //   router.push("/grow-your-resume/recruiter/dashboard");
                        // }
                        // else if (!isComplete){
                        //   router.push(
                        //     "/grow-your-resume/recruiter/profile?edit=true"
                        //   );
                        // }
                        // else{
                        //   router.push("/grow-your-resume/recruiter/profile");
                        // }
                        router.push(isComplete ? "/grow-your-resume/recruiter/dashboard" : "/grow-your-resume/recruiter/profile?edit=true");
                    } catch (err) {
                        console.error("Profile fetch error:", err);
                        router.push("/grow-your-resume/recruiter/profile");
                    }
                } else {
                    router.push("/grow-your-resume/recruiter/profile?edit=true");
                }
            } else if (tabParam === "ambassador") {
                if (roles.includes("AMBASSADOR")) {
                    router.push("/campusambassador");
                } else {
                    router.push("/campus-ambassador-form");
                }
            } else {
                router.push("/grow-your-resume");
            }
        };

        redirectBasedOnRole();
    }, [router.isReady]); // Only runs when router is ready

    return <p>Redirecting...</p>;
}
