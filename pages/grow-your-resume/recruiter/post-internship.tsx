"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { LogOut } from "lucide-react";
import { NavLogo } from "../../../components/navbar/NavLogo";
import { postsAPI } from "../../../lib/api";
import { getRecruiterId } from "../../../lib/auth";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { PostErrors } from "../../../lib/types";

const PostInternshipPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        companyName: "",
        jobTitle: "",
        jobDescription: "",
        qualification: "",
        experience: "",
        stipend: "",
        requiredSkills: "",
        location: "",
        jobType: "REMOTE",
    });
    const [errors, setErrors] = useState<PostErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentRecruiter, setCurrentRecruiter] = useState({
        id: "",
        companyName: "",
        jobTitle: "",
        jobDescription: "",
        qualification: "",
        experience: "",
        stipend: "",
        requiredSkills: "",
        location: "",
        jobType: "REMOTE",
    });
    const [loading, setLoading] = useState(true);
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const loadRecruiterData = async () => {
            try {
                const recruiterId = await getRecruiterId();
                if (!recruiterId) {
                    toast.error("Recruiter ID not found");
                    router.push("/grow-your-resume");
                    return;
                }

                const response = await fetch(`${BACKEND_URL}/recruiters/getinfo/${recruiterId}`);
                const data = await response.json();

                if (!response.ok) {
                    if (data.error === "RECRUITER_NOT_FOUND") {
                        toast.error(data.message);
                        await signOut({ redirect: false });
                        router.push(data.redirectTo || "/grow-your-resume/login?tab=recruiter");
                        return;
                    } else {
                        throw new Error(data.message || "Error loading recruiter");
                    }
                }

                if (!data?.verified) {
                    router.push("/grow-your-resume/recruiter/profile");
                }

                setCurrentRecruiter(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to load recruiter data:", error);
                toast.error("Failed to load recruiter profile");
                setLoading(false);
            }
        };

        loadRecruiterData();
    }, [router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const name = e.target.name as keyof PostErrors;
        const value = e.target.value as keyof PostErrors;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: PostErrors = {};
        if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
        if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
        if (!formData.jobDescription.trim()) newErrors.jobDescription = "Job description is required";
        if (!formData.qualification.trim()) newErrors.qualification = "Qualification is required";
        if (!formData.experience.trim()) newErrors.experience = "Experience is required";
        if (!formData.stipend.trim()) newErrors.stipend = "Stipend is required";
        if (!formData.requiredSkills.trim()) newErrors.requiredSkills = "Required skills are required";
        if (!formData.location.trim()) newErrors.location = "Location is required";
        if (!formData.jobType) newErrors.jobType = "Job type is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            await postsAPI.create({
                recruiterId: currentRecruiter.id,
                companyName: formData.companyName,
                jobTitle: formData.jobTitle,
                jobDescription: formData.jobDescription,
                qualification: formData.qualification,
                experience: formData.experience,
                stipend: formData.stipend,
                requiredSkills: formData.requiredSkills.split(",").map((s) => s.trim()),
                location: formData.location,
                jobType: formData.jobType,
            });

            toast.success("Internship posted successfully!");
            router.push("/grow-your-resume/recruiter/dashboard");
        } catch (error) {
            console.error("Error posting internship:", error);
            toast.error("Error posting internship. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.push("/grow-your-resume/recruiter/dashboard");
    };

    const handleLogout = () => {
        signOut({ callbackUrl: "/grow-your-resume" });
    };

    return (
        <>
            <Head>
                <title>Post New Internship - IIT BHU Grow Your Resume</title>
                <meta name="description" content="Post a new internship opportunity" />
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
                                <span className="text-sm">Welcome, {currentRecruiter?.companyName || "Company"}</span>
                                <Link href="/grow-your-resume/recruiter/dashboard" className="px-4 py-2 text-black hover:bg-[#f56a38] hover:text-white rounded transition-colors">
                                    Dashboard
                                </Link>
                                <Link href="/grow-your-resume/recruiter/profile" className="px-4 py-2 bg-white text-black rounded font-medium hover:bg-gray-100 transition-colors">
                                    Profile
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
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Page Header */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Post New Internship</h2>
                        </div>

                        {/* Form */}
                        <div className="bg-white border border-gray-200 rounded-lg p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Internship Details</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Company Name and Job Title */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent ${errors.companyName ? "border-red-500" : "border-gray-300"}`}
                                            placeholder="Uplers"
                                        />
                                        {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                                        <input
                                            type="text"
                                            name="jobTitle"
                                            value={formData.jobTitle}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent ${errors.jobTitle ? "border-red-500" : "border-gray-300"}`}
                                            placeholder="Lead ML Engineer"
                                        />
                                        {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
                                    </div>
                                </div>

                                {/* Job Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
                                    <textarea
                                        name="jobDescription"
                                        value={formData.jobDescription}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent ${errors.jobDescription ? "border-red-500" : "border-gray-300"}`}
                                        placeholder="Describe the job responsibilities and requirements..."
                                    />
                                    {errors.jobDescription && <p className="text-red-500 text-sm mt-1">{errors.jobDescription}</p>}
                                </div>

                                {/* Qualification and Experience */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Qualification *</label>
                                        <input
                                            type="text"
                                            name="qualification"
                                            value={formData.qualification}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent ${errors.qualification ? "border-red-500" : "border-gray-300"}`}
                                            placeholder="B.Tech/M.Tech in CSE"
                                        />
                                        {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience *</label>
                                        <input
                                            type="text"
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent ${errors.experience ? "border-red-500" : "border-gray-300"}`}
                                            placeholder="0 Yrs"
                                        />
                                        {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                                    </div>
                                </div>

                                {/* Stipend and Required Skills */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Stipend *</label>
                                        <input
                                            type="text"
                                            name="stipend"
                                            value={formData.stipend}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent ${errors.stipend ? "border-red-500" : "border-gray-300"}`}
                                            placeholder="10k INR / Month"
                                        />
                                        {errors.stipend && <p className="text-red-500 text-sm mt-1">{errors.stipend}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills *</label>
                                        <input
                                            type="text"
                                            name="requiredSkills"
                                            value={formData.requiredSkills}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent ${errors.requiredSkills ? "border-red-500" : "border-gray-300"}`}
                                            placeholder="DS, NLP, RL (comma separated)"
                                        />
                                        {errors.requiredSkills && <p className="text-red-500 text-sm mt-1">{errors.requiredSkills}</p>}
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent ${errors.location ? "border-red-500" : "border-gray-300"}`}
                                        placeholder="Bangalore"
                                    />
                                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                                </div>

                                {/* Job Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
                                    <select name="jobType" value={formData.jobType} onChange={handleInputChange} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent ${errors.jobType ? "border-red-500" : "border-gray-300"}`}>
                                        <option value="REMOTE">Remote</option>
                                        <option value="ONSITE">On-site</option>
                                        <option value="HYBRID">Hybrid</option>
                                    </select>
                                    {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>}
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex justify-end space-x-4 pt-6">
                                    <button type="button" onClick={handleCancel} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#f56a38] hover:bg-[#e55a32] focus:outline-none focus:ring-2 focus:ring-[#f56a38] focus:ring-offset-2"}`}
                                    >
                                        {isSubmitting ? "Posting..." : "Post Internship"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostInternshipPage;
