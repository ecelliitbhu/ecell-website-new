import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { LogOut, X } from "lucide-react";
import { NavLogo } from "../../../components/navbar/NavLogo";
import { postsAPI, recruitersAPI } from "../../../lib/api";
import { getRecruiterId } from "../../../lib/auth";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { PostErrors } from "../../../lib/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import { serverAPI } from "../../../lib/server-api";

// ─── Static option lists ───────────────────────────────────────────────────────

/** Curated skill suggestions for autocomplete — covers common IIT BHU intern domains */
const SKILL_SUGGESTIONS = [
    // Programming languages
    "Python", "C++", "Java", "JavaScript", "TypeScript", "Go", "C", "MATLAB", "R", "Rust",
    // ML / AI
    "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "Data Science",
    "Reinforcement Learning", "Scikit-learn", "TensorFlow", "PyTorch",
    // Web
    "React", "Next.js", "Node.js", "Django", "FastAPI", "Flask", "HTML/CSS", "Vue.js", "Express.js",
    // Data / DB
    "SQL", "PostgreSQL", "MongoDB", "Redis", "Pandas", "NumPy", "Data Analysis", "Tableau", "Power BI",
    // DevOps / Cloud
    "AWS", "GCP", "Azure", "Docker", "Kubernetes", "Linux", "Git", "CI/CD",
    // Core Engineering
    "VLSI", "Embedded Systems", "Arduino", "ROS", "CAD", "ANSYS", "Verilog", "FPGA",
    // Finance / Business
    "Financial Modeling", "Excel", "Blockchain", "Cybersecurity", "Networking",
    "Marketing", "Sales", "Product Management", "Business Development", "Content Writing",
    "Figma", "UI/UX", "Statistics",
];

/** Experience options stored as structured strings that the student filter can parse reliably */
const EXPERIENCE_OPTIONS = [
    { value: "0 Yrs",              label: "Fresher (0 yrs)" },
    { value: "< 6 Months",         label: "Less than 6 months" },
    { value: "6 Months - 1 Yr",    label: "6 months – 1 year" },
    { value: "1 - 2 Yrs",          label: "1 – 2 years" },
    { value: "2+ Yrs",             label: "2+ years" },
];

/** Stipend period options */
const STIPEND_PERIODS = [
    { value: "month",   label: "per Month" },
    { value: "day",     label: "per Day" },
    { value: "week",    label: "per Week" },
    { value: "lumpsum", label: "Lump Sum" },
];

// ─── Component ────────────────────────────────────────────────────────────────

const PostInternshipPage = () => {
    const router = useRouter();

    // Core form data (text / select fields)
    const [formData, setFormData] = useState({
        companyName: "",
        jobTitle: "",
        jobDescription: "",
        qualification: "",
        experience: "",
        location: "",
        jobType: "REMOTE",
        applicationMethod: "NATIVE",
        applicationLink: "",
        expiresAt: "",
    });

    // Skills tag-input state
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Structured stipend state — composed into a string on submit
    const [stipendAmount, setStipendAmount] = useState("");
    const [stipendPeriod, setStipendPeriod] = useState("month");

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

    const skillInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadRecruiterData = async () => {
            try {
                const recruiterId = await getRecruiterId();
                if (!recruiterId) {
                    toast.error("Recruiter ID not found");
                    router.push("/grow-your-resume");
                    return;
                }

                const data = await recruitersAPI.getProfile(recruiterId);

                if (!data?.verified) {
                    router.push("/grow-your-resume/recruiter/profile");
                }

                setCurrentRecruiter(data);
                setLoading(false);
            } catch (error: any) {
                if (error?.response?.data?.error === "RECRUITER_NOT_FOUND") {
                    const errData = error.response.data;
                    toast.error(errData.message);
                    await signOut({ redirect: false });
                    router.push(errData.redirectTo || "/grow-your-resume/login?tab=recruiter");
                    return;
                }
                console.error("Failed to load recruiter data:", error);
                toast.error("Failed to load recruiter profile");
                setLoading(false);
            }
        };

        loadRecruiterData();
    }, [router]);

    // ─── Text/select field handler ────────────────────────────────────────────

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const name = e.target.name as keyof PostErrors;
        const value = e.target.value as keyof PostErrors;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    // ─── Skill tag-input handlers ─────────────────────────────────────────────

    /** Suggestions: filter from SKILL_SUGGESTIONS, exclude already-selected */
    const filteredSuggestions = SKILL_SUGGESTIONS.filter(
        s =>
            s.toLowerCase().includes(skillInput.toLowerCase()) &&
            !selectedSkills.includes(s) &&
            skillInput.trim().length > 0
    ).slice(0, 6);

    const addSkill = (skill: string) => {
        const trimmed = skill.trim();
        if (!trimmed || selectedSkills.includes(trimmed)) return;
        setSelectedSkills(prev => [...prev, trimmed]);
        setSkillInput("");
        setShowSuggestions(false);
    };

    const removeSkill = (skill: string) => {
        setSelectedSkills(prev => prev.filter(s => s !== skill));
    };

    const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (skillInput.trim()) addSkill(skillInput);
        } else if (e.key === "Backspace" && !skillInput && selectedSkills.length > 0) {
            removeSkill(selectedSkills[selectedSkills.length - 1]);
        }
    };

    // ─── Form submit ──────────────────────────────────────────────────────────

    const validateForm = () => {
        const newErrors: PostErrors = {};
        setErrors(newErrors);
        return true;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            // Compose stipend string in a normalised format the student filter can parse
            const stipend = stipendAmount
                ? `${Number(stipendAmount).toLocaleString("en-IN")} INR/${stipendPeriod}`
                : "";

            await postsAPI.create({
                recruiterId: currentRecruiter.id,
                companyName: formData.companyName,
                jobTitle: formData.jobTitle,
                jobDescription: formData.jobDescription,
                qualification: formData.qualification,
                experience: formData.experience,
                stipend,
                requiredSkills: selectedSkills,   // already an array — no split needed
                location: formData.location,
                jobType: formData.jobType,
                applicationMethod: formData.applicationMethod,
                applicationLink: formData.applicationLink,
                expiresAt: formData.expiresAt || null,
            });

            toast.success("Internship posted successfully!");
            router.push("/grow-your-resume/recruiter/dashboard");
        } catch (error: any) {
            console.error("Error posting internship:", error);
            toast.error("Failed to post internship. Please try again.");
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

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <>
            <Head>
                <title>Post New Internship - IIT BHU Grow Your Resume</title>
                <meta name="description" content="Post a new internship opportunity" />
            </Head>

            <div className="min-h-screen bg-white font-poppins">
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
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Post New Internship</h2>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Internship Details</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* ── Company Name & Job Title ── */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
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

                                {/* ── Job Description ── */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
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

                                {/* ── Qualification & Experience ── */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience Required</label>
                                        <select
                                            name="experience"
                                            value={formData.experience}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent ${errors.experience ? "border-red-500" : "border-gray-300"}`}
                                        >
                                            <option value="">Select experience level</option>
                                            {EXPERIENCE_OPTIONS.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                        {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
                                    </div>
                                </div>

                                {/* ── Stipend — structured input ── */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Stipend</label>
                                    <div className="flex gap-3">
                                        <div className="flex-1">
                                            <input
                                                type="number"
                                                min="0"
                                                value={stipendAmount}
                                                onChange={e => setStipendAmount(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                                                placeholder="Amount in INR (e.g. 15000)"
                                            />
                                        </div>
                                        <select
                                            value={stipendPeriod}
                                            onChange={e => setStipendPeriod(e.target.value)}
                                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent bg-white"
                                        >
                                            {STIPEND_PERIODS.map(p => (
                                                <option key={p.value} value={p.value}>{p.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {stipendAmount && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Preview: <span className="font-medium">{Number(stipendAmount).toLocaleString("en-IN")} INR/{stipendPeriod}</span>
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-400 mt-1">Leave blank if unpaid / to be discussed.</p>
                                </div>

                                {/* ── Required Skills — tag input with autocomplete ── */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>

                                    {/* Tag container — acts as the input */}
                                    <div
                                        className={`w-full min-h-[52px] px-3 py-2 border rounded-lg focus-within:ring-2 focus-within:ring-[#f56a38] focus-within:border-transparent flex flex-wrap gap-2 items-center cursor-text ${errors.requiredSkills ? "border-red-500" : "border-gray-300"}`}
                                        onClick={() => skillInputRef.current?.focus()}
                                    >
                                        {selectedSkills.map(skill => (
                                            <span
                                                key={skill}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-[#f56a38] border border-orange-200"
                                            >
                                                {skill}
                                                <button
                                                    type="button"
                                                    onClick={() => removeSkill(skill)}
                                                    className="hover:text-[#c94e27] transition-colors"
                                                    aria-label={`Remove ${skill}`}
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                        <input
                                            ref={skillInputRef}
                                            type="text"
                                            value={skillInput}
                                            onChange={e => { setSkillInput(e.target.value); setShowSuggestions(true); }}
                                            onKeyDown={handleSkillKeyDown}
                                            onFocus={() => setShowSuggestions(true)}
                                            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                                            placeholder={selectedSkills.length === 0 ? "Type a skill and press Enter or comma…" : ""}
                                            className="flex-1 min-w-[140px] outline-none text-sm bg-transparent py-1"
                                        />
                                    </div>

                                    {/* Autocomplete dropdown */}
                                    {showSuggestions && filteredSuggestions.length > 0 && (
                                        <div className="relative z-10">
                                            <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                                                {filteredSuggestions.map(s => (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        onMouseDown={() => addSkill(s)}
                                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-[#f56a38] transition-colors"
                                                    >
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-xs text-gray-400 mt-1">
                                        Type a skill and press{" "}
                                        <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs">Enter</kbd>{" "}
                                        or{" "}
                                        <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs">,</kbd>{" "}
                                        to add it. Press{" "}
                                        <kbd className="px-1 py-0.5 bg-gray-100 border border-gray-200 rounded text-xs">Backspace</kbd>{" "}
                                        on empty input to remove the last skill.
                                    </p>
                                    {errors.requiredSkills && <p className="text-red-500 text-sm mt-1">{errors.requiredSkills}</p>}
                                </div>

                                {/* ── Location ── */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
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

                                {/* ── Job Type & Application Method ── */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
                                        <select
                                            name="jobType"
                                            value={formData.jobType}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent ${errors.jobType ? "border-red-500" : "border-gray-300"}`}
                                        >
                                            <option value="REMOTE">Remote</option>
                                            <option value="ONSITE">On-site</option>
                                            <option value="HYBRID">Hybrid</option>
                                        </select>
                                        {errors.jobType && <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Application Method</label>
                                        <select
                                            name="applicationMethod"
                                            value={formData.applicationMethod}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent ${errors.applicationMethod ? "border-red-500" : "border-gray-300"}`}
                                        >
                                            <option value="NATIVE">E-Cell Portal</option>
                                            <option value="MAILTO">Email</option>
                                            <option value="EXTERNAL">External Website</option>
                                        </select>
                                        {errors.applicationMethod && <p className="text-red-500 text-sm mt-1">{errors.applicationMethod}</p>}
                                    </div>
                                </div>

                                {/* ── Application Link (conditional) ── */}
                                {formData.applicationMethod !== "NATIVE" && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {formData.applicationMethod === "MAILTO" ? "Email Address" : "Website URL"}
                                        </label>
                                        <input
                                            type={formData.applicationMethod === "MAILTO" ? "email" : "url"}
                                            name="applicationLink"
                                            value={formData.applicationLink}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent ${errors.applicationLink ? "border-red-500" : "border-gray-300"}`}
                                            placeholder={formData.applicationMethod === "MAILTO" ? "hr@company.com" : "https://company.com/careers"}
                                        />
                                        {errors.applicationLink && <p className="text-red-500 text-sm mt-1">{errors.applicationLink}</p>}
                                    </div>
                                )}

                                {/* ── Application Deadline ── */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
                                    <input
                                        type="date"
                                        name="expiresAt"
                                        value={formData.expiresAt}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent border-gray-300"
                                    />
                                    <p className="text-gray-500 text-xs mt-1">Leave blank for no deadline. Post will close automatically after this date.</p>
                                </div>

                                {/* ── Submit / Cancel ── */}
                                <div className="flex justify-end space-x-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
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

export async function getServerSideProps(context: any) {
    try {
        const session: any = await getServerSession(context.req, context.res, authOptions);

        if (!session || !session.user) {
            return {
                redirect: {
                    destination: "/grow-your-resume/login?role=recruiter",
                    permanent: false,
                },
            };
        }

        // Data is fetched client-side for instant page load
        // Verification check is handled client-side in useEffect
        return {
            props: {
                initialRecruiter: null,
                user: session.user,
            },
        };
    } catch (error) {
        console.error("Error in post-internship getServerSideProps:", error);
        return {
            redirect: {
                destination: "/grow-your-resume/login?role=recruiter",
                permanent: false,
            },
        };
    }
}
