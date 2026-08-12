"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Search, LogOut, CheckCircle, Clock, X, XCircle } from "lucide-react";
import { NavLogo } from "../../../components/navbar/NavLogo";
import { useRouter } from "next/navigation";
import { postsAPI, applicationsAPI } from "../../../lib/api";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Application, Post, Student, JobType } from "../../../lib/types";
import dynamic from "next/dynamic";
import OpportunityCard from "../../../components/OpportunityCard";
import SkeletonCard from "../../../components/SkeletonCard";

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
    applicationMethod?: string;
    applicationLink?: string;
};

const CARDS_PER_PAGE = 6;

const OpportunitiesPage = () => {
    const [activeTab, setActiveTab] = useState("opportunities");
    const [appliedOpportunities, setAppliedOpportunities] = useState<SimplifiedOpportunity[]>([]);
    const [opportunities, setOpportunities] = useState<SimplifiedOpportunity[]>([]);
    const [filteredOpportunities, setFilteredOpportunities] = useState<SimplifiedOpportunity[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);
    const [hasError, setHasError] = useState(false);

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
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        // Wait until session is loaded from cache — no network call needed
        if (status !== "authenticated") return;
        const studentId = (session?.user as any)?.id as string | null;

        const init = async () => {
            setIsLoading(true);

            const loadStudentData = async () => {
                try {
                    if (studentId) {
                        const response = await fetch(`${BACKEND_URL}/students/getinfo/${studentId}`);
                        const student = await response.json();
                        if (!response.ok) {
                            if (student.error === "STUDENT_NOT_FOUND") {
                                toast.error(student.message);
                                await signOut({ redirect: false });
                                router.push(student.redirectTo);
                                return;
                            }
                        }
                        setCurrentStudent(student);
                        const isComplete = student?.rollNo && student?.branch && student?.year && student?.courseType && student?.cpi && student?.resumeUrl;
                        if (!isComplete) {
                            toast.error("Complete profile");
                            router.push("/grow-your-resume/student/profile?edit=true");
                            return;
                        }
                    }
                } catch (error) {
                    console.error("Error loading student data:", error);
                }
            };

            // Run all 3 in parallel — studentId already in memory, no network call
            await Promise.all([
                loadStudentData(),
                loadOpportunities(studentId),
                loadAppliedOpportunities(studentId),
            ]);
            setIsLoading(false);
        };
        init();
    }, [status]);

    const loadOpportunities = async (studentId?: string | null) => {
        try {
            const posts = await postsAPI.getAll();
            const sid = studentId ?? null;

            // Get student's applications to filter out already applied opportunities
            let appliedPostIds: string[] = [];
            if (sid) {
                try {
                    const applications = await applicationsAPI.getAll({ studentId: sid });
                    appliedPostIds = applications.map((app: Application) => app.postId);
                } catch (error) {
                    console.error("Error loading applications:", error);
                    toast.error("Could not load applications");
                }
            }

            // Filter out already applied opportunities
            const availablePosts = posts.filter((post: Post) => !appliedPostIds.includes(post.id));

            setOpportunities(
                availablePosts.map((post: Post) => ({
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
                    postedDate: post.createdAt || new Date().toISOString(),
                    applicationMethod: post.applicationMethod || "NATIVE",
                    applicationLink: post.applicationLink,
                    isVerified: true, // Placeholder for backend verification logic
                }))
            );
        } catch (error) {
            console.error("Error loading opportunities:", error);
            toast.error("Failed to load opportunities");
            setHasError(true);
        }
    };

    const loadAppliedOpportunities = async (studentId?: string | null) => {
        try {
            const sid = studentId ?? null;
            if (!sid) {
                console.error("No student ID found");
                return;
            }

            const applications = await applicationsAPI.getAll({ studentId: sid });
            // console.log("applications: ",applications)
            setAppliedOpportunities(
                applications.map((app: Application) => ({
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
                    appliedAt: app.appliedAt, // Mapped properly
                    status: app.status.toLowerCase(),
                    applicationMethod: app.post?.applicationMethod || "NATIVE",
                    applicationLink: app.post?.applicationLink,
                    isVerified: true, // Placeholder for backend verification logic
                }))
            );
        } catch (error) {
            console.error("Error loading applied opportunities:", error);
            setHasError(true);
        }
    };

    useEffect(() => {
        if (activeTab === "opportunities") {
            filterOpportunities();
        } else {
            loadAppliedOpportunities();
        }
    }, [filters, opportunities, activeTab]);

    const filterOpportunities = () => {
        let filtered = [...opportunities];

        if (filters.search) {
            filtered = filtered.filter((opp) => opp.title?.toLowerCase().includes(filters.search.toLowerCase()) || opp.company?.toLowerCase().includes(filters.search.toLowerCase()) || opp.description?.toLowerCase().includes(filters.search.toLowerCase()));
        }

        if (filters.company) {
            filtered = filtered.filter((opp) => opp.company?.toLowerCase().includes(filters.company.toLowerCase()));
        }

        if (filters.skills) {
            filtered = filtered.filter((opp) => opp.skills?.some((skill) => skill.toLowerCase().includes(filters.skills.toLowerCase())));
        }

        setFilteredOpportunities(filtered);
    };

    const handleFilterChange = (key: any, value: any) => {
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

    const handleApply = async (opportunityId: any) => {
        try {
            const studentId = (session?.user as any)?.id as string | null;
            if (!studentId) {
                toast.error("Please log in to apply");
                router.push("/grow-your-resume/login");
                return;
            }

            // Find the applied opportunity
            const appliedOpportunity = opportunities.find((opp) => opp.id === opportunityId);
            let method = "NATIVE";

            if (appliedOpportunity) {
                method = appliedOpportunity.applicationMethod || "NATIVE";
                if (method === "MAILTO" && appliedOpportunity.applicationLink) {
                    window.location.href = 'mailto:' + appliedOpportunity.applicationLink;
                } else if (method === "EXTERNAL" && appliedOpportunity.applicationLink) {
                    window.open(appliedOpportunity.applicationLink, '_blank');
                }
            }

            // Optionally log clicks via API
            await applicationsAPI.create({
                studentId,
                postId: opportunityId,
            });

            if (appliedOpportunity) {
                // Remove from opportunities list
                setOpportunities((prev) => prev.filter((opp) => opp.id !== opportunityId));
                setFilteredOpportunities((prev) => prev.filter((opp) => opp.id !== opportunityId));

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
                    applicationMethod: appliedOpportunity.applicationMethod,
                    applicationLink: appliedOpportunity.applicationLink,
                    isVerified: appliedOpportunity.isVerified,
                };

                setAppliedOpportunities((prev) => [...prev, newApplication]);
            }

            toast.success(method === "NATIVE" ? "Application submitted successfully!" : "Redirected to application!");
        } catch (error: any) {
            console.error("Error applying to opportunity:", error);
            toast.error(error.message || "Failed to submit application");
        }
    };

    const handleWithdraw = async (applicationId: any) => {
        try {
            const withdrawnApplication = appliedOpportunities.find((app) => app.id === applicationId);

            const res = await applicationsAPI.withdraw(applicationId);

            if (!res.ok) {
                const errorData = await res.json();
                toast.error(errorData.message || "Failed to withdraw application");
                return;
            }

            toast.success("Application withdrawn successfully!");

            // Remove from applied opportunities list
            setAppliedOpportunities((prev) => prev.filter((app) => app.id !== applicationId));

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
                    postedDate: withdrawnApplication.appliedAt ? new Date(withdrawnApplication.appliedAt).toISOString() : new Date().toISOString(),
                    appliedAt: withdrawnApplication.appliedAt ?? new Date().toISOString(),
                    status: withdrawnApplication.status ?? "pending", // optional but good for consistency
                    applicationMethod: withdrawnApplication.applicationMethod || "NATIVE",
                    applicationLink: withdrawnApplication.applicationLink,
                };

                setOpportunities((prev) => [...prev, opportunityToRestore]);
            }

            // toast.success("Application withdrawn successfully!");
        } catch (error: any) {
            console.error("Error withdrawing application:", error);
            toast.error(error.message || "Failed to withdraw application");
        }
    };

    const handleLogout = () => {
        signOut({ callbackUrl: "/grow-your-resume" });
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
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                <Icon className="w-3 h-3 mr-1" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <>
            <Head>
                <title>Internship Opportunities - IIT BHU Grow Your Resume</title>
                <meta name="description" content="Browse and apply to internship opportunities" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                <style>{`font-family:'Poppins',sans-serif;`}</style>
            </Head>

            <div className="min-h-screen bg-white" style={{ fontFamily: "Poppins, sans-serif" }}>
                {/* Header */}
                <div className="bg-[#f8f9fa] text-black">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center">
                                <NavLogo />
                                <h1 className="text-xl font-bold ml-4">IIT BHU Grow Your Resume</h1>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-sm">Welcome, {currentStudent?.name || "Student"}</span>
                                <button onClick={() => setActiveTab("opportunities")} className="px-4 py-2 rounded font-medium transition-colors bg-white text-black">
                                    Opportunities
                                </button>
                                <Link href="/grow-your-resume/student/profile" className="px-4 py-2 text-black hover:bg-[#f56a38] hover:text-white rounded transition-colors">
                                    My Profile
                                </Link>
                                <button onClick={handleLogout} className="flex items-center px-4 py-2 text-black hover:bg-[#f56a38] hover:text-white rounded transition-colors">
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
                            <button onClick={() => setActiveTab("opportunities")} className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === "opportunities" ? "border-[#f56a38] text-black" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                                Opportunities
                            </button>
                            <button onClick={() => setActiveTab("applied")} className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === "applied" ? "border-[#f56a38] text-black" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                                Applied
                            </button>
                        </div>

                        {/* Opportunities Tab */}
                        {activeTab === "opportunities" && (
                            <div>
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Internship Opportunities</h2>
                                </div>

                                <div className="flex gap-8">
                                    {/* Filters Sidebar */}
                                    <div className="w-64 flex-shrink-0">
                                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                                            <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>

                                            <div className="mb-6">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                                                <input
                                                    type="text"
                                                    placeholder="Search by title, company, etc."
                                                    value={filters.search}
                                                    onChange={(e) => handleFilterChange("search", e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent text-sm"
                                                />
                                            </div>

                                            <div className="mb-6">
                                                <label className="block text-sm font-medium text-gray-700 mb-3">Skills</label>
                                                <div className="space-y-2">
                                                    {["DS", "NLP", "RL", "C++", "Java", "Python"].map((skill) => (
                                                        <button
                                                            key={skill}
                                                            onClick={() => handleFilterChange("skills", skill)}
                                                            className={`px-3 py-1 text-sm rounded-full border transition-colors ${filters.skills === skill ? "bg-[#f56a38] text-white border-[#f56a38]" : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"}`}
                                                        >
                                                            {skill}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Opportunities List */}
                                    <div className="flex-1">
                                        <div className="space-y-6">
                                            {hasError ? (
                                                <div className="bg-white border border-red-200 rounded-lg p-12 text-center flex flex-col items-center">
                                                    <XCircle className="w-16 h-16 text-red-400 mb-4" />
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load opportunities</h3>
                                                    <p className="text-gray-600 mb-6">There was an error communicating with the server.</p>
                                                    <button 
                                                        onClick={() => window.location.reload()}
                                                        className="px-6 py-2 bg-red-50 text-red-600 border border-red-200 text-[14px] font-medium rounded-lg hover:bg-red-100 transition-colors"
                                                    >
                                                        Retry
                                                    </button>
                                                </div>
                                            ) : isLoading ? (
                                                // Show skeleton cards while loading
                                                [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
                                            ) : filteredOpportunities.length === 0 ? (
                                                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                                                    <div className="text-gray-400 mb-4">
                                                        <Search className="w-16 h-16 mx-auto" />
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No opportunities found</h3>
                                                    <p className="text-gray-600">No opportunities match your current filters. Clear filters or check back later.</p>
                                                </div>
                                            ) : (
                                                <>
                                                    {filteredOpportunities.slice(0, visibleCount).map((opportunity) => (
                                                        <OpportunityCard 
                                                            key={opportunity.id} 
                                                            opportunity={opportunity as any} 
                                                            onApply={handleApply} 
                                                        />
                                                    ))}

                                                    {/* Load More button */}
                                                    {visibleCount < filteredOpportunities.length && (
                                                        <div className="text-center pt-4">
                                                            <button
                                                                onClick={() => setVisibleCount((c) => c + CARDS_PER_PAGE)}
                                                                className="px-8 py-3 border border-[#f56a38] text-[#f56a38] rounded-lg font-medium hover:bg-[#f56a38] hover:text-white transition-colors"
                                                            >
                                                                Load More ({filteredOpportunities.length - visibleCount} remaining)
                                                            </button>
                                                        </div>
                                                    )}
                                                </>
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
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Applied Opportunities</h2>
                                </div>

                                <div className="space-y-6">
                                    {hasError ? (
                                        <div className="bg-white border border-red-200 rounded-lg p-12 text-center flex flex-col items-center">
                                            <XCircle className="w-16 h-16 text-red-400 mb-4" />
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Failed to load opportunities</h3>
                                            <p className="text-gray-600 mb-6">There was an error communicating with the server.</p>
                                            <button 
                                                onClick={() => window.location.reload()}
                                                className="px-6 py-2 bg-red-50 text-red-600 border border-red-200 text-[14px] font-medium rounded-lg hover:bg-red-100 transition-colors"
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    ) : appliedOpportunities.length === 0 ? (
                                        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center flex flex-col items-center">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h3>
                                            <p className="text-gray-600 mb-6 max-w-md">You haven't applied to any opportunities yet. Head over to the Opportunities tab to get started!</p>
                                            <button 
                                                onClick={() => setActiveTab("opportunities")}
                                                className="px-6 py-2 bg-[#f56a38] text-white text-[14px] font-medium rounded-lg hover:bg-[#e55a32] transition-colors"
                                            >
                                                Browse Opportunities
                                            </button>
                                        </div>
                                    ) : (
                                        appliedOpportunities.map((opportunity) => (
                                            <OpportunityCard 
                                                key={opportunity.id} 
                                                opportunity={opportunity as any} 
                                                onWithdraw={handleWithdraw} 
                                            />
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
