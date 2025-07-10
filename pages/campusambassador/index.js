import Leaderboard from "@/components/CampusAmbassador/Leaderboard";
import Profile from "@/components/CampusAmbassador/Profile";
import TaskList from "@/components/CampusAmbassador/Tasks";
import Nav from "@/components/navbar/NavLayout";
import { addTask, updateLeaderboard, updateLeaderboardLoading, updateTask, updateTaskLoading, updateUser, updateUserLoading } from "@/lib/redux/slices/campusAmbassadorSlice";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CampusAmbassador() {
    const {taskLoading,leaderboardLoading,userLoading}= useSelector(state => state.campusAmbassador)
    const session=useSession()
    const dispatch=useDispatch()
    const {leaderboard}=useSelector(state=>state.campusAmbassador)
    const leaderboardRef=useRef(null)
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(
                  `${BACKEND_URL}/ambassador/user?email=` +
                    session?.data?.user?.email
                );
                const data = await response.json();
                // console.log(data);
                // console.log(data.id)
                dispatch(updateUser(data));
                dispatch(updateUserLoading(false));
                return data.id;
            } catch (error) {
                console.error("Error fetching user data:", error);
                dispatch(updateUserLoading(false));
                return false;
            }
        };

        const fetchTasks = async (userId) => {
            try {
                // console.log(userId)
                const response = await fetch(`${BACKEND_URL}/ambassador/tasks?userId=`+userId);
                const data = await response.json();
                dispatch(addTask(data));
                dispatch(updateTaskLoading(false));
            } catch (error) {
                console.error("Error fetching tasks:", error);
                dispatch(updateTaskLoading(false));
            }
        };

        const fetchLeaderboard = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/ambassador/getLeaderboard`);
                const data = await response.json();
                dispatch(updateLeaderboard(data));
                dispatch(updateLeaderboardLoading(false));
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
                dispatch(updateLeaderboardLoading(false));
            }
        };

        const fetchAllData = async () => {
            if (session.status === "authenticated") {
                const userSuccess = await fetchUser();
                if (userSuccess) {
                    await fetchTasks(userSuccess);
                    await fetchLeaderboard();
                }
            }
        };

        fetchAllData();
    }, [session.status]);
    const scrollToLeaderboard = () => {
        leaderboardRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <Head>
                <title>Campus Ambassador</title>
                <meta name="robots" content="index, follow" />
                <link rel="shortcut icon" href="https://ik.imagekit.io/ecelliitbhu/website/favicon.ico" />
            </Head>
            <div>
                <Nav />
                <div className="flex px-4 mb-4 flex-col gap-6">
                    <h1 className="text-3xl font-bold text-center my-4">Campus Ambassador Dashboard E-Cell IIT BHU</h1>
                    {(taskLoading||userLoading||leaderboardLoading) ?
                        <Loader rotate="rotate" className="block mt-12 animate-spin mx-auto w-16 h-16" />
                        : (
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 w-fit mx-auto py-2 px-4 rounded-sm border border-green md:flex justify-center items-center gap-4">
                                {leaderboard && <p className="md:text-xl max-md:text-lg pt-3">
                                    <span className="text-orange-400">{leaderboard[0]?.name}</span> from {leaderboard[0]?.collegeName} is
                                    leading the points table with <span className="text-green-600">{leaderboard[0]?.points}</span>{" "}
                                    points!
                                </p>}
                                <div className="flex justify-end"><button
                                    onClick={scrollToLeaderboard}
                                     className="btn btn-outline-primary px-4 py-2  "
                                >
                                    View
                                </button></div>
                            </div>
                             <Profile className={"md:col-span-4 max-md:col-span-12"} />
                            <TaskList className={"md:col-span-8 max-md:col-span-12 h-[434px] overflow-y-auto"} />
                           
                            <Leaderboard ref={leaderboardRef} className="col-span-12" /> 
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
