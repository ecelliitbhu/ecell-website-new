import React from "react";

const SkeletonCard: React.FC = () => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4 animate-pulse">
            {/* Header: Logo, Title, Company */}
            <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-4">
                    {/* Logo skeleton */}
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div>
                        {/* Title skeleton */}
                        <div className="h-5 bg-gray-200 rounded w-48 mb-2"></div>
                        {/* Company skeleton */}
                        <div className="flex items-center gap-2 mt-1">
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </div>
                    </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                    {/* Time skeleton */}
                    <div className="h-3 bg-gray-200 rounded w-24 mt-2"></div>
                </div>
            </div>

            {/* Meta Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>

            {/* Skills */}
            <div>
                <div className="flex flex-wrap gap-2">
                    <div className="h-6 bg-gray-200 rounded-md w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-md w-20"></div>
                    <div className="h-6 bg-gray-200 rounded-md w-12"></div>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2 mt-1">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-[95%]"></div>
                <div className="h-3 bg-gray-200 rounded w-[80%]"></div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex justify-end">
                <div className="h-9 bg-gray-200 rounded-lg w-28"></div>
            </div>
        </div>
    );
};

export default SkeletonCard;
