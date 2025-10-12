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

  // const tasks=useSelector(state=>state.campusAmbassador.user.tasks)
  const tasks = useSelector((state) => state.campusAmbassador.user.tasks || []);
  const id = useSelector(state => state.campusAmbassador.user.id);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [fileUpload, setFileUpload] = useState(null);
  const session = useSession();
  const dispatch = useDispatch();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleUpload = async (taskId) => {

    if (fileUpload) {
      try {
        const response = await fetch(`${BACKEND_URL}/ambassador/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskId: taskId,
            submission: fileUpload,
            email: session?.data?.user?.email, // This is the file URL or drive link
          }),
        });

        // Check if the request was successful
        if (!response.ok) {
          throw new Error('Error submitting task');
        }

        // Handle successful task submission
        const data = await response.json();
        dispatch(updateTask({
          id: taskId,   // Task ID
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
        console.log(error);
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
        return "bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-orange-400";
      case "missing":
        return "bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500";
      case "Submitted":
        return "bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500";
      default:
        return "bg-gradient-to-r from-gray-50 to-slate-50 border-l-4 border-gray-400";
    }
  };
  //console.log("All tasks from Redux:", tasks);
  console.log("task objext:", tasks[0]);

  return (
    <div
      className={cn(
        "md:p-8 max-md:p-5 bg-white rounded-2xl shadow-xl border border-gray-100",
        className
      )}
    >
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-orange-500">
        <h2 className="text-3xl font-bold text-gray-800">
          <span className="text-orange-500">Your</span> Tasks
        </h2>
        <div className="px-4 py-2 bg-orange-100 rounded-full">
          <span className="text-orange-600 font-semibold text-sm">
            {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
          </span>
        </div>
      </div>
      
      <ul className="flex flex-col gap-y-4 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {Array.isArray(tasks) &&
          tasks.map((task) => (
            <li
              key={task.id}
              className={`p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ${getStatusColor(task.status)}`}
            >
              <div className="flex max-md:flex-col max-md:gap-4 md:justify-between md:items-start">
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-xl text-gray-800">
                      {task.title}
                    </h3>
                   
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium">
                      Deadline: {new Date(task?.lastDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="flex max-md:flex-col md:items-center gap-3 md:ml-4">
                  <button
                    className="flex items-center gap-2 text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 whitespace-nowrap"
                    onClick={() => toggleDropdown(task.id)}
                  >
                    <span className="text-sm">
                      {dropdownOpen[task.id] ? "Hide" : "Show"} Details
                    </span>
                    {dropdownOpen[task.id] ? (
                      <FaCaretUp className="w-5 h-5" />
                    ) : (
                      <FaCaretDown className="w-5 h-5" />
                    )}
                  </button>
                  
                  {!task.submitted ? (
                   
                    <div className="flex flex-1 max-lg:flex-col md:items-center gap-2 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                    <input
                    type="text"
                    onChange={(e) => setFileUpload(e.target.value)}
                    className="text-gray-800 text-sm rounded-md px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full max-w-[300px]"
                    placeholder="Paste drive link here..."
                    />

                    <button
                        onClick={() => handleUpload(task.id)}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-5 py-2 rounded-md transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
                        >
                               Submit
                     </button>
                   </div>

                  ) : (
                    <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-green-700 font-semibold text-sm">Submitted</span>
                    </div>
                  )}
                </div>
              </div>
              
              {dropdownOpen[task.id] && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-700 leading-relaxed">{task.description}</p>
                </div>
              )}
            </li>
          ))}
      </ul>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
      `}</style>
    </div>
  );
};

export default TaskList;