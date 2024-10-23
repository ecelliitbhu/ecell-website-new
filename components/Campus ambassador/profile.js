import React, { useState ,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import profileImg from '../../public/defprofile.png';


const mockData1= {
  img: profileImg,
  name: "Elon Musk",
  points: 1200,
  rank: "00",
  CE_ID: "CE 000000",
  email: "elonmusk2024@itbhu.ac.in", 
  contact: "00200000",
  country: "United States",
  college: "MIT",
  mentor: "vansh@iitbhu.ac.in",
  progress: 95 
};


function Profile() {
    const [user, setUser] = useState(mockData1); 
    const [editing, setEditing] = useState(false);
    const { register, handleSubmit, reset } = useForm({
        defaultValues: mockData1,
    }
    ); 
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('/urll1'); 
    //             const data = await response.json();

    //             setUser(data.currentUser); 
    //             // setLeaderboard(data.topUsers); 
    //             reset(data.currentUser); 
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     };

    //     fetchData();
    // }, [reset]); 

    // const onSubmit = async (data) => {
    //     try {
    //         // sending the updated user data 
    //         const response = await fetch('/url2 ', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ id: user.id, ...data }), 
    //         });
    //         const updatedUser = await response.json();
    //         setUser(updatedUser); 
    //         reset(updatedUser); 

    //         setEditing(false);
    //     } catch (error) {
    //         console.error("Error updating user:", error);
    //     }
    // };


  const radius = 56;
  const strokeWidth = 7;
  const circumference = 2 * Math.PI * radius;
  const progressPercentage = user.progress;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <div className=" w-[23%]  bg-white rounded-2xl shadow-md m-5 ">
      <div className="flex items-center  p-4 mt-3 ">
        <img
          src={user.img || " "}
          alt="Profile Image"
          className="w-16 h-16 rounded-md mr-5"
        />
        <div>
          <p className="text-sm">Name: {user.name}</p>
          <p className="text-sm">Points: {user.points}</p>
          <p className="text-sm">Rank: {user.rank}</p>
        </div>
      </div>

      <button
        className="rounded-md w-[90%] px-4  mx-auto block"
        style={{ backgroundColor: '#F89450', paddingTop: '3px', paddingBottom: '3px' }}
        onClick={() => setEditing(true)}
      >
        Edit Profile
      </button>

      <hr className="border-t-2 border-gray-300 my-5 w-[90%] mx-auto" />

      {!editing ? (
        <>
          <div>
            <p className="text-sm ml-4 my-3">CE ID: {user.CE_ID}</p>
            <p className="text-sm ml-4 my-3">Email: {user.email}</p>
            <p className="text-sm ml-4 my-3">Contact: {user.contact}</p>
            <p className="text-sm ml-4 my-3">Country: {user.country}</p>
            <p className="text-sm ml-4 my-3">College: {user.college}</p>
            <p className="text-sm ml-4 my-3">Mentor: {user.mentor}</p>
          </div>

          <hr className="border-t-2 border-gray-300 mt-5 mb-3 w-[90%] mx-auto" />

          <p className="text-center text-2xl" style={{ color: '#1D1312' }}>Progress</p>

          <div
            className="rounded-lg my-4 w-[90%] h-[25%] mx-auto mb-5"
            style={{ backgroundColor: '#D9D9D9' }}
          >
            <svg width="100%" height="100%">
              <circle
                cx="50%" cy="50%" r={radius} stroke="#B0B0B0" strokeWidth={strokeWidth} fill="transparent"
              />
              <circle
                cx="50%" cy="50%" r={radius} stroke="#3C1245" strokeWidth={strokeWidth} fill="transparent"
                strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
              />
            </svg>
          </div>

          
         
        </>
      ) : (
        // <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4">
         <form className="flex flex-col gap-4 p-4">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Name"
            {...register("name")}
          />
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="College"
            {...register("college")}
          />
          <input
            type="email"
            className="border p-2 rounded"
            placeholder="Email"
            {...register("email")}
          />
          <input
            type="tel"
            className="border p-2 rounded"
            placeholder="Contact"
            {...register("contact")}
          />
          <button
            type="submit"
            className="btn btn-primary"
          >
            Save
          </button>
        </form>
      )}
    </div>
  );
}

export default Profile;
