"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { LogOut, Save, Edit, X } from "lucide-react";
import { NavLogo } from "../../../components/navbar/NavLogo";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
import { recruitersAPI } from "../../../lib/api";
import { getRecruiterId } from "../../../lib/auth";
import { signOut } from "next-auth/react";
// import { toast } from "@/components/ui/use-toast";
import { toast } from "react-hot-toast";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    companyName: "",
    emailId: "",
    address: "",
    websiteUrl: ""
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...profileData });
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { edit } = router.query;

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    loadProfile();
    if (edit === "true") {
      setIsEditing(true);
    }
  }, [edit]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const recruiterId = await getRecruiterId();
      if (!recruiterId) {
        router.push("/sip/login");
        return;
      }

      const response = await fetch(`${BACKEND_URL}/recruiters/${recruiterId}`);
      const data = await response.json();

      // if (!response.ok) {
      //   throw new Error(data.message || "Failed to load recruiter data");
      // }
      if (!response.ok) {
        if (data.error === "RECRUITER_NOT_FOUND") {
          toast.error(data.message); // Optional: show message
          await signOut({ redirect: false }); // don't auto-redirect
          router.push(data.redirectTo); // send user to recruiter login
          return;
        }
      }

      const recruiter = await recruitersAPI.getProfile(recruiterId);
      const profileData = {
        companyName: recruiter.companyName,
        emailId: recruiter.user.email,
        address: recruiter.address || "",
        websiteUrl: recruiter.websiteUrl || "",
      };
      setProfileData(profileData);
      setEditData(profileData);
    } catch (error) {
      console.error("Error loading profile:", error);
      alert("Failed to load profile");
    } finally {
      setIsLoading(false);
    }
  };


  const handleInputChange = (field:any, value:any) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const recruiterId = await getRecruiterId();
      if (!recruiterId) {
        alert("Please log in to update profile");
        return;
      }

      await recruitersAPI.updateProfile(recruiterId, {
        companyName: editData.companyName || "",
        address: editData.address || "",
        websiteUrl: editData.websiteUrl || "",
      });

      setProfileData({ ...editData });
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error:any) {
      console.error("Error updating profile:", error);
      alert(error.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...profileData });
  };

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/sip");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#f56a38] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>My Profile - IIT BHU Portal</title>
        <meta name="description" content="Recruiter profile and information" />
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
        <div className="bg-[#f8f9fa] text-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center">
                <NavLogo />
                <h1 className="text-xl font-bold ml-4">
                  IIT BHU Internship Portal
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  Welcome, {profileData?.companyName || "Recruiter"}
                </span>
                <Link
                  href="/sip/recruiter/dashboard"
                  className="px-4 py-2 text-black hover:bg-[#f56a38] hover:text-white rounded transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/sip/recruiter/profile"
                  className="px-4 py-2 bg-white text-black rounded font-medium hover:bg-gray-100 transition-colors"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-black hover:bg-[#f56a38] hover:text-white rounded transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-6 py-3 bg-[#f56a38] text-white rounded-lg hover:bg-[#e55a32] focus:outline-none focus:ring-2 focus:ring-[#f56a38] focus:ring-offset-2 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>

            {/* Profile Form */}
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Recruiter Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name *
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.companyName}
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                      {profileData.companyName}
                    </div>
                  )}
                </div>

                {/* Email ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email ID *
                  </label>
                  <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                    {profileData.emailId}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Email cannot be changed
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <div className="grid md:grid-cols-1 gap-6">
                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.address}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                        placeholder="Bangalore"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                        {profileData.address}
                      </div>
                    )}
                  </div>

                  {/* Website URL */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website Link
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={editData.websiteUrl}
                        onChange={(e) =>
                          handleInputChange("websiteUrl", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                        placeholder="https://company.com"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                        {profileData.websiteUrl ? (
                          <a
                            href={profileData.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {profileData.websiteUrl}
                          </a>
                        ) : (
                          <span className="text-gray-500">Not provided</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && (
                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    onClick={handleCancel}
                    className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center px-6 py-3 bg-[#f56a38] text-white rounded-lg hover:bg-[#e55a32] focus:outline-none focus:ring-2 focus:ring-[#f56a38] focus:ring-offset-2 transition-colors"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
