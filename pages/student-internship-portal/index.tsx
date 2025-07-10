"use client";
import Head from "next/head";
import Link from "next/link";
import Nav from "../../components/navbar/NavLayout";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";




const SipLanding = () => {
  console.log("insti-out");
  const router = useRouter();
  
  // console.log(props);
  console.log(router.query);
  if (router.query) {
    useEffect(() => {
      console.log("insti");
      if (router.query.error) {
        toast.error(router.query.error.toString());
      }
    }, [router.query]);
  }
  return (
    <>
      <Head>
        <title>IIT BHU Internship Portal</title>
        <meta
          name="description"
          content="Connecting talented IIT BHU students with leading companies for internship opportunities."
        />
        <meta name="robots" content="index, follow" />
        <link rel="shortcut icon" href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`font-family:'Poppins',sans-serif;`}</style>
      </Head>

      <div
        className="min-h-screen bg-white"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        {/* Header Section */}
        <div className="bg-[#F15A22]">
          <Nav />
        </div>

        {/* Main Content */}
        <div className="bg-white">
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              IIT BHU Internship Portal
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Connecting talented IIT BHU students with leading companies for
              internship opportunities.
            </p>

            <Link
              href="/student-internship-portal/login"
              className="inline-block px-8 py-3 bg-[#F15A22] text-white font-medium rounded-lg hover:bg-[#F15A22] transition-colors mb-16"
            >
              Login
            </Link>
          </div>

          {/* Three Column Section */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <div className="grid md:grid-cols-3 gap-8">
              {/* For Students */}
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  For Students
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Browse internship opportunities, customize your profile, and
                  apply directly to companies.
                </p>
                <Link
                  href="/student-internship-portal/login?role=student"
                  className="inline-block w-full px-6 py-3 bg-[#F15A22] border border-gray-300 text-white font-medium rounded-lg hover:bg-[#ee7448] transition-colors"
                >
                  Student Login
                </Link>
              </div>

              {/* For Recruiters */}
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  For Recruiters
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Post internship opportunities, manage applications, and find
                  the perfect candidates.
                </p>
                <Link
                  href="/student-internship-portal/login?role=recruiter"
                  className="inline-block w-full px-6 py-3 bg-[#F15A22] border border-gray-300 text-white font-medium rounded-lg hover:bg-[#ee7448] transition-colors"
                >
                  Recruiter Login
                </Link>
              </div>

              {/* About IIT BHU */}
              <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  About IIT BHU
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  IIT BHU produces some of India's brightest engineering and
                  technical talents.
                </p>
                <a
                  href="https://iitbhu.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full px-6 py-3 bg-[#F15A22] border border-gray-300 text-white font-medium rounded-lg hover:bg-[#ee7448] transition-colors"
                >
                  Visit IIT BHU Website
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SipLanding;
