import Leaderboard from "@/components/campus ambassador/Leaderboard";
import Nav from "@/components/navbar/NavLayout";
import Head from "next/head";
import React, { useState ,useEffect} from "react"
import { useForm } from "react-hook-form";
import { FaEdit, FaPlus } from "react-icons/fa"; 


const mockUserData = {
    name: "John Doe",
    collegeName: "IIT BHU",
    collegeYear: "2024",
    phone: "123-456-7890",
    points: 1200,
    tasks: [
        { id: 1, title: "Get the startupjunction form filled by at least 10 people", completed: true, lastDate: "2024-10-10" },
        { id: 2, title: "Task 2", completed: false, lastDate: "2024-10-05" },
        { id: 3, title: "Task 3", completed: false, lastDate: "2024-10-08" },
    ],
};



export default function CampusAmbassador() {
    const [user, setUser] = useState(mockUserData); 
    const [editing, setEditing] = useState(false);
   

    const { register, handleSubmit, reset } = useForm({
        defaultValues: mockUserData,
    }
    ); 

    // Fetch user data and leaderboard
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/campusambassador'); 
                const data = await response.json();

                setUser(data.currentUser); 
                setLeaderboard(data.topUsers); 
                reset(data.currentUser); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [reset]); 

    const onSubmit = async (data) => {
        try {
            // sending the updated user data 
            const response = await fetch('/campusambassador/updateUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: user.id, ...data }), 
            });
            const updatedUser = await response.json();
            setUser(updatedUser); 
            reset(updatedUser); 
            setEditing(false);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const currentDate = new Date();

   

    return (
        <>
            <Head>
                <title>Startup Junction</title>
                <meta name="robots" content="index, follow" />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <div>
                <Nav />

                <div className="flex px-4 mb-6 flex-col gap-6">
                    <h1 className="text-3xl font-bold text-center p-6">Campus Ambassador Dashboard E-Cell IIT BHU</h1>
                    <div className="shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
                        {editing ? (
                            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    className="border p-2 rounded"
                                    placeholder="Name"
                                    {...register("name")}
                                />
                                <input
                                    type="text"
                                    className="border p-2 rounded"
                                    placeholder="College Name"
                                    {...register("collegeName")}
                                />
                                <input
                                    type="text"
                                    className="border p-2 rounded"
                                    placeholder="College Year"
                                    {...register("collegeYear")}
                                />
                                <input
                                    type="tel"
                                    className="border p-2 rounded"
                                    placeholder="Phone Number"
                                    {...register("phone")}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Save
                                </button>
                            </form>
                        ) : (
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl">Name: {user.name}</h3>
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => setEditing(true)}
                                >
                                    Edit Profile
                                </button>
                            </div>
                        )}
                        <p className="mt-2">Points: {user.points}</p>
                    </div>

                   {/* Leaderboard Section */}
                    <Leaderboard/>


                    {/* Task Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">This Week&apos;s Tasks</h2>
                        <ul className="list-group">
                        {user.tasks.map((task) => {
    const taskLastDate = new Date(task.lastDate);
    const isLastDatePassed = currentDate > taskLastDate;

    let statusText = '';
    let bgColor = '';
    
    if (task.completed && !isLastDatePassed) {
        statusText = 'Submitted';
        bgColor = 'bg-primary'; 
    } else if (!task.completed && !isLastDatePassed) {
        statusText = 'Pending';
        bgColor = 'bg-warning'; 
    } else if (!task.completed && isLastDatePassed) {
        statusText = 'Missed';
        bgColor = 'bg-destructive'; 
    } else if (task.completed && isLastDatePassed) {
        statusText = 'Completed';
        bgColor = 'bg-success'; 
    }

    return (
        <li
            key={task.id}
            className={`list-group-item text-background d-flex justify-between align-items-center ${bgColor}`}
        >
            <div>
                {task.title}
                <br />
                <small>Last Date: {task.lastDate}</small>
            </div>
            <div className="flex  items-center gap-2">
                {task.completed && !isLastDatePassed ? (
                    <button className="btn flex items-center justify-between btn-outline-light me-2">
                        <p className="w-12">Edit</p><FaEdit /> 
                    </button>
                ) : !task.completed && !isLastDatePassed ? (
                    <button className="btn flex items-center gap-2 btn-outline-light">
                        <p className="w-12">Create</p>  <FaPlus />
                    </button>
                ) : null}
             <p>{statusText}</p>
            </div>
        </li>
    );
})}

                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
