"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { LogOut, Save, Edit, X } from "lucide-react";
import { NavLogo } from "../../../components/navbar/NavLogo";
import { useRouter } from "next/router";
import { recruitersAPI } from "../../../lib/api";
import { getRecruiterId, getStoredUser } from "../../../lib/auth";
import { toast } from "react-hot-toast";
import { UserWithRoles } from "../../../lib/types";
import { getSession, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({
        companyName: "",
        emailId: "",
        address: "",
        websiteUrl: "",
        phoneNumber: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ ...profileData });
    const [isLoading, setIsLoading] = useState(true);
    const { data: session, update } = useSession();

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
            const rawUser = await getStoredUser();
            if (!rawUser) {
                toast.error("Login to access");
                router.push("/grow-your-resume/login");
                return;
            }
            const user = rawUser as UserWithRoles;
            const roles = user.roles || [];

            if (roles.includes("RECRUITER")) {
                const recruiter = await recruitersAPI.getProfile(user.id);
                const profileData = {
                    companyName: recruiter.companyName,
                    emailId: recruiter.user.email,
                    address: recruiter.address || "",
                    websiteUrl: recruiter.websiteUrl || "",
                    phoneNumber: recruiter.phoneNumber||"",
                };
                setProfileData(profileData);
                setEditData(profileData);
            } else {
                const rawUser = await getStoredUser();
                if (!rawUser) {
                    toast.error("Login to access");
                    router.push("/grow-your-resume/login");
                    return;
                }
                const user = rawUser as UserWithRoles;
                const response = await fetch(`${BACKEND_URL}/users/getid/${user.id}`);
                const defaultUser = await response.json();
                const profileData = {
                    companyName: "",
                    emailId: defaultUser.email,
                    address: "",
                    websiteUrl: "",
                    phoneNumber: "",
                };
                setProfileData(profileData);
                setEditData(profileData);
            }
        } catch (error) {
            console.error("Error loading profile:", error);
            toast.error("Failed to load profile");
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
            const recruiterId = await getRecruiterId();
            if (!recruiterId) {
                toast.error("Please log in to update profile");
                return;
            }
            if (!editData.companyName) {
                toast.error("Company Name is required.");
                return;
            } else if (!editData.websiteUrl) {
                toast.error("Website Url is required.");
                return;
            } else if (!editData.phoneNumber){
                toast.error("Phone Number is required.");
                return;
            }
            // Phone number validation (digits only)
            if (editData.phoneNumber) {
                const digitsOnly = editData.phoneNumber.replace(/\D/g, "");
                if (digitsOnly.length < 10) {
                    toast.error("Phone number must be at least 10 digits.");
                    return;
                }
            }
            const data = {
                userId: recruiterId,
                companyName: editData.companyName || "",
                address: editData.address || "",
                websiteUrl: editData.websiteUrl || "",
                phoneNumber: editData.phoneNumber || "",
            };

            const rawUser = await getStoredUser();
            if (!rawUser) {
                router.push("/grow-your-resume/login");
                return;
            }
            const user = rawUser as UserWithRoles;
            const roles = user.roles;
            if (!roles?.includes("RECRUITER")) {
                try {
                    const res = await fetch(`${BACKEND_URL}/recruiters/register`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    });

                    if (!res.ok) {
                        const error = await res.json();
                        console.error("Failed to create recruiter:", error);
                        // Handle error UI or rethrow if needed
                        throw new Error(error.message || "Failed to create recruiter");
                    }
                    const updatedRoles = Array.from(new Set([...(roles || []), "RECRUITER"]));

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
            } else {
                await recruitersAPI.updateProfile(recruiterId, {
                    companyName: editData.companyName || "",
                    address: editData.address || "",
                    websiteUrl: editData.websiteUrl || "",
                    phoneNumber: editData.phoneNumber || "",
                });
            }
            await loadProfile();
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
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
