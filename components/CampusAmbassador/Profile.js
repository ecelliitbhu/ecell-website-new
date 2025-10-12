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
        <div className={cn("bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300",className)}>
            <div className="flex items-center justify-between mb-5 pb-4 border-b-2 border-orange-200 pt-3">
               
                 <h2 className="text-3xl font-bold text-gray-800">
                            User Profile
                 </h2>
                {!editing && (
                    <button
                        className="px-4 py-2 text-sm font-medium text-[#FF8C42] border-2 border-[#FF8C42] rounded-lg hover:bg-[#FF8C42] hover:text-white transition-all duration-200"
                        onClick={() => setEditing(true)}
                    >
                        Edit Profile
                    </button>
                )}
            </div>
            {editing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent outline-none transition-all"
                            placeholder="Enter your name"
                            {...register("name")}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">College Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent outline-none transition-all"
                            placeholder="Enter your college name"
                            {...register("collegeName")}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">College Year</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent outline-none transition-all"
                            placeholder="Enter your year"
                            {...register("collegeYear")}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                        <input
                            type="tel"
                            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent outline-none transition-all"
                            placeholder="Enter your phone number"
                            {...register("phone")}
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            className="flex-1 bg-[#FF8C42] hover:bg-[#FF7A2E] text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm transition-all duration-200"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={()=>setEditing(false)}
                            type="button"
                            className="flex-1 bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2.5 px-6 rounded-lg transition-all duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className='space-y-3'>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Name</span>
                        <span className="text-base font-semibold text-gray-900">{user.name}</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Points</span>
                        <span className="text-base font-semibold text-gray-900">{user.points}</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600">College</span>
                        <span className="text-base font-semibold text-gray-900">{user.collegeName}</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Graduating Year</span>
                        <span className="text-base font-semibold text-gray-900">{user.collegeYear}</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600">Phone Number</span>
                        <span className="text-base font-semibold text-gray-900">{user.phone}</span>
                    </div>
            
                    <div className="pt-3 mt-1">
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-3 border border-[#FF8C42]/20">
                            <p className="text-xs font-semibold mb-2 text-gray-900">
                                Refer a friend to register for E-summit'25 Events!!
                            </p>
                            <button 
                                className="w-full bg-gradient-to-r from-[#FF8C42] to-[#FF7A2E] hover:from-[#FF7A2E] hover:to-[#FF6B1B] 
                                           text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow-md
                                           transition-all duration-200 text-sm"
                                onClick={handleReferralClick}
                            >
                                Refer a Friend
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}