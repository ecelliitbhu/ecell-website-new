import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { Search, LogOut, CheckCircle, Clock, XCircle, X } from "lucide-react";
import { NavLogo } from "../../../components/navbar/NavLogo";
import { useRouter } from "next/router";
import { postsAPI, applicationsAPI, studentsAPI } from "../../../lib/api";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Application, Post, Student, JobType } from "../../../lib/types";
import OpportunityCard from "../../../components/OpportunityCard";
import SkeletonCard from "../../../components/SkeletonCard";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import { serverAPI } from "../../../lib/server-api";

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
    isVerified?: boolean;
    expiresAt?: string | Date | null;
};

const CARDS_PER_PAGE = 6;

// ─── Filter helper functions ───────────────────────────────────────────────────

/**
 * Parse a stipend string to an approximate monthly INR amount.
 * Handles formats like: "18k/month", "20r/day", "15,000 INR/month", "500 INR/day"
 * Returns null if the string has no numeric content at all.
 */
const parseStipendMonthly = (stipend?: string): number | null => {
    if (!stipend) return null;
    const s = stipend.toLowerCase().replace(/,/g, "").replace(/₹/g, "").replace(/inr/g, "").trim();

    let amount: number;
    const kMatch = s.match(/(\d+\.?\d*)\s*k/);
    if (kMatch) {
        amount = parseFloat(kMatch[1]) * 1000;
    } else {
        const numMatch = s.match(/(\d+\.?\d*)/);
        if (!numMatch) return null;
        amount = parseFloat(numMatch[1]);
    }

    if (amount === 0) return 0; // explicitly unpaid

    // Normalize to monthly
    if (s.includes("/day") || s.includes("per day") || s.includes("daily")) {
        amount *= 22; // ~22 working days/month
    } else if (s.includes("/week") || s.includes("per week") || s.includes("weekly")) {
        amount *= 4;
    } else if (
        s.includes("/year") || s.includes("per year") || s.includes("per annum") ||
        s.includes("p.a") || s.includes("lpa")
    ) {
        amount /= 12;
    }
    // else: assume monthly

    return amount;
};

/**
 * Parse an experience string to approximate months.
 * Handles: "0 Yrs", "< 6 Months", "6 Months - 1 Yr", "1 - 2 Yrs", "2+ Yrs", free text.
 * Returns 0 for fresher, null if truly unparseable.
 */
const parseExperienceMonths = (experience?: string): number | null => {
    if (!experience) return null;
    const s = experience.toLowerCase().trim();

    if (s === "0" || s.startsWith("0 ") || s.startsWith("0y") || s.includes("fresher") || s.includes("no exp")) {
        return 0;
    }

    // Handle "less than N" e.g. "< 6 Months"
    if (s.startsWith("<") || s.includes("less than")) {
        const numMatch = s.match(/(\d+)/);
        if (numMatch) {
            const n = parseInt(numMatch[1]);
            if (s.includes("month")) return Math.max(0, n - 1);
            if (s.includes("year") || s.includes("yr")) return Math.max(0, (n - 1) * 12);
            return Math.max(0, n - 1);
        }
    }

    // Handle ranges "6 Months - 1 Yr" → use minimum
    if (s.includes(" - ") || s.includes("–")) {
        const parts = s.split(/ ?[-–] ?/);
        if (parts.length >= 2) {
            return parseExperienceMonths(parts[0].trim());
        }
    }

    // Handle "2+" e.g. "2+ Yrs"
    const plusMatch = s.match(/(\d+\.?\d*)\+?\s*(year|yr|month|mo\b)/);
    if (plusMatch) {
        const n = parseFloat(plusMatch[1]);
        if (plusMatch[2].startsWith("mo")) return n;
        return n * 12;
    }

    const yearMatch = s.match(/(\d+\.?\d*)\s*(year|yr)/);
    const monthMatch = s.match(/(\d+\.?\d*)\s*(month|mo\b)/);
    let months = 0;
    let found = false;
    if (yearMatch) { months += parseFloat(yearMatch[1]) * 12; found = true; }
    if (monthMatch) { months += parseFloat(monthMatch[1]); found = true; }
    if (!found) {
        const numMatch = s.match(/^(\d+)/);
        if (numMatch) months = parseInt(numMatch[1]) * 12;
    }
    return found ? months : null;
};

/** Check if a qualification string matches a branch category */
/**
 * Match a qualification string against a branch filter.
 * New structured format: "B.Tech (Computer Science & Engineering, Electrical Engineering)"
 * Old free-text: legacy fallback keyword matching.
 */
const matchesBranch = (qualification?: string, branch?: string): boolean => {
    if (!qualification || !branch) return false;
    const q = qualification.toLowerCase();
    const b = branch.toLowerCase();

    // "Open to All" or any-degree short strings → always matches
    if (q === "open to all" || q === "any") return true;

    // New structured format: "B.Tech (CSE, ECE)" or "M.Tech (Computer Science & Engineering)"
    const parenMatch = q.match(/\(([^)]+)\)/);
    if (parenMatch) {
        const branchList = parenMatch[1];
        if (branchList.includes("open to all") || branchList.includes("any")) return true;
        return branchList.includes(b);
    }

    // Degree-only string (single or comma-separated, no branch restriction) → open to all branches
    // e.g. "B.Tech", "B.Tech, M.Tech", "B.Tech, M.Tech, PhD"
    const DEGREE_TOKEN = "b\\.tech|m\\.tech|phd|b\\.arch|be|me|mba|bsc|msc|any";
    const degreeOnlyRe = new RegExp(`^(${DEGREE_TOKEN})(,\\s*(${DEGREE_TOKEN}))*$`);
    if (degreeOnlyRe.test(q.trim())) return true;

    // Legacy free-text fallback for old posts
    if (branch === "Computer Science & Engineering")  return q.includes("cse") || q.includes("computer science") || q.includes("software") || q.includes("information tech");
    if (branch === "Electrical Engineering")           return q.includes("electrical") || q.includes(" ee") || q.includes("eee");
    if (branch === "Electronics Engineering")          return q.includes("ece") || q.includes("electronics");
    if (branch === "Mechanical Engineering")           return q.includes("mechanical") || q.includes("mech");
    if (branch === "Chemical Engineering & Technology") return q.includes("chemical") || q.includes("chem eng");
    if (branch === "Civil Engineering")                return q.includes("civil");
    if (branch === "Biomedical Engineering")           return q.includes("biomedical") || q.includes("biomed");
    if (branch === "Biochemical Engineering")          return q.includes("biochem");
    if (branch === "Mathematics & Computing")          return q.includes("mathematics") || q.includes("maths") || q.includes("computing") || q.includes("m&c");
    if (branch === "Engineering Physics")              return q.includes("physics") || q.includes("ep");
    if (branch === "Metallurgical Engineering")        return q.includes("metallurg") || q.includes("meta");
    if (branch === "Mining Engineering")               return q.includes("mining");
    if (branch === "Pharmaceutical Engineering")       return q.includes("pharma");
    if (branch === "Industrial Chemistry")             return q.includes("industrial chem");
    if (branch === "Ceramic Engineering")              return q.includes("ceramic");
    if (branch === "Materials Science & Technology")   return q.includes("material");
    if (branch === "Architecture, Planning & Design")  return q.includes("arch") || q.includes("planning");
    return false;
};

/**
 * Check if a qualification string accepts a given degree level.
 * "Open to All" / "Any" (no degree restriction) → always matches.
 * New structured format: degree token appears before the optional parens.
 * Legacy free-text: simple substring match.
 */
const matchesDegree = (qualification?: string, degree?: string): boolean => {
    if (!qualification || !degree) return false;
    const q = qualification.toLowerCase();
    if (q === "open to all" || q === "any") return true;
    return q.includes(degree.toLowerCase());
};

// ─── Static filter option definitions ─────────────────────────────────────────

const JOB_TYPE_OPTIONS = [
    { value: "REMOTE", label: "Remote" },
    { value: "ONSITE", label: "On-site" },
    { value: "HYBRID", label: "Hybrid" },
];

const EXPERIENCE_OPTIONS = [
    { value: "fresher",  label: "Fresher (0 yrs)" },
    { value: "<6m",      label: "< 6 months" },
    { value: "6m-1yr",   label: "6m – 1 yr" },
    { value: "1-2yrs",   label: "1 – 2 yrs" },
    { value: "2+yrs",    label: "2+ yrs" },
];

const STIPEND_OPTIONS = [
    { value: "unpaid",  label: "Unpaid" },
    { value: "<10k",    label: "< ₹10k/mo" },
    { value: "10k-30k", label: "₹10k–30k/mo" },
    { value: ">30k",    label: "> ₹30k/mo" },
];

const BRANCH_OPTIONS = [
    "Architecture, Planning & Design",
    "Biochemical Engineering",
    "Biomedical Engineering",
    "Ceramic Engineering",
    "Chemical Engineering & Technology",
    "Civil Engineering",
    "Computer Science & Engineering",
    "Electrical Engineering",
    "Electronics Engineering",
    "Engineering Physics",
    "Industrial Chemistry",
    "Materials Science & Technology",
    "Mathematics & Computing",
    "Mechanical Engineering",
    "Metallurgical Engineering",
    "Mining Engineering",
    "Pharmaceutical Engineering",
];

const MAX_SKILLS_SHOWN = 10;

// ─── Component ────────────────────────────────────────────────────────────────

interface OpportunitiesPageProps {
    initialStudent?: Student | null;
    initialOpportunities?: SimplifiedOpportunity[];
    initialAppliedOpportunities?: SimplifiedOpportunity[];
}

const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({
    initialStudent,
    initialOpportunities,
    initialAppliedOpportunities,
}) => {
    const [activeTab, setActiveTab] = useState("opportunities");
    const [appliedOpportunities, setAppliedOpportunities] = useState<SimplifiedOpportunity[]>(initialAppliedOpportunities || []);
    const [opportunities, setOpportunities] = useState<SimplifiedOpportunity[]>(initialOpportunities || []);
    const [filteredOpportunities, setFilteredOpportunities] = useState<SimplifiedOpportunity[]>(initialOpportunities || []);
    const [isLoading, setIsLoading] = useState(!initialStudent || !initialOpportunities || initialOpportunities.length === 0);
    const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);
    const [hasError, setHasError] = useState(false);

    const [filters, setFilters] = useState({
        search: "",
        skills: [] as string[],
        jobType: [] as string[],
        experience: "",
        stipendRange: "",
        degreeLevel: [] as string[],
        branch: [] as string[],
    });
    const [showAllSkills, setShowAllSkills] = useState(false);

    const [pinnedPosts, setPinnedPosts] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("gyr_pinned_posts");
        if (saved) {
            try {
                setPinnedPosts(JSON.parse(saved));
            } catch (e) {}
        }
    }, []);

    const handleTogglePin = (id: string) => {
        setPinnedPosts(prev => {
            const updated = prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id];
            localStorage.setItem("gyr_pinned_posts", JSON.stringify(updated));
            return updated;
        });
    };

    const [currentStudent, setCurrentStudent] = useState<Student>(initialStudent || {
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
        if (!initialStudent || !initialOpportunities || initialOpportunities.length === 0) {
            if (status !== "authenticated") return;
            const studentId = (session?.user as any)?.id as string | null;
            const studentEmail = (session?.user as any)?.email as string | null;

            const init = async () => {
                setIsLoading(true);
                try {
                    const [studentResult, postsResult, appsResult] = await Promise.allSettled([
                        studentId ? studentsAPI.getProfile(studentId, studentEmail || undefined) : Promise.resolve(null),
                        postsAPI.getAll(),
                        studentId ? applicationsAPI.getAll({ studentId }) : Promise.resolve([]),
                    ]);

                    if (studentResult.status === "fulfilled" && studentResult.value) {
                        const studentVal = studentResult.value as any;
                        const studentData = studentVal?.data || studentVal;
                        if (studentData && (studentData.rollNo || studentData.id)) {
                            setCurrentStudent(studentData);
                        }
                    }

                    const appsVal = appsResult.status === "fulfilled" ? (appsResult.value as any) : null;
                    const rawApps: any[] = appsVal ? (appsVal.data || (Array.isArray(appsVal) ? appsVal : [])) : [];
                    const appliedPostIds = rawApps.map((app: Application) => app.postId);

                    const postsVal = postsResult.status === "fulfilled" ? (postsResult.value as any) : null;
                    const postsData: any[] = Array.isArray(postsVal) ? postsVal : (postsVal?.data || []);

                    if ((postsResult.status === "rejected" || postsVal === null) && postsData.length === 0) {
                        setHasError(true);
                    } else {
                        setHasError(false);
                    }

                    const availablePosts = postsData.filter((post: Post) => !appliedPostIds.includes(post.id));

                    setOpportunities(
                        availablePosts.map((post: Post) => ({
                            id: post.id,
                            postId: post.id,
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
                            appliedAt: new Date().toISOString(),
                            applicationMethod: post.applicationMethod || "NATIVE",
                            applicationLink: post.applicationLink,
                            expiresAt: post.expiresAt,
                            isVerified: true,
                        }))
                    );

                    setAppliedOpportunities(
                        rawApps.map((app: Application) => ({
                            id: app.id,
                            postId: app.postId,
                            title: `${app.post?.jobTitle || "Internship"}`,
                            company: app.post?.companyName || "",
                            location: app.post?.location || "",
                            type: app.post?.jobType,
                            qualification: app.post?.qualification,
                            experience: app.post?.experience,
                            stipend: app.post?.stipend,
                            skills: app.post?.requiredSkills,
                            description: app.post?.jobDescription,
                            applied: true,
                            postedDate: app.post?.createdAt || new Date().toISOString(),
                            appliedAt: app.appliedAt || new Date().toISOString(),
                            status: (app.status?.toLowerCase() || "pending") as ApplicationStatus,
                            applicationMethod: app.post?.applicationMethod || "NATIVE",
                            applicationLink: app.post?.applicationLink,
                            expiresAt: app.post?.expiresAt,
                            isVerified: true,
                        }))
                    );
                } catch (error: any) {
                    console.error("Error initializing opportunities:", error);
                    setHasError(true);
                } finally {
                    setIsLoading(false);
                }
            };
            init();
        }
    }, [status, initialStudent]);

    // Derive skill list dynamically from all loaded opportunities (sorted by frequency)
    const dynamicSkills = useMemo(() => {
        const freq: Record<string, number> = {};
        opportunities.forEach(opp => {
            opp.skills?.forEach(skill => {
                const normalized = skill.trim();
                if (normalized) freq[normalized] = (freq[normalized] || 0) + 1;
            });
        });
        return Object.entries(freq)
            .sort((a, b) => b[1] - a[1])
            .map(([skill]) => skill);
    }, [opportunities]);

    const visibleSkills = showAllSkills ? dynamicSkills : dynamicSkills.slice(0, MAX_SKILLS_SHOWN);

    useEffect(() => {
        if (activeTab === "opportunities") {
            filterOpportunities();
        }
    }, [filters, opportunities, activeTab, pinnedPosts]);

    const filterOpportunities = () => {
        let filtered = [...opportunities];

        // Search: title, company, description
        if (filters.search) {
            filtered = filtered.filter(opp =>
                opp.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
                opp.company?.toLowerCase().includes(filters.search.toLowerCase()) ||
                opp.description?.toLowerCase().includes(filters.search.toLowerCase())
            );
        }

        // Skills: AND logic — show only if opp has ALL selected skills
        if (filters.skills.length > 0) {
            filtered = filtered.filter(opp =>
                filters.skills.every(sel =>
                    opp.skills?.some(s => s.toLowerCase() === sel.toLowerCase())
                )
            );
        }

        // Job Type: OR logic
        if (filters.jobType.length > 0) {
            filtered = filtered.filter(opp =>
                filters.jobType.includes((opp.type as string)?.toUpperCase() || "")
            );
        }

        // Experience: single-select; if unparseable → show the opportunity
        if (filters.experience) {
            filtered = filtered.filter(opp => {
                const months = parseExperienceMonths(opp.experience);
                if (months === null) return true;
                switch (filters.experience) {
                    case "fresher": return months === 0;
                    case "<6m":     return months > 0 && months < 6;
                    case "6m-1yr":  return months >= 6 && months < 12;
                    case "1-2yrs":  return months >= 12 && months < 24;
                    case "2+yrs":   return months >= 24;
                    default:        return true;
                }
            });
        }

        // Stipend Range: single-select; if unparseable → show the opportunity
        if (filters.stipendRange) {
            filtered = filtered.filter(opp => {
                const amount = parseStipendMonthly(opp.stipend);
                if (amount === null) return true;
                switch (filters.stipendRange) {
                    case "unpaid":  return amount === 0;
                    case "<10k":    return amount > 0 && amount < 10000;
                    case "10k-30k": return amount >= 10000 && amount <= 30000;
                    case ">30k":    return amount > 30000;
                    default:        return true;
                }
            });
        }

        // Branch / Qualification: OR logic — show if opp matches ANY selected branch
        if (filters.branch.length > 0) {
            filtered = filtered.filter(opp =>
                filters.branch.some(b => matchesBranch(opp.qualification, b))
            );
        }

        // Degree Level: OR logic — show if opp accepts ANY selected degree
        if (filters.degreeLevel.length > 0) {
            filtered = filtered.filter(opp => {
                const q = opp.qualification || "";
                // If stored as "Open to All" or has no restriction → show for any degree filter
                if (!q || q.toLowerCase() === "open to all" || q.toLowerCase() === "any") return true;
                return filters.degreeLevel.some(d => matchesDegree(q, d));
            });
        }

        // Sort: Pinned first → non-expired → most recent
        filtered.sort((a, b) => {
            const aPinned = pinnedPosts.includes(a.id);
            const bPinned = pinnedPosts.includes(b.id);
            if (aPinned && !bPinned) return -1;
            if (!aPinned && bPinned) return 1;

            const aExpired = (a as any).expiresAt && new Date((a as any).expiresAt) < new Date();
            const bExpired = (b as any).expiresAt && new Date((b as any).expiresAt) < new Date();
            if (!aExpired && bExpired) return -1;
            if (aExpired && !bExpired) return 1;

            return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        });

        setFilteredOpportunities(filtered);
    };

    /** Toggle a value in/out of a multi-select array filter */
    const toggleArrayFilter = (key: "skills" | "jobType" | "branch" | "degreeLevel", value: string) => {
        setFilters(prev => {
            const arr = prev[key] as string[];
            const updated = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
            return { ...prev, [key]: updated };
        });
    };

    const handleFilterChange = (key: keyof typeof filters, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({ search: "", skills: [], jobType: [], experience: "", stipendRange: "", degreeLevel: [], branch: [] });
    };

    const hasActiveFilters = !!(
        filters.search || filters.skills.length > 0 || filters.jobType.length > 0 ||
        filters.experience || filters.stipendRange || filters.degreeLevel.length > 0 || filters.branch.length > 0
    );

    // Build list of removable active-filter badges shown above results
    const activeFilterBadges: { label: string; onRemove: () => void }[] = [
        ...filters.skills.map(s => ({ label: s, onRemove: () => toggleArrayFilter("skills", s) })),
        ...filters.jobType.map(t => ({
            label: JOB_TYPE_OPTIONS.find(o => o.value === t)?.label || t,
            onRemove: () => toggleArrayFilter("jobType", t),
        })),
        ...(filters.experience ? [{
            label: EXPERIENCE_OPTIONS.find(o => o.value === filters.experience)?.label || filters.experience,
            onRemove: () => handleFilterChange("experience", ""),
        }] : []),
        ...(filters.stipendRange ? [{
            label: STIPEND_OPTIONS.find(o => o.value === filters.stipendRange)?.label || filters.stipendRange,
            onRemove: () => handleFilterChange("stipendRange", ""),
        }] : []),
        ...filters.branch.map(b => ({ label: b, onRemove: () => toggleArrayFilter("branch", b) })),
        ...filters.degreeLevel.map(d => ({ label: d, onRemove: () => toggleArrayFilter("degreeLevel", d) })),
    ];

    // ─── Action handlers ────────────────────────────────────────────────────────

    const handleApply = async (opportunityId: any) => {
        try {
            const studentId = (session?.user as any)?.id as string | null;
            if (!studentId) {
                toast.error("Please log in to apply");
                router.push("/grow-your-resume/login");
                return;
            }

            if (!currentStudent?.rollNo || !currentStudent?.resumeUrl) {
                toast.error("Please complete your profile to apply for opportunities.");
                router.push("/grow-your-resume/student/profile?edit=true");
                return;
            }

            const appliedOpportunity = opportunities.find(opp => opp.id === opportunityId);
            let method = "NATIVE";

            if (appliedOpportunity) {
                method = appliedOpportunity.applicationMethod || "NATIVE";
                if (method === "MAILTO" && appliedOpportunity.applicationLink) {
                    window.location.href = "mailto:" + appliedOpportunity.applicationLink;
                } else if (method === "EXTERNAL" && appliedOpportunity.applicationLink) {
                    window.open(appliedOpportunity.applicationLink, "_blank");
                }
            }

            const appRes = await applicationsAPI.create({ studentId, postId: opportunityId });

            if (appliedOpportunity) {
                setOpportunities(prev => prev.filter(opp => opp.id !== opportunityId));
                setFilteredOpportunities(prev => prev.filter(opp => opp.id !== opportunityId));

                const newApplication: SimplifiedOpportunity = {
                    id: appRes?.id || appliedOpportunity.id,
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
                    status: (appRes?.status?.toLowerCase() || "pending") as ApplicationStatus,
                    applicationMethod: appliedOpportunity.applicationMethod,
                    applicationLink: appliedOpportunity.applicationLink,
                    isVerified: appliedOpportunity.isVerified,
                };
                setAppliedOpportunities(prev => [...prev, newApplication]);
            }

            if (appRes?.alreadyApplied) {
                toast.success("Already applied to this position!");
            } else {
                toast.success(method === "NATIVE" ? "Application submitted successfully!" : "Redirected to application!");
            }
        } catch (error: any) {
            console.error("Error applying to opportunity:", error);
            toast.error("Failed to submit application. Please try again later.");
        }
    };

    const handleWithdraw = async (applicationId: any) => {
        try {
            const withdrawnApplication = appliedOpportunities.find(app => app.id === applicationId);
            await applicationsAPI.withdraw(applicationId);
            toast.success("Application withdrawn successfully!");
            setAppliedOpportunities(prev => prev.filter(app => app.id !== applicationId));

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
                    status: withdrawnApplication.status ?? "pending",
                    applicationMethod: withdrawnApplication.applicationMethod || "NATIVE",
                    applicationLink: withdrawnApplication.applicationLink,
                };
                setOpportunities(prev => [...prev, opportunityToRestore]);
            }
        } catch (error: any) {
            console.error("Error withdrawing application:", error);
            toast.error("Failed to withdraw application. Please try again later.");
        }
    };

    const handleLogout = () => {
        signOut({ callbackUrl: "/grow-your-resume" });
    };

    const getStatusBadge = (status: ApplicationStatus) => {
        const statusConfig = {
            pending:  { color: "bg-yellow-100 text-yellow-800", icon: Clock },
            accepted: { color: "bg-green-100 text-green-800",  icon: CheckCircle },
            rejected: { color: "bg-red-100 text-red-800",     icon: XCircle },
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

    // ─── Render ────────────────────────────────────────────────────────────────

    return (
        <>
            <Head>
                <title>Internship Opportunities - IIT BHU Grow Your Resume</title>
                <meta name="description" content="Browse and apply to internship opportunities" />
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
                            <button
                                onClick={() => setActiveTab("opportunities")}
                                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === "opportunities" ? "border-[#f56a38] text-black" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                            >
                                Opportunities
                            </button>
                            <button
                                onClick={() => setActiveTab("applied")}
                                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${activeTab === "applied" ? "border-[#f56a38] text-black" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                            >
                                Applied
                            </button>
                        </div>

                        {/* ── Opportunities Tab ───────────────────────────────── */}
                        {activeTab === "opportunities" && (
                            <div>
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Internship Opportunities</h2>
                                </div>

                                <div className="flex gap-8">
                                    {/* ── Filters Sidebar ──────────────────────── */}
                                    <div className="w-64 flex-shrink-0">
                                        <div className="bg-white border border-gray-200 rounded-lg p-5 sticky top-4">
                                            {/* Header row */}
                                            <div className="flex items-center justify-between mb-5">
                                                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                                                {hasActiveFilters && (
                                                    <button
                                                        onClick={clearFilters}
                                                        className="text-xs text-[#f56a38] hover:text-[#e55a32] font-medium transition-colors"
                                                    >
                                                        Clear All
                                                    </button>
                                                )}
                                            </div>

                                            {/* Search */}
                                            <div className="mb-5">
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                                    Search
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Search by title, company..."
                                                    value={filters.search}
                                                    onChange={e => handleFilterChange("search", e.target.value)}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent text-sm"
                                                />
                                            </div>

                                            {/* Skills — dynamic checkbox list (handles long names gracefully) */}
                                            <div className="mb-5">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                                        Skills
                                                    </label>
                                                    {filters.skills.length > 0 && (
                                                        <span className="text-xs text-[#f56a38] font-medium">
                                                            {filters.skills.length} selected · AND
                                                        </span>
                                                    )}
                                                </div>
                                                {dynamicSkills.length === 0 ? (
                                                    <p className="text-xs text-gray-400 italic">Loading skills…</p>
                                                ) : (
                                                    <>
                                                        <div className="max-h-44 overflow-y-auto space-y-0.5 pr-0.5">
                                                            {visibleSkills.map(skill => {
                                                                const isChecked = filters.skills.includes(skill);
                                                                return (
                                                                    <label
                                                                        key={skill}
                                                                        className={`flex items-center gap-2 px-1.5 py-1 rounded cursor-pointer transition-colors group ${
                                                                            isChecked ? "bg-orange-50" : "hover:bg-gray-50"
                                                                        }`}
                                                                    >
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={isChecked}
                                                                            onChange={() => toggleArrayFilter("skills", skill)}
                                                                            className="w-3.5 h-3.5 flex-shrink-0 cursor-pointer accent-[#f56a38]"
                                                                        />
                                                                        <span
                                                                            className={`text-xs truncate ${
                                                                                isChecked ? "text-[#f56a38] font-medium" : "text-gray-600 group-hover:text-gray-900"
                                                                            }`}
                                                                            title={skill}
                                                                        >
                                                                            {skill}
                                                                        </span>
                                                                    </label>
                                                                );
                                                            })}
                                                        </div>
                                                        {dynamicSkills.length > MAX_SKILLS_SHOWN && (
                                                            <button
                                                                onClick={() => setShowAllSkills(v => !v)}
                                                                className="mt-2 text-xs text-[#f56a38] hover:text-[#e55a32] font-medium"
                                                            >
                                                                {showAllSkills
                                                                    ? "Show less ↑"
                                                                    : `+${dynamicSkills.length - MAX_SKILLS_SHOWN} more ↓`}
                                                            </button>
                                                        )}
                                                    </>
                                                )}
                                            </div>

                                            {/* Job Type — multi-select */}
                                            <div className="mb-5">
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                                    Job Type
                                                </label>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {JOB_TYPE_OPTIONS.map(opt => (
                                                        <button
                                                            key={opt.value}
                                                            onClick={() => toggleArrayFilter("jobType", opt.value)}
                                                            className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                                                                filters.jobType.includes(opt.value)
                                                                    ? "bg-[#f56a38] text-white border-[#f56a38]"
                                                                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                                                            }`}
                                                        >
                                                            {opt.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Experience — single-select (click again to deselect) */}
                                            <div className="mb-5">
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                                    Experience
                                                </label>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {EXPERIENCE_OPTIONS.map(opt => (
                                                        <button
                                                            key={opt.value}
                                                            onClick={() => handleFilterChange("experience", filters.experience === opt.value ? "" : opt.value)}
                                                            className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                                                                filters.experience === opt.value
                                                                    ? "bg-[#f56a38] text-white border-[#f56a38]"
                                                                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                                                            }`}
                                                        >
                                                            {opt.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Stipend Range — single-select */}
                                            <div className="mb-5">
                                                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                                    Stipend
                                                </label>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {STIPEND_OPTIONS.map(opt => (
                                                        <button
                                                            key={opt.value}
                                                            onClick={() => handleFilterChange("stipendRange", filters.stipendRange === opt.value ? "" : opt.value)}
                                                            className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                                                                filters.stipendRange === opt.value
                                                                    ? "bg-[#f56a38] text-white border-[#f56a38]"
                                                                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                                                            }`}
                                                        >
                                                            {opt.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Degree Level — multi-select chips */}
                                            <div className="mb-5">
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                                        Degree Level
                                                    </label>
                                                    {filters.degreeLevel.length > 0 && (
                                                        <span className="text-xs text-[#f56a38] font-medium">
                                                            {filters.degreeLevel.length} selected
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {["B.Tech", "M.Tech", "PhD", "B.Arch"].map(d => (
                                                        <button
                                                            key={d}
                                                            onClick={() => toggleArrayFilter("degreeLevel", d)}
                                                            className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                                                                filters.degreeLevel.includes(d)
                                                                    ? "bg-[#f56a38] text-white border-[#f56a38]"
                                                                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                                                            }`}
                                                        >
                                                            {d}
                                                        </button>
                                                    ))}
                                                </div>
                                                <p className="text-xs text-gray-400 mt-1.5">
                                                    Internships open to any degree always appear.
                                                </p>
                                            </div>

                                            {/* Branch — scrollable checkbox list */}
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                                        Branch
                                                    </label>
                                                    {filters.branch.length > 0 && (
                                                        <span className="text-xs text-[#f56a38] font-medium">
                                                            {filters.branch.length} selected
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="max-h-44 overflow-y-auto space-y-0.5 pr-0.5">
                                                    {BRANCH_OPTIONS.map(b => {
                                                        const isChecked = filters.branch.includes(b);
                                                        return (
                                                            <label
                                                                key={b}
                                                                className={`flex items-center gap-2 px-1.5 py-1 rounded cursor-pointer transition-colors group ${
                                                                    isChecked ? "bg-orange-50" : "hover:bg-gray-50"
                                                                }`}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isChecked}
                                                                    onChange={() => toggleArrayFilter("branch", b)}
                                                                    className="w-3.5 h-3.5 flex-shrink-0 cursor-pointer accent-[#f56a38]"
                                                                />
                                                                <span
                                                                    className={`text-xs truncate ${
                                                                        isChecked ? "text-[#f56a38] font-medium" : "text-gray-600 group-hover:text-gray-900"
                                                                    }`}
                                                                    title={b}
                                                                >
                                                                    {b}
                                                                </span>
                                                            </label>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── Opportunities List ────────────────────── */}
                                    <div className="flex-1">
                                        {/* Active filter badges */}
                                        {activeFilterBadges.length > 0 && (
                                            <div className="flex flex-wrap items-center gap-2 mb-4">
                                                {activeFilterBadges.map((badge, i) => (
                                                    <span
                                                        key={i}
                                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-[#f56a38] border border-orange-200"
                                                    >
                                                        {badge.label}
                                                        <button
                                                            onClick={badge.onRemove}
                                                            className="ml-0.5 hover:text-[#c94e27] transition-colors"
                                                            aria-label={`Remove ${badge.label} filter`}
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </span>
                                                ))}
                                                <button
                                                    onClick={clearFilters}
                                                    className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
                                                >
                                                    Clear all
                                                </button>
                                            </div>
                                        )}

                                        <div className="space-y-6">
                                            {hasError ? (
                                                <div className="bg-white border border-red-200 rounded-lg p-12 text-center flex flex-col items-center">
                                                    <XCircle className="w-16 h-16 text-red-400 mb-4" />
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to load opportunities</h3>
                                                    <p className="text-gray-600 mb-6">Please check back again in a few moments.</p>
                                                    <button
                                                        onClick={() => window.location.reload()}
                                                        className="px-6 py-2 bg-red-50 text-red-600 border border-red-200 text-[14px] font-medium rounded-lg hover:bg-red-100 transition-colors"
                                                    >
                                                        Retry
                                                    </button>
                                                </div>
                                            ) : isLoading ? (
                                                [...Array(4)].map((_, i) => <SkeletonCard key={i} />)
                                            ) : filteredOpportunities.length === 0 ? (
                                                <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                                                    <div className="text-gray-400 mb-4">
                                                        <Search className="w-16 h-16 mx-auto" />
                                                    </div>
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No opportunities found</h3>
                                                    <p className="text-gray-600 mb-4">No opportunities match your current filters. Clear filters or check back later.</p>
                                                    {hasActiveFilters && (
                                                        <button
                                                            onClick={clearFilters}
                                                            className="px-6 py-2 bg-[#f56a38] text-white text-[14px] font-medium rounded-lg hover:bg-[#e55a32] transition-colors"
                                                        >
                                                            Clear Filters
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <>
                                                    {filteredOpportunities.slice(0, visibleCount).map(opportunity => (
                                                        <OpportunityCard
                                                            key={opportunity.id}
                                                            opportunity={opportunity as any}
                                                            onApply={handleApply}
                                                            isPinned={pinnedPosts.includes(opportunity.id)}
                                                            onTogglePin={handleTogglePin}
                                                        />
                                                    ))}

                                                    {visibleCount < filteredOpportunities.length && (
                                                        <div className="text-center pt-4">
                                                            <button
                                                                onClick={() => setVisibleCount(c => c + CARDS_PER_PAGE)}
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

                        {/* ── Applied Tab ─────────────────────────────────────── */}
                        {activeTab === "applied" && (
                            <div>
                                <div className="mb-8">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Applied Opportunities</h2>
                                </div>

                                <div className="space-y-6">
                                    {hasError ? (
                                        <div className="bg-white border border-red-200 rounded-lg p-12 text-center flex flex-col items-center">
                                            <XCircle className="w-16 h-16 text-red-400 mb-4" />
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unable to load applications</h3>
                                            <p className="text-gray-600 mb-6">Please check back again in a few moments.</p>
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
                                        appliedOpportunities.map(opportunity => (
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

export async function getServerSideProps(context: any) {
    try {
        const session: any = await getServerSession(context.req, context.res, authOptions);

        if (!session || !session.user) {
            return {
                redirect: {
                    destination: "/grow-your-resume/login?role=student",
                    permanent: false,
                },
            };
        }

        let student = session.user?.roleData?.student || null;
        if (!student || !student.rollNo) {
            try {
                student = await serverAPI.getStudentProfile(session.user.id, session.jwtToken, session.user.email);
            } catch (e) {}
        }

        let availablePosts: any[] = [];
        let appliedApps: any[] = [];

        try {
            const rawPosts = await serverAPI.getAllPosts(session.jwtToken);
            const posts = Array.isArray(rawPosts) ? rawPosts : [];

            let rawApps: any[] = [];
            if (student?.id || session.user.id) {
                rawApps = await serverAPI.getStudentApplications(student?.id || session.user.id, session.jwtToken);
            }
            appliedApps = Array.isArray(rawApps) ? rawApps : [];
            const appliedPostIds = appliedApps.map((app: any) => app.postId);

            availablePosts = posts.filter((post: any) => !appliedPostIds.includes(post.id));
        } catch (ePosts) {}

        const safeOpportunities = availablePosts.map((post: any) => ({
            id: post.id || "",
            postId: post.id || "",
            title: `${post.jobTitle || ""} (${post.companyName || ""})`,
            company: post.companyName || "",
            location: post.location || "",
            type: post.jobType || "REMOTE",
            qualification: post.qualification || null,
            experience: post.experience || null,
            stipend: post.stipend || null,
            skills: post.requiredSkills || [],
            description: post.jobDescription || null,
            applied: false,
            postedDate: post.createdAt ? new Date(post.createdAt).toISOString() : new Date().toISOString(),
            appliedAt: new Date().toISOString(),
            applicationMethod: post.applicationMethod || "NATIVE",
            applicationLink: post.applicationLink || null,
            expiresAt: post.expiresAt ? new Date(post.expiresAt).toISOString() : null,
            isVerified: true,
        }));

        const safeApplied = appliedApps.map((app: any) => ({
            id: app.id || "",
            postId: app.postId || "",
            title: `${app.post?.jobTitle || "Internship"}`,
            company: app.post?.companyName || "",
            location: app.post?.location || "",
            type: app.post?.jobType || "REMOTE",
            qualification: app.post?.qualification || null,
            experience: app.post?.experience || null,
            stipend: app.post?.stipend || null,
            skills: app.post?.requiredSkills || [],
            description: app.post?.jobDescription || null,
            applied: true,
            postedDate: app.post?.createdAt ? new Date(app.post.createdAt).toISOString() : new Date().toISOString(),
            appliedAt: app.appliedAt ? new Date(app.appliedAt).toISOString() : new Date().toISOString(),
            status: (app.status?.toLowerCase() || "pending"),
            applicationMethod: app.post?.applicationMethod || "NATIVE",
            applicationLink: app.post?.applicationLink || null,
            expiresAt: app.post?.expiresAt ? new Date(app.post.expiresAt).toISOString() : null,
            isVerified: true,
        }));

        return {
            props: {
                initialStudent: student ? JSON.parse(JSON.stringify(student)) : null,
                initialOpportunities: JSON.parse(JSON.stringify(safeOpportunities)),
                initialAppliedOpportunities: JSON.parse(JSON.stringify(safeApplied)),
            },
        };
    } catch (error) {
        console.error("Error in opportunities getServerSideProps:", error);
        return {
            redirect: {
                destination: "/grow-your-resume/login?role=student",
                permanent: false,
            },
        };
    }
}
