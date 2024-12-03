import Leaderboard from "@/components/CampusAmbassador/Leaderboard";
import Profile from "@/components/CampusAmbassador/Profile";
import TaskList from "@/components/CampusAmbassador/Tasks";
import Nav from "@/components/navbar/NavLayout";
import { updateLeaderboard, updateLoading, updateUser } from "@/lib/redux/slices/campusAmbassadorSlice";
import { Loader } from "lucide-react";
import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CampusAmbassador() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.campusAmbassador.loading);
    const leaderboard = useSelector(state => state.campusAmbassador.leaderboard);
    const leaderboardRef = useRef(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/campusambassador');
                const data = await response.json();
                dispatch(updateUser(data.currentUser));
                dispatch(updateLeaderboard(data.topUsers));
                dispatch(updateLoading(false));
            } catch (error) {
                console.error("Error fetching data:", error);
                dispatch(updateLoading(false));
            }
        };

        fetchData();
    }, []);

    const scrollToLeaderboard = () => {
        leaderboardRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <Head>
                <title>Startup Junction</title>
                <meta name="robots" content="index, follow" />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <div>
                <Nav />
                <div className="flex px-4 mb-4 flex-col gap-6">
                    <h1 className="text-3xl font-bold text-center my-4">Campus Ambassador Dashboard E-Cell IIT BHU</h1>
                    {loading ? (
                        <Loader className="block mt-12 mx-auto w-16 h-16" />
                    ) : (
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-12 w-fit mx-auto py-2 px-4 rounded-sm border border-green md:flex justify-center items-center gap-4">
                                <p className="md:text-xl max-md:text-lg pt-3">
                                    <span className="text-orange-400">{leaderboard[0].name}</span> from {"IIT BHU"} is
                                    leading the points table with <span className="text-green-600">{leaderboard[0].points}</span>{" "}
                                    points!
                                </p>
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
