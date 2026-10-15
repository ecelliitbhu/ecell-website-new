import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { LogOut, Save, Edit, X } from "lucide-react";
import { NavLogo } from "../../../components/navbar/NavLogo";
import { useRouter } from "next/router";
import { studentsAPI, usersAPI } from "../../../lib/api";
import { getStudentId, getStoredUser } from "../../../lib/auth";
import { toast } from "react-hot-toast";
import { UserWithRoles } from "../../../lib/types";
import { useSession, signOut, getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import { serverAPI } from "../../../lib/server-api";
import { ensureAbsoluteUrl } from "../../../lib/utils";

interface StudentProfilePageProps {
    initialProfile?: any;
    user?: UserWithRoles;
}

const mapStudentToState = (data: any, fallbackUser?: any) => {
    return {
        name: data?.name || fallbackUser?.name || "",
        rollNumber: data?.rollNo || "",
        emailId: data?.user?.email || fallbackUser?.email || "",
        cpi: data?.cpi ? data.cpi.toString() : "",
        branch: data?.branch || "Architecture, Planning and Design",
        linkedinLink: data?.linkedinUrl || "",
        githubLink: data?.githubUrl || "",
        resumeLink: data?.resumeUrl || "",
        year: data?.year ? (typeof data.year === "number" ? `${data.year} Year` : data.year.toString()) : "1st Year",
        courseType: data?.courseType || "B.Tech",
    };
};

const ProfilePage: React.FC<StudentProfilePageProps> = ({ initialProfile, user: ssrUser }) => {
    const hasInitialData = !!(initialProfile && (initialProfile.rollNo || initialProfile.id));
    const initial = hasInitialData ? mapStudentToState(initialProfile, ssrUser) : {
        name: ssrUser?.name || "",
        rollNumber: "",
        emailId: ssrUser?.email || "",
        cpi: "",
        branch: "Architecture, Planning and Design",
        linkedinLink: "",
        githubLink: "",
        resumeLink: "",
        year: "1st Year",
        courseType: "B.Tech",
    };

    const [profileData, setProfileData] = useState(initial);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ ...initial });
    const [isLoading, setIsLoading] = useState(!hasInitialData);
    const { data: session, update } = useSession();

    const router = useRouter();
    const { edit } = router.query;

    useEffect(() => {
        if (hasInitialData) {
            setProfileData(initial);
            setEditData(initial);
            setIsLoading(false);
            if (edit === "true") {
                setIsEditing(true);
            }
        } else {
            loadProfile();
            if (edit === "true") {
                setIsEditing(true);
            }
        }
    }, [edit, initialProfile]);

    const loadProfile = async () => {
        try {
            setIsLoading(true);
            const rawUser = await getStoredUser();
            if (!rawUser) {
                router.push("/grow-your-resume/login");
                return;
            }
            const user = rawUser as UserWithRoles;

            // Fetch student profile directly
            const studentRes = await studentsAPI.getProfile(user.id, user.email);
            const student = studentRes?.data || studentRes;

            if (student && (student.rollNo || student.id)) {
                const yearStr = student.year ? (typeof student.year === "number" ? `${student.year}${getOrdinalSuffix(student.year)} Year` : student.year) : "1st Year";
                const fetchedProfile = {
                    name: student.name || user.name || "",
                    rollNumber: student.rollNo || "",
                    emailId: student.user?.email || user.email || "",
                    cpi: student.cpi !== undefined && student.cpi !== null ? student.cpi.toString() : "",
                    branch: student.branch || "Architecture, Planning and Design",
                    linkedinLink: student.linkedinUrl || "",
                    githubLink: student.githubUrl || "",
                    resumeLink: student.resumeUrl || "",
                    year: yearStr,
                    courseType: student.courseType || "B.Tech",
                };
                setProfileData(fetchedProfile);
                setEditData(fetchedProfile);
                if (edit === "true" || !student.rollNo) {
                    setIsEditing(true);
                } else {
                    setIsEditing(false);
                }
            } else {
                const defaultProfile = {
                    name: user.name || "",
                    rollNumber: "",
                    emailId: user.email || "",
                    cpi: "",
                    branch: "Architecture, Planning and Design",
                    linkedinLink: "",
                    githubLink: "",
                    resumeLink: "",
                    year: "1st Year",
                    courseType: "B.Tech",
                };
                setProfileData(defaultProfile);
                setEditData(defaultProfile);
                setIsEditing(true);
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const getOrdinalSuffix = (num: any) => {
        const suffixes = ["th", "st", "nd", "rd"];
        const v = num % 100;
        return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
    };

    const handleInputChange = (field: any, value: any) => {
        setEditData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const rawUser = await getStoredUser();
            if (!rawUser) {
                toast.error("Please log in to update profile");
                router.push("/grow-your-resume/login");
                return;
            }
            const user = rawUser as UserWithRoles;

            if (!editData.name?.trim()) {
                toast.error("Name is required.");
                return;
            } else if (!editData.rollNumber?.trim()) {
                toast.error("Roll Number is required.");
                return;
            } else if (!editData.cpi?.toString().trim()) {
                toast.error("CPI is required.");
                return;
            } else if (!editData.resumeLink?.trim()) {
                toast.error("Resume URL is required.");
                return;
            }

            const rawYear = editData.year || "1";
            const yearNum = parseInt(rawYear.replace(/\D/g, ""), 10) || 1;

            const data = {
                userId: user.id,
                name: editData.name.trim(),
                rollNo: editData.rollNumber.trim(),
                branch: editData.branch || "Architecture, Planning and Design",
                cpi: Number.parseFloat(editData.cpi) || 0,
                courseType: editData.courseType || "B.Tech",
                year: yearNum,
                linkedinUrl: ensureAbsoluteUrl(editData.linkedinLink),
                githubUrl: ensureAbsoluteUrl(editData.githubLink),
                resumeUrl: ensureAbsoluteUrl(editData.resumeLink),
            };

            // Check if student already exists in database
            const existingStudentRes = await studentsAPI.getProfile(user.id, user.email);
            const existingStudent = existingStudentRes?.data || existingStudentRes;

            let savedRes;
            if (existingStudent && (existingStudent.id || existingStudent.rollNo)) {
                savedRes = await studentsAPI.updateProfile(user.id, data);
            } else {
                savedRes = await studentsAPI.registerProfile(data);
            }

            if (savedRes && savedRes.success === false) {
                throw new Error(savedRes.error || "Failed to save profile");
            }

            const updatedRoles = Array.from(new Set([...(user.roles || []), "STUDENT"]));
            if (session?.user) {
                await update({
                    user: {
                        ...session.user,
                        roles: updatedRoles,
                    },
                });
            }
            await getSession();

            await loadProfile();
            setIsEditing(false);
            toast.success("Profile saved successfully!");
        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast.error("Failed to save profile. Please check your information and try again.");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData({ ...profileData });
    };

    const handleLogout = () => {
        signOut({ callbackUrl: "/grow-your-resume" });
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
                <title>My Profile - IIT BHU Grow Your Resume</title>
                <meta name="description" content="Student profile and information" />
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
                                <span className="text-sm">Welcome, {profileData.name}</span>
                                <Link href="/grow-your-resume/student/opportunities" className="px-4 py-2 text-black hover:bg-[#f56a38] hover:text-white rounded transition-colors">
                                    Opportunities
                                </Link>
                                <Link href="/grow-your-resume/student/profile" className="px-4 py-2 bg-white text-black rounded font-medium hover:bg-gray-100 transition-colors">
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
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        {/* Page Header */}
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>
                            {!isEditing && (
                                <button onClick={() => setIsEditing(true)} className="flex items-center px-6 py-3 bg-[#f56a38] text-white rounded-lg hover:bg-[#e55a32] focus:outline-none focus:ring-2 focus:ring-[#f56a38] focus:ring-offset-2 transition-colors">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        {/* Profile Form */}
                        <div className="bg-white border border-gray-200 rounded-lg p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Student Information</h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                                    {isEditing ? (
                                        <input type="text" value={editData.name} onChange={(e) => handleInputChange("name", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent" />
                                    ) : (
                                        <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">{profileData.name}</div>
                                    )}
                                </div>

                                {/* Roll Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Roll Number *</label>
                                    {isEditing ? (
                                        <input type="text" value={editData.rollNumber} onChange={(e) => handleInputChange("rollNumber", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent" />
                                    ) : (
                                        <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">{profileData.rollNumber}</div>
                                    )}
                                </div>

                                {/* Email ID */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email ID *</label>
                                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">{profileData.emailId}</div>
                                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                </div>

                                {/* CPI */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">CPI *</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editData.cpi}
                                            onChange={(e) => handleInputChange("cpi", e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                                            placeholder="9.2"
                                        />
                                    ) : (
                                        <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">{profileData.cpi}</div>
                                    )}
                                </div>

                                {/* Branch */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Branch *</label>
                                    {isEditing ? (
                                        <select value={editData.branch} onChange={(e) => handleInputChange("branch", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent">
                                            <option value="Architecture, Planning and Design">Architecture, Planning and Design</option>
                                            <option value="Biomedical Engineering">Biomedical Engineering</option>
                                            <option value="Ceramic Engineering">Ceramic Engineering</option>
                                            <option value="Chemical Engineering">Chemical Engineering</option>
                                            <option value="Civil Engineering">Civil Engineering</option>
                                            <option value="Computer Science and Engineering">Computer Science and Engineering</option>
                                            <option value="Electrical Engineering">Electrical Engineering</option>
                                            <option value="Electronics Engineering">Electronics Engineering</option>
                                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                                            <option value="Metallurgical Engineering">Metallurgical Engineering</option>
                                            <option value="Mining Engineering">Mining Engineering</option>
                                            <option value="Pharmaceutical Engineering and Technology">Pharmaceutical Engineering and Technology</option>
                                            <option value="Biochemical Engineering">Biochemical Engineering</option>
                                            <option value="Industrial Chemistry">Industrial Chemistry</option>
                                            <option value="Mathematical Sciences">Mathematical Sciences</option>
                                            <option value="Engineering Physics">Engineering Physics</option>
                                            <option value="Chemistry">Chemistry</option>
                                            <option value="Material Science and Technology">Material Science and Technology</option>
                                        </select>
                                    ) : (
                                        <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">{profileData.branch}</div>
                                    )}
                                </div>

                                {/* Year */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                                    {isEditing ? (
                                        <select value={editData.year} onChange={(e) => handleInputChange("year", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent">
                                            <option value="1st Year">1st Year</option>
                                            <option value="2nd Year">2nd Year</option>
                                            <option value="3rd Year">3rd Year</option>
                                            <option value="4th Year">4th Year</option>
                                            <option value="5th Year">5th Year</option>
                                        </select>
                                    ) : (
                                        <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">{profileData.year}</div>
                                    )}
                                </div>

                                {/* Course Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Type *</label>
                                    {isEditing ? (
                                        <select value={editData.courseType} onChange={(e) => handleInputChange("courseType", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent">
                                            <option value="B.Tech">B.Tech</option>
                                            <option value="B.Arch">B.Arch</option>
                                            <option value="IDD">IDD</option>
                                            <option value="M.Tech">M.Tech</option>
                                            <option value="PhD">PhD</option>
                                        </select>
                                    ) : (
                                        <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">{profileData.courseType}</div>
                                    )}
                                </div>
                            </div>

                            {/* Links Section */}
                            <div className="mt-8">
                                <h4 className="text-lg font-semibold text-gray-900 mb-4">Links</h4>
                                <div className="grid md:grid-cols-1 gap-6">
                                    {/* LinkedIn Link */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                                        {isEditing ? (
                                            <input
                                                type="url"
                                                value={editData.linkedinLink}
                                                onChange={(e) => handleInputChange("linkedinLink", e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                                                placeholder="https://linkedin.com/in/your-profile"
                                            />
                                        ) : (
                                            <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                                                {profileData.linkedinLink ? (
                                                    <a href={ensureAbsoluteUrl(profileData.linkedinLink)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                                        {isEditing ? (
                                            <input
                                                type="url"
                                                value={editData.githubLink}
                                                onChange={(e) => handleInputChange("githubLink", e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                                                placeholder="https://github.com/your-username"
                                            />
                                        ) : (
                                            <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                                                {profileData.githubLink ? (
                                                    <a href={ensureAbsoluteUrl(profileData.githubLink)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
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
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Resume Link *</label>
                                        {isEditing ? (
                                            <input
                                                type="url"
                                                value={editData.resumeLink}
                                                onChange={(e) => handleInputChange("resumeLink", e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                                                placeholder="https://drive.google.com/file/d/your-resume"
                                            />
                                        ) : (
                                            <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                                                {profileData.resumeLink ? (
                                                    <a href={ensureAbsoluteUrl(profileData.resumeLink)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                                        View Resume
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-500">Not provided</span>
                                                )}
                                            </div>
                                        )}
                                        <p className="text-sm text-gray-500 mt-1">Link to your resume (Google Drive, Dropbox, etc.)</p>
                                        <p className="text-sm text-red-500 font-medium mt-2">
                                            Note: Please ensure your Drive link access is set to &apos;Anyone with the link can view&apos;. Startups will reject your application if they cannot open your resume.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {isEditing && (
                                <div className="mt-8 flex justify-end space-x-4">
                                    <button onClick={handleCancel} className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                        <X className="w-4 h-4 mr-2" />
                                        Cancel
                                    </button>
                                    <button onClick={handleSave} className="flex items-center px-6 py-3 bg-[#f56a38] text-white rounded-lg hover:bg-[#e55a32] focus:outline-none focus:ring-2 focus:ring-[#f56a38] focus:ring-offset-2 transition-colors">
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

        let initialProfile = session.user?.roleData?.student || null;
        if (!initialProfile || !initialProfile.rollNo) {
            try {
                initialProfile = await serverAPI.getStudentProfile(session.user.id, session.jwtToken, session.user.email);
            } catch (e) {}
        }

        return {
            props: {
                initialProfile: initialProfile ? JSON.parse(JSON.stringify(initialProfile)) : null,
                user: session.user ? JSON.parse(JSON.stringify(session.user)) : null,
            },
        };
    } catch (error) {
        console.error("Error in student profile getServerSideProps:", error);
        return {
            redirect: {
                destination: "/grow-your-resume/login?role=student",
                permanent: false,
            },
        };
    }
}
