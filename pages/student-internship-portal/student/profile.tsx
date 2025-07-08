"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { LogOut, Save, Edit, X } from "lucide-react";
import { NavLogo } from "../../../components/navbar/NavLogo";
import { useRouter } from "next/router";
import { studentsAPI } from "../../../lib/api";
import { getStudentId, getStoredUser } from "../../../lib/auth";
import { toast } from "react-hot-toast";
import {UserWithRoles} from "../../../lib/types"
import { getSession, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";


const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    rollNumber: "",
    emailId: "",
    cpi: "",
    branch: "",
    linkedinLink: "",
    githubLink: "",
    resumeLink: "",
    year: "",
    courseType: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...profileData });
  const [isLoading, setIsLoading] = useState(true);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { data: session, update } = useSession();

  const router = useRouter();
  const { edit } = router.query;

  
  useEffect(() => {
    loadProfile();
    if (edit === "true") {
      setIsEditing(true);
    }
  }, [edit]);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const rawUser = (await getStoredUser());
      if (!rawUser) {
        router.push("/student-internship-portal/login");
        return;
      }
      const user = rawUser as UserWithRoles;
      const roles = user.roles || [];
      if (roles.includes("STUDENT")){
        const response = await fetch(
          `${BACKEND_URL}/students/getinfo/${user.id}`
        );
        const student = await response.json();
        const profileData = {
          name: student.name,
          rollNumber: student.rollNo,
          emailId: student.user.email,
          cpi: student.cpi.toString(),
          branch: student.branch,
          linkedinLink: student.linkedinUrl || "",
          githubLink: student.githubUrl || "",
          resumeLink: student.resumeUrl || "",
          year: `${student.year}${getOrdinalSuffix(student.year)} Year`,
          courseType: student.courseType,
        };
        setProfileData(profileData);
        setEditData(profileData);
      }
      else{
        const rawUser = await getStoredUser();
        if (!rawUser) {
          router.push("/student-internship-portal/login");
          return;
        }
        const user = rawUser as UserWithRoles;
        const response = await fetch(`${BACKEND_URL}/users/getid/${user.id}`);
        const defaultUser = await response.json();
        const profileData = {
          name: "",
          rollNumber: "",
          emailId: defaultUser.email,
          cpi: "",
          branch: "Architecture, Planning and Design",
          linkedinLink: "",
          githubLink: "",
          resumeLink: "",
          year: "1st Year",
          courseType: "B.Tech",
        };
        setProfileData(profileData);
        setEditData(profileData);
      }
    } 
    catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Failed to load profile");
    } 
    finally {
      setIsLoading(false);
    }
  };

  const getOrdinalSuffix = (num:any) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = num % 100;
    return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
  };

  const handleInputChange = (field:any, value:any) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      console.log("saving..");
      const studentId = await getStudentId();
      if (!studentId) {
        toast.error("Please log in to update profile");
        return;
      }
      if (!editData.name) {
        toast.error("Name is required.");
        return;
      } else if (!editData.rollNumber) {
        toast.error("Roll Number is required.");
        return;
      } else if (!editData.cpi) {
        toast.error("CPI is required.");
        return;
      } else if (!editData.resumeLink) {
        toast.error("Resume is required.");
        return;
      }
        const data = {
          userId: studentId,
          name: editData.name,
          rollNo: editData.rollNumber,
          branch: editData.branch,
          cpi: Number.parseFloat(editData.cpi) || 0,
          courseType: editData.courseType || "",
          year: parseInt(
            editData.year.split("st")[0] ||
              editData.year.split("nd")[0] ||
              editData.year.split("rd")[0] ||
              editData.year.split("th")[0]
          ),
          linkedinUrl: editData.linkedinLink || "",
          githubUrl: editData.githubLink || "",
          resumeUrl: editData.resumeLink || "",
        };

      const rawUser = await getStoredUser();
      if (!rawUser) {
        router.push("/student-internship-portal/login");
        return;
      }
      const user = rawUser as UserWithRoles;
      const roles=user.roles
      if (!roles?.includes("STUDENT")) {
        try {
          const res = await fetch(`${BACKEND_URL}/students/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });


          if (!res.ok) {
            const error = await res.json();
            console.error("Failed to create student:", error);
            // Handle error UI or rethrow if needed
            throw new Error(error.message || "Failed to create student");
          }
          const updatedRoles = Array.from(
            new Set([...(roles || []), "STUDENT"])
          );

          if (session?.user) {
            await update({
              user: {
                ...session.user,
                roles: updatedRoles,
              },
            });
          }
          const newSession = await getSession();
        } catch (error) {
          console.error("Error creating student:", error);
        }
      }
      else{
        await studentsAPI.updateProfile(studentId, data);
      }

      // setProfileData({ ...editData });
      await loadProfile();
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error:any) {
      console.error("Error updating profile:", error);
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...profileData });
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/student-internship-portal" });
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
        <meta name="description" content="Student profile and information" />
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
                <span className="text-sm">Welcome, {profileData.name}</span>
                <Link
                  href="/student-internship-portal/student/opportunities"
                  className="px-4 py-2 text-black hover:bg-[#f56a38] hover:text-white rounded transition-colors"
                >
                  Opportunities
                </Link>
                <Link
                  href="/student-internship-portal/student/profile"
                  className="px-4 py-2 bg-white text-black rounded font-medium hover:bg-gray-100 transition-colors"
                >
                  My Profile
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
                Student Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                      {profileData.name}
                    </div>
                  )}
                </div>

                {/* Roll Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Roll Number *
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.rollNumber}
                      onChange={(e) =>
                        handleInputChange("rollNumber", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                      {profileData.rollNumber}
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

                {/* CPI */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CPI *
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.cpi}
                      onChange={(e) => handleInputChange("cpi", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                      placeholder="9.2"
                    />
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                      {profileData.cpi}
                    </div>
                  )}
                </div>

                {/* Branch */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch *
                  </label>
                  {isEditing ? (
                    <select
                      value={editData.branch}
                      onChange={(e) =>
                        handleInputChange("branch", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                    >
                      <option value="Architecture, Planning and Design">
                        Architecture, Planning and Design
                      </option>
                      <option value="Biomedical Engineering">
                        Biomedical Engineering
                      </option>
                      <option value="Ceramic Engineering">
                        Ceramic Engineering
                      </option>
                      <option value="Chemical Engineering">
                        Chemical Engineering
                      </option>
                      <option value="Civil Engineering">
                        Civil Engineering
                      </option>
                      <option value="Computer Science and Engineering">
                        Computer Science and Engineering
                      </option>
                      <option value="Electrical Engineering">
                        Electrical Engineering
                      </option>
                      <option value="Electronics Engineering">
                        Electronics Engineering
                      </option>
                      <option value="Mechanical Engineering">
                        Mechanical Engineering
                      </option>
                      <option value="Metallurgical Engineering">
                        Metallurgical Engineering
                      </option>
                      <option value="Mining Engineering">
                        Mining Engineering
                      </option>
                      <option value="Pharmaceutical Engineering and Technology">
                        Pharmaceutical Engineering and Technology
                      </option>
                      <option value="Biochemical Engineering">
                        Biochemical Engineering
                      </option>
                      <option value="Industrial Chemistry">
                        Industrial Chemistry
                      </option>
                      <option value="Mathematical Sciences">
                        Mathematical Sciences
                      </option>
                      <option value="Engineering Physics">
                        Engineering Physics
                      </option>
                      <option value="Chemistry">Chemistry</option>
                      <option value="Material Science and Technology">
                        Material Science and Technology
                      </option>
                    </select>
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                      {profileData.branch}
                    </div>
                  )}
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year *
                  </label>
                  {isEditing ? (
                    <select
                      value={editData.year}
                      onChange={(e) =>
                        handleInputChange("year", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                      <option value="5th Year">5th Year</option>
                    </select>
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                      {profileData.year}
                    </div>
                  )}
                </div>

                {/* Course Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Type *
                  </label>
                  {isEditing ? (
                    <select
                      value={editData.courseType}
                      onChange={(e) =>
                        handleInputChange("courseType", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                    >
                      <option value="B.Tech">B.Tech</option>
                      <option value="B.Arch">B.Arch</option>
                      <option value="IDD">IDD</option>
                      <option value="M.Tech">M.Tech</option>
                      <option value="PhD">PhD</option>
                    </select>
                  ) : (
                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">
                      {profileData.courseType}
                    </div>
                  )}
                </div>
              </div>

              {/* Links Section */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Links
                </h4>
                <div className="grid md:grid-cols-1 gap-6">
                  {/* LinkedIn Link */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={editData.linkedinLink}
                        onChange={(e) =>
                          handleInputChange("linkedinLink", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                        placeholder="https://linkedin.com/in/your-profile"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                        {profileData.linkedinLink ? (
                          <a
                            href={profileData.linkedinLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {profileData.linkedinLink}
                          </a>
                        ) : (
                          <span className="text-gray-500">Not provided</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* GitHub Link */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub Profile
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={editData.githubLink}
                        onChange={(e) =>
                          handleInputChange("githubLink", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                        placeholder="https://github.com/your-username"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                        {profileData.githubLink ? (
                          <a
                            href={profileData.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {profileData.githubLink}
                          </a>
                        ) : (
                          <span className="text-gray-500">Not provided</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Resume Link */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resume Link *
                    </label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={editData.resumeLink}
                        onChange={(e) =>
                          handleInputChange("resumeLink", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                        placeholder="https://drive.google.com/file/d/your-resume"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                        {profileData.resumeLink ? (
                          <a
                            href={profileData.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View Resume
                          </a>
                        ) : (
                          <span className="text-gray-500">Not provided</span>
                        )}
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mt-1">
                      Link to your resume (Google Drive, Dropbox, etc.)
                    </p>
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
