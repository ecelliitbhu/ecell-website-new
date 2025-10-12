import React, { forwardRef } from "react";
import cn from "classnames";
import { updateLeaderboard, updateLeaderboardLoading } from "@/lib/redux/slices/campusAmbassadorSlice";
import { useSelector } from "react-redux";

const Leaderboard = forwardRef(({ className = "leaderboard" }, ref) => {
  const leaderboard=useSelector(state=>state.campusAmbassador.leaderboard)
// console.log(leaderboard)
  return (
    <div ref={ref} className={cn("leaderboard-container", className)}>
      <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl p-8">
        <div className="mb-6 pb-4 border-b border-orange-200">
          <h2 className="text-3xl font-bold text-gray-900">Leaderboard</h2>
          <p className="text-sm text-gray-500 mt-1">Top performing campus ambassadors</p>
        </div>
        <div className="hidden sm:grid sm:grid-cols-4 font-semibold text-gray-700 bg-gradient-to-r from-[#FF8C42]/10 to-[#FF7A2E]/10 px-4 py-3 rounded-lg mb-2 text-center border border-[#FF8C42]/20">
          <div className="text-lg uppercase tracking-wide">Rank</div>
          <div className="text-lg uppercase tracking-wide">Name</div>
          <div className="text-lg uppercase tracking-wide">Points</div>
          <div className="text-lg uppercase tracking-wide">College</div>
        </div>
        <div className="space-y-2">
          {leaderboard
            .map((leader, index) => (
              <div
                key={index}
                className={cn(
                  "sm:grid sm:grid-cols-4 bg-gray-50 hover:bg-gray-100 px-4 py-4 rounded-lg text-center transition-all duration-200 border border-gray-100",
                  "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0",
                  index === 0 && "bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200 hover:bg-gradient-to-r hover:from-amber-100 hover:to-yellow-100",
                  index === 1 && "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200",
                  index === 2 && "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200"
                )}
              >
                <div className="sm:col-span-1 flex items-center justify-center gap-2">
                  <span className="font-bold sm:hidden text-gray-600">Rank: </span>
                  <span className={cn(
                    " text-lg",
                    index === 0 && "text-amber-600",
                    index === 1 && "text-gray-600",
                    index === 2 && "text-orange-600",
                    index > 2 && "text-gray-700"
                  )}>
                    {index === 0 && "🥇 "}
                    {index === 1 && "🥈 "}
                    {index === 2 && "🥉 "}
                    {index > 2 && `${index + 1}`}
                  </span>
                </div>
                <div className="sm:col-span-1">
                  <span className="font-bold sm:hidden text-gray-600">Name: </span>
                  <span className=" text-gray-900">{leader?.name}</span>
                </div>
                <div className="sm:col-span-1">
                  <span className="font-bold sm:hidden text-gray-600">Points: </span>
                   <span className="text-[#FF8C42] font-bold text-lg">
                    {leader?.points}
                  </span>
                </div>
                <div className="sm:col-span-1">
                  <span className="font-bold sm:hidden text-gray-600">College: </span>
                  <span className="text-gray-700">{leader?.collegeName}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
});

Leaderboard.displayName = 'Leaderboard';
export default Leaderboard;