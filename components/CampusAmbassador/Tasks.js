import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FaEdit, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TaskList = ({ className }) => {

  const tasks=useSelector(state=>state.campusAmbassador.user.tasks)
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [fileUpload, setFileUpload] = useState(null);

  const handleUpload = (id, event) => {
    const file = event.target.files[0];
    if (file) {
      setTasks(tasks.map(task => task.id === id ? { ...task, status: "Submitted", submitted: true } : task));
      setFileUpload(file);
    }
  };

  const toggleDropdown = (id) => {
    setDropdownOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-warning";  
      case "Missed":
        return "bg-destructive";  
      case "Submitted":
        return "bg-success";  
      default:
        return "bg-blue-400";  
    }
  };

  return (
    <div className={cn("md:p-6 max-md:p-4 bg-white rounded-lg shadow-md", className)}>
      <h2 className="text-2xl sticky font-bold mb-2">Tasks</h2>
      <ul className="flex flex-col gap-y-4 h-[340px] overflow-y-auto">
        {tasks.map((task) => (
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
                  <label className="bg-success text-white rounded-full px-4 py-2 transition cursor-pointer">
                    <span>Submit</span>
                    <input
                      type="file"
                      onChange={(e) => handleUpload(task.id, e)}
                      className="hidden"
                    />
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



