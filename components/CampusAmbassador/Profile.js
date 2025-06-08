import { updateUserLoading,updateUser } from '@/lib/redux/slices/campusAmbassadorSlice';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { openDialog } from '@/lib/redux/slices/GlobalDialogWrapperSlice';


export default function Profile({className}) {
    const [editing, setEditing] = useState(false);
    const dispatch=useDispatch();
    const session=useSession()
    const user=useSelector(state=>state.campusAmbassador.user)
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    const { register, handleSubmit, reset } = useForm({
        values:user
    }
    );
    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${BACKEND_URL}/ambassador/update`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ id: user.id, ...data }),
            });
            const updatedUser = await response.json();
            dispatch(updateUser({...user, ...updatedUser}));
            reset(updatedUser);
            setEditing(false);
            toast.success("User updated !");
        } catch (error) {
            console.log(error)
            toast.error("Error updating user:", error);  
        }
    };

    const handleReferralClick = () => {
        dispatch(openDialog({ type: 'campusambassador', title: '' }));
    };

    return (
        <div className={cn("shadow-lg rounded-lg p-6",className)}>
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
                    <button
                    onClick={()=>setEditing(false)}
                        type="submit"
                        className="btn btn-danger"
                    >
                        Cancel
                    </button>
                </form>
            ) : (
                <div className='flex flex-col gap-4'>
                <div className="flex items-center justify-between">
                    <h3 className="text-xl">Name: {user.name}</h3>
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setEditing(true)}
                    >
                        Edit Profile
                    </button>
                </div>
            <p className="text-xl">Points: {user.points}</p>
            <p className="text-xl">College: {user.collegeName}</p>
            <p className="text-xl">Graduating Year: {user.collegeYear}</p>
            <p className="text-xl">Phone Number: {user.phone}</p>
            
            <div className="mt-4">
                <p className="text-lg font-bold mb-2 text-gray-900 tracking-wide">
                    Refer a friend to register for E-summit'25 Events!!
                </p>
                <button 
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                               text-white font-semibold py-2.5 px-6 rounded-lg shadow-md 
                               transition duration-200 ease-in-out transform hover:-translate-y-0.5"
                    onClick={handleReferralClick}
                >
                    Refer a Friend
                </button>
            </div>
                </div>
            )}
        </div>
    )
}
