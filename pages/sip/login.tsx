"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Nav from "../../components/navbar/NavLayout";
import { Eye, EyeOff } from "lucide-react";
import { authAPI } from "../../lib/api";
import { signIn, getSession, useSession } from "next-auth/react";



const LoginPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("student");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (router.query.role) {
      setActiveTab(router.query.role);
    }
  }, [router.query.role]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleGoogleLogin = async () => {
    // Save active tab in localStorage to use after redirect
    // localStorage.setItem("activeTab", activeTab);

    // Redirect to Google login
    // await signIn("google", { callbackUrl: "/sip/post-login" });
    await signIn("google", {
      callbackUrl: `/sip/post-login?tab=${activeTab}` 
    });
  };
  

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (activeTab === "student") {
      // Validate institute email for students
      const instituteEmailRegex = /^[^\s@]+@[^\s@]+\.(edu|ac\.in)$/;
      if (!instituteEmailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid institute email address";
      }
    } else {
      // Regular email validation for recruiters
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = await authAPI.login(
        formData.email,
        formData.password,
        activeTab.toUpperCase()
      );

      // Store user data in localStorage or context
      // localStorage.setItem("user", JSON.stringify(userData));

      console.log("Login successful:", userData);

      // Redirect based on role
      console.log("Login successful:", userData);

      // Fetch the student's profile using the logged-in user's ID
      const profileRes = await fetch(`/api/student/profile/${userData.id}`);
      const profile = await profileRes.json();

      // Check if profile is complete
      const isProfileComplete =
        profile?.rollNo &&
        profile?.branch &&
        profile?.year &&
        profile?.courseType &&
        profile?.cpi;

      // Redirect accordingly
      if (activeTab === "student") {
        if (!isProfileComplete) {
          router.push("/sip/student/profile?edit=true");
        } else {
          router.push("/sip/student/opportunities");
        }
      } else {
        router.push("/sip/recruiter/dashboard");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Login failed. Please try again.");
      router.push("/sip");
      // return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login - IIT BHU Internship Portal</title>
        <meta name="description" content="Login to IIT BHU Internship Portal" />
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
        {/* Header */}
        <div className="bg-[#F15A22]">
          <Nav />
        </div>

        {/* Main Content */}
        <div className="bg-white min-h-screen">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome to IIT BHU Internship Portal
                </h2>
                <p className="text-gray-600">
                  Login to your account to continue
                </p>
              </div>

              {/* Role Tabs */}
              <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("student")}
                  className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "student"
                      ? "bg-white text-[#f56a38] shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setActiveTab("recruiter")}
                  className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "recruiter"
                      ? "bg-white text-[#f56a38] shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Recruiter
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">

                <button
                  type="button"
                  className="mt-4 w-full bg-[#f56a38] text-white py-2 px-4 rounded hover:bg-red-600"
                  onClick={() => handleGoogleLogin()}
                >
                  Continue with Google as{" "}
                  {activeTab === "student"
                    ? "Student"
                    : "Recruiter"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
