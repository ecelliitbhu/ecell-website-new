"use client";

import Head from "next/head";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { NavLogo } from "../../../components/navbar/NavLogo";

export default function VerificationPendingPage() {
    return (
        <>
            <Head>
                <title>Verification Pending - IIT BHU Grow Your Resume</title>
                <meta
                    name="description"
                    content="Your recruiter registration is waiting for verification"
                />
            </Head>

            <div className="min-h-screen bg-white font-poppins">
                <header className="bg-[#f8f9fa] text-black">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center">
                                <NavLogo />
                                <h1 className="text-xl font-bold ml-4">
                                    IIT BHU Grow Your Resume
                                </h1>
                            </div>
                            <button
                                onClick={() => signOut({ callbackUrl: "/grow-your-resume" })}
                                className="flex items-center px-4 py-2 text-black hover:bg-[#f56a38] hover:text-white rounded transition-colors"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                <main className="flex items-center justify-center py-20 px-4 text-center">
                    <div className="max-w-md">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                            Verification Pending
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Your recruiter profile was submitted successfully. Please
                            wait while we verify your registration.
                        </p>
                        <div className="flex justify-center gap-3">
                            <Link
                                href="/grow-your-resume/recruiter/profile"
                                className="px-4 py-2 bg-[#f56a38] text-white rounded hover:bg-[#e55a32]"
                            >
                                View Profile
                            </Link>
                            <Link
                                href="/grow-your-resume"
                                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                            >
                                Home
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
