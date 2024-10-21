import React, { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TaskList = ({ className }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Task 1", status: "Pending", description: "Task description of task 1", submitted: false },
    { id: 2, title: "Task 2", status: "Missed", description: "Task description of task 2", submitted: false },
    { id: 3, title: "Task 3", status: "Submitted", description: "Task description of task 3", submitted: true },
  ]);

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
        return "bg-primary";  
    }
  };

  return (
    <div className={cn("p-6 bg-white rounded-lg shadow-md", className)}>
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className={`p-4 rounded-lg shadow ${getStatusColor(task.status)} mb-4`}>
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <h3 className="font-bold text-lg">{task.title}</h3>
                <p className="text-sm mb-1">Deadline: 00/00/0000</p>
              </div>
              <div className="flex items-center gap-3">
                {!task.submitted ? (
                  <label className="bg-success text-white rounded-full px-4 py-2 transition cursor-pointer">
                    <span>Submit Document</span>
                    <input
                      type="file"
                      onChange={(e) => handleUpload(task.id, e)}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <p className="text-black font-bold">Submitted</p>
                )}
                <button
                  className="text-black flex items-center"
                  onClick={() => toggleDropdown(task.id)}
                >
                  {dropdownOpen[task.id] ? <FaCaretUp /> : <FaCaretDown />} {dropdownOpen[task.id] ? "Hide" : "Show"} Details
                </button>
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



