import { cn } from '@/lib/utils';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';


export default function Profile({className}) {
    const [editing, setEditing] = useState(false);
    const dispatch=useDispatch();
    const user=useSelector(state=>state.campusAmbassador.user)
    

    const { register, handleSubmit, reset } = useForm({
        values:user
    }
    );
    const onSubmit = async (data) => {
        try {
            const response = await fetch('/campusambassador/updateUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: user.id, ...data }),
            });
            const updatedUser = await response.json();
            dispatch(updatedUser(updatedUser));
            reset(updatedUser);
            setEditing(false);
        } catch (error) {
            toast.error("Error updating user:", error);  
        }
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
            <p className="text-xl">Graduating Year: {user.phone}</p>
                </div>
            )}
        </div>
    )
}
