"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Search, LogOut, CheckCircle, Clock, X, XCircle } from "lucide-react";
import { NavLogo } from "../../../components/navbar/NavLogo";
import { useRouter } from "next/navigation";
import { postsAPI, applicationsAPI } from "../../../lib/api";
import { getStudentId } from "../../../lib/auth";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Application, Post, Student, JobType } from "../../../lib/types";
type ApplicationStatus = "pending" | "accepted" | "rejected";
type SimplifiedOpportunity = {
  id: string;
  postId: string;
  title?: string;
  company?: string;
  location?: string;
  type?: JobType;
  qualification?: string;
  experience?: string;
  stipend?: string;
  skills?: string[];
  description?: string;
  applied: boolean;
  postedDate: string | Date;
  appliedAt: string | Date;
  status?: ApplicationStatus;
};


const OpportunitiesPage = () => {

  const [activeTab, setActiveTab] = useState("opportunities");
  const [appliedOpportunities, setAppliedOpportunities] = useState<
    SimplifiedOpportunity[]
  >([]);
  const [opportunities, setOpportunities] = useState<SimplifiedOpportunity[]>(
    []
  );
  const [filteredOpportunities, setFilteredOpportunities] = useState<
    SimplifiedOpportunity[]
  >([]);

  const [filters, setFilters] = useState({
    search: "",
    company: "",
    skills: "",
  });
  const [currentStudent, setCurrentStudent] = useState<Student>({
    id: "",
    userId: "",
    name: "",
    rollNo: "",
    branch: "",
    cpi: 0,
    courseType: "",
    year: 0,
    linkedinUrl: "",
    githubUrl: "",
    resumeUrl: "",
  });
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const router = useRouter();

  useEffect(() => {
    const loadStudentData = async () => {
      try {
        const studentId = await getStudentId();
        if (studentId) {
          const response = await fetch(`${BACKEND_URL}/students/${studentId}`);
          const student = await response.json();
          if (!response.ok) {
            if (student.error === "STUDENT_NOT_FOUND") {
              toast.error(student.message); // Optional: show message
              await signOut({ redirect: false }); // don't auto-redirect
              router.push(student.redirectTo); // send user to recruiter login
              return;
            }
          }
          setCurrentStudent(student);
          const isComplete =
            student?.rollNo &&
            student?.branch &&
            student?.year &&
            student?.courseType &&
            student?.cpi &&
            student?.resumeUrl;

          if (!isComplete) {
            router.push("/sip/student/profile?edit=true");
            return;
          }
        }
      } catch (error) {
        console.error("Error loading student data:", error);
      }
    };
    loadStudentData();
    loadOpportunities();
    loadAppliedOpportunities();
  }, []);

  const loadOpportunities = async () => {
    try {
      const posts = await postsAPI.getAll();
      const studentId = await getStudentId();

      // Get student's applications to filter out already applied opportunities
      let appliedPostIds = [];
      if (studentId) {
        try {
          const applications = await applicationsAPI.getAll({ studentId });
          appliedPostIds = applications.map((app: Application) => app.postId);
        } catch (error) {
          console.error("Error loading applications:", error);
        }
      }

      // Filter out already applied opportunities
      const availablePosts = posts.filter(
        (post:Post) => !appliedPostIds.includes(post.id)
      );

      setOpportunities(
        availablePosts.map((post : Post) => ({
          id: post.id,
          title: `${post.jobTitle} (${post.companyName})`,
          company: post.companyName,
          location: post.location,
          type: post.jobType,
          qualification: post.qualification,
          experience: post.experience,
          stipend: post.stipend,
          skills: post.requiredSkills,
          description: post.jobDescription,
          applied: false,
          postedDate: post.createdAt,
        }))
      );
    } catch (error) {
      console.error("Error loading opportunities:", error);
      alert("Failed to load opportunities");
    }
  };

  const loadAppliedOpportunities = async () => {
    try {
      const studentId = await getStudentId();
      if (!studentId) {
        console.error("No student ID found");
        return;
      }

      const applications = await applicationsAPI.getAll({ studentId });
      console.log("applications: ",applications)
      setAppliedOpportunities(
        applications.map((app : Application) => ({
          id: app.id,
          postId: app.postId, // Keep track of the original post ID
          title: `${app.post.jobTitle}`,
          company: app.post.companyName,
          location: app.post.location,
          type: app.post.jobType,
          qualification: app.post.qualification,
          experience: app.post.experience,
          stipend: app.post.stipend,
          skills: app.post.requiredSkills,
          description: app.post.jobDescription,
          applied: true,
          appliedDate: app.appliedAt,
          status: app.status.toLowerCase(),
        }))
      );
    } catch (error) {
      console.error("Error loading applied opportunities:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "opportunities") {
      filterOpportunities();
    }
    else{
      loadAppliedOpportunities();
    }
  }, [filters, opportunities, activeTab]);

  const filterOpportunities = () => {
    let filtered = [...opportunities];

    if (filters.search) {
      filtered = filtered.filter(
        (opp) =>
          opp.title
            ?.toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          opp.company
            ?.toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          opp.description
            ?.toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }

    if (filters.company) {
      filtered = filtered.filter((opp) =>
        opp.company?.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    if (filters.skills) {
      filtered = filtered.filter((opp) =>
        opp.skills?.some((skill) =>
          skill.toLowerCase().includes(filters.skills.toLowerCase())
        )
      );
    }

    setFilteredOpportunities(filtered);
  };

  const handleFilterChange = (key:any, value:any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      company: "",
      skills: "",
    });
  };

  const handleApply = async (opportunityId:any) => {
    try {
      const studentId = await getStudentId();
      if (!studentId) {
        alert("Please log in to apply");
        return;
      }

      console.log("Applying to opportunity:", opportunityId);
      await applicationsAPI.create({
        studentId,
        postId: opportunityId,
      });

      // Find the applied opportunity
      const appliedOpportunity = opportunities.find(
        (opp) => opp.id === opportunityId
      );

      if (appliedOpportunity) {
        // Remove from opportunities list
        setOpportunities((prev) =>
          prev.filter((opp) => opp.id !== opportunityId)
        );
        setFilteredOpportunities((prev) =>
          prev.filter((opp) => opp.id !== opportunityId)
        );

        // Add to applied opportunities list with current date and pending status
        const newApplication: SimplifiedOpportunity = {
          id: appliedOpportunity.id,
          postId: opportunityId,
          title: appliedOpportunity.title ?? "",
          company: appliedOpportunity.company ?? "",
          location: appliedOpportunity.location ?? "",
          type: appliedOpportunity.type ?? "REMOTE",
          qualification: appliedOpportunity.qualification ?? "",
          experience: appliedOpportunity.experience ?? "",
          stipend: appliedOpportunity.stipend ?? "",
          skills: appliedOpportunity.skills ?? [],
          description: appliedOpportunity.description ?? "",
          applied: true,
          postedDate: appliedOpportunity.postedDate ?? new Date().toISOString(),
          appliedAt: new Date().toISOString(),
          status: "pending",
        };
        
        setAppliedOpportunities((prev) => [...prev, newApplication]);
      }

      alert("Application submitted successfully!");
    } catch (error:any) {
      console.error("Error applying to opportunity:", error);
      alert(error.message || "Failed to submit application");
    }
  };

  const handleWithdraw = async (applicationId: any) => {
    console.log("Withdrawing application:", applicationId);
    try {
      console.log("Withdrawing application:", applicationId);

      // Find the application being withdrawn
      const withdrawnApplication = appliedOpportunities.find(
        (app) => app.id === applicationId
      );

      await applicationsAPI.withdraw(applicationId);

      // Remove from applied opportunities list
      setAppliedOpportunities((prev) =>
        prev.filter((app) => app.id !== applicationId)
      );

      // Add back to opportunities list if we have the application data
      if (withdrawnApplication) {
        const opportunityToRestore: SimplifiedOpportunity = {
          id: withdrawnApplication.id,
          postId: withdrawnApplication.postId,
          title: withdrawnApplication.title ?? "",
          company: withdrawnApplication.company ?? "",
          location: withdrawnApplication.location ?? "",
          type: withdrawnApplication.type ?? "REMOTE",
          qualification: withdrawnApplication.qualification ?? "",
          experience: withdrawnApplication.experience ?? "",
          stipend: withdrawnApplication.stipend ?? "",
          skills: withdrawnApplication.skills ?? [],
          description: withdrawnApplication.description ?? "",
          applied: false,
          postedDate: withdrawnApplication.appliedAt
            ? new Date(withdrawnApplication.appliedAt).toISOString()
            : new Date().toISOString(),
          appliedAt: withdrawnApplication.appliedAt ?? new Date().toISOString(), 
          status: withdrawnApplication.status ?? "pending", // optional but good for consistency
        };

        setOpportunities((prev) => [...prev, opportunityToRestore]);
      }
      

      alert("Application withdrawn successfully!");
    } catch (error: any) {
      console.error("Error withdrawing application:", error);
      alert(error.message || "Failed to withdraw application");
    }
  };

  const handleLogout = () => {
    console.log("Logging out...");
    router.push("/sip");
    return;
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      accepted: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      rejected: { color: "bg-red-100 text-red-800", icon: XCircle },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>Internship Opportunities - IIT BHU Portal</title>
        <meta
          name="description"
          content="Browse and apply to internship opportunities"
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
                  Welcome, {currentStudent?.name || "Student"}
                </span>
                <button
                  onClick={() => setActiveTab("opportunities")}
                  className="px-4 py-2 rounded font-medium transition-colors bg-white text-black"
                >
                  Opportunities
                </button>
                <Link
                  href="/sip/student/profile"
                  className="px-4 py-2 text-black hover:bg-[#f56a38] hover:text-white rounded transition-colors"
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Tabs */}
            <div className="flex mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab("opportunities")}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "opportunities"
                    ? "border-[#f56a38] text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Opportunities
              </button>
              <button
                onClick={() => setActiveTab("applied")}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "applied"
                    ? "border-[#f56a38] text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Applied
              </button>
            </div>

            {/* Opportunities Tab */}
            {activeTab === "opportunities" && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Internship Opportunities
                  </h2>
                </div>

                <div className="flex gap-8">
                  {/* Filters Sidebar */}
                  <div className="w-64 flex-shrink-0">
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Filters
                      </h3>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Search
                        </label>
                        <input
                          type="text"
                          placeholder="Search by title, company, etc."
                          value={filters.search}
                          onChange={(e) =>
                            handleFilterChange("search", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent text-sm"
                        />
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Skills
                        </label>
                        <div className="space-y-2">
                          {["DS", "NLP", "RL", "C++", "Java", "Python"].map(
                            (skill) => (
                              <button
                                key={skill}
                                onClick={() =>
                                  handleFilterChange("skills", skill)
                                }
                                className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                                  filters.skills === skill
                                    ? "bg-[#f56a38] text-white border-[#f56a38]"
                                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                                }`}
                              >
                                {skill}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Opportunities List */}
                  <div className="flex-1">
                    <div className="space-y-6">
                      {filteredOpportunities.length === 0 ? (
                        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                          <div className="text-gray-400 mb-4">
                            <Search className="w-16 h-16 mx-auto" />
                          </div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No opportunities found
                          </h3>
                          <p className="text-gray-600">
                            Try adjusting your filters to find more
                            opportunities.
                          </p>
                        </div>
                      ) : (
                        filteredOpportunities.map((opportunity) => (
                          <div
                            key={opportunity.id}
                            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                  {opportunity.title}
                                </h3>

                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                                  <div>
                                    <span className="font-medium">
                                      Qualification:
                                    </span>{" "}
                                    {opportunity.qualification}
                                  </div>
                                  <div>
                                    <span className="font-medium">
                                      Experience:
                                    </span>{" "}
                                    {opportunity.experience}
                                  </div>
                                  <div>
                                    <span className="font-medium">
                                      Stipend:
                                    </span>{" "}
                                    {opportunity.stipend}
                                  </div>
                                  <div>
                                    <span className="font-medium">Type:</span>{" "}
                                    {opportunity.type}
                                  </div>
                                  <div>
                                    <span className="font-medium">
                                      Location:
                                    </span>{" "}
                                    {opportunity.location}
                                  </div>
                                </div>

                                <div className="mb-4">
                                  <span className="font-medium text-sm text-gray-700">
                                    Skills:
                                  </span>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {opportunity.skills?.map(
                                      (skill, index) => (
                                        <span
                                          key={index}
                                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                                        >
                                          {skill}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>

                                <p className="text-gray-700 text-sm">
                                  {opportunity.description}
                                </p>
                              </div>

                              <div className="ml-6">
                                <button
                                  onClick={() => handleApply(opportunity.id)}
                                  className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Applied Tab */}
            {activeTab === "applied" && (
              <div>
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Applied Opportunities
                  </h2>
                </div>

                <div className="space-y-6">
                  {appliedOpportunities.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        No applications yet
                      </h3>
                      <p className="text-gray-600">
                        You haven't applied to any opportunities yet.
                      </p>
                    </div>
                  ) : (
                    appliedOpportunities.map((opportunity) => (
                      <div
                        key={opportunity.id}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <h3 className="text-xl font-bold text-gray-900 mr-3">
                                {opportunity.title}
                              </h3>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Applied
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                              <div>
                                <span className="font-medium">Company:</span>{" "}
                                {opportunity.company}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Applied Date:
                                </span>{" "}
                                {new Date(
                                  opportunity.appliedAt ?? Date.now()
                                ).toLocaleDateString()}
                              </div>
                              <div>
                                <span className="font-medium">Stipend:</span>{" "}
                                {opportunity.stipend}
                              </div>
                              <div>
                                <span className="font-medium">Location:</span>{" "}
                                {opportunity.location}
                              </div>
                            </div>

                            <div className="mb-4">
                              <span className="font-medium text-sm text-gray-700">
                                Skills:
                              </span>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {opportunity.skills?.map(
                                  (skill, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                                    >
                                      {skill}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>

                            <p className="text-gray-700 text-sm mb-4">
                              {opportunity.description}
                            </p>
                          </div>

                          <div className="ml-6 flex flex-col items-end space-y-3">
                            <div className="text-center">
                              {getStatusBadge(
                                opportunity.status?.toLowerCase() as ApplicationStatus
                              )}
                            </div>
                            <button
                              onClick={() => handleWithdraw(opportunity.id)}
                              className="flex items-center px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Withdraw
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OpportunitiesPage;
