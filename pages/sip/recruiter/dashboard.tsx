"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { LogOut, Edit, Plus, Trash2, Eye, X, ExternalLink } from "lucide-react";
import { NavLogo } from "../../../components/navbar/NavLogo";
import { useRouter } from "next/navigation";
import { postsAPI, applicationsAPI } from "../../../lib/api";
import { getRecruiterId } from "../../../lib/auth";
import { signOut } from "next-auth/react";
// import { toast } from "@/components/ui/use-toast";
import { toast } from "react-hot-toast";

const RecruiterDashboard = () => {
  const [activeTab, setActiveTab] = useState("postings");
  const [postings, setPostings] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedPosting, setSelectedPosting] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPosting, setEditingPosting] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentRecruiter, setCurrentRecruiter] = useState(null);
  const [error, setError] = useState(null);

  const router = useRouter();
  useEffect(() => {
    const loadData = async () => {
      const recruiter = await loadRecruiterData();
      if (recruiter) {
        await loadDashboardData(recruiter);
      }
    };
    loadData();
  }, []);

  const loadRecruiterData = async () => {
    try {
      const recruiterId = await getRecruiterId();
      if (!recruiterId) {
        console.error("No recruiter ID found");
        return null;
      }

      const response = await fetch(`/api/recruiters/${recruiterId}`);
      const data = await response.json();

      if (!response.ok) {
        if (data.error === "RECRUITER_NOT_FOUND") {
          toast.error(data.message);
          await signOut({ redirect: false });
          router.push(data.redirectTo);
          return null;
        }
      }

      console.log("Recruiter data loaded:", data);
      setCurrentRecruiter(data); // still set it in state for other components

      const isComplete = data?.companyName && data?.websiteUrl;
      if (!isComplete) {
        router.push("/sip/recruiter/profile?edit=true");
      }

      return data; // return recruiter object
    } catch (error) {
      console.error("Error loading recruiter data:", error);
      setError("Failed to load recruiter profile");
      return null;
    }
  };
  

  const loadDashboardData = async (recruiter) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Fetching all posts...");
      const posts = await postsAPI.getAll();
      console.log("All posts received:", posts.length);

      const recruiterPosts = posts.filter((post) => {
        console.log(
          `Checking post ${post.id}: recruiterId=${post.recruiterId}, looking for=${recruiter.id}`
        );
        return post.recruiterId === recruiter.id;
      });

      console.log(
        `Found ${recruiterPosts.length} posts for recruiter ${recruiter.id}`
      );

      const formattedPosts = recruiterPosts.map((post) => ({
        id: post.id,
        title: post.jobTitle,
        company: post.companyName,
        location: post.location,
        type: post.jobType,
        stipend: post.stipend,
        skills: Array.isArray(post.requiredSkills) ? post.requiredSkills : [],
        applicationCount: post.applications?.length || 0,
        postedDate: post.createdAt,
        description: post.jobDescription,
        qualification: post.qualification,
        experience: post.experience,
      }));

      setPostings(formattedPosts);

      // Load applications for recruiter's posts
      console.log("Fetching all applications...");
      const allApplications = await applicationsAPI.getAll();
      console.log("All applications received:", allApplications.length);

      const recruiterApplications = allApplications.filter((app) => {
        const isRecruiterApp = recruiterPosts.some(
          (post) => post.id === app.postId
        );
        console.log(
          `Application ${app.id} for post ${app.postId}: belongs to recruiter = ${isRecruiterApp}`
        );
        return isRecruiterApp;
      });

      console.log(
        `Found ${recruiterApplications.length} applications for recruiter`
      );

      const formattedApplications = recruiterApplications.map((app) => {
        console.log(
          "Formatting application:",
          app.id,
          "Student:",
          app.student?.name
        );
        return {
          id: app.id,
          postingId: app.postId,
          postingTitle: app.post?.jobTitle || "Unknown Position",
          student: {
            name: app.student?.name || "Unknown Student",
            rollNumber: app.student?.rollNo || "N/A",
            emailId: app.student?.user?.email || "N/A",
            cpi: app.student?.cpi?.toString() || "N/A",
            branch: app.student?.branch || "N/A",
            year: app.student?.year
              ? `${app.student.year}${getOrdinalSuffix(app.student.year)} Year`
              : "N/A",
            courseType: app.student?.courseType || "N/A",
            linkedinLink: app.student?.linkedinUrl || null,
            githubLink: app.student?.githubUrl || null,
            resumeLink: app.student?.resumeUrl || null,
          },
          status: app.status?.toLowerCase() || "pending",
          appliedDate: app.appliedAt,
        };
      });

      console.log("Formatted applications:", formattedApplications.length);
      setApplications(formattedApplications);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setError(`Failed to load dashboard data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplicationAction = async (applicationId, action) => {
    try {
      console.log(`${action} application:`, applicationId);
      await applicationsAPI.updateStatus(applicationId, action.toUpperCase());

      // Update local state
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: action } : app
        )
      );

      alert(`Application ${action} successfully!`);
    } catch (error) {
      console.error(`Error ${action}ing application:`, error);
      alert(error.message || `Failed to ${action} application`);
    }
  };

  const handleDeletePosting = async (postingId) => {
    if (confirm("Are you sure you want to delete this posting?")) {
      try {
        await postsAPI.delete(postingId);

        // Update local state
        setPostings((prev) =>
          prev.filter((posting) => posting.id !== postingId)
        );
        setApplications((prev) =>
          prev.filter((app) => app.postingId !== postingId)
        );

        alert("Posting deleted successfully!");
      } catch (error) {
        console.error("Error deleting posting:", error);
        alert(error.message || "Failed to delete posting");
      }
    }
  };

  const handleViewApplications = (posting) => {
    setSelectedPosting(posting);
    setActiveTab("applications");
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/sip");
  };

  const getFilteredApplications = () => {
    if (selectedPosting) {
      return applications.filter((app) => app.postingId === selectedPosting.id);
    }
    return applications;
  };

  const handleEditPosting = (posting) => {
    setEditingPosting(posting);
    setIsEditing(true);
  };

  // Refresh applications when switching to applications tab to show real-time updates
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // if (tab === "applications") {
    //   loadDashboardData(); // Refresh to get latest applications
    // }
  };

  function getOrdinalSuffix(day) {
    if (day % 100 >= 11 && day % 100 <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#f56a38] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <X className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Dashboard
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              loadDashboardData();
            }}
            className="px-4 py-2 bg-[#f56a38] text-white rounded-lg hover:bg-[#e55a32] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Recruiter Dashboard - IIT BHU Portal</title>
        <meta
          name="description"
          content="Manage internship postings and applications"
        />
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
                  Welcome, {currentRecruiter?.companyName || "Recruiter"}
                </span>
                <Link
                  href="/sip/recruiter/dashboard"
                  className="px-4 py-2 bg-white text-black rounded font-medium hover:bg-gray-100 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/sip/recruiter/profile"
                  className="px-4 py-2 text-black hover:bg-[#f56a38] hover:text-white rounded transition-colors"
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Recruiter Dashboard
              </h2>
              <Link
                href="/sip/recruiter/post-internship"
                className="inline-flex items-center px-6 py-3 bg-[#f56a38] text-white rounded-lg hover:bg-[#e55a32] focus:outline-none focus:ring-2 focus:ring-[#f56a38] focus:ring-offset-2 transition-colors"
              >
                <Plus className="w-5 h-5 mr-2" />
                Post New Internship
              </Link>
            </div>

            {/* Tabs */}
            <div className="flex mb-8 border-b border-gray-200">
              <button
                onClick={() => {
                  handleTabChange("postings");
                  setSelectedPosting(null);
                }}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "postings"
                    ? "border-[#f56a38] text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                My Postings ({postings.length})
              </button>
              <button
                onClick={() => handleTabChange("applications")}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "applications"
                    ? "border-[#f56a38] text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Applications ({applications.length})
              </button>
            </div>

            {/* My Postings Tab */}
            {activeTab === "postings" && (
              <div className="space-y-6">
                {postings.length === 0 ? (
                  <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No postings yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Create your first internship posting to get started.
                    </p>
                    <Link
                      href="/sip/recruiter/post-internship"
                      className="inline-flex items-center px-6 py-3 bg-[#f56a38] text-white rounded-lg hover:bg-[#e55a32] transition-colors"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Post New Internship
                    </Link>
                  </div>
                ) : (
                  postings.map((posting) => (
                    <div
                      key={posting.id}
                      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl font-bold text-gray-900 mr-3">
                              {posting.title}
                            </h3>
                            {posting.applicationCount > 0 && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#f56a38] text-white">
                                {posting.applicationCount} application
                                {posting.applicationCount !== 1 ? "s" : ""}
                              </span>
                            )}
                          </div>

                          <div className="text-sm text-gray-600 mb-4">
                            <p className="mb-1">
                              <span className="font-medium">Company:</span>{" "}
                              {posting.company}
                            </p>
                            <p className="mb-1">
                              <span className="font-medium">Location:</span>{" "}
                              {posting.location}
                            </p>
                            <p className="mb-1">
                              <span className="font-medium">Type:</span>{" "}
                              {posting.type}
                            </p>
                            <p className="mb-1">
                              <span className="font-medium">Stipend:</span>{" "}
                              {posting.stipend}
                            </p>
                          </div>

                          <div className="mb-4">
                            <span className="font-medium text-sm text-gray-700">
                              Skills:
                            </span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {posting.skills.map((skill, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="ml-6 flex flex-col space-y-2">
                          <button
                            onClick={() => handleViewApplications(posting)}
                            className="inline-flex items-center px-4 py-2 bg-[#f56a38] text-white rounded-lg hover:bg-[#e55a32] transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Applications ({posting.applicationCount})
                          </button>
                          <button
                            onClick={() => handleEditPosting(posting)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePosting(posting.id)}
                            className="inline-flex items-center px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === "applications" && (
              <div>
                {selectedPosting && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Applications for {selectedPosting.title}
                    </h3>
                    <button
                      onClick={() => setSelectedPosting(null)}
                      className="text-[#f56a38] hover:text-[#e55a32] text-sm"
                    >
                      ← View all applications
                    </button>
                  </div>
                )}

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Position
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Roll Number
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Branch
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            CPI
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resume
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {getFilteredApplications().map((application) => (
                          <tr key={application.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {application.postingTitle}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              <button
                                onClick={() =>
                                  handleViewStudent(application.student)
                                }
                                className="text-blue-600 hover:text-blue-800 underline"
                              >
                                {application.student.name}
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {application.student.rollNumber}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {application.student.branch}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {application.student.cpi}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                              {application.student.resumeLink ? (
                                <a
                                  href={application.student.resumeLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-blue-800 flex items-center"
                                >
                                  View Resume
                                  <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                              ) : (
                                <span className="text-gray-400">No resume</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  application.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : application.status === "accepted"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {application.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              {application.status === "pending" && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleApplicationAction(
                                        application.id,
                                        "accepted"
                                      )
                                    }
                                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleApplicationAction(
                                        application.id,
                                        "rejected"
                                      )
                                    }
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {getFilteredApplications().length === 0 && (
                    <div className="p-12 text-center">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No applications yet
                      </h3>
                      <p className="text-gray-600">
                        {selectedPosting
                          ? "No applications received for this posting yet."
                          : "No applications received yet."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Student Details Modal */}
        {showStudentModal && selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Student Details
                  </h3>
                  <button
                    onClick={() => setShowStudentModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <p className="text-gray-900">{selectedStudent.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Roll Number
                      </label>
                      <p className="text-gray-900">
                        {selectedStudent.rollNumber}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email ID
                      </label>
                      <p className="text-gray-900">{selectedStudent.emailId}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        CPI
                      </label>
                      <p className="text-gray-900">{selectedStudent.cpi}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Branch
                      </label>
                      <p className="text-gray-900">{selectedStudent.branch}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Year
                      </label>
                      <p className="text-gray-900">{selectedStudent.year}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Course Type
                      </label>
                      <p className="text-gray-900">
                        {selectedStudent.courseType}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        LinkedIn Profile
                      </label>
                      {selectedStudent.linkedinLink ? (
                        <a
                          href={selectedStudent.linkedinLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          {selectedStudent.linkedinLink}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      ) : (
                        <p className="text-gray-500">Not provided</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        GitHub Profile
                      </label>
                      {selectedStudent.githubLink ? (
                        <a
                          href={selectedStudent.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          {selectedStudent.githubLink}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      ) : (
                        <p className="text-gray-500">Not provided</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Resume
                      </label>
                      {selectedStudent.resumeLink ? (
                        <a
                          href={selectedStudent.resumeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 flex items-center"
                        >
                          View Resume
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                      ) : (
                        <p className="text-gray-500">No resume provided</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setShowStudentModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Posting Modal */}
        {isEditing && editingPosting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Edit Posting
                  </h3>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      await postsAPI.update(editingPosting.id, {
                        companyName: editingPosting.company,
                        jobTitle: editingPosting.title,
                        jobDescription: editingPosting.description,
                        qualification: editingPosting.qualification,
                        experience: editingPosting.experience,
                        stipend: editingPosting.stipend,
                        requiredSkills: editingPosting.skills,
                        location: editingPosting.location,
                        jobType: editingPosting.type.toUpperCase(),
                      });

                      // Update local state
                      setPostings((prev) =>
                        prev.map((p) =>
                          p.id === editingPosting.id ? editingPosting : p
                        )
                      );
                      setIsEditing(false);

                      alert("Posting updated successfully!");
                    } catch (error) {
                      console.error("Error updating posting:", error);
                      alert(error.message || "Failed to update posting");
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={editingPosting.title}
                      onChange={(e) =>
                        setEditingPosting({
                          ...editingPosting,
                          title: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={editingPosting.location}
                      onChange={(e) =>
                        setEditingPosting({
                          ...editingPosting,
                          location: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={editingPosting.type}
                      onChange={(e) =>
                        setEditingPosting({
                          ...editingPosting,
                          type: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                    >
                      <option value="Remote">Remote</option>
                      <option value="In-office">On-site</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stipend
                    </label>
                    <input
                      type="text"
                      value={editingPosting.stipend}
                      onChange={(e) =>
                        setEditingPosting({
                          ...editingPosting,
                          stipend: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={4}
                      value={editingPosting.description}
                      onChange={(e) =>
                        setEditingPosting({
                          ...editingPosting,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Qualification
                    </label>
                    <input
                      type="text"
                      value={editingPosting.qualification}
                      onChange={(e) =>
                        setEditingPosting({
                          ...editingPosting,
                          qualification: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience
                    </label>
                    <input
                      type="text"
                      value={editingPosting.experience}
                      onChange={(e) =>
                        setEditingPosting({
                          ...editingPosting,
                          experience: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skills
                    </label>
                    <input
                      type="text"
                      value={editingPosting.skills}
                      onChange={(e) =>
                        setEditingPosting({
                          ...editingPosting,
                          skills: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#f56a38] text-white rounded-lg hover:bg-[#e55a32] transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RecruiterDashboard;
