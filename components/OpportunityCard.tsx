import React from "react";
import dynamic from "next/dynamic";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Clock, Banknote, Briefcase, ExternalLink, CheckCircle } from "lucide-react";
import { JobType } from "../lib/types";

const ReactMarkdown = dynamic(() => import("react-markdown"), { ssr: false, loading: () => <span /> });

export interface OpportunityCardProps {
    opportunity: {
        id: string;
        title?: string;
        company?: string;
        location?: string;
        type?: JobType | string;
        qualification?: string;
        experience?: string;
        stipend?: string;
        skills?: string[];
        description?: string;
        applied: boolean;
        postedDate: string | Date;
        appliedAt?: string | Date;
        status?: string;
        isVerified?: boolean;
        websiteUrl?: string;
    };
    onApply?: (id: string) => void;
    onWithdraw?: (id: string) => void;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ opportunity, onApply, onWithdraw }) => {
    const {
        id, title, company, location, type, qualification,
        experience, stipend, skills, description, applied,
        postedDate, appliedAt, status, isVerified, websiteUrl
    } = opportunity;

    const logoUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(company || "Company")}&background=f8f9fa&color=f56a38&size=64`;
    const relativeTime = postedDate ? formatDistanceToNow(new Date(postedDate), { addSuffix: true }) : "";

    const getStatusBadge = (statusStr?: string) => {
        if (!statusStr) return null;
        const normalized = statusStr.toLowerCase();
        let color = "bg-yellow-100 text-yellow-800";
        if (normalized === "accepted") color = "bg-green-100 text-green-800";
        if (normalized === "rejected") color = "bg-red-100 text-red-800";
        
        return (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wide ${color}`}>
                {statusStr}
            </span>
        );
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 flex flex-col gap-4">
            {/* Header: Logo, Title, Company */}
            <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-4">
                    <img src={logoUrl} alt={`${company} logo`} className="w-16 h-16 rounded-lg border border-gray-100 object-cover" />
                    <div>
                        <h3 className="text-[16px] font-semibold text-gray-900 leading-snug">{title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            {websiteUrl ? (
                                <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[14px] text-gray-600 font-medium hover:text-blue-600 transition-colors">
                                    {company} <ExternalLink className="w-3 h-3" />
                                </a>
                            ) : (
                                <span className="text-[14px] text-gray-600 font-medium">{company}</span>
                            )}
                            {isVerified && (
                                <span title="Verified by E-Cell IIT BHU" className="flex items-center text-blue-600">
                                    <CheckCircle className="w-4 h-4" />
                                </span>
                            )}
                            {applied && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800 uppercase tracking-wide">
                                    Applied
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                    {applied ? getStatusBadge(status) : null}
                    <span className="text-[12px] font-medium text-gray-500">
                        {applied ? `Applied ${appliedAt ? formatDistanceToNow(new Date(appliedAt), { addSuffix: true }) : ""}` : `Posted ${relativeTime}`}
                    </span>
                </div>
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-100">
                <div className="flex items-center gap-2 text-[14px] text-gray-600">
                    <Banknote className="w-4 h-4 text-gray-400" />
                    <span>{stipend || "Unpaid"}</span>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{location || "Remote"}</span>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{experience || "Fresher"}</span>
                </div>
                <div className="flex items-center gap-2 text-[14px] text-gray-600">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span>{type || "Internship"}</span>
                </div>
            </div>

            {/* Skills */}
            {skills && skills.length > 0 && (
                <div>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span key={index} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-[12px] font-medium rounded-md">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Description */}
            <div className="text-[14px] text-gray-600 prose prose-sm max-w-none line-clamp-3">
                <ReactMarkdown>{description || ""}</ReactMarkdown>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex justify-end">
                {applied ? (
                    status?.toLowerCase() !== "rejected" && onWithdraw ? (
                        <button
                            onClick={() => onWithdraw(id)}
                            className="px-4 py-2 text-[14px] font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            Withdraw
                        </button>
                    ) : null
                ) : (
                    onApply ? (
                        <button
                            onClick={() => onApply(id)}
                            className="px-6 py-2 bg-[#f56a38] text-white text-[14px] font-medium rounded-lg hover:bg-[#e55a32] focus:outline-none focus:ring-2 focus:ring-[#f56a38] focus:ring-offset-2 transition-colors flex items-center gap-2"
                        >
                            Apply Now
                        </button>
                    ) : null
                )}
            </div>
        </div>
    );
};

export default OpportunityCard;
