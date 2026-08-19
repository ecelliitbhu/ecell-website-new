"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { recruitersAPI } from "../../../lib/api";
import { toast } from "react-hot-toast";
import { NavLogo } from "../../../components/navbar/NavLogo";
import { Eye, EyeOff } from "lucide-react";

export default function AdminVerificationPanel() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [pendingRecruiters, setPendingRecruiters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Debugging to see what env values actually are
        console.log("Expected Username:", process.env.NEXT_PUBLIC_ADMIN_USERNAME);
        console.log("Expected Password:", process.env.NEXT_PUBLIC_ADMIN_PASSWORD);
        console.log("Typed Username:", username);
        console.log("Typed Password:", password);

        // Strip quotes if they were accidentally preserved
        const expectedUser = process.env.NEXT_PUBLIC_ADMIN_USERNAME?.replace(/"/g, '');
        const expectedPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD?.replace(/"/g, '');

        if (username === expectedUser && password === expectedPass) {
            setIsAuthenticated(true);
            fetchPending();
        } else {
            toast.error("Invalid credentials");
        }
    };

    const fetchPending = async () => {
        setLoading(true);
        try {
            const data = await recruitersAPI.getPending();
            // The API might return an array or an object wrapping an array
            setPendingRecruiters(Array.isArray(data) ? data : data.data || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch pending recruiters");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            await recruitersAPI.verify(id);
            toast.success("Recruiter approved successfully!");
            setPendingRecruiters(prev => prev.filter(r => r.id !== id));
        } catch (error) {
            console.error(error);
            toast.error("Failed to approve recruiter");
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername("");
        setPassword("");
        setShowPassword(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" style={{ fontFamily: "Poppins, sans-serif" }}>
                <Head>
                    <title>Admin Login - IIT BHU GYR</title>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                    <style>{`font-family:'Poppins',sans-serif;`}</style>
                </Head>
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex justify-center">
                        <NavLogo />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <div className="mt-1">
                                    <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#f56a38] focus:border-[#f56a38] sm:text-sm" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <input type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#f56a38] focus:border-[#f56a38] sm:text-sm pr-10" />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#f56a38] hover:bg-[#e55a32] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f56a38]">
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Admin Panel - IIT BHU GYR</title>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
                <style>{`font-family:'Poppins',sans-serif;`}</style>
            </Head>

            <div className="min-h-screen bg-gray-50 text-gray-900" style={{ fontFamily: "Poppins, sans-serif" }}>
                <div className="bg-white shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                            <div className="flex items-center">
                                <NavLogo />
                                <h1 className="text-xl font-bold ml-4">GYR Admin Panel</h1>
                            </div>
                            <button onClick={handleLogout} className="px-4 py-2 text-black hover:bg-gray-100 rounded transition-colors">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8 flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Pending Recruiters</h2>
                        <button onClick={fetchPending} className="px-4 py-2 bg-[#f56a38] text-white rounded hover:bg-[#e55a32] transition-colors">
                            Refresh
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-12 text-gray-500">Loading recruiters...</div>
                    ) : pendingRecruiters.length === 0 ? (
                        <div className="bg-white p-8 rounded-lg shadow text-center text-gray-500">
                            No pending recruiters to verify.
                        </div>
                    ) : (
                        <div className="bg-white shadow overflow-hidden sm:rounded-md">
                            <ul className="divide-y divide-gray-200">
                                {pendingRecruiters.map((recruiter: any) => (
                                    <li key={recruiter.id}>
                                        <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-medium text-[#f56a38] truncate">{recruiter.companyName || "Unknown Company"}</h3>
                                                <div className="mt-2 flex flex-col sm:flex-row sm:space-x-6 text-sm text-gray-500">
                                                    <div className="flex items-center mt-2 sm:mt-0">
                                                        <span className="font-medium mr-2">Email:</span>
                                                        {recruiter.user?.email || recruiter.email || "N/A"}
                                                    </div>
                                                    <div className="flex items-center mt-2 sm:mt-0">
                                                        <span className="font-medium mr-2">Website:</span>
                                                        {recruiter.websiteUrl ? (
                                                            <a href={recruiter.websiteUrl} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                                                                {recruiter.websiteUrl}
                                                            </a>
                                                        ) : (
                                                            "N/A"
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <button onClick={() => handleApprove(recruiter.id)} className="px-4 py-2 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                                    Approve
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
