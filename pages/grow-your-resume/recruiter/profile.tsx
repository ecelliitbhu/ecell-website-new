import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { LogOut, Save, Edit, X } from "lucide-react";
import { NavLogo } from "../../../components/navbar/NavLogo";
import { useRouter } from "next/router";
import { recruitersAPI } from "../../../lib/api";
import { getStoredUser } from "../../../lib/auth";
import { toast } from "react-hot-toast";
import { UserWithRoles } from "../../../lib/types";
import { useSession, signOut, getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import { serverAPI } from "../../../lib/server-api";

interface ProfilePageProps {
    initialProfile?: any;
    user?: UserWithRoles;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ initialProfile, user: ssrUser }) => {
    const hasInitialData = !!(initialProfile && (initialProfile.companyName || initialProfile.id));
    const initial = hasInitialData ? {
        companyName: initialProfile.companyName || "",
        emailId: initialProfile.user?.email || ssrUser?.email || "",
        address: initialProfile.address || "",
        websiteUrl: initialProfile.websiteUrl || "",
        phoneNumber: initialProfile.phoneNumber || "",
    } : {
        companyName: "",
        emailId: ssrUser?.email || "",
        address: "",
        websiteUrl: "",
        phoneNumber: "",
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
            if (edit === "true" || (!initial.companyName && !initial.websiteUrl)) {
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
                toast.error("Login to access");
                router.push("/grow-your-resume/login");
                return;
            }
            const user = rawUser as UserWithRoles;

            // Try to fetch recruiter profile directly
            const recruiterRes = await recruitersAPI.getProfile(user.id);
            const recruiter = recruiterRes?.data || recruiterRes;

            if (recruiter && (recruiter.companyName || recruiter.id)) {
                const fetchedData = {
                    companyName: recruiter.companyName || "",
                    emailId: recruiter.user?.email || user.email || "",
                    address: recruiter.address || "",
                    websiteUrl: recruiter.websiteUrl || "",
                    phoneNumber: recruiter.phoneNumber || "",
                };
                setProfileData(fetchedData);
                setEditData(fetchedData);
                if (edit === "true" || (!recruiter.companyName && !recruiter.websiteUrl)) {
                    setIsEditing(true);
                } else {
                    setIsEditing(false);
                }
            } else {
                // New recruiter with no record yet: set fallback email and open edit mode
                const fallbackData = {
                    companyName: "",
                    emailId: user.email || "",
                    address: "",
                    websiteUrl: "",
                    phoneNumber: "",
                };
                setProfileData(fallbackData);
                setEditData(fallbackData);
                setIsEditing(true);
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        } finally {
            setIsLoading(false);
        }
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

            if (!editData.companyName?.trim()) {
                toast.error("Company Name is required.");
                return;
            }
            if (!editData.phoneNumber?.trim()) {
                toast.error("Phone Number is required.");
                return;
            }

            const payload = {
                userId: user.id,
                companyName: editData.companyName,
                address: editData.address || "",
                websiteUrl: editData.websiteUrl || "",
                phoneNumber: editData.phoneNumber,
            };

            // 1. Check if recruiter record exists
            const existingProfileRes = await recruitersAPI.getProfile(user.id);
            const existing = existingProfileRes?.data || existingProfileRes;

            let savedProfile = existing;
            if (existing && (existing.id || existing.companyName)) {
                // Update existing recruiter
                const updated = await recruitersAPI.updateProfile(user.id, payload);
                if (!updated) {
                    toast.error("Failed to update profile");
                    return;
                }
                savedProfile = { ...existing, ...(updated?.data || updated) };
            } else {
                // Register new recruiter via api.js
                savedProfile = await recruitersAPI.registerProfile(payload);
                if (!savedProfile || savedProfile.success === false) {
                    throw new Error(savedProfile?.error || "Failed to register recruiter");
                }
            }

            // 2. Update NextAuth session roles
            const updatedRoles = Array.from(new Set([...(user.roles || []), "RECRUITER"]));
            if (session?.user) {
                await update({
                    user: {
                        ...session.user,
                        roles: updatedRoles,
                    },
                });
            }
            await getSession();

            // 3. Update local UI state
            const updatedProfile = {
                ...editData,
                emailId: editData.emailId || user.email || "",
            };
            setProfileData(updatedProfile);
            setEditData(updatedProfile);
            setIsEditing(false);

            toast.success("Profile saved successfully!");

            // Unverified recruiters must wait for admin approval before entering
            // the dashboard.
            router.push(
                savedProfile?.verified
                    ? "/grow-your-resume/recruiter/dashboard"
                    : "/grow-your-resume/recruiter/verification-pending"
            );
        } catch (error: any) {
            console.error("Error saving profile:", error);
            toast.error(error.response?.data?.message || error.message || "Failed to save profile");
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
                <meta name="description" content="Recruiter profile and information" />
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
                                <span className="text-sm">Welcome, {profileData?.companyName || "Recruiter"}</span>
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
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Recruiter Information</h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Company Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                                    {isEditing ? (
                                        <input type="text" value={editData.companyName} onChange={(e) => handleInputChange("companyName", e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent" />
                                    ) : (
                                        <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">{profileData.companyName}</div>
                                    )}
                                </div>

                                {/* Email ID */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email ID *</label>
                                    <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900">{profileData.emailId}</div>
                                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="grid md:grid-cols-1 gap-6">
                                    {/* Address */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editData.address}
                                                onChange={(e) => handleInputChange("address", e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                                                placeholder="Bangalore"
                                            />
                                        ) : (
                                            <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">{profileData.address}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <div className="grid md:grid-cols-2 gap-6">

                                        {/* Website URL */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Website Link</label>
                                            {isEditing ? (
                                                <input
                                                    type="url"
                                                    value={editData.websiteUrl}
                                                    onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
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

                                        {/* Phone Number */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    value={editData.phoneNumber}
                                                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f56a38] focus:border-transparent"
                                                    placeholder="1234567890"
                                                />
                                            ) : (
                                                <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                                                    {profileData.phoneNumber ? (
                                                        <a
                                                            href={`tel:${profileData.phoneNumber}`}
                                                            className="text-blue-600 hover:text-blue-800"
                                                        >
                                                            {profileData.phoneNumber}
                                                        </a>
                                                    ) : (
                                                        <span className="text-gray-500">Not provided</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>

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
                    destination: "/grow-your-resume/login?role=recruiter",
                    permanent: false,
                },
            };
        }

        // Data is fetched client-side for instant page load
        return {
            props: {
                initialProfile: null,
                user: session.user,
            },
        };
    } catch (error) {
        console.error("Error in recruiter profile getServerSideProps:", error);
        return {
            redirect: {
                destination: "/grow-your-resume/login?role=recruiter",
                permanent: false,
            },
        };
    }
}
