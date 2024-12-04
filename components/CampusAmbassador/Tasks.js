import { updateTask, updateTaskLoading } from "@/lib/redux/slices/campusAmbassadorSlice";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TaskList = ({ className }) => {

  const tasks=useSelector(state=>state.campusAmbassador.user.tasks)
  const id=useSelector(state=>state.campusAmbassador.user.id)
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [fileUpload, setFileUpload] = useState(null);
  const session=useSession()
  const dispatch=useDispatch()



  const handleUpload = async (taskId) => {
  
    if (fileUpload) {
      try {
        const response = await fetch(process.env.BACKEND_URL+'/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            taskId: taskId,
            submission: fileUpload,
            email:session?.data?.user?.email // This is the file URL or drive link
          }),
        });
  
        // Check if the request was successful
        if (!response.ok) {
          throw new Error('Error submitting task');
        }
  
        // Handle successful task submission
        const data = await response.json();
        dispatch(updateTask({
          id: taskId,  // Task ID
          updates: { 
            status: 'Submitted', 
            submissionLink: fileUpload,
            submitted: true,
          }
        }));        
        setFileUpload(''); // Clear file upload state after submission
  
        // Optionally, you can display a success message based on the response
        toast.success('Task submission successful:');
      } catch (error) {
        console.log(error)
        toast.error('Error submitting task:');
        // Handle error (e.g., show a notification or message to the user)
      }
    }
  };
  

  const toggleDropdown = (id) => {
    setDropdownOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-warning";  
      case "missed":
        return "bg-destructive";  
      case "submitted":
        return "bg-success";  
      default:
        return "bg-gradient-to-l from-[rgb(251,146,60)] to-white";  
    }
  };

  return (
    <div className={cn("md:p-6 max-md:p-4 bg-white rounded-lg shadow-lg", className)}>
      <h2 className="text-2xl sticky font-bold mb-2">Tasks</h2>
      <ul className="flex flex-col gap-y-4 h-[340px] overflow-y-auto">
        {tasks && tasks?.map((task) => (
          <li key={task.id} className={`p-4 rounded-lg shadow ${getStatusColor(task.status)}`}>
            <div className="flex max-md:flex-col max-md:gap-3 md:justify-between items-start">
              <div className="flex flex-col max-md:gap-2">
                <h3 className="md:font-bold max-md:font-semibold md:text-lg max-md:text-md">{task.title}</h3>
                <p className="text-sm mb-1">Deadline: 00/00/0000</p>
              </div>
              <div className="flex items-center gap-3">
              <button
                  className="text-black flex items-center"
                  onClick={() => toggleDropdown(task.id)}
                >
                <span >{dropdownOpen[task.id] ? "Hide" : "Show"} Details</span>  {dropdownOpen[task.id] ? <FaCaretUp className="max-md:w-8 max-md:h-8" /> : <FaCaretDown  className="max-md:w-8 max-md:h-8"/>} 
                </button>
                {!task.submitted ? (
                  <label className="bg-black md:flex-row flex-col gap-3  w-full flex text-white rounded-full px-6 py-8 transition cursor-pointer">
                    <input
                      type="text"
                      onChange={(e) => setFileUpload(e.target.value)}
                      className="text-black rounded-md px-2"
                      placeholder="Paste your drive link here !"
                    />
                    <Button onClick={()=>handleUpload(task.id)}>Submit</Button>
                  </label>
                ) : (
                  <p className="text-black font-bold">Submitted</p>
                )}
              </div>
            </div>
            {dropdownOpen[task.id] && (
              <div className="mt-2 p-2 rounded-lg">
                <p className="text-sm">{task.description}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;



